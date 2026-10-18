import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { generateDMResponse, generateOpeningNarrative, resolveDiceRoll, getAbilityModifier } from '../services/aiService';
import soundService from '../services/soundService';
import ChatInterface from '../components/game/ChatInterface';
import CharacterSheet from '../components/game/CharacterSheet';
import Inventory from '../components/game/Inventory';
import DiceRoller from '../components/game/DiceRoller';
import DungeonAutomap from '../components/game/DungeonAutomap';
import SpellbookPanel from '../components/game/SpellbookPanel';
import BestiaryCodex from '../components/game/BestiaryCodex';
import CombatEncounterHUD from '../components/game/CombatEncounterHUD';
import SettingsModal from '../components/game/SettingsModal';
import DefeatModal from '../components/game/DefeatModal';
import { logError } from '../services/telemetry';
import { getClassById } from '../data/classes';
import { getMonsterById } from '../data/monsters';
import { getAdventureById } from '../data/adventures';
import { getSceneImage, getVoiceTrack } from '../data/assets';
import { normalizeCompanion } from '../context/gameState';
import {
    calculateCharacterDerivedStats,
    createCombatEncounter,
    resolveWeaponAttack,
    resolveSpellCast,
    resolveCompanionTurn,
    resolveMonsterTurn,
    resolveDeathSave,
    rollD20Test,
    rollDiceFormula,
    getProficiencyBonus,
    formatMod
} from '../services/dndEngine';
import {
    describePlayerWeaponAttack,
    describePlayerSpellCast,
    describeCompanionCombatAction,
    describeMonsterAttackTarget,
    describeMonsterSpellTarget,
    cleanProse,
    SPELL_CONDITION_EFFECTS
} from '../services/combatNarrative';

export default function GameInterface() {
    const navigate = useNavigate();
    const {
        state,
        addChatMessage,
        updateHp,
        updateGold,
        gainXp,
        levelUp,
        useSpellSlot: consumeSpellSlot,
        addCondition,
        removeCondition,
        shortRest,
        longRest,
        addInventoryItem,
        removeInventoryItem,
        equipItem,
        unequipItem,
        setCurrentNode,
        markNodeSearched,
        markNodeLooted,
        markNodeDefeated,
        markNodeDisarmed,
        markChoiceCompleted,
        unlockMonsterCodex,
        setCombat,
        updateCombat,
        endCombat,
        setCompanions,
        setDeathSaves,
        reviveCharacter,
        loadGame,
        updateSettings,
        resetGame,
        setPendingRoll,
        clearPendingRoll
    } = useGame();

    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [isDefeatModalOpen, setIsDefeatModalOpen] = useState(false);
    const [defeatCause, setDefeatCause] = useState('Succumbed to mortal wounds in battle.');
    const [sidebarTab, setSidebarTab] = useState('character');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isReaderMode, setIsReaderMode] = useState(false);
    const [readerFontSize, setReaderFontSize] = useState('normal'); // 'normal' | 'large' | 'huge'
    const [readerTheme, setReaderTheme] = useState('dark'); // 'dark' | 'parchment' | 'midnight'
    const [isCombatResolving, setIsCombatResolving] = useState(false);
    const initializationRef = useRef(false);

    const isGameStarted = state.gameStarted;
    // Hydrate adventure nodes from canonical adventures.js if saved state had an older partial object
    const canonicalAdventure = state.adventure?.id ? getAdventureById(state.adventure.id) : null;
    const activeAdventure = (state.adventure?.nodes ? state.adventure : (canonicalAdventure || state.adventure));
    const character = state.character;
    const aiModel = state.settings.aiModel;
    const chatHistoryLength = state.chatHistory.length;

    const currentNodeId = state.currentNodeId || activeAdventure?.startNodeId || (activeAdventure?.nodes ? Object.keys(activeAdventure.nodes)[0] : null);
    const currentNode = (activeAdventure?.nodes && currentNodeId) ? activeAdventure.nodes[currentNodeId] : null;
    const cls = getClassById(character.class || 'fighter');
    const derivedStats = calculateCharacterDerivedStats(character, cls, null, state.equippedItems || []);

    useEffect(() => {
        soundService.init();
    }, []);

    useEffect(() => {
        soundService.setEnabled(state.settings.soundEnabled);
        soundService.setNarrationEnabled?.(Boolean(state.settings.narrationEnabled));
    }, [state.settings.soundEnabled, state.settings.narrationEnabled]);

    useEffect(() => {
        if (!state.gameStarted || !state.adventure) {
            navigate('/');
        }
    }, [state.gameStarted, state.adventure, navigate]);

    // Initialize current node if not set
    useEffect(() => {
        if (isGameStarted && activeAdventure?.startNodeId && !state.currentNodeId) {
            setCurrentNode(activeAdventure.startNodeId);
        }
    }, [isGameStarted, activeAdventure, state.currentNodeId, setCurrentNode]);

    // Generate opening narrative
    useEffect(() => {
        const initGame = async () => {
            if (isGameStarted && chatHistoryLength === 0 && activeAdventure && !initializationRef.current) {
                initializationRef.current = true;
                setIsLoading(true);
                const opening = await generateOpeningNarrative(activeAdventure, character, aiModel);
                const startNodeId = activeAdventure?.startNodeId;
                const startSceneImg = getSceneImage(startNodeId) || activeAdventure?.nodes?.[startNodeId]?.image;
                const introTrack = `${activeAdventure.id}-intro`;
                const hasIntroTrack = Boolean(getVoiceTrack(introTrack));

                addChatMessage({
                    type: 'ai',
                    text: opening,
                    timestamp: new Date().toISOString(),
                    ...(startSceneImg ? { image: startSceneImg } : {}),
                    ...(hasIntroTrack ? { voiceTrack: introTrack } : {})
                });
                const startNode = activeAdventure?.nodes?.[startNodeId];
                if (startNode?.companionMoments?.length && state.companions?.length) {
                    const matched = findCompanionMoments(startNode.companionMoments, state.companions);
                    matched.forEach(({ companion, text }) => {
                        const compVoice = getCompanionVoiceTrack(companion);
                        addChatMessage({
                            type: 'companion',
                            companionName: companion.name,
                            companionRace: companion.race,
                            companionClass: companion.class,
                            abilities: companion.specialAbility || companion.signatureMove,
                            personality: companion.personality,
                            text,
                            voiceTrack: compVoice,
                            timestamp: new Date().toISOString()
                        });
                    });
                }
                soundService.play('message');
                if (state.settings.narrationEnabled) {
                    if (hasIntroTrack) {
                        soundService.playVoice(introTrack);
                    } else {
                        soundService.speak?.(opening, 'dm');
                    }
                }
                setIsLoading(false);
            }
        };
        initGame();
    }, [isGameStarted, chatHistoryLength, activeAdventure, character, aiModel, addChatMessage, state.settings.narrationEnabled, state.companions]);

    const getCompanionVoiceTrack = (companion) => {
        if (!companion) return null;
        const cClass = (companion.class || '').toLowerCase();
        if (cClass.includes('cleric') || cClass.includes('paladin')) return 'cleric-heal';
        if (cClass.includes('wizard') || cClass.includes('sorcerer') || cClass.includes('warlock')) return 'wizard-burst';
        if (cClass.includes('rogue') || cClass.includes('ranger')) return 'rogue-sneak';
        return null;
    };

    const findCompanionMoments = (moments = [], companions = []) => {
        if (!Array.isArray(moments) || !Array.isArray(companions) || companions.length === 0) return [];
        const livingCompanions = companions.filter(
            (c) => !c.isDead && (c.hp !== undefined ? c.hp > 0 : true)
        );
        if (livingCompanions.length === 0) return [];
        const results = [];
        const usedCompanions = new Set();

        for (const moment of moments) {
            if (!moment?.text) continue;
            // 1. Exact or partial companion name match
            let matchedComp = livingCompanions.find(
                (c) =>
                    !usedCompanions.has(c.name) &&
                    moment.companionName &&
                    (c.name.toLowerCase() === moment.companionName.toLowerCase() ||
                        moment.companionName.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]))
            );
            // 2. Fallback to class or race match
            if (!matchedComp && (moment.matchClass || moment.matchRace)) {
                matchedComp = livingCompanions.find(
                    (c) =>
                        !usedCompanions.has(c.name) &&
                        ((moment.matchClass && c.class?.toLowerCase() === moment.matchClass.toLowerCase()) ||
                            (moment.matchRace && c.race?.toLowerCase() === moment.matchRace.toLowerCase()))
                );
            }
            if (matchedComp) {
                usedCompanions.add(matchedComp.name);
                results.push({ companion: matchedComp, text: moment.text });
            }
        }
        return results;
    };

    const pushDmMessage = (text, extra = {}) => {
        addChatMessage({
            type: 'ai',
            text,
            timestamp: new Date().toISOString(),
            ...extra
        });
        if (state.settings.narrationEnabled) {
            if (extra.voiceTrack && getVoiceTrack(extra.voiceTrack)) {
                soundService.playVoice(extra.voiceTrack);
            } else {
                soundService.speak?.(text, 'dm');
            }
        }
    };

    // === ROOM NAVIGATION & LIVING MODULE ACTIONS ===
    const handleSelectNode = (targetNodeId) => {
        if (!activeAdventure?.nodes?.[targetNodeId]) return;
        const targetNode = activeAdventure.nodes[targetNodeId];
        setCurrentNode(targetNodeId);
        soundService.play('click');

        // Unlock monsters in Bestiary Codex if present
        if (targetNode.encounter?.monsters?.length) {
            unlockMonsterCodex(targetNode.encounter.monsters.map((m) => m.monsterId));
        }

        const isCleared = state.defeatedNodes.includes(targetNodeId);
        const npcInfo = targetNode.npcs?.length
            ? `\n\n💬 **NPCs Present:**\n${targetNode.npcs.map((n) => `• **${n.name}** (*${n.role}*, Attitude: **${n.attitude}**): "${n.dialogue}"`).join('\n')}`
            : '';
        const encounterAlert = targetNode.encounter && !isCleared
            ? `\n\n⚔️ **Encounter Threat:** **${targetNode.encounter.title}** (${targetNode.encounter.monsters?.map((m) => `${m.count}× ${m.name}`).join(', ')})! Click **Engage** below or attack to begin tactical combat!`
            : '';

        let roomVoiceTrack = null;
        if (targetNodeId === 'wave_echo_forge') {
            roomVoiceTrack = 'spell-forge';
        } else if (targetNodeId === 'ritual_ossuary') {
            roomVoiceTrack = 'haunted-manor-purification';
        } else if (targetNodeId === 'astrolabe_chamber') {
            roomVoiceTrack = 'ancient-temple-vision';
        } else if (targetNodeId === 'phandalin_hub' || targetNodeId === 'rusty_anchor') {
            roomVoiceTrack = 'tavern-keeper';
        } else if (targetNode.type === 'victory') {
            if (activeAdventure?.id === 'lost-mine') roomVoiceTrack = 'lost-mine-victory';
            else if (activeAdventure?.id === 'dragon-lair') roomVoiceTrack = 'dragon-lair-victory';
            else if (activeAdventure?.id === 'thieves-guild') roomVoiceTrack = 'thieves-guild-victory';
            else if (activeAdventure?.id === 'ancient-temple') roomVoiceTrack = 'ancient-temple-victory';
        }

        const sceneImg = getSceneImage(targetNodeId) || targetNode.image;
        pushDmMessage(
            `📍 **${targetNode.title}**\n\n${targetNode.readAloud}${npcInfo}${encounterAlert}`,
            {
                ...(sceneImg ? { image: sceneImg } : {}),
                ...(roomVoiceTrack ? { voiceTrack: roomVoiceTrack } : {})
            }
        );

        // Surface any personal companion story moments for this room
        if (targetNode.companionMoments?.length && state.companions?.length) {
            const matched = findCompanionMoments(targetNode.companionMoments, state.companions);
            matched.forEach(({ companion, text }) => {
                const compVoice = getCompanionVoiceTrack(companion);
                addChatMessage({
                    type: 'ai',
                    speaker: companion.name,
                    text: `🗣️ **${companion.name}** (*${companion.race} ${companion.class}*):\n"${text}"`,
                    voiceTrack: compVoice,
                    timestamp: new Date().toISOString()
                });
            });
        }
    };

    const handleTriggerEncounter = (encounterDef) => {
        if (!encounterDef) return;
        soundService.play('combatStart');
        if (encounterDef.monsters?.length) {
            unlockMonsterCodex(encounterDef.monsters.map((m) => m.monsterId));
        }
        const combatState = createCombatEncounter(
            encounterDef,
            character,
            state.companions,
            getMonsterById
        );
        setCombat(combatState);

        const initProse = combatState.combatLog?.[0] ? cleanProse(combatState.combatLog[0]) : 'Battle Joined';
        const startProse = cleanProse(
            `${encounterDef.tacticalNotes || 'Hostile foes surge forward to surround your party.'} Steel is drawn and incantations echo across the chamber as battle begins!`
        );

        // Identify Boss voice track or fallback to combat initiative
        let encounterVoiceTrack = 'combat-initiative';
        const encounterTitleLower = (encounterDef.title || '').toLowerCase();
        const monsterIds = encounterDef.monsters?.map((m) => (m.monsterId || '').toLowerCase()) || [];

        if (encounterTitleLower.includes('nezznar') || encounterTitleLower.includes('black spider') || monsterIds.includes('black-spider')) {
            encounterVoiceTrack = 'nezznar-boss';
        } else if (encounterTitleLower.includes('voranthos') || monsterIds.includes('young-red-dragon') || monsterIds.includes('voranthos')) {
            encounterVoiceTrack = 'voranthos-boss';
        } else if (encounterTitleLower.includes('malakor') || (monsterIds.includes('wight') && encounterTitleLower.includes('lord'))) {
            encounterVoiceTrack = 'malakor-boss';
        } else if (encounterTitleLower.includes('vespera') || (monsterIds.includes('assassin') && encounterTitleLower.includes('guildmaster'))) {
            encounterVoiceTrack = 'vespera-boss';
        } else if (encounterTitleLower.includes('ssethra') || monsterIds.includes('yuan-ti-abomination') || encounterTitleLower.includes('sleeping god')) {
            encounterVoiceTrack = 'ssethra-boss';
        }

        addChatMessage({
            type: 'combat',
            subtype: 'skirmish_start',
            title: `Battle Joined: ${encounterDef.title}`,
            text: startProse,
            rollText: initProse,
            voiceTrack: encounterVoiceTrack,
            isNew: true,
            timestamp: new Date().toISOString()
        });

        if (state.settings.narrationEnabled) {
            soundService.playVoice(encounterVoiceTrack);
        }
    };

    const handleLootRoom = (node) => {
        if (!node?.loot || state.lootedNodes.includes(node.id)) return;
        soundService.play('gold');
        markNodeLooted(node.id);

        const goldFound = node.loot.gold || 0;
        if (goldFound > 0) {
            updateGold(goldFound);
        }

        const itemsFound = node.loot.items || [];
        itemsFound.forEach((item) => {
            addInventoryItem({ ...item, quantity: item.quantity || 1 });
        });

        const itemNames = itemsFound.map((i) => `**${i.name}**`).join(', ');
        pushDmMessage(
            `💰 **Treasure Hoard Claimed in ${node.title}!**\nYou recover **${goldFound} gp**${itemNames ? ` and add ${itemNames} to your inventory!` : '!'}`
        );
    };

    const handleSelectChoice = (choice) => {
        if (!choice) return;
        if (character.hp <= 0) {
            pushDmMessage("💀 You are unconscious at 0 HP and cannot explore! You must be revived before continuing.");
            setIsDefeatModalOpen(true);
            setDefeatCause('Unconscious at 0 HP — collapsed in the dungeon.');
            return;
        }
        soundService.play('click');

        const choiceKey = `${currentNodeId || currentNode?.id || 'node'}:${choice.id || choice.label}`;
        markChoiceCompleted(choiceKey);

        addChatMessage({
            type: 'user',
            text: `👉 ${choice.label}`,
            timestamp: new Date().toISOString()
        });

        // 1. Direct Room Movement (no check required)
        if (choice.type === 'move' || (choice.targetNodeId && !choice.dc)) {
            handleSelectNode(choice.targetNodeId);
            return;
        }

        // 2. Rest Choice
        if (choice.type === 'rest') {
            handleShortRest();
            return;
        }

        // 3. Direct Combat Choice
        if (choice.type === 'combat' && currentNode?.encounter) {
            handleTriggerEncounter(currentNode.encounter);
            return;
        }

        // 4. Skill Check / Search / Trap / Social / Puzzle Choice
        const skillOrAbility = (choice.skill || choice.ability || 'perception').toLowerCase();
        const skillAbilityMap = {
            athletics: 'strength',
            acrobatics: 'dexterity',
            'sleight-of-hand': 'dexterity',
            stealth: 'dexterity',
            arcana: 'intelligence',
            history: 'intelligence',
            investigation: 'intelligence',
            nature: 'intelligence',
            religion: 'intelligence',
            'animal-handling': 'wisdom',
            insight: 'wisdom',
            medicine: 'wisdom',
            perception: 'wisdom',
            survival: 'wisdom',
            deception: 'charisma',
            intimidation: 'charisma',
            performance: 'charisma',
            persuasion: 'charisma'
        };

        const governingAbility = skillAbilityMap[skillOrAbility] || skillOrAbility || 'wisdom';
        const abilityMod = derivedStats.mods[governingAbility] ?? 0;
        const isProf = (character.skills || []).includes(skillOrAbility);
        const pb = isProf ? getProficiencyBonus(character.level || 1) : 0;
        const dc = choice.dc || 12;

        soundService.play('diceRoll');
        const roll = rollD20Test({
            modifier: abilityMod,
            proficiency: pb,
            luckyRerollOnes: character.race === 'halfling'
        });

        const succeeded = roll.isCrit || (!roll.isFumble && roll.total >= dc);
        if (succeeded) {
            soundService.play('critical');
        } else {
            soundService.play('fumble');
        }

        let outcomeProse = succeeded
            ? (choice.successText || `Your ${skillOrAbility} check succeeds! You master the challenge in ${currentNode?.title || 'the room'}.`)
            : (choice.failText || `Your ${skillOrAbility} check falls short against the DC ${dc} challenge.`);

        // Apply rewards or reveal secrets on success
        if (succeeded) {
            if (currentNode) {
                markNodeSearched(currentNode.id);
                markNodeDisarmed(currentNode.id);
            }
            if (choice.rewardGold) {
                updateGold(choice.rewardGold);
                outcomeProse += `\n💰 **Reward:** +${choice.rewardGold} gp!`;
            }
            if (choice.rewardItem) {
                addInventoryItem(choice.rewardItem);
                outcomeProse += `\n🎁 **Acquired:** **${choice.rewardItem.name}**!`;
            }
            gainXp(35);
            outcomeProse += ` *(+35 XP)*`;
        } else if (choice.failDamageDice) {
            const trapDmg = rollDiceFormula(choice.failDamageDice);
            updateHp(-trapDmg.total);
            soundService.play('trap');
            outcomeProse += `\n⚠️ **Hazard Triggered:** You take **${trapDmg.total} damage** (${choice.failDamageDice})!`;
            if (character.hp - trapDmg.total <= 0) {
                outcomeProse += `\n💀 **MORTAL INJURY:** The trap reduces you to 0 HP! You collapse unconscious to the dungeon floor!`;
                soundService.playVoice('game-over', null, true);
                setTimeout(() => {
                    setIsDefeatModalOpen(true);
                    setDefeatCause(`Lethal Dungeon Trap: Suffered ${trapDmg.total} damage in ${currentNode?.title || 'the chamber'}.`);
                }, 1000);
            }
        }

        let choiceVoice = null;
        if (roll.isCrit) {
            choiceVoice = 'nat20-triumph';
        } else if (roll.isFumble) {
            choiceVoice = 'nat1-fumble';
        } else if (!succeeded && choice.failDamageDice) {
            choiceVoice = 'trap-triggered';
        }

        pushDmMessage(
            `🎲 **${skillOrAbility.toUpperCase()} Check (DC ${dc}):** Rolled **${roll.total}** (d20: ${roll.natural} ${formatMod(roll.totalMod)}) — **${succeeded ? 'SUCCESS!' : 'FAILURE!'}**\n\n${outcomeProse}`,
            {
                roll: roll.natural,
                ...(choiceVoice ? { voiceTrack: choiceVoice } : {})
            }
        );

        // If choice also moves to a target node on success (or unconditionally)
        if (choice.targetNodeId && succeeded) {
            setTimeout(() => {
                handleSelectNode(choice.targetNodeId);
            }, 350);
        }
    };

    // === COMBAT SYSTEM HANDLERS ===
    const checkCombatVictory = (updatedEnemies, currentCombat) => {
        const anyAlive = updatedEnemies.some((e) => e.hp > 0);
        if (!anyAlive) {
            soundService.play('victory');
            const xpWon = currentCombat.xpReward || 150;
            const goldWon = Math.max(15, Math.floor(xpWon / 5));
            gainXp(xpWon);
            updateGold(goldWon);
            if (currentNode) {
                markNodeDefeated(currentNode.id);
            }
            endCombat();

            let victoryTrack = null;
            if (activeAdventure?.id) {
                const advVic = `${activeAdventure.id}-victory`;
                if (getVoiceTrack(advVic)) {
                    victoryTrack = advVic;
                }
            }

            if (state.settings.narrationEnabled && victoryTrack) {
                soundService.playVoice(victoryTrack);
            }

            addChatMessage({
                type: 'combat',
                subtype: 'skirmish_victory',
                title: `Victory in ${currentCombat.title}`,
                text: `All enemies have fallen. The chamber settles into quiet save for the ragged breathing of your company. Your companions lower their weapons, having secured the field. You earn ${xpWon} XP and recover ${goldWon} gold pieces from the fallen.`,
                rollText: `+${xpWon} XP · +${goldWon} gp`,
                voiceTrack: victoryTrack,
                isNew: true,
                timestamp: new Date().toISOString()
            });
            return true;
        }
        return false;
    };

    const handleWeaponAttack = (weapon, targetEnemy, rollMode = 'normal', useDivineSmite = false) => {
        if (!state.combat || !targetEnemy) return;
        if (character.hp <= 0) {
            pushDmMessage("💀 You are unconscious at 0 HP and cannot attack! Roll a Death Saving Throw on your turn.");
            return;
        }
        if (state.combat.actionUsed) {
            pushDmMessage("⚠️ You have already used your Action this round! End your turn to let companions and enemies act.");
            return;
        }
        soundService.play('swordHit');

        const result = resolveWeaponAttack({
            character,
            weapon,
            targetEnemy,
            rollMode,
            useDivineSmite,
            companionCount: state.companions?.length || 0
        });

        if (useDivineSmite && result.hit) {
            consumeSpellSlot(1);
        }

        const isFatal = result.hit && (targetEnemy.hp - result.totalDamage <= 0);
        const remainingHp = Math.max(0, targetEnemy.hp - result.totalDamage);

        const narrative = describePlayerWeaponAttack({
            heroName: character.name || 'You',
            weaponName: result.weaponName,
            targetName: targetEnemy.name,
            hit: result.hit,
            isCrit: result.attackRoll.isCrit,
            damage: result.totalDamage,
            damageType: weapon?.damageType || 'slashing',
            isFatal,
            remainingHp,
            breakdown: result.damageBreakdown
        });

        const updatedEnemies = state.combat.enemies.map((e) =>
            e.instanceId === targetEnemy.instanceId
                ? { ...e, hp: Math.max(0, e.hp - result.totalDamage) }
                : e
        );

        const newFeedEntry = {
            id: `atk-${Date.now()}`,
            type: isFatal ? 'fatal_blow' : result.hit ? 'hero_attack' : 'miss',
            title: narrative.title,
            text: narrative.prose,
            rollText: narrative.rollText,
            attackerName: character.name || 'You',
            targetName: targetEnemy.name,
            damage: result.totalDamage,
            timestamp: Date.now()
        };

        const updatedFeed = [...(state.combat.rollingFeed || []), newFeedEntry].slice(-25);

        addChatMessage({
            type: 'combat',
            subtype: isFatal ? 'fatal_blow' : result.hit ? 'hero_attack' : 'miss',
            title: narrative.title,
            text: narrative.prose,
            rollText: narrative.rollText,
            attackerName: character.name || 'You',
            targetName: targetEnemy.name,
            damage: result.totalDamage,
            isNew: true,
            timestamp: new Date().toISOString()
        });

        if (isFatal) {
            soundService.play('critical');
        }

        if (!checkCombatVictory(updatedEnemies, state.combat)) {
            updateCombat({
                enemies: updatedEnemies,
                actionUsed: true,
                rollingFeed: updatedFeed
            });
        }
    };

    const handleCastCombatSpell = (spell, targetEnemy) => {
        if (!spell) return;
        if (character.hp <= 0) {
            pushDmMessage("💀 You are unconscious at 0 HP and cannot cast spells!");
            return;
        }
        if (state.combat?.active) {
            const isBonus = spell.castingTime === 'bonus';
            if (isBonus && state.combat.bonusActionUsed) {
                pushDmMessage("⚠️ You have already used your Bonus Action this round!");
                return;
            }
            if (!isBonus && state.combat.actionUsed) {
                pushDmMessage("⚠️ You have already used your Action this round! End your turn or wait for the next round.");
                return;
            }
        }
        if (spell.level > 0) {
            const slotKey = `level${spell.level}`;
            const availableSlots = state.character.spellSlots?.[slotKey]?.current ?? 0;
            if (availableSlots <= 0) {
                pushDmMessage(`⚠️ You have no Level ${spell.level} spell slots remaining!`);
                return;
            }
            consumeSpellSlot(spell.level);
        }

        if (spell.name?.toLowerCase().includes('fire')) {
            soundService.play('fireball');
        } else if (spell.type === 'heal') {
            soundService.play('heal');
        } else {
            soundService.play('spellCast');
        }

        const res = resolveSpellCast({
            character,
            spell,
            targetEnemy,
            classData: cls
        });

        if (res.kind === 'heal') {
            updateHp(res.totalHeal);
        } else if (res.kind === 'buff' && res.conditionAdded) {
            addCondition(res.conditionAdded);
        }

        const isFatal = res.hit && targetEnemy && (targetEnemy.hp - (res.totalDamage || 0) <= 0);
        const remainingHp = targetEnemy ? Math.max(0, targetEnemy.hp - (res.totalDamage || 0)) : 0;

        const narrative = describePlayerSpellCast({
            heroName: character.name || 'You',
            spell,
            targetName: targetEnemy?.name,
            hit: res.hit,
            isCrit: res.attackRoll?.isCrit,
            damage: res.totalDamage || res.totalHeal || 0,
            conditionApplied: res.conditionApplied || res.conditionAdded,
            isFatal,
            remainingHp,
            failedSave: res.failedSave,
            saveAbility: spell.saveAbility || 'DEX',
            saveDc: res.saveDc,
            enemyRoll: res.enemyRoll,
            isAoE: spell.isAoE
        });

        const newFeedEntry = {
            id: `spell-${Date.now()}`,
            type: isFatal ? 'fatal_blow' : 'spell',
            title: narrative.title,
            text: narrative.prose,
            rollText: narrative.rollText,
            spellName: spell.name,
            attackerName: character.name || 'You',
            targetName: targetEnemy?.name || 'Allies',
            damage: res.totalDamage || 0,
            timestamp: Date.now()
        };

        addChatMessage({
            type: 'combat',
            subtype: isFatal ? 'fatal_blow' : 'spell',
            title: narrative.title,
            text: narrative.prose,
            rollText: narrative.rollText,
            spellName: spell.name,
            effect: res.conditionApplied ? SPELL_CONDITION_EFFECTS[res.conditionApplied] : null,
            attackerName: character.name || 'You',
            targetName: targetEnemy?.name || 'Allies',
            damage: res.totalDamage || 0,
            isNew: true,
            timestamp: new Date().toISOString()
        });

        if (state.combat && state.combat.active) {
            let updatedEnemies = [...state.combat.enemies];
            if (targetEnemy && res.totalDamage > 0) {
                if (spell.isAoE) {
                    // AoE spells hit all living enemies
                    updatedEnemies = updatedEnemies.map((e) =>
                        e.hp > 0 ? { ...e, hp: Math.max(0, e.hp - res.totalDamage) } : e
                    );
                } else {
                    updatedEnemies = updatedEnemies.map((e) => {
                        if (e.instanceId !== targetEnemy.instanceId) return e;
                        const nextConds = res.conditionApplied && !e.conditions.includes(res.conditionApplied)
                            ? [...e.conditions, res.conditionApplied]
                            : e.conditions;
                        return {
                            ...e,
                            hp: Math.max(0, e.hp - res.totalDamage),
                            conditions: nextConds
                        };
                    });
                }
            } else if (targetEnemy && res.conditionApplied) {
                updatedEnemies = updatedEnemies.map((e) =>
                    e.instanceId === targetEnemy.instanceId
                        ? { ...e, conditions: Array.from(new Set([...(e.conditions || []), res.conditionApplied])) }
                        : e
                );
            }

            const updatedFeed = [...(state.combat.rollingFeed || []), newFeedEntry].slice(-25);

            if (isFatal) {
                soundService.play('critical');
            }

            if (!checkCombatVictory(updatedEnemies, state.combat)) {
                const isBonus = spell.castingTime === 'bonus';
                updateCombat({
                    enemies: updatedEnemies,
                    actionUsed: isBonus ? state.combat.actionUsed : true,
                    bonusActionUsed: isBonus ? true : state.combat.bonusActionUsed,
                    rollingFeed: updatedFeed
                });
            }
        }
    };

    const handleUseClassFeature = (feature, targetEnemy = null) => {
        if (!feature) return;
        if (character.hp <= 0) {
            pushDmMessage("💀 You are unconscious at 0 HP and cannot use class features!");
            return;
        }
        const featKey = (feature.id || feature.name || '').toLowerCase().replace(/[^a-z0-9]/g, '_');
        const currentRound = state.combat?.round || 1;
        const lastUsedRound = state.combat?.featureCooldowns?.[featKey];
        const COOLDOWN_ROUNDS = 4;

        if (state.combat?.active) {
            if (lastUsedRound !== undefined && (currentRound - lastUsedRound) < COOLDOWN_ROUNDS) {
                const roundsRemaining = COOLDOWN_ROUNDS - (currentRound - lastUsedRound);
                pushDmMessage(`⏳ **${feature.name}** is on cooldown! Available again in ${roundsRemaining} round${roundsRemaining === 1 ? '' : 's'} (Round ${lastUsedRound + COOLDOWN_ROUNDS}).`);
                return;
            }
            const isBonus = feature.actionType === 'bonus';
            if (isBonus && state.combat.bonusActionUsed) {
                pushDmMessage("⚠️ You have already used your Bonus Action this round!");
                return;
            }
            if (feature.actionType === 'action' && state.combat.actionUsed) {
                pushDmMessage("⚠️ You have already used your Action this round! End your turn or wait for the next round.");
                return;
            }
        }
        soundService.play('spellCast');
        const fname = (feature.name || '').toLowerCase();
        let logText = `⚡ You activate **${feature.name}**! ${feature.effect || ''}`;

        const nextFeatureCooldowns = state.combat ? {
            ...(state.combat.featureCooldowns || {}),
            [featKey]: currentRound
        } : {};

        if (fname.includes('second wind') || fname.includes('lay on hands')) {
            const heal = rollDiceFormula(`1d10+${character.level || 1}`).total;
            updateHp(heal);
            soundService.play('heal');
            logText = `💚 You use **${feature.name}**, recovering **${heal} Hit Points**!`;
        } else if (fname.includes('action surge') && state.combat) {
            updateCombat({ actionUsed: false, featureCooldowns: nextFeatureCooldowns });
            logText = `⚡ **ACTION SURGE!** Adrenaline surges through your veins—your Action is refreshed for another attack or spell this turn!`;
        } else if (fname.includes('rage')) {
            addCondition('raging');
            logText = `😡 **PRIMAL RAGE!** You gain +2 Melee Damage, Advantage on STR checks/saves, and Resistance to Bludgeoning, Piercing, and Slashing damage!`;
        } else if (fname.includes('cunning action') || fname.includes('hide') || fname.includes('step of the wind')) {
            addCondition('hidden');
            logText = `🥷 **${feature.name}!** You dart into the shadows—your next attack roll has **Advantage** (enabling Sneak Attack)!`;
        } else if (fname.includes('bardic inspiration')) {
            addCondition('inspired');
            logText = `🎵 **Bardic Inspiration!** Inspiring chords grant a **+1d6 Inspiration Die** to your next attack or check!`;
        } else if (fname.includes('turn undead') && state.combat) {
            const updatedEnemies = state.combat.enemies.map((e) => {
                if ((e.type || '').toLowerCase() === 'undead') {
                    return {
                        ...e,
                        hp: Math.max(0, e.hp - 12),
                        conditions: Array.from(new Set([...(e.conditions || []), 'frightened']))
                    };
                }
                return e;
            });
            updateCombat({ enemies: updatedEnemies, actionUsed: true, featureCooldowns: nextFeatureCooldowns });
            addChatMessage({
                type: 'combat',
                subtype: 'hero_action',
                title: `${character.name || 'Hero'} channels Divinity: Turn Undead`,
                text: `Holy radiance blazes through the chamber, searing Undead foes for 12 Radiant damage and leaving them Frightened!`,
                rollText: 'Turn Undead',
                isNew: true,
                timestamp: new Date().toISOString()
            });
            checkCombatVictory(updatedEnemies, state.combat);
            return;
        } else if (fname.includes('flurry of blows') || fname.includes('stunning strike')) {
            if (state.combat && targetEnemy) {
                const monkDmg = rollDiceFormula('2d6+3').total;
                const isStun = fname.includes('stunning');
                const updatedEnemies = state.combat.enemies.map((e) =>
                    e.instanceId === targetEnemy.instanceId
                        ? {
                            ...e,
                            hp: Math.max(0, e.hp - monkDmg),
                            conditions: isStun ? Array.from(new Set([...(e.conditions || []), 'stunned'])) : e.conditions
                        }
                        : e
                );
                addChatMessage({
                    type: 'combat',
                    subtype: 'hero_attack',
                    title: `${character.name || 'Hero'} strikes with ${feature.name}`,
                    text: `A swift series of lightning blows strikes ${targetEnemy.name} for ${monkDmg} Bludgeoning damage${isStun ? ' and leaves them Stunned!' : '!'}`,
                    rollText: `${monkDmg} Dmg${isStun ? ' · Stunned' : ''}`,
                    attackerName: character.name || 'You',
                    targetName: targetEnemy.name,
                    damage: monkDmg,
                    isNew: true,
                    timestamp: new Date().toISOString()
                });
                if (!checkCombatVictory(updatedEnemies, state.combat)) {
                    updateCombat({ enemies: updatedEnemies, bonusActionUsed: true, featureCooldowns: nextFeatureCooldowns });
                }
                return;
            }
        }

        if (state.combat && state.combat.active) {
            const isBonus = feature.actionType === 'bonus';
            updateCombat({
                actionUsed: isBonus ? state.combat.actionUsed : (fname.includes('action surge') ? false : true),
                bonusActionUsed: isBonus ? true : state.combat.bonusActionUsed,
                featureCooldowns: nextFeatureCooldowns
            });
            addChatMessage({
                type: 'combat',
                subtype: 'hero_action',
                title: `${character.name || 'Hero'} activates ${feature.name}`,
                text: cleanProse(logText),
                rollText: feature.actionType?.toUpperCase() || 'HERO FEATURE',
                isNew: true,
                timestamp: new Date().toISOString()
            });
        } else {
            pushDmMessage(logText);
        }
    };

    const handleDrinkPotion = (item) => {
        if (!item) return;
        if (state.combat?.active && state.combat.bonusActionUsed) {
            pushDmMessage("⚠️ You have already used your Bonus Action this round!");
            return;
        }
        soundService.play('potion');
        const healFormula = item.healDice || (item.name?.toLowerCase().includes('greater') ? '4d4+4' : '2d4+2');
        const healRoll = rollDiceFormula(healFormula);
        updateHp(healRoll.total);

        if (item.quantity > 1) {
            removeInventoryItem(item.id);
            addInventoryItem({ ...item, quantity: item.quantity - 1 });
        } else {
            removeInventoryItem(item.id);
        }

        if (state.combat?.active) {
            updateCombat({ bonusActionUsed: true });
            addChatMessage({
                type: 'combat',
                subtype: 'companion_heal',
                title: `${character.name || 'You'} drinks ${item.name}`,
                text: `You uncork the vial and quaff the draught. Soothing enchantment knits flesh and mends wounds, restoring ${healRoll.total} Hit Points.`,
                rollText: `+${healRoll.total} HP`,
                isNew: true,
                timestamp: new Date().toISOString()
            });
        } else {
            pushDmMessage(
                `🧪 You consume **${item.name}**, restoring **+${healRoll.total} Hit Points** (${healFormula})!`
            );
        }
    };

    const handleDodgeAction = () => {
        if (!state.combat) return;
        if (character.hp <= 0) {
            pushDmMessage("💀 You are unconscious at 0 HP and cannot dodge!");
            return;
        }
        if (state.combat.actionUsed) {
            pushDmMessage("⚠️ You have already used your Action this round! End your turn or wait for the next round.");
            return;
        }
        addCondition('dodging');
        updateCombat({ actionUsed: true });
        addChatMessage({
            type: 'combat',
            subtype: 'hero_action',
            title: `${character.name || 'You'} takes the Dodge Action`,
            text: `You shift into a defensive stance, focusing entirely on evasion. Attack rolls against you have Disadvantage until the start of your next turn.`,
            rollText: 'Disadvantage to Hit',
            isNew: true,
            timestamp: new Date().toISOString()
        });
    };

    const handleEndTurn = async () => {
        if (!state.combat || !state.combat.active || isCombatResolving) return;
        setIsCombatResolving(true);
        soundService.play('diceRoll');

        const COMBAT_REVEAL_SPEED = 200;
        const waitReveal = (proseText, basePauseMs = 1500) => {
            const wordCount = (proseText || '').trim().split(/\s+/).length;
            const duration = Math.max(3000, (wordCount * COMBAT_REVEAL_SPEED) + basePauseMs);
            return new Promise((resolve) => setTimeout(resolve, duration));
        };

        let workingEnemies = [...state.combat.enemies];
        let currentCompanions = [...(state.companions || [])];
        const newFeedEntries = [];

        // 1. Party Companions take their combat turns sequentially
        for (const comp of currentCompanions) {
            // Downed or dead companions cannot act
            const compEffectiveHp = comp.hp !== undefined ? comp.hp : (comp.maxHp || 18);
            if (comp.isDead || compEffectiveHp <= 0) continue;

            // Check if any enemies remain alive
            const livingTargets = workingEnemies.filter((e) => e.hp > 0);
            if (livingTargets.length === 0) break;

            const compTurn = resolveCompanionTurn(comp, workingEnemies, character);
            if (!compTurn) continue;

            if (compTurn.type === 'heal') {
                updateHp(compTurn.healAmount);
                const feedItem = {
                    id: `comp-heal-${Date.now()}-${Math.random()}`,
                    type: 'companion_heal',
                    title: `${comp.name} heals ${character.name || 'You'}`,
                    text: `${comp.name} casts Healing Word, restoring ${compTurn.healAmount} Hit Points!`,
                    rollText: `+${compTurn.healAmount} HP`,
                    timestamp: Date.now()
                };
                newFeedEntries.push(feedItem);
                addChatMessage({
                    type: 'combat',
                    subtype: 'companion_heal',
                    title: feedItem.title,
                    text: feedItem.text,
                    rollText: feedItem.rollText,
                    voiceTrack: 'cleric-heal',
                    isNew: true,
                    timestamp: new Date().toISOString()
                });
                if (state.settings.narrationEnabled) {
                    soundService.playVoice('cleric-heal');
                }
                await waitReveal(feedItem.text, 1000);
            } else if (compTurn.type === 'attack') {
                const target = workingEnemies.find((e) => e.instanceId === compTurn.targetId);
                const isFatal = compTurn.hit && target && (target.hp - compTurn.damage <= 0);
                const remainingHp = target ? Math.max(0, target.hp - compTurn.damage) : 0;

                if (compTurn.hit && compTurn.damage > 0) {
                    workingEnemies = workingEnemies.map((e) =>
                        e.instanceId === compTurn.targetId
                            ? { ...e, hp: Math.max(0, e.hp - compTurn.damage) }
                            : e
                    );
                    updateCombat({ enemies: workingEnemies });
                }

                const compNarrative = describeCompanionCombatAction({
                    companionName: comp.name,
                    companionClass: comp.class,
                    actionName: compTurn.abilities || 'Tactical Strike',
                    targetName: compTurn.targetName,
                    hit: compTurn.hit,
                    damage: compTurn.damage,
                    isFatal,
                    remainingHp,
                    companionBark: compTurn.text
                });

                let compVoice = null;
                const cClass = (comp.class || '').toLowerCase();
                if (cClass.includes('cleric') || cClass.includes('paladin')) compVoice = 'cleric-heal';
                else if (cClass.includes('wizard') || cClass.includes('sorcerer') || cClass.includes('warlock')) compVoice = 'wizard-burst';
                else if (cClass.includes('rogue') || cClass.includes('ranger')) compVoice = 'rogue-sneak';

                const feedItem = {
                    id: `comp-atk-${Date.now()}-${Math.random()}`,
                    type: isFatal ? 'fatal_blow' : compTurn.hit ? 'companion_attack' : 'miss',
                    title: compNarrative.title,
                    text: compNarrative.prose,
                    rollText: compNarrative.rollText,
                    attackerName: comp.name,
                    targetName: compTurn.targetName,
                    damage: compTurn.damage,
                    timestamp: Date.now()
                };
                newFeedEntries.push(feedItem);

                addChatMessage({
                    type: 'combat',
                    subtype: isFatal ? 'fatal_blow' : compTurn.hit ? 'companion_attack' : 'miss',
                    title: compNarrative.title,
                    text: compNarrative.prose,
                    rollText: compNarrative.rollText,
                    attackerName: comp.name,
                    targetName: compTurn.targetName,
                    damage: compTurn.damage,
                    voiceTrack: (compTurn.hit || isFatal) ? compVoice : null,
                    isNew: true,
                    timestamp: new Date().toISOString()
                });

                if (isFatal) {
                    soundService.play('critical');
                }
                if (state.settings.narrationEnabled && (compTurn.hit || isFatal) && compVoice) {
                    soundService.playVoice(compVoice);
                }

                await waitReveal(compNarrative.prose, 1200);

                // Check if Companions finished off all enemies
                if (checkCombatVictory(workingEnemies, state.combat)) {
                    setIsCombatResolving(false);
                    return;
                }
            }
        }

        // 2. Living Monsters take their 2024 MM turns sequentially
        let totalPlayerDamageTaken = 0;
        let anyCompanionDamaged = false;

        const livingEnemiesAtRoundStart = workingEnemies.filter((e) => e.hp > 0);

        for (const enemy of livingEnemiesAtRoundStart) {
            // Verify enemy is still alive (in case earlier effect damaged them)
            const currentEnemyState = workingEnemies.find((e) => e.instanceId === enemy.instanceId);
            if (!currentEnemyState || currentEnemyState.hp <= 0) continue;

            const mTurn = resolveMonsterTurn(currentEnemyState, character, derivedStats, currentCompanions);
            if (!mTurn) continue;

            let narrativeResult;
            if (mTurn.isSpellOrPower) {
                narrativeResult = describeMonsterSpellTarget({
                    monsterName: currentEnemyState.name,
                    actionName: mTurn.actionName,
                    spellName: mTurn.actionName,
                    targetName: mTurn.targetName,
                    isPlayer: mTurn.isTargetPlayer,
                    damage: mTurn.damage,
                    damageType: mTurn.damageType,
                    conditionInflicted: mTurn.conditionInflicted,
                    saved: mTurn.targetSaved,
                    saveAbility: mTurn.saveAbility,
                    saveDc: mTurn.saveDc,
                    saveRoll: mTurn.saveRoll,
                    remainingHp: mTurn.targetRemainingHp
                });
            } else {
                narrativeResult = describeMonsterAttackTarget({
                    monsterName: currentEnemyState.name,
                    actionName: mTurn.actionName,
                    targetName: mTurn.targetName,
                    isPlayer: mTurn.isTargetPlayer,
                    hit: mTurn.hit,
                    isCrit: mTurn.isCrit,
                    damage: mTurn.damage,
                    damageType: mTurn.damageType,
                    conditionInflicted: mTurn.conditionInflicted,
                    remainingHp: mTurn.targetRemainingHp
                });
            }

            const feedItem = {
                id: `mon-${Date.now()}-${Math.random()}`,
                type: mTurn.isSpellOrPower ? 'monster_spell' : (mTurn.damage > 0 ? 'monster_hit' : 'miss'),
                title: narrativeResult.title,
                text: narrativeResult.prose,
                spellName: mTurn.isSpellOrPower ? mTurn.actionName : null,
                effect: mTurn.conditionInflicted ? SPELL_CONDITION_EFFECTS[mTurn.conditionInflicted] : null,
                attackerName: currentEnemyState.name,
                targetName: mTurn.targetName,
                damage: mTurn.damage,
                rollText: narrativeResult.rollText,
                timestamp: Date.now()
            };
            newFeedEntries.push(feedItem);

            addChatMessage({
                type: 'combat',
                subtype: mTurn.isSpellOrPower ? 'monster_spell' : (mTurn.damage > 0 ? 'monster_hit' : 'miss'),
                title: narrativeResult.title,
                text: narrativeResult.prose,
                spellName: mTurn.isSpellOrPower ? mTurn.actionName : null,
                effect: mTurn.conditionInflicted ? SPELL_CONDITION_EFFECTS[mTurn.conditionInflicted] : null,
                attackerName: currentEnemyState.name,
                targetName: mTurn.targetName,
                damage: mTurn.damage,
                rollText: narrativeResult.rollText,
                isNew: true,
                timestamp: new Date().toISOString()
            });

            if (mTurn.isTargetPlayer) {
                if (mTurn.damageToPlayer > 0) {
                    const wasAlreadyDown = character.hp <= 0;
                    totalPlayerDamageTaken += mTurn.damageToPlayer;
                    if (character.hp - totalPlayerDamageTaken <= 0 && character.race === 'half-orc' && character.hp > 1) {
                        updateHp(-(character.hp - 1));
                    } else {
                        updateHp(-mTurn.damageToPlayer);
                        if (wasAlreadyDown) {
                            // Damage while at 0 HP = Death Save failure (2 failures if critical hit)
                            const failCount = mTurn.isCrit ? 2 : 1;
                            const prevFailures = character.deathSaves?.failures || 0;
                            const nextFailures = Math.min(3, prevFailures + failCount);
                            const updatedSaves = {
                                successes: character.deathSaves?.successes || 0,
                                failures: nextFailures
                            };
                            setDeathSaves(updatedSaves);
                            addChatMessage({
                                type: 'combat',
                                subtype: 'fatal_blow',
                                title: `💀 COUP-DE-GRÂCE: ${currentEnemyState.name} strikes you while unconscious!`,
                                text: `The blow inflicts ${failCount} Death Saving Throw failure${failCount > 1 ? 's' : ''}! (${nextFailures}/3 Failures)`,
                                rollText: `${failCount} Death Failure${failCount > 1 ? 's' : ''}`,
                                isNew: true,
                                timestamp: new Date().toISOString()
                            });
                            if (nextFailures >= 3) {
                                soundService.playVoice('game-over', null, true);
                                setIsDefeatModalOpen(true);
                                setDefeatCause(`${currentEnemyState.name}'s coup-de-grâce struck you down while unconscious.`);
                                setIsCombatResolving(false);
                                return;
                            }
                        } else if (character.hp - totalPlayerDamageTaken <= 0) {
                            soundService.playVoice('game-over', null, true);
                            addChatMessage({
                                type: 'combat',
                                subtype: 'fatal_blow',
                                title: `💀 HERO DOWNED: ${character.name || 'You'} collapsed!`,
                                text: `The devastating assault reduces you to 0 HP! Your vision blurs as darkness encroaches—you collapse unconscious to the dungeon floor, clinging to life!`,
                                rollText: `0 HP (Unconscious)`,
                                isNew: true,
                                timestamp: new Date().toISOString()
                            });
                        }
                    }
                }
                if (mTurn.conditionInflicted) {
                    addCondition(mTurn.conditionInflicted);
                }
            } else if (mTurn.targetCompanion) {
                const targetId = mTurn.targetCompanion.id;
                const targetName = (mTurn.targetCompanion.name || '').toLowerCase().trim();
                const dmgToTake = mTurn.damageToCompanion !== undefined ? mTurn.damageToCompanion : (mTurn.damage || 0);

                currentCompanions = currentCompanions.map((c) => {
                    const cName = (c.name || '').toLowerCase().trim();
                    const isMatch = (targetId && c.id && c.id === targetId) ||
                        (targetName && cName && (cName === targetName || cName.includes(targetName) || targetName.includes(cName)));
                    if (isMatch) {
                        anyCompanionDamaged = true;
                        const maxHp = c.maxHp || 18;
                        const currentHp = c.hp !== undefined ? c.hp : maxHp;
                        const nextHp = Math.max(0, currentHp - dmgToTake);
                        const isDead = nextHp <= 0;
                        if (isDead && !c.isDead) {
                            addChatMessage({
                                type: 'combat',
                                subtype: 'fatal_blow',
                                title: `💀 COMPANION SLAIN: ${c.name} has fallen!`,
                                text: `${c.name} takes a mortal wound and collapses lifeless to the dungeon floor!`,
                                rollText: 'SLAIN IN BATTLE',
                                isNew: true,
                                timestamp: new Date().toISOString()
                            });
                        }
                        return { ...c, maxHp, hp: nextHp, isDead };
                    }
                    return c;
                });
                setCompanions(currentCompanions);
            }

            if (mTurn.recoveredCondition) {
                workingEnemies = workingEnemies.map((e) =>
                    e.instanceId === currentEnemyState.instanceId
                        ? { ...e, conditions: (e.conditions || []).filter((c) => c !== mTurn.recoveredCondition) }
                        : e
                );
                updateCombat({ enemies: workingEnemies });
            }

            await waitReveal(narrativeResult.prose, 1200);
        }

        if (anyCompanionDamaged) {
            setCompanions(currentCompanions);
        }

        // Clear 1-round defensive conditions (dodging, shielded, hidden)
        removeCondition('dodging');
        removeCondition('shielded');
        removeCondition('hidden');

        // Check if entire party is wiped out (player down + all companions down)
        const livingComps = currentCompanions.filter((c) => (c.hp !== undefined ? c.hp : (c.maxHp || 18)) > 0 && !c.isDead);
        if (character.hp <= 0 && livingComps.length === 0) {
            soundService.playVoice('game-over', null, true);
            setIsDefeatModalOpen(true);
            setDefeatCause('Total Party Defeat: All heroes and party companions have fallen in battle.');
            setIsCombatResolving(false);
            return;
        }

        const updatedFeed = [...(state.combat.rollingFeed || []), ...newFeedEntries].slice(-30);

        updateCombat({
            enemies: workingEnemies,
            round: (state.combat.round || 1) + 1,
            actionUsed: false,
            bonusActionUsed: false,
            reactionUsed: false,
            rollingFeed: updatedFeed
        });

        setIsCombatResolving(false);
    };

    // === DEATH SAVING THROWS & DEFEAT HANDLERS ===
    const handleRollDeathSave = async () => {
        if (isCombatResolving) return;
        setIsCombatResolving(true);
        soundService.play('diceRoll');

        const result = resolveDeathSave(character.deathSaves);

        if (result.revived) {
            soundService.play('critical');
            updateHp(1); // Regain 1 HP and stand back up!
            setDeathSaves({ successes: 0, failures: 0 });
            removeCondition('unconscious');
        } else {
            setDeathSaves(result.deathSaves);
            if (result.dead) {
                soundService.play('fumble');
                soundService.playVoice('game-over', null, true);
            } else if (result.success) {
                soundService.play('critical');
            } else {
                soundService.play('fumble');
            }
        }

        const feedItem = {
            id: `death-save-${Date.now()}`,
            type: result.revived ? 'critical' : result.dead ? 'fatal_blow' : result.success ? 'check' : 'miss',
            title: result.revived
                ? `✨ HEROIC REVIVAL: Natural 20 on Death Save!`
                : result.dead
                    ? `💀 MORTAL DEFEAT: 3rd Death Save Failed!`
                    : `🎲 Death Saving Throw: Rolled ${result.roll}`,
            text: result.text,
            rollText: `d20: ${result.roll} (${result.success ? 'Success' : 'Failure'})`,
            timestamp: Date.now()
        };

        addChatMessage({
            type: 'combat',
            subtype: result.dead ? 'fatal_blow' : 'hero_action',
            title: feedItem.title,
            text: feedItem.text,
            rollText: feedItem.rollText,
            isNew: true,
            timestamp: new Date().toISOString()
        });

        if (result.dead) {
            setIsDefeatModalOpen(true);
            setDefeatCause('Accumulated 3 Death Saving Throw failures in battle.');
            setIsCombatResolving(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsCombatResolving(false);
        handleEndTurn();
    };

    const handleCallCompanionHelp = async () => {
        if (isCombatResolving) return;
        const healer = (state.companions || []).find((c) => {
            const isAlive = !c.isDead && (c.hp !== undefined ? c.hp : (c.maxHp || 18)) > 0;
            const cls = (c.class || '').toLowerCase();
            return isAlive && (cls.includes('cleric') || cls.includes('paladin') || cls.includes('druid') || (c.role || '').toLowerCase().includes('heal'));
        }) || (state.companions || []).find((c) => !c.isDead && (c.hp !== undefined ? c.hp : (c.maxHp || 18)) > 0);

        if (!healer) {
            pushDmMessage("⚠️ None of your companions are able to reach you with aid!");
            return;
        }

        setIsCombatResolving(true);
        soundService.play('heal');
        soundService.playVoice('cleric-heal');

        const healAmount = rollDiceFormula('1d8+3').total;
        updateHp(healAmount);
        setDeathSaves({ successes: 0, failures: 0 });
        removeCondition('unconscious');

        addChatMessage({
            type: 'combat',
            subtype: 'companion_heal',
            title: `❤️ ${healer.name} administers emergency aid to ${character.name || 'You'}!`,
            text: `${healer.name} rushes to your side with a muttered prayer of restoration, reviving you with +${healAmount} Hit Points! You gasp for air and stumble back onto your feet!`,
            rollText: `+${healAmount} HP (Revived!)`,
            voiceTrack: 'cleric-heal',
            isNew: true,
            timestamp: new Date().toISOString()
        });

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsCombatResolving(false);
    };

    const handleReviveHero = () => {
        setIsDefeatModalOpen(false);
        const reviveHp = Math.max(1, Math.floor((character.maxHp || 20) * 0.5));
        reviveCharacter(reviveHp, false);

        // Revive fallen companions to 50% HP
        const revivedCompanions = (state.companions || []).map((c, i) => {
            const norm = normalizeCompanion(c, i);
            return {
                ...norm,
                isDead: false,
                hp: Math.max(1, Math.floor(norm.maxHp * 0.5))
            };
        });
        setCompanions(revivedCompanions);

        soundService.play('heal');
        pushDmMessage(
            `⚡ **Heroic Second Wind!** You drag yourself back from the edge of oblivion, binding your mortal wounds with iron willpower! You and your party regain **50% Hit Points** (${reviveHp} HP)!`,
            { voiceTrack: 'healing-surge' }
        );
    };

    const handleRestartEncounter = () => {
        setIsDefeatModalOpen(false);
        reviveCharacter(character.maxHp || 20, false);

        // Restore companions to full HP
        const fullCompanions = (state.companions || []).map((c, i) => {
            const norm = normalizeCompanion(c, i);
            return { ...norm, isDead: false, hp: norm.maxHp };
        });
        setCompanions(fullCompanions);

        if (currentNode?.encounter) {
            handleTriggerEncounter(currentNode.encounter);
        }
    };

    const handleLoadLatestSave = () => {
        setIsDefeatModalOpen(false);
        loadGame();
    };

    const handleReturnToCharacterCreation = () => {
        setIsDefeatModalOpen(false);
        resetGame();
        navigate('/');
    };

    // === REST, SKILL CHECK & SHOP HANDLERS ===
    const handleShortRest = () => {
        soundService.play('rest');
        const hitDie = cls?.hitDice || 'd8';
        const conMod = derivedStats.mods.constitution || 0;
        const healRoll = rollDiceFormula(`1${hitDie}`);
        const totalHeal = Math.max(4, healRoll.total + conMod);
        shortRest(totalHeal);
        pushDmMessage(
            `⛺ **Short Rest Completed (1 Hour):** You bind your wounds and spend a Hit Die (${hitDie} + ${conMod}), recovering **+${totalHeal} HP** and refreshing short-rest powers!`,
            { voiceTrack: 'short-rest' }
        );
    };

    const handleLongRest = () => {
        soundService.play('rest');
        longRest();
        pushDmMessage(
            `🌙 **Long Rest Completed (8 Hours):** Your party makes camp. You awaken at **Full Hit Points (${character.maxHp} HP)** with all **Spell Slots**, **Hit Dice**, and **Class Features** completely restored!`,
            { voiceTrack: 'long-rest' }
        );
    };

    const handleRollSkillCheck = (skill, totalBonus) => {
        soundService.play('diceRoll');
        const roll = rollD20Test({
            modifier: totalBonus,
            luckyRerollOnes: character.race === 'halfling'
        });
        addChatMessage({
            type: 'user',
            text: `🎲 Rolling **${skill.name}** (${skill.ability.toUpperCase()}) check...`,
            timestamp: new Date().toISOString()
        });
        const rollVoice = roll.isCrit ? 'nat20-triumph' : (roll.isFumble ? 'nat1-fumble' : null);
        pushDmMessage(
            `🎯 **${skill.name} Check:** You rolled **${roll.total}** (d20: ${roll.natural} ${formatMod(totalBonus)})${roll.isCrit ? ' — **NATURAL 20!**' : roll.isFumble ? ' — **NATURAL 1!**' : '!'}`,
            { roll: roll.natural, ...(rollVoice ? { voiceTrack: rollVoice } : {}) }
        );
    };

    const handleLevelUp = () => {
        soundService.play('levelUp');
        levelUp();
        pushDmMessage(
            `⭐ **LEVEL UP!** You advance to Level ${(character.level || 1) + 1}! Your maximum Hit Points increase, your proficiency deepens, and new martial and arcane powers awaken!`,
            { voiceTrack: 'level-up' }
        );
    };

    const handleBuyShopItem = (shopItem) => {
        if (!shopItem || (character.gold ?? 25) < (shopItem.costGp || 15)) return;
        soundService.play('gold');
        updateGold(-(shopItem.costGp || 15));
        const purchased = { ...shopItem, id: `${shopItem.id}_${Date.now()}`, quantity: 1 };
        addInventoryItem(purchased);
        if (['weapon', 'armor', 'shield'].includes(purchased.type)) {
            equipItem(purchased);
        }
        pushDmMessage(
            `🛒 **Purchased ${shopItem.name}** for **${shopItem.costGp} gp**!${['weapon', 'armor', 'shield'].includes(purchased.type) ? ' (Automatically equipped!)' : ''}`
        );
    };

    const handleExportCharacterSheet = () => {
        const exportPayload = {
            exportedAt: new Date().toISOString(),
            adventure: activeAdventure?.name,
            currentNodeId,
            character,
            derivedStats,
            equippedItems: state.equippedItems,
            inventory: state.inventory,
            companions: state.companions
        };
        const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(character.name || 'dnd_hero').toLowerCase().replace(/\s+/g, '_')}_sheet.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // === FREEFORM CHAT & MANUAL ROLL HANDLERS ===
    const handleSendMessage = async (text) => {
        soundService.play('click');

        addChatMessage({
            type: 'user',
            text,
            timestamp: new Date().toISOString()
        });

        if (text.includes('🎲') || text.toLowerCase().includes('roll')) {
            soundService.play('diceRoll');
        }

        setIsLoading(true);
        try {
            const response = await generateDMResponse({
                character: state.character,
                companions: state.companions,
                previousTurns: state.chatHistory,
                action: text,
                currentNode
            }, state.settings.aiModel);

            if (response.metadata?.waitingForRoll) {
                setPendingRoll(response.metadata.rollParams);
            }

            if (response.metadata?.roll) {
                if (response.metadata.roll === 20) {
                    soundService.play('critical');
                } else if (response.metadata.roll === 1) {
                    soundService.play('fumble');
                }
            }

            soundService.play('message');

            addChatMessage({
                type: 'ai',
                text: response.message,
                roll: response.metadata?.roll,
                timestamp: response.metadata?.timestamp,
                companionMessages: response.companionResponses || []
            });

            if (state.settings.narrationEnabled) {
                soundService.speak?.(response.message, 'dm');
            }
        } catch (error) {
            logError('dm_response_failed_ui', error, { aiModel: state.settings.aiModel });
            addChatMessage({
                type: 'ai',
                text: 'The Dungeon Master pauses... (An error occurred. Please try again.)',
                timestamp: new Date().toISOString()
            });
        }
        setIsLoading(false);
    };

    const handleManualDiceRoll = async (rollResult) => {
        if (!state.pendingRoll) return;
        soundService.play('diceRoll');

        const total = rollResult.value;
        const rollText = `🎲 I rolled a ${total}!`;
        addChatMessage({
            type: 'user',
            text: rollText,
            timestamp: new Date().toISOString()
        });

        const { ability, dc, action, characterName } = state.pendingRoll;
        let modifier = 0;

        if (!characterName || characterName === 'player') {
            const statScore = state.character.stats[ability] || 10;
            modifier = getAbilityModifier(statScore);
        } else {
            modifier = 2;
        }

        const finalTotal = total + modifier;
        const isSuccess = total === 20 || (total !== 1 && finalTotal >= dc);

        clearPendingRoll();
        setIsLoading(true);

        try {
            const resolutionData = {
                roll: total,
                modifier,
                total: finalTotal,
                dc,
                isSuccess
            };

            const response = await resolveDiceRoll({
                character: state.character,
                companions: state.companions,
                previousTurns: state.chatHistory,
                currentNode
            }, resolutionData, action, state.settings.aiModel);

            if (total === 20 || isSuccess) soundService.play('critical');
            else soundService.play('fumble');

            addChatMessage({
                type: 'ai',
                text: response.message,
                roll: total,
                timestamp: response.metadata?.timestamp,
                companionMessages: response.companionResponses || []
            });
        } catch (error) {
            logError('roll_resolution_failed_ui', error, { action });
            addChatMessage({
                type: 'ai',
                text: 'The dice settle, and fate shifts in the dungeon...',
                timestamp: new Date().toISOString()
            });
        }
        setIsLoading(false);
    };

    if (!state.gameStarted || !state.adventure) {
        return null;
    }

    const sidebarTabs = [
        { id: 'character', label: 'Hero', icon: '👤' },
        { id: 'map', label: 'Map', icon: '🗺️' },
        { id: 'spells', label: 'Spells', icon: '🔮' },
        { id: 'inventory', label: 'Gear', icon: '🎒' },
        { id: 'codex', label: 'Codex', icon: '👹' },
        { id: 'dice', label: 'Dice', icon: '🎲' }
    ];

    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors">
            {/* Floating Story Mode Controls (Zero-clutter overlay, no top banner) */}
            {isReaderMode && (
                <aside aria-label="Story mode controls" className="fixed top-2.5 right-2.5 sm:top-3 sm:right-4 z-30 flex items-center gap-1 bg-slate-900/85 hover:bg-slate-900 backdrop-blur-md px-2 py-1 rounded-full border border-slate-700/70 shadow-lg text-white transition-opacity opacity-80 hover:opacity-100">
                    <button
                        type="button"
                        onClick={() => {
                            const themes = ['dark', 'parchment', 'midnight'];
                            const nextIndex = (themes.indexOf(readerTheme) + 1) % themes.length;
                            setReaderTheme(themes[nextIndex]);
                        }}
                        className="p-1 hover:bg-slate-800 rounded-full text-xs"
                        title="Toggle Reader Theme (Dark / Parchment / Midnight)"
                    >
                        {readerTheme === 'parchment' ? '📜' : readerTheme === 'midnight' ? '🌌' : '🌙'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setReaderFontSize(readerFontSize === 'huge' ? 'large' : readerFontSize === 'large' ? 'normal' : 'large')}
                        className="px-1.5 py-0.5 hover:bg-slate-800 rounded text-[11px] font-bold text-gray-300"
                        title="Adjust Font Size"
                    >
                        {readerFontSize === 'normal' ? 'A' : readerFontSize === 'large' ? 'A+' : 'A++'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsReaderMode(false)}
                        className="ml-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm hover:brightness-110 active:scale-95 transition-all"
                        title="Exit Story Mode"
                    >
                        <span>✕</span>
                        <span>Exit</span>
                    </button>
                </aside>
            )}

            {/* Standard Header (Hidden in Story Mode) */}
            {!isReaderMode && (
                <header className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-3 sm:px-4 py-2.5 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Return to Main Menu"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </button>
                        <div className="truncate max-w-[140px] sm:max-w-xs md:max-w-sm">
                            <h1 className="font-display font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-1.5 truncate">
                                <span>{activeAdventure.icon}</span>
                                <span className="truncate">{activeAdventure.name}</span>
                            </h1>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                {currentNode ? `📍 ${currentNode.title}` : activeAdventure.setting}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Story Reader Focus Mode Button */}
                        <button
                            type="button"
                            onClick={() => setIsReaderMode(true)}
                            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                            title="Enter Story Focus Mode (Hides interface clutter)"
                        >
                            <span>📖</span>
                            <span className="font-semibold">Story Mode</span>
                        </button>

                        {/* Quick Vitals Pill (desktop) */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-gray-200">
                            <span>❤️ {character.hp}/{character.maxHp}</span>
                            <span>•</span>
                            <span>🛡️ AC {derivedStats.ac}</span>
                            <span>•</span>
                            <span>💰 {character.gold ?? 25} gp</span>
                            <span>•</span>
                            <span>⭐ Lvl {character.level || 1}</span>
                        </div>

                        {/* Voice Narration Toggle */}
                        <button
                            type="button"
                            onClick={() => {
                                if (state.settings.narrationEnabled) {
                                    soundService.stopSpeaking?.();
                                    updateSettings({ narrationEnabled: false });
                                } else {
                                    updateSettings({ narrationEnabled: true });
                                }
                            }}
                            className={`p-1.5 sm:p-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                                state.settings.narrationEnabled
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300'
                            }`}
                            title={state.settings.narrationEnabled ? 'Auto Voice Narration ON (Click to Mute)' : 'Enable Voice Narration (TTS)'}
                        >
                            <span>{state.settings.narrationEnabled ? '🗣️' : '🔇'}</span>
                            <span className="hidden sm:inline text-xs">TTS</span>
                        </button>

                        {/* Export Sheet JSON */}
                        <button
                            type="button"
                            onClick={handleExportCharacterSheet}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hidden sm:inline-block"
                            title="Export D&D 5e Character Sheet JSON"
                        >
                            💾
                        </button>

                        {/* Mobile Sidebar Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-700 dark:text-gray-200 font-bold flex items-center gap-1 text-xs"
                            title="Open Hero & Tabletop Stats"
                        >
                            <span className="text-base">🛡️</span>
                            <span className="hidden xs:inline">Stats</span>
                        </button>

                        {/* Settings */}
                        <button
                            type="button"
                            onClick={() => setShowSettings(true)}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Settings"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Center Column: Live Combat HUD (when active) + Narrative Chat */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {!isReaderMode && state.combat?.active && (
                        <div className="max-h-[36%] sm:max-h-[40%] overflow-y-auto flex-shrink-0">
                            <CombatEncounterHUD
                                combat={state.combat}
                                character={character}
                                companions={state.companions || []}
                                equippedItems={state.equippedItems}
                                inventory={state.inventory}
                                isCombatResolving={isCombatResolving}
                                onWeaponAttack={handleWeaponAttack}
                                onCastCombatSpell={handleCastCombatSpell}
                                onUseClassFeature={handleUseClassFeature}
                                onDrinkPotion={handleDrinkPotion}
                                onDodgeAction={handleDodgeAction}
                                onEndTurn={handleEndTurn}
                                onRollDeathSave={handleRollDeathSave}
                                onCallCompanionHelp={handleCallCompanionHelp}
                            />
                        </div>
                    )}

                    <div className="flex-1 overflow-hidden">
                        <ChatInterface
                            messages={state.chatHistory}
                            onSendMessage={handleSendMessage}
                            isLoading={isLoading}
                            animationsEnabled={state.settings.animationsEnabled}
                            pendingRoll={state.pendingRoll}
                            onManualRoll={handleManualDiceRoll}
                            currentNode={currentNode}
                            searchedNodes={state.searchedNodes}
                            lootedNodes={state.lootedNodes}
                            defeatedNodes={state.defeatedNodes}
                            completedChoices={state.completedChoices || []}
                            inCombat={Boolean(state.combat?.active)}
                            onSelectChoice={handleSelectChoice}
                            onTriggerEncounter={handleTriggerEncounter}
                            onLootRoom={handleLootRoom}
                            isReaderMode={isReaderMode}
                            onToggleReaderMode={() => setIsReaderMode(!isReaderMode)}
                            readerFontSize={readerFontSize}
                            readerTheme={readerTheme}
                        />
                    </div>
                </div>

                {/* Mobile Backdrop overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Right Tabletop HUD Sidebar (Responsive slide-over on mobile) */}
                <aside
                    className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 lg:static lg:z-auto lg:w-96 bg-white dark:bg-slate-800 border-l border-gray-100 dark:border-slate-700 flex flex-col transition-transform duration-300 ease-in-out lg:transform-none shadow-2xl lg:shadow-none flex-shrink-0 ${
                        isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
                    }`}
                >
                    {/* Mobile Header with Close Button */}
                    <div className="lg:hidden p-3 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between bg-gray-50 dark:bg-slate-900">
                        <span className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                            <span>🛡️</span> Hero & Tabletop HUD
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(false)}
                            className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-300 dark:hover:bg-slate-600"
                        >
                            ✕ Close
                        </button>
                    </div>
                    {/* Sidebar Navigation Tabs */}
                    <div className="grid grid-cols-6 border-b border-gray-100 dark:border-slate-700 flex-shrink-0">
                        {sidebarTabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setSidebarTab(tab.id)}
                                className={`py-2.5 px-1 text-[11px] font-semibold transition-colors flex flex-col items-center gap-0.5 ${
                                    sidebarTab === tab.id
                                        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 bg-primary-50/50 dark:bg-primary-900/20'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                                <span className="text-base">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Sidebar Active Tab Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {sidebarTab === 'character' && (
                            <CharacterSheet
                                character={state.character}
                                companions={state.companions}
                                equippedItems={state.equippedItems}
                                onHpChange={updateHp}
                                onLevelUp={handleLevelUp}
                                onRollSkillCheck={handleRollSkillCheck}
                                onRemoveCondition={removeCondition}
                            />
                        )}
                        {sidebarTab === 'map' && (
                            <DungeonAutomap
                                adventure={activeAdventure}
                                currentNodeId={currentNodeId}
                                visitedNodes={state.visitedNodes}
                                defeatedNodes={state.defeatedNodes}
                                lootedNodes={state.lootedNodes}
                                searchedNodes={state.searchedNodes}
                                onSelectNode={handleSelectNode}
                                inCombat={Boolean(state.combat?.active)}
                            />
                        )}
                        {sidebarTab === 'spells' && (
                            <SpellbookPanel
                                character={state.character}
                                onCastSpell={(spell) =>
                                    handleCastCombatSpell(
                                        spell,
                                        state.combat?.enemies?.find((e) => e.hp > 0) || null
                                    )
                                }
                                onUseClassFeature={(feat) =>
                                    handleUseClassFeature(
                                        feat,
                                        state.combat?.enemies?.find((e) => e.hp > 0) || null
                                    )
                                }
                                onShortRest={handleShortRest}
                                onLongRest={handleLongRest}
                                inCombat={Boolean(state.combat?.active)}
                                actionUsed={Boolean(state.combat?.actionUsed)}
                                bonusActionUsed={Boolean(state.combat?.bonusActionUsed)}
                                featureCooldowns={state.combat?.featureCooldowns}
                                round={state.combat?.round}
                            />
                        )}
                        {sidebarTab === 'inventory' && (
                            <Inventory
                                items={state.inventory}
                                equippedItems={state.equippedItems}
                                gold={state.character.gold ?? 25}
                                onAddItem={addInventoryItem}
                                onRemoveItem={removeInventoryItem}
                                onEquipItem={equipItem}
                                onUnequipItem={unequipItem}
                                onUseConsumable={handleDrinkPotion}
                                onBuyItem={handleBuyShopItem}
                            />
                        )}
                        {sidebarTab === 'codex' && (
                            <BestiaryCodex
                                encounteredMonsters={state.encounteredMonsters}
                            />
                        )}
                        {sidebarTab === 'dice' && (
                            <DiceRoller
                                onRoll={(result) => {
                                    soundService.play('diceRoll');
                                    const rollMsg = `🎲 Rolled ${result.die.toUpperCase()}: **${result.value}**${result.isCrit ? ' 🎉 CRITICAL!' : result.isFumble ? ' 💀 FUMBLE!' : ''}`;
                                    handleSendMessage(rollMsg);
                                }}
                                animationsEnabled={state.settings.animationsEnabled}
                            />
                        )}
                    </div>
                </aside>
            </div>

            {/* Settings Modal */}
            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                settings={state.settings}
                onSettingsChange={updateSettings}
                onResetGame={() => {
                    resetGame();
                    navigate('/');
                }}
            />

            {/* Defeat / Game Over Modal */}
            <DefeatModal
                isOpen={isDefeatModalOpen}
                character={character}
                adventure={currentAdventure}
                currentNode={currentNode}
                cause={defeatCause}
                onRevive={handleReviveHero}
                onRestartEncounter={currentNode?.encounter ? handleRestartEncounter : null}
                onLoadSave={handleLoadLatestSave}
                onNewCharacter={handleReturnToCharacterCreation}
            />
        </div>
    );
}
