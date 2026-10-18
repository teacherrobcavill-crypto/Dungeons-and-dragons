// AI & Deterministic 5e Dungeon Master Service
// Supports: Authentic D&D 5e Living Module Engine (Offline) and Google Gemini AI
// Follows PHB (2014) + DMG (2024) + MM (2014/2024) rules for checks, saves, and combat

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey, hasApiKey } from './apiKeyService.js';
import { isFeatureEnabled } from '../config/featureFlags.js';
import { logError, logEvent } from './telemetry.js';

let genAI = null;
let geminiModel = null;
let currentApiKey = null;

export const isGeminiAvailable = () => {
    if (geminiModel !== null && currentApiKey === getApiKey()) {
        return true;
    }
    if (hasApiKey()) {
        initializeGemini(getApiKey());
        return geminiModel !== null;
    }
    return false;
};

export const initializeGemini = (apiKey) => {
    if (!apiKey) {
        geminiModel = null;
        currentApiKey = null;
        return false;
    }

    if (apiKey === currentApiKey && geminiModel !== null) {
        return true;
    }

    try {
        genAI = new GoogleGenerativeAI(apiKey);
        geminiModel = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.85,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 4096,
            }
        });
        currentApiKey = apiKey;
        return true;
    } catch (error) {
        console.error('Failed to initialize Gemini:', error);
        geminiModel = null;
        currentApiKey = null;
        return false;
    }
};

if (hasApiKey()) {
    initializeGemini(getApiKey());
}

const AI_REQUEST_WINDOW_MS = 10_000;
const AI_REQUEST_LIMIT = 6;
const AI_REQUEST_TIMEOUT_MS = 15_000;
const aiRequestTimestamps = [];

const cleanupRequestWindow = (now) => {
    while (aiRequestTimestamps.length > 0 && now - aiRequestTimestamps[0] > AI_REQUEST_WINDOW_MS) {
        aiRequestTimestamps.shift();
    }
};

const consumeRateLimitToken = () => {
    if (!isFeatureEnabled('aiRateLimiting')) return true;
    const now = Date.now();
    cleanupRequestWindow(now);
    if (aiRequestTimestamps.length >= AI_REQUEST_LIMIT) {
        return false;
    }
    aiRequestTimestamps.push(now);
    return true;
};

const withTimeout = async (promise, timeoutMs) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('AI request timed out')), timeoutMs);
    });

    try {
        return await Promise.race([promise, timeoutPromise]);
    } finally {
        clearTimeout(timeoutId);
    }
};

const safeParseJson = (rawText) => {
    if (!rawText) return null;
    const tryParse = (str) => {
        try {
            return JSON.parse(str);
        } catch {
            return null;
        }
    };

    const fromCodeFence = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fromCodeFence) {
        const parsed = tryParse(fromCodeFence[1]);
        if (parsed) return parsed;
    }

    const direct = tryParse(rawText);
    if (direct) return direct;

    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const potentialJson = rawText.substring(firstBrace, lastBrace + 1);
        const extracted = tryParse(potentialJson);
        if (extracted) return extracted;
    }

    const narrationMatch = rawText.match(/"narration"\s*:\s*"((?:[^"\\]|\\.)*)/);
    if (narrationMatch) {
        return { narration: narrationMatch[1] };
    }

    return null;
};

const sanitizeCompanionResponses = (companions, structuredCompanions = []) => {
    if (!Array.isArray(structuredCompanions) || structuredCompanions.length === 0) return [];

    return structuredCompanions
        .map((companionEntry) => {
            const matchedCompanion = companions?.find(
                (companion) => companion.name?.toLowerCase() === (companionEntry.name || companionEntry.companionName || '').toLowerCase()
            );
            const text = companionEntry.dialogue || companionEntry.text;
            if (!matchedCompanion || !text) return null;

            return {
                companionName: matchedCompanion.name,
                companionRace: matchedCompanion.race,
                companionClass: matchedCompanion.class,
                abilities: matchedCompanion.specialAbility || matchedCompanion.signatureMove,
                personality: matchedCompanion.personality || 'Cheerful',
                text: String(text).trim()
            };
        })
        .filter(Boolean);
};

// === D&D ROLL RULES ===
const ROLL_TYPES = {
    ABILITY_CHECK: 'ability_check',
    ATTACK_ROLL: 'attack_roll',
    SAVING_THROW: 'saving_throw',
    DAMAGE_ROLL: 'damage_roll',
    NO_ROLL: 'no_roll'
};

const TRIVIAL_ACTIONS = [
    'look', 'look around', 'observe', 'check inventory', 'rest', 'sit', 'stand',
    'walk', 'talk to companion', 'eat', 'drink', 'wait', 'think', 'examine',
    'read', 'open door', 'close door', 'pick up', 'put down', 'equip', 'unequip'
];

const ABILITY_CHECK_ACTIONS = {
    strength: ['force', 'break', 'smash', 'destroy', 'push', 'pull', 'lift', 'climb', 'jump', 'swim against'],
    dexterity: ['sneak', 'hide', 'pickpocket', 'lockpick', 'acrobatics', 'dodge', 'tumble', 'disarm'],
    constitution: ['endure', 'resist poison', 'hold breath', 'march', 'survive'],
    intelligence: ['investigate', 'recall', 'decipher', 'identify', 'arcana', 'history', 'religion', 'nature'],
    wisdom: ['insight', 'track', 'medicine', 'sense motive', 'perceive', 'search carefully', 'perception', 'survival'],
    charisma: ['persuade', 'intimidate', 'deceive', 'perform', 'charm', 'negotiate', 'convince']
};

const ATTACK_KEYWORDS = ['attack', 'strike', 'hit', 'slash', 'stab', 'shoot', 'cast at', 'swing at', 'punch', 'kick', 'smash'];

const companionDialogues = {
    combat: {
        Cheerful: ["Axes and spells ready—we've got this!", "Stand together, heroes! Victory is ours!", "Keep pressing the attack!"],
        Stoic: ["Hold the line. Watch your flank.", "Steel and discipline will carry us through.", "Focus on the primary threat."],
        Sarcastic: ["Oh wonderful, more things trying to eat us.", "Try not to bleed on my boots, will you?", "Ten gold says I drop mine first."],
        Wise: ["Strike where their guard falters.", "Remember their weaknesses from the codex.", "Patience—wait for an opening."],
        Impulsive: ["FOR GLORY! CHARGE!", "I'm taking the biggest one!", "Cast fireball now, ask questions later!"],
        Cautious: ["Watch their reach—keep your shields up!", "Don't let them surround us!", "Save a healing potion just in case!"],
        Grumpy: ["Can't walk ten feet in a dungeon without a brawl.", "Let's bash 'em and get back to camp.", "Bah! Ugly brutes."],
        Mischievous: ["I'll circle behind for a backstab!", "Dibs on whatever's in their pockets!", "Watch this trick shot!"]
    },
    exploration: {
        Cheerful: ["Look at the stonework in here—what a discovery!", "Every shadow could hide ancient treasure!", "Lead on, I'm right beside you!"],
        Stoic: ["Check the flagstones before stepping forward.", "The air carries a draft from deeper chambers.", "Stay sharp."],
        Sarcastic: ["Nothing says 'welcoming' like cobwebs and ominous runes.", "Let me guess: definitely not trapped.", "After you, fearless leader."],
        Wise: ["The architecture speaks of a bygone age.", "Look closely at the markings along the archway.", "Every chamber tells a story if we listen."],
        Impulsive: ["What does this lever do?!", "Let's kick open that heavy door!", "I bet the good loot is right ahead!"],
        Cautious: ["Check for tripwires and pressure plates first.", "I hear something echoing down that corridor...", "Keep your torch high."],
        Grumpy: ["Drafty, damp, and smells like goblin boots.", "My knees ache already.", "Let's grab the relic and get out of here."],
        Mischievous: ["Wait—check behind that tapestry for a secret door!", "Ooh, shiny chest at twelve o'clock!", "Let's see what they hid in the desk."]
    },
    interaction: {
        Cheerful: ["Well met! Perhaps we can help one another!", "A friendly face in a dangerous place!", "Let's hear what they have to say!"],
        Stoic: ["State your terms plainly.", "Watch their hands while they speak.", "We seek answers, not trouble."],
        Sarcastic: ["Oh yes, they seem completely trustworthy.", "Let me handle the diplomacy—wait, no, don't.", "Smooth talking, hero."],
        Wise: ["Every NPC has a motive—discern what they truly value.", "Courtesy opens doors that iron cannot.", "Listen to what they leave unsaid."],
        Impulsive: ["Enough chatter—tell us where the villain is hiding!", "Do you have a quest for us or what?!", "We're taking the job!"],
        Cautious: ["Don't reveal our full strength yet.", "Keep one hand near your weapon hilt.", "Test their honesty with an Insight check."],
        Grumpy: ["Ask for double the gold up front.", "Make it quick, I don't like the look of this place.", "Hmph. Politicians and guildmasters."],
        Mischievous: ["Keep them talking while I peek at their ledger...", "A little flattery goes a long way!", "Wink if you want me to create a distraction."]
    },
    success: {
        Cheerful: ["Brilliant roll! Even Tymora smiles on us today!", "That was legendary!", "Nothing can stop this party!"],
        Stoic: ["Clean execution. Well done.", "Impressive precision.", "Press the advantage."],
        Sarcastic: ["Well, well—looks like you actually know what you're doing.", "Show-off.", "Okay, I admit it, that was impressive."],
        Wise: ["Skill and preparation triumph over chance.", "A masterstroke of adventuring.", "The path forward reveals itself."],
        Impulsive: ["BOOYAH! Natural born legend!", "Did everyone see that?! Do it again!", "Unstoppable!"],
        Cautious: ["Thank the gods that worked!", "Phew—my heart skipped a beat on that roll.", "Safe and sound!"],
        Grumpy: ["Not bad. Not bad at all.", "About time something went our way.", "Hmph. Adequate."],
        Mischievous: ["Like taking candy from a dragon!", "Flawless heist technique!", "Too easy!"]
    },
    failure: {
        Cheerful: ["Shake it off! The dice will turn in our favor next time!", "We're still standing—let's try another approach!", "Don't lose heart!"],
        Stoic: ["Regroup and adapt.", "A minor setback. Stay steady.", "Brace yourselves."],
        Sarcastic: ["Graceful. Truly poetic.", "So... Plan B, anyone?", "I'll pretend I didn't see that."],
        Wise: ["Even the greatest heroes stumble before the summit.", "When one door resists, seek another way.", "Learn from the resistance."],
        Impulsive: ["Hit it harder next time!", "Aw man, the dice are cursed!", "Let me have a crack at it!"],
        Cautious: ["I knew it! Back up, carefully!", "Watch out for the backlash!", "Let's rethink this before someone loses a finger."],
        Grumpy: ["Bah! Rusted hinges and rotten luck.", "I told you we should've brought a crowbar.", "Typical."],
        Mischievous: ["Oops... nobody saw that, right?", "Quick, act natural!", "Time to improvise!"]
    },
    trivial: {
        Cheerful: ["Ready when you are!", "What a grand adventure!", "Lead the way!"],
        Stoic: ["I am with you.", "Proceed.", "All clear so far."],
        Sarcastic: ["Fascinating.", "Take your time, the dungeon isn't going anywhere.", "Riveting."],
        Wise: ["A moment of reflection serves the wise.", "Observe the details of this chamber.", "Let us consider our options."],
        Impulsive: ["Come on, let's keep moving!", "Which door are we picking?!", "Action awaits!"],
        Cautious: ["Good idea to double-check.", "Everything looks quiet—for now.", "Stay close together."],
        Grumpy: ["Keep moving.", "Hmph.", "Less standing around, more looting."],
        Mischievous: ["Keep your eyes peeled for hidden switches!", "Wonder what's in the next room...", "Hehehe."]
    }
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const RULE_ENGINE = {
    combat: [
        { patterns: ['attack', 'strike', 'slash', 'stab', 'shoot', 'cast at', 'swing at', 'punch', 'kick', 'smash'], rollType: ROLL_TYPES.ATTACK_ROLL, ability: 'strength', dc: 13 }
    ],
    exploration: [
        { patterns: ['search', 'investigate', 'inspect', 'track', 'discover', 'check'], rollType: ROLL_TYPES.ABILITY_CHECK, ability: 'wisdom', dc: 12 },
        { patterns: ['sneak', 'hide', 'lockpick', 'pickpocket', 'dodge', 'disarm'], rollType: ROLL_TYPES.ABILITY_CHECK, ability: 'dexterity', dc: 13 },
        { patterns: ['climb', 'jump', 'force', 'push', 'pull', 'lift', 'break', 'destroy'], rollType: ROLL_TYPES.ABILITY_CHECK, ability: 'strength', dc: 12 }
    ],
    social: [
        { patterns: ['persuade', 'convince', 'negotiate', 'intimidate', 'deceive', 'lie'], rollType: ROLL_TYPES.ABILITY_CHECK, ability: 'charisma', dc: 12 }
    ]
};

const analyzeActionWithRulesEngine = (action) => {
    const lowerAction = action.toLowerCase().trim();

    for (const trivial of TRIVIAL_ACTIONS) {
        if (lowerAction.startsWith(trivial) || lowerAction === trivial) {
            return { requiresRoll: false, rollType: ROLL_TYPES.NO_ROLL, actionType: 'trivial', dc: null };
        }
    }

    for (const rule of RULE_ENGINE.combat) {
        if (rule.patterns.some((pattern) => lowerAction.includes(pattern))) {
            return { requiresRoll: true, rollType: rule.rollType, actionType: 'combat', ability: rule.ability, dc: rule.dc };
        }
    }

    for (const rule of RULE_ENGINE.exploration) {
        if (rule.patterns.some((pattern) => lowerAction.includes(pattern))) {
            return { requiresRoll: true, rollType: rule.rollType, actionType: 'exploration', ability: rule.ability, dc: rule.dc };
        }
    }

    for (const rule of RULE_ENGINE.social) {
        if (rule.patterns.some((pattern) => lowerAction.includes(pattern))) {
            return { requiresRoll: true, rollType: rule.rollType, actionType: 'interaction', ability: rule.ability, dc: rule.dc };
        }
    }

    return null;
};

const analyzeAction = (action, companions = []) => {
    let targetCharacter = 'player';
    let actionToAnalyze = action || '';

    if (companions && companions.length > 0) {
        for (const companion of companions) {
            if (!companion.name) continue;
            const namePattern = new RegExp(`^${companion.name}\\b`, 'i');
            if (namePattern.test(actionToAnalyze)) {
                targetCharacter = companion.name;
                actionToAnalyze = actionToAnalyze.replace(namePattern, '').trim();
                actionToAnalyze = actionToAnalyze.replace(/^[,:]\s*/, '');
                break;
            }
        }
    }

    const deterministicAnalysis = analyzeActionWithRulesEngine(actionToAnalyze);
    if (deterministicAnalysis) {
        return { ...deterministicAnalysis, characterName: targetCharacter };
    }

    const lowerAction = actionToAnalyze.toLowerCase().trim();

    for (const keyword of ATTACK_KEYWORDS) {
        if (lowerAction.includes(keyword)) {
            return {
                requiresRoll: true,
                rollType: ROLL_TYPES.ATTACK_ROLL,
                actionType: 'combat',
                ability: 'strength',
                dc: 14,
                characterName: targetCharacter
            };
        }
    }

    for (const [ability, keywords] of Object.entries(ABILITY_CHECK_ACTIONS)) {
        for (const keyword of keywords) {
            if (lowerAction.includes(keyword)) {
                return {
                    requiresRoll: true,
                    rollType: ROLL_TYPES.ABILITY_CHECK,
                    actionType: lowerAction.includes('sneak') || lowerAction.includes('hide') ? 'exploration' : 'interaction',
                    ability,
                    dc: 12,
                    characterName: targetCharacter
                };
            }
        }
    }

    return { requiresRoll: false, rollType: ROLL_TYPES.NO_ROLL, actionType: 'exploration', dc: null, characterName: targetCharacter };
};

export const getAbilityModifier = (score) => Math.floor((score - 10) / 2);

export { analyzeAction, ROLL_TYPES };

const generateCompanionResponses = (companions, actionType, isSuccess = null) => {
    if (!companions || companions.length === 0) return [];
    const validCompanions = companions.filter((c) => c && c.name);
    if (validCompanions.length === 0) return [];

    let poolKey = actionType || 'exploration';
    if (isSuccess === true) poolKey = 'success';
    else if (isSuccess === false) poolKey = 'failure';
    else if (!companionDialogues[poolKey]) poolKey = 'exploration';

    // Pick 1 or 2 companions to respond so chat feels lively without spamming
    const speakerCount = Math.min(validCompanions.length, isSuccess !== null ? 2 : 1);
    const shuffled = [...validCompanions].sort(() => 0.5 - Math.random()).slice(0, speakerCount);

    return shuffled.map((companion) => {
        const personality = companion.personality || 'Cheerful';
        const dialoguePool = companionDialogues[poolKey]?.[personality] || companionDialogues.exploration.Cheerful;
        return {
            companionName: companion.name,
            companionRace: companion.race || 'human',
            companionClass: companion.class || 'fighter',
            abilities: companion.specialAbility || companion.signatureMove,
            personality,
            text: getRandomElement(dialoguePool)
        };
    });
};

// Format room context for Gemini & Offline DM
const buildRoomContextSummary = (currentNode) => {
    if (!currentNode) return '';
    const parts = [
        `Current Location: ${currentNode.title || 'Unknown Chamber'} (${currentNode.environment || 'dungeon'})`,
        `Room Description: ${currentNode.readAloud || ''}`,
        currentNode.dmNotes ? `DM Secret Notes: ${currentNode.dmNotes}` : '',
        currentNode.trapOrHazard ? `Trap/Hazard Present: ${currentNode.trapOrHazard.name} (Detect DC ${currentNode.trapOrHazard.detectDc}, Disarm DC ${currentNode.trapOrHazard.disarmDc})` : '',
        currentNode.npcs?.length ? `NPCs Present: ${currentNode.npcs.map((n) => `${n.name} (${n.role}, Attitude: ${n.attitude})`).join('; ')}` : '',
        currentNode.encounter ? `Encounter: ${currentNode.encounter.title} (${currentNode.encounter.monsters?.map((m) => `${m.count}x ${m.name}`).join(', ')})` : '',
        currentNode.choices?.length ? `Available Exits/Choices: ${currentNode.choices.map((c) => c.label).join(' | ')}` : ''
    ];
    return parts.filter(Boolean).join('\n');
};

// === GEMINI AI RESPONSE ===
const generateGeminiResponse = async (context) => {
    const { character, companions, previousTurns, action, rollResult, currentNode } = context;
    const analysis = analyzeAction(action, companions);
    const roomSummary = buildRoomContextSummary(currentNode);

    if (rollResult) {
        return generateRollResolution(context, analysis, rollResult, roomSummary);
    }

    if (analysis.requiresRoll) {
        const companionList = companions && companions.length > 0
            ? companions.map((c) => `${c.name} (${c.race} ${c.class}, ${c.personality} personality)`).join(', ')
            : 'None';

        const recentHistory = (previousTurns || []).slice(-6).map((turn) =>
            `${turn.type === 'user' ? 'PLAYER' : 'DM'}: ${turn.text}`
        ).join('\n');

        const actorName = analysis.characterName === 'player' ? (character?.name || 'Hero') : analysis.characterName;
        const actorType = analysis.characterName === 'player' ? 'Player' : 'Companion';

        const prompt = `You are an expert Dungeon Master running an authentic D&D 5e (PHB + DMG + Monster Manual) adventure.
The ${actorType} (${actorName}) is attempting an action that requires a d20 test.

Check Required: ${analysis.rollType === 'attack_roll' ? 'Attack Roll' : `${analysis.ability?.toUpperCase()} Check`} (DC ${analysis.dc})

## ROOM & MODULE CONTEXT
${roomSummary || 'Standard fantasy adventure scene.'}

## PARTY CONTEXT
- **Hero**: ${character?.name || 'Hero'} (Level ${character?.level || 1} ${character?.race} ${character?.class}, HP ${character?.hp}/${character?.maxHp})
- **Companions**: ${companionList}
- **Recent History**:
${recentHistory}

## ATTEMPTED ACTION
"${action}"

## INSTRUCTIONS
1. Describe the tense setup in second-person present tense ("You step forward...") grounded in the current room.
2. Explicitly call for the ${analysis.rollType === 'attack_roll' ? 'Attack Roll' : `${analysis.ability?.toUpperCase()} check (DC ${analysis.dc})`} for ${actorName}.
3. Do NOT resolve the outcome yet—pause for the dice roll!

## OUTPUT FORMAT (Strict JSON)
{
  "narration": "Setup narration ending with the call to roll.",
  "companions": []
}`;

        try {
            if (!consumeRateLimitToken()) throw new Error('Rate limit exceeded');
            const result = await withTimeout(geminiModel.generateContent(prompt), AI_REQUEST_TIMEOUT_MS);
            const response = await result.response;
            const text = response.text();
            const structured = safeParseJson(text);
            const cleanedText = structured?.narration?.trim() || text.replace(/```json/g, '').replace(/```/g, '').trim();

            return {
                text: cleanedText,
                requiresRoll: true,
                waitingForRoll: true,
                rollParams: {
                    type: analysis.rollType,
                    ability: analysis.ability,
                    dc: analysis.dc,
                    action,
                    characterName: analysis.characterName
                },
                companionResponses: []
            };
        } catch (error) {
            console.error('Gemini Request Error:', error);
            return generateMockResponse(context);
        }
    }

    return generateNormalNarrative(context, roomSummary);
};

const generateNormalNarrative = async (context, roomSummary = '') => {
    const { character, companions, previousTurns, action } = context;

    const companionList = companions && companions.length > 0
        ? companions.map((c) => `${c.name} (${c.race} ${c.class}, ${c.personality} personality)`).join(', ')
        : 'None';

    const recentHistory = (previousTurns || []).slice(-6).map((turn) =>
        `${turn.type === 'user' ? 'PLAYER' : 'DM'}: ${turn.text}`
    ).join('\n');

    const prompt = `You are an expert Dungeon Master for a D&D 5e campaign.
Respond to the player's action in vivid, atmospheric second-person D&D prose.

## ROOM & MODULE CONTEXT
${roomSummary || 'Standard D&D adventure setting.'}

## PARTY CONTEXT
- **Hero**: ${character?.name || 'Hero'} (Level ${character?.level || 1} ${character?.race} ${character?.class}, HP ${character?.hp}/${character?.maxHp})
- **Party**: ${companionList}
- **Recent History**:
${recentHistory}

## PLAYER ACTION
"${action}"

## OUTPUT FORMAT (Strict JSON)
{
  "narration": "Vivid 1-2 paragraph DM response grounded in the current room and D&D lore.",
  "companions": [{ "name": "CompanionName", "dialogue": "In-character remark" }]
}`;

    try {
        if (!consumeRateLimitToken()) throw new Error('Rate limit exceeded');
        const result = await withTimeout(geminiModel.generateContent(prompt), AI_REQUEST_TIMEOUT_MS);
        const response = await result.response;
        const text = response.text();
        const structured = safeParseJson(text);
        const cleanedText = structured?.narration?.trim() || text.replace(/```json/g, '').replace(/```/g, '').trim();
        const companionResponses = sanitizeCompanionResponses(companions, structured?.companions);

        return {
            text: cleanedText,
            requiresRoll: false,
            companionResponses
        };
    } catch (error) {
        console.error('Gemini Request Error:', error);
        return generateMockResponse(context);
    }
};

const generateRollResolution = async (context, analysis, rollResult, roomSummary = '') => {
    const { character, companions, previousTurns, action } = context;
    const { total, isSuccess, roll, modifier } = rollResult;

    const companionList = companions && companions.length > 0
        ? companions.map((c) => `${c.name} (${c.race} ${c.class}, ${c.personality} personality)`).join(', ')
        : 'None';

    const recentHistory = (previousTurns || []).slice(-6).map((turn) =>
        `${turn.type === 'user' ? 'PLAYER' : 'DM'}: ${turn.text}`
    ).join('\n');

    const actorName = analysis.characterName === 'player' ? (character?.name || 'Hero') : analysis.characterName;

    const prompt = `You are an expert Dungeon Master for D&D 5e.
${actorName} just rolled a d20 check to resolve an action in the current room.

Action: "${action}"
Roll: d20 (${roll}) + Mod (${modifier}) = ${total} vs DC ${analysis.dc}
Outcome: ${isSuccess ? 'SUCCESS' : 'FAILURE'} ${roll === 20 ? '(NATURAL 20 CRITICAL SUCCESS!)' : roll === 1 ? '(NATURAL 1 CRITICAL FAILURE!)' : ''}

## ROOM CONTEXT
${roomSummary}

## PARTY CONTEXT
- **Hero**: ${character?.name || 'Hero'}
- **Party**: ${companionList}
- **Recent History**:
${recentHistory}

## OUTPUT FORMAT (Strict JSON)
{
  "narration": "Vivid 1-2 paragraph resolution of the ${isSuccess ? 'success' : 'failure'} in this chamber.",
  "companions": [{ "name": "CompanionName", "dialogue": "Reaction to the roll" }]
}`;

    try {
        if (!consumeRateLimitToken()) throw new Error('Rate limit exceeded');
        const result = await withTimeout(geminiModel.generateContent(prompt), AI_REQUEST_TIMEOUT_MS);
        const response = await result.response;
        const text = response.text();
        const structured = safeParseJson(text);
        const cleanedText = structured?.narration?.trim() || text.replace(/```json/g, '').replace(/```/g, '').trim();
        const companionResponses = sanitizeCompanionResponses(companions, structured?.companions);

        return {
            text: cleanedText,
            requiresRoll: true,
            isSuccess,
            roll,
            rollType: analysis.rollType,
            companionResponses
        };
    } catch (error) {
        console.error('Gemini Request Error:', error);
        return generateMockResponse(context);
    }
};

// === DETERMINISTIC 5E DUNGEON MASTER ENGINE (OFFLINE / BUILT-IN MODE) ===
const generateMockResponse = (context) => {
    const { action, rollResult, companions, character, currentNode } = context;
    const analysis = analyzeAction(action, companions);
    const roomTitle = currentNode?.title || 'the chamber';
    const roomNotes = currentNode?.dmNotes || '';
    const npcs = currentNode?.npcs || [];
    const trap = currentNode?.trapOrHazard;

    // CASE 1: Resolving a pending d20 roll
    if (rollResult) {
        const actor = analysis.characterName === 'player' ? 'You' : analysis.characterName;
        const critBanner = rollResult.roll === 20
            ? '🎉 **NATURAL 20 — CRITICAL SUCCESS!** '
            : rollResult.roll === 1
                ? '💀 **NATURAL 1 — CRITICAL FUMBLE!** '
                : '';

        let detailText = '';
        if (rollResult.isSuccess) {
            if (analysis.actionType === 'exploration') {
                detailText = roomNotes
                    ? `Your keen senses pierce the shadows of **${roomTitle}**. ${roomNotes}`
                    : `Searching **${roomTitle}** with expert precision, you uncover subtle tracks in the dust, faint tool marks along the masonry, and a safe path forward.`;
            } else if (analysis.actionType === 'interaction') {
                const npc = npcs[0];
                detailText = npc
                    ? `**${npc.name}** (${npc.role}) studies you for a long moment before nodding with newfound respect. *"${npc.secretInfo || npc.dialogue || 'You speak with conviction, traveler. I will aid you.'}"*`
                    : `Your words carry undeniable presence and authority, winning over your listener and shifting their attitude in your favor.`;
            } else {
                detailText = `Your strike lands true in **${roomTitle}**, driving your foe back as sparks scatter across the stone floor!`;
            }
        } else {
            if (trap) {
                detailText = `As you test the mechanism in **${roomTitle}**, a hidden trigger clicks! (${trap.name}: ${trap.description || 'You barely twist aside as dust and splinters rain down.'})`;
            } else if (analysis.actionType === 'interaction' && npcs[0]) {
                detailText = `**${npcs[0].name}** narrows their eyes, unconvinced by your approach. You will need stronger leverage—or another tactic—to sway them.`;
            } else {
                detailText = `Despite a determined effort in **${roomTitle}**, the challenge resists your attempt. The shadows around you seem to deepen as you regroup.`;
            }
        }

        return {
            text: `${critBanner}**${actor}** rolled **${rollResult.total}** (d20: ${rollResult.roll} + Mod: ${rollResult.modifier >= 0 ? `+${rollResult.modifier}` : rollResult.modifier} vs DC ${analysis.dc}) — **${rollResult.isSuccess ? 'SUCCESS' : 'FAILURE'}!**\n\n${detailText}`,
            requiresRoll: true,
            isSuccess: rollResult.isSuccess,
            roll: rollResult.roll,
            rollType: analysis.rollType,
            companionResponses: generateCompanionResponses(companions, analysis.actionType, rollResult.isSuccess)
        };
    }

    // CASE 2: Action requires a manual d20 roll from the player
    if (analysis.requiresRoll) {
        const actor = analysis.characterName === 'player' ? 'you' : analysis.characterName;
        const abilityLabel = (analysis.ability || 'wisdom').toUpperCase();
        const checkName = analysis.rollType === ROLL_TYPES.ATTACK_ROLL ? 'an **Attack Roll**' : `a **${abilityLabel} Check (DC ${analysis.dc})**`;

        let setupFlavour = `You size up the challenge in **${roomTitle}**.`;
        if (analysis.actionType === 'exploration' && trap) {
            setupFlavour = `Your eyes narrow as you notice suspicious seams in **${roomTitle}** (${trap.name}). One wrong move could spring the mechanism.`;
        } else if (analysis.actionType === 'interaction' && npcs[0]) {
            setupFlavour = `You step toward **${npcs[0].name}** (${npcs[0].role}, currently *${npcs[0].attitude}*), weighing your words carefully.`;
        }

        return {
            text: `${setupFlavour}\n\n🎲 **Roll Required:** Make ${checkName} for **${actor}** to resolve *"${action}"*! Click the glowing d20 button below to roll.`,
            requiresRoll: true,
            waitingForRoll: true,
            rollParams: {
                type: analysis.rollType,
                ability: analysis.ability,
                dc: analysis.dc,
                action,
                characterName: analysis.characterName
            },
            companionResponses: []
        };
    }

    // CASE 3: Narrative / Observational action (Look around, talk, examine)
    const lower = (action || '').toLowerCase();
    let narrativeResponse = '';

    if (lower.includes('look') || lower.includes('observe') || lower.includes('examine')) {
        const npcLine = npcs.length > 0
            ? `\n\n👤 **Present Here:** ${npcs.map((n) => `**${n.name}** (${n.role} — *${n.attitude}*): *"${n.dialogue}"*`).join('\n')}`
            : '';
        const exitLine = currentNode?.choices?.length
            ? `\n\n🧭 **Available Actions & Exits:** ${currentNode.choices.filter((c) => !c.hiddenUntilSearched).map((c) => `*${c.label}*`).join(' • ')}`
            : '';
        narrativeResponse = `📍 **${roomTitle}**\n${currentNode?.readAloud || 'Torchlight flickers across ancient stone walls.'}${npcLine}${exitLine}`;
    } else if (lower.includes('companion') || lower.includes('party') || lower.includes('talk')) {
        narrativeResponse = `You confer with your party in **${roomTitle}**. Your companions check their weapons and spell pouches, offering their counsel on the road ahead.`;
    } else {
        narrativeResponse = `In **${roomTitle}**, you ${action}. ${currentNode?.dmNotes ? `You take note of the chamber's layout: ${currentNode.dmNotes}` : 'The air hums with quiet tension as you prepare your next move.'}`;
    }

    return {
        text: narrativeResponse,
        requiresRoll: false,
        companionResponses: generateCompanionResponses(companions, 'exploration', null)
    };
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateDMResponse = async (context, selectedModel = 'auto') => {
    const useGemini = selectedModel === 'gemini'
        ? (isGeminiAvailable() && geminiModel)
        : selectedModel === 'mock'
            ? false
            : (isGeminiAvailable() && geminiModel);

    let response;
    let modelUsed;

    if (useGemini) {
        response = await generateGeminiResponse(context);
        modelUsed = 'gemini';
        logEvent('dm_response_generated', { model: modelUsed, requiresRoll: response.requiresRoll });
    } else {
        await delay(220);
        response = generateMockResponse(context);
        modelUsed = 'mock';
        logEvent('dm_response_generated', { model: modelUsed, requiresRoll: response.requiresRoll });
    }

    return {
        success: true,
        message: response.text,
        companionResponses: response.companionResponses,
        metadata: {
            roll: response.roll,
            rollType: response.rollType,
            actionType: response.actionType,
            requiresRoll: response.requiresRoll,
            waitingForRoll: response.waitingForRoll,
            rollParams: response.rollParams,
            isSuccess: response.isSuccess,
            aiModel: modelUsed,
            timestamp: new Date().toISOString()
        }
    };
};

export const resolveDiceRoll = async (context, rollResult, originalAction, selectedModel = 'auto') => {
    const fullContext = {
        ...context,
        action: originalAction,
        rollResult
    };

    return generateDMResponse(fullContext, selectedModel);
};

export const generateOpeningNarrative = async (adventure, character, selectedModel = 'auto') => {
    const startNode = adventure?.startNodeId && adventure?.nodes
        ? adventure.nodes[adventure.startNodeId]
        : null;

    const useGemini = selectedModel === 'gemini'
        ? (isGeminiAvailable() && geminiModel)
        : selectedModel === 'mock'
            ? false
            : (isGeminiAvailable() && geminiModel);

    if (useGemini) {
        try {
            const prompt = `You are a cinematic Dungeon Master starting a D&D 5e campaign.

**Adventure**: ${adventure?.name || 'A New Beginning'}
**Setting**: ${adventure?.setting || 'The Forgotten Realms'}
**Starting Chamber**: ${startNode?.title || 'Opening Scene'}
**Module Boxed Text**: ${startNode?.readAloud || adventure?.openingNarrative || ''}
**Hero**: ${character?.name || 'Hero'} (Level ${character?.level || 1} ${character?.race} ${character?.class})

Write a punchy, atmospheric 2-paragraph opening narration that incorporates the Starting Chamber's details and ends with "What do you do?"`;

            const result = await geminiModel.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Gemini opening narrative error:', error);
        }
    }

    if (startNode && startNode.readAloud) {
        return `📜 **${adventure.name}** — *${startNode.title}*\n\n${adventure.openingNarrative}\n\n---\n📍 **${startNode.title}**\n${startNode.readAloud}`;
    }

    if (adventure && adventure.openingNarrative) {
        return adventure.openingNarrative;
    }

    return `Your adventure begins, brave ${character?.race || 'adventurer'}. What do you do?`;
};

export const AI_MODELS = {
    mock: { id: 'mock', name: 'Built-in 5e DM Engine (Offline)', available: true },
    gemini: { id: 'gemini', name: 'Google Gemini AI + 5e Engine', get available() { return hasApiKey(); } },
    openai: { id: 'openai', name: 'OpenAI GPT-4', available: false }
};

export const getCurrentModel = () => hasApiKey() ? AI_MODELS.gemini : AI_MODELS.mock;
