// D&D 5e Player's Handbook Races with stat bonuses, traits, subraces, and active/passive mechanics
export const races = [
    {
        id: 'human',
        name: 'Human',
        description: 'Versatile and ambitious, humans are the most adaptable of all races.',
        statBonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
        traits: ['Extra Language', 'Bonus Skill', 'Resourceful'],
        speed: 30,
        size: 'Medium',
        darkvision: 0,
        resistances: [],
        icon: '👤',
        subraces: [
            {
                id: 'standard-human',
                name: 'Standard Human',
                description: 'Well-rounded adventurers with +1 to all six ability scores.',
                statBonuses: {},
                traits: ['Versatile Heritage (+1 All Stats)']
            },
            {
                id: 'variant-human',
                name: 'Variant Human',
                description: 'Specialized training grants a bonus skill proficiency and Heroic Inspiration each long rest.',
                statBonuses: { constitution: 1 },
                traits: ['Skill Versatility', 'Resourceful (Heroic Inspiration on Long Rest)', 'Feat Training']
            }
        ],
        racialAbilities: [
            {
                id: 'resourceful',
                name: 'Resourceful',
                actionType: 'passive',
                usesPerRest: 1,
                restType: 'long',
                description: 'You gain Heroic Inspiration (1 free d20 reroll) whenever you finish a Long Rest.'
            }
        ]
    },
    {
        id: 'elf',
        name: 'Elf',
        description: 'Graceful and long-lived, elves possess keen senses and a deep connection to nature.',
        statBonuses: { dexterity: 2 },
        traits: ['Darkvision', 'Fey Ancestry', 'Trance', 'Keen Senses'],
        speed: 30,
        size: 'Medium',
        darkvision: 60,
        resistances: [],
        icon: '🧝',
        subraces: [
            {
                id: 'high-elf',
                name: 'High Elf',
                description: 'Students of arcane magic who master a wizard cantrip from a young age.',
                statBonuses: { intelligence: 1 },
                traits: ['Wizard Cantrip (Fire Bolt)', 'Elf Weapon Training']
            },
            {
                id: 'wood-elf',
                name: 'Wood Elf',
                description: 'Swift guardians of the forest with keen intuition and unmatched stealth in nature.',
                statBonuses: { wisdom: 1 },
                speedBonus: 5,
                traits: ['Fleet of Foot (35 ft Speed)', 'Mask of the Wild']
            },
            {
                id: 'drow',
                name: 'Drow (Dark Elf)',
                description: 'Denizens of the Underdark blessed with superior darkvision and innate shadow magic.',
                statBonuses: { charisma: 1 },
                darkvision: 120,
                traits: ['Superior Darkvision (120 ft)', 'Drow Magic (Faerie Fire & Darkness)']
            }
        ],
        racialAbilities: [
            {
                id: 'fey-ancestry',
                name: 'Fey Ancestry',
                actionType: 'passive',
                description: 'Advantage on saving throws against being Charmed, and magic cannot put you to sleep.'
            },
            {
                id: 'trance',
                name: 'Trance',
                actionType: 'passive',
                description: 'Elves do not sleep; instead you meditate deeply for 4 hours to gain the benefits of a Long Rest.'
            }
        ]
    },
    {
        id: 'dwarf',
        name: 'Dwarf',
        description: 'Stout and sturdy, dwarves are known for their resilience and craftsmanship.',
        statBonuses: { constitution: 2 },
        traits: ['Darkvision', 'Dwarven Resilience', 'Stonecunning', 'Dwarven Combat Training'],
        speed: 25,
        size: 'Medium',
        darkvision: 60,
        resistances: ['poison'],
        icon: '⛏️',
        subraces: [
            {
                id: 'hill-dwarf',
                name: 'Hill Dwarf',
                description: 'Keen senses, deep intuition, and remarkable physical toughness.',
                statBonuses: { wisdom: 1 },
                hpBonusPerLevel: 1,
                traits: ['Dwarven Toughness (+1 Max HP per Level)']
            },
            {
                id: 'mountain-dwarf',
                name: 'Mountain Dwarf',
                description: 'Strong and hardy warriors accustomed to rugged life in the high peaks.',
                statBonuses: { strength: 2 },
                traits: ['Dwarven Armor Training (Light & Medium Armor)']
            }
        ],
        racialAbilities: [
            {
                id: 'dwarven-resilience',
                name: 'Dwarven Resilience',
                actionType: 'passive',
                description: 'Advantage on saving throws against poison, and resistance against poison damage.'
            },
            {
                id: 'stonecunning',
                name: 'Stonecunning',
                actionType: 'passive',
                description: 'Double proficiency bonus on History checks related to the origin of stonework.'
            }
        ]
    },
    {
        id: 'halfling',
        name: 'Halfling',
        description: 'Small but brave, halflings possess remarkable luck and stealth.',
        statBonuses: { dexterity: 2 },
        traits: ['Lucky', 'Brave', 'Nimble'],
        speed: 25,
        size: 'Small',
        darkvision: 0,
        resistances: [],
        icon: '🍀',
        subraces: [
            {
                id: 'lightfoot-halfling',
                name: 'Lightfoot Halfling',
                description: 'Affable and elusive, easily hiding behind allies or fading from notice.',
                statBonuses: { charisma: 1 },
                traits: ['Naturally Stealthy']
            },
            {
                id: 'stout-halfling',
                name: 'Stout Halfling',
                description: 'Hardier halflings said to carry a drop of dwarven blood in their veins.',
                statBonuses: { constitution: 1 },
                resistances: ['poison'],
                traits: ['Stout Resilience (Poison Resistance)']
            }
        ],
        racialAbilities: [
            {
                id: 'lucky',
                name: 'Lucky (Reroll Nat 1s)',
                actionType: 'passive',
                description: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you automatically reroll the die and must use the new roll.'
            },
            {
                id: 'brave',
                name: 'Brave',
                actionType: 'passive',
                description: 'Advantage on saving throws against being Frightened.'
            }
        ]
    },
    {
        id: 'tiefling',
        name: 'Tiefling',
        description: 'Born with infernal heritage, tieflings wield dark charisma and magical powers.',
        statBonuses: { charisma: 2, intelligence: 1 },
        traits: ['Darkvision', 'Hellish Resistance', 'Infernal Legacy'],
        speed: 30,
        size: 'Medium',
        darkvision: 60,
        resistances: ['fire'],
        icon: '😈',
        subraces: [
            {
                id: 'asmodeus-tiefling',
                name: 'Bloodline of Asmodeus',
                description: 'Heirs to the Archdevil of Nessus, commanding fire and darkness.',
                statBonuses: {},
                traits: ['Thaumaturgy Cantrip', 'Hellish Rebuke (1/Day)', 'Darkness (Lv 5)']
            },
            {
                id: 'mephistopheles-tiefling',
                name: 'Bloodline of Mephistopheles',
                description: 'Gifted with arcane fire and icy cunning from the eighth layer of Hell.',
                statBonuses: {},
                traits: ['Mage Hand Cantrip', 'Burning Hands (1/Day)']
            }
        ],
        racialAbilities: [
            {
                id: 'hellish-resistance',
                name: 'Hellish Resistance',
                actionType: 'passive',
                description: 'You have resistance to fire damage.'
            },
            {
                id: 'infernal-legacy-rebuke',
                name: 'Hellish Rebuke (Infernal Legacy)',
                actionType: 'reaction',
                usesPerRest: 1,
                restType: 'long',
                damageDice: '2d10',
                damageType: 'fire',
                saveAbility: 'dexterity',
                saveDc: 13,
                description: 'Point your finger in response to being damaged, surrounding the attacker in hellish flames (2d10 Fire, DEX DC 13 for half).'
            }
        ]
    },
    {
        id: 'dragonborn',
        name: 'Dragonborn',
        description: 'Proud descendants of dragons, they possess a breath weapon and draconic ancestry.',
        statBonuses: { strength: 2, charisma: 1 },
        traits: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'],
        speed: 30,
        size: 'Medium',
        darkvision: 60,
        resistances: ['fire'],
        icon: '🐉',
        subraces: [
            {
                id: 'red-dragonborn',
                name: 'Red / Gold Draconic Ancestry (Fire)',
                description: 'Descended from fiery dragons; exhale a 15-ft cone of searing flame and resist fire.',
                statBonuses: {},
                damageType: 'fire',
                traits: ['Fire Breath (15-ft Cone)', 'Fire Resistance']
            },
            {
                id: 'blue-dragonborn',
                name: 'Blue / Bronze Draconic Ancestry (Lightning)',
                description: 'Descended from storm dragons; exhale a 30-ft line of lightning and resist lightning.',
                statBonuses: {},
                damageType: 'lightning',
                traits: ['Lightning Breath (30-ft Line)', 'Lightning Resistance']
            },
            {
                id: 'silver-dragonborn',
                name: 'White / Silver Draconic Ancestry (Cold)',
                description: 'Descended from frost dragons; exhale a 15-ft cone of freezing air and resist cold.',
                statBonuses: {},
                damageType: 'cold',
                traits: ['Cold Breath (15-ft Cone)', 'Cold Resistance']
            }
        ],
        racialAbilities: [
            {
                id: 'breath-weapon',
                name: 'Breath Weapon',
                actionType: 'action',
                usesPerRest: 1,
                restType: 'short',
                damageDice: '2d6',
                damageType: 'fire',
                saveAbility: 'dexterity',
                saveDc: 12,
                isAoE: true,
                description: 'Exhale destructive draconic energy in a 15-ft cone. Enemies make a DC 12 DEX save, taking 2d6 elemental damage on a failed save, or half on a success (3d6 at level 5).'
            }
        ]
    },
    {
        id: 'gnome',
        name: 'Gnome',
        description: 'Curious and inventive, gnomes are small folk with big imaginations.',
        statBonuses: { intelligence: 2 },
        traits: ['Darkvision', 'Gnome Cunning'],
        speed: 25,
        size: 'Small',
        darkvision: 60,
        resistances: [],
        icon: '🔧',
        subraces: [
            {
                id: 'rock-gnome',
                name: 'Rock Gnome',
                description: 'Hardy inventors and alchemists with clockwork tinkering skills.',
                statBonuses: { constitution: 1 },
                traits: ["Artificer's Lore", 'Tinker']
            },
            {
                id: 'forest-gnome',
                name: 'Forest Gnome',
                description: 'Stealthy illusionists who befriend small woodland creatures.',
                statBonuses: { dexterity: 1 },
                traits: ['Natural Illusionist (Minor Illusion)', 'Speak with Small Beasts']
            }
        ],
        racialAbilities: [
            {
                id: 'gnome-cunning',
                name: 'Gnome Cunning',
                actionType: 'passive',
                description: 'You have Advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.'
            }
        ]
    },
    {
        id: 'half-elf',
        name: 'Half-Elf',
        description: 'Walking in two worlds, half-elves combine human curiosity and ambition with the refined senses and artistry of the elves.',
        statBonuses: { charisma: 2, dexterity: 1, wisdom: 1 },
        traits: ['Darkvision', 'Fey Ancestry', 'Skill Versatility'],
        speed: 30,
        size: 'Medium',
        darkvision: 60,
        resistances: [],
        icon: '✨',
        subraces: [
            {
                id: 'standard-half-elf',
                name: 'Half-Elf Diplomat',
                description: 'Natural emissaries blessed with extra skill proficiencies and elven grace.',
                statBonuses: {},
                traits: ['Skill Versatility (+2 Skills)', 'Fey Ancestry']
            },
            {
                id: 'wood-half-elf',
                name: 'Half-Wood Elf',
                description: 'Inherits the swift stride and forest stealth of their Wood Elf parent.',
                statBonuses: {},
                speedBonus: 5,
                traits: ['Fleet of Foot (35 ft Speed)', 'Mask of the Wild']
            }
        ],
        racialAbilities: [
            {
                id: 'fey-ancestry',
                name: 'Fey Ancestry',
                actionType: 'passive',
                description: 'Advantage on saving throws against being Charmed, and magic cannot put you to sleep.'
            }
        ]
    },
    {
        id: 'half-orc',
        name: 'Half-Orc',
        description: 'Combining human ambition with orcish strength, half-orcs are formidable warriors.',
        statBonuses: { strength: 2, constitution: 1 },
        traits: ['Darkvision', 'Menacing', 'Relentless Endurance', 'Savage Attacks'],
        speed: 30,
        size: 'Medium',
        darkvision: 60,
        resistances: [],
        icon: '💪',
        subraces: [
            {
                id: 'standard-half-orc',
                name: 'Scarred Vanguard',
                description: 'Fierce frontline champions whose critical blows shatter enemy defenses.',
                statBonuses: {},
                traits: ['Menacing (Intimidation Proficiency)', 'Relentless Endurance', 'Savage Attacks']
            }
        ],
        racialAbilities: [
            {
                id: 'relentless-endurance',
                name: 'Relentless Endurance',
                actionType: 'passive',
                usesPerRest: 1,
                restType: 'long',
                description: 'When you are reduced to 0 Hit Points but not killed outright, you drop to 1 Hit Point instead (1/Long Rest).'
            },
            {
                id: 'savage-attacks',
                name: 'Savage Attacks',
                actionType: 'passive',
                description: 'When you score a Critical Hit with a melee weapon attack, you roll one of the weapon’s damage dice one additional time and add it to the extra damage.'
            }
        ]
    }
];

export const getRaceById = (id) => races.find(race => race.id === id);
