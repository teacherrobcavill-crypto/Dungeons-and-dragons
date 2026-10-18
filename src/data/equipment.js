// D&D 5e PHB Weapons, Armor, Adventuring Gear & DMG 2024 Magic Items

export const weapons = [
    {
        id: 'longsword',
        name: 'Longsword',
        category: 'weapon',
        weaponType: 'martial-melee',
        damageDice: '1d8',
        versatileDice: '1d10',
        damageType: 'slashing',
        properties: ['versatile'],
        mastery: 'Sap (Target has Disadvantage on next attack)',
        costGp: 15,
        icon: '⚔️',
        description: 'Versatile knightly blade (1d8 Slashing one-handed, 1d10 two-handed).'
    },
    {
        id: 'greatsword',
        name: 'Greatsword',
        category: 'weapon',
        weaponType: 'martial-melee',
        damageDice: '2d6',
        damageType: 'slashing',
        properties: ['heavy', 'two-handed'],
        mastery: 'Graze (Deal ability mod damage on a miss)',
        costGp: 50,
        icon: '🗡️',
        description: 'Massive two-handed claymore dealing devastating 2d6 Slashing damage.'
    },
    {
        id: 'greataxe',
        name: 'Greataxe',
        category: 'weapon',
        weaponType: 'martial-melee',
        damageDice: '1d12',
        damageType: 'slashing',
        properties: ['heavy', 'two-handed'],
        mastery: 'Cleave (Strike adjacent foe on hit)',
        costGp: 30,
        icon: '🪓',
        description: 'Towering double-bitted battleaxe favored by barbarians (1d12 Slashing).'
    },
    {
        id: 'shortsword',
        name: 'Shortsword',
        category: 'weapon',
        weaponType: 'martial-melee',
        damageDice: '1d6',
        damageType: 'piercing',
        properties: ['finesse', 'light'],
        mastery: 'Vex (Advantage on next attack on hit)',
        costGp: 10,
        icon: '🗡️',
        description: 'Agile finesse blade using STR or DEX for attack and damage (1d6 Piercing).'
    },
    {
        id: 'dagger',
        name: 'Dagger',
        category: 'weapon',
        weaponType: 'simple-melee',
        damageDice: '1d4',
        damageType: 'piercing',
        properties: ['finesse', 'light', 'thrown'],
        mastery: 'Nick (Extra light off-hand strike)',
        costGp: 2,
        icon: '🔪',
        description: 'Balanced stiletto for close-quarters or throwing (1d4 Piercing, Finesse).'
    },
    {
        id: 'rapier',
        name: 'Rapier',
        category: 'weapon',
        weaponType: 'martial-melee',
        damageDice: '1d8',
        damageType: 'piercing',
        properties: ['finesse'],
        mastery: 'Vex (Advantage on next attack on hit)',
        costGp: 25,
        icon: '🤺',
        description: 'Slender dueling blade allowing full Dexterity precision (1d8 Piercing, Finesse).'
    },
    {
        id: 'mace',
        name: 'Mace',
        category: 'weapon',
        weaponType: 'simple-melee',
        damageDice: '1d6',
        damageType: 'bludgeoning',
        properties: [],
        mastery: 'Sap (Target has Disadvantage on next attack)',
        costGp: 5,
        icon: '🔨',
        description: 'Heavy flanged iron mace favored by clerics for crushing skeletons (1d6 Bludgeoning).'
    },
    {
        id: 'warhammer',
        name: 'Warhammer',
        category: 'weapon',
        weaponType: 'martial-melee',
        damageDice: '1d8',
        versatileDice: '1d10',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        mastery: 'Push (Drive enemy 10 ft back)',
        costGp: 15,
        icon: '⚒️',
        description: 'Dwarven-forged warhammer that dents plate and shatters stone (1d8/1d10 Bludgeoning).'
    },
    {
        id: 'quarterstaff',
        name: 'Quarterstaff',
        category: 'weapon',
        weaponType: 'simple-melee',
        damageDice: '1d6',
        versatileDice: '1d8',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        mastery: 'Topple (Knock enemy Prone on failed CON save)',
        costGp: 2,
        icon: '🦯',
        description: 'Iron-shod oak staff used by monks, druids, and wizards (1d6/1d8 Bludgeoning).'
    },
    {
        id: 'handaxe',
        name: 'Handaxe',
        category: 'weapon',
        weaponType: 'simple-melee',
        damageDice: '1d6',
        damageType: 'slashing',
        properties: ['light', 'thrown'],
        mastery: 'Vex (Advantage on next attack on hit)',
        costGp: 5,
        icon: '🪓',
        description: 'Balanced throwing and chopping hatchet (1d6 Slashing, range 20/60 ft).'
    },
    {
        id: 'shortbow',
        name: 'Shortbow',
        category: 'weapon',
        weaponType: 'simple-ranged',
        damageDice: '1d6',
        damageType: 'piercing',
        properties: ['ranged', 'two-handed'],
        mastery: 'Vex (Advantage on next attack on hit)',
        costGp: 25,
        icon: '🏹',
        description: 'Compact recurve bow ideal for skirmishers and rogues (1d6 Piercing, range 80/320 ft).'
    },
    {
        id: 'longbow',
        name: 'Longbow',
        category: 'weapon',
        weaponType: 'martial-ranged',
        damageDice: '1d8',
        damageType: 'piercing',
        properties: ['heavy', 'ranged', 'two-handed'],
        mastery: 'Slow (Reduce target speed by 10 ft)',
        costGp: 50,
        icon: '🏹',
        description: 'Yew warbow capable of piercing armor at extreme distance (1d8 Piercing, range 150/600 ft).'
    },
    {
        id: 'light-crossbow',
        name: 'Light Crossbow',
        category: 'weapon',
        weaponType: 'simple-ranged',
        damageDice: '1d8',
        damageType: 'piercing',
        properties: ['ranged', 'loading', 'two-handed'],
        mastery: 'Slow (Reduce target speed by 10 ft)',
        costGp: 25,
        icon: '🎯',
        description: 'Mechanical crank crossbow firing heavy iron bolts (1d8 Piercing, range 80/320 ft).'
    },
    {
        id: 'heavy-crossbow',
        name: 'Heavy Crossbow',
        category: 'weapon',
        weaponType: 'martial-ranged',
        damageDice: '1d10',
        damageType: 'piercing',
        properties: ['heavy', 'ranged', 'loading', 'two-handed'],
        mastery: 'Push (Drive enemy 10 ft back)',
        costGp: 50,
        icon: '🎯',
        description: 'Winch-spanned siege arbalest dealing 1d10 Piercing damage (range 100/400 ft).'
    }
];

export const armors = [
    {
        id: 'robes',
        name: 'Arcane Robes',
        category: 'armor',
        armorType: 'light',
        baseAc: 10,
        maxDexBonus: null,
        stealthDisadvantage: false,
        costGp: 5,
        icon: '👘',
        description: 'Embroidered cloth vestments (AC 10 + full DEX modifier; 13 + DEX with Mage Armor).'
    },
    {
        id: 'leather-armor',
        name: 'Leather Armor',
        category: 'armor',
        armorType: 'light',
        baseAc: 11,
        maxDexBonus: null,
        stealthDisadvantage: false,
        costGp: 10,
        icon: '🦺',
        description: 'Boiled leather breastplate and supple shoulders (AC 11 + full DEX modifier).'
    },
    {
        id: 'studded-leather',
        name: 'Studded Leather Armor',
        category: 'armor',
        armorType: 'light',
        baseAc: 12,
        maxDexBonus: null,
        stealthDisadvantage: false,
        costGp: 45,
        icon: '🧥',
        description: 'Tough leather reinforced with close-set rivets (AC 12 + full DEX modifier).'
    },
    {
        id: 'hide-armor',
        name: 'Hide Armor',
        category: 'armor',
        armorType: 'medium',
        baseAc: 12,
        maxDexBonus: 2,
        stealthDisadvantage: false,
        costGp: 10,
        icon: '🦌',
        description: 'Thick furs and pelts worn by druids and frontier rangers (AC 12 + DEX max 2).'
    },
    {
        id: 'chain-shirt',
        name: 'Chain Shirt',
        category: 'armor',
        armorType: 'medium',
        baseAc: 13,
        maxDexBonus: 2,
        stealthDisadvantage: false,
        costGp: 50,
        icon: '⛓️',
        description: 'Interlocking metal rings worn between layers of cloth (AC 13 + DEX max 2).'
    },
    {
        id: 'scale-mail',
        name: 'Scale Mail',
        category: 'armor',
        armorType: 'medium',
        baseAc: 14,
        maxDexBonus: 2,
        stealthDisadvantage: true,
        costGp: 50,
        icon: '🛡️',
        description: 'Overlapping metal scales like dragon hide (AC 14 + DEX max 2).'
    },
    {
        id: 'breastplate',
        name: 'Breastplate',
        category: 'armor',
        armorType: 'medium',
        baseAc: 14,
        maxDexBonus: 2,
        stealthDisadvantage: false,
        costGp: 400,
        icon: '🛡️',
        description: 'Fitted steel cuirass that protects vital organs without hindering stealth (AC 14 + DEX max 2).'
    },
    {
        id: 'half-plate',
        name: 'Half Plate',
        category: 'armor',
        armorType: 'medium',
        baseAc: 15,
        maxDexBonus: 2,
        stealthDisadvantage: true,
        costGp: 750,
        icon: '🛡️',
        description: 'Shaped metal plates covering most of the wearer’s body (AC 15 + DEX max 2).'
    },
    {
        id: 'chain-mail',
        name: 'Chain Mail',
        category: 'armor',
        armorType: 'heavy',
        baseAc: 16,
        maxDexBonus: 0,
        stealthDisadvantage: true,
        costGp: 75,
        icon: '⛓️',
        description: 'Full hauberk of interlocking steel rings over quilted padding (AC 16).'
    },
    {
        id: 'splint',
        name: 'Splint Armor',
        category: 'armor',
        armorType: 'heavy',
        baseAc: 17,
        maxDexBonus: 0,
        stealthDisadvantage: true,
        costGp: 200,
        icon: '🛡️',
        description: 'Vertical metal strips riveted to leather backing over chain mail (AC 17).'
    },
    {
        id: 'plate-armor',
        name: 'Plate Armor',
        category: 'armor',
        armorType: 'heavy',
        baseAc: 18,
        maxDexBonus: 0,
        stealthDisadvantage: true,
        costGp: 1500,
        icon: '🏰',
        description: 'Masterwork interlocking full-body steel plate harness (AC 18).'
    },
    {
        id: 'shield',
        name: 'Shield',
        category: 'shield',
        armorType: 'shield',
        baseAc: 2,
        acBonus: 2,
        maxDexBonus: null,
        stealthDisadvantage: false,
        costGp: 10,
        icon: '🛡️',
        description: 'Heavy wood or steel kite shield strapped to the off-hand (+2 AC).'
    }
];

export const consumables = [
    {
        id: 'potion-of-healing',
        name: 'Potion of Healing',
        category: 'consumable',
        actionType: 'bonus',
        effectType: 'heal',
        healDice: '2d4+2',
        costGp: 50,
        icon: '🧪',
        description: 'Drink as a Bonus Action (2024 PHB) to immediately restore 2d4 + 2 Hit Points.'
    },
    {
        id: 'potion-of-greater-healing',
        name: 'Potion of Greater Healing',
        category: 'consumable',
        actionType: 'bonus',
        effectType: 'heal',
        healDice: '4d4+4',
        costGp: 150,
        icon: '⚗️',
        description: 'Glowing crimson elixir that restores 4d4 + 4 Hit Points as a Bonus Action.'
    },
    {
        id: 'potion-of-superior-healing',
        name: 'Potion of Superior Healing',
        category: 'consumable',
        actionType: 'bonus',
        effectType: 'heal',
        healDice: '8d4+8',
        costGp: 450,
        icon: '🍷',
        description: 'concentrated ruby draught restoring 8d4 + 8 Hit Points as a Bonus Action.'
    },
    {
        id: 'potion-of-invisibility',
        name: 'Potion of Invisibility',
        category: 'consumable',
        actionType: 'bonus',
        effectType: 'buff',
        conditionApplied: 'invisible',
        acBonus: 2,
        costGp: 180,
        icon: '🫧',
        description: 'Become Invisible for 1 hour; attacks against you have Disadvantage and your next strike has Advantage.'
    },
    {
        id: 'potion-of-heroism',
        name: 'Potion of Heroism',
        category: 'consumable',
        actionType: 'bonus',
        effectType: 'heal',
        healDice: '10',
        bonusDie: '1d4',
        costGp: 180,
        icon: '🍺',
        description: 'Gain 10 Temporary Hit Points and the effect of the Bless spell (+1d4 to attacks and saves) for 1 hour.'
    },
    {
        id: 'antitoxin',
        name: 'Antitoxin Vial',
        category: 'consumable',
        actionType: 'bonus',
        effectType: 'cure',
        curesCondition: 'poisoned',
        costGp: 50,
        icon: '🧫',
        description: 'Cures the Poisoned condition and grants Advantage on saving throws against poison for 1 hour.'
    },
    {
        id: 'scroll-of-fireball',
        name: 'Spell Scroll: Fireball',
        category: 'consumable',
        actionType: 'action',
        effectType: 'damage',
        damageDice: '8d6',
        damageType: 'fire',
        saveAbility: 'dexterity',
        saveDc: 15,
        isAoE: true,
        costGp: 300,
        icon: '📜',
        description: 'Unleash a 3rd-level Fireball (8d6 Fire damage to all foes, DEX DC 15 for half) without expending a spell slot.'
    },
    {
        id: 'scroll-of-revivify',
        name: 'Spell Scroll: Revivify',
        category: 'consumable',
        actionType: 'action',
        effectType: 'heal',
        healDice: '4d8+4',
        costGp: 300,
        icon: '📜',
        description: 'Miraculously restore a fallen party member to life with 4d8 + 4 Hit Points.'
    },
    {
        id: 'alchemists-fire',
        name: "Alchemist's Fire",
        category: 'consumable',
        actionType: 'action',
        effectType: 'damage',
        damageDice: '2d6',
        damageType: 'fire',
        costGp: 50,
        icon: '💣',
        description: 'Hurl a flask of sticky adhesive fluid that ignites in air for 2d6 ongoing Fire damage.'
    },
    {
        id: 'holy-water',
        name: 'Flask of Holy Water',
        category: 'consumable',
        actionType: 'action',
        effectType: 'damage',
        damageDice: '2d8',
        damageType: 'radiant',
        costGp: 25,
        icon: '💧',
        description: 'Splash blessed water onto Undead or Fiends to sear them for 2d8 Radiant damage.'
    },
    {
        id: 'thieves-tools',
        name: "Thieves' Tools",
        category: 'gear',
        costGp: 25,
        icon: '🗝️',
        description: 'Lockpicks, a small mirror, narrow-bladed scissors, and pliers for disarming traps and picking locks.'
    },
    {
        id: 'healers-kit',
        name: "Healer's Kit",
        category: 'consumable',
        actionType: 'action',
        effectType: 'heal',
        healDice: '1d6+4',
        costGp: 15,
        icon: '🩹',
        description: 'Bandages, salves, and splints to stabilize dying companions and patch wounds (1d6+4 HP).'
    },
    {
        id: 'torch',
        name: 'Torch Bundle',
        category: 'gear',
        costGp: 1,
        icon: '🔦',
        description: 'Burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet.'
    },
    {
        id: 'rations',
        name: 'Adventurer Rations (5 Days)',
        category: 'gear',
        costGp: 5,
        icon: '🍖',
        description: 'Dry foods suitable for extended dungeon delves, including jerky, dried fruit, and hardtack.'
    }
];

// DMG 2024 Magic Items categorized by Treasure Theme (Armaments, Arcana, Implements, Relics)
export const magicItems = [
    {
        id: 'longsword-plus-1',
        name: '+1 Longsword (Talon)',
        category: 'weapon',
        treasureTheme: 'Armaments',
        rarity: 'Uncommon',
        damageDice: '1d8',
        attackBonus: 1,
        damageBonus: 1,
        damageType: 'slashing',
        properties: ['versatile', 'magical'],
        costGp: 400,
        icon: '⚔️',
        description: 'Silver-chased blade shaped like a hawk’s wing. Grants +1 to attack and damage rolls and bypasses nonmagical resistances.'
    },
    {
        id: 'flame-tongue-greatsword',
        name: 'Flame Tongue Greatsword',
        category: 'weapon',
        treasureTheme: 'Armaments',
        rarity: 'Rare',
        damageDice: '4d6',
        attackBonus: 1,
        damageBonus: 1,
        damageType: 'fire',
        properties: ['heavy', 'two-handed', 'magical'],
        costGp: 1200,
        icon: '🔥',
        description: 'Speak its command word to wreathe the blade in roaring flames, dealing 2d6 Slashing + 2d6 Fire damage on every hit!'
    },
    {
        id: 'sun-blade',
        name: 'Sun Blade',
        category: 'weapon',
        treasureTheme: 'Relics',
        rarity: 'Rare',
        damageDice: '2d8',
        attackBonus: 2,
        damageBonus: 2,
        damageType: 'radiant',
        properties: ['finesse', 'versatile', 'magical'],
        costGp: 1500,
        icon: '☀️',
        description: 'A hilt of pure golden sunlight (+2 Finesse Longsword) that deals Radiant damage and an extra +1d8 against Undead.'
    },
    {
        id: 'longbow-of-warning',
        name: '+1 Longbow of Warning',
        category: 'weapon',
        treasureTheme: 'Armaments',
        rarity: 'Uncommon',
        damageDice: '1d8',
        attackBonus: 1,
        damageBonus: 1,
        damageType: 'piercing',
        properties: ['ranged', 'magical'],
        initiativeAdvantage: true,
        costGp: 500,
        icon: '🏹',
        description: 'Grants +1 to attack and damage rolls, Advantage on Initiative rolls, and prevents your party from being surprised.'
    },
    {
        id: 'dagger-of-venom',
        name: 'Dagger of Venom',
        category: 'weapon',
        treasureTheme: 'Armaments',
        rarity: 'Rare',
        damageDice: '1d4+2d10',
        attackBonus: 1,
        damageBonus: 1,
        damageType: 'poison',
        properties: ['finesse', 'light', 'magical'],
        costGp: 750,
        icon: '🐍',
        description: 'Serrated black blade (+1 to hit/damage) that coats itself in thick venom to inflict +2d10 Poison damage.'
    },
    {
        id: 'shield-plus-1',
        name: '+1 Sentinel Shield',
        category: 'shield',
        armorType: 'shield',
        treasureTheme: 'Armaments',
        rarity: 'Uncommon',
        baseAc: 3,
        acBonus: 3,
        costGp: 450,
        icon: '🛡️',
        description: 'Enchanted shield bearing an all-seeing eye (+3 total AC bonus and Advantage on Perception checks).'
    },
    {
        id: 'mithral-chain-shirt',
        name: 'Mithral Chain Shirt (+1)',
        category: 'armor',
        armorType: 'medium',
        treasureTheme: 'Armaments',
        rarity: 'Uncommon',
        baseAc: 14,
        maxDexBonus: 2,
        stealthDisadvantage: false,
        costGp: 500,
        icon: '✨',
        description: 'Feather-light elven silver mail that can be worn under normal clothes (Base AC 14 + DEX max 2).'
    },
    {
        id: 'cloak-of-protection',
        name: 'Cloak of Protection',
        category: 'wondrous',
        treasureTheme: 'Arcana',
        rarity: 'Uncommon',
        acBonus: 1,
        saveBonus: 1,
        costGp: 400,
        icon: '🧥',
        description: 'Woven with protective runes; you gain a +1 bonus to Armor Class and all saving throws.'
    },
    {
        id: 'ring-of-protection',
        name: 'Ring of Protection',
        category: 'wondrous',
        treasureTheme: 'Relics',
        rarity: 'Rare',
        acBonus: 1,
        saveBonus: 1,
        costGp: 600,
        icon: '💍',
        description: 'Ancient signet ring that wards its wearer with a +1 bonus to AC and all saving throws.'
    },
    {
        id: 'wand-of-magic-missiles',
        name: 'Wand of Magic Missiles',
        category: 'consumable',
        treasureTheme: 'Arcana',
        rarity: 'Uncommon',
        actionType: 'action',
        effectType: 'damage',
        damageDice: '3d4+3',
        damageType: 'force',
        autoHit: true,
        reusable: true,
        costGp: 350,
        icon: '🪄',
        description: 'Fires unerring bolts of Force energy (3d4 + 3 automatic damage) using the wand’s arcane charges.'
    },
    {
        id: 'staff-of-defense',
        name: 'Glass Staff of Defense',
        category: 'weapon',
        treasureTheme: 'Arcana',
        rarity: 'Rare',
        damageDice: '1d6',
        attackBonus: 1,
        damageBonus: 1,
        acBonus: 1,
        damageType: 'bludgeoning',
        properties: ['versatile', 'magical'],
        costGp: 650,
        icon: '🦯',
        description: 'Hollow glass quarterstaff hard as oak; grants +1 AC and allows casting Mage Armor and Shield.'
    },
    {
        id: 'pearl-of-power',
        name: 'Pearl of Power',
        category: 'wondrous',
        treasureTheme: 'Arcana',
        rarity: 'Uncommon',
        costGp: 400,
        icon: '🦪',
        description: 'Speak its command word as an Action to regain one expended spell slot of up to 3rd level (1/Day).'
    },
    {
        id: 'amulet-of-the-devout',
        name: 'Amulet of the Devout (+1)',
        category: 'wondrous',
        treasureTheme: 'Relics',
        rarity: 'Uncommon',
        spellAttackBonus: 1,
        spellDcBonus: 1,
        costGp: 450,
        icon: '📿',
        description: 'Sacred reliquary granting +1 to spell attack rolls and saving throw DCs, plus an extra Channel Divinity use.'
    },
    {
        id: 'boots-of-elvenkind',
        name: 'Boots of Elvenkind',
        category: 'wondrous',
        treasureTheme: 'Implements',
        rarity: 'Uncommon',
        costGp: 350,
        icon: '🥾',
        description: 'Your footsteps make no sound regardless of surface; you have Advantage on Stealth checks to move silently.'
    },
    {
        id: 'gauntlets-of-ogre-power',
        name: 'Gauntlets of Ogre Power',
        category: 'wondrous',
        treasureTheme: 'Armaments',
        rarity: 'Uncommon',
        statOverride: { strength: 19 },
        costGp: 550,
        icon: '🥊',
        description: 'Your Strength score becomes 19 (+4 modifier) while you wear these iron-studded gauntlets.'
    },
    {
        id: 'headband-of-intellect',
        name: 'Headband of Intellect',
        category: 'wondrous',
        treasureTheme: 'Arcana',
        rarity: 'Uncommon',
        statOverride: { intelligence: 19 },
        costGp: 550,
        icon: '👑',
        description: 'Filigree circlet studded with a sapphire; your Intelligence score becomes 19 (+4 modifier) while worn.'
    },
    {
        id: 'bag-of-holding',
        name: 'Bag of Holding',
        category: 'wondrous',
        treasureTheme: 'Implements',
        rarity: 'Uncommon',
        costGp: 400,
        icon: '🎒',
        description: 'Extradimensional satchel that holds up to 500 pounds of treasure and gear while weighing only 15 pounds.'
    },
    {
        id: 'immovable-rod',
        name: 'Immovable Rod',
        category: 'wondrous',
        treasureTheme: 'Implements',
        rarity: 'Uncommon',
        costGp: 400,
        icon: '🔩',
        description: 'Flat iron rod with a button that magically locks it in place in mid-air, supporting up to 8,000 pounds.'
    }
];

export const allEquipment = [...weapons, ...armors, ...consumables, ...magicItems];

export const getEquipmentById = (id) =>
    allEquipment.find(item => item.id === id || item.name.toLowerCase() === String(id).toLowerCase());

/**
 * Curated Adventurer's Emporium Catalog for spending Gold (GP)
 */
export const shopCatalog = [
    ...consumables.filter(c => c.costGp >= 15),
    ...weapons.filter(w => ['longsword', 'greatsword', 'rapier', 'longbow', 'heavy-crossbow'].includes(w.id)),
    ...armors.filter(a => ['studded-leather', 'breastplate', 'half-plate', 'chain-mail', 'plate-armor', 'shield'].includes(a.id)),
    ...magicItems
];

/**
 * Calculate a character's total Armor Class (AC) using 5e rules:
 * Accounts for Light/Medium/Heavy armor, Shields, Barbarian/Monk Unarmored Defense,
 * Draconic Sorcerer Resilience, Fighter Defense Style, and Magic Item bonuses.
 */
export const calculateCharacterAC = (character, equippedIds = []) => {
    if (!character) return 10;
    const stats = character.stats || {};
    const dexMod = Math.floor(((stats.dexterity || 10) - 10) / 2);
    const conMod = Math.floor(((stats.constitution || 10) - 10) / 2);
    const wisMod = Math.floor(((stats.wisdom || 10) - 10) / 2);

    const items = (equippedIds.length ? equippedIds : (character.equipment || []))
        .map(item => (typeof item === 'string' ? getEquipmentById(item) : item))
        .filter(Boolean);

    const bodyArmor = items.find(i => i.category === 'armor' && i.id !== 'robes');
    const shieldItem = items.find(i => i.category === 'shield');
    const magicAcBonus = items
        .filter(i => i.category !== 'shield' && i.acBonus)
        .reduce((sum, i) => sum + (i.acBonus || 0), 0);

    let baseAc = 10 + dexMod;

    if (bodyArmor) {
        if (bodyArmor.armorType === 'heavy') {
            baseAc = bodyArmor.baseAc;
        } else if (bodyArmor.armorType === 'medium') {
            baseAc = bodyArmor.baseAc + Math.min(2, dexMod);
        } else {
            baseAc = bodyArmor.baseAc + dexMod;
        }
        // Fighter Defense Fighting Style (+1 AC while wearing armor)
        if (character.class === 'fighter') {
            baseAc += 1;
        }
    } else {
        // Unarmored Defense formulas
        if (character.class === 'barbarian') {
            baseAc = 10 + dexMod + conMod;
        } else if (character.class === 'monk') {
            baseAc = 10 + dexMod + wisMod;
        } else if (character.class === 'sorcerer') {
            baseAc = 13 + dexMod;
        }
    }

    const shieldBonus = shieldItem ? (shieldItem.acBonus || shieldItem.baseAc || 2) : 0;
    return baseAc + shieldBonus + magicAcBonus;
};
