// Living Module: dragonLair
// Prose authored for MythicBot. Node ids, mechanics and links must stay stable.

export const dragonLair = {
    id: 'dragon-lair',
    name: "Dragon's Lair",
    description: 'Ascend the ash-choked switchbacks of the Dragonspine Mountains, unlock the lost dragon-slaying vault of Clan Ironhelm, and confront Voranthos the Cinder Tyrant in his volcanic caldera.',
    difficulty: 'Intermediate',
    estimatedTime: '3-5 hours',
    tags: ['Fantasy', 'Combat', 'Boss Fight'],
    setting: 'The Dragonspine Mountains',
    openingNarrative: `Black ash falls like bitter snow across your cloaks as the timbered watchtowers of Ashford smolder behind you. For three moons, the red wyrm Voranthos—called the Cinder Tyrant by the mountain folk—has descended from the volcanic crown of Mount Ignis to demand ever-crueler tribute: first the barony's cattle, then its royal treasury, and now chained caravans of living captives.

Three days of grueling climbs up the razor-backed ridges of the Dragonspine Mountains have brought your company to the timberline, where freezing gale-winds clash with the rising furnace-heat of the peak. Ahead, the broken stones of the Royal Vanguard's last outpost cling to the mountainside below a yawning, soot-blackened cavern mouth.

Every gust down the pass carries the choking reek of brimstone, scorched pine, and molten copper. Deep within the roots of the volcano, something vast shifts atop a mountain of gold, and its rhythmic exhalations make the gravel beneath your boots tremble.

What do you do?`,
    icon: '🐲',
    recommendedLevel: 3,
    levelRange: 'Levels 3–5',
    patron: {
        name: 'Sir Cassian Vance',
        role: 'Knight-Captain of the Royal Vanguard',
        attitude: 'Friendly',
        description: 'The sole surviving knight of the King\'s first dragon-hunting company, holding the scorched gatehouse at the base of the climb.'
    },
    primaryVillain: {
        name: 'Voranthos the Cinder Tyrant',
        monsterId: 'young-red-dragon',
        title: 'Red Scourge of the Dragonspine Peaks',
        motivation: 'Turns the volcanic heart of Mount Ignis into a furnace of tribute, served by fanatical dragon-cultists and kobold trappers.'
    },
    treasureTheme: 'Armaments',
    ambientTrack: 'cavern',
    startNodeId: 'ashford_gates',
    nodes: {
        ashford_gates: {
            id: 'ashford_gates',
            title: '1. Smoking Ruins of Ashford — Vanguard Watchpost',
            act: 1,
            type: 'social',
            coordinates: { x: 14, y: 64 },
            environment: 'town',
            readAloud: `Glowing cinders still pulse beneath the charred oak beams of Ashford's upper gatehouse, painting the drifting grey ash with veins of sullen orange light. The air stings your throat with the bitter tang of charred pine, melted iron, and scorched horseflesh. Leaning heavily against an overturned siege wagon, Knight-Captain Sir Cassian Vance cinches a linen bandage tight across his blistered sword-arm while standing guard over an ironbound chest of royal stores. Half-buried in the soot around him lie the blackened tabards and cloven shields of the Crimson Vanguard. High above the shattered parapet, the volcanic cone of Mount Ignis belches a towering column of blood-red smoke against the freezing slate sky.`,
            dmNotes: 'Sir Cassian Vance is the sole survivor of the King\'s Crimson Vanguard, whose squadron was ambushed on the basalt bridge inside the mountain two nights ago. If treated with respect and valor (Persuasion DC 11), he entrusts the party with a Royal Elixir of Fire Resistance and reveals the runic combination to the forgotten Clan Ironhelm Dragon-Slayer Vault hidden beneath the volcanic galleries.',
            companionMoments: [
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick kneels in the warm ash beside a cloven shield bearing the sun-and-lion crest, touching two gauntleted fingers to his brow before rising. "These men were my shield-brothers in the Crimson Vanguard, Sir Cassian. By their ashes and my honor, Voranthos will choke on cold steel before another dawn breaks."'
                },
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina lays a glowing palm over Sir Cassian\'s scorched shoulder, murmuring a hymn of solace as the blistered flesh cools. "The Light remembers every soul who stood between the wyrm\'s furnace and the innocent of Ashford, Captain. Rest your blade—we shall carry the Dawn\'s wrath to the summit."'
                }
            ],
            npcs: [
                {
                    id: 'sir_cassian_vance',
                    name: 'Sir Cassian Vance',
                    role: 'Knight-Captain of the Royal Vanguard',
                    attitude: 'Friendly',
                    dialogue: '"You have the look of true dragon-slayers—pray the gods your steel fares better than mine! Voranthos caught my vanguard crossing the obsidian span over the magma chasm, and his hell-hounds tore our rearguard to pieces. Listen well: as I crawled back through the lower galleries, I found a sealed dwarven vault marked with the anvil-rune of Clan Ironhelm. Take this iron key-stone—unlock their ancient armory before you dare the caldera!"',
                    influenceDc: 11,
                    influenceSkill: 'persuasion',
                    secretInfo: 'Reveals that the Shrine of the Five Crowns hides a secret runic stair leading directly down into the warded Clan Ironhelm Vault, where the legendary blade Wyrmsbane still rests.',
                    rewardItem: {
                        id: 'potion_fire_resistance_vance',
                        name: 'Royal Elixir of Fire Resistance',
                        type: 'potion',
                        rarity: 'Uncommon',
                        healDice: '2d4+2',
                        description: 'Distilled with frost-lotus and salamander scale; fortifies the drinker against dragonfire and restores 2d4+2 HP.'
                    }
                }
            ],
            loot: {
                gold: 35,
                items: [
                    {
                        id: 'ironhelm_vault_signet',
                        name: 'Clan Ironhelm Vault Key-Rune',
                        type: 'quest',
                        rarity: 'Uncommon',
                        description: 'A heavy iron key-stone etched with dwarven runes that unlocks the forgotten armory inside the caldera.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'parley_sir_cassian',
                    label: 'Take counsel with Sir Cassian on the wyrm\'s defenses and request vanguard supplies (Persuasion DC 11)',
                    type: 'social',
                    skill: 'persuasion',
                    ability: 'charisma',
                    dc: 11,
                    successText: 'Moved by your resolve, Sir Cassian straightens his scorched breastplate and salutes you with his left hand. He unlocks the royal chest, pressing a frost-rimmed vial of Royal Fire Resistance Elixir, twenty-five gold sovereigns, and the heavy Clan Ironhelm key-rune into your gauntlet while sketching the mountain\'s choke points in the ash.',
                    failText: 'Gripping his bandaged arm through a wave of pain, Cassian nods grimly and passes you a pouch of campaign coin from the wagon. Though he is too feverish to sketch a full map, he warns you to watch for kobold murder-holes in the upper gallery and to seek the old dwarven vault before facing Voranthos.',
                    rewardGold: 25
                },
                {
                    id: 'ascend_frostbite_pass',
                    label: 'Shoulder your packs and begin the treacherous climb up Frostbite Pass',
                    type: 'move',
                    targetNodeId: 'frostbite_pass'
                }
            ]
        },
        frostbite_pass: {
            id: 'frostbite_pass',
            title: '2. Frostbite Pass — Razor-Wind Ledge & Cornice',
            act: 1,
            type: 'trap',
            coordinates: { x: 26, y: 34 },
            environment: 'cavern',
            readAloud: `Shrieking mountain gales whip needles of sleet and volcanic grit across a perilous switchback hacked into the sheer granite flank of Mount Ignis. Below the narrow icy ledge, a dizzying abyss drops away into swirling grey clouds; fifty feet above, a massive overhanging cornice of blue glacier-ice groans under its own weight. Strange plumes of warm, yellow-crusted sulfur steam hiss from narrow fissures along the inner cliff wall, melting slick rivulets across the stone. Suddenly, a subterranean tremor rumbles up from the volcano's throat—and a sharp, rifle-shot crack echoes from the ice shelf overhead!`,
            dmNotes: 'Environmental Hazard! The volcanic tremor destabilizes the overhanging ice cornice. Heroes who read the terrain (Survival DC 12) can hug the warm geothermal sulfur vents where the overhang has already melted back; otherwise, tons of glacial ice and jagged slate cascade across the exposed trail (Dexterity Save DC 13 or 2d6 cold damage and knocked Prone).',
            companionMoments: [
                {
                    companionName: 'Thorgar Skullsplitter',
                    matchClass: 'barbarian',
                    matchRace: 'half-orc',
                    text: 'Thorgar bares his tusks into the freezing gale and drives the butt of his greataxe into the rime-crusted stone. "Ha! The mountain tries to shake us off like fleas, and the red lizard hasn\'t even shown his snout yet! Keep close to the rock wall—no avalanche buries Thorgar today!"'
                },
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn presses his ungloved palm against the steaming yellow stone of the inner cliff face. "Follow the sulfur vents, lads! Where the volcano\'s breath warms the granite, the ice shelf above has already thawed thin—stay against the warm fissures and the main slide will thunder right over our heads!"'
                }
            ],
            trapOrHazard: {
                name: 'Cornice Avalanche & Ice-Shard Squall',
                trigger: 'Crossing the exposed ice shelf while volcanic tremors shake the overhang.',
                detectSkill: 'perception',
                detectDc: 13,
                disarmSkill: 'athletics',
                disarmDc: 13,
                saveAbility: 'dexterity',
                saveDc: 13,
                damageDice: '2d6',
                damageType: 'cold',
                condition: 'Prone',
                description: 'Tons of glacial ice and jagged slate cascade across the cliffside trail.'
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'navigate_warm_vents',
                    label: 'Read the geothermal fissures and guide the party beneath the solid basalt overhang (Survival DC 12)',
                    type: 'skillCheck',
                    skill: 'survival',
                    ability: 'wisdom',
                    dc: 12,
                    successText: 'Tracing the rising plumes of sulfurous steam, you hustle your companions into a recessed pocket of warm basalt just as the cornice gives way! A roaring white curtain of glacial ice and shattered shale hurtles past the ledge and plunges into the gorge below, leaving the path ahead scoured clean.',
                    failText: 'Before you can reach the shelter of the warm sulfur fissures, the overhanging cornice shears loose with a deafening roar! Jagged slabs of blue ice and freezing slush slam across the switchback, battering your shoulders and nearly sweeping you over the precipice before the slide subsides.',
                    failDamageDice: '1d8'
                },
                {
                    id: 'enter_kobold_gallery',
                    label: 'Climb into the scorched upper cavern mouth toward the Kobold Gallery',
                    type: 'move',
                    targetNodeId: 'kobold_gallery'
                },
                {
                    id: 'take_lower_shrine_tunnel',
                    label: 'Descend the draconic-carved steps toward the Shrine of the Five Crowns',
                    type: 'move',
                    targetNodeId: 'tiamat_shrine'
                },
                {
                    id: 'descend_to_ashford',
                    label: 'Work your way back down the ridge to the Ashford watchpost',
                    type: 'move',
                    targetNodeId: 'ashford_gates'
                }
            ]
        },
        kobold_gallery: {
            id: 'kobold_gallery',
            title: '3. Dragon-Tooth Gallery — Kobold Murder Holes',
            act: 2,
            type: 'combat',
            coordinates: { x: 42, y: 20 },
            environment: 'cavern',
            readAloud: `Heat hits your face like the breath of a stoked kiln as you cross the cavern threshold into a winding gallery of blistered black obsidian. Iron cressets of bubbling pitch gutter along the walls, casting greasy scarlet reflections across a dark, iridescent sheen that coats the flagstones ahead. Fifteen feet up the sheer rock walls, narrow chiselled slits yawn in the shadow, smelling sharply of lamp oil, sulfur, and wet reptilian scales. Down near the floor, a faint metallic glint catches the torchlight between two soot-blackened stalagmites. Suddenly, a chorus of frantic draconic yips erupts from the upper slits as rust-scaled kobold trappers heft clay fire-pots and whirl braided leather slings!`,
            dmNotes: 'Hidden Trap & Ambush! The Scale-Binder kobolds have coated the central obsidian flagstones in volatile rock-oil and rigged an ankle-high braided brass wire to a spring-loaded flint striker (Investigation DC 12 to spot; Sleight of Hand DC 12 to snip the wire and harvest the three intact Dragon-Breath fire-flasks). In combat, the kobolds dart between the upper murder holes for half cover while the Flame-Tongue cultist attempts to ignite the slick.',
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax drops to one knee and slides the flat of his dagger beneath a hair-thin strand of gleaming brass wire. "Hold your torches high! The whole middle of this corridor is swimming in rock-oil, and these little scale-rats wired a flint-striker to turn the floor into a griddle. Let me snip their fuse and steal their fire-pots!"'
                }
            ],
            encounter: {
                title: 'Scale-Binder Kobold Trappers',
                difficulty: 'Moderate',
                xpReward: 300,
                monsters: [
                    { monsterId: 'kobold', name: 'Dragon-Shield Kobold', count: 4 },
                    { monsterId: 'cultist', name: 'Flame-Tongue Initiate', count: 1 }
                ],
                tacticalNotes: 'Kobolds dart between murder holes for half cover while the cultist tries to ignite the oil slick on the floor.',
                terrainFeature: 'Elevated Murder Holes & Slippery Oil Slick'
            },
            trapOrHazard: {
                name: 'Alchemical Oil Slick & Brass Tripwire',
                trigger: 'Stepping across the oiled obsidian flagstones without cutting the brass wire.',
                detectSkill: 'investigation',
                detectDc: 12,
                disarmSkill: 'sleight-of-hand',
                disarmDc: 12,
                saveAbility: 'dexterity',
                saveDc: 12,
                damageDice: '1d10',
                damageType: 'fire',
                condition: 'Burning',
                description: 'A spring-loaded flint sparks the oil slick into a curtain of searing flame.'
            },
            loot: {
                gold: 60,
                items: [
                    {
                        id: 'alchemist_fire_flasks',
                        name: 'Bandolier of Dragon-Breath Bombs',
                        type: 'gear',
                        rarity: 'Uncommon',
                        damageDice: '2d6',
                        description: 'Three ceramic flasks of volatile kobold fire-oil that explode for 2d6 fire damage on impact.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'disarm_brass_tripwire',
                    label: 'Uncouple the flint striker and harvest the volatile fire-flasks (Sleight of Hand DC 12)',
                    type: 'skillCheck',
                    skill: 'sleight-of-hand',
                    ability: 'dexterity',
                    dc: 12,
                    successText: 'Ducking beneath a hail of sling stones, you pinch the braided brass wire between thumb and forefinger and slip the tension spring off the flint wheel. Not only does the oil slick remain cold and harmless, but you unhook a bandolier of volatile ceramic fire-bombs and a pouch of tribute gold from the trap niche!',
                    failText: 'Your pliers graze the tension spring and the flint wheel showers white-hot sparks across the obsidian floor! A ribbon of alchemical oil roars into waist-high flame, singing your greaves and cloaks before burning itself out against the rock.',
                    failDamageDice: '1d6',
                    rewardGold: 25
                },
                {
                    id: 'advance_to_magma_bridge',
                    label: 'Push deeper toward the furnace-glow of the Magma Bridge',
                    type: 'move',
                    targetNodeId: 'magma_bridge'
                },
                {
                    id: 'cut_down_to_shrine',
                    label: 'Descend the spiral side-stair to the Shrine of the Five Crowns',
                    type: 'move',
                    targetNodeId: 'tiamat_shrine'
                },
                {
                    id: 'retreat_frostbite_pass',
                    label: 'Fall back out to the icy air of Frostbite Pass',
                    type: 'move',
                    targetNodeId: 'frostbite_pass'
                }
            ]
        },
        tiamat_shrine: {
            id: 'tiamat_shrine',
            title: '4. Shrine of the Five Crowns — Draconic Riddle Altar',
            act: 2,
            type: 'puzzle',
            coordinates: { x: 44, y: 58 },
            environment: 'temple',
            readAloud: `Carved into the curving basalt wall of this subterranean fane are five gargantuan dragon heads—White, Green, Black, Blue, and Red—their open jaws wreathed in dried blood and curling incense smoke. The air is thick with the metallic smell of copper offerings and burnt myrrh. At the center of the mosaic floor stands a black stone altar set with five rotatable bronze discs and a deeply chiselled Draconic verse: "Bow first to the Frost of the High Peak, next to the Venom of the Bough, then the Acid of the Mire, the Lightning of the Storm, and crown at last the Eternal Flame." Directly beneath the central Red Dragon relief, a hairline vertical seam traces the outline of an ancient, soot-darkened stone slab. Chanting before a coffer of pillaged Ashford gold stand three fanatical priests in crimson scale-robes, their daggers raised in salute to the Five-Headed Queen!`,
            dmNotes: 'Once an outer vestibule of Clan Ironhelm, this chamber was desecrated by dragon-cultists worshipping Tiamat and Voranthos. Secret Door & Puzzle: Rotating the five elemental bronze discs in the exact hierarchy described by the verse—Ice (White), Poison (Green), Acid (Black), Lightning (Blue), and Fire (Red)—requires an Arcana or Religion check (DC 13). Solving it parts the jaws of the Red Dragon relief to dispense a Ruby Ring of Cinder Ward and grinds open the hidden dwarven slab leading down to the Forgotten Vault of Clan Ironhelm!',
            companionMoments: [
                {
                    companionName: 'Valerius',
                    matchClass: 'paladin',
                    matchRace: 'human',
                    text: 'Valerius levels his radiant blade at the chanting cultists, his voice ringing like temple bronze through the vault. "They have profaned a dwarven sanctuary with the five-headed sigil of Tiamat! Purge these blood-priests from the altar, and I will help decipher the elemental locks."'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra traces the glowing Draconic glyphs in the air with a gloved finger, her eyes darting from the White relief to the Red. "It\'s an old chromatic liturgy of ascendance—from the freezing peaks of the White Wyrm up to the sovereign flame of the Red. Turn the bronze dials in that exact elemental order and the counterweights behind the wall will unlatch!"'
                },
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina frowns at the soot-covered masonry beneath the five dragon heads. "Look closely at the stonework beneath the draconic carvings—this wall was built by dwarven masons long before the cult arrived. The riddle on the altar is the key to their sealed vault below."'
                }
            ],
            encounter: {
                title: 'Priests of the Cinder Hoard',
                difficulty: 'Moderate',
                xpReward: 450,
                monsters: [
                    { monsterId: 'cult-fanatic', name: 'Cinder-Scale Fanatic', count: 1 },
                    { monsterId: 'cultist', name: 'Draconic Acolyte', count: 2 }
                ],
                tacticalNotes: 'The Cult Fanatic casts Hold Person and Spiritual Weapon while the acolytes defend the tribute chest.',
                terrainFeature: 'Altar of the Five Chromatic Crowns'
            },
            loot: {
                gold: 120,
                items: [
                    {
                        id: 'ring_warmth_draconic',
                        name: 'Ruby-Inlaid Ring of Warmth & Cinder Ward',
                        type: 'ring',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'A gold band set with a warm cabochon ruby; grants +1 to saving throws and wards against extreme heat and cold.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'solve_chromatic_riddle',
                    label: 'Rotate the five elemental bronze discs in the Draconic sequence of dominance (Arcana DC 13)',
                    type: 'puzzle',
                    skill: 'arcana',
                    ability: 'intelligence',
                    dc: 13,
                    successText: 'Intoning the Draconic verse, you turn the bronze discs from Frost to Venom, Acid, Lightning, and finally Crown the Eternal Flame. Heavy iron tumblers clank inside the wall as the carved Red Dragon parts its stone jaws, dropping a glowing Ruby Ring of Warmth and fifty gold pieces onto the altar while the hidden dwarven doorway grinds open!',
                    failText: 'You twist the Lightning disc before the Acid glyph, breaking the chromatic sequence! The eyes of all five dragon reliefs flare with angry elemental sparks that lash across the altar, scorching your gauntlets before the dials reset with a heavy clank.',
                    failDamageDice: '1d6',
                    rewardGold: 50
                },
                {
                    id: 'enter_dwarven_armory',
                    label: 'Descend the hidden stone stair into the Forgotten Dwarven Vault',
                    type: 'move',
                    targetNodeId: 'dwarven_armory'
                },
                {
                    id: 'cross_to_magma_bridge',
                    label: 'Ascend the volcanic gallery toward the Magma Bridge',
                    type: 'move',
                    targetNodeId: 'magma_bridge'
                },
                {
                    id: 'return_frostbite_from_shrine',
                    label: 'Retrace the carved steps back out to Frostbite Pass',
                    type: 'move',
                    targetNodeId: 'frostbite_pass'
                }
            ]
        },
        magma_bridge: {
            id: 'magma_bridge',
            title: '5. Span of Molten Glass — Hell Hound Crossing',
            act: 2,
            type: 'combat',
            coordinates: { x: 60, y: 34 },
            environment: 'volcano',
            readAloud: `Heat hammers against your breastplate like the open door of a foundry as you emerge onto the lip of a subterranean chasm. Fifty feet below, a churning river of white-hot magma roars and bubbles, sending up blinding geysers of liquid fire that hiss against the cavern walls. Spanning the gulf is a narrow, guardrailless arch of slick black volcanic glass, scarcely ten feet wide and shimmering with heat-mirages. Every breath tastes of scorched iron and choking sulfur dioxide. Prowling across the center of the obsidian arch are two monstrous Hell Hounds, their coal-black ribs glowing like furnace grates as gouts of molten drool spatter and sizzle upon the glass!`,
            dmNotes: 'Voranthos keeps a mated pair of infernal Hell Hounds to guard the only direct crossing into his inner sanctum. The hounds coordinate with Pack Tactics and unleash overlapping cones of Fire Breath down the narrow 10-foot bridge. Periodic magma geysers erupt along the chasm edges; a hero who times the volcanic rhythm (Acrobatics DC 13) can lead the party across between eruptions without taking splash burns.',
            companionMoments: [
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick locks his shield before his chest, the polished steel glowing crimson in the glare of the lava river below. "This is the bridge where Voranthos ambushed Sir Cassian\'s squadron! Form a tight file behind my shield and don\'t let those hell-spawned curs flank you near the edge!"'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra shades her eyes against the blinding glare and counts the pulse of the bubbling lava vents below. "Watch the crust along the chasm wall—the magma geysers vent on every fourth beat! Move when the pressure drops, and weave frost magic against those infernal hounds!"'
                }
            ],
            encounter: {
                title: 'Hounds of the Caldera',
                difficulty: 'High',
                xpReward: 600,
                monsters: [
                    { monsterId: 'hell-hound', name: 'Caldera Hell Hound', count: 2 }
                ],
                tacticalNotes: 'The Hell Hounds coordinate Pack Tactics and open with twin cones of fire along the narrow span.',
                terrainFeature: 'Narrow Basalt Span over Bubbling Lava'
            },
            loot: {
                gold: 75,
                items: [
                    {
                        id: 'hellhound_ember_collar',
                        name: 'Infernal Iron Collar of Might',
                        type: 'wondrous',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'Studded with fire opals worth 75 gp and warm to the touch.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'dash_across_lava_geysers',
                    label: 'Time the magma geyser eruptions and sprint across the slick obsidian arch (Acrobatics DC 13)',
                    type: 'skillCheck',
                    skill: 'acrobatics',
                    ability: 'dexterity',
                    dc: 13,
                    successText: 'Reading the rhythmic hiss of the gas vents below, you shout the cadence and bound lightly across the mirror-slick volcanic glass! Seconds after your boots clear the center span, a towering fountain of liquid fire erupts harmlessly behind your heels.',
                    failText: 'Your boot slips on a patch of cooling slag just as a subterranean gas pocket ruptures below the bridge! A blistering curtain of molten droplets showers across the obsidian arch, searing your cloaks before you scramble to the far side.',
                    failDamageDice: '1d8'
                },
                {
                    id: 'detour_dwarven_armory',
                    label: 'Follow the rune-carved side ledge down toward the Dwarven Armory',
                    type: 'move',
                    targetNodeId: 'dwarven_armory'
                },
                {
                    id: 'advance_obsidian_antechamber',
                    label: 'Cross the chasm into the Obsidian Antechamber before the Dragon\'s Lair',
                    type: 'move',
                    targetNodeId: 'obsidian_antechamber'
                },
                {
                    id: 'return_kobold_gallery',
                    label: 'Fall back into the Kobold Gallery',
                    type: 'move',
                    targetNodeId: 'kobold_gallery'
                }
            ]
        },
        dwarven_armory: {
            id: 'dwarven_armory',
            title: '6. Forgotten Vault of Clan Ironhelm — Sanctuary & Armory',
            act: 3,
            type: 'rest',
            coordinates: { x: 64, y: 74 },
            environment: 'dungeon',
            readAloud: `Massive double doors of gromril-inlaid granite seal this ancient dwarven hold fast against the sulfur and fury of the volcano outside. Within, the air is miraculously cool and crisp, scented with clean mountain springwater, oiled steel, and dried silver-moss. Along the vaulted walls stand geometric racks of centuries-old dwarven war-gear beneath a solemn granite statue of Moradin the Soulforger, while a crystal spring splashes softly into a runic basin. At the center of the chamber, clamped atop a master-smith's anvil beside a skeleton in gilded dwarven plate, gleams a silver-chased greatsword whose fuller pulses with frost-blue runes!`,
            dmNotes: 'Warded Sanctuary! The abjuration runes chiselled by the last runesmiths of Clan Ironhelm completely block volcanic heat and prevent Voranthos\'s minions from entering, allowing the party to take a safe Short or Long Rest. The skeleton beside the anvil is Master-Smith Durgan Grimhelm, who died two centuries ago after forging Wyrmsbane to slay Voranthos\'s sire. Unlocking the runic anvil clamps (Investigation DC 12, or automatic inspiration with Sir Cassian\'s key-stone) bestows the +2 Dragon-Slayer greatsword Wyrmsbane!',
            companionMoments: [
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn removes his helm and presses his forehead to the cold anvil, his voice thick with reverence as he reads the dwarven runes chiselled at the dead smith\'s feet. "\'Here rests Durgan Grimhelm of Clan Ironhelm, who quenched this blade in his own heart\'s blood when the Great Wyrm breached the gate—may stronger hands finish our reckoning.\' Sleep in peace, cousin; Wyrmsbane rides to war once more!"'
                },
                {
                    companionName: 'Thorgar Skullsplitter',
                    matchClass: 'barbarian',
                    matchRace: 'half-orc',
                    text: 'Thorgar whistles low as frost-light reflects off the greatsword\'s rune-etched fuller, his scarred hands itching for the grip. "Look at the edge on that dwarf-steel—cold as a winter glacier in the belly of a volcano! Let\'s pry those clamps open and see how deep it bites into red dragon hide!"'
                }
            ],
            loot: {
                gold: 160,
                items: [
                    {
                        id: 'wyrmslayer_blade',
                        name: 'Wyrmsbane (+2 Dragon-Slayer Blade)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 2,
                        damageDice: '2d6',
                        description: 'Masterwork dwarven blade of Clan Ironhelm; grants +2 to attack/damage and flares with icy light against dragons.'
                    },
                    {
                        id: 'dwarven_draught_greater',
                        name: 'Ironhelm Draught of Greater Healing',
                        type: 'potion',
                        rarity: 'Uncommon',
                        healDice: '4d4+4',
                        description: 'A potent dwarven herbal tonic that restores 4d4 + 4 Hit Points.'
                    }
                ]
            },
            restAvailable: 'both',
            choices: [
                {
                    id: 'rest_in_dwarven_vault',
                    label: 'Bar the gromril doors and take a Rest beside Moradin\'s sacred spring',
                    type: 'rest',
                    successText: 'You slide the heavy gromril bolts home, watching the dwarven abjuration runes flare with cool silver light that shuts out the volcano\'s roar. Drinking deeply from the crystal spring and binding your burns with Ironhelm salves, your company recovers full strength and focus for the reckoning ahead.'
                },
                {
                    id: 'claim_wyrmsbane_anvil',
                    label: 'Align the Clan Ironhelm anvil runes to release Wyrmsbane (Investigation DC 12)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'Fitting the Ironhelm key-rune into the anvil\'s heart-slot, you press the three smithing glyphs in sequence. With a musical chime like a struck tuning fork, the gromril clamps part—and as your hand closes around the hilt of Wyrmsbane, a rime of pale blue frost-fire races down the +2 Dragon-Slayer blade!',
                    failText: 'The centuries-old dwarven puzzle-clamps resist your first attempts, grinding stubbornly against the anvil stone. Putting your shoulder against the iron lever, you finally wrench the mechanism open by main force and lift Wyrmsbane from its cradle alongside a coffer of ancient dwarven gold.',
                    rewardGold: 60
                },
                {
                    id: 'march_to_antechamber',
                    label: 'Ascend the volcanic stair into the Obsidian Antechamber',
                    type: 'move',
                    targetNodeId: 'obsidian_antechamber'
                },
                {
                    id: 'return_tiamat_shrine',
                    label: 'Climb back up the secret stair to the Shrine of the Five Crowns',
                    type: 'move',
                    targetNodeId: 'tiamat_shrine'
                }
            ]
        },
        obsidian_antechamber: {
            id: 'obsidian_antechamber',
            title: '7. Obsidian Antechamber — The Drake-Sworn Honour Guard',
            act: 3,
            type: 'combat',
            coordinates: { x: 76, y: 46 },
            environment: 'volcano',
            readAloud: `Towering fluted columns of vitrified black obsidian rise forty feet to support the smoking ceiling of this grand hall, framing a colossal archway that blazes like the throat of a blast furnace. The basalt floor is drifted ankle-deep in warm grey ash and littered with the melted breastplates of fallen knights. Suspended by iron chains beside the archway hangs a six-foot brass gong embossed with a coiled wyrm. High atop the twin gate-pillars, two soot-crusted stone Gargoyles unfold jagged wings with a grinding shriek of rock on rock, while below them, a scarred warlord in crimson dragonscale mail lowers a flaming halberd across the threshold: "Kneel and become ash for the Cinder Tyrant!"`,
            dmNotes: 'Penultimate Guardian Chamber! Pyre-Lord Malrik is the fanatical commander of Voranthos\'s mortal cult, flanked by two elemental Gargoyles animated from volcanic stone. On Round 1, Malrik attempts to strike the suspended brass gong to alert Voranthos; a fast or stealthy hero who severs the gong\'s suspension chain (Stealth DC 13) prevents the alarm from echoing into the caldera.',
            companionMoments: [
                {
                    companionName: 'Valerius',
                    matchClass: 'paladin',
                    matchRace: 'human',
                    text: 'Valerius steps forward through the swirling ash, his blade raised in challenge toward Pyre-Lord Malrik\'s crimson scale-mail. "A mortal who wears the shed scales of a tyrant is no lord—only a collared hound! Stand aside, traitor, or fall before the judgment of the realm!"'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax\'s eyes flick immediately to the six-foot brass gong hanging by rusted links beside the furnace arch. "Keep that scale-plated fanatic busy for three heartbeats—if he rings that dinner bell, the big red lizard inside will roast us before we even step through the door!"'
                }
            ],
            encounter: {
                title: 'Obsidian Gargoyles & Dragon-Sworn Champion',
                difficulty: 'High',
                xpReward: 650,
                monsters: [
                    { monsterId: 'gargoyle', name: 'Obsidian Winged Gargoyle', count: 2 },
                    { monsterId: 'cult-fanatic', name: 'Pyre-Lord Malrik', count: 1 }
                ],
                tacticalNotes: 'The Gargoyles swoop down from the pillars while Pyre-Lord Malrik tries to strike the brass alarm gong.',
                terrainFeature: 'Fluted Obsidian Pillars & Brass Alarm Gong'
            },
            loot: {
                gold: 140,
                items: [
                    {
                        id: 'crimson_scale_shield',
                        name: 'Dragon-Scale Bulwark Shield (+2)',
                        type: 'shield',
                        rarity: 'Rare',
                        bonus: 2,
                        description: 'Fashioned from shed scales of Voranthos; provides +2 AC bonus and deflects fiery blasts.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'sabotage_alarm_gong',
                    label: 'Dart through the pillar shadows and sever the brass alarm gong\'s chain (Stealth DC 13)',
                    type: 'skillCheck',
                    skill: 'stealth',
                    ability: 'dexterity',
                    dc: 13,
                    successText: 'Moving like a smoke-wraith between the fluted obsidian columns, you leap up the pedestal and shear through the top iron link with a single silent stroke! You catch the heavy brass rim in your cloak and ease the gong noiselessly into a deep drift of volcanic ash before Pyre-Lord Malrik can reach his mallet.',
                    failText: 'Your blade severs the iron suspension chain, but the heavy brass disc clips the obsidian pillar as it drops—sending a low, resonant hum shivering through the archway before the gong buries itself in the ash!'
                },
                {
                    id: 'enter_voranthos_caldera',
                    label: 'Stride through the blazing archway into the Heart of the Caldera (Boss Lair)',
                    type: 'move',
                    targetNodeId: 'voranthos_caldera'
                },
                {
                    id: 'fall_back_dwarven_armory',
                    label: 'Withdraw down the stone stair to the Dwarven Armory',
                    type: 'move',
                    targetNodeId: 'dwarven_armory'
                },
                {
                    id: 'fall_back_magma_bridge',
                    label: 'Retreat across the chasm to the Magma Bridge',
                    type: 'move',
                    targetNodeId: 'magma_bridge'
                }
            ]
        },
        voranthos_caldera: {
            id: 'voranthos_caldera',
            title: '8. The Heart of the Caldera — Lair of Voranthos',
            act: 4,
            type: 'boss',
            coordinates: { x: 90, y: 46 },
            environment: 'volcano',
            readAloud: `You step through the obsidian arch into a titanic volcanic amphitheater open to a churning vortex of ash clouds and dry crimson lightning far overhead. Around the jagged perimeter, rivers of white-hot magma bubble and hiss against cracked basalt columns that groan under tremendous geothermal pressure. Rising from the center of the molten lake is a black stone island heaped high with a king's ransom of half-melted gold coins, jeweled chalices, royal crowns, and glittering rubies. Coiled atop that blazing mountain of plunder rests Voranthos the Cinder Tyrant—a colossal red wyrm whose overlapping scales gleam like freshly hammered copper and whose Bat-like wings span the breadth of the crag. White smoke curls from his flared nostrils as his golden slit-pupils lock onto your company, and a furnace-roar rolls from his jaws that shakes loose cascades of gravel from the cliffs: "More tin-clad insects crawling into my kiln? Come, then—let your bones feed my fire and your steel melt into my throne!"`,
            dmNotes: 'Climax Boss Battle! Voranthos the Cinder Tyrant fights with terrifying arrogance and fury, opening with a devastating cone of Fire Breath before taking wing between the fractured basalt columns around the magma lake. On Initiative count 20, the dragon slams his tail into the caldera floor to rupture geothermal fissures, sending up blinding geysers of magma and sulfur (Dexterity Save DC 14). Tactical Environment: The massive basalt pillar beside the hoard island is deeply fractured at its base—a hero who braces against the heat and heaves with titanic might (Athletics DC 14) can topple the column straight across Voranthos\'s wing to pin the wyrm to the stone!',
            companionMoments: [
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick beats the flat of his sword against his shield, his battle-cry echoing across the bubbling magma lake. "For Ashford and the fallen Vanguard! Spread your formation between the basalt pillars so his breath cannot catch us all in a single blast—strike for the throat!"'
                },
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn raises his warhammer toward the lightning-torn crater sky as golden radiance sheaths the party\'s armor. "Two hundred years Clan Ironhelm waited for this hour, you overgrown furnace-lizard! By Moradin\'s hammer, we\'re taking back the mountain and every coin you stole!"'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra\'s eyes blaze with arcane starlight as she weaves a shimmering ward of frost around her companions. "Look at the stress-fractures at the base of that eastern basalt column! When the wyrm lands on the hoard edge, topple that pillar across his wing and ground him for good!"'
                },
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina lifts her holy symbol high against the dragon\'s shadow, her voice clear and unyielding above the roar of the volcano. "Fear not the tyrant\'s flame, champions! Stand fast in the Dawn\'s grace, and today this monster\'s reign of ash ends forever!"'
                }
            ],
            encounter: {
                title: 'Voranthos the Cinder Tyrant',
                difficulty: 'Boss',
                xpReward: 1800,
                monsters: [
                    { monsterId: 'young-red-dragon', name: 'Voranthos the Cinder Tyrant', count: 1 }
                ],
                tacticalNotes: 'Voranthos opens with Fire Breath (16d6 or scaled to party level), uses basalt pillars for cover while recharging, and triggers volcanic vents on Initiative count 20.',
                terrainFeature: 'Volcanic Steam Geysers & Basalt Pillars (Three-Quarters Cover)'
            },
            trapOrHazard: {
                name: 'Lair Action: Volcanic Magma Geyser & Sulfur Cloud',
                trigger: 'Voranthos slamming his tail into the caldera floor to rupture a geothermal fissure.',
                detectSkill: 'perception',
                detectDc: 14,
                disarmSkill: 'athletics',
                disarmDc: 14,
                saveAbility: 'dexterity',
                saveDc: 14,
                damageDice: '2d8',
                damageType: 'fire',
                condition: 'Blinded',
                description: 'A geyser of white-hot magma and blinding sulfurous ash erupts from the fractured basalt floor.'
            },
            loot: {
                gold: 1200,
                items: [
                    {
                        id: 'crown_of_ashford_tribute',
                        name: 'The Royal Crown Chest of Ashford',
                        type: 'quest',
                        rarity: 'Legendary',
                        description: 'The stolen royal tribute of the realm—redeemable at the capital for noble titles and a barony.'
                    },
                    {
                        id: 'flame_tongue_greatsword',
                        name: 'Ignis, Flame Tongue Greatsword (+2)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 2,
                        damageDice: '2d6',
                        description: 'Speak its command word to wreathe the blade in roaring dragonfire (+2 attack/damage and +2d6 fire damage).'
                    },
                    {
                        id: 'armor_of_invulnerability_scale',
                        name: 'Voranthos\'s Sovereign Dragonscale Mail (+2)',
                        type: 'armor',
                        rarity: 'Rare',
                        bonus: 2,
                        baseAc: 16,
                        description: 'Suit of crimson dragonscale armor conferring AC 16 + DEX (max 2) and immunity to extreme heat.'
                    }
                ]
            },
            restAvailable: 'long',
            choices: [
                {
                    id: 'topple_basalt_pillar',
                    label: 'Drive your shoulders into the fractured basalt column to crush Voranthos\'s wing (Athletics DC 14)',
                    type: 'skillCheck',
                    skill: 'athletics',
                    ability: 'strength',
                    dc: 14,
                    successText: 'Planting your boots in the smoking ash, you heave with every fiber of your strength against the heat-cracked stone column! With a report like a thunderclap, forty tons of jagged black basalt shear from their base and crash squarely across Voranthos\'s outstretched wing—pinning the roaring Cinder Tyrant to the hoard floor!',
                    failText: 'The blistering stone column groans and showers red-hot sparks as you strain against its weight, refusing to shear free! Voranthos lashes out with a sweep of his horned tail, forcing you to dive sideways across the scorching rock.',
                    failDamageDice: '1d8'
                },
                {
                    id: 'plunder_dragon_hoard',
                    label: 'Search the smoking heart of Voranthos\'s hoard for legendary relics (Investigation DC 13)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 13,
                    successText: 'Parting cascades of smoking gold sovereigns and rubies with your scabbard, you uncover the untouched core of the wyrm\'s treasury: the sealed Royal Tribute Chest of Ashford, a suit of Sovereign Crimson Dragonscale Mail, and the legendary +2 Flame Tongue greatsword Ignis!',
                    failText: 'Half-melted coins blister your gauntlets through the leather as you shovel mounds of gold and gems into your packs, claiming five hundred sovereigns from the smoking heap before the heat forces you back.',
                    rewardGold: 500
                },
                {
                    id: 'return_antechamber',
                    label: 'March triumphantly out of the caldera into the Obsidian Antechamber',
                    type: 'move',
                    targetNodeId: 'obsidian_antechamber'
                }
            ]
        }
    }
};

export const dragonLairAdventure = dragonLair;
export default dragonLair;
