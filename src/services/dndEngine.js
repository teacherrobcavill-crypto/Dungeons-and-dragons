// Authentic D&D 5e (2014 PHB + 2024 DMG/MM) Mechanical Resolution Engine
// Handles d20 Tests, Advantage/Disadvantage, Initiative, Action Economy,
// Weapon Attacks, Spellcasting, Class Features, Monster AI Turns, Rests, and Leveling.

export const XP_THRESHOLDS = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000
};

export const DMG_2024_XP_BUDGETS = {
    1: { low: 50, moderate: 75, high: 100 },
    2: { low: 100, moderate: 150, high: 200 },
    3: { low: 150, moderate: 225, high: 400 },
    4: { low: 250, moderate: 375, high: 500 },
    5: { low: 500, moderate: 750, high: 1100 },
    6: { low: 600, moderate: 1000, high: 1400 },
    7: { low: 750, moderate: 1300, high: 1700 },
    8: { low: 1000, moderate: 1700, high: 2100 },
    9: { low: 1300, moderate: 2000, high: 2600 },
    10: { low: 1600, moderate: 2300, high: 3100 }
};

export const CONDITIONS_INFO = {
    blinded: { name: 'Blinded', icon: '🙈', effect: 'Attack rolls have Disadvantage; attacks against have Advantage.' },
    charmed: { name: 'Charmed', icon: '💖', effect: 'Cannot attack the charmer; charmer has Advantage on social checks.' },
    frightened: { name: 'Frightened', icon: '😱', effect: 'Disadvantage on ability checks and attack rolls while source of fear is in sight.' },
    grappled: { name: 'Grappled', icon: '🐙', effect: 'Speed becomes 0; escape requires Athletics or Acrobatics check.' },
    incapacitated: { name: 'Incapacitated', icon: '💫', effect: 'Cannot take Actions, Bonus Actions, or Reactions.' },
    invisible: { name: 'Invisible', icon: '👻', effect: 'Attack rolls have Advantage; attacks against have Disadvantage.' },
    paralyzed: { name: 'Paralyzed', icon: '⚡', effect: 'Incapacitated; auto-fails STR/DEX saves; melee hits against are Critical Hits.' },
    petrified: { name: 'Petrified', icon: '🗿', effect: 'Turned to stone; Incapacitated; Resistance to all damage.' },
    poisoned: { name: 'Poisoned', icon: '🤢', effect: 'Disadvantage on attack rolls and ability checks.' },
    prone: { name: 'Prone', icon: '🔻', effect: 'Melee attacks against have Advantage; own attacks have Disadvantage.' },
    restrained: { name: 'Restrained', icon: '🕸️', effect: 'Speed 0; attacks have Disadvantage; attacks against have Advantage; DEX saves have Disadvantage.' },
    stunned: { name: 'Stunned', icon: '🌟', effect: 'Incapacitated; auto-fails STR/DEX saves; attacks against have Advantage.' },
    unconscious: { name: 'Unconscious', icon: '💀', effect: 'Incapacitated, Prone; auto-fails STR/DEX saves; melee hits are Critical Hits.' },
    raging: { name: 'Raging', icon: '😡', effect: '+2 Melee Damage, Advantage on STR checks/saves, Resistance to Bludgeoning/Piercing/Slashing.' },
    blessed: { name: 'Blessed', icon: '✨', effect: '+1d4 to Attack Rolls and Saving Throws.' },
    shielded: { name: 'Shield (+5 AC)', icon: '🛡️', effect: '+5 bonus to AC until the start of your next turn.' },
    hunters_mark: { name: "Hunter's Mark", icon: '🎯', effect: 'Deals an extra +1d6 weapon damage on every hit.' },
    hexed: { name: 'Hex', icon: '🔮', effect: 'Deals an extra +1d6 necrotic damage on every hit.' },
    dodging: { name: 'Dodging', icon: '💨', effect: 'Attacks against you have Disadvantage; Advantage on DEX saving throws.' },
    hidden: { name: 'Hidden', icon: '🥷', effect: 'Your next attack roll has Advantage (triggers Rogue Sneak Attack).' },
    inspired: { name: 'Bardic Inspiration', icon: '🎵', effect: '+1d6 bonus die added to your next d20 check, attack, or save.' }
};

export function getAbilityMod(score = 10) {
    return Math.floor(((Number(score) || 10) - 10) / 2);
}

export function formatMod(mod) {
    const n = Number(mod) || 0;
    return n >= 0 ? `+${n}` : `${n}`;
}

export function getProficiencyBonus(level = 1) {
    const lvl = Math.max(1, Number(level) || 1);
    return Math.ceil(lvl / 4) + 1;
}

export function rollDie(sides = 20) {
    return Math.floor(Math.random() * sides) + 1;
}

export function rollDiceFormula(formula = '1d6', criticalDoubleDice = false) {
    if (!formula || typeof formula !== 'string') {
        return { total: 0, rolls: [], bonus: 0, formula: '0' };
    }
    const cleaned = formula.replace(/\s+/g, '').toLowerCase();
    const match = cleaned.match(/^(\d+)d(\d+)([+-]\d+)?$/);
    if (!match) {
        const flat = parseInt(cleaned, 10);
        return {
            total: Number.isNaN(flat) ? 4 : flat,
            rolls: [],
            bonus: Number.isNaN(flat) ? 4 : flat,
            formula
        };
    }

    const baseCount = parseInt(match[1], 10);
    const count = criticalDoubleDice ? baseCount * 2 : baseCount;
    const sides = parseInt(match[2], 10);
    const bonus = match[3] ? parseInt(match[3], 10) : 0;

    const rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(rollDie(sides));
    }
    const sum = rolls.reduce((a, b) => a + b, 0);
    const total = Math.max(1, sum + bonus);

    return {
        total,
        rolls,
        bonus,
        sides,
        count,
        formula: `${count}d${sides}${bonus > 0 ? `+${bonus}` : bonus < 0 ? `${bonus}` : ''}`
    };
}

export function rollD20Test({
    modifier = 0,
    proficiency = 0,
    situationalBonus = 0,
    mode = 'normal',
    luckyRerollOnes = false
} = {}) {
    let r1 = rollDie(20);
    let r2 = rollDie(20);
    let luckyTriggered = false;

    if (luckyRerollOnes && r1 === 1) {
        r1 = rollDie(20);
        luckyTriggered = true;
    }
    if (luckyRerollOnes && mode !== 'normal' && r2 === 1) {
        r2 = rollDie(20);
        luckyTriggered = true;
    }

    let natural = r1;
    let allRolls = [r1];

    if (mode === 'advantage') {
        natural = Math.max(r1, r2);
        allRolls = [r1, r2];
    } else if (mode === 'disadvantage') {
        natural = Math.min(r1, r2);
        allRolls = [r1, r2];
    }

    const totalMod = Number(modifier) + Number(proficiency) + Number(situationalBonus);
    const total = natural + totalMod;

    return {
        natural,
        allRolls,
        modifier: Number(modifier),
        proficiency: Number(proficiency),
        situationalBonus: Number(situationalBonus),
        totalMod,
        total,
        mode,
        luckyTriggered,
        isCrit: natural === 20,
        isFumble: natural === 1
    };
}

export function calculateCharacterDerivedStats(character, classData, raceData, equippedItems = []) {
    const level = character?.level || 1;
    const pb = getProficiencyBonus(level);
    const stats = character?.stats || {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    };

    const mods = {
        strength: getAbilityMod(stats.strength),
        dexterity: getAbilityMod(stats.dexterity),
        constitution: getAbilityMod(stats.constitution),
        intelligence: getAbilityMod(stats.intelligence),
        wisdom: getAbilityMod(stats.wisdom),
        charisma: getAbilityMod(stats.charisma)
    };

    // Calculate Armor Class (AC)
    let ac = 10 + mods.dexterity;
    const classId = character?.class || 'fighter';

    if (classId === 'barbarian') {
        ac = Math.max(ac, 10 + mods.dexterity + mods.constitution);
    } else if (classId === 'monk') {
        ac = Math.max(ac, 10 + mods.dexterity + mods.wisdom);
    }

    // Check equipped armor/shield or class defaults
    const armorItem = equippedItems.find((i) => i.type === 'armor' || i.baseAc);
    const shieldItem = equippedItems.find((i) => i.type === 'shield' || i.armorType === 'shield' || i.name?.toLowerCase().includes('shield'));

    if (armorItem && armorItem.baseAc) {
        if (armorItem.armorType === 'heavy') {
            ac = armorItem.baseAc + (armorItem.bonus || 0);
        } else if (armorItem.armorType === 'medium') {
            ac = armorItem.baseAc + Math.min(2, mods.dexterity) + (armorItem.bonus || 0);
        } else {
            ac = armorItem.baseAc + mods.dexterity + (armorItem.bonus || 0);
        }
    } else if (!armorItem) {
        // Default class armor baseline if no explicit armor item
        const classDefaultAc = {
            fighter: 16,
            paladin: 16,
            cleric: 15,
            ranger: 14 + Math.min(2, mods.dexterity),
            rogue: 12 + mods.dexterity,
            bard: 12 + mods.dexterity,
            druid: 13 + Math.min(2, mods.dexterity),
            warlock: 12 + mods.dexterity,
            wizard: 11 + mods.dexterity,
            sorcerer: 11 + mods.dexterity
        };
        if (classDefaultAc[classId]) {
            ac = Math.max(ac, classDefaultAc[classId]);
        }
    }

    if (shieldItem) {
        ac += (shieldItem.acBonus || 2) + (shieldItem.bonus || 0);
    }

    // Active condition AC bonuses (e.g., Shield spell +5, Shield of Faith +2)
    const conditions = character?.conditions || [];
    if (conditions.includes('shielded')) ac += 5;

    // Spellcasting stats
    const spellAbility = classData?.spellcastingAbility || (
        ['wizard'].includes(classId) ? 'intelligence' :
        ['cleric', 'druid', 'ranger'].includes(classId) ? 'wisdom' :
        ['bard', 'paladin', 'sorcerer', 'warlock'].includes(classId) ? 'charisma' : null
    );
    const spellMod = spellAbility ? mods[spellAbility] : 0;
    const spellSaveDc = spellAbility ? 8 + pb + spellMod : null;
    const spellAttackBonus = spellAbility ? pb + spellMod : null;

    // Passive Perception
    const isPerceptionProf = character?.skills?.includes('perception');
    const passivePerception = 10 + mods.wisdom + (isPerceptionProf ? pb : 0);

    return {
        level,
        proficiencyBonus: pb,
        mods,
        ac,
        initiativeMod: mods.dexterity,
        passivePerception,
        spellAbility,
        spellSaveDc,
        spellAttackBonus
    };
}

// === COMBAT ENGINE ===
export function createCombatEncounter(encounterDef, character, companions = [], getMonsterById) {
    const enemies = [];
    const monsterGroups = encounterDef?.monsters || [];

    monsterGroups.forEach((group, gIdx) => {
        const template = getMonsterById ? getMonsterById(group.monsterId) : null;
        const count = group.count || 1;
        for (let i = 0; i < count; i++) {
            const suffix = count > 1 ? ` #${i + 1}` : '';
            const baseHp = template?.hp || group.hp || 15;
            const initMod = template?.initiativeMod ?? 1;
            const initRoll = rollDie(20) + initMod;
            enemies.push({
                instanceId: `${group.monsterId || 'foe'}_${gIdx}_${i}_${Date.now()}`,
                monsterId: group.monsterId || 'goblin',
                name: `${group.name || template?.name || 'Dungeon Foe'}${suffix}`,
                icon: template?.icon || '👹',
                type: template?.type || 'Monstrosity',
                cr: template?.cr ?? 1,
                xp: template?.xp || 100,
                ac: template?.ac || 13,
                hp: baseHp,
                maxHp: baseHp,
                speed: template?.speed || '30 ft.',
                initiative: initRoll,
                initiativeMod: initMod,
                abilities: template?.abilities || { str: 12, dex: 12, con: 12, int: 10, wis: 10, cha: 8 },
                saves: template?.saves || { str: 1, dex: 1, con: 1, int: 0, wis: 0, cha: -1 },
                resistances: template?.resistances || [],
                immunities: template?.immunities || [],
                traits: template?.traits || [],
                actions: template?.actions || [
                    { name: 'Strike', toHit: 4, damageDice: '1d6+2', damageType: 'Slashing', description: 'Melee Weapon Attack' }
                ],
                bonusActions: template?.bonusActions || [],
                legendaryActions: template?.legendaryActions || [],
                lairEffects: template?.lairEffects || [],
                conditions: [],
                rechargeReady: true
            });
        }
    });

    const playerDexMod = getAbilityMod(character?.stats?.dexterity || 12);
    const playerInit = rollDie(20) + playerDexMod;

    const initiativeOrder = [
        {
            id: 'player',
            name: character?.name || 'Hero',
            isPlayer: true,
            initiative: playerInit,
            icon: '⚔️'
        },
        ...companions.map((comp, idx) => ({
            id: `companion_${idx}`,
            name: comp.name || `Companion ${idx + 1}`,
            isCompanion: true,
            companionIndex: idx,
            class: comp.class,
            race: comp.race,
            personality: comp.personality,
            initiative: rollDie(20) + 2,
            icon: '🛡️'
        })),
        ...enemies.map((e) => ({
            id: e.instanceId,
            name: e.name,
            isEnemy: true,
            initiative: e.initiative,
            icon: e.icon
        }))
    ].sort((a, b) => b.initiative - a.initiative);

    return {
        active: true,
        title: encounterDef?.title || 'Combat Encounter',
        difficulty: encounterDef?.difficulty || 'Moderate',
        terrainFeature: encounterDef?.terrainFeature || null,
        xpReward: encounterDef?.xpReward || enemies.reduce((sum, e) => sum + (e.xp || 50), 0),
        round: 1,
        turnIndex: 0,
        actionUsed: false,
        bonusActionUsed: false,
        reactionUsed: false,
        initiativeOrder,
        enemies,
        rollingFeed: [
            {
                id: `init-${Date.now()}`,
                type: 'init',
                title: '⚔️ Roll for Initiative!',
                text: `${encounterDef?.title || 'Battle Joined'} — Your Initiative: ${playerInit}`,
                timestamp: Date.now()
            }
        ],
        combatLog: [
            `⚔️ **Roll for Initiative!** (${encounterDef?.title || 'Battle Joined'}) — Your Initiative: **${playerInit}**`
        ]
    };
}

export function resolveWeaponAttack({
    character,
    weapon,
    targetEnemy,
    rollMode = 'normal',
    useDivineSmite = false,
    companionCount = 0
}) {
    const pb = getProficiencyBonus(character?.level || 1);
    const strMod = getAbilityMod(character?.stats?.strength || 10);
    const dexMod = getAbilityMod(character?.stats?.dexterity || 10);

    const isFinesse = weapon?.properties?.includes('finesse');
    const isRanged = weapon?.properties?.includes('ranged');
    const abilityMod = isRanged ? dexMod : isFinesse ? Math.max(strMod, dexMod) : strMod;
    const itemBonus = weapon?.bonus || 0;

    // Check conditions
    const charConditions = character?.conditions || [];
    const enemyConditions = targetEnemy?.conditions || [];

    let effectiveMode = rollMode;
    if (charConditions.includes('hidden') || enemyConditions.includes('prone') || enemyConditions.includes('paralyzed') || enemyConditions.includes('stunned') || enemyConditions.includes('restrained')) {
        effectiveMode = 'advantage';
    }
    if (charConditions.includes('poisoned') || charConditions.includes('frightened') || charConditions.includes('blinded')) {
        effectiveMode = effectiveMode === 'advantage' ? 'normal' : 'disadvantage';
    }

    const blessBonus = charConditions.includes('blessed') ? rollDie(4) : 0;
    const inspireBonus = charConditions.includes('inspired') ? rollDie(6) : 0;
    const isHalfling = character?.race === 'halfling';

    const attackRoll = rollD20Test({
        modifier: abilityMod,
        proficiency: pb,
        situationalBonus: itemBonus + blessBonus + inspireBonus,
        mode: effectiveMode,
        luckyRerollOnes: isHalfling
    });

    const hit = attackRoll.isCrit || (!attackRoll.isFumble && attackRoll.total >= targetEnemy.ac);
    let totalDamage = 0;
    const damageBreakdowns = [];

    if (hit) {
        const baseFormula = weapon?.damageDice || '1d8';
        const dmgRoll = rollDiceFormula(baseFormula, attackRoll.isCrit);
        let weaponDmg = Math.max(1, dmgRoll.total + abilityMod + itemBonus);

        // Half-Orc Savage Attacks (+1 extra weapon die on crit)
        if (attackRoll.isCrit && character?.race === 'half-orc') {
            const extraCrit = rollDie(dmgRoll.sides || 8);
            weaponDmg += extraCrit;
            damageBreakdowns.push(`+${extraCrit} Savage Attacks`);
        }

        // Barbarian Rage bonus (+2 melee damage)
        if (charConditions.includes('raging') && !isRanged) {
            weaponDmg += 2;
            damageBreakdowns.push('+2 Rage');
        }

        totalDamage += weaponDmg;
        damageBreakdowns.unshift(`${weaponDmg} ${weapon?.damageType || 'Slashing'}`);

        // Rogue Sneak Attack (1d6 to 5d6 if Finesse/Ranged and Advantage or Companion ally in melee)
        if (character?.class === 'rogue' && (isFinesse || isRanged) && (effectiveMode === 'advantage' || companionCount > 0)) {
            const sneakDiceCount = Math.ceil((character?.level || 1) / 2);
            const sneakRoll = rollDiceFormula(`${sneakDiceCount}d6`, attackRoll.isCrit);
            totalDamage += sneakRoll.total;
            damageBreakdowns.push(`+${sneakRoll.total} Sneak Attack (${sneakDiceCount}d6)`);
        }

        // Hunter's Mark / Hex (+1d6)
        if (charConditions.includes('hunters_mark')) {
            const hmRoll = rollDiceFormula('1d6', attackRoll.isCrit);
            totalDamage += hmRoll.total;
            damageBreakdowns.push(`+${hmRoll.total} Hunter's Mark`);
        }
        if (charConditions.includes('hexed')) {
            const hexRoll = rollDiceFormula('1d6', attackRoll.isCrit);
            totalDamage += hexRoll.total;
            damageBreakdowns.push(`+${hexRoll.total} Hex`);
        }

        // Paladin Divine Smite (+2d8 Radiant, +3d8 vs Undead/Fiend)
        if (useDivineSmite || (character?.class === 'paladin' && attackRoll.isCrit)) {
            const isUndeadOrFiend = ['undead', 'fiend'].includes((targetEnemy.type || '').toLowerCase());
            const smiteDice = isUndeadOrFiend ? '3d8' : '2d8';
            const smiteRoll = rollDiceFormula(smiteDice, attackRoll.isCrit);
            totalDamage += smiteRoll.total;
            damageBreakdowns.push(`+${smiteRoll.total} Divine Smite (Radiant)`);
        }

        // Check Monster Resistance / Immunity
        const dmgTypeLower = (weapon?.damageType || 'slashing').toLowerCase();
        const isImmune = (targetEnemy.immunities || []).some((im) => im.toLowerCase().includes(dmgTypeLower));
        const isResistant = (targetEnemy.resistances || []).some((res) => res.toLowerCase().includes(dmgTypeLower));

        if (isImmune && !weapon?.bonus) {
            totalDamage = 0;
            damageBreakdowns.push('(Immune!)');
        } else if (isResistant && !weapon?.bonus) {
            totalDamage = Math.floor(totalDamage / 2);
            damageBreakdowns.push('(Resisted ½)');
        }
    }

    return {
        hit,
        attackRoll,
        totalDamage,
        damageBreakdown: damageBreakdowns.join(' '),
        weaponName: weapon?.name || 'Weapon'
    };
}

export function resolveSpellCast({
    character,
    spell,
    targetEnemy,
    classData
}) {
    const derived = calculateCharacterDerivedStats(character, classData, null);
    const spellAttack = derived.spellAttackBonus ?? (derived.proficiencyBonus + 3);
    const saveDc = derived.spellSaveDc ?? (8 + derived.proficiencyBonus + 3);
    const spellMod = derived.spellAbility ? derived.mods[derived.spellAbility] : 3;

    // 1. Healing Spells
    if (spell.type === 'heal') {
        const healRoll = rollDiceFormula(spell.healDice || spell.damageDice || '1d8');
        const totalHeal = Math.max(1, healRoll.total + spellMod);
        return {
            kind: 'heal',
            spellName: spell.name,
            totalHeal,
            summary: `✨ You cast **${spell.name}**, restoring **${totalHeal} HP** (${healRoll.formula} + ${spellMod})!`
        };
    }

    // 2. Buff / Defense Spells
    if (spell.type === 'buff' || spell.type === 'utility') {
        let conditionAdded = spell.conditionApplied || null;
        if (spell.id === 'shield') conditionAdded = 'shielded';
        if (spell.id === 'bless' || spell.id === 'shield-of-faith') conditionAdded = 'blessed';
        if (spell.id === 'hunters-mark') conditionAdded = 'hunters_mark';
        if (spell.id === 'hex') conditionAdded = 'hexed';
        return {
            kind: 'buff',
            spellName: spell.name,
            conditionAdded,
            summary: `🔮 You cast **${spell.name}**! ${spell.description || ''}`
        };
    }

    // 3. Auto-Hit Damaging Spells (Magic Missile)
    if (spell.type === 'autoHit') {
        const dmgRoll = rollDiceFormula(spell.damageDice || '3d4+3');
        return {
            kind: 'damage',
            hit: true,
            spellName: spell.name,
            totalDamage: dmgRoll.total,
            damageType: spell.damageType || 'Force',
            summary: `🔮 **${spell.name}** darts unerringly strike **${targetEnemy?.name || 'the target'}** for **${dmgRoll.total} ${spell.damageType || 'Force'} damage**!`
        };
    }

    // 4. Saving Throw Spells (Fireball, Sacred Flame, Burning Hands, Hold Person, Web)
    if (spell.type === 'save') {
        const saveAbility = (spell.saveAbility || 'dex').slice(0, 3).toLowerCase();
        const enemySaveMod = targetEnemy?.saves?.[saveAbility] ?? 1;
        const enemyRoll = rollDie(20) + enemySaveMod;
        const failedSave = enemyRoll < saveDc;

        let totalDamage = 0;
        let conditionApplied = null;

        if (spell.damageDice) {
            const rawDmg = rollDiceFormula(spell.damageDice);
            // Cantrips deal 0 on successful save; leveled AoE spells deal half damage on successful save
            totalDamage = failedSave ? rawDmg.total : (spell.level > 0 ? Math.floor(rawDmg.total / 2) : 0);
        }

        if (failedSave && spell.conditionApplied) {
            conditionApplied = spell.conditionApplied;
        }

        return {
            kind: 'save',
            hit: failedSave || totalDamage > 0,
            failedSave,
            enemyRoll,
            saveDc,
            spellName: spell.name,
            totalDamage,
            damageType: spell.damageType || 'Magical',
            conditionApplied,
            summary: `🔮 You cast **${spell.name}** (Save DC ${saveDc})! **${targetEnemy?.name}** rolls a ${ saveAbility.toUpperCase() } save: **${enemyRoll}** (${failedSave ? 'FAILED!' : 'SAVED!'})${totalDamage > 0 ? ` — taking **${totalDamage} ${spell.damageType || 'Magical'} damage**!` : ''}${conditionApplied ? ` Target is now **${conditionApplied.toUpperCase()}**!` : ''}`
        };
    }

    // 5. Spell Attack Roll (Fire Bolt, Guiding Bolt, Eldritch Blast, Scorching Ray)
    const attackRoll = rollD20Test({
        modifier: spellMod,
        proficiency: derived.proficiencyBonus
    });
    const hit = attackRoll.isCrit || (!attackRoll.isFumble && attackRoll.total >= (targetEnemy?.ac || 12));
    let totalDamage = 0;

    if (hit) {
        const dmgRoll = rollDiceFormula(spell.damageDice || '1d10', attackRoll.isCrit);
        totalDamage = dmgRoll.total;
    }

    return {
        kind: 'attack',
        hit,
        attackRoll,
        spellName: spell.name,
        totalDamage,
        damageType: spell.damageType || 'Force',
        conditionApplied: hit ? spell.conditionApplied : null,
        summary: hit
            ? `🔮 **${spell.name}** (${attackRoll.isCrit ? 'CRITICAL HIT! ' : ''}Roll ${attackRoll.total} vs AC ${targetEnemy?.ac}) blasts **${targetEnemy?.name}** for **${totalDamage} ${spell.damageType || 'Magical'} damage**!`
            : `🔮 **${spell.name}** (Roll ${attackRoll.total} vs AC ${targetEnemy?.ac}) streaks past **${targetEnemy?.name}** and misses!`
    };
}

export function resolveCompanionTurn(companion, enemies, character) {
    const livingEnemies = enemies.filter((e) => e.hp > 0);
    if (livingEnemies.length === 0) return null;

    const target = livingEnemies[0];
    const cls = (companion.class || 'fighter').toLowerCase();
    const level = character?.level || 1;

    // If Cleric or Bard and player is low HP (< 45%), heal the player!
    if ((cls === 'cleric' || cls === 'bard' || cls === 'druid' || cls === 'paladin') && character.hp < character.maxHp * 0.45) {
        const healAmount = rollDie(8) + 3;
        return {
            type: 'heal',
            companionName: companion.name,
            companionClass: companion.class,
            companionRace: companion.race,
            abilities: companion.specialAbility || companion.signatureMove || 'Healing Word • Sacred Flame',
            personality: companion.personality,
            healAmount,
            text: `Hang in there, ${character.name || 'friend'}! I channel healing magic to mend your wounds (+${healAmount} HP)!`,
            log: `💚 **${companion.name}** (${companion.class}) casts *Healing Word* on you, restoring **${healAmount} HP**!`
        };
    }

    // Attack the primary enemy
    const toHitBonus = 3 + getProficiencyBonus(level);
    const d20 = rollDie(20);
    const totalAttack = d20 + toHitBonus;
    const hit = d20 === 20 || (d20 !== 1 && totalAttack >= target.ac);

    const classAttacks = {
        wizard: { move: 'Fire Bolt', dice: '1d10+2', dmgType: 'Fire' },
        sorcerer: { move: 'Chromatic Orb', dice: '2d8', dmgType: 'Lightning' },
        warlock: { move: 'Eldritch Blast', dice: '1d10+3', dmgType: 'Force' },
        rogue: { move: 'Sneak Attack Dagger', dice: '2d6+3', dmgType: 'Piercing' },
        ranger: { move: 'Hunter Longbow Shot', dice: '1d8+1d6+3', dmgType: 'Piercing' },
        cleric: { move: 'Sacred Flame', dice: '1d8+3', dmgType: 'Radiant' },
        paladin: { move: 'Radiant Warhammer', dice: '1d8+4', dmgType: 'Radiant' },
        barbarian: { move: 'Reckless Greataxe', dice: '1d12+4', dmgType: 'Slashing' },
        bard: { move: 'Vicious Mockery & Rapier', dice: '1d8+3', dmgType: 'Piercing' },
        druid: { move: 'Thorn Whip', dice: '1d6+3', dmgType: 'Piercing' },
        monk: { move: 'Flurry of Blows', dice: '2d6+3', dmgType: 'Bludgeoning' },
        fighter: { move: 'Longsword Slash', dice: '1d8+4', dmgType: 'Slashing' }
    };

    const attackSpec = classAttacks[cls] || classAttacks.fighter;
    const dmg = hit ? Math.max(2, rollDie(8) + 3 + (d20 === 20 ? 6 : 0)) : 0;

    return {
        type: 'attack',
        companionName: companion.name,
        companionClass: companion.class,
        companionRace: companion.race,
        abilities: companion.specialAbility || companion.signatureMove || attackSpec.move,
        personality: companion.personality,
        targetId: target.instanceId,
        targetName: target.name,
        hit,
        damage: dmg,
        text: hit
            ? `Take that! My ${attackSpec.move} strikes ${target.name} for ${dmg} ${attackSpec.dmgType} damage!`
            : `Curse it! ${target.name} deflected my ${attackSpec.move}!`,
        log: hit
            ? `🛡️ **${companion.name}** uses *${attackSpec.move}* on **${target.name}** (Roll ${totalAttack} vs AC ${target.ac}) — **${dmg} ${attackSpec.dmgType} damage**!`
            : `🛡️ **${companion.name}** attacks **${target.name}** with *${attackSpec.move}* (Roll ${totalAttack} vs AC ${target.ac}) — Miss!`
    };
}

export function resolveMonsterTurn(monster, character, derivedStats, companions = []) {
    if (!monster || monster.hp <= 0) return null;

    // Check Incapacitating conditions
    const incapacitatedConds = ['stunned', 'paralyzed', 'unconscious', 'petrified'];
    const activeIncap = (monster.conditions || []).find((c) => incapacitatedConds.includes(c));
    if (activeIncap) {
        // Attempt end-of-turn recovery roll (50% chance)
        const recovered = rollDie(20) >= 12;
        return {
            skipped: true,
            recoveredCondition: recovered ? activeIncap : null,
            damageToPlayer: 0,
            damageToCompanion: 0,
            log: `💫 **${monster.name}** is **${activeIncap.toUpperCase()}** and cannot act this turn!${recovered ? ` (Breaks free from ${activeIncap} at end of turn!)` : ''}`
        };
    }

    // Target Selection: Player or Living Companion
    const livingCompanions = (companions || []).filter((c) => (c.hp ?? 14) > 0);
    const targetCompanion = (livingCompanions.length > 0 && Math.random() < 0.4)
        ? livingCompanions[Math.floor(Math.random() * livingCompanions.length)]
        : null;

    const isTargetPlayer = !targetCompanion;
    const targetName = isTargetPlayer ? (character.name || 'You') : targetCompanion.name;
    const targetAc = isTargetPlayer ? (derivedStats?.ac || 14) : (targetCompanion.ac || 13);
    const targetCurrentHp = isTargetPlayer ? character.hp : (targetCompanion.hp ?? 14);

    // Check Recharge 5-6 at start of monster's turn
    let rechargedNow = false;
    if (!monster.rechargeReady) {
        const rRoll = rollDie(6);
        if (rRoll >= 5) {
            monster.rechargeReady = true;
            rechargedNow = true;
        }
    }

    const actions = monster.actions || [];
    // Pick recharge action if ready, otherwise primary attack
    let chosenAction = actions.find((a) => a.recharge && monster.rechargeReady) || actions[0] || {
        name: 'Claw',
        toHit: 4,
        damageDice: '1d6+2',
        damageType: 'Slashing'
    };

    if (chosenAction.recharge) {
        monster.rechargeReady = false;
    }

    const playerConditions = character?.conditions || [];
    const monsterDisadv = (monster.conditions || []).includes('poisoned') ||
        (monster.conditions || []).includes('frightened') ||
        (monster.conditions || []).includes('restrained') ||
        (isTargetPlayer && playerConditions.includes('dodging'));

    // Saving throw based monster action (e.g., Dragon Breath, Banshee Wail, Mind Blast, Spells)
    if (chosenAction.saveDc) {
        const saveAbility = (chosenAction.saveAbility || 'dex').toLowerCase();
        const fullAbilityMap = {
            str: 'strength',
            dex: 'dexterity',
            con: 'constitution',
            int: 'intelligence',
            wis: 'wisdom',
            cha: 'charisma'
        };
        const fullKey = fullAbilityMap[saveAbility.slice(0, 3)] || 'dexterity';
        const targetSaveMod = isTargetPlayer
            ? getAbilityMod(character?.stats?.[fullKey] || 10)
            : 2;
        const saveRoll = rollDie(20) + targetSaveMod;
        const targetSaved = saveRoll >= chosenAction.saveDc;

        const rawDmg = rollDiceFormula(chosenAction.damageDice || '3d6');
        let dmg = targetSaved ? Math.floor(rawDmg.total / 2) : rawDmg.total;

        // Apply player resistance (e.g. Barbarian Rage, Tiefling Fire resistance)
        if (isTargetPlayer && playerConditions.includes('raging') && ['bludgeoning', 'piercing', 'slashing'].includes((chosenAction.damageType || '').toLowerCase())) {
            dmg = Math.floor(dmg / 2);
        }

        const conditionInflicted = (!targetSaved && chosenAction.condition) ? chosenAction.condition.toLowerCase() : null;

        return {
            skipped: false,
            isSpellOrPower: true,
            actionName: chosenAction.name,
            monsterName: monster.name,
            targetName,
            isTargetPlayer,
            targetCompanion,
            saveAbility: saveAbility.toUpperCase(),
            saveDc: chosenAction.saveDc,
            saveRoll,
            targetSaved,
            damageToPlayer: isTargetPlayer ? dmg : 0,
            damageToCompanion: !isTargetPlayer ? dmg : 0,
            damage: dmg,
            damageType: chosenAction.damageType || 'Magical',
            conditionInflicted,
            targetRemainingHp: Math.max(0, targetCurrentHp - dmg),
            rechargedNow,
            log: `${rechargedNow ? `🔥 **${monster.name}** recharges its deadly power! ` : ''}🔮 **${monster.name}** unleashes **${chosenAction.name}** upon **${targetName}**! ${targetName} rolls a ${saveAbility.toUpperCase()} Save: **${saveRoll}** vs DC ${chosenAction.saveDc} (${targetSaved ? 'SAVED — Half Damage' : 'FAILED!'}) — taking **${dmg} ${chosenAction.damageType || 'Magical'} damage**!${conditionInflicted ? ` Afflicted with **${conditionInflicted.toUpperCase()}**!` : ''}`
        };
    }

    // Standard Monster Attack Roll
    const attackRoll = rollD20Test({
        modifier: chosenAction.toHit ?? 4,
        mode: monsterDisadv ? 'disadvantage' : 'normal'
    });

    const hit = attackRoll.isCrit || (!attackRoll.isFumble && attackRoll.total >= targetAc);
    let dmg = 0;
    let conditionInflicted = null;

    if (hit) {
        const dmgRoll = rollDiceFormula(chosenAction.damageDice || '1d6+2', attackRoll.isCrit);
        dmg = dmgRoll.total;
        if (isTargetPlayer && playerConditions.includes('raging') && ['bludgeoning', 'piercing', 'slashing'].includes((chosenAction.damageType || 'slashing').toLowerCase())) {
            dmg = Math.max(1, Math.floor(dmg / 2));
        }
        if (chosenAction.condition && rollDie(20) < (chosenAction.conditionDc || 12)) {
            conditionInflicted = chosenAction.condition.toLowerCase();
        }
    }

    return {
        skipped: false,
        isSpellOrPower: false,
        actionName: chosenAction.name,
        monsterName: monster.name,
        targetName,
        isTargetPlayer,
        targetCompanion,
        hit,
        isCrit: attackRoll.isCrit,
        attackRoll,
        damageToPlayer: isTargetPlayer ? dmg : 0,
        damageToCompanion: !isTargetPlayer ? dmg : 0,
        damage: dmg,
        damageType: chosenAction.damageType || 'Slashing',
        conditionInflicted,
        targetRemainingHp: Math.max(0, targetCurrentHp - dmg),
        log: hit
            ? `👹 **${monster.name}** strikes **${targetName}** with **${chosenAction.name}** (${attackRoll.isCrit ? 'CRITICAL HIT! ' : ''}Roll ${attackRoll.total} vs AC ${targetAc}) — dealing **${dmg} ${chosenAction.damageType || 'Slashing'} damage**!${conditionInflicted ? ` Afflicted with **${conditionInflicted.toUpperCase()}**!` : ''}`
            : `👹 **${monster.name}** lunges at **${targetName}** with **${chosenAction.name}** (Roll ${attackRoll.total} vs AC ${targetAc}) — ${targetName} deflects/dodges the blow!`
    };
}
