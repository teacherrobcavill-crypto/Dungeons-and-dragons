// D&D 5e Living Campaign Modules & DMG 2024 Procedural Adventure Generator
// Each authored module lives in ./adventures/<name>.js

import { lostMine } from "./adventures/lostMine.js";
import { dragonLair } from "./adventures/dragonLair.js";
import { hauntedManor } from "./adventures/hauntedManor.js";
import { thievesGuild } from "./adventures/thievesGuild.js";
import { ancientTemple } from "./adventures/ancientTemple.js";

export const adventures = [lostMine, dragonLair, hauntedManor, thievesGuild, ancientTemple];

// DMG 2024 Procedural Adventure & Multi-Room Node Graph Generator
const CUSTOM_THEMES = {
    dungeon: {
        ambientTrack: 'dungeon',
        environment: 'dungeon',
        patronName: 'Chronicler Vaelen',
        patronRole: 'Seeker of the Delver\'s Guild',
        quartermasterName: 'Bramwell Torch-Bearer',
        quartermasterRole: 'Deep-Delver Quartermaster',
        atmosphere: {
            sensory: 'cold drafts carrying the tang of rusted iron, weeping mineral stalactites, and basalt flagstones worn smooth by vanished legions',
            thresholdClue: 'iron-shod boot prints and freshly chiseled Dwarven warning runes',
            hazardClue: 'hair-thin bronze filaments glinting beneath a film of grey vault-dust and tiny weep-holes drilled into the gargoyle friezes',
            gatehouseDesc: 'iron-bound portcullises, overturned dwarven shield-racks, and braziers of sputtering pitch',
            sanctuaryDesc: 'a vaulted cistern chamber ringed with abjuration sigils that hum like distant tuning forks',
            sanctumDesc: 'fluted obsidian columns etched with glowing silver axioms of the old empire',
            lairDesc: 'a subterranean amphitheater suspended over an abyssal forge-fissure where molten veins pulse in the rock'
        },
        minions: [
            { monsterId: 'skeleton', name: 'Runebound Skeleton', count: 3 },
            { monsterId: 'goblin-boss', name: 'Underdark Skirmisher Captain', count: 1 }
        ],
        guards: [
            { monsterId: 'bugbear', name: 'Vault Enforcer', count: 1 },
            { monsterId: 'ghoul', name: 'Catacomb Stalker', count: 2 }
        ],
        boss: {
            name: 'Malakor the Iron Warden',
            monsterId: 'helmed-horror',
            title: 'Immortal Construct of the Deep Vault',
            motivation: 'Bound by ancient blood-oaths to annihilate all who trespass beyond the Sealed Threshold and claim the deep forge for its dead masters.'
        }
    },
    wilderness: {
        ambientTrack: 'jungle',
        environment: 'forest',
        patronName: 'Warden Lyra Thornwood',
        patronRole: 'Emerald Enclave Outrider',
        quartermasterName: 'Fletcher Corin Swiftbough',
        quartermasterRole: 'Emerald Enclave Outfitter',
        atmosphere: {
            sensory: 'resin-scented pine wind, thunderheads bruising the jagged horizon, and ancient standing stones strangled by briars',
            thresholdClue: 'claw-scarred boundary oaks and the acrid smell of sulfur drifting down from the high gorge',
            hazardClue: 'unnaturally taut vine-creepers braided with bone needles and hollow reeds aimed at chest height along the cliff ledge',
            gatehouseDesc: 'sharpened timber palisades hung with rattling beast-skulls and signal horns carved from wyvern horn',
            sanctuaryDesc: 'a natural limestone grotto veiled behind a curtain of falling spring water and warded by druidic rowan totems',
            sanctumDesc: 'wind-carved monoliths of red granite arranged in a prehistoric solar circle',
            lairDesc: 'a jagged volcanic caldera strewn with charred war-wagons and glittering heaps of melted tribute'
        },
        minions: [
            { monsterId: 'wolf', name: 'Dire-Bred Timber Wolf', count: 3 },
            { monsterId: 'goblin', name: 'Thorn-Tribe Raider', count: 2 }
        ],
        guards: [
            { monsterId: 'owlbear', name: 'Frenzied Elder Owlbear', count: 1 },
            { monsterId: 'giant-spider', name: 'Canopy Ambush Spider', count: 1 }
        ],
        boss: {
            name: 'Skarrag the Wyrm-Blooded',
            monsterId: 'young-red-dragon',
            title: 'Apex Tyrant of the Untamed Peaks',
            motivation: 'Claims the entire frontier valley as its hunting ground, burning border steadings to ash and demanding royal tribute from every caravan.'
        }
    },
    undead: {
        ambientTrack: 'crypt',
        environment: 'crypt',
        patronName: 'Sister Celestine',
        patronRole: 'Prelate of the Dawn Vigil',
        quartermasterName: 'Brother Malrik Ash-Hand',
        quartermasterRole: 'Relic-Keeper of the Vigil',
        atmosphere: {
            sensory: 'grave-chill mist that clings to the ankles, the sweet-rot perfume of withered funeral lilies, and whispers that echo a heartbeat after you stop moving',
            thresholdClue: 'weeping marble seraphim whose eyes have been scratched out with cemetery iron',
            hazardClue: 'sunken ossuary flagstones rimed with hoarfrost and carved cherub mouths stained with greenish alchemical residue',
            gatehouseDesc: 'wrought-iron mausoleum gates, shattered sarcophagi used as breastworks, and torches burning with cold corpse-tallow',
            sanctuaryDesc: 'a consecrated side-chapel where a silver sun-brazier still burns with undying dawn-fire',
            sanctumDesc: 'ribbed arches of black marble inlaid with thousands of ancestral epitaphs that weep pale phosphorescence',
            lairDesc: 'a sunken cathedral choir beneath a cracked stained-glass dome where moonlight pools like spilled mercury'
        },
        minions: [
            { monsterId: 'zombie', name: 'Risen Plague-Bearer', count: 3 },
            { monsterId: 'skeleton', name: 'Bone Archer', count: 2 }
        ],
        guards: [
            { monsterId: 'ghoul', name: 'Crypt-Feaster Ghoul', count: 2 },
            { monsterId: 'wight', name: 'Barrow Death-Knight', count: 1 }
        ],
        boss: {
            name: 'Lady Morwenna the Deathless',
            monsterId: 'banshee',
            title: 'Sovereign of the Wailing Barrow',
            motivation: 'Conducts a Choir of Lamentation from her desecrated choir-throne to unbind the border between life and death and drown the province in eternal twilight.'
        }
    },
    intrigue: {
        ambientTrack: 'city',
        environment: 'city',
        patronName: 'Lord-Inquisitor Cassian',
        patronRole: 'Master of Crown Ciphers',
        quartermasterName: 'Madame Vespera',
        quartermasterRole: 'Black-Market Velvet Broker',
        atmosphere: {
            sensory: 'rain-slick cobblestones reflecting gaslight, the clove-and-nightshade scent of noble salons, and the soft click of stiletto heels in shadowed arcades',
            thresholdClue: 'wax seals of the Obsidian Lotus pressed into the mortar of the service postern',
            hazardClue: 'checkerboard parquet tiles polished everywhere except along a suspiciously clean central strip, flanked by hollow brass gas-sconces',
            gatehouseDesc: 'velvet-draped guard loggias, overturned gaming tables reinforced with steel plate, and racked repeating crossbows',
            sanctuaryDesc: 'a soundproofed smuggler\'s cellar behind a wine-cask false wall, lit by smokeless alchemical lanterns',
            sanctumDesc: 'gilded gallery pillars framing a vault door of interlocking brass cipher-rings',
            lairDesc: 'a candlelit penthouse rotunda overlooking the rain-swept spires of the capital, lined with blackmail ledgers and poisoned blades'
        },
        minions: [
            { monsterId: 'bandit', name: 'Syndicate Cutthroat', count: 3 },
            { monsterId: 'spy', name: 'Night-Cloak Informant', count: 1 }
        ],
        guards: [
            { monsterId: 'cult-fanatic', name: 'Cabal High Enforcer', count: 1 },
            { monsterId: 'doppelganger', name: 'Court Infiltrator', count: 1 }
        ],
        boss: {
            name: 'Vaelor the Faceless',
            monsterId: 'assassin',
            title: 'Grandmaster of the Obsidian Lotus',
            motivation: 'Pulls the strings of highborn houses through blackmail, virulent nightshade, and stolen royal charters to crown a puppet regent.'
        }
    }
};

const TREASURE_THEME_REWARDS = {
    Armaments: {
        sanctumItem: {
            id: 'custom_armament_blade',
            name: 'Vanguard\'s Runed Longsword (+1)',
            type: 'weapon',
            rarity: 'Uncommon',
            bonus: 1,
            damageDice: '1d8',
            description: 'A finely balanced martial blade etched with protective war-runes that hum when drawn (+1 attack/damage).'
        },
        bossItem: {
            id: 'custom_boss_armament',
            name: 'Sovereign Aegis Plate & Warblade (+2)',
            type: 'weapon',
            rarity: 'Rare',
            bonus: 2,
            damageDice: '2d6',
            description: 'Masterwork champion\'s armament forged in star-iron for legendary heroes (+2 attack/damage).'
        }
    },
    Arcana: {
        sanctumItem: {
            id: 'custom_arcana_wand',
            name: 'Spellweaver\'s Crystal Wand (+1)',
            type: 'wand',
            rarity: 'Uncommon',
            bonus: 1,
            damageDice: '2d6',
            description: 'Focuses raw elemental ley-lines into coherent arcane bolts (+1 spell & weapon bonus).'
        },
        bossItem: {
            id: 'custom_boss_arcana',
            name: 'Archmage\'s Staff of the Astral Eddy (+2)',
            type: 'weapon',
            rarity: 'Rare',
            bonus: 2,
            damageDice: '2d8',
            description: 'Crowned with a levitating star-sapphire that amplifies all magical strikes (+2).'
        }
    },
    Implements: {
        sanctumItem: {
            id: 'custom_implement_cloak',
            name: 'Shadow-Walker\'s Utility Cloak (+1)',
            type: 'wondrous',
            rarity: 'Uncommon',
            bonus: 1,
            description: 'Woven with thieves\' pockets and wards of twilight stealth (+1 AC and skill checks).'
        },
        bossItem: {
            id: 'custom_boss_implement',
            name: 'Masterwork Whisper-Dagger of Precision (+2)',
            type: 'weapon',
            rarity: 'Rare',
            bonus: 2,
            damageDice: '1d6',
            description: 'Never dulls and strikes through armor seams with uncanny, silent accuracy (+2).'
        }
    },
    Relics: {
        sanctumItem: {
            id: 'custom_relic_censer',
            name: 'Consecrated Reliquary Talisman (+1)',
            type: 'wondrous',
            rarity: 'Uncommon',
            bonus: 1,
            description: 'Sheds a warm aura of sacred protection that repels curses (+1 AC and saving throws).'
        },
        bossItem: {
            id: 'custom_boss_relic',
            name: 'Sun-Crowned Mace of the Ancients (+2)',
            type: 'weapon',
            rarity: 'Rare',
            bonus: 2,
            damageDice: '1d8',
            description: 'Hallowed relic of an elder age that blazes with golden dawn-radiance (+2).'
        }
    }
};

export function generateCustomAdventure(customConfig = {}) {
    const id = customConfig.id || `custom-${Date.now()}`;
    const name = customConfig.name || 'Chronicles of the Uncharted Realm';
    const setting = customConfig.setting || 'The Shattered Frontier';
    const difficulty = customConfig.difficulty || 'Intermediate';
    const level = Number(customConfig.level || customConfig.recommendedLevel) || (difficulty === 'Beginner' ? 1 : difficulty === 'Advanced' ? 4 : 2);
    const treasureTheme = customConfig.treasureTheme || 'Armaments';
    const tags = Array.isArray(customConfig.tags) && customConfig.tags.length > 0
        ? customConfig.tags
        : ['Custom', 'D&D 5e', treasureTheme];

    const rawText = `${name} ${setting} ${customConfig.theme || ''} ${customConfig.description || ''} ${tags.join(' ')}`.toLowerCase();
    let themeKey = 'dungeon';
    if (rawText.includes('crypt') || rawText.includes('undead') || rawText.includes('horror') || rawText.includes('manor') || rawText.includes('ghost')) {
        themeKey = 'undead';
    } else if (rawText.includes('city') || rawText.includes('thief') || rawText.includes('intrigue') || rawText.includes('heist') || rawText.includes('guild')) {
        themeKey = 'intrigue';
    } else if (rawText.includes('forest') || rawText.includes('mountain') || rawText.includes('dragon') || rawText.includes('jungle') || rawText.includes('wild')) {
        themeKey = 'wilderness';
    }

    const template = CUSTOM_THEMES[themeKey];
    const themeLoot = TREASURE_THEME_REWARDS[treasureTheme] || TREASURE_THEME_REWARDS.Armaments;
    const baseDc = Math.min(16, 10 + Math.floor(level / 2) + (difficulty === 'Advanced' ? 2 : difficulty === 'Intermediate' ? 1 : 0));
    const xpScale = Math.max(1, level);

    const patron = customConfig.patron || {
        name: template.patronName,
        role: template.patronRole,
        attitude: 'Friendly',
        description: `A seasoned field envoy in ${setting} who summoned your company to break the shadow gathering over ${name}.`
    };

    const primaryVillain = customConfig.primaryVillain || {
        ...template.boss,
        name: customConfig.villainName || template.boss.name
    };

    const openingNarrative = customConfig.openingNarrative || `Storm-clouds the color of bruised iron gather over ${setting}, where ${template.atmosphere.sensory} herald the crisis known across the borderlands as ${name}. For days your company has marched under sealed orders from ${patron.name} (${patron.role}), following ${template.atmosphere.thresholdClue} toward the heart of the stronghold.

Within these depths, ${primaryVillain.name}—feared throughout the realm as the ${primaryVillain.title}—has marshaled a ruthless host to fulfill a dark design: ${primaryVillain.motivation} Every previous scouting party sent into the approaches has vanished into the gloom, leaving only notched blades and guttering lanterns behind.

Now you stand before the outer boundary stones as the wind dies to a breathless hush and a hooded lantern signals from the field tent ahead.

What do you do?`;

    return {
        id,
        name,
        description: customConfig.description || `A custom ${difficulty.toLowerCase()} D&D 5e adventure set in ${setting}, structured with the DMG Four-Act framework.`,
        difficulty,
        estimatedTime: customConfig.estimatedTime || '3-5 hours',
        tags,
        setting,
        openingNarrative,
        icon: customConfig.icon || '🗺️',
        isCustom: true,
        recommendedLevel: level,
        levelRange: `Levels ${level}–${level + 2}`,
        patron,
        primaryVillain,
        treasureTheme,
        ambientTrack: template.ambientTrack,
        startNodeId: 'act1_threshold',
        nodes: {
            act1_threshold: {
                id: 'act1_threshold',
                title: `1. Threshold of ${setting} — Patron's Briefing`,
                act: 1,
                type: 'social',
                coordinates: { x: 14, y: 50 },
                environment: template.environment,
                readAloud: `Shuttered lantern light glimmers against the rain-darkened boundary stones of ${setting}, where ${template.atmosphere.sensory} press close around a camouflaged field pavilion. ${patron.name} steps out from beneath the waxed canvas, unrolling a blood-stained surveyor's charter across a crate of iron rations and weighing its corners down with notched daggers. Beyond the perimeter stakes, ${template.atmosphere.thresholdClue} mark where the citadel of ${name} looms out of the gloom. Two diverging approaches yawn before you: a narrow upper causeway spanning a mist-choked gorge, and a torchlit lower gatehouse where steel clanks against stone. ${patron.name} looks up with grim relief as your shadows fall across the map table.`,
                dmNotes: `Act 1 Hook & Reconnaissance: Parleying with ${patron.name} (Persuasion or Insight DC ${baseDc - 1}) reveals critical intelligence gathered by the last surviving scout. Success grants an extra war-chest stipend and alerts the party to the counterweight release mechanism in the Upper Causeway (Node 2) as well as the blind spot in the Outer Gatehouse portcullis winch (Node 3).`,
                companionMoments: [
                    {
                        companionName: 'Kaelen Shadowbow',
                        matchClass: 'ranger',
                        matchRace: 'wood-elf',
                        text: `Kaelen crouches by the boundary markers, touching the fresh gouges in the mud. "Whoever holds ${setting} knows how to funnel an assault—the lower gatehouse is built for a shield-wall brawl, while the upper causeway smells like an engineer's kill-zone. Let's hear what ${patron.name}'s scouts paid with their lives to learn."`
                    },
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: `Lyra traces the warning sigils inked onto ${patron.name}'s parchment map, her eyes narrowing at the convergence of ley-lines over the inner sanctum. "There is old magic woven into the foundations of ${name}—and a relic of ${treasureTheme} resonating near the heart of the stronghold."`
                    }
                ],
                npcs: [
                    {
                        id: 'custom_patron_npc',
                        name: patron.name,
                        role: patron.role,
                        attitude: 'Friendly',
                        dialogue: `"Thank the gods your company arrived before the moon set! ${primaryVillain.name} has doubled the watch across ${setting}, and our last outrider barely crawled back with this charter. Listen well: the Upper Causeway is quieter, though the old builders left cunning counterweight wards in the stonework; the Lower Gatehouse is held by ${primaryVillain.name}'s vanguard, but taking their winch opens a direct supply line. Drink this tonic, study the map, and strike hard!"`,
                        influenceDc: baseDc - 1,
                        influenceSkill: 'persuasion',
                        secretInfo: `Reveals the exact flagstone seam that wedges the Upper Causeway dart-trap and identifies the weak link in the honor guard protecting ${primaryVillain.name}'s antechamber.`,
                        rewardItem: {
                            id: 'custom_patron_potion',
                            name: 'Patron\'s Potion of Healing',
                            type: 'potion',
                            rarity: 'Common',
                            healDice: '2d4+2',
                            description: 'A restorative crimson draught sealed with your patron\'s personal signet.'
                        }
                    }
                ],
                loot: {
                    gold: 25 * xpScale,
                    items: []
                },
                restAvailable: 'short',
                choices: [
                    {
                        id: 'custom_briefing_check',
                        label: `Cross-examine ${patron.name}'s scout dispatches for tactical weaknesses (Persuasion/Insight DC ${baseDc - 1})`,
                        type: 'social',
                        skill: 'persuasion',
                        ability: 'charisma',
                        dc: baseDc - 1,
                        successText: `Impressed by your veteran command of field tactics, ${patron.name} turns over the private cipher-notes of the expedition's lead scout. You mark the exact patrol intervals and trap counterweights on your map, and ${patron.name} unclips a heavy pouch of emergency requisition gold to fund your delve!`,
                        failText: `${patron.name} shakes their head over the smeared ink of the scout's final report, unable to verify the internal wardings, but clasps your forearm in solidarity and points toward the twin approaches into ${name}.`,
                        rewardGold: 25 * xpScale
                    },
                    {
                        id: 'move_act2_hazard',
                        label: 'Take the Upper Route — The Perilous Causeway',
                        type: 'move',
                        targetNodeId: 'act2_hazard_passage'
                    },
                    {
                        id: 'move_act2_guardroom',
                        label: 'Take the Lower Route — The Guarded Gatehouse',
                        type: 'move',
                        targetNodeId: 'act2_guarded_chamber'
                    }
                ]
            },
            act2_hazard_passage: {
                id: 'act2_hazard_passage',
                title: '2. The Perilous Causeway — Ancient Warding Trap',
                act: 2,
                type: 'trap',
                coordinates: { x: 34, y: 26 },
                environment: template.environment,
                readAloud: `Weathered stone arches span a dizzying abyss along the upper approach of ${setting}, where cold drafts whistle through carved gargoyle mouths. Across the narrow flagstone span, ${template.atmosphere.hazardClue} catch the edge of your torchlight. Halfway across the bridge, the skeletal remains of an earlier trespasser lie sprawled beside a cracked buckler, one gauntleted hand still reaching toward a recessed alcove. Inside that niche rests a gilded supply coffer stamped with the heraldry of the stronghold's original builders. Beyond the far arch, a concealed postern stair winds down toward a sheltered inner courtyard.`,
                dmNotes: `Act 2 Hazard Challenge: The sensory clue in the boxed text warns perceptive players before they step onto the central span—the flagstones are mounted on a balanced bronze rocker-arm wired to pressurized alchemical dart-ports in the gargoyle frieze. Spotting the seam (Perception DC ${baseDc}) and wedging an iron spike or thieves' pick under the bronze release plate (Sleight of Hand DC ${baseDc}) locks the mechanism safely, allowing the party to loot the gilded coffer and claim the Amulet of the Nimble Delver without triggering the 2d6 piercing + poison volley.`,
                companionMoments: [
                    {
                        companionName: 'Nyx Nightbreeze',
                        matchClass: 'rogue',
                        matchRace: 'tiefling',
                        text: `Nyx holds up a gloved hand to halt the party, pointing her dagger tip at the clean seam around the central flagstone. "See how the dust is swept clear around that middle slab and the gargoyle's jaws are stained green? Classic counterweight gallery—give me thirty seconds with my picks and we'll take the coffer too."`
                    },
                    {
                        companionName: 'Brother Brynn Ironforge',
                        matchClass: 'cleric',
                        matchRace: 'dwarf',
                        text: `Brother Brynn taps his warhammer haft against the masonry arch and listens to the hollow ring beneath the bridge. "There's a bronze tension-rod running right under the keystone. Wedge the collar before anyone puts their boot on the middle span!"`
                    }
                ],
                trapOrHazard: {
                    name: 'Runic Pressure-Plate & Dart Volley',
                    trigger: 'Stepping across the central flagstone seal without wedging the bronze release plate.',
                    detectSkill: 'perception',
                    detectDc: baseDc,
                    disarmSkill: 'sleight-of-hand',
                    disarmDc: baseDc,
                    saveAbility: 'dexterity',
                    saveDc: baseDc,
                    damageDice: '2d6',
                    damageType: 'piercing',
                    condition: 'Poisoned',
                    description: 'Spring-loaded wall ports unleash a crossfire of alchemical darts across the causeway.'
                },
                loot: {
                    gold: 40 * xpScale,
                    items: [
                        {
                            id: 'custom_hazard_charm',
                            name: 'Amulet of the Nimble Delver',
                            type: 'wondrous',
                            rarity: 'Uncommon',
                            bonus: 1,
                            description: 'Grants +1 to saving throws and sharpens awareness against dungeon hazards.'
                        }
                    ]
                },
                restAvailable: 'none',
                choices: [
                    {
                        id: 'disarm_custom_causeway',
                        label: `Wedge the bronze counterweight and unlock the gilded alcove coffer (Sleight of Hand DC ${baseDc})`,
                        type: 'skillCheck',
                        skill: 'sleight-of-hand',
                        ability: 'dexterity',
                        dc: baseDc,
                        successText: `Working with surgeon-steady fingers, you slide a steel shim beneath the central flagstone and sever the bronze tension wire with a muffled snick! The gargoyle ports drop harmlessly shut, allowing you to pop the latch on the gilded coffer and claim its cache of coin and the Amulet of the Nimble Delver!`,
                        failText: `Your iron pick slips against the slick bronze cam, dropping the pressure slab half an inch! A hissing crossfire of alchemical darts erupts from the gargoyle mouths along the frieze, grazing your shoulder as you wrench the coffer open and dive across the far threshold!`,
                        failDamageDice: '1d8',
                        rewardGold: 35 * xpScale
                    },
                    {
                        id: 'advance_to_sanctuary_from_hazard',
                        label: 'Proceed into the Wayfarer\'s Sanctuary & Outpost',
                        type: 'move',
                        targetNodeId: 'act3_sanctuary_camp'
                    },
                    {
                        id: 'cross_to_guardroom',
                        label: 'Descend the connecting stair to the Guarded Gatehouse',
                        type: 'move',
                        targetNodeId: 'act2_guarded_chamber'
                    },
                    {
                        id: 'return_act1_from_hazard',
                        label: 'Return to the Threshold Briefing Camp',
                        type: 'move',
                        targetNodeId: 'act1_threshold'
                    }
                ]
            },
            act2_guarded_chamber: {
                id: 'act2_guarded_chamber',
                title: '3. The Outer Gatehouse — Vanguard Skirmish',
                act: 2,
                type: 'combat',
                coordinates: { x: 34, y: 74 },
                environment: template.environment,
                readAloud: `Sputtering torchlight glints off notched halberds and ${template.atmosphere.gatehouseDesc} inside this fortified barbican. Heavy iron chains groan overhead, anchored to a geared capstan winch that holds the inner portcullis teeth inches above the flagstones. Gathered around a scarred war-table in the center of the chamber are the vanguard sentries of ${primaryVillain.name}, their badges marked with the sigil of the ${primaryVillain.title}. A spiked iron war-chest sits chained beneath the winch platform, its padlock gleaming in the firelight. As your boots echo in the archway, the watch-captain kicks over the brazier to spill a line of hot coals across the floor and bellows a call to arms!`,
                dmNotes: `Act 2 Vanguard Combat: The sentries overturn heavy stone and timber barricades to gain half cover (+2 AC) while their leader attempts to drop the iron portcullis completely shut. Clever adventurers can kick the ratchet pawl out of the capstan winch or vault the glowing coals to flank the defenders. Once the vanguard falls, forcing or unlocking the winch and war-chest (Athletics or Investigation DC ${baseDc}) secures the retreat route and recovers the captain's emergency supplies.`,
                companionMoments: [
                    {
                        companionName: 'Ser Garrick Stoneheart',
                        matchClass: 'paladin',
                        matchRace: 'human',
                        text: `Ser Garrick slams his visor down and charges straight through the scattered embers toward the vanguard captain. "Hold the winch before they drop the iron grates! I'll break their shield-line—strike them while their formation is split!"`
                    },
                    {
                        companionName: 'Vaelen Songweaver',
                        matchClass: 'bard',
                        matchRace: 'half-elf',
                        text: `Vaelen sends a ringing chord echoing off the vaulted gatehouse ceiling, rattling the sentries' discipline. "Look at that chained war-chest under the capstan—${primaryVillain.name} clearly pays the outer watch well enough to die for!"`
                    }
                ],
                encounter: {
                    title: `${primaryVillain.name}'s Outer Sentries`,
                    difficulty: 'Moderate',
                    xpReward: 250 * xpScale,
                    monsters: template.minions,
                    tacticalNotes: 'The sentries use the stone barricades for cover and attempt to hold the portcullis winch against intruders.',
                    terrainFeature: 'Overturned Stone Barricades & Iron Portcullis Winch'
                },
                loot: {
                    gold: 50 * xpScale,
                    items: [
                        {
                            id: 'custom_gatehouse_potion',
                            name: 'Potion of Healing',
                            type: 'potion',
                            rarity: 'Common',
                            healDice: '2d4+2',
                            description: 'Recovered from the gatehouse captain\'s iron war-chest.'
                        }
                    ]
                },
                restAvailable: 'none',
                choices: [
                    {
                        id: 'raise_portcullis_winch',
                        label: `Crank the heavy capstan winch and pry open the captain's war-chest (Athletics/Investigation DC ${baseDc})`,
                        type: 'search',
                        skill: 'athletics',
                        ability: 'strength',
                        dc: baseDc,
                        successText: `Throwing your weight against the iron capstan bars, you haul the spiked portcullis into the ceiling slot and jam an iron pin through the master gear! With the passage permanently secured, you smash the padlock on the captain's war-chest and claim a hearty haul of silver and healing draughts!`,
                        failText: `The rusted chain shrieks like a banshee as the capstan slips a tooth, bruising your palms before you manage to wedge the portcullis high enough for the party to crawl underneath with a handful of scattered coins.`,
                        rewardGold: 30 * xpScale
                    },
                    {
                        id: 'advance_to_sanctuary_from_guard',
                        label: 'Advance into the Wayfarer\'s Sanctuary & Outpost',
                        type: 'move',
                        targetNodeId: 'act3_sanctuary_camp'
                    },
                    {
                        id: 'return_act1_from_guard',
                        label: 'Fall back to the Threshold Briefing Camp',
                        type: 'move',
                        targetNodeId: 'act1_threshold'
                    }
                ]
            },
            act3_sanctuary_camp: {
                id: 'act3_sanctuary_camp',
                title: '4. Wayfarer\'s Sanctuary — Hidden Outpost & Quartermaster',
                act: 3,
                type: 'merchant',
                coordinates: { x: 56, y: 50 },
                environment: template.environment,
                readAloud: `Ancient silver abjuration glyphs carved into the keystone keep the malice of ${setting} at bay within ${template.atmosphere.sanctuaryDesc}. The air inside is warm and sweet with the scent of cedar smoke and simmering spiced wine, untouched by the corruption festering deeper in ${name}. Beside the clear stone basin, ${template.quartermasterName} has pitched a lantern-lit silk pavilion hung with velvet-lined weapon cases, ruby healing vials, and oiled armor straps. A low brazier of smokeless white charcoal invites weary delvers to bind their wounds and sharpen their blades. Beyond the warded archway, a broad ceremonial stair ascends toward the sealed Inner Antechamber.`,
                dmNotes: `Act 3 Midpoint Haven & Quartermaster: The ancient silver wards prevent ${primaryVillain.name}'s minions from entering or scrying upon this vault, allowing the party to safely take a Short or Long Rest and trade recovered gold with ${template.quartermasterName}. Speaking with the quartermaster also provides lore on the Seal of ${treasureTheme} guarding the room ahead.`,
                companionMoments: [
                    {
                        companionName: 'Sylva Whisperwind',
                        matchClass: 'druid',
                        matchRace: 'elf',
                        text: `Sylva kneels beside the stone cistern, dipping her fingers into the crystal-clear water with a sigh of relief. "The old wards here are rooted deep in the living earth—not even ${primaryVillain.name}'s scouts can smell our trail across this threshold. Rest while we can; the air beyond that stair crackles with dark power."`
                    },
                    {
                        companionName: 'Brother Brynn Ironforge',
                        matchClass: 'cleric',
                        matchRace: 'dwarf',
                        text: `Brother Brynn inspects the masterwork steel laid out on ${template.quartermasterName}'s velvet cloth with an approving nod. "Now that's proper dwarven temper on the edges! Let's trade our extra coin for healing draughts and enchanted steel before we unseal the inner sanctum."`
                    }
                ],
                npcs: [
                    {
                        id: 'custom_quartermaster_npc',
                        name: template.quartermasterName,
                        role: template.quartermasterRole,
                        attitude: 'Friendly',
                        dialogue: `"Step inside the silver circle and let your shields down, friends—nothing sworn to ${primaryVillain.name} can cross that lintel without turning to ash! I've salvaged the finest ${treasureTheme.toLowerCase()} and alchemical draughts in ${setting} for heroes bold enough to storm the Inner Sanctum. Warm your hands by the brazier, spend your gold wisely, and when you face the Seal of ${treasureTheme} up those stairs, remember that its runes answer to intellect rather than brute force!"`,
                        influenceDc: baseDc,
                        influenceSkill: 'persuasion',
                        secretInfo: `Explains the harmonic sequence of the Seal of ${treasureTheme} in the next chamber, allowing a scholar to claim ${themeLoot.sanctumItem.name} before the final battle.`
                    }
                ],
                shopInventory: [
                    {
                        id: 'custom_shop_heal',
                        name: 'Potion of Healing',
                        type: 'potion',
                        price: 50,
                        rarity: 'Common',
                        healDice: '2d4+2',
                        description: 'Restores 2d4 + 2 Hit Points.'
                    },
                    {
                        id: 'custom_shop_greater_heal',
                        name: 'Potion of Greater Healing',
                        type: 'potion',
                        price: 110,
                        rarity: 'Uncommon',
                        healDice: '4d4+4',
                        description: 'Restores 4d4 + 4 Hit Points.'
                    },
                    {
                        id: 'custom_shop_weapon',
                        name: `Masterwork ${treasureTheme} Blade (+1)`,
                        type: 'weapon',
                        price: 150,
                        rarity: 'Uncommon',
                        bonus: 1,
                        damageDice: '1d8',
                        description: 'Balanced +1 weapon forged for delves into the deep.'
                    },
                    {
                        id: 'custom_shop_armor',
                        name: 'Reinforced Expedition Armor (+1)',
                        type: 'armor',
                        price: 160,
                        rarity: 'Uncommon',
                        bonus: 1,
                        baseAc: 14,
                        description: 'Sturdy +1 adventuring armor granting AC 14 + DEX (max 2).'
                    }
                ],
                restAvailable: 'both',
                choices: [
                    {
                        id: 'rest_custom_sanctuary',
                        label: 'Drink from the warded cistern and take a restorative Rest by the brazier',
                        type: 'rest',
                        successText: 'Sheltered behind the glowing silver abjuration runes, you bind your wounds, mend your armor, and drink deep from the pure cistern—recovering your full strength, spell slots, and heroic resolve for the reckoning ahead!'
                    },
                    {
                        id: 'advance_act3_sanctum',
                        label: 'Unseal the Inner Sanctum Antechamber',
                        type: 'move',
                        targetNodeId: 'act3_inner_sanctum'
                    },
                    {
                        id: 'back_to_hazard',
                        label: 'Return to the Upper Causeway',
                        type: 'move',
                        targetNodeId: 'act2_hazard_passage'
                    },
                    {
                        id: 'back_to_guardroom',
                        label: 'Return to the Outer Gatehouse',
                        type: 'move',
                        targetNodeId: 'act2_guarded_chamber'
                    }
                ]
            },
            act3_inner_sanctum: {
                id: 'act3_inner_sanctum',
                title: `5. The Inner Antechamber — Seal of ${treasureTheme}`,
                act: 3,
                type: 'puzzle',
                coordinates: { x: 74, y: 36 },
                environment: template.environment,
                readAloud: `Towering pillars of ${template.atmosphere.sanctumDesc} frame the monumental bronze-and-iron portal leading to ${primaryVillain.name}'s throne room. In the center of the tessellated floor rises a three-tiered runic pedestal where ${themeLoot.sanctumItem.name} floats inside a cage of interlocking golden light-rings. Every few seconds, a deep sub-audible pulse thrums through the soles of your boots from the climax chamber beyond the doors, causing the dust motes in the air to align like iron filings. Standing vigil before the pedestal are the elite sanctum wardens of ${name}, their armor etched with binding oaths that tether their lifeblood to the seal. As you cross the threshold, they lower their weapons in deadly unison!`,
                dmNotes: `Act 3 High-Stakes Encounter & Reliquary Puzzle: The Elite Sanctum Wardens fight to the death to prevent anyone from claiming ${themeLoot.sanctumItem.name} or unbarring the climax portal. The fluted pillars provide three-quarters cover against ranged attacks, while the central Runic Seal Pedestal radiates dim light in a 15-foot radius. Once the wardens are defeated, rotating the golden light-rings in sequence (Arcana or Investigation DC ${baseDc}) harmonizes the Seal of ${treasureTheme}, bestowing ${themeLoot.sanctumItem.name} without triggering the 1d6 arcane feedback lash and swinging open the doors to ${primaryVillain.name}'s lair.`,
                companionMoments: [
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: `Lyra's eyes widen as she reads the counter-rotating rings of golden light caging ${themeLoot.sanctumItem.name}. "That pedestal is a dual-phase arcane lock—it's simultaneously warding the relic and holding the great doors shut! Clear these wardens out of my way and I'll align the outer glyph-ring!"`
                    },
                    {
                        companionName: 'Nyx Nightbreeze',
                        matchClass: 'rogue',
                        matchRace: 'tiefling',
                        text: `Nyx flips her twin daggers into a reverse grip, eyeing the elite wardens flanking the pedestal. "Look at the way the dust hangs in the air—the whole room is charged like a thundercloud. Don't touch that golden cage until we've dropped the guards and read the sequence!"`
                    }
                ],
                encounter: {
                    title: 'Elite Sanctum Wardens',
                    difficulty: 'High',
                    xpReward: 450 * xpScale,
                    monsters: template.guards,
                    tacticalNotes: 'The elite wardens defend the runic pedestal in a tight formation and attempt to block access to the Boss Lair.',
                    terrainFeature: 'Runic Seal Pedestal & Fluted Pillars'
                },
                loot: {
                    gold: 90 * xpScale,
                    items: [themeLoot.sanctumItem]
                },
                restAvailable: 'short',
                choices: [
                    {
                        id: 'unlock_sanctum_relic',
                        label: `Decipher the Seal of ${treasureTheme} to claim ${themeLoot.sanctumItem.name} (Arcana/Investigation DC ${baseDc})`,
                        type: 'puzzle',
                        skill: 'arcana',
                        ability: 'intelligence',
                        dc: baseDc,
                        successText: `Tracing the axiom runes along the base of the pedestal, you rotate the three golden light-rings into perfect harmonic alignment! The cage dissolves in a warm shower of starlight, placing ${themeLoot.sanctumItem.name} directly into your grasp as the monumental bronze doors to ${primaryVillain.name}'s sanctum swing ponderously open!`,
                        failText: `As you force the final glyph-ring past its catch, a lash of raw arcane static crackles across the pedestal and scorches your fingertips! Even so, the golden cage shatters under your resolve and the great sanctum doors unbar with a thunderous boom.`,
                        failDamageDice: '1d6',
                        rewardGold: 50 * xpScale
                    },
                    {
                        id: 'enter_act4_boss',
                        label: `March into the Climax Lair of ${primaryVillain.name}`,
                        type: 'move',
                        targetNodeId: 'act4_boss_lair'
                    },
                    {
                        id: 'return_sanctuary_from_sanctum',
                        label: 'Fall back to the Wayfarer\'s Sanctuary',
                        type: 'move',
                        targetNodeId: 'act3_sanctuary_camp'
                    }
                ]
            },
            act4_boss_lair: {
                id: 'act4_boss_lair',
                title: `6. Climax Sanctum — Lair of ${primaryVillain.name}`,
                act: 4,
                type: 'boss',
                coordinates: { x: 90, y: 50 },
                environment: template.environment,
                readAloud: `You stride through the parted bronze portals into ${template.atmosphere.lairDesc}—the beating heart of ${name}! At the far end of the hall rises a sovereign dais of black stone heaped with overflowing iron-bound chests, captured banners, and the glittering plunder of ${setting}. Resting atop the high altar is the crowning prize of the stronghold: ${themeLoot.bossItem.name}, pulsing with untamed power. Rising from the throne before the hoard is ${primaryVillain.name}, the ${primaryVillain.title}, wreathed in dark majesty as echoes of power shake dust from the vaulted ceiling. Raising a weapon toward your company, ${primaryVillain.name}'s voice booms across the sanctum: "Fools and worms! You have crawled through my outer wards only to lay your bones atop my hoard—kneel, or be unmade!"`,
                dmNotes: `Act 4 Climax Boss Battle & Sovereign Hoard: ${primaryVillain.name} commands the elevated Sovereign Altar Dais, using the terrain height and lair hazards to pressure the party from above. Flanking stairs on the left and right allow agile characters to bypass the central choke-point. Once ${primaryVillain.name} is vanquished, inspecting the Sovereign Altar chest (Investigation DC ${baseDc}) disarms its final needle-lock and claims ${themeLoot.bossItem.name}, the Sovereign Seal of ${name}, and the full legendary treasure hoard!`,
                companionMoments: [
                    {
                        companionName: 'Ser Garrick Stoneheart',
                        matchClass: 'paladin',
                        matchRace: 'human',
                        text: `Ser Garrick levels his shining blade at ${primaryVillain.name} atop the black stone dais, his voice ringing like temple bronze. "Every life you have broken across ${setting} cries out for justice today! Stand fast, heroes—this tyrant's reign ends on that altar!"`
                    },
                    {
                        companionName: 'Kaelen Shadowbow',
                        matchClass: 'ranger',
                        matchRace: 'wood-elf',
                        text: `Kaelen draws a broadhead arrow to his ear, sighting along the elevated throne platform. "Split up and take the flanking stairs so ${primaryVillain.name} can't pin us in the doorway! When that sovereign chest opens, the realm will remember our names!"`
                    },
                    {
                        companionName: 'Vaelen Songweaver',
                        matchClass: 'bard',
                        matchRace: 'half-elf',
                        text: `Vaelen strikes a triumphant battle-chord on his lute that echoes across the vast amphitheater. "Listen to that acoustics—what a grand stage for the final verse of the Ballad of ${name}! Forward, my friends!"`
                    }
                ],
                npcs: [
                    {
                        id: 'custom_boss_npc',
                        name: primaryVillain.name,
                        role: primaryVillain.title,
                        attitude: 'Hostile',
                        dialogue: `"Did ${patron.name} truly believe a handful of sellswords could unseat the ${primaryVillain.title}? Look around you—every stone of ${setting} bends to my will, and ${themeLoot.bossItem.name} answers to my hand alone! Come then, let us see how brightly your courage burns before the dark!"`,
                        influenceDc: baseDc + 2,
                        influenceSkill: 'intimidation',
                        secretInfo: `${primaryVillain.name}'s arrogance can be baited—challenging their title directly draws them down from the protective cover of the high dais into melee range.`
                    }
                ],
                encounter: {
                    title: `${primaryVillain.name}, ${primaryVillain.title}`,
                    difficulty: 'Boss',
                    xpReward: 900 * xpScale,
                    monsters: [
                        {
                            monsterId: primaryVillain.monsterId || 'cult-fanatic',
                            name: primaryVillain.name,
                            count: 1
                        }
                    ],
                    tacticalNotes: `${primaryVillain.name} uses the elevated dais and lair hazards to pressure the party from high ground.`,
                    terrainFeature: 'Sovereign Altar Dais & Treasure Hoard'
                },
                loot: {
                    gold: 300 * xpScale,
                    items: [
                        themeLoot.bossItem,
                        {
                            id: 'custom_victory_charter',
                            name: `Trophy & Sovereign Seal of ${name}`,
                            type: 'quest',
                            rarity: 'Legendary',
                            description: `Proof of your triumph over ${primaryVillain.name} in ${setting}.`
                        }
                    ]
                },
                restAvailable: 'long',
                choices: [
                    {
                        id: 'claim_custom_hoard',
                        label: `Disarm the sovereign seal-lock and claim the Hoard of ${name} (Investigation DC ${baseDc})`,
                        type: 'search',
                        skill: 'investigation',
                        ability: 'intelligence',
                        dc: baseDc,
                        successText: `Using the fallen tyrant's signet key to bypass the final poison-needle catch on the altar chest, you throw back the iron lid in triumph! Inside gleams ${themeLoot.bossItem.name} beside the Sovereign Seal of ${name} and a breathtaking mountain of gold and gemstones that will be sung of in taverns across ${setting}!`,
                        failText: `Impatient with the intricate puzzle-lock, you smash the iron hasp off the sovereign chest with the pommel of your weapon and haul ${themeLoot.bossItem.name} and overflowing sacks of gold from the wreckage!`,
                        rewardGold: 150 * xpScale
                    },
                    {
                        id: 'return_inner_sanctum',
                        label: 'Return to the Inner Antechamber',
                        type: 'move',
                        targetNodeId: 'act3_inner_sanctum'
                    }
                ]
            }
        }
    };
}

export const getAdventureById = (id) => adventures.find(adv => adv.id === id);
