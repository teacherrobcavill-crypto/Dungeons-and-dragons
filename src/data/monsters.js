// D&D 5e Monster Manual Bestiary (2024 MM Stat Block Format + 2014 Lore & Tactics)

const makeAbilities = (str, dex, con, int, wis, cha) => ({
    strength: str,
    dexterity: dex,
    constitution: con,
    intelligence: int,
    wisdom: wis,
    charisma: cha
});

export const monsters = [
    // =========================================================================
    // LOW TIER (CR 1/8 – CR 1)
    // =========================================================================
    {
        id: 'giant-rat',
        name: 'Giant Rat',
        icon: '🐀',
        size: 'Small',
        type: 'Beast',
        alignment: 'Unaligned',
        habitat: 'Underdark, Urban, Sewer',
        treasureTheme: 'None',
        cr: 0.125,
        xp: 25,
        ac: 12,
        hp: 7,
        maxHp: 7,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(7, 15, 11, 2, 10, 4),
        saves: {},
        skills: { perception: 2 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 12',
        lore: 'Diseased scavengers that swarm through damp cellars, sewers, and ruined crypts, bold enough to gnaw through boot leather when in a pack.',
        traits: [
            { name: 'Pack Tactics', description: 'The rat has Advantage on attack rolls against a creature if at least one of the rat’s allies is within 5 feet of the creature.' }
        ],
        actions: [
            {
                name: 'Diseased Bite',
                toHit: 4,
                damageDice: '1d4',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Melee Attack: +4 to hit, 1d4 + 2 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'kobold',
        name: 'Kobold Trapmaker',
        icon: '🦎',
        size: 'Small',
        type: 'Dragon (Humanoid)',
        alignment: 'Lawful Evil',
        habitat: 'Underdark, Mountain, Cave',
        treasureTheme: 'Armaments',
        cr: 0.125,
        xp: 25,
        ac: 12,
        hp: 7,
        maxHp: 7,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(7, 15, 9, 8, 7, 8),
        saves: {},
        skills: { stealth: 4, perception: 0 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 8',
        lore: 'Reptilian tunnel-builders who worship dragons as living gods and compensate for their small stature with ingenious deadfalls and pack ambushes.',
        traits: [
            { name: 'Pack Tactics', description: 'Advantage on attack rolls when an ally is adjacent to the target.' },
            { name: 'Sunlight Sensitivity', description: 'Disadvantage on attack rolls and sight checks in direct sunlight.' }
        ],
        actions: [
            {
                name: 'Jagged Dagger',
                toHit: 4,
                damageDice: '1d4',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Melee Attack: +4 to hit, 1d4 + 2 Piercing damage.'
            },
            {
                name: 'Sling Stone',
                toHit: 4,
                damageDice: '1d4',
                damageBonus: 2,
                damageType: 'bludgeoning',
                description: 'Ranged Attack (30/120 ft): +4 to hit, 1d4 + 2 Bludgeoning damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'bandit',
        name: 'Redbrand Bandit',
        icon: '🗡️',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Neutral Evil',
        habitat: 'Urban, Forest, Road',
        treasureTheme: 'Armaments',
        cr: 0.125,
        xp: 25,
        ac: 12,
        hp: 11,
        maxHp: 11,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(11, 12, 12, 10, 10, 10),
        saves: {},
        skills: { intimidation: 2, stealth: 3 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 10',
        lore: 'Scarlet-cloaked ruffians and highwaymen who extort frontier merchants and serve crime lords from hidden tavern cellars.',
        traits: [
            { name: 'Dirty Fighting', description: 'Targets wounded travelers and demands gold before striking.' }
        ],
        actions: [
            {
                name: 'Scimitar Slash',
                toHit: 3,
                damageDice: '1d6',
                damageBonus: 1,
                damageType: 'slashing',
                description: 'Melee Attack: +3 to hit, 1d6 + 1 Slashing damage.'
            },
            {
                name: 'Light Crossbow',
                toHit: 3,
                damageDice: '1d8',
                damageBonus: 1,
                damageType: 'piercing',
                description: 'Ranged Attack (80/320 ft): +3 to hit, 1d8 + 1 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'cultist',
        name: 'Shadow Cultist',
        icon: '🕯️',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Neutral Evil',
        habitat: 'Urban, Ruin, Temple',
        treasureTheme: 'Relics',
        cr: 0.125,
        xp: 25,
        ac: 12,
        hp: 9,
        maxHp: 9,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(11, 12, 10, 10, 11, 10),
        saves: { wisdom: 2 },
        skills: { deception: 2, religion: 2 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 10',
        lore: 'Zealots sworn to forbidden elder powers, dragon cults, or archdevils, chanting dark litanies beneath cowled robes.',
        traits: [
            { name: 'Dark Devotion', description: 'Advantage on saving throws against being Charmed or Frightened.' }
        ],
        actions: [
            {
                name: 'Ritual Scimitar',
                toHit: 3,
                damageDice: '1d6',
                damageBonus: 1,
                damageType: 'slashing',
                description: 'Melee Attack: +3 to hit, 1d6 + 1 Slashing + 1 Necrotic damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'guard',
        name: 'Watch Guard',
        icon: '🛡️',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Lawful Neutral',
        habitat: 'Urban, Keep',
        treasureTheme: 'Armaments',
        cr: 0.125,
        xp: 25,
        ac: 16,
        hp: 11,
        maxHp: 11,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(13, 12, 12, 10, 11, 10),
        saves: {},
        skills: { perception: 2 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 12',
        lore: 'Chain-clad sentries, caravan mercenaries, and city watchmen who patrol citadel gates with spear and shield.',
        traits: [
            { name: 'Shield Wall', description: 'Maintains a disciplined 16 AC formation with chain shirt and shield.' }
        ],
        actions: [
            {
                name: 'Iron Spear',
                toHit: 3,
                damageDice: '1d6',
                damageBonus: 1,
                damageType: 'piercing',
                description: 'Melee or Ranged Attack: +3 to hit, 1d6 + 1 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'stirge',
        name: 'Stirge',
        icon: '🦟',
        size: 'Tiny',
        type: 'Monstrosity',
        alignment: 'Unaligned',
        habitat: 'Underdark, Swamp, Cave',
        treasureTheme: 'None',
        cr: 0.125,
        xp: 25,
        ac: 14,
        hp: 5,
        maxHp: 5,
        speed: '10 ft, Fly 40 ft',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(4, 16, 11, 2, 8, 6),
        saves: {},
        skills: { stealth: 5 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 9',
        lore: 'Bat-winged bloodsuckers with needle-sharp proboscises that roost in cavern ceilings and drop onto warm-blooded prey.',
        traits: [
            { name: 'Blood Drain Latch', description: 'Latches onto targets on a hit, draining blood automatically on subsequent turns.' }
        ],
        actions: [
            {
                name: 'Blood Drain Proboscis',
                toHit: 5,
                damageDice: '1d4',
                damageBonus: 3,
                damageType: 'piercing',
                description: 'Melee Attack: +5 to hit, 1d4 + 3 Piercing damage and attaches to drain blood.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'goblin',
        name: 'Cragmaw Goblin',
        icon: '👺',
        size: 'Small',
        type: 'Fey (Goblinoid)',
        alignment: 'Neutral Evil',
        habitat: 'Forest, Hill, Underdark',
        treasureTheme: 'Implements',
        cr: 0.25,
        xp: 50,
        ac: 15,
        hp: 10,
        maxHp: 10,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(8, 14, 10, 10, 8, 8),
        saves: {},
        skills: { stealth: 6 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 9',
        lore: 'Cunning, black-hearted ambushers from the Cragmaw tribe who riddle forest trails with snares and dart into the brush after every shot.',
        traits: [
            { name: 'Nimble Escape', description: 'The goblin can take the Disengage or Hide action as a Bonus Action on each of its turns.' }
        ],
        actions: [
            {
                name: 'Notched Scimitar',
                toHit: 4,
                damageDice: '1d6',
                damageBonus: 2,
                damageType: 'slashing',
                description: 'Melee Attack: +4 to hit, 1d6 + 2 Slashing damage.'
            },
            {
                name: 'Shortbow Ambush',
                toHit: 4,
                damageDice: '1d6',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Ranged Attack (80/320 ft): +4 to hit, 1d6 + 2 Piercing damage.'
            }
        ],
        bonusActions: [
            { name: 'Nimble Escape', description: 'Darts into cover or disengages without provoking Opportunity Attacks.' }
        ],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'skeleton',
        name: 'Crypt Skeleton',
        icon: '💀',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Lawful Evil',
        habitat: 'Crypt, Ruin, Underdark',
        treasureTheme: 'Armaments',
        cr: 0.25,
        xp: 50,
        ac: 13,
        hp: 13,
        maxHp: 13,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(10, 14, 15, 6, 8, 5),
        saves: {},
        skills: {},
        resistances: [],
        immunities: ['poison'],
        vulnerabilities: ['bludgeoning'],
        senses: 'Darkvision 60 ft, Passive Perception 9',
        lore: 'Animated bones bound by necromantic runes that rise clattering from ancient sarcophagi to guard their master’s tomb for eternity.',
        traits: [
            { name: 'Brittle Bones', description: 'Vulnerable to Bludgeoning damage; Immune to Poison and Exhaustion.' }
        ],
        actions: [
            {
                name: 'Rusted Shortsword',
                toHit: 4,
                damageDice: '1d6',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Melee Attack: +4 to hit, 1d6 + 2 Piercing damage.'
            },
            {
                name: 'Bone Shortbow',
                toHit: 4,
                damageDice: '1d6',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Ranged Attack (80/320 ft): +4 to hit, 1d6 + 2 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'zombie',
        name: 'Ash Zombie',
        icon: '🧟',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Neutral Evil',
        habitat: 'Crypt, Graveyard, Ruin',
        treasureTheme: 'None',
        cr: 0.25,
        xp: 50,
        ac: 8,
        hp: 22,
        maxHp: 22,
        speed: '20 ft',
        initiativeMod: -2,
        initiativeStatic: 8,
        abilities: makeAbilities(13, 6, 16, 3, 6, 5),
        saves: { wisdom: 0 },
        skills: {},
        resistances: [],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 8',
        lore: 'Shambling corpses choked with volcanic ash and dark necromancy that refuse to stay down unless felled by radiant light.',
        traits: [
            { name: 'Undead Fortitude', description: 'If damage reduces the zombie to 0 HP, it makes a CON save (DC 5 + damage) to drop to 1 HP instead, unless the damage is Radiant or a Critical Hit.' }
        ],
        actions: [
            {
                name: 'Choking Slam',
                toHit: 3,
                damageDice: '1d6',
                damageBonus: 1,
                damageType: 'bludgeoning',
                description: 'Melee Attack: +3 to hit, 1d6 + 1 Bludgeoning damage plus a puff of blinding ash.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'wolf',
        name: 'Timber Wolf',
        icon: '🐺',
        size: 'Medium',
        type: 'Beast',
        alignment: 'Unaligned',
        habitat: 'Forest, Hill, Arctic',
        treasureTheme: 'None',
        cr: 0.25,
        xp: 50,
        ac: 13,
        hp: 11,
        maxHp: 11,
        speed: '40 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(12, 15, 12, 3, 12, 6),
        saves: {},
        skills: { perception: 3, stealth: 4 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 13',
        lore: 'Fierce pack predators often trained by goblins and bugbears as cave sentries or hunting hounds.',
        traits: [
            { name: 'Keen Hearing and Smell', description: 'Advantage on Wisdom (Perception) checks that rely on hearing or smell.' },
            { name: 'Pack Tactics', description: 'Advantage on attack rolls when an ally is within 5 feet of the target.' }
        ],
        actions: [
            {
                name: 'Hamstring Bite',
                toHit: 4,
                damageDice: '2d4',
                damageBonus: 2,
                damageType: 'piercing',
                saveDc: 11,
                saveAbility: 'strength',
                condition: 'prone',
                description: 'Melee Attack: +4 to hit, 2d4 + 2 Piercing damage. Target must succeed on a DC 11 STR save or be knocked Prone.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'orc',
        name: 'Many-Arrows Orc Raider',
        icon: '👹',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Chaotic Evil',
        habitat: 'Mountain, Hill, Underdark',
        treasureTheme: 'Armaments',
        cr: 0.5,
        xp: 100,
        ac: 13,
        hp: 15,
        maxHp: 15,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(16, 12, 16, 7, 11, 10),
        saves: {},
        skills: { intimidation: 2 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Savage mountain warriors from Wyvern Tor who charge into melee with bloodcurdling war cries and heavy greataxes.',
        traits: [
            { name: 'Aggressive Charge', description: 'As a Bonus Action, the orc can move up to its speed toward a hostile creature it can see.' }
        ],
        actions: [
            {
                name: 'Brutal Greataxe',
                toHit: 5,
                damageDice: '1d12',
                damageBonus: 3,
                damageType: 'slashing',
                description: 'Melee Attack: +5 to hit, 1d12 + 3 Slashing damage.'
            },
            {
                name: 'Heavy Javelin',
                toHit: 5,
                damageDice: '1d6',
                damageBonus: 3,
                damageType: 'piercing',
                description: 'Ranged Attack (30/120 ft): +5 to hit, 1d6 + 3 Piercing damage.'
            }
        ],
        bonusActions: [
            { name: 'Aggressive', description: 'Surges 30 ft directly into melee range.' }
        ],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'hobgoblin',
        name: 'Cragmaw Hobgoblin Captain',
        icon: '⚔️',
        size: 'Medium',
        type: 'Fey (Goblinoid)',
        alignment: 'Lawful Evil',
        habitat: 'Forest, Hill, Keep',
        treasureTheme: 'Armaments',
        cr: 0.5,
        xp: 100,
        ac: 18,
        hp: 16,
        maxHp: 16,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(13, 12, 12, 10, 10, 9),
        saves: {},
        skills: { athletics: 3 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Disciplined militaristic goblinoids clad in crimson chain mail who exploit formation fighting to deliver devastating precision strikes.',
        traits: [
            { name: 'Martial Advantage', description: 'Once per turn, the hobgoblin deals an extra 2d6 (7) damage to a creature it hits with a weapon attack if an ally is within 5 feet.' }
        ],
        actions: [
            {
                name: 'Martial Longsword',
                toHit: 3,
                damageDice: '1d8+2d6',
                damageBonus: 1,
                damageType: 'slashing',
                description: 'Melee Attack: +3 to hit, 1d8 + 1 Slashing damage (+2d6 Martial Advantage when an ally is adjacent).'
            },
            {
                name: 'War Longbow',
                toHit: 3,
                damageDice: '1d8',
                damageBonus: 1,
                damageType: 'piercing',
                description: 'Ranged Attack (150/600 ft): +3 to hit, 1d8 + 1 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'goblin-boss',
        name: 'Yeemik, Goblin Boss',
        icon: '👑',
        size: 'Small',
        type: 'Fey (Goblinoid)',
        alignment: 'Neutral Evil',
        habitat: 'Cave, Forest, Underdark',
        treasureTheme: 'Implements',
        cr: 1,
        xp: 200,
        ac: 17,
        hp: 21,
        maxHp: 21,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(10, 14, 10, 10, 8, 10),
        saves: {},
        skills: { stealth: 6, deception: 2 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 9',
        lore: 'Treacherous chieftains who rule goblin warrens through cruelty, bribery, and the habit of pulling a minion in front of incoming arrows.',
        traits: [
            { name: 'Nimble Escape', description: 'Can Disengage or Hide as a Bonus Action.' }
        ],
        actions: [
            {
                name: 'Multiattack Scimitars',
                toHit: 4,
                damageDice: '2d6',
                damageBonus: 2,
                damageType: 'slashing',
                description: 'Makes two twin scimitar attacks (+4 to hit, 2d6 + 2 total Slashing damage).'
            }
        ],
        bonusActions: [],
        reactions: [
            { name: 'Redirect Attack', description: 'Swaps places with a nearby goblin minion to make the minion take the hit instead!' }
        ],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'klarg',
        name: 'Klarg the Bugbear Chief',
        icon: '🐻',
        size: 'Medium',
        type: 'Fey (Goblinoid)',
        alignment: 'Chaotic Evil',
        habitat: 'Cave, Forest, Underdark',
        treasureTheme: 'Armaments',
        cr: 1,
        xp: 200,
        ac: 16,
        hp: 33,
        maxHp: 33,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(15, 14, 13, 8, 11, 9),
        saves: {},
        skills: { stealth: 6, survival: 2 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Massive, hairy goblinoid warlord of the Cragmaw Hideout who speaks of himself in the third person and crushes skulls with his spiked morningstar.',
        traits: [
            { name: 'Brute', description: 'A melee weapon deals one extra die of its damage when the bugbear hits with it (included in attack).' },
            { name: 'Surprise Attack', description: 'If the bugbear surprises a creature and hits it on the first round, the target takes an extra 2d6 (7) damage.' }
        ],
        actions: [
            {
                name: 'Brutal Morningstar',
                toHit: 4,
                damageDice: '2d8',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Melee Attack: +4 to hit, 2d8 + 2 Piercing damage.'
            },
            {
                name: 'Heavy Javelin',
                toHit: 4,
                damageDice: '2d6',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Ranged Attack (30/120 ft): +4 to hit, 2d6 + 2 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'ghoul',
        name: 'Ravenous Ghoul',
        icon: '🧟‍♂️',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Chaotic Evil',
        habitat: 'Crypt, Graveyard, Underdark',
        treasureTheme: 'Relics',
        cr: 1,
        xp: 200,
        ac: 12,
        hp: 22,
        maxHp: 22,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(13, 15, 10, 7, 10, 6),
        saves: {},
        skills: {},
        resistances: [],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Undead cannibals that haunt battlefields and forgotten crypts, their filthy claws coated with a necrotoxin that freezes living muscle.',
        traits: [
            { name: 'Carrion Stench', description: 'Tracks the scent of blood through sealed tomb doors.' }
        ],
        actions: [
            {
                name: 'Paralyzing Claws',
                toHit: 4,
                damageDice: '2d4',
                damageBonus: 2,
                damageType: 'slashing',
                saveDc: 10,
                saveAbility: 'constitution',
                condition: 'paralyzed',
                description: 'Melee Attack: +4 to hit, 2d4 + 2 Slashing damage. Target (non-Elf) must succeed on a DC 10 CON save or be Paralyzed for 1 round.'
            },
            {
                name: 'Ghoulish Bite',
                toHit: 2,
                damageDice: '2d6',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Melee Attack: +2 to hit, 2d6 + 2 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'giant-spider',
        name: 'Giant Web-Spider',
        icon: '🕷️',
        size: 'Large',
        type: 'Beast',
        alignment: 'Unaligned',
        habitat: 'Forest, Ruin, Underdark',
        treasureTheme: 'Implements',
        cr: 1,
        xp: 200,
        ac: 14,
        hp: 26,
        maxHp: 26,
        speed: '30 ft, Climb 30 ft',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(14, 16, 12, 2, 11, 4),
        saves: {},
        skills: { stealth: 7 },
        resistances: [],
        immunities: [],
        senses: 'Blindsight 10 ft, Darkvision 60 ft, Passive Perception 10',
        lore: 'Lurking in the rafters of ruined keeps and forest canopies, these eight-eyed horrors cocoon careless adventurers in silk before injecting lethal venom.',
        traits: [
            { name: 'Spider Climb & Web Sense', description: 'Climbs ceilings effortlessly and senses the exact location of anything touching its webs.' }
        ],
        actions: [
            {
                name: 'Venomous Fangs',
                toHit: 5,
                damageDice: '1d8+2d8',
                damageBonus: 3,
                damageType: 'poison',
                saveDc: 11,
                saveAbility: 'constitution',
                condition: 'poisoned',
                description: 'Melee Attack: +5 to hit, 1d8 + 3 Piercing damage plus 2d8 Poison damage (DC 11 CON save for half).'
            },
            {
                name: 'Sticky Web Shot',
                toHit: 5,
                damageDice: '1d4',
                damageBonus: 0,
                damageType: 'bludgeoning',
                saveDc: 12,
                saveAbility: 'strength',
                condition: 'restrained',
                recharge: 5,
                description: 'Ranged Attack (30/60 ft): +5 to hit; target is Restrained by thick webbing (DC 12 STR check to burst free).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'harpy',
        name: 'Cliffside Harpy',
        icon: '🦅',
        size: 'Medium',
        type: 'Monstrosity',
        alignment: 'Chaotic Evil',
        habitat: 'Coastal, Mountain',
        treasureTheme: 'Relics',
        cr: 1,
        xp: 200,
        ac: 11,
        hp: 38,
        maxHp: 38,
        speed: '20 ft, Fly 40 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(12, 13, 12, 7, 10, 14),
        saves: {},
        skills: { performance: 4 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 10',
        lore: 'Vulture-winged predators whose hauntingly sweet melodies lure sailors and mountaineers off jagged cliffs to their doom.',
        traits: [
            { name: 'Siren of the Crags', description: 'Nests among bone-strewn sea cliffs where charmed victims plummet.' }
        ],
        actions: [
            {
                name: 'Talons & Bone Club',
                toHit: 3,
                damageDice: '2d4+1d4',
                damageBonus: 1,
                damageType: 'slashing',
                description: 'Multiattack: Strikes with razor talons (2d4+1) and bone club (1d4+1).'
            },
            {
                name: 'Luring Song',
                toHit: 0,
                damageDice: '1d6',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 11,
                saveAbility: 'wisdom',
                condition: 'charmed',
                isAoE: true,
                description: 'Every humanoid within 300 ft must succeed on a DC 11 WIS save or be Charmed and incapacitatingly drawn toward the harpy.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'specter',
        name: 'Wailing Specter',
        icon: '👻',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Chaotic Evil',
        habitat: 'Haunted Manor, Crypt, Ruin',
        treasureTheme: 'Relics',
        cr: 1,
        xp: 200,
        ac: 12,
        hp: 22,
        maxHp: 22,
        speed: '0 ft, Fly 50 ft (hover)',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(1, 14, 11, 10, 10, 11),
        saves: {},
        skills: {},
        resistances: ['acid', 'cold', 'fire', 'lightning', 'thunder'],
        immunities: ['necrotic', 'poison'],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Wrathful, unfettered spirits prevented from passing to the afterlife by tragedy or betrayal, hungering to drain the warmth of the living.',
        traits: [
            { name: 'Incorporeal Movement', description: 'Can move through walls, doors, and solid stone as if they were difficult terrain.' }
        ],
        actions: [
            {
                name: 'Life Drain Touch',
                toHit: 4,
                damageDice: '3d6',
                damageBonus: 0,
                damageType: 'necrotic',
                saveDc: 10,
                saveAbility: 'constitution',
                description: 'Melee Spell Attack: +4 to hit, 3d6 Necrotic damage. Target must make a DC 10 CON save or have its Max HP reduced.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'animated-armor',
        name: 'Animated Plate Guardian',
        icon: '🏰',
        size: 'Medium',
        type: 'Construct',
        alignment: 'Unaligned',
        habitat: 'Manor, Tower, Temple',
        treasureTheme: 'Armaments',
        cr: 1,
        xp: 200,
        ac: 18,
        hp: 33,
        maxHp: 33,
        speed: '25 ft',
        initiativeMod: 0,
        initiativeStatic: 10,
        abilities: makeAbilities(14, 11, 13, 1, 3, 1),
        saves: {},
        skills: {},
        resistances: [],
        immunities: ['poison', 'psychic'],
        senses: 'Blindsight 60 ft (blind beyond this radius), Passive Perception 6',
        lore: 'Suits of empty steel plate bound with guardian runes that stand motionless in manor hallways until an intruder steps past without speaking the password.',
        traits: [
            { name: 'False Appearance', description: 'While motionless, the armor is indistinguishable from a normal suit of plate mail.' },
            { name: 'Antimagic Susceptibility', description: 'Incapacitated for 1 round if targeted by Dispel Magic.' }
        ],
        actions: [
            {
                name: 'Multiattack Iron Gauntlets',
                toHit: 4,
                damageDice: '2d6',
                damageBonus: 2,
                damageType: 'bludgeoning',
                description: 'Makes two crushing gauntlet slams (+4 to hit, 1d6 + 2 Bludgeoning each).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'dire-wolf',
        name: 'Dire Wolf Alpha',
        icon: '🐺',
        size: 'Large',
        type: 'Beast',
        alignment: 'Unaligned',
        habitat: 'Forest, Hill, Mountain',
        treasureTheme: 'None',
        cr: 1,
        xp: 200,
        ac: 14,
        hp: 37,
        maxHp: 37,
        speed: '50 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(17, 15, 15, 3, 12, 7),
        saves: {},
        skills: { perception: 3, stealth: 4 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 13',
        lore: 'Horse-sized prehistoric wolves with bone-crushing jaws that prowl the northern pines and serve as mounts for goblin warlords.',
        traits: [
            { name: 'Pack Tactics', description: 'Advantage on attack rolls when a pack ally is within 5 feet of the target.' }
        ],
        actions: [
            {
                name: 'Crushing Jaws',
                toHit: 5,
                damageDice: '2d6',
                damageBonus: 3,
                damageType: 'piercing',
                saveDc: 13,
                saveAbility: 'strength',
                condition: 'prone',
                description: 'Melee Attack: +5 to hit, 2d6 + 3 Piercing damage. Target must pass a DC 13 STR save or be knocked Prone.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },

    // =========================================================================
    // MID TIER (CR 2 – CR 4)
    // =========================================================================
    {
        id: 'mimic',
        name: 'Ravenous Treasure Mimic',
        icon: '📦',
        size: 'Medium',
        type: 'Monstrosity (Shapechanger)',
        alignment: 'Neutral',
        habitat: 'Dungeon, Underdark, Manor',
        treasureTheme: 'Implements',
        cr: 2,
        xp: 450,
        ac: 12,
        hp: 58,
        maxHp: 58,
        speed: '15 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(17, 12, 15, 5, 13, 8),
        saves: {},
        skills: { stealth: 5 },
        resistances: [],
        immunities: ['acid'],
        senses: 'Darkvision 60 ft, Passive Perception 11',
        lore: 'Amorphous dungeon predators that imitate iron-bound treasure chests or heavy oak doors, snapping open with rows of fangs and a sticky purple tongue.',
        traits: [
            { name: 'Adhesive (Object Form)', description: 'Anything that touches the mimic adheres to it and is Grappled (escape DC 13).' },
            { name: 'Grappler', description: 'The mimic has Advantage on attack rolls against any creature Grappled by it.' }
        ],
        actions: [
            {
                name: 'Adhesive Pseudopod',
                toHit: 5,
                damageDice: '1d8',
                damageBonus: 3,
                damageType: 'bludgeoning',
                condition: 'restrained',
                description: 'Melee Attack: +5 to hit, 1d8 + 3 Bludgeoning damage and latches onto the target.'
            },
            {
                name: 'Acidic Maw Bite',
                toHit: 5,
                damageDice: '1d8+1d8',
                damageBonus: 3,
                damageType: 'acid',
                description: 'Melee Attack: +5 to hit, 1d8 + 3 Piercing plus 1d8 Acid damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'gelatinous-cube',
        name: 'Gelatinous Cube',
        icon: '🟩',
        size: 'Large',
        type: 'Ooze',
        alignment: 'Unaligned',
        habitat: 'Dungeon, Underdark',
        treasureTheme: 'Armaments',
        cr: 2,
        xp: 450,
        ac: 6,
        hp: 84,
        maxHp: 84,
        speed: '15 ft',
        initiativeMod: -4,
        initiativeStatic: 6,
        abilities: makeAbilities(14, 3, 20, 1, 6, 1),
        saves: {},
        skills: {},
        resistances: [],
        immunities: ['acid'],
        senses: 'Blindsight 60 ft, Passive Perception 8',
        lore: 'Ten-foot cubes of transparent, digestive protoplasm that silently sweep dungeon corridors clean of flesh, leaving only polished bones and magic steel suspended inside.',
        traits: [
            { name: 'Transparent', description: 'Requires a DC 15 Perception check to spot before walking straight into it!' },
            { name: 'Ooze Cube', description: 'Fills an entire 10-by-10-foot dungeon passage.' }
        ],
        actions: [
            {
                name: 'Engulf',
                toHit: 4,
                damageDice: '6d6',
                damageBonus: 0,
                damageType: 'acid',
                saveDc: 12,
                saveAbility: 'dexterity',
                condition: 'restrained',
                description: 'Moves into a creature’s space: DC 12 DEX save or be engulfed (Restrained, suffocating, and taking 6d6 Acid damage!).'
            },
            {
                name: 'Caustic Pseudopod',
                toHit: 4,
                damageDice: '3d6',
                damageBonus: 0,
                damageType: 'acid',
                description: 'Melee Attack: +4 to hit, 3d6 Acid damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'gargoyle',
        name: 'Stone Gargoyle',
        icon: '🗿',
        size: 'Medium',
        type: 'Elemental',
        alignment: 'Chaotic Evil',
        habitat: 'Urban, Manor, Ruin',
        treasureTheme: 'Relics',
        cr: 2,
        xp: 450,
        ac: 15,
        hp: 52,
        maxHp: 52,
        speed: '30 ft, Fly 60 ft',
        initiativeMod: 0,
        initiativeStatic: 10,
        abilities: makeAbilities(15, 11, 16, 6, 11, 7),
        saves: {},
        skills: {},
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Fiendish elemental spirits bound into grotesque winged statues that perch atop Gothic parapets for decades waiting to dive upon trespassers.',
        traits: [
            { name: 'False Appearance', description: 'While motionless, indistinguishable from an inanimate stone statue.' }
        ],
        actions: [
            {
                name: 'Multiattack: Granite Bite & Claws',
                toHit: 4,
                damageDice: '2d6',
                damageBonus: 2,
                damageType: 'slashing',
                description: 'Makes two attacks: one with its jagged bite and one with its stone claws (+4 to hit, 2d6 + 2 Slashing).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'cult-fanatic',
        name: 'Dragon Cult Fanatic',
        icon: '🔮',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Neutral Evil',
        habitat: 'Temple, Urban, Ruin',
        treasureTheme: 'Relics',
        cr: 2,
        xp: 450,
        ac: 13,
        hp: 33,
        maxHp: 33,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(11, 14, 12, 10, 13, 14),
        saves: { wisdom: 3 },
        skills: { deception: 4, persuasion: 4, religion: 2 },
        resistances: [],
        immunities: [],
        senses: 'Passive Perception 11',
        lore: 'High priests of forbidden cults who wield dark clerical magic, Hold Person, and Spiritual Weapons to sacrifice captives on blood-stained altars.',
        traits: [
            { name: 'Dark Devotion', description: 'Advantage on saving throws against being Charmed or Frightened.' }
        ],
        actions: [
            {
                name: 'Inflict Wounds',
                toHit: 4,
                damageDice: '3d10',
                damageBonus: 0,
                damageType: 'necrotic',
                description: 'Melee Spell Attack: +4 to hit, 3d10 Necrotic damage.'
            },
            {
                name: 'Hold Person Hex',
                toHit: 0,
                damageDice: '1d6',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 11,
                saveAbility: 'wisdom',
                condition: 'paralyzed',
                description: 'Target must pass a DC 11 WIS save or be Paralyzed in dark chains.'
            }
        ],
        bonusActions: [
            { name: 'Spiritual Dagger', description: 'Strikes with a floating spectral blade (+4 to hit, 1d8 + 2 Force).' }
        ],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'ogre',
        name: 'Hill Ogre Brute',
        icon: '👹',
        size: 'Large',
        type: 'Giant',
        alignment: 'Chaotic Evil',
        habitat: 'Hill, Mountain, Swamp',
        treasureTheme: 'Armaments',
        cr: 2,
        xp: 450,
        ac: 11,
        hp: 59,
        maxHp: 59,
        speed: '40 ft',
        initiativeMod: -1,
        initiativeStatic: 9,
        abilities: makeAbilities(19, 8, 16, 5, 7, 7),
        saves: {},
        skills: {},
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 8',
        lore: 'Ten-foot-tall hulks of muscle and foul temper who uproot tree trunks as clubs and hire themselves out to orc warbands for fresh meat and shiny gold.',
        traits: [
            { name: 'Siege Brute', description: 'Smashes through wooden doors and barricades in a single swing.' }
        ],
        actions: [
            {
                name: 'Uprooted Greatclub',
                toHit: 6,
                damageDice: '2d8',
                damageBonus: 4,
                damageType: 'bludgeoning',
                description: 'Melee Attack: +6 to hit, reach 5 ft, 2d8 + 4 Bludgeoning damage.'
            },
            {
                name: 'Tree-Trunk Javelin',
                toHit: 6,
                damageDice: '2d6',
                damageBonus: 4,
                damageType: 'piercing',
                description: 'Ranged Attack (30/120 ft): +6 to hit, 2d6 + 4 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'nothic',
        name: 'Crevasse Nothic',
        icon: '👁️',
        size: 'Medium',
        type: 'Aberration',
        alignment: 'Neutral Evil',
        habitat: 'Underdark, Dungeon, Ruin',
        treasureTheme: 'Arcana',
        cr: 2,
        xp: 450,
        ac: 15,
        hp: 45,
        maxHp: 45,
        speed: '30 ft',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(14, 16, 16, 13, 10, 8),
        saves: {},
        skills: { arcana: 3, insight: 4, perception: 2, stealth: 5 },
        resistances: [],
        immunities: [],
        senses: 'Truesight 120 ft, Passive Perception 12',
        lore: 'Wizards warped by forbidden Vecna curses into hunched, one-eyed aberrations that whisper telepathic secrets into adventurers’ minds while rotting their flesh.',
        traits: [
            { name: 'Weird Insight', description: 'Contests Deception with Insight to magically rip a dark secret from your mind.' }
        ],
        actions: [
            {
                name: 'Rotting Gaze',
                toHit: 0,
                damageDice: '3d6',
                damageBonus: 0,
                damageType: 'necrotic',
                saveDc: 12,
                saveAbility: 'constitution',
                description: 'Targets one creature within 30 ft: DC 12 CON save or take 3d6 Necrotic damage as flesh withers.'
            },
            {
                name: 'Multiattack Claws',
                toHit: 4,
                damageDice: '2d6',
                damageBonus: 3,
                damageType: 'slashing',
                description: 'Makes two frantic claw slashes (+4 to hit, 2d6 + 3 Slashing).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'ghast',
        name: 'Crypt Ghast Lord',
        icon: '🧟',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Chaotic Evil',
        habitat: 'Crypt, Underdark, Swamp',
        treasureTheme: 'Relics',
        cr: 2,
        xp: 450,
        ac: 13,
        hp: 36,
        maxHp: 36,
        speed: '30 ft',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(16, 17, 10, 11, 10, 8),
        saves: {},
        skills: {},
        resistances: ['necrotic'],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Cunning undead pack-leaders infused with Abyssal gluttony whose nauseating stench chokes the living and whose claws paralyze even elves.',
        traits: [
            { name: 'Stench', description: 'Creatures starting their turn within 5 ft must pass a DC 10 CON save or be Poisoned.' },
            { name: 'Turning Defiance', description: 'The ghast and ghouls within 30 ft have Advantage on saves against Turn Undead.' }
        ],
        actions: [
            {
                name: 'Paralyzing Claws (Elves Included)',
                toHit: 5,
                damageDice: '2d6',
                damageBonus: 3,
                damageType: 'slashing',
                saveDc: 10,
                saveAbility: 'constitution',
                condition: 'paralyzed',
                description: 'Melee Attack: +5 to hit, 2d6 + 3 Slashing damage. Target must pass a DC 10 CON save or be Paralyzed.'
            },
            {
                name: 'Flesh-Rending Bite',
                toHit: 3,
                damageDice: '2d8',
                damageBonus: 3,
                damageType: 'piercing',
                description: 'Melee Attack: +3 to hit, 2d8 + 3 Piercing damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'owlbear',
        name: 'Ferocious Owlbear',
        icon: '🦉',
        size: 'Large',
        type: 'Monstrosity',
        alignment: 'Unaligned',
        habitat: 'Forest, Cave',
        treasureTheme: 'None',
        cr: 3,
        xp: 700,
        ac: 13,
        hp: 59,
        maxHp: 59,
        speed: '40 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(20, 12, 17, 3, 12, 7),
        saves: {},
        skills: { perception: 3 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 13',
        lore: 'A terrifying cross between a giant bear and a great horned owl created by a mad wizard; its screech echoes through the Cragmaw woods before it mauls anything in sight.',
        traits: [
            { name: 'Keen Sight and Smell', description: 'Advantage on Wisdom (Perception) checks that rely on sight or smell.' }
        ],
        actions: [
            {
                name: 'Multiattack: Beak & Claws',
                toHit: 7,
                damageDice: '1d10+2d8',
                damageBonus: 5,
                damageType: 'slashing',
                description: 'Tears with its hooked beak (1d10+5 Piercing) and crushes with massive claws (2d8+5 Slashing).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'displacer-beast',
        name: 'Displacer Beast',
        icon: '🐈‍⬛',
        size: 'Large',
        type: 'Monstrosity',
        alignment: 'Lawful Evil',
        habitat: 'Forest, Feywild',
        treasureTheme: 'Arcana',
        cr: 3,
        xp: 700,
        ac: 13,
        hp: 76,
        maxHp: 76,
        speed: '40 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(18, 15, 16, 6, 12, 8),
        saves: {},
        skills: { stealth: 6 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 11',
        lore: 'Six-legged black panthers from the Feywild with two barbed tentacles sprouting from their shoulders, bending light so they appear several feet from their true position.',
        traits: [
            { name: 'Displacement', description: 'Projects a magical illusion making attack rolls against it have Disadvantage until it is hit.' },
            { name: 'Avoidance', description: 'Takes no damage on a successful save against AoE spells, and only half damage on a failed save.' }
        ],
        actions: [
            {
                name: 'Multiattack Barbed Tentacles',
                toHit: 6,
                damageDice: '2d6+2d6',
                damageBonus: 4,
                damageType: 'bludgeoning',
                description: 'Lashes out with two spiked tentacles (reach 10 ft, +6 to hit, 1d6+4 Bludgeoning + 1d6 Piercing each).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'phase-spider',
        name: 'Ethereal Phase Spider',
        icon: '🕷️',
        size: 'Large',
        type: 'Monstrosity',
        alignment: 'Unaligned',
        habitat: 'Underdark, Forest, Planar',
        treasureTheme: 'Arcana',
        cr: 3,
        xp: 700,
        ac: 13,
        hp: 45,
        maxHp: 45,
        speed: '30 ft, Climb 30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(15, 15, 12, 6, 10, 6),
        saves: {},
        skills: { stealth: 6 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Blue-and-white arachnids that phase seamlessly into the Border Ethereal to materialize directly behind spellcasters, strike with lethal venom, and vanish again.',
        traits: [
            { name: 'Ethereal Jaunt', description: 'Can magically shift from the Material Plane to the Ethereal Plane and back as a Bonus Action.' }
        ],
        actions: [
            {
                name: 'Phase-Venom Bite',
                toHit: 4,
                damageDice: '1d10+4d8',
                damageBonus: 2,
                damageType: 'poison',
                saveDc: 11,
                saveAbility: 'constitution',
                condition: 'poisoned',
                description: 'Melee Attack: +4 to hit, 1d10 + 2 Piercing plus 4d8 Poison damage (DC 11 CON save for half).'
            }
        ],
        bonusActions: [
            { name: 'Ethereal Jaunt', description: 'Blinks in and out of the Ethereal Plane to ambush with Advantage.' }
        ],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'wight',
        name: 'Barrow Wight Commander',
        icon: '⚔️',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Neutral Evil',
        habitat: 'Crypt, Ruin, Shadowfell',
        treasureTheme: 'Armaments',
        cr: 3,
        xp: 700,
        ac: 14,
        hp: 58,
        maxHp: 58,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(15, 14, 16, 10, 13, 15),
        saves: {},
        skills: { perception: 3, stealth: 4 },
        resistances: ['necrotic'],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 13',
        lore: 'Fallen warlords resurrected by dark oaths to Orcus, their eyes burning like white coals behind ancient barrow-mail as they drain the souls of the living to raise zombie legions.',
        traits: [
            { name: 'Sunlight Sensitivity', description: 'Disadvantage on attack rolls and sight checks in direct sunlight.' }
        ],
        actions: [
            {
                name: 'Life Drain & Longsword Multiattack',
                toHit: 4,
                damageDice: '1d6+1d8',
                damageBonus: 2,
                damageType: 'necrotic',
                saveDc: 13,
                saveAbility: 'constitution',
                description: 'Strikes with its Barrow Longsword (1d8+2 Slashing) and Life Drain Gauntlet (1d6+2 Necrotic, DC 13 CON save).'
            },
            {
                name: 'Shadow Longbow',
                toHit: 4,
                damageDice: '1d8',
                damageBonus: 2,
                damageType: 'piercing',
                description: 'Ranged Attack (150/600 ft): +4 to hit, 1d8 + 2 Piercing + 1d4 Necrotic.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'green-hag',
        name: 'Auntie Vilebough, Green Hag',
        icon: '🧙‍♀️',
        size: 'Medium',
        type: 'Fey',
        alignment: 'Neutral Evil',
        habitat: 'Forest, Swamp',
        treasureTheme: 'Arcana',
        cr: 3,
        xp: 700,
        ac: 17,
        hp: 82,
        maxHp: 82,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(18, 12, 16, 13, 14, 14),
        saves: {},
        skills: { arcana: 3, deception: 4, perception: 4, stealth: 3 },
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 14',
        lore: 'Withered fey witches who delight in corrupting the pure and striking twisted bargains in fetid swamps, masking their iron-hard claws behind illusory beauty.',
        traits: [
            { name: 'Illusory Appearance & Mimicry', description: 'Disguises herself as a harmless crone or maiden and mimics cries for help.' }
        ],
        actions: [
            {
                name: 'Iron-Hard Claws',
                toHit: 6,
                damageDice: '2d8',
                damageBonus: 4,
                damageType: 'slashing',
                description: 'Melee Attack: +6 to hit, 2d8 + 4 Slashing damage.'
            },
            {
                name: 'Vicious Mockery Hex',
                toHit: 0,
                damageDice: '2d4',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 12,
                saveAbility: 'wisdom',
                condition: 'frightened',
                description: 'Cackles a curse: DC 12 WIS save or take 2d4 Psychic damage and suffer Disadvantage on attacks.'
            }
        ],
        bonusActions: [
            { name: 'Invisible Passage', description: 'Magically turns Invisible until she attacks or casts a spell.' }
        ],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'black-spider',
        name: 'Nezznar the Black Spider (Doppelganger)',
        icon: '🕷️',
        size: 'Medium',
        type: 'Monstrosity (Shapechanger)',
        alignment: 'Neutral Evil',
        habitat: 'Underdark, Urban, Dungeon',
        treasureTheme: 'Arcana',
        cr: 3,
        xp: 700,
        ac: 14,
        hp: 66,
        maxHp: 66,
        speed: '30 ft',
        initiativeMod: 4,
        initiativeStatic: 14,
        abilities: makeAbilities(11, 18, 14, 14, 12, 14),
        saves: { intelligence: 4, wisdom: 3 },
        skills: { arcana: 5, deception: 6, insight: 3, stealth: 6 },
        resistances: [],
        immunities: ['charmed'],
        senses: 'Darkvision 60 ft, Passive Perception 11',
        lore: 'Mastermind of the Wave Echo Cave conspiracy and lord of the Spider Staff, assisted by shapechanging doppelganger infiltrators who read surface thoughts and strike from the shadows.',
        traits: [
            { name: 'Read Thoughts', description: 'Magically reads the surface thoughts of creatures within 60 ft, gaining Advantage on Insight and Deception.' },
            { name: 'Ambusher & Surprise Attack', description: 'Deals +3d6 bonus damage when striking with Advantage or surprise.' }
        ],
        actions: [
            {
                name: 'Spider Staff Venom Strike',
                toHit: 6,
                damageDice: '1d8+2d6',
                damageBonus: 4,
                damageType: 'poison',
                description: 'Melee Attack: +6 to hit, 1d8 + 4 Bludgeoning plus 2d6 Poison damage.'
            },
            {
                name: 'Web & Darkness Spell',
                toHit: 0,
                damageDice: '2d8',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 13,
                saveAbility: 'dexterity',
                condition: 'restrained',
                isAoE: true,
                description: 'Unleashes magical Spider Webs across the chamber (DC 13 DEX save or Restrained).'
            }
        ],
        bonusActions: [],
        reactions: [
            { name: 'Arcane Shield', description: 'Raises a shimmering web ward (+3 AC against one attack).' }
        ],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'hell-hound',
        name: 'Fiendish Hell Hound',
        icon: '🐕‍🦺',
        size: 'Medium',
        type: 'Fiend',
        alignment: 'Lawful Evil',
        habitat: 'Volcanic, Planar, Lair',
        treasureTheme: 'None',
        cr: 3,
        xp: 700,
        ac: 15,
        hp: 45,
        maxHp: 45,
        speed: '50 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(17, 12, 14, 6, 13, 6),
        saves: {},
        skills: { perception: 5 },
        resistances: [],
        immunities: ['fire'],
        senses: 'Darkvision 60 ft, Passive Perception 15',
        lore: 'Coal-black mastiffs from the Nine Hells whose eyes and jaws glow like molten lava, hunting in packs at the heels of fire giants and red dragons.',
        traits: [
            { name: 'Pack Tactics', description: 'Advantage on attack rolls when an ally is adjacent to the target.' }
        ],
        actions: [
            {
                name: 'Fire Breath (Recharge 5-6)',
                toHit: 0,
                damageDice: '6d6',
                damageBonus: 0,
                damageType: 'fire',
                saveDc: 12,
                saveAbility: 'dexterity',
                recharge: 5,
                isAoE: true,
                description: 'Exhales fire in a 15-ft cone: 6d6 Fire damage on a failed DC 12 DEX save (half on success).'
            },
            {
                name: 'Molten Jaws',
                toHit: 5,
                damageDice: '1d8+2d6',
                damageBonus: 3,
                damageType: 'fire',
                description: 'Melee Attack: +5 to hit, 1d8 + 3 Piercing plus 2d6 Fire damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'mummy',
        name: 'Ancient Tomb Mummy',
        icon: '🤕',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Lawful Evil',
        habitat: 'Temple, Desert, Crypt',
        treasureTheme: 'Relics',
        cr: 3,
        xp: 700,
        ac: 11,
        hp: 58,
        maxHp: 58,
        speed: '20 ft',
        initiativeMod: -1,
        initiativeStatic: 9,
        abilities: makeAbilities(16, 8, 15, 6, 10, 12),
        saves: { wisdom: 2 },
        skills: {},
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['necrotic', 'poison'],
        vulnerabilities: ['fire'],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Linen-wrapped temple guardians preserved through forbiddenembalming rituals; their glare freezes intruders in terror and their touch inflicts the dreadful curse of Mummy Rot.',
        traits: [
            { name: 'Dry Bandages', description: 'Vulnerable to Fire damage; Resistant to nonmagical weapon attacks.' }
        ],
        actions: [
            {
                name: 'Rotting Fist & Dreadful Glare',
                toHit: 5,
                damageDice: '2d6+3d6',
                damageBonus: 3,
                damageType: 'necrotic',
                saveDc: 12,
                saveAbility: 'constitution',
                condition: 'frightened',
                description: 'Strikes for 2d6+3 Bludgeoning + 3d6 Necrotic (Mummy Rot prevents healing on failed DC 12 CON save) and glares (DC 11 WIS save or Frightened).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'basilisk',
        name: 'Eight-Legged Basilisk',
        icon: '🦎',
        size: 'Medium',
        type: 'Monstrosity',
        alignment: 'Unaligned',
        habitat: 'Mountain, Underdark, Ruin',
        treasureTheme: 'Relics',
        cr: 3,
        xp: 700,
        ac: 15,
        hp: 52,
        maxHp: 52,
        speed: '20 ft',
        initiativeMod: -1,
        initiativeStatic: 9,
        abilities: makeAbilities(16, 8, 15, 2, 8, 7),
        saves: {},
        skills: {},
        resistances: [],
        immunities: [],
        senses: 'Darkvision 60 ft, Passive Perception 9',
        lore: 'Armored eight-legged reptiles whose lairs are decorated with suspiciously lifelike statues of previous adventurers who met their glowing pale-green eyes.',
        traits: [
            { name: 'Petrifying Gaze', description: 'Creatures meeting its gaze must pass a DC 12 CON save or begin turning to stone (Restrained).' }
        ],
        actions: [
            {
                name: 'Venomous Jaws & Petrifying Gaze',
                toHit: 5,
                damageDice: '2d6+2d6',
                damageBonus: 3,
                damageType: 'poison',
                saveDc: 12,
                saveAbility: 'constitution',
                condition: 'restrained',
                description: 'Melee Attack: +5 to hit, 2d6+3 Piercing + 2d6 Poison, plus DC 12 CON save against Petrifying Gaze.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'yuan-ti-malison',
        name: 'Yuan-ti Malison High Priest',
        icon: '🐍',
        size: 'Medium',
        type: 'Monstrosity',
        alignment: 'Neutral Evil',
        habitat: 'Jungle, Temple, Ruin',
        treasureTheme: 'Relics',
        cr: 3,
        xp: 700,
        ac: 12,
        hp: 66,
        maxHp: 66,
        speed: '30 ft',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(16, 14, 13, 14, 12, 16),
        saves: {},
        skills: { deception: 5, stealth: 4 },
        resistances: [],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 11',
        lore: 'Cold-blooded serpent-hybrids from the Jungle of Kha’zar with cobra heads and hypnotic voices, guarding the inner sanctums of the Sleeping God.',
        traits: [
            { name: 'Magic Resistance', description: 'Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Multiattack: Cobra Fangs & Scimitar',
                toHit: 5,
                damageDice: '1d6+2d6',
                damageBonus: 3,
                damageType: 'poison',
                description: 'Strikes twice with venom fangs or poison-coated scimitar (+5 to hit, 1d6+3 plus 2d6 Poison).'
            },
            {
                name: 'Serpentine Suggestion',
                toHit: 0,
                damageDice: '2d6',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 13,
                saveAbility: 'wisdom',
                condition: 'charmed',
                description: 'Hypnotic gaze forces a DC 13 WIS save or charms the target.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'banshee',
        name: 'Lady Agatha, Wailing Banshee',
        icon: '👻',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Chaotic Evil',
        habitat: 'Haunted Manor, Forest, Ruin',
        treasureTheme: 'Arcana',
        cr: 4,
        xp: 1100,
        ac: 12,
        hp: 58,
        maxHp: 58,
        speed: '0 ft, Fly 40 ft (hover)',
        initiativeMod: 2,
        initiativeStatic: 12,
        abilities: makeAbilities(1, 14, 10, 12, 11, 17),
        saves: { wisdom: 2, charisma: 5 },
        skills: {},
        resistances: ['acid', 'fire', 'lightning', 'thunder'],
        immunities: ['cold', 'necrotic', 'poison'],
        senses: 'Darkvision 60 ft, Passive Perception 10',
        lore: 'Luminous elven spirits cursed for their vanity in life; they hoardjeweled combs and mirrors in ruined groves, and their sorrowful Wail can stop a mortal’s heart instantly.',
        traits: [
            { name: 'Detect Life & Incorporeal', description: 'Magically senses living creatures within 5 miles and glides through solid walls.' }
        ],
        actions: [
            {
                name: 'Deathly Wail (1/Day)',
                toHit: 0,
                damageDice: '3d6',
                damageBonus: 3,
                damageType: 'psychic',
                saveDc: 13,
                saveAbility: 'constitution',
                condition: 'frightened',
                recharge: 6,
                isAoE: true,
                description: 'Releases a mournful wail: all creatures within 30 ft make a DC 13 CON save, taking 3d6+3 Psychic damage and becoming Frightened.'
            },
            {
                name: 'Corrupting Touch',
                toHit: 4,
                damageDice: '3d6',
                damageBonus: 2,
                damageType: 'necrotic',
                description: 'Melee Spell Attack: +4 to hit, 3d6 + 2 Necrotic damage.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'ghost',
        name: 'Lord Ravencrest’s Ghost',
        icon: '🕯️',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Neutral',
        habitat: 'Haunted Manor, Crypt',
        treasureTheme: 'Relics',
        cr: 4,
        xp: 1100,
        ac: 11,
        hp: 45,
        maxHp: 45,
        speed: '0 ft, Fly 40 ft (hover)',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(7, 13, 10, 10, 12, 17),
        saves: {},
        skills: {},
        resistances: ['acid', 'fire', 'lightning', 'thunder'],
        immunities: ['cold', 'necrotic', 'poison'],
        senses: 'Darkvision 60 ft, Passive Perception 11',
        lore: 'The restless phantom of Lord Victor Ravencrest bound to his Gothic manor Since All Hallows’ Eve fifty years ago, reliving his family’s betrayal until the truth is uncovered.',
        traits: [
            { name: 'Ethereal Sight & Incorporeal', description: 'Sees 60 ft into the Ethereal Plane and passes through walls.' }
        ],
        actions: [
            {
                name: 'Withering Touch',
                toHit: 5,
                damageDice: '4d6',
                damageBonus: 3,
                damageType: 'necrotic',
                description: 'Melee Spell Attack: +5 to hit, 4d6 + 3 Necrotic damage.'
            },
            {
                name: 'Horrifying Visage',
                toHit: 0,
                damageDice: '2d6',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 13,
                saveAbility: 'wisdom',
                condition: 'frightened',
                isAoE: true,
                description: 'Each living creature within 60 ft must succeed on a DC 13 WIS save or be Frightened for 1 minute.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'helmed-horror',
        name: 'Azlanti Helmed Horror',
        icon: '🛡️',
        size: 'Medium',
        type: 'Construct',
        alignment: 'Neutral',
        habitat: 'Temple, Ruin, Tower',
        treasureTheme: 'Armaments',
        cr: 4,
        xp: 1100,
        ac: 20,
        hp: 60,
        maxHp: 60,
        speed: '30 ft, Fly 30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(18, 13, 16, 10, 10, 10),
        saves: {},
        skills: { perception: 4 },
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['force', 'necrotic', 'poison'],
        senses: 'Blindsight 60 ft, Passive Perception 14',
        lore: 'Intelligent suits of floating, rune-carved plate mail engineered by the lost Azlanti civilization, completely immune to Fireball and Magic Missile.',
        traits: [
            { name: 'Magic Resistance & Spell Immunity', description: 'Advantage on saves vs spells, and completely immune to Fireball, Heat Metal, and Lightning Bolt.' }
        ],
        actions: [
            {
                name: 'Multiattack Runed Longsword',
                toHit: 6,
                damageDice: '2d8',
                damageBonus: 4,
                damageType: 'slashing',
                description: 'Makes two relentless flying longsword strikes (+6 to hit, 1d8 + 4 Slashing + 1d4 Force each).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },

    // =========================================================================
    // HIGH / BOSS TIER (CR 5 – CR 13+)
    // =========================================================================
    {
        id: 'troll',
        name: 'Regenerating Cave Troll',
        icon: '🧌',
        size: 'Large',
        type: 'Giant',
        alignment: 'Chaotic Evil',
        habitat: 'Forest, Swamp, Underdark, Mountain',
        treasureTheme: 'Armaments',
        cr: 5,
        xp: 1800,
        ac: 15,
        hp: 84,
        maxHp: 84,
        speed: '30 ft',
        initiativeMod: 1,
        initiativeStatic: 11,
        abilities: makeAbilities(18, 13, 20, 7, 9, 7),
        saves: {},
        skills: { perception: 2 },
        resistances: [],
        immunities: [],
        vulnerabilities: ['fire', 'acid'],
        senses: 'Darkvision 60 ft, Passive Perception 12',
        lore: 'Lanky, green-skinned giants with insatiable appetites whose severed limbs knit back together in seconds unless cauterized by fire or acid.',
        traits: [
            { name: 'Regeneration (10 HP/Turn)', description: 'The troll regains 10 Hit Points at the start of its turn unless it took Acid or Fire damage!' }
        ],
        actions: [
            {
                name: 'Multiattack: Bite & Two Claws',
                toHit: 7,
                damageDice: '1d6+4d6',
                damageBonus: 4,
                damageType: 'slashing',
                description: 'Rends with a bite (1d6+4) and two savage claw attacks (2d6+4 each).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'wraith',
        name: 'Mormesk the Undead Wraith',
        icon: '💀',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Neutral Evil',
        habitat: 'Crypt, Dungeon, Shadowfell',
        treasureTheme: 'Arcana',
        cr: 5,
        xp: 1800,
        ac: 13,
        hp: 67,
        maxHp: 67,
        speed: '0 ft, Fly 60 ft (hover)',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(6, 16, 16, 12, 14, 15),
        saves: {},
        skills: {},
        resistances: ['acid', 'cold', 'fire', 'lightning', 'thunder'],
        immunities: ['necrotic', 'poison'],
        senses: 'Darkvision 60 ft, Passive Perception 12',
        lore: 'A swirling void of malice wearing a spectral crown; Mormesk died defending the Forge of Spells centuries ago and now commands the undead of Wave Echo Cave.',
        traits: [
            { name: 'Incorporeal Movement & Create Specter', description: 'Glides through stone and raises fallen humanoids as bound Specters.' }
        ],
        actions: [
            {
                name: 'Soul-Withering Life Drain',
                toHit: 6,
                damageDice: '4d8',
                damageBonus: 3,
                damageType: 'necrotic',
                saveDc: 14,
                saveAbility: 'constitution',
                description: 'Melee Spell Attack: +6 to hit, 4d8 + 3 Necrotic damage (DC 14 CON save or Max HP reduced).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'vespera',
        name: 'Vespera, Guildmaster Assassin',
        icon: '🗡️',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Neutral Evil',
        habitat: 'Urban, Thieves Guild',
        treasureTheme: 'Implements',
        cr: 6,
        xp: 2300,
        ac: 16,
        hp: 78,
        maxHp: 78,
        speed: '30 ft',
        initiativeMod: 7,
        initiativeStatic: 17,
        abilities: makeAbilities(11, 18, 14, 14, 11, 14),
        saves: { dexterity: 7, intelligence: 5 },
        skills: { acrobatics: 7, deception: 5, perception: 3, stealth: 10 },
        resistances: ['poison'],
        immunities: [],
        senses: 'Passive Perception 13',
        lore: 'Shadow-stepped high executioner of the Blackhaven Thieves’ Guild and keeper of the Crimson Claw artifact, wielding twin wyvern-venom daggers.',
        traits: [
            { name: 'Assassinate & Sneak Attack (4d6)', description: 'Advantage against foes that have not acted yet, and deals +4d6 Sneak Attack damage.' },
            { name: 'Evasion & Uncanny Dodge', description: 'Halves incoming attack damage with a Reaction and dodges AoE blasts.' }
        ],
        actions: [
            {
                name: 'Wyvern-Venom Twin Shortswords',
                toHit: 7,
                damageDice: '2d6+3d6',
                damageBonus: 4,
                damageType: 'poison',
                saveDc: 15,
                saveAbility: 'constitution',
                condition: 'poisoned',
                description: 'Multiattack: Two rapid finesse strikes (+7 to hit, 1d6+4 Piercing plus 3d6 Poison on failed DC 15 CON save).'
            },
            {
                name: 'Poisoned Light Crossbow',
                toHit: 7,
                damageDice: '1d8+2d6',
                damageBonus: 4,
                damageType: 'poison',
                description: 'Ranged Attack: +7 to hit, 1d8+4 Piercing + 2d6 Poison.'
            }
        ],
        bonusActions: [
            { name: 'Cunning Smoke Bomb', description: 'Vanishes into shadows as a Bonus Action to gain Advantage.' }
        ],
        reactions: [
            { name: 'Uncanny Dodge', description: 'Halves the damage of an attack that hits her.' }
        ],
        legendaryActions: [
            { name: 'Shadow Step Slash', description: 'Teleports behind a spellcaster and delivers a quick dagger cut.' }
        ],
        lairEffects: []
    },
    {
        id: 'yuan-ti-abomination',
        name: 'Sseth’karr, Yuan-ti Abomination',
        icon: '🐍',
        size: 'Large',
        type: 'Monstrosity',
        alignment: 'Neutral Evil',
        habitat: 'Jungle, Temple',
        treasureTheme: 'Relics',
        cr: 7,
        xp: 2900,
        ac: 15,
        hp: 112,
        maxHp: 112,
        speed: '40 ft, Climb 30 ft',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(19, 16, 17, 17, 15, 18),
        saves: { wisdom: 5, charisma: 7 },
        skills: { perception: 5, stealth: 6 },
        resistances: [],
        immunities: ['poison'],
        senses: 'Darkvision 60 ft, Passive Perception 15',
        lore: 'Immense, wholly serpentine high wardens of the Temple of the Sleeping God in the Jungle of Kha’zar, crushing intruders in their coils before delivering a venomous bite.',
        traits: [
            { name: 'Magic Resistance', description: 'Advantage on saving throws against spells and magical effects.' }
        ],
        actions: [
            {
                name: 'Constricting Coils & Scimitar',
                toHit: 7,
                damageDice: '2d6+3d6',
                damageBonus: 4,
                damageType: 'bludgeoning',
                saveDc: 14,
                saveAbility: 'strength',
                condition: 'restrained',
                description: 'Multiattack: Wraps a target in crushing coils (2d6+4 Bludgeoning, Restrained DC 14) and bites with venom fangs (3d6 Poison).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [
            { name: 'Tail Sweep', description: 'Lashes its massive serpent tail to knock nearby heroes Prone.' }
        ],
        lairEffects: []
    },
    {
        id: 'mind-flayer',
        name: 'Illithid Mind Flayer',
        icon: '🦑',
        size: 'Medium',
        type: 'Aberration',
        alignment: 'Lawful Evil',
        habitat: 'Underdark, Planar',
        treasureTheme: 'Arcana',
        cr: 7,
        xp: 2900,
        ac: 15,
        hp: 71,
        maxHp: 71,
        speed: '30 ft, Fly 15 ft (hover)',
        initiativeMod: 4,
        initiativeStatic: 14,
        abilities: makeAbilities(11, 12, 12, 19, 17, 17),
        saves: { intelligence: 7, wisdom: 6, charisma: 6 },
        skills: { arcana: 7, deception: 6, insight: 6, perception: 6, stealth: 4 },
        resistances: ['psychic'],
        immunities: [],
        senses: 'Darkvision 120 ft, Telepathy 120 ft, Passive Perception 16',
        lore: 'Psionic tyrants from the deep Underdark with octopus-like heads and four writhing facial tentacles who stun entire parties with Mind Blasts and extract brains for sustenance.',
        traits: [
            { name: 'Magic Resistance', description: 'Advantage on saving throws against spells and magical effects.' }
        ],
        actions: [
            {
                name: 'Mind Blast (Recharge 5-6)',
                toHit: 0,
                damageDice: '4d8',
                damageBonus: 4,
                damageType: 'psychic',
                saveDc: 15,
                saveAbility: 'intelligence',
                condition: 'stunned',
                recharge: 5,
                isAoE: true,
                description: 'Emits psychic energy in a 60-ft cone. Creatures must succeed on a DC 15 INT save or take 4d8 + 4 Psychic damage and be Stunned!'
            },
            {
                name: 'Psionic Tentacles',
                toHit: 7,
                damageDice: '2d10',
                damageBonus: 4,
                damageType: 'psychic',
                saveDc: 15,
                saveAbility: 'intelligence',
                condition: 'stunned',
                description: 'Melee Attack: +7 to hit, 2d10 + 4 Psychic damage and grapples the skull.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'venomfang',
        name: 'Venomfang, Young Green Dragon',
        icon: '🐉',
        size: 'Large',
        type: 'Dragon',
        alignment: 'Lawful Evil',
        habitat: 'Forest, Ruin (Thundertree)',
        treasureTheme: 'Arcana',
        cr: 8,
        xp: 3900,
        ac: 18,
        hp: 136,
        maxHp: 136,
        speed: '40 ft, Fly 80 ft, Swim 40 ft',
        initiativeMod: 4,
        initiativeStatic: 14,
        abilities: makeAbilities(19, 12, 17, 16, 13, 15),
        saves: { dexterity: 4, constitution: 6, wisdom: 4, charisma: 5 },
        skills: { deception: 5, insight: 4, perception: 7, persuasion: 5, stealth: 4 },
        resistances: [],
        immunities: ['poison'],
        senses: 'Blindsight 30 ft, Darkvision 120 ft, Passive Perception 17',
        lore: 'A cunning, silver-tongued Young Green Dragon who has claimed the ruined wizard tower of Thundertree as his lair, delighting in playing heroes against cultists before unleashing a cloud of chlorine gas.',
        traits: [
            { name: 'Amphibious & Deceitful', description: 'Breathes air and water; attempts to flatter and manipulate adventurers before striking.' }
        ],
        actions: [
            {
                name: 'Poison Breath (Recharge 5-6)',
                toHit: 0,
                damageDice: '10d6',
                damageBonus: 0,
                damageType: 'poison',
                saveDc: 14,
                saveAbility: 'constitution',
                condition: 'poisoned',
                recharge: 5,
                isAoE: true,
                description: 'Exhales poisonous gas in a 30-ft cone: 10d6 Poison damage on a failed DC 14 CON save (half on success).'
            },
            {
                name: 'Multiattack: Rend & Venom Jaws',
                toHit: 7,
                damageDice: '2d10+2d6',
                damageBonus: 4,
                damageType: 'slashing',
                description: 'Strikes three times with Bite (2d10+4 Piercing + 2d6 Poison) and two Claws (2d6+4 Slashing).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [
            { name: 'Wing Buffet', description: 'Beats his emerald wings, buffeting nearby heroes and repositioning 40 ft.' }
        ],
        lairEffects: [
            'Thorny brambles erupt around the ruined tower floor, grasping at boots.'
        ]
    },
    {
        id: 'stone-golem',
        name: 'Azlanti Stone Golem',
        icon: '🗿',
        size: 'Large',
        type: 'Construct',
        alignment: 'Unaligned',
        habitat: 'Temple, Ruin',
        treasureTheme: 'Relics',
        cr: 10,
        xp: 5900,
        ac: 17,
        hp: 148,
        maxHp: 148,
        speed: '30 ft',
        initiativeMod: -1,
        initiativeStatic: 9,
        abilities: makeAbilities(22, 9, 20, 3, 11, 1),
        saves: {},
        skills: {},
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['poison', 'psychic'],
        senses: 'Darkvision 120 ft, Passive Perception 10',
        lore: 'Carved from solid temple basalt and inscribed with Azlanti time-runes, this towering sentinel can warp time around intruders while pulverizing stone pillars with its fists.',
        traits: [
            { name: 'Immutable Form & Magic Resistance', description: 'Immune to any spell or effect that would alter its form; Advantage on saves against spells.' }
        ],
        actions: [
            {
                name: 'Multiattack Basalt Slams',
                toHit: 10,
                damageDice: '3d8',
                damageBonus: 6,
                damageType: 'bludgeoning',
                description: 'Makes two earth-shaking stone fist slams (+10 to hit, 3d8 + 6 Bludgeoning).'
            },
            {
                name: 'Time-Warp Slow (Recharge 5-6)',
                toHit: 0,
                damageDice: '2d8',
                damageBonus: 0,
                damageType: 'force',
                saveDc: 17,
                saveAbility: 'wisdom',
                condition: 'slowed',
                recharge: 5,
                isAoE: true,
                description: 'Targets creatures within 10 ft: DC 17 WIS save or speed is halved, -2 AC, and cannot use Reactions.'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [],
        lairEffects: []
    },
    {
        id: 'vampire-spawn',
        name: 'Countess Carmilla, Vampire Lord',
        icon: '🧛',
        size: 'Medium',
        type: 'Undead',
        alignment: 'Lawful Evil',
        habitat: 'Haunted Manor, Crypt, Urban',
        treasureTheme: 'Relics',
        cr: 8,
        xp: 3900,
        ac: 16,
        hp: 112,
        maxHp: 112,
        speed: '30 ft, Climb 30 ft',
        initiativeMod: 6,
        initiativeStatic: 16,
        abilities: makeAbilities(18, 18, 18, 15, 15, 18),
        saves: { dexterity: 7, wisdom: 5, charisma: 7 },
        skills: { perception: 5, stealth: 7, persuasion: 7 },
        resistances: ['necrotic', 'bludgeoning', 'piercing', 'slashing'],
        immunities: [],
        vulnerabilities: ['radiant'],
        senses: 'Darkvision 60 ft, Passive Perception 15',
        lore: 'Aristocratic nocturnal predator who stalks Gothic manors and moonlit ballrooms, regenerating wounds until struck by Radiant light or holy water.',
        traits: [
            { name: 'Regeneration (10 HP/Turn)', description: 'Regains 10 HP at the start of its turn unless it took Radiant damage or Holy Water.' },
            { name: 'Spider Climb & Misty Escape', description: 'Walks up manor walls and dissolves into mist at 0 HP unless finished by sunlight/radiance.' }
        ],
        actions: [
            {
                name: 'Sanguine Bite & Claws',
                toHit: 7,
                damageDice: '2d4+3d6',
                damageBonus: 4,
                damageType: 'necrotic',
                description: 'Grapples with claws (2d4+4 Slashing) and drains blood (3d6 Necrotic, healing the vampire for the same amount!).'
            },
            {
                name: 'Vampiric Charm Gaze',
                toHit: 0,
                damageDice: '2d6',
                damageBonus: 0,
                damageType: 'psychic',
                saveDc: 15,
                saveAbility: 'wisdom',
                condition: 'charmed',
                description: 'Beguiles a target within 30 ft (DC 15 WIS save or Charmed).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [
            { name: 'Bat Swarm Step', description: 'Dissolves into a cloud of bats and darts 30 ft without Opportunity Attacks.' }
        ],
        lairEffects: []
    },
    {
        id: 'voranthos',
        name: 'Voranthos, Red Dragon of the Spine',
        icon: '🐲',
        size: 'Large',
        type: 'Dragon',
        alignment: 'Chaotic Evil',
        habitat: 'Mountain, Volcanic Lair',
        treasureTheme: 'Armaments',
        cr: 10,
        xp: 5900,
        ac: 18,
        hp: 178,
        maxHp: 178,
        speed: '40 ft, Climb 40 ft, Fly 80 ft',
        initiativeMod: 4,
        initiativeStatic: 14,
        abilities: makeAbilities(23, 10, 21, 14, 11, 19),
        saves: { dexterity: 4, constitution: 9, wisdom: 4, charisma: 8 },
        skills: { perception: 8, stealth: 4, intimidation: 8 },
        resistances: [],
        immunities: ['fire'],
        senses: 'Blindsight 30 ft, Darkvision 120 ft, Passive Perception 18',
        lore: 'The tyrant of the Dragonspine Mountains whose sulfur-choked cavern glitters with centuries of stolen royal tribute, and whose inferno breath has reduced Ashford to cinders.',
        traits: [
            { name: 'Legendary Resistance (2/Day)', description: 'If Voranthos fails a saving throw, he can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Cataclysmic Fire Breath (Recharge 5-6)',
                toHit: 0,
                damageDice: '12d6',
                damageBonus: 0,
                damageType: 'fire',
                saveDc: 17,
                saveAbility: 'dexterity',
                recharge: 5,
                isAoE: true,
                description: 'Exhales a torrent of dragonfire in a 30-ft cone: 12d6 Fire damage on a failed DC 17 DEX save (half on a success).'
            },
            {
                name: 'Multiattack: Searing Jaws & Claws',
                toHit: 10,
                damageDice: '2d10+2d6',
                damageBonus: 6,
                damageType: 'fire',
                description: 'Rends with his molten jaws (+10 to hit, 2d10+6 Piercing + 1d6 Fire) and two crushing claws (2d6+6 Slashing).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [
            { name: 'Tail Smash', description: 'Whips his spiked tail (+10 to hit, 2d8+6 Bludgeoning).' },
            { name: 'Roar of the Dragonspine', description: 'Shakes the volcanic cavern with a terrifying roar.' }
        ],
        lairEffects: [
            'Magma vents erupt across the cavern floor, sending geysers of sparks into the air.'
        ]
    },
    {
        id: 'beholder',
        name: 'Xanathar-Kin Eye Tyrant (Beholder)',
        icon: '👁️',
        size: 'Large',
        type: 'Aberration',
        alignment: 'Lawful Evil',
        habitat: 'Underdark, Lair',
        treasureTheme: 'Arcana',
        cr: 13,
        xp: 10000,
        ac: 18,
        hp: 180,
        maxHp: 180,
        speed: '0 ft, Fly 20 ft (hover)',
        initiativeMod: 4,
        initiativeStatic: 14,
        abilities: makeAbilities(10, 14, 18, 17, 15, 17),
        saves: { intelligence: 8, wisdom: 7, charisma: 8 },
        skills: { perception: 12 },
        resistances: [],
        immunities: ['prone'],
        senses: 'Darkvision 120 ft, Passive Perception 22',
        lore: 'Floating spheres of paranoid alien genius with a central Antimagic Cone eye and ten writhing eyestalks that fire Disintegration, Paralyzing, and Telekinetic rays.',
        traits: [
            { name: 'Antimagic Cone', description: 'The beholder’s central eye projects a 150-ft cone of antimagic.' },
            { name: 'Legendary Resistance (3/Day)', description: 'Can choose to succeed on a failed saving throw 3 times per day.' }
        ],
        actions: [
            {
                name: 'Eye Rays (3 Random Beams)',
                toHit: 0,
                damageDice: '8d8',
                damageBonus: 0,
                damageType: 'force',
                saveDc: 16,
                saveAbility: 'dexterity',
                condition: 'paralyzed',
                isAoE: true,
                description: 'Fires three magical eye rays at random (Paralyzing Ray, Fear Ray, Enervation Ray, or Disintegration Ray — DC 16 save).'
            }
        ],
        bonusActions: [],
        reactions: [],
        legendaryActions: [
            { name: 'Bonus Eye Ray', description: 'Fires one random eye ray at the end of a hero’s turn.' }
        ],
        lairEffects: [
            'Slimy walls sprout spectral eyes that glare at intruders.'
        ]
    },
    {
        id: 'lich',
        name: 'Archlich Malakor the Undying',
        icon: '🧙‍♂️',
        size: 'Medium',
        type: 'Undead (Wizard)',
        alignment: 'Neutral Evil',
        habitat: 'Crypt, Tower, Planar',
        treasureTheme: 'Arcana',
        cr: 15,
        xp: 13000,
        ac: 17,
        hp: 165,
        maxHp: 165,
        speed: '30 ft',
        initiativeMod: 3,
        initiativeStatic: 13,
        abilities: makeAbilities(11, 16, 16, 20, 14, 16),
        saves: { constitution: 8, intelligence: 10, wisdom: 7 },
        skills: { arcana: 15, history: 10, insight: 7, perception: 7 },
        resistances: ['cold', 'lightning', 'necrotic'],
        immunities: ['poison'],
        senses: 'Truesight 120 ft, Passive Perception 17',
        lore: 'An ancient archmage who bound his soul to a runed phylactery to transcend mortality, commanding 9th-level necromancy and Paralyzing Touch from his obsidian throne.',
        traits: [
            { name: 'Legendary Resistance (3/Day) & Rejuvenation', description: 'Shrugs off failed saves and reforms near its phylactery unless the vessel is destroyed.' }
        ],
        actions: [
            {
                name: 'Arcane Cataclysm & Paralyzing Touch',
                toHit: 10,
                damageDice: '8d6',
                damageBonus: 5,
                damageType: 'necrotic',
                saveDc: 18,
                saveAbility: 'constitution',
                condition: 'paralyzed',
                isAoE: true,
                description: 'Unleashes Necrotic Fireball (8d6) or Paralyzing Touch (+10 to hit, 3d6 Cold and DC 18 CON save or Paralyzed).'
            }
        ],
        bonusActions: [],
        reactions: [
            { name: 'Counterspell & Shield', description: 'Reacts with arcane wards (+5 AC) or counters incoming magic.' }
        ],
        legendaryActions: [
            { name: 'Disrupt Life (AoE)', description: 'Pulses necrotic energy within 20 ft (DC 18 CON save or 4d6 Necrotic).' }
        ],
        lairEffects: [
            'Spirits of the damned howl through the sanctum, tugging at spellcasters.'
        ]
    }
];

const MONSTER_ALIASES = {
    bugbear: 'klarg',
    doppelganger: 'black-spider',
    assassin: 'vespera',
    'young-green-dragon': 'venomfang',
    'young-red-dragon': 'voranthos',
    dragon: 'voranthos'
};

export const getMonsterById = (id) => {
    if (!id) return null;
    const normalized = String(id).toLowerCase().trim();
    const mappedId = MONSTER_ALIASES[normalized] || normalized;
    return (
        monsters.find(m => m.id === mappedId) ||
        monsters.find(m => m.name.toLowerCase().includes(normalized)) ||
        null
    );
};

export const getMonstersByCr = (minCr = 0, maxCr = 30) =>
    monsters.filter(m => m.cr >= minCr && m.cr <= maxCr);

export const getMonstersByHabitat = (habitat) => {
    if (!habitat) return monsters;
    const q = habitat.toLowerCase();
    return monsters.filter(m => m.habitat.toLowerCase().includes(q));
};

/**
 * Create a live combat instance of a monster with unique instanceId and full HP
 */
export const createMonsterInstance = (monsterId, customName = null, index = null) => {
    const template = getMonsterById(monsterId) || monsters[6]; // default to goblin
    const displayName = customName || (index !== null ? `${template.name} #${index}` : template.name);
    return {
        ...template,
        instanceId: `${template.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: displayName,
        hp: template.maxHp,
        maxHp: template.maxHp,
        conditions: [],
        isAlive: true
    };
};
