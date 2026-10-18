// D&D 5e Player's Handbook Classes with hit dice, abilities, subclasses, features, and spell progression

const FULL_CASTER_SLOTS = (cantripBase = 3) => ({
    1: { cantrips: cantripBase, level1: 2, level2: 0, level3: 0, level4: 0, level5: 0 },
    2: { cantrips: cantripBase, level1: 3, level2: 0, level3: 0, level4: 0, level5: 0 },
    3: { cantrips: cantripBase, level1: 4, level2: 2, level3: 0, level4: 0, level5: 0 },
    4: { cantrips: cantripBase + 1, level1: 4, level2: 3, level3: 0, level4: 0, level5: 0 },
    5: { cantrips: cantripBase + 1, level1: 4, level2: 3, level3: 2, level4: 0, level5: 0 },
    6: { cantrips: cantripBase + 1, level1: 4, level2: 3, level3: 3, level4: 0, level5: 0 },
    7: { cantrips: cantripBase + 1, level1: 4, level2: 3, level3: 3, level4: 1, level5: 0 },
    8: { cantrips: cantripBase + 1, level1: 4, level2: 3, level3: 3, level4: 2, level5: 0 },
    9: { cantrips: cantripBase + 1, level1: 4, level2: 3, level3: 3, level4: 3, level5: 1 },
    10: { cantrips: cantripBase + 2, level1: 4, level2: 3, level3: 3, level4: 3, level5: 2 }
});

const HALF_CASTER_SLOTS = {
    1: { cantrips: 0, level1: 1, level2: 0, level3: 0, level4: 0, level5: 0 },
    2: { cantrips: 0, level1: 2, level2: 0, level3: 0, level4: 0, level5: 0 },
    3: { cantrips: 0, level1: 3, level2: 0, level3: 0, level4: 0, level5: 0 },
    4: { cantrips: 0, level1: 3, level2: 0, level3: 0, level4: 0, level5: 0 },
    5: { cantrips: 0, level1: 4, level2: 2, level3: 0, level4: 0, level5: 0 },
    6: { cantrips: 0, level1: 4, level2: 2, level3: 0, level4: 0, level5: 0 },
    7: { cantrips: 0, level1: 4, level2: 3, level3: 0, level4: 0, level5: 0 },
    8: { cantrips: 0, level1: 4, level2: 3, level3: 0, level4: 0, level5: 0 },
    9: { cantrips: 0, level1: 4, level2: 3, level3: 2, level4: 0, level5: 0 },
    10: { cantrips: 0, level1: 4, level2: 3, level3: 2, level4: 0, level5: 0 }
};

const WARLOCK_PACT_SLOTS = {
    1: { cantrips: 2, level1: 1, level2: 0, level3: 0, level4: 0, level5: 0, pactMagicRest: 'short' },
    2: { cantrips: 2, level1: 2, level2: 0, level3: 0, level4: 0, level5: 0, pactMagicRest: 'short' },
    3: { cantrips: 2, level1: 0, level2: 2, level3: 0, level4: 0, level5: 0, pactMagicRest: 'short' },
    4: { cantrips: 3, level1: 0, level2: 2, level3: 0, level4: 0, level5: 0, pactMagicRest: 'short' },
    5: { cantrips: 3, level1: 0, level2: 0, level3: 2, level4: 0, level5: 0, pactMagicRest: 'short' },
    6: { cantrips: 3, level1: 0, level2: 0, level3: 2, level4: 0, level5: 0, pactMagicRest: 'short' },
    7: { cantrips: 3, level1: 0, level2: 0, level3: 2, level4: 1, level5: 0, pactMagicRest: 'short' },
    8: { cantrips: 3, level1: 0, level2: 0, level3: 2, level4: 1, level5: 0, pactMagicRest: 'short' },
    9: { cantrips: 3, level1: 0, level2: 0, level3: 2, level4: 0, level5: 1, pactMagicRest: 'short' },
    10: { cantrips: 4, level1: 0, level2: 0, level3: 2, level4: 0, level5: 1, pactMagicRest: 'short' }
};

const NON_CASTER_SLOTS = {
    1: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    2: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    3: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    4: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    5: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    6: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    7: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    8: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    9: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
    10: { cantrips: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 }
};

export const classes = [
    {
        id: 'fighter',
        name: 'Fighter',
        description: 'Masters of martial combat, skilled with a variety of weapons and armor.',
        hitDice: 'd10',
        hitDieValue: 10,
        primaryAbility: 'Strength or Dexterity',
        savingThrows: ['strength', 'constitution'],
        skillChoices: ['acrobatics', 'animal-handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
        skillCount: 2,
        isSpellcaster: false,
        spellcastingAbility: null,
        baseAcFormula: 'Chain Mail (16) + Shield (+2) = 18 AC',
        icon: '⚔️',
        color: 'red',
        startingEquipment: ['longsword', 'chain-mail', 'shield', 'light-crossbow', 'potion-of-healing'],
        subclasses: [
            { id: 'champion', name: 'Champion', description: 'Critical hits on 19-20 (Improved Critical) and superior athleticism.' },
            { id: 'battle-master', name: 'Battle Master', description: 'Tactical superiority dice (4d8) for Trip, Parry, and Riposte maneuvers.' },
            { id: 'eldritch-knight', name: 'Eldritch Knight', description: 'Weaves abjuration and evocation spells into frontline swordplay.' }
        ],
        classFeatures: [
            {
                id: 'second-wind',
                name: 'Second Wind',
                level: 1,
                actionType: 'bonus',
                usesPerRest: 1,
                restType: 'short',
                healDice: '1d10',
                addLevel: true,
                effect: 'Regain 1d10 + Fighter Level HP as a Bonus Action (1/Short Rest).'
            },
            {
                id: 'fighting-style-defense',
                name: 'Fighting Style: Defense & Dueling',
                level: 1,
                actionType: 'passive',
                effect: '+1 bonus to AC while wearing armor and +2 damage with one-handed melee weapons.'
            },
            {
                id: 'action-surge',
                name: 'Action Surge',
                level: 2,
                actionType: 'free',
                usesPerRest: 1,
                restType: 'short',
                effect: 'Push yourself beyond normal limits to take one additional Action on your turn (1/Short Rest).'
            },
            {
                id: 'extra-attack',
                name: 'Extra Attack',
                level: 5,
                actionType: 'passive',
                effect: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.'
            }
        ],
        spellSlotsByLevel: NON_CASTER_SLOTS
    },
    {
        id: 'wizard',
        name: 'Wizard',
        description: 'Scholarly magic-users capable of manipulating the structures of reality.',
        hitDice: 'd6',
        hitDieValue: 6,
        primaryAbility: 'Intelligence',
        savingThrows: ['intelligence', 'wisdom'],
        skillChoices: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
        skillCount: 2,
        isSpellcaster: true,
        spellcastingAbility: 'intelligence',
        baseAcFormula: '10 + DEX Mod (13 + DEX with Mage Armor)',
        icon: '🔮',
        color: 'purple',
        startingEquipment: ['quarterstaff', 'robes', 'wand-of-magic-missiles', 'potion-of-healing'],
        subclasses: [
            { id: 'evocation', name: 'School of Evocation', description: 'Sculpt Spells to protect allies from your AoE blasts and empower elemental damage.' },
            { id: 'abjuration', name: 'School of Abjuration', description: 'Projects an Arcane Ward of temporary hit points whenever you cast defensive magic.' },
            { id: 'divination', name: 'School of Divination', description: 'Roll two Portent d20s each morning to replace any attack roll or saving throw.' }
        ],
        classFeatures: [
            {
                id: 'arcane-recovery',
                name: 'Arcane Recovery',
                level: 1,
                actionType: 'action',
                usesPerRest: 1,
                restType: 'long',
                effect: 'Recover expended 1st- or 2nd-level spell slots during a Short Rest (1/Long Rest).'
            },
            {
                id: 'sculpt-spells',
                name: 'Sculpt Spells',
                level: 2,
                actionType: 'passive',
                effect: 'Allies automatically succeed on saving throws against your Evocation spells and take no damage.'
            }
        ],
        spellSlotsByLevel: FULL_CASTER_SLOTS(3)
    },
    {
        id: 'rogue',
        name: 'Rogue',
        description: 'Stealthy and cunning, rogues excel at finding hidden dangers and striking from shadows.',
        hitDice: 'd8',
        hitDieValue: 8,
        primaryAbility: 'Dexterity',
        savingThrows: ['dexterity', 'intelligence'],
        skillChoices: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight-of-hand', 'stealth'],
        skillCount: 4,
        isSpellcaster: false,
        spellcastingAbility: null,
        baseAcFormula: 'Studded Leather (12) + DEX Mod',
        icon: '🗡️',
        color: 'gray',
        startingEquipment: ['rapier', 'shortbow', 'dagger', 'studded-leather', 'thieves-tools', 'potion-of-healing'],
        subclasses: [
            { id: 'thief', name: 'Thief', description: 'Fast Hands lets you use items and pick locks as a Bonus Action; Second-Story Work aids climbing.' },
            { id: 'assassin', name: 'Assassin', description: 'Assassinate grants Advantage on enemies that have not acted yet, and hits on surprised foes are automatic Criticals.' },
            { id: 'arcane-trickster', name: 'Arcane Trickster', description: 'Enhances stealth and legerdemain with illusion and enchantment spells.' }
        ],
        classFeatures: [
            {
                id: 'sneak-attack',
                name: 'Sneak Attack',
                level: 1,
                actionType: 'onHit',
                damageDice: '1d6',
                effect: 'Deal extra 1d6 damage (2d6 at Lv 3, 3d6 at Lv 5) once per turn with a Finesse or Ranged weapon when you have Advantage or an ally is adjacent.'
            },
            {
                id: 'expertise',
                name: 'Expertise',
                level: 1,
                actionType: 'passive',
                effect: 'Your proficiency bonus is doubled for Stealth and Sleight of Hand / Thieves’ Tools.'
            },
            {
                id: 'cunning-action',
                name: 'Cunning Action',
                level: 2,
                actionType: 'bonus',
                effect: 'Take the Dash, Disengage, or Hide (granting Advantage on next attack) action as a Bonus Action.'
            },
            {
                id: 'uncanny-dodge',
                name: 'Uncanny Dodge',
                level: 5,
                actionType: 'reaction',
                effect: 'When an attacker you can see hits you with an attack, use your Reaction to halve the attack’s damage.'
            }
        ],
        spellSlotsByLevel: NON_CASTER_SLOTS
    },
    {
        id: 'cleric',
        name: 'Cleric',
        description: 'Divine spellcasters who channel the power of their deity to aid allies and smite foes.',
        hitDice: 'd8',
        hitDieValue: 8,
        primaryAbility: 'Wisdom',
        savingThrows: ['wisdom', 'charisma'],
        skillChoices: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
        skillCount: 2,
        isSpellcaster: true,
        spellcastingAbility: 'wisdom',
        baseAcFormula: 'Scale Mail (14) + DEX (max 2) + Shield (+2)',
        icon: '✝️',
        color: 'yellow',
        startingEquipment: ['mace', 'scale-mail', 'shield', 'light-crossbow', 'potion-of-healing'],
        subclasses: [
            { id: 'life-domain', name: 'Life Domain', description: 'Heavy armor proficiency and Disciple of Life (+2 + spell level bonus HP on every healing spell).' },
            { id: 'light-domain', name: 'Light Domain', description: 'Warding Flare imposes Disadvantage on attackers; Radiance of the Dawn scorches foes.' },
            { id: 'war-domain', name: 'War Domain', description: 'War Priest grants Bonus Action weapon attacks and Guided Strike (+10 to hit).' }
        ],
        classFeatures: [
            {
                id: 'disciple-of-life',
                name: 'Disciple of Life',
                level: 1,
                actionType: 'passive',
                effect: 'Whenever you use a spell of 1st level or higher to restore HP, the target regains an additional 2 + Spell Level HP.'
            },
            {
                id: 'channel-divinity-turn-undead',
                name: 'Channel Divinity: Turn Undead / Preserve Life',
                level: 2,
                actionType: 'action',
                usesPerRest: 1,
                restType: 'short',
                healDice: '3d6',
                damageDice: '2d8',
                damageType: 'radiant',
                effect: 'Present your holy symbol to heal allies for 5×Cleric Level HP or sear and Frighten Undead within 30 ft (WIS save).'
            }
        ],
        spellSlotsByLevel: FULL_CASTER_SLOTS(3)
    },
    {
        id: 'ranger',
        name: 'Ranger',
        description: 'Warriors of the wilderness, experts in hunting and tracking their quarry.',
        hitDice: 'd10',
        hitDieValue: 10,
        primaryAbility: 'Dexterity and Wisdom',
        savingThrows: ['strength', 'dexterity'],
        skillChoices: ['animal-handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
        skillCount: 3,
        isSpellcaster: true,
        spellcastingAbility: 'wisdom',
        baseAcFormula: 'Scale Mail (14) or Studded Leather (12) + DEX',
        icon: '🏹',
        color: 'green',
        startingEquipment: ['longbow', 'shortsword', 'studded-leather', 'potion-of-healing'],
        subclasses: [
            { id: 'hunter', name: 'Hunter', description: 'Colossus Slayer deals +1d8 damage per turn to any target below its maximum Hit Points.' },
            { id: 'gloom-stalker', name: 'Gloom Stalker', description: 'Dread Ambusher grants +WIS to Initiative, invisible in darkness to darkvision, and +1d8 ambush strike.' },
            { id: 'beast-master', name: 'Beast Master', description: 'Fights alongside a loyal Primal Companion (Wolf or Hawk) that strikes on your turn.' }
        ],
        classFeatures: [
            {
                id: 'favored-enemy',
                name: 'Favored Enemy & Deft Explorer',
                level: 1,
                actionType: 'passive',
                effect: 'Advantage on tracking checks and free casting of Hunter’s Mark (+1d6 damage per weapon hit).'
            },
            {
                id: 'colossus-slayer',
                name: 'Colossus Slayer',
                level: 3,
                actionType: 'onHit',
                damageDice: '1d8',
                effect: 'Your tenacity wears down foes: deal an extra 1d8 weapon damage once per turn if the target is below its max HP.'
            },
            {
                id: 'extra-attack',
                name: 'Extra Attack',
                level: 5,
                actionType: 'passive',
                effect: 'Attack twice whenever you take the Attack action on your turn.'
            }
        ],
        spellSlotsByLevel: HALF_CASTER_SLOTS
    },
    {
        id: 'bard',
        name: 'Bard',
        description: 'Inspiring performers whose music weaves magic and bolsters allies.',
        hitDice: 'd8',
        hitDieValue: 8,
        primaryAbility: 'Charisma',
        savingThrows: ['dexterity', 'charisma'],
        skillChoices: ['acrobatics', 'animal-handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight-of-hand', 'stealth', 'survival'],
        skillCount: 3,
        isSpellcaster: true,
        spellcastingAbility: 'charisma',
        baseAcFormula: 'Leather Armor (11) + DEX Mod',
        icon: '🎵',
        color: 'pink',
        startingEquipment: ['rapier', 'dagger', 'leather-armor', 'potion-of-healing'],
        subclasses: [
            { id: 'college-of-lore', name: 'College of Lore', description: 'Cutting Words uses a Reaction to subtract 1d6 from an enemy attack or damage roll, plus Magical Secrets.' },
            { id: 'college-of-valor', name: 'College of Valor', description: 'Medium armor, shields, martial weapons, and Combat Inspiration (+1d6 to weapon damage or AC).' },
            { id: 'college-of-glamour', name: 'College of Glamour', description: 'Mantle of Inspiration weaves Feywild music that grants allies temporary HP and free movement.' }
        ],
        classFeatures: [
            {
                id: 'bardic-inspiration',
                name: 'Bardic Inspiration',
                level: 1,
                actionType: 'bonus',
                usesPerRest: 3,
                restType: 'long',
                bonusDie: '1d6',
                effect: 'Inspire yourself or an ally as a Bonus Action: add +1d6 (1d8 at Lv 5) to the next attack roll, ability check, or saving throw.'
            },
            {
                id: 'jack-of-all-trades',
                name: 'Jack of All Trades & Song of Rest',
                level: 2,
                actionType: 'passive',
                effect: 'Add half your proficiency bonus to any ability check you lack proficiency in, and heal +1d6 HP on Short Rests.'
            }
        ],
        spellSlotsByLevel: FULL_CASTER_SLOTS(2)
    },
    {
        id: 'paladin',
        name: 'Paladin',
        description: 'Holy warriors bound by a sacred oath to uphold justice and righteousness.',
        hitDice: 'd10',
        hitDieValue: 10,
        primaryAbility: 'Strength and Charisma',
        savingThrows: ['wisdom', 'charisma'],
        skillChoices: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
        skillCount: 2,
        isSpellcaster: true,
        spellcastingAbility: 'charisma',
        baseAcFormula: 'Chain Mail (16) + Shield (+2) = 18 AC',
        icon: '🛡️',
        color: 'gold',
        startingEquipment: ['longsword', 'chain-mail', 'shield', 'potion-of-healing'],
        subclasses: [
            { id: 'oath-of-devotion', name: 'Oath of Devotion', description: 'Sacred Weapon adds +CHA modifier to attack rolls and emits bright holy light.' },
            { id: 'oath-of-vengeance', name: 'Oath of Vengeance', description: 'Vow of Enmity grants Advantage on all attack rolls against a chosen boss for 1 minute.' },
            { id: 'oath-of-the-ancients', name: 'Oath of the Ancients', description: 'Nature’s Wrath ensnares foes in spectral vines and Aura of Warding halves spell damage.' }
        ],
        classFeatures: [
            {
                id: 'lay-on-hands',
                name: 'Lay on Hands',
                level: 1,
                actionType: 'action',
                usesPerRest: 1,
                restType: 'long',
                healPoolMultiplier: 5,
                effect: 'Restore Hit Points equal to 5 × Paladin Level from your blessed healing pool, or cure poison/disease.'
            },
            {
                id: 'divine-smite',
                name: 'Divine Smite',
                level: 2,
                actionType: 'onHit',
                damageDice: '2d8',
                damageType: 'radiant',
                effect: 'When you hit with a melee weapon attack, expend a spell slot to deal +2d8 Radiant damage (+3d8 vs Undead/Fiends).'
            },
            {
                id: 'extra-attack',
                name: 'Extra Attack',
                level: 5,
                actionType: 'passive',
                effect: 'Attack twice whenever you take the Attack action on your turn.'
            }
        ],
        spellSlotsByLevel: HALF_CASTER_SLOTS
    },
    {
        id: 'barbarian',
        name: 'Barbarian',
        description: 'Fierce warriors who can enter a battle rage, gaining primal power.',
        hitDice: 'd12',
        hitDieValue: 12,
        primaryAbility: 'Strength',
        savingThrows: ['strength', 'constitution'],
        skillChoices: ['animal-handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
        skillCount: 2,
        isSpellcaster: false,
        spellcastingAbility: null,
        baseAcFormula: 'Unarmored Defense: 10 + DEX Mod + CON Mod',
        icon: '🪓',
        color: 'orange',
        startingEquipment: ['greataxe', 'handaxe', 'potion-of-healing'],
        subclasses: [
            { id: 'berserker', name: 'Path of the Berserker', description: 'Frenzy adds extra weapon damage dice on your first hit each turn while Raging.' },
            { id: 'totem-warrior', name: 'Path of the Totem Warrior (Bear)', description: 'Bear Totem grants Resistance to all damage types except Psychic while Raging.' },
            { id: 'zealot', name: 'Path of the Zealot', description: 'Divine Fury channels +1d6 + half level Radiant or Necrotic damage on your first hit each turn.' }
        ],
        classFeatures: [
            {
                id: 'rage',
                name: 'Rage',
                level: 1,
                actionType: 'bonus',
                usesPerRest: 2,
                restType: 'long',
                bonusDamage: 2,
                effect: 'Enter a primal Rage as a Bonus Action: gain Advantage on STR checks/saves, +2 melee damage, and Resistance to Bludgeoning, Piercing, and Slashing damage.'
            },
            {
                id: 'unarmored-defense-barbarian',
                name: 'Unarmored Defense',
                level: 1,
                actionType: 'passive',
                effect: 'While not wearing armor, your Armor Class equals 10 + DEX modifier + CON modifier.'
            },
            {
                id: 'reckless-attack',
                name: 'Reckless Attack',
                level: 2,
                actionType: 'free',
                effect: 'Throw aside all concern for defense to gain Advantage on melee STR attack rolls this turn, though attacks against you also have Advantage.'
            },
            {
                id: 'extra-attack',
                name: 'Extra Attack & Fast Movement',
                level: 5,
                actionType: 'passive',
                effect: 'Attack twice whenever you take the Attack action, and your speed increases by 10 feet.'
            }
        ],
        spellSlotsByLevel: NON_CASTER_SLOTS
    },
    {
        id: 'druid',
        name: 'Druid',
        description: 'Priests of the Old Faith, wielding elemental forces of nature and adopting animal forms.',
        hitDice: 'd8',
        hitDieValue: 8,
        primaryAbility: 'Wisdom',
        savingThrows: ['intelligence', 'wisdom'],
        skillChoices: ['arcana', 'animal-handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
        skillCount: 2,
        isSpellcaster: true,
        spellcastingAbility: 'wisdom',
        baseAcFormula: 'Leather Armor (11) + DEX Mod + Wooden Shield (+2)',
        icon: '🌿',
        color: 'emerald',
        startingEquipment: ['quarterstaff', 'leather-armor', 'shield', 'potion-of-healing'],
        subclasses: [
            { id: 'circle-of-the-moon', name: 'Circle of the Moon', description: 'Combat Wild Shape as a Bonus Action into a Dire Wolf or Brown Bear with higher AC and temp HP.' },
            { id: 'circle-of-the-land', name: 'Circle of the Land', description: 'Natural Recovery restores spell slots on a Short Rest and grants bonus terrain spells.' },
            { id: 'circle-of-stars', name: 'Circle of Stars', description: 'Starry Form constellations grant Archer radiant bolts, Chalice bonus healing, or Dragon concentration.' }
        ],
        classFeatures: [
            {
                id: 'wild-shape',
                name: 'Wild Shape (Dire Wolf / Bear)',
                level: 2,
                actionType: 'bonus',
                usesPerRest: 2,
                restType: 'short',
                tempHp: 18,
                effect: 'Magically assume the shape of a fierce beast (2/Short Rest), gaining +18 Temporary Hit Points and a savage 2d6+3 bite attack.'
            }
        ],
        spellSlotsByLevel: FULL_CASTER_SLOTS(2)
    },
    {
        id: 'monk',
        name: 'Monk',
        description: 'Masters of martial arts, harnessing the mystic energy of Ki to perform superhuman feats of speed and precision.',
        hitDice: 'd8',
        hitDieValue: 8,
        primaryAbility: 'Dexterity and Wisdom',
        savingThrows: ['strength', 'dexterity'],
        skillChoices: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
        skillCount: 2,
        isSpellcaster: false,
        spellcastingAbility: 'wisdom',
        baseAcFormula: 'Unarmored Defense: 10 + DEX Mod + WIS Mod',
        icon: '🥋',
        color: 'cyan',
        startingEquipment: ['shortsword', 'quarterstaff', 'potion-of-healing'],
        subclasses: [
            { id: 'open-hand', name: 'Way of the Open Hand', description: 'Flurry of Blows can knock enemies Prone, push them 15 feet, or strip their Reactions.' },
            { id: 'way-of-shadow', name: 'Way of Shadow', description: 'Ninja arts allowing you to cast Darkness, Pass Without Trace, and teleport between shadows.' },
            { id: 'four-elements', name: 'Way of the Four Elements', description: 'Channels Ki into elemental fangs of fire, thunderwaves, and Whip of Water.' }
        ],
        classFeatures: [
            {
                id: 'martial-arts',
                name: 'Martial Arts & Unarmored Defense',
                level: 1,
                actionType: 'passive',
                effect: 'Unarmored AC equals 10 + DEX + WIS, and you can make an Unarmed Strike (1d6 + DEX) as a Bonus Action.'
            },
            {
                id: 'flurry-of-blows',
                name: 'Ki: Flurry of Blows & Patient Defense',
                level: 2,
                actionType: 'bonus',
                usesPerRest: 3,
                restType: 'short',
                damageDice: '2d6',
                effect: 'Spend 1 Focus/Ki Point to unleash two rapid Unarmed Strikes (2d6 + DEX) or Dodge as a Bonus Action.'
            },
            {
                id: 'stunning-strike',
                name: 'Stunning Strike',
                level: 5,
                actionType: 'onHit',
                usesPerRest: 2,
                restType: 'short',
                saveAbility: 'constitution',
                condition: 'stunned',
                effect: 'Strike nerve clusters on a melee hit: target must succeed on a CON save or be Stunned until the end of your next turn.'
            }
        ],
        spellSlotsByLevel: NON_CASTER_SLOTS
    },
    {
        id: 'sorcerer',
        name: 'Sorcerer',
        description: 'Spellcasters who draw on inherent magic from a gift or draconic bloodline, shaping spells with Metamagic.',
        hitDice: 'd6',
        hitDieValue: 6,
        primaryAbility: 'Charisma',
        savingThrows: ['constitution', 'charisma'],
        skillChoices: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
        skillCount: 2,
        isSpellcaster: true,
        spellcastingAbility: 'charisma',
        baseAcFormula: 'Draconic Resilience: 13 + DEX Mod',
        icon: '🔥',
        color: 'rose',
        startingEquipment: ['dagger', 'quarterstaff', 'robes', 'potion-of-healing'],
        subclasses: [
            { id: 'draconic-bloodline', name: 'Draconic Bloodline', description: 'Draconic Resilience grants 13 + DEX base AC, +1 HP per level, and +CHA to elemental spell damage.' },
            { id: 'wild-magic', name: 'Wild Magic', description: 'Tides of Chaos grants Advantage on demand and triggers unpredictable Wild Magic Surges.' },
            { id: 'storm-sorcery', name: 'Storm Sorcery', description: 'Tempestuous Magic lets you fly 10 feet without provoking Opportunity Attacks whenever you cast a spell.' }
        ],
        classFeatures: [
            {
                id: 'innate-sorcery',
                name: 'Innate Sorcery & Draconic Resilience',
                level: 1,
                actionType: 'bonus',
                usesPerRest: 2,
                restType: 'long',
                effect: 'Unleash arcane power: base AC is 13 + DEX, +1 Max HP/level, and +1 to your Spell Save DC and Advantage on spell attacks.'
            },
            {
                id: 'metamagic-quickened',
                name: 'Font of Magic & Metamagic (Quickened / Twinned)',
                level: 2,
                actionType: 'free',
                usesPerRest: 3,
                restType: 'long',
                effect: 'Spend Sorcery Points to cast a spell as a Bonus Action (Quickened), twin a single-target spell, or convert points into a spell slot.'
            }
        ],
        spellSlotsByLevel: FULL_CASTER_SLOTS(4)
    },
    {
        id: 'warlock',
        name: 'Warlock',
        description: 'Wielders of magic that is derived from a bargain with an extraplanar entity.',
        hitDice: 'd8',
        hitDieValue: 8,
        primaryAbility: 'Charisma',
        savingThrows: ['wisdom', 'charisma'],
        skillChoices: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
        skillCount: 2,
        isSpellcaster: true,
        spellcastingAbility: 'charisma',
        baseAcFormula: 'Studded Leather (12) + DEX Mod',
        icon: '👁️',
        color: 'indigo',
        startingEquipment: ['dagger', 'quarterstaff', 'studded-leather', 'potion-of-healing'],
        subclasses: [
            { id: 'the-fiend', name: 'The Fiend Patron', description: 'Dark One’s Blessing grants Temporary HP equal to CHA Mod + Warlock Level whenever you reduce a foe to 0 HP.' },
            { id: 'the-archfey', name: 'The Archfey Patron', description: 'Fey Presence charms or frightens nearby enemies and Misty Escape teleports you when damaged.' },
            { id: 'the-great-old-one', name: 'The Great Old One Patron', description: 'Awakened Mind telepathy and psychic shields from the Far Realm.' }
        ],
        classFeatures: [
            {
                id: 'dark-ones-blessing',
                name: "Dark One's Blessing (Pact Boons)",
                level: 1,
                actionType: 'passive',
                effect: 'When you reduce a hostile creature to 0 HP, you gain Temporary HP equal to your Charisma modifier + Warlock level (minimum 4). All Pact Slots recharge on a Short Rest!'
            },
            {
                id: 'agonizing-blast',
                name: 'Eldritch Invocations: Agonizing Blast & Devil’s Sight',
                level: 2,
                actionType: 'passive',
                effect: 'Add your Charisma modifier to the damage of every Eldritch Blast beam, and see normally in magical and nonmagical darkness to 120 ft.'
            }
        ],
        spellSlotsByLevel: WARLOCK_PACT_SLOTS
    }
];

export const getClassById = (id) => classes.find(cls => cls.id === id);

/**
 * Calculate maximum Hit Points according to D&D 5e PHB rules:
 * Level 1: Max Hit Die + CON modifier (+1/level for Hill Dwarf or Draconic Sorcerer)
 * Subsequent levels: Fixed average (HitDie/2 + 1) + CON modifier per level
 */
export const calculateMaxHp = (classId, conScore = 10, level = 1, raceId = null) => {
    const cls = getClassById(classId);
    const hitDie = cls?.hitDieValue || 8;
    const conMod = Math.floor((conScore - 10) / 2);
    const avgPerLevel = Math.floor(hitDie / 2) + 1;
    const level1Hp = Math.max(1, hitDie + conMod);
    const higherLevelsHp = Math.max(0, level - 1) * Math.max(1, avgPerLevel + conMod);
    const bonusPerLevel = (raceId === 'dwarf' || classId === 'sorcerer') ? level : 0;
    return level1Hp + higherLevelsHp + bonusPerLevel;
};
