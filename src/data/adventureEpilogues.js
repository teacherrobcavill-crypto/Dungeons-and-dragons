/**
 * Canonical D&D 5e Campaign Epilogues & Victory Rewards
 * Triggered upon vanquishing the climax boss and concluding the adventure.
 */

export const adventureEpilogues = {
    'lost-mine': {
        adventureId: 'lost-mine',
        adventureName: 'The Lost Mine of Phandelver',
        bossNodeId: 'black_spider_sanctum',
        bossName: 'Nezznar the Black Spider',
        title: 'The Reclaiming of Wave Echo Cave',
        awardedTitle: 'Champion of the Phandelver Pact',
        voiceTrack: 'lost-mine-victory',
        epilogueProse: `With Nezznar the Black Spider broken upon the temple stones and his monstrous brood routed, the subterranean surf of Wave Echo Cave returns to its ancestral majesty! The emerald fires of the Spell Forge burn clean once more, washing the ancient dwarven halls in brilliant, harmonic light.

Gundren Rockseeker weeps tears of fierce dwarven joy as you sever his bindings, roaring your praises to Moradin and the ancestors. Together with Sildar Hallwinter and the grateful citizens of Phandalin, the historic Phandelver Pact is officially renewed. Wagons laden with spell-forged blades, flawless emeralds, and enchanted silver roll once more toward Neverwinter under your banner.

The frontier tavern rings with ballads of your heroism for generations to come: you are forever honored as the Champions who reclaimed the Lost Mine and delivered the Sword Coast from darkness!`,
        patronReaction: `"By Moradin's anvil, you did it! The Rockseeker Compact is restored, and ten percent of every ingot and enchanted blade from these depths is yours in perpetuity! Drink deep tonight, Champions—Neverwinter will know your names before sunrise!" — Gundren Rockseeker`,
        bonusXp: 500,
        bonusGold: 300,
        specialReward: {
            id: 'charter_wave_echo_compact',
            name: 'Charter of the Rockseeker Compact (10% Mine Share)',
            type: 'quest',
            rarity: 'Rare',
            icon: '📜',
            description: 'A dwarven parchment stamped in gold leaf and signed by Gundren Rockseeker, granting your party perpetual royalties from the restored Wave Echo Mine.'
        }
    },

    'dragon-lair': {
        adventureId: 'dragon-lair',
        adventureName: "Dragon's Lair: The Wrath of Voranthos",
        bossNodeId: 'voranthos_caldera',
        bossName: 'Voranthos the Red Wyrm',
        title: 'The Fall of Voranthos the Red Wyrm',
        awardedTitle: 'Dragon-Slayer of Ashford',
        voiceTrack: 'dragon-lair-victory',
        epilogueProse: `The colossal red dragon Voranthos lets out a shuddering death-roar that shakes the foundations of Mount Ashford before collapsing into the smoldering caldera, its boiling blood hissing into the basalt fissures. The suffocating volcanic ash clouds that choked the realm for a generation begin to part, letting pure golden sunlight illuminate the charred mountain peaks for the first time in memory!

You stand victorious amidst mountains of glittering dragon-gold, ancient dwarven heirlooms, and smoldering dragon-scales. Surviving knights of the Crimson Vanguard drop to their knees in awe, raising their dented shields in salute as the valley bells peal in jubilant victory.

Bards throughout the kingdoms will compose epic cycles of this day: you are the mythic Dragon-Slayer who dared the caldera and extinguished the ancient flame of Voranthos!`,
        patronReaction: `"The sky is blue once more! For three decades we lived beneath the shadow of wings and fire, but your steel has shattered the nightmare. The realm of Ashford will sing your name until the mountains turn to dust!" — Captain Deborah of the Vanguard`,
        bonusXp: 750,
        bonusGold: 500,
        specialReward: {
            id: 'crest_voranthos_slayer',
            name: 'Draconic Heart-Scale of Voranthos',
            type: 'wondrous',
            rarity: 'Very Rare',
            icon: '🔥',
            description: 'An iridescent crimson scale the size of a tower shield, radiating warmth and granting the bearer mythic renown throughout all civilized kingdoms.'
        }
    },

    'haunted-manor': {
        adventureId: 'haunted-manor',
        adventureName: 'The Haunted Manor of Ravencrest',
        bossNodeId: 'ritual_ossuary',
        bossName: 'Lord Malakor the Wight & Lady Evelyn the Banshee',
        title: 'The Purification of House Ravencrest',
        awardedTitle: 'Purifier of Ravencrest',
        voiceTrack: 'haunted-manor-purification',
        epilogueProse: `As the silver belfry bell tolls its resonant ninth chime, the necrotic miasma that suffocated the manor dissolves into sweet morning rain. The tortured phantoms of Lord Malakor and Lady Evelyn pause, their eyes clear and freed of the century-old Shadowfell curse. With a shared gaze of eternal devotion and a nod of profound gratitude to you, their spirits intertwine and ascend toward the sunlit heavens.

The weeping gargoyles fall silent, and along the blighted terraces, the first pale jasmine and roses push through the thawing earth. The tragic shadow over House Ravencrest has lifted at last.

You carry the ancient signet ring of the estate into the daylight as the savior of lost souls, having redeemed a house that had been surrendered to eternal damnation!`,
        patronReaction: `"The wailing... it has ceased. The sun touches the east wing for the first time in ninety years. You have not merely cleared a crypt—you have given peace to souls that wept in the dark." — Father Corvus of the Dawn`,
        bonusXp: 500,
        bonusGold: 350,
        specialReward: {
            id: 'signet_house_ravencrest',
            name: 'Purified Signet of House Ravencrest',
            type: 'ring',
            rarity: 'Rare',
            icon: '💍',
            description: 'A sterling platinum signet ring blessed by the morning dawn, warding the wearer against undead horrors and necrotic curses.'
        }
    },

    'thieves-guild': {
        adventureId: 'thieves-guild',
        adventureName: "Shadows of the Thieves' Guild",
        bossNodeId: 'shadow_sanctum',
        bossName: 'Guildmaster Vespera the Master Assassin',
        title: 'The Night of Reclaimed Shadows',
        awardedTitle: 'Master of the Blackhaven Shadows',
        voiceTrack: 'thieves-guild-victory',
        epilogueProse: `Guildmaster Vespera falls with a severed whisper, her twin venomous stilettos clattering harmlessly against the obsidian mosaic floor. With her defeat, the suffocating, ruthless extortion of the Nightscale Syndicate upon Blackhaven is decisively broken!

From the subterranean canal docks to the gargoyle eaves of the midnight district, the whispers of the underworld herald a new master. You recover the stolen royal treasury chests and the Guild's ciphered Black Ledger—holding the secrets of kings, magistrates, and underworld barons alike.

In the taverns and council chambers of Blackhaven, your name is spoken with hushed reverence: whether as an honorable savior or the supreme master of the shadows, the city belongs to you!`,
        patronReaction: `"The Nightscale is finished. Vespera thought she owned every cutpurse and politician from here to Waterdeep, but you called her bluff with cold steel. The streets are ours now." — Twitchy Finn`,
        bonusXp: 600,
        bonusGold: 450,
        specialReward: {
            id: 'black_ledger_blackhaven',
            name: "Ciphered Black Ledger of Blackhaven",
            type: 'wondrous',
            rarity: 'Rare',
            icon: '🗝️',
            description: 'The master intelligence dossier of the Thieves Guild, granting boundless underworld influence and safe passage across the Sword Coast.'
        }
    },

    'ancient-temple': {
        adventureId: 'ancient-temple',
        adventureName: 'Secrets of the Sleeping God',
        bossNodeId: 'throne_sleeping_god',
        bossName: 'High Priestess Ssethra & The Helmed Horror',
        title: 'The Sealing of the Sleeping God',
        awardedTitle: 'Warden of the Sleeping God',
        voiceTrack: 'ancient-temple-victory',
        epilogueProse: `With High Priestess Ssethra hurled into the subterranean cenote and her sacrificial serpent-circle shattered, the colossal, slumbering eye beneath the crystal floor slides shut with an ancient sigh. The celestial rings of the Azlanti Astrolabe snap into pristine alignment, sealing the reality-warping presence of the cosmic serpent god beneath seven impenetrable wards of star-metal!

Blinding daylight breaks through the jungle canopy, setting the strangler-fig terraces and golden ziggurat steps ablaze in transcendent splendor. The fever-curse lifts from the jungle, and birdsong returns to the forgotten valley.

You emerge from the ancient ruins bearing the crystal archives of a lost civilization, having preserved the mortal realm from an awakening that would have unraveled the stars!`,
        patronReaction: `"The planar alignment is stable. The cosmic serpent sleeps once more. You have saved not just this valley, but the entire continent from a delirium of nightmare and blood." — Archivist Savra of Neverwinter Academy`,
        bonusXp: 700,
        bonusGold: 400,
        specialReward: {
            id: 'astral_prism_star_priest',
            name: 'Astral Prism of the Star-Priests',
            type: 'wondrous',
            rarity: 'Very Rare',
            icon: '💎',
            description: 'A pulsating prism of pre-Spellplague star-metal that radiates primordial celestial warding and cosmic clarity.'
        }
    }
};

export function getAdventureEpilogue(adventureId, customAdventure = null) {
    if (adventureEpilogues[adventureId]) {
        return adventureEpilogues[adventureId];
    }

    // Dynamic procedural epilogue for custom DMG generated campaigns
    const advName = customAdventure?.name || 'The Epic Campaign';
    const villain = customAdventure?.primaryVillain?.name || 'The Dungeon Overlord';
    return {
        adventureId: adventureId || 'custom',
        adventureName: advName,
        bossNodeId: null,
        bossName: villain,
        title: `The Triumph of ${advName}`,
        awardedTitle: `Hero of ${advName}`,
        voiceTrack: null,
        epilogueProse: `The final guardian lies vanquished, and the dark power that corrupted ${advName} has been utterly broken! Your deeds in this perilous dungeon delve will be recounted in taverns, keeps, and guildhalls across the land. You and your surviving companions stand victorious, bearing riches, glory, and mythic renown into the light of a new dawn!`,
        patronReaction: `"Incredible courage! You conquered every peril this realm threw at you and returned triumphant. The realm is forever in your debt!"`,
        bonusXp: 500,
        bonusGold: 300,
        specialReward: {
            id: 'relic_custom_champion',
            name: `Champion Trophy of ${advName}`,
            type: 'wondrous',
            rarity: 'Rare',
            icon: '🏆',
            description: `A celebrated trophy commemorating your complete victory over ${villain} in ${advName}.`
        }
    };
}
