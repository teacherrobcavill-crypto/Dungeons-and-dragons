// Combat Narrative & Rolling Action Feed Engine for MythicBot D&D 5e
// Generates vivid, 1980s Fighting Fantasy / Tabletop D&D prose for skirmishes,
// describing attacks, wounds, fatal blows, enemy counter-strikes, and spells.
// All outputs are guaranteed clean of asterisks and raw markdown markers.

export const SPELL_CONDITION_EFFECTS = {
    paralyzed: 'PARALYZED: Frozen solid! Incapacitated, speed 0, attacks against you are automatic critical hits.',
    poisoned: 'POISONED: Toxic venom in your veins! All attack rolls and ability checks suffer Disadvantage.',
    frightened: 'FRIGHTENED: Gripped by supernatural terror! Disadvantage on checks and attacks while foe is in sight.',
    restrained: 'RESTRAINED: Ensnared in tight bonds! Speed is 0, enemy attacks have Advantage, your attacks have Disadvantage.',
    stunned: 'STUNNED: Concussed and reeling! Incapacitated, unable to move, and can only falter.',
    blinded: 'BLINDED: Total darkness engulfs your vision! Attack rolls have Disadvantage and enemies attack with Advantage.',
    prone: 'PRONE: Knocked flat onto the ground! Melee attacks against you have Advantage until you spend movement to stand.',
    burning: 'BURNING: Garments and armor aflame! Takes recurring fire damage each round until patted out.',
    charmed: 'CHARMED: Bewitched by arcane glamour! You cannot harm the charmer and their influence over you is overwhelming.',
    unconscious: 'UNCONSCIOUS: Knocked out cold! Dropped to 0 HP, helpless and incapacitated.',
    life_drain: 'LIFE DRAIN: Necrotic chill withers your essence! Maximum hit points reduced until a long rest.'
};

export const SPELL_FLAVOR_PROSE = {
    'magic-missile': 'three shimmering darts of azure force erupt from outstretched fingers, streaking unerringly through the smoky air',
    'fire-bolt': 'a crackling mote of radiant flame coalesces in your palm before hurling outward in an explosive arc',
    'fireball': 'a tiny bright pea of flame shoots from your hand, detonating into a roaring sphere of incinerating red fire',
    'burning-hands': 'a sheet of roaring orange flames fans out from your outstretched thumbs',
    'sacred-flame': 'a descending pillar of divine, radiantly burning moonlight crashes downward',
    'guiding-bolt': 'a brilliant flash of radiant celestial light hurtles forward, illuminating the target with holy starlight',
    'cure-wounds': 'soothing golden light surges through your touch, stitching torn flesh and mending bone',
    'healing-word': 'a crisp word of divine power reverberates across the battlefield, knitting vital wounds',
    'eldritch-blast': 'a beam of crackling amethyst energy tears across the air with a concussive boom',
    'hold-person': 'invisible psychic coils of paralyzing magic snake around the victim\'s limbs',
    'ray-of-frost': 'a frigid blue beam of sub-zero frost streaks through the chamber',
    'thunderwave': 'a concussive wave of thunderous sound blasts outward, rattling armor and vibrating teeth',
    'hex': 'a dark, shimmering curse of sinister whispering spirits settles over the victim\'s fate',
    'hunters-mark': 'a glowing spectral rune marks the quarry, heightening your predatory focus',
    'shield': 'an invisible barrier of magical force snaps into place, deflecting the incoming blow'
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Strips all markdown asterisks, underscores, and formatting symbols
 * ensuring pure, clean storytelling prose.
 */
export function cleanProse(text) {
    if (!text) return '';
    return text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/_{1,2}/g, '')
        .trim();
}

/**
 * Describe a Player's Weapon Attack with cinematic, punchy prose (no asterisks)
 */
export function describePlayerWeaponAttack({
    heroName = 'You',
    weaponName = 'blade',
    targetName = 'the enemy',
    hit = false,
    isCrit = false,
    damage = 0,
    damageType = 'slashing',
    isFatal = false,
    remainingHp = 0,
    breakdown = ''
}) {
    const hero = heroName || 'You';
    const isPlayer = hero.toLowerCase() === 'you';
    const weapon = weaponName || 'weapon';
    const enemy = targetName || 'foe';
    const dmgType = (damageType || 'slashing').toLowerCase();
    const cleanBreakdown = cleanProse(breakdown);

    if (!hit) {
        const missTemplates = [
            `${hero} ${isPlayer ? 'lunge' : 'lunges'} forward with ${isPlayer ? 'your' : 'their'} ${weapon}, but the agile ${enemy} ducks beneath the whistling steel with a mocking snarl!`,
            `${hero} ${isPlayer ? 'swing' : 'swings'} the ${weapon} in a fierce arc at the ${enemy}, but the blow clangs off stone as the nimble creature sidesteps just in time!`,
            `${hero} ${isPlayer ? 'drive' : 'drives'} the ${weapon} toward the ${enemy}, but the beast parries the strike with its jagged guard and shoves you back!`,
            `${hero} ${isPlayer ? 'unleash' : 'unleashes'} a strike with ${isPlayer ? 'your' : 'their'} ${weapon}, whistling harmlessly through the air as the ${enemy} dances out of reach!`
        ];
        return {
            title: cleanProse(`⚔️ ${hero} attacks ${enemy} — Miss`),
            prose: cleanProse(getRandom(missTemplates)),
            rollText: `Missed vs AC`
        };
    }

    if (isFatal) {
        const fatalTemplates = [
            `${hero} ${isPlayer ? 'wield' : 'wields'} ${isPlayer ? 'your' : 'their'} ${weapon} and ${isPlayer ? 'slash' : 'slashes'} viciously across the ${enemy}! The strike lands with brutal finality—the ${enemy} screeches with pain, clutches its gaping wound, and collapses lifeless upon the blood-spattered stones!`,
            `${hero} ${isPlayer ? 'deliver' : 'delivers'} a crushing blow with ${isPlayer ? 'your' : 'their'} ${weapon}! The ${enemy} gasps in agony as ${damage} ${dmgType} damage tears through its vitals; its eyes roll back, dropping its weapons as it crumples dead to the floor!`,
            `With lethal precision, ${hero} ${isPlayer ? 'drive' : 'drives'} the ${weapon} deep into the ${enemy}! The creature lets out a choked, sputtering wail and falls motionless in the dust—slain in the heat of combat!`,
            `${hero} ${isPlayer ? 'cleave' : 'cleaves'} through the ${enemy}'s defenses with a ferocious sweep of the ${weapon} (${damage} ${dmgType} damage)! The beast collapses with a sickening thud, dead before it strikes the ground!`
        ];
        return {
            title: cleanProse(`💀 FATAL BLOW: ${hero} slays ${enemy}!`),
            prose: cleanProse(getRandom(fatalTemplates)),
            rollText: `${damage} ${dmgType} damage (FATAL)`
        };
    }

    if (isCrit) {
        const critTemplates = [
            `CRITICAL STRIKE! ${hero} ${isPlayer ? 'spot' : 'spots'} an exposed opening in the ${enemy}'s stance and ${isPlayer ? 'drive' : 'drives'} the ${weapon} home with devastating momentum! The blow sunders armor and flesh for ${damage} ${dmgType} damage${cleanBreakdown ? ` (${cleanBreakdown})` : ''}. The ${enemy} howls in blind fury, staggering back bleeding heavily (${remainingHp} HP remaining)!`,
            `CRITICAL HIT! With lightning reflexes, ${hero} ${isPlayer ? 'strike' : 'strikes'} the ${enemy} at its most vulnerable seam with the ${weapon}! The vicious strike delivers ${damage} ${dmgType} damage, leaving the wounded beast reeling and gasping for breath (${remainingHp} HP remaining)!`
        ];
        return {
            title: cleanProse(`⚡ CRITICAL HIT: ${hero} strikes ${enemy}!`),
            prose: cleanProse(getRandom(critTemplates)),
            rollText: `${damage} ${dmgType} damage (Critical!)`
        };
    }

    const hitTemplates = [
        `${hero} ${isPlayer ? 'wield' : 'wields'} ${isPlayer ? 'your' : 'their'} ${weapon} and ${isPlayer ? 'slash' : 'slashes'} at the ${enemy}! The honed edge bites deep, dealing ${damage} ${dmgType} damage${cleanBreakdown ? ` (${cleanBreakdown})` : ''}. The ${enemy} screeches with pain and recoils with fangs bared (${remainingHp} HP remaining).`,
        `${hero} ${isPlayer ? 'step' : 'steps'} inside the ${enemy}'s guard, driving the ${weapon} home for ${damage} ${dmgType} damage! Dark blood splatters the stones as the creature grunts in torment (${remainingHp} HP remaining).`,
        `A clean, practiced strike from ${hero}'s ${weapon} catches the ${enemy} across the flank, carving through armor for ${damage} ${dmgType} damage! The creature snarls venomously, nursing its wound (${remainingHp} HP remaining).`
    ];

    return {
        title: cleanProse(`⚔️ ${hero} hits ${enemy}`),
        prose: cleanProse(getRandom(hitTemplates)),
        rollText: `${damage} ${dmgType} damage`
    };
}

/**
 * Describe a Player's Spell Cast (no asterisks)
 */
export function describePlayerSpellCast({
    heroName = 'You',
    spell,
    targetName = 'the enemy',
    hit = false,
    isCrit = false,
    damage = 0,
    conditionApplied = null,
    isFatal = false,
    remainingHp = 0,
    failedSave = false,
    saveAbility = 'DEX',
    saveDc = 13,
    enemyRoll = 10,
    isAoE = false
}) {
    const hero = heroName || 'You';
    const isPlayer = hero.toLowerCase() === 'you';
    const spellName = cleanProse(spell?.name || 'Spell');
    const spellKey = spell?.id || spellName.toLowerCase().replace(/\s+/g, '-');
    const flavor = SPELL_FLAVOR_PROSE[spellKey] || `channels arcane power into ${spellName}`;
    const enemy = targetName || 'enemy';
    const dmgType = spell?.damageType || 'Magical';

    // 1. Healing
    if (spell?.type === 'heal') {
        return {
            title: cleanProse(`✨ ${hero} casts ${spellName}`),
            prose: cleanProse(`${hero} ${isPlayer ? 'speak' : 'speaks'} a sacred prayer as ${flavor}. Soothing luminescence washes over wounds, restoring +${damage} HP!`),
            rollText: `Restores +${damage} HP`
        };
    }

    // 2. Buff / Utility
    if (spell?.type === 'buff' || spell?.type === 'utility') {
        return {
            title: cleanProse(`🔮 ${hero} casts ${spellName}`),
            prose: cleanProse(`${hero} ${isPlayer ? 'weave' : 'weaves'} mystical wards, invoking ${spellName}! Warding light and arcane vigilance envelop your presence (${spell?.description || 'defensive ward active'}).`),
            rollText: `Buff Active`
        };
    }

    // 3. Saving Throw Spells
    if (spell?.type === 'save') {
        if (isFatal) {
            return {
                title: cleanProse(`💀 FATAL SPELL: ${hero}'s ${spellName} destroys ${enemy}!`),
                prose: cleanProse(`${hero} unleashes ${spellName}—${flavor}! The ${enemy} scrambles desperately (${saveAbility.toUpperCase()} save ${enemyRoll} vs DC ${saveDc} — ${failedSave ? 'FAILED' : 'SAVED'}), taking ${damage} ${dmgType} damage! The torrent of magic obliterates the creature, leaving it motionless and vanquished!`),
                rollText: `${damage} ${dmgType} damage (FATAL)`
            };
        }

        return {
            title: cleanProse(`🔮 ${hero} casts ${spellName}`),
            prose: cleanProse(`${hero} unleashes ${spellName}—${flavor}! The ${enemy} rolls a ${saveAbility.toUpperCase()} save (${enemyRoll} vs DC ${saveDc} — ${failedSave ? 'FAILED' : 'SAVED'})${damage > 0 ? `, taking ${damage} ${dmgType} damage (${remainingHp} HP remaining)` : ''}!${conditionApplied ? ` The ${enemy} is gripped by ${conditionApplied.toUpperCase()}!` : ''}`),
            rollText: `${damage} ${dmgType} (${failedSave ? 'Save Failed' : 'Saved'})`
        };
    }

    // 4. Attack / Auto-Hit Spells
    if (!hit) {
        return {
            title: cleanProse(`🔮 ${hero}'s ${spellName} misses`),
            prose: cleanProse(`${hero} ${isPlayer ? 'hurl' : 'hurls'} ${spellName} at the ${enemy}, but the magic streaks past in a flash of sparks, dissipating harmlessly against the cavern wall!`),
            rollText: `Missed vs AC`
        };
    }

    if (isFatal) {
        return {
            title: cleanProse(`💀 FATAL SPELL: ${hero}'s ${spellName} slays ${enemy}!`),
            prose: cleanProse(`${hero} strikes true with ${spellName}—${flavor}! The devastating blast slams into the ${enemy} for ${damage} ${dmgType} damage! The creature screeches with pain as magic tears through its flesh, dropping lifeless to the ground!`),
            rollText: `${damage} ${dmgType} damage (FATAL)`
        };
    }

    return {
        title: cleanProse(`🔮 ${hero} blasts ${enemy} with ${spellName}`),
        prose: cleanProse(`${hero} unleashes ${spellName}—${flavor}! The arcane discharge strikes the ${enemy} full in the chest for ${damage} ${dmgType} damage! The beast howls in agony, reeling from the raw magical impact (${remainingHp} HP remaining).${conditionApplied ? ` The target is afflicted with ${conditionApplied.toUpperCase()}!` : ''}`),
        rollText: `${damage} ${dmgType} damage`
    };
}

/**
 * Describe a Party Companion's Action (no asterisks)
 */
export function describeCompanionCombatAction({
    companionName,
    companionClass = 'fighter',
    actionName = 'strike',
    targetName = 'the enemy',
    hit = false,
    damage = 0,
    damageType = 'slashing',
    isFatal = false,
    remainingHp = 0,
    companionBark = ''
}) {
    const action = cleanProse(actionName);
    const bark = cleanProse(companionBark);

    if (!hit) {
        return {
            title: cleanProse(`🛡️ ${companionName} (${companionClass}) attacks ${targetName} — Miss`),
            prose: cleanProse(`${companionName} attacks ${targetName} with ${action}, but the foe deflects the strike with its crude buckler!`),
            rollText: 'Miss'
        };
    }

    if (isFatal) {
        return {
            title: cleanProse(`💀 FATAL STRIKE: ${companionName} slays ${targetName}!`),
            prose: cleanProse(`${companionName} steps in with ${action}, landing a deadly blow for ${damage} ${damageType} damage! The ${targetName} gasps in agony and collapses dead to the stones!${bark ? ` "${bark}"` : ''}`),
            rollText: `${damage} ${damageType} damage (FATAL)`
        };
    }

    return {
        title: cleanProse(`🛡️ ${companionName} hits ${targetName}`),
        prose: cleanProse(`${companionName} unleashes ${action} upon ${targetName}! The blow connects for ${damage} ${damageType} damage, staggering the beast (${remainingHp} HP remaining).${bark ? ` "${bark}"` : ''}`),
        rollText: `${damage} ${damageType} damage`
    };
}

/**
 * Describe a Monster's Attack on the Character or a Companion (no asterisks)
 */
export function describeMonsterAttackTarget({
    monsterName,
    actionName = 'Claw',
    targetName = 'You',
    isPlayer = true,
    hit = false,
    isCrit = false,
    damage = 0,
    damageType = 'slashing',
    conditionInflicted = null,
    isFatal = false,
    remainingHp = 0
}) {
    const victim = isPlayer ? 'You' : targetName;
    const condText = conditionInflicted ? SPELL_CONDITION_EFFECTS[conditionInflicted] || '' : '';

    if (!hit) {
        const parryTemplates = isPlayer
            ? [
                `👹 ${monsterName} lunges with ${actionName}, but you raise your guard and parry the vicious strike just in time!`,
                `👹 ${monsterName} strikes at you with ${actionName}, the blow glancing harmlessly off your armor with a ring of steel!`,
                `👹 ${monsterName} slashes with ${actionName}, but you step swiftly aside, letting the weapon bite harmlessly into empty air!`
            ]
            : [
                `👹 ${monsterName} lunges with ${actionName} at ${targetName}, but ${targetName} raises their shield and deflects the savage blow!`,
                `👹 ${monsterName} swings ${actionName} toward ${targetName}, but the skilled companion ducks beneath the blade!`
            ];
        return {
            title: cleanProse(`🛡️ ${monsterName} attacks ${victim} — Miss`),
            prose: cleanProse(getRandom(parryTemplates)),
            rollText: 'Defended / Miss'
        };
    }

    if (isFatal || (remainingHp !== null && remainingHp <= 0)) {
        return {
            title: isPlayer ? cleanProse(`💀 HERO DOWNED: ${monsterName} strikes You!`) : cleanProse(`💀 COMPANION SLAIN: ${targetName} has fallen!`),
            prose: isPlayer
                ? cleanProse(`👹 ${monsterName} strikes you down with ${actionName} (${damage} ${damageType} damage)! Darkness rushes into your vision as you collapse unconscious to the dungeon floor at 0 HP!`)
                : cleanProse(`👹 ${monsterName} delivers a mortal strike to ${targetName} with ${actionName} (${damage} ${damageType} damage)! ${targetName} collapses lifeless in battle!`),
            rollText: isPlayer ? '0 HP (Downed)' : 'SLAIN IN BATTLE'
        };
    }

    if (isCrit) {
        const critText = isPlayer
            ? `💥 BRUTAL CRITICAL STRIKE! ${monsterName} finds a deadly opening, driving its ${actionName} straight into you! The vicious blow inflicts ${damage} ${damageType} damage! Agonizing pain flashes through your limbs (${remainingHp} HP remaining)!`
            : `💥 BRUTAL CRITICAL HIT! ${monsterName} unleashes a devastating ${actionName} upon ${targetName}! The horrific blow deals ${damage} ${damageType} damage, sending ${targetName} staggering back with bloodied armor (${remainingHp} HP remaining)!`;
        return {
            title: cleanProse(`💥 CRITICAL HIT: ${monsterName} strikes ${victim}!`),
            prose: cleanProse(critText + (conditionInflicted ? `\nAffliction: ${victim} is now ${conditionInflicted.toUpperCase()}! ${condText}` : '')),
            rollText: `${damage} ${damageType} damage (Critical!)`
        };
    }

    const hitText = isPlayer
        ? `👹 ${monsterName} leaps forward, striking you with ${actionName}! The assault bites deep for ${damage} ${damageType} damage (${remainingHp} HP remaining). You grit your teeth as fresh wounds sting in the dark.`
        : `👹 ${monsterName} wheels around and strikes ${targetName} with ${actionName}! The blow crashes home for ${damage} ${damageType} damage (${remainingHp} HP remaining), eliciting a pained gasp from ${targetName}.`;

    return {
        title: cleanProse(`🩸 ${monsterName} hits ${victim}`),
        prose: cleanProse(hitText + (conditionInflicted ? `\nAffliction: ${victim} is struck with ${conditionInflicted.toUpperCase()}! ${condText}` : '')),
        rollText: `${damage} ${damageType} damage`
    };
}

/**
 * Describe a Monster's Spell or Supernatural Ability hitting Character or Companion (no asterisks)
 */
export function describeMonsterSpellTarget({
    monsterName,
    actionName = 'Dark Magic',
    spellName = null,
    targetName = 'You',
    isPlayer = true,
    damage = 0,
    damageType = 'Magical',
    conditionInflicted = null,
    saved = false,
    saveAbility = 'DEX',
    saveDc = 13,
    saveRoll = 10,
    remainingHp = 0
}) {
    const power = cleanProse(spellName || actionName);
    const victim = isPlayer ? 'You' : targetName;
    const condEffect = conditionInflicted ? SPELL_CONDITION_EFFECTS[conditionInflicted] || `${conditionInflicted.toUpperCase()} effect applied.` : null;

    let narrative = isPlayer
        ? `🔮 ${monsterName} unleashes ${power} directly at you! You roll a ${saveAbility.toUpperCase()} Saving Throw (${saveRoll} vs DC ${saveDc} — ${saved ? 'SAVED (Half Damage)' : 'FAILED!'})`
        : `🔮 ${monsterName} hurls ${power} across the battlefield at ${targetName}! ${targetName} rolls a ${saveAbility.toUpperCase()} Saving Throw (${saveRoll} vs DC ${saveDc} — ${saved ? 'SAVED' : 'FAILED!'})`;

    if (damage > 0) {
        narrative += `, taking ${damage} ${damageType} damage (${remainingHp} HP remaining)!`;
    } else {
        narrative += '!';
    }

    if (conditionInflicted) {
        narrative += `\nSpell and Condition Impact: ${victim} is afflicted with ${conditionInflicted.toUpperCase()}! ${cleanProse(condEffect)}`;
    }

    return {
        title: cleanProse(`🔮 ${monsterName} casts ${power} at ${victim}`),
        prose: cleanProse(narrative),
        spellName: power,
        effect: cleanProse(condEffect),
        rollText: `${damage} ${damageType} (${saved ? 'Saved' : 'Failed'})`
    };
}
