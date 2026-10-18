// Living Module: ancientTemple
// Prose authored for MythicBot. Node ids, mechanics and links must stay stable.

export const ancientTemple = {
        id: 'ancient-temple',
        name: 'Secrets of the Sleeping God',
        description: 'Hack through the steaming abyss of the Kha\'zar Jungle to breach a ten-thousand-year-old Azlanti ziggurat, outwit celestial mechanisms of star-metal, and stop a fanatical Yuan-ti coven from waking an astral leviathan.',
        difficulty: 'Advanced',
        estimatedTime: '5-7 hours',
        tags: ['Exploration', 'Puzzle', 'Ancient'],
        setting: 'The Jungle of Kha\'zar',
        openingNarrative: `Strangler figs as thick as ship masts choke the stepped pyramid of Xul-Khorath, known in the forbidden vaults of Candlekeep only as the Temple of the Sleeping God. Warm monsoon rain hisses against slabs of green volcanic jade and tarnished electrum, sending ribbons of steam curling into the bruised emerald twilight of the Kha'zar canopy.

For three grueling weeks you have followed the translations of Loremaster Elio Vance and Archivist Savra, hacking through viper-infested sinkholes where the compass needle spins wildly and the stars reflected in stagnant pools do not match the sky above. Ten millennia ago, the star-faring Azlanti Empire constructed this ziggurat as a cosmic lock—an Astral Engine designed to keep an elder entity dreaming beneath the crust of the world.

Now the jungle around the plaza has gone deathly silent; not a single cicada or howler monkey dares make a sound. Freshly shed serpent scales, wide as a man's palm and slick with Abyssal ichor, trail up the moss-slick causeway toward the monumental bronze-and-jade portal.

As your boots touch the lowest terrace, the celestial glyphs carved into the Cyclopean doors flare with cold sapphire starlight, and deep within the stone mountain, a heart of brass gears begins to beat.

What do you do?`,
        icon: '🏛️',
        recommendedLevel: 3,
        levelRange: 'Levels 3–5',
        patron: {
            name: 'Loremaster Elio Vance',
            role: 'Candlekeep Senior Archivist',
            attitude: 'Friendly',
            description: 'A venerable Candlekeep scholar with ink-stained fingers and a brass astrolabe monocle, accompanied by field epigrapher Archivist Savra at the base camp beneath the ziggurat steps.'
        },
        primaryVillain: {
            name: 'High Priestess Ssethra',
            monsterId: 'yuan-ti-abomination',
            title: 'Herald of the Coiled Star',
            motivation: 'Infiltrated the Temple of the Sleeping God with her Coiledfang Yuan-ti coven to corrupt the Azlanti Astral Engine and birth an apocalyptic serpent-god from the dreaming titan.'
        },
        treasureTheme: 'Arcana',
        ambientTrack: 'jungle',
        startNodeId: 'ziggurat_gates',
        nodes: {
            ziggurat_gates: {
                id: 'ziggurat_gates',
                title: '1. Threshold of the Ziggurat — Awakened Stone Guardians',
                act: 1,
                type: 'combat',
                coordinates: { x: 12, y: 50 },
                environment: 'jungle',
                readAloud: `Strangler figs and weeping curtains of crimson orchids drape the stepped pyramid of Xul-Khorath as shafts of humid sunlight spear through the steaming canopy. Across the rain-slick courtyard of fitted jade flagstones, monumental doors of green bronze pulse with constellations that slowly drift across the metal like living stars. The air smells sharply of ozone, crushed fern, and ancient copper heated by an unseen furnace. Flanking the threshold stand two twelve-foot jaguar-headed panoply suits of solar bronze, their hollowed chests ticking with clockwork pendulums. As your shadows fall across the sun-mosaic at the top of the stairs, white-hot solar fire ignites within the guardians' eye slits and their twin halberds sweep down with a metallic shriek!`,
                dmNotes: 'Environmental & Lore Notes: The sun-mosaic on the terrace is inscribed in High Azlanti cuneiform. Speaking the formal oath of the Star-Seekers from the Candlekeep Codex (History or Arcana DC 12) causes the resonant chimes in the bronze doors to harmonize, pacifying one Azlanti Solar-Bronze Sentinel immediately and unsealing both the Northern Hall (Trial of Body) and Southern Rotunda (Trial of Mind). Tactically, the constructs march in relentless phalanx formation, using Shove attacks to hurl intruders down the slippery moss-covered steps (DC 12 Dexterity save or fall prone at the base of the terrace).',
                companionMoments: [
                    {
                        companionName: 'Sylva Whisperwind',
                        matchClass: 'druid',
                        matchRace: 'elf',
                        text: 'Sylva kneels beside a crushed fern at the edge of the terrace, lifting a translucent shed scale that smells of bitter venom. "The jungle hasn\'t gone quiet out of respect—every bird and beast within a league is terrified. Cold-blooded abominations slithered through these gates hours before us, and the stone itself is feverish with unnatural magic."'
                    },
                    {
                        companionName: 'Kaelen Shadowbow',
                        matchClass: 'ranger',
                        matchRace: 'wood-elf',
                        text: 'Kaelen notches an arrow and traces the gouges where heavy serpentine tails dragged across the wet moss. "Count the tracks—at least a dozen Yuan-ti scale-hunters and something massive enough to crack the jade paving stones. Watch the flanking pillars; these bronze cats weren\'t built to bluff."'
                    },
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: 'Lyra\'s fingers tremble with awe as she adjusts her spectacles to read the drifting constellations on the doors. "Pre-Spellplague star-forging! Those bronze plates are bound to a subterranean ley-reactor—if we intone the High Azlanti cadence of worthy seekers, the constructs may recognize us as initiates rather than grave-robbers!"'
                    }
                ],
                npcs: [
                    {
                        id: 'loremaster_elio_vance',
                        name: 'Loremaster Elio Vance',
                        role: 'Candlekeep Expedition Scholar',
                        attitude: 'Friendly',
                        dialogue: '"By the First Folio of Oghma, look at the articulation on those solar-bronze plates! Listen closely while I hold the rubric open—my colleague Archivist Savra decoded the outer lintel just before the rain broke: the Northern Corridor tests the mortal vessel with scything star-metal, where only the green jade sun-tiles bear a traveler\'s weight, while the Southern Rotunda tests the intellect with refracted starlight! Speak the High Azlanti greeting clearly, or those constructs will cleave us in twain!"',
                        influenceDc: 11,
                        influenceSkill: 'history',
                        secretInfo: 'Shares Archivist Savra\'s full translation of the Celestial Astrolabe rubric: "Align the Golden Sun to the Zenith, the Silver Moon to the Nadir of the Deep, and the Violet Comet toward the Sleeping Throne." Also hands over his sapphire reading lens to decipher internal sanctum wards.',
                        rewardItem: {
                            id: 'candlekeep_translation_lens',
                            name: 'Candlekeep Sapphire Reading Lens',
                            type: 'quest',
                            rarity: 'Uncommon',
                            description: 'A star-sapphire loupe etched with Candlekeep cyphers that translates ancient Azlanti star-glyphs throughout the temple.'
                        }
                    },
                    {
                        id: 'archivist_savra',
                        name: 'Archivist Savra',
                        role: 'Field Epigrapher & Relic Warden',
                        attitude: 'Friendly',
                        dialogue: '"Elio sees only the glory of the Star-Priests, but I have read the obsidian warnings carved beneath the plinths. The Azlanti did not build a cathedral here—they built a prison for something that fell from the dark between the constellations. My brother, Mateo Vance, scouted ahead toward the lower aqueducts when the Yuan-ti war-horns sounded; please, if he still draws breath, bring him back from the deep!"',
                        influenceDc: 12,
                        influenceSkill: 'insight',
                        secretInfo: 'Reveals that the bronze sentinels\' knee joints lock briefly after every third halberd sweep, and warns that the Yuan-ti are siphoning solar energy from the upper halls to crack the inner seal.'
                    }
                ],
                encounter: {
                    title: 'Azlanti Bronze Sentinel Constructs',
                    difficulty: 'Moderate',
                    xpReward: 400,
                    monsters: [
                        { monsterId: 'animated-armor', name: 'Azlanti Solar-Bronze Sentinel', count: 2 }
                    ],
                    tacticalNotes: 'The bronze sentinels march in lockstep, attempting to push intruders down the stepped ziggurat while solar fire arcs between their halberds.',
                    terrainFeature: 'Moss-Slick Ziggurat Steps & Glowing Glyph Doors'
                },
                loot: {
                    gold: 60,
                    items: [
                        {
                            id: 'sun_jade_tablet',
                            name: 'Azlanti Sun-Jade Tablet',
                            type: 'quest',
                            rarity: 'Uncommon',
                            description: 'An engraved jade key-tablet depicting the three trials of Body, Mind, and Spirit.'
                        }
                    ]
                },
                restAvailable: 'short',
                choices: [
                    {
                        id: 'recite_azlanti_codex',
                        label: 'Intone the High Azlanti invocation of worthy star-seekers (History/Arcana DC 12)',
                        type: 'skillCheck',
                        skill: 'history',
                        ability: 'intelligence',
                        dc: 12,
                        successText: 'Your voice rings across the rain-lashed courtyard in the resonant cadence of a vanished empire. The sapphire constellations on the portal chime like crystal bells, and one of the towering jaguar-headed sentinels drops to a knee in solemn salute as the monumental bronze doors grind open! Within its open palm rests a tribute of ancient electrum sun-coins.',
                        failText: 'A syllable of the archaic tongue catches in your throat, twisting the invocation into a discordant rasp. The glyphs flare violent crimson, and both jaguar-headed sentinels level their white-hot solar spears in unison!',
                        rewardGold: 30
                    },
                    {
                        id: 'enter_shifting_blades',
                        label: 'Enter the Northern Corridor — The Hall of Pendulums (Trial of Body)',
                        type: 'move',
                        targetNodeId: 'shifting_blades'
                    },
                    {
                        id: 'enter_astrolabe_chamber',
                        label: 'Enter the Southern Rotunda — The Celestial Astrolabe (Trial of Mind)',
                        type: 'move',
                        targetNodeId: 'astrolabe_chamber'
                    }
                ]
            },
            shifting_blades: {
                id: 'shifting_blades',
                title: '2. Hall of Pendulums — Azlanti Trial of Body',
                act: 1,
                type: 'trap',
                coordinates: { x: 28, y: 24 },
                environment: 'temple',
                readAloud: `Colossal brass escapement wheels tick with deafening precision behind the slotted limestone walls of this hundred-foot vaulted gallery. Overhead, six crescent-shaped pendulums of mirror-bright star-metal swing in hypnotic counter-arcs, slicing the air with a rhythmic whistle that stirs the dust on the floor. Beneath their lethal shadows stretches a geometric mosaic of alternating emerald-jade and midnight-onyx tiles, bordered by a frieze of fanged serpent heads whose stone nostrils glisten with beads of oily green moisture. Halfway down the gauntlet, the headless torso of a Yuan-ti scout lies slumped across a sunken dark tile, its armor perforated by needle-thin darts. At the far end of the gallery, a sun-gold coffer gleams atop an elevated dais of white marble.`,
                dmNotes: 'Hidden Trap Mechanics & Clues: The dead Yuan-ti scout provides the key visual clue—every midnight-onyx tile is a counterweighted pressure trigger connected to pressurized venom reservoirs behind the serpent frieze, while the emerald-jade Sun-tiles are mortared directly into the bedrock. Stepping on an onyx tile or mistiming the three-beat cadence of the star-metal pendulums triggers a scything blade sweep and a crossfire of emerald-tipped darts. An adventurer who studies the gear-trains through the wall slots (Investigation or Perception DC 13) or vaults solely from jade tile to jade tile (Acrobatics DC 13) can reach the Trial Dais and pull the bronze arrestor lever, locking the entire clockwork gauntlet in place.',
                companionMoments: [
                    {
                        companionName: 'Nyx Nightbreeze',
                        matchClass: 'rogue',
                        matchRace: 'tiefling',
                        text: 'Nyx crouches low at the threshold, tossing a copper coin onto the nearest black onyx flagstone; instantly, three emerald darts spark off the opposite wall. "Cute. Ten thousand years old and the spring-tension hasn\'t rusted a fraction of an inch. Stick to the green jade sun-tiles and move on the third tick of that escapement wheel!"'
                    },
                    {
                        companionName: 'Ser Garrick Stoneheart',
                        matchClass: 'paladin',
                        matchRace: 'human',
                        text: 'Ser Garrick eyes the severed Yuan-ti corpse beneath the third pendulum with grim satisfaction. "Even High Priestess Ssethra\'s ambushers had to pay the toll in blood to cross this hall. Keep your shields angled toward the serpent frieze—I will draw the first volley if anyone slips."'
                    }
                ],
                trapOrHazard: {
                    name: 'Star-Metal Pendulums & Serpent Dart Frieze',
                    trigger: 'Stepping on an onyx tile or breaking stride between the counter-swinging pendulum arcs.',
                    detectSkill: 'perception',
                    detectDc: 13,
                    disarmSkill: 'sleight-of-hand',
                    disarmDc: 13,
                    saveAbility: 'dexterity',
                    saveDc: 13,
                    damageDice: '2d8',
                    damageType: 'slashing',
                    condition: 'Poisoned',
                    description: 'Scything blades of star-metal sweep the corridor while emerald darts fire from the carved walls.'
                },
                loot: {
                    gold: 95,
                    items: [
                        {
                            id: 'bracers_of_defense_azlanti',
                            name: 'Azlanti Sun-Gold Bracers of Defense (+1)',
                            type: 'wondrous',
                            rarity: 'Rare',
                            bonus: 1,
                            description: 'Filigreed star-gold bracers awarded to champions of the Trial of Body (+1 AC and saving throws).'
                        }
                    ]
                },
                restAvailable: 'none',
                choices: [
                    {
                        id: 'dash_pendulum_hall',
                        label: 'Count the three-beat gear cadence and vault across the emerald jade tiles (Acrobatics/Athletics DC 13)',
                        type: 'skillCheck',
                        skill: 'acrobatics',
                        ability: 'dexterity',
                        dc: 13,
                        successText: 'Timing your leaps to the resonant heartbeat of the brass escapement wheels, you weave through the whistling crescent blades without touching a single onyx trigger-stone! With a final vault onto the marble dais, you slam the master arrestor lever home—locking the star-metal pendulums overhead with a thunderous clank and popping the latch on the sun-gold coffer!',
                        failText: 'Your boot heel clips the corner of a sunken onyx tile just as the fourth star-metal pendulum whistles downward! The razor-sharp crescent slices across your shoulder pauldron and a needle-dart hisses past your cheek before you throw yourself across the dais threshold!',
                        failDamageDice: '1d8',
                        rewardGold: 50
                    },
                    {
                        id: 'advance_sunken_cenote',
                        label: 'Descend the wet limestone stairs into the Bioluminescent Cenote',
                        type: 'move',
                        targetNodeId: 'sunken_cenote'
                    },
                    {
                        id: 'cross_to_astrolabe',
                        label: 'Take the connecting colonnade to the Celestial Astrolabe chamber',
                        type: 'move',
                        targetNodeId: 'astrolabe_chamber'
                    },
                    {
                        id: 'return_ziggurat_gates',
                        label: 'Return to the Ziggurat Threshold',
                        type: 'move',
                        targetNodeId: 'ziggurat_gates'
                    }
                ]
            },
            astrolabe_chamber: {
                id: 'astrolabe_chamber',
                title: '3. Chamber of the Celestial Astrolabe — Trial of Mind',
                act: 2,
                type: 'puzzle',
                coordinates: { x: 36, y: 68 },
                environment: 'temple',
                readAloud: `A lance of blinding tropical sunlight plunges through a crystal oculus in the vaulted dome, striking a twenty-foot gyroscopic astrolabe of tarnished orichalcum and star-metal suspended above a black mirror pool. Three concentric rings set with massive cut lenses—a blazing topaz Sun, a pale selenite Moon, and a jagged amethyst Comet—orbit a levitating sphere of dark meteorite iron. Whenever the rings drift on their counterweights, refracted beams of gold, silver, and violet sweep across star-charts carved into the curved obsidian walls. The air hums like a rubbed crystal goblet and tastes faintly of silver and ozone. Around the rim of the reflecting basin runs a glowing High Azlanti epigram: "When the Golden Sun crowns the Zenith, the Silver Moon guards the Deep, and the Comet points toward the Sleeping Throne, the Star-Way shall open."`,
                dmNotes: 'Puzzle Mechanics & Secret Consequences: The three brass crank-wheels around the basin rotate the Topaz Sun ring, Selenite Moon ring, and Amethyst Comet ring independently. Notice the scorch marks on the obsidian wall where a Yuan-ti ritualist forced the rings out of alignment—rotating a ring past the serpent-head stops without aligning the Zenith/Nadir sequence causes the meteorite core to discharge a searing flash of ultraviolet radiation (1d6 radiant damage). Aligning the three lenses (Arcana or Investigation DC 13, or automatic advantage if the party consulted Loremaster Elio Vance at the gates) focuses a coherent beam of prismatic starlight against the eastern wall, dissolving the illusion over the Star-Glass Archive portal and condensing an Astral Pearl in the pool.',
                companionMoments: [
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: 'Lyra drops her pack and traces the obsidian star-charts with breathless reverence. "Look at the ecliptic arc—these constellations were carved before the Tear of Selûne! My entire thesis at the Blackstaff Academy was missing the thirteenth zodiac house: the Coiled Leviathan that the Azlanti locked beneath the nadir!"'
                    },
                    {
                        companionName: 'Brother Brynn Ironforge',
                        matchClass: 'cleric',
                        matchRace: 'dwarf',
                        text: 'Brother Brynn squints through the refracted beams of topaz and selenite, resting a calloused hand on the bronze vernier scale. "Dwarven master-smiths would weep to see counterweights balanced to a single grain of sand after ten millennia. Turn the sun-wheel clockwise to the crown mark—I\'ll hold the moon-gear against the back-tension!"'
                    }
                ],
                loot: {
                    gold: 80,
                    items: [
                        {
                            id: 'pearl_of_power_azlanti',
                            name: 'Astral Pearl of Spell Recall',
                            type: 'wondrous',
                            rarity: 'Rare',
                            bonus: 1,
                            description: 'A luminous celestial pearl condensed from the astrolabe\'s focus; enhances arcane power (+1).'
                        }
                    ]
                },
                restAvailable: 'short',
                choices: [
                    {
                        id: 'align_celestial_lenses',
                        label: 'Rotate the Sun, Moon, and Comet rings into true celestial alignment (Arcana/Investigation DC 13)',
                        type: 'puzzle',
                        skill: 'arcana',
                        ability: 'intelligence',
                        dc: 13,
                        successText: 'As the topaz Sun locks at the highest zenith, the selenite Moon sinks beneath the dark mirror pool, and the amethyst Comet aims straight toward the heart of the mountain, the entire rotunda rings with a chord of pure celestial harmony! A beam of diamond-white starlight lances through all three lenses, parting the solid obsidian wall into a shimmering portal while a condensed Astral Pearl rises from the basin on a pedestal of golden light!',
                        failText: 'The vernier gears grind as the amethyst lens slips past its alignment notch, crossing the solar beam at an acute angle! A blinding flare of ultraviolet star-fire erupts from the meteorite core, scorching your retinas before the heavy counterweights settle into the proper groove.',
                        failDamageDice: '1d6',
                        rewardGold: 50
                    },
                    {
                        id: 'enter_azlanti_library',
                        label: 'Step through the starlight portal into the Archive of Star-Glass',
                        type: 'move',
                        targetNodeId: 'azlanti_library'
                    },
                    {
                        id: 'enter_sunken_cenote_from_astrolabe',
                        label: 'Follow the subterranean aqueduct into the Bioluminescent Cenote',
                        type: 'move',
                        targetNodeId: 'sunken_cenote'
                    },
                    {
                        id: 'return_ziggurat_from_astrolabe',
                        label: 'Return to the Ziggurat Threshold',
                        type: 'move',
                        targetNodeId: 'ziggurat_gates'
                    }
                ]
            },
            sunken_cenote: {
                id: 'sunken_cenote',
                title: '4. The Bioluminescent Cenote — Sunken Causeway',
                act: 2,
                type: 'combat',
                coordinates: { x: 52, y: 28 },
                environment: 'cavern',
                readAloud: `Bioluminescent spores drift across the black subterranean cenote like drowned stars, casting an eerie cyan glow over a cavern the size of a cathedral. Knee-deep water laps across a fractured causeway of white marble that bridges the underground lagoon, flanked by the half-submerged coils of toppled winged-serpent colossi. Thick curtains of calcified tree roots hang from the sinkhole ceiling fifty feet above, dripping mineral water that echoes like slow footsteps in the gloom. Clinging to a broken pillar near the shore is a wounded half-elf explorer in a torn Candlekeep surcoat, frantically gesturing toward the dark water. Before he can shout a warning, the mirror-still surface erupts in phosphorescent spray as a cobra-headed Yuan-ti Malison rises from behind a drowned statue and monstrous web-stalkers drop on silken cables from the root-choked dome!`,
                dmNotes: 'Tactical & Secret Notes: This is the vanguard of High Priestess Ssethra\'s Coiledfang brood. The marble causeway is slick with luminescent algae; moving at more than half speed across the submerged sections requires a DC 10 Dexterity (Acrobatics) check or the creature falls prone in the water. Beneath the largest patch of glowing lotus pads (15 feet deep) lies an ancient Azlanti offering basin untouched by the Yuan-ti because of the silver sun-sigils etched into its rim. Rescuing Explorer Mateo Vance after clearing the ambush reveals critical intelligence on the Blood Altar ahead.',
                companionMoments: [
                    {
                        companionName: 'Kaelen Shadowbow',
                        matchClass: 'ranger',
                        matchRace: 'wood-elf',
                        text: 'Kaelen snaps his bowstring taut, sending a whistling shaft into the root-curtains overhead to sever a spider\'s dragline. "Eyes on the ceiling AND the water! Classic Coiledfang pincer—the scale-hunter pins you on the narrow marble with poisoned arrows while the canopy spiders reel you into the deep!"'
                    },
                    {
                        companionName: 'Sylva Whisperwind',
                        matchClass: 'druid',
                        matchRace: 'elf',
                        text: 'Sylva gazes into the glowing blue-green lotus pads floating across the black lagoon. "These star-lotuses only bloom over pure geothermal springs blessed by the ancient sun-priests. Whatever corruption Ssethra is working higher up the temple hasn\'t poisoned the deepest roots of the cenote yet."'
                    }
                ],
                npcs: [
                    {
                        id: 'explorer_mateo_vance',
                        name: 'Explorer Mateo Vance',
                        role: 'Wounded Candlekeep Cartographer',
                        attitude: 'Friendly',
                        dialogue: '"Gods above, Savra sent you! Keep low—that Malison\'s arrows burn like liquid fire in the veins! I trailed High Priestess Ssethra\'s war-party up the northern steps to the Solar Chapel, where they\'ve erected a green jade siphon-pillar to bleed the temple\'s wards dry. If you don\'t smash that siphon before entering the Astral Engine, her barrier will be nigh impenetrable!"',
                        influenceDc: 11,
                        influenceSkill: 'medicine',
                        secretInfo: 'Points out the sunken Azlanti offering basin directly beneath the brightest cluster of cyan lotus blossoms, where an enchanted Jade Serpent Scale Shield rests among gold sun-discs.'
                    }
                ],
                encounter: {
                    title: 'Coiledfang Lagoon Vanguard',
                    difficulty: 'Moderate',
                    xpReward: 550,
                    monsters: [
                        { monsterId: 'yuan-ti-malison', name: 'Yuan-ti Malison Scale-Hunter', count: 1 },
                        { monsterId: 'giant-spider', name: 'Jungle Canopy Web-Stalker', count: 2 }
                    ],
                    tacticalNotes: 'The Yuan-ti Malison fires poison-tipped longbow shots from three-quarters cover behind the sunken serpent statue while the canopy spiders attempt to restrain party members on the flooded causeway.',
                    terrainFeature: 'Half-Submerged Marble Causeway & Glowing Lotus Lagoon'
                },
                loot: {
                    gold: 110,
                    items: [
                        {
                            id: 'serpent_scale_buckler',
                            name: 'Jade Serpent Scale Shield (+1)',
                            type: 'shield',
                            rarity: 'Uncommon',
                            bonus: 1,
                            description: 'Light, waterproof shield crafted from iridescent emerald scales (+1 AC bonus).'
                        }
                    ]
                },
                restAvailable: 'none',
                choices: [
                    {
                        id: 'dive_sunken_shrine',
                        label: 'Plunge beneath the bioluminescent lotus pads to search the sunken offering basin (Athletics DC 12)',
                        type: 'search',
                        skill: 'athletics',
                        ability: 'strength',
                        dc: 12,
                        successText: 'Kicking down through clouds of glowing cyan spores, you follow the silver sun-sigils to a carved marble basin twenty feet below the causeway. Ignoring the icy pressure in your ears, you wrench an iridescent Jade Serpent Scale Shield free from the silt along with a heavy leather pouch of ancient gold sun-discs!',
                        failText: 'The freezing subterranean current tugs at your cloak and your lungs burn like hot coals in the dark water. You manage to scoop a handful of stamped gold sun-discs from the rim of the basin before kicking desperately back to the surface for air.',
                        rewardGold: 60
                    },
                    {
                        id: 'advance_serpent_altar',
                        label: 'Ascend the blood-stained steps toward the Serpent Altar',
                        type: 'move',
                        targetNodeId: 'serpent_altar'
                    },
                    {
                        id: 'cross_to_azlanti_library',
                        label: 'Take the dry marble gallery into the Archive of Star-Glass',
                        type: 'move',
                        targetNodeId: 'azlanti_library'
                    },
                    {
                        id: 'return_shifting_blades',
                        label: 'Return to the Hall of Pendulums',
                        type: 'move',
                        targetNodeId: 'shifting_blades'
                    }
                ]
            },
            azlanti_library: {
                id: 'azlanti_library',
                title: '5. Archive of Star-Glass — The Spectral Archivist',
                act: 3,
                type: 'social',
                coordinates: { x: 56, y: 74 },
                environment: 'temple',
                readAloud: `Ten thousand faceted prisms of sapphire, amber, and smoky star-glass line the curving galleries of this subterranean Rotunda, humming with a haunting three-part harmonic chord. Rather than parchment scrolls, the Azlanti recorded their history inside living lattices of light that flicker with ghostly scenes of flying citadels and falling stars as you walk past. At the center of the chamber rises a dais of snow-white quartz where two overlapping crystalline projections hover: Savant Oros, the last High Archivist, and the starry-eyed Echo of First Astronomer Kaelos. Shards of shattered memory-crystals crunch underfoot where Yuan-ti defilers smashed the outer shelves in their hunt for the Engine codes. As you approach the quartz dais, the twin projections turn their luminous golden eyes upon you, and their layered voices resonate directly inside your skulls: "Ten millennia have we kept vigil over the Dreamer in the Deep—speak now, children of the young world, do you bear the scales of the Devourer, or do you stand as wardens of the Waking Sky?"`,
                dmNotes: 'Roleplay & Trial of Spirit Mechanics: The memory-matrix of Savant Oros and First Astronomer Kaelos is fracturing under the strain of High Priestess Ssethra\'s siphon in the adjacent chapel. This encounter represents the Azlanti Trial of Spirit. Approaching with reverence and swearing to preserve the cosmic seal (Persuasion, Arcana, or Religion DC 13) stabilizes their harmonic lattice. In gratitude, they bestow the Azlanti Astral Command Rod, teach the override phrase ("Aethel-Sol-Vara") that reclaims the corrupted Helmed Horror in Node 8, and unseal the hidden star-door to the Reliquary of the Star-Priests (Node 7).',
                companionMoments: [
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: 'Lyra steps onto the quartz dais, tears shining in her violet eyes as she converses in halting High Azlanti with the Echo of First Astronomer Kaelos. "You didn\'t conquer a god—you sacrificed your entire civilization\'s astral network to sing it to sleep! Swear to me we won\'t let these serpent-cultists undo ten thousand years of vigil."'
                    },
                    {
                        companionName: 'Nyx Nightbreeze',
                        matchClass: 'rogue',
                        matchRace: 'tiefling',
                        text: 'Nyx picks up a cracked amber prism from the floor and watches a miniature illusion of a burning sky play across her palm. "I\'ve cracked guild vaults from Baldur\'s Gate to Calimport, and I\'ve never seen a memory-cipher like this. Look at Kaelos\'s projection—he\'s pointing straight at the command rod\'s resonance key."'
                    },
                    {
                        companionName: 'Vaelen Songweaver',
                        matchClass: 'bard',
                        matchRace: 'half-elf',
                        text: 'Vaelen plucks a gentle triad on his lute that matches the exact pitch of the sapphire prisms, causing the fractured hologram to sharpen into crystal clarity. "Their history isn\'t written in ink—it\'s written in harmonic intervals! Let me harmonize with the Archivist\'s cadence while you make our pledge."'
                    }
                ],
                npcs: [
                    {
                        id: 'savant_oros_projection',
                        name: 'Savant Oros & Echo of First Astronomer Kaelos',
                        role: 'Spectral Archivists of the Sleeping God',
                        attitude: 'Friendly',
                        dialogue: '"Listen well, before our crystal matrix shatters under the serpent-priestess\'s siphon! When the Coiled Star fell from the void in the First Age, neither blade nor spell could slay it—so Kaelos and I wove the Astral Engine to cradle its mind in an eternal dream of golden suns. Now High Priestess Ssethra feeds nightmare venom into the gyroscope and has bound our Helmed Horror sentinel with Abyssal chains! Take this Astral Command Rod, and in the Engine Sanctum cry out \'Aethel-Sol-Vara!\' to burn away her corruption and turn our iron guardian against the defilers!"',
                        influenceDc: 13,
                        influenceSkill: 'arcana',
                        secretInfo: 'Bestows the Astral Command Phrase ("Aethel-Sol-Vara") that overrides the Corrupted Azlanti Helmed Horror in the climax battle, and reveals the harmonic chord that unlocks the Reliquary of the Star-Priests.',
                        rewardItem: {
                            id: 'astral_command_rod',
                            name: 'Azlanti Astral Command Rod (+2 Wand)',
                            type: 'wand',
                            rarity: 'Rare',
                            bonus: 2,
                            damageDice: '2d8',
                            description: 'Crystalline command scepter of the High Archivist; channels star-fire (2d8 radiant) and commands Azlanti constructs.'
                        }
                    }
                ],
                loot: {
                    gold: 90,
                    items: [
                        {
                            id: 'scroll_of_greater_restoration_azlanti',
                            name: 'Star-Glass Tablet of Arcane Mending',
                            type: 'potion',
                            rarity: 'Rare',
                            healDice: '4d4+4',
                            description: 'Shattering this harmonic crystal bathes the bearer in golden light, restoring 4d4+4 Hit Points.'
                        }
                    ]
                },
                restAvailable: 'short',
                choices: [
                    {
                        id: 'commune_savant_oros',
                        label: 'Swear the Oath of the Waking Sky and pass the Trial of Spirit (Arcana/Persuasion DC 13)',
                        type: 'social',
                        skill: 'persuasion',
                        ability: 'charisma',
                        dc: 13,
                        successText: 'Your words resonate with the pure harmonic chord of the sapphire prisms, steadying the flickering projections of Savant Oros and First Astronomer Kaelos. Both ancient spirits bow with hands pressed to their brows: "Worthy heirs of the star-vigil! Bear our Astral Command Rod into the heart of the Engine, and enter the sacred Reliquary of the Star-Priests with our eternal blessing!" A seamless wall of star-glass parts to reveal the warded sanctuary beyond.',
                        failText: 'Arcane static crackles through the damaged quartz matrix as your cadence wavers, causing Kaelos\'s echo to dissolve in a shower of golden sparks. With a final strained gesture, Savant Oros forces the secret door to the Reliquary open before his hologram fades into dormancy.',
                        rewardGold: 60
                    },
                    {
                        id: 'enter_astral_relichall',
                        label: 'Enter the unlocked Reliquary of the Star-Priests',
                        type: 'move',
                        targetNodeId: 'astral_relichall'
                    },
                    {
                        id: 'move_to_serpent_altar',
                        label: 'Ascend the northern gallery to confront the Serpent Altar',
                        type: 'move',
                        targetNodeId: 'serpent_altar'
                    },
                    {
                        id: 'return_astrolabe_from_library',
                        label: 'Return to the Celestial Astrolabe chamber',
                        type: 'move',
                        targetNodeId: 'astrolabe_chamber'
                    }
                ]
            },
            serpent_altar: {
                id: 'serpent_altar',
                title: '6. Blood Altar of the Coiledfang — Yuan-ti Ritual',
                act: 3,
                type: 'combat',
                coordinates: { x: 70, y: 30 },
                environment: 'temple',
                readAloud: `Sickly emerald flames writhe inside bronze sacrificial braziers, filling this defiled Azlanti solar chapel with the suffocating stench of burning venom and copper blood. Banners of flayed serpent-skin bearing the sigil of High Priestess Ssethra hang over the shattered golden sun-mosaic on the high wall. In the center of the nave, an eight-foot obelisk of veined black-and-green jade has been driven like a spike directly into the temple's radiant ley-conduit, pulsing with stolen solar fire that flows through obsidian chains toward the inner sanctum doors. Chanting in guttural Abyssal around the siphon stand two cobra-hooded Yuan-ti Malisons and a fanatic Hierophant draped in living vipers. As the chapel doors swing wide, the Hierophant raises a curved star-metal scimitar stained with sacrifice and hisses, "Feed their warm blood to the Siphon—the Coiled Star hungers!"`,
                dmNotes: 'Tactical & Environmental Mechanics: The Jade Siphon-Pillar at the center of the chapel pulses on Initiative count 20, granting the Coiledfang cultists 5 temporary hit points per round while emitting a 10-foot aura of noxious green fumes. However, the siphon is structurally unstable from absorbing raw Azlanti solar energy! Toppling or overloading the jade obelisk (Arcana or Athletics DC 13) triggers a feedback wave of golden radiance that shatters the cultists\' necrotic shields and permanently weakens High Priestess Ssethra\'s ward in the Astral Engine room ahead.',
                companionMoments: [
                    {
                        companionName: 'Brother Brynn Ironforge',
                        matchClass: 'cleric',
                        matchRace: 'dwarf',
                        text: 'Brother Brynn\'s warhammer blazes with dawn-fire as he glares at the obsidian blood-chains anchoring the jade spike into the sun-mosaic. "By Moradin\'s anvil, they\'ve driven a parasitic spike straight into the temple\'s heart! Smash those chains before another drop of innocent blood feeds their foul ritual!"'
                    },
                    {
                        companionName: 'Ser Garrick Stoneheart',
                        matchClass: 'paladin',
                        matchRace: 'human',
                        text: 'Ser Garrick levels his greatsword at the Serpent-Sworn Hierophant, his voice booming over the Abyssal chant. "Your butcher\'s work ends here, serpent-spawn! Behind me, friends—I will cleave through their viper-priest while you bring that jade pillar crashing down!"'
                    }
                ],
                encounter: {
                    title: 'Coiledfang Ritual Cabal',
                    difficulty: 'High',
                    xpReward: 700,
                    monsters: [
                        { monsterId: 'yuan-ti-malison', name: 'Coiledfang Ritualist', count: 2 },
                        { monsterId: 'cult-fanatic', name: 'Serpent-Sworn Hierophant', count: 1 }
                    ],
                    tacticalNotes: 'The Yuan-ti Malisons cast Suggestion and fire poison arrows from behind the sacrificial braziers while the Hierophant channels necrotic shields around the siphon-pillar.',
                    terrainFeature: 'Jade Energy Siphon-Pillar & Venomous Braziers'
                },
                loot: {
                    gold: 160,
                    items: [
                        {
                            id: 'scimitar_of_speed_azlanti',
                            name: 'Solar-Edge Star-Metal Scimitar (+2)',
                            type: 'weapon',
                            rarity: 'Rare',
                            bonus: 2,
                            damageDice: '1d8',
                            description: 'A crescent blade of pure Azlanti star-metal recovered from the altar (+2 attack and damage rolls).'
                        }
                    ]
                },
                restAvailable: 'none',
                choices: [
                    {
                        id: 'shatter_jade_siphon',
                        label: 'Overload and shatter the Yuan-ti jade siphon-pillar (Arcana/Athletics DC 13)',
                        type: 'skillCheck',
                        skill: 'arcana',
                        ability: 'intelligence',
                        dc: 13,
                        successText: 'Driving your weapon into the fault-line where the obsidian chains meet the stolen ley-line, you reverse the polarity of the golden current! With a thunderous crack like a summer lightning bolt, the corrupt jade obelisk explodes into harmless emerald dust! Pure solar fire rushes back into the Azlanti mosaics, and a distant shriek of fury echoes from beyond the Great Solar Doors as High Priestess Ssethra\'s barrier collapses!',
                        failText: 'As you heave against the scalding jade column, a lash of venomous green lightning arcs from the obsidian chains and sears your forearms! Despite the agonizing shock, your weight snaps the base of the obelisk and severs the ritual conduit.',
                        failDamageDice: '1d8',
                        rewardGold: 50
                    },
                    {
                        id: 'descend_to_relichall',
                        label: 'Enter the sacred Reliquary of the Star-Priests to rest and prepare',
                        type: 'move',
                        targetNodeId: 'astral_relichall'
                    },
                    {
                        id: 'enter_throne_from_altar',
                        label: 'March through the Great Solar Doors into the Astral Engine (Boss Sanctum)',
                        type: 'move',
                        targetNodeId: 'throne_sleeping_god'
                    },
                    {
                        id: 'return_cenote_from_altar',
                        label: 'Retreat to the Bioluminescent Cenote',
                        type: 'move',
                        targetNodeId: 'sunken_cenote'
                    }
                ]
            },
            astral_relichall: {
                id: 'astral_relichall',
                title: '7. Reliquary of the Star-Priests — Vault of Arcana',
                act: 3,
                type: 'rest',
                coordinates: { x: 76, y: 68 },
                environment: 'temple',
                readAloud: `Weightless motes of golden starlight drift through this tranquil, timeless vault where the high astronomers of the Azlanti once prepared their souls for communion with the cosmos. Neither the humidity of the jungle nor the venomous stench of the Yuan-ti penetrates the shimmering solar ward woven across the threshold. At the center of the polished alabaster floor bubbles a fountain of liquid starlight that smells of crisp mountain air and night-blooming jasmine. Around the basin float seven prismatic crystal reliquaries, slowly revolving inside rings of levitating gold filigree that hum a lullaby of forgotten constellations. At the far end of the hall, a circular teleporter dais of engraved sun-stone awaits your command to carry you directly into the heart of the Astral Engine.`,
                dmNotes: 'Sanctuary & Preparation Mechanics: This chamber is sealed by an inviolable Azlanti Forbiddance ward keyed against serpentine and Abyssal creatures—High Priestess Ssethra\'s minions cannot enter or disturb the party here. Drinking from the Fountain of Liquid Starlight allows a full Short or Long Rest, purging all poison and exhaustion before the final battle. The central levitating prism is locked by a three-tone harmonic seal (Arcana or Religion DC 13)rather than a mechanical keyhole; intoning the chord learned in the Archive unfolds the crystal without triggering any defensive wards.',
                companionMoments: [
                    {
                        companionName: 'Brother Brynn Ironforge',
                        matchClass: 'cleric',
                        matchRace: 'dwarf',
                        text: 'Brother Brynn cups a handful of the bubbling liquid starlight from the fountain, watching the lacerations on his knuckles vanish in a warm golden glow. "Ten thousand years after its builders turned to dust, their blessing still holds back the dark. Drink deep, my friends—what waits beyond that sun-stone dais will test every ounce of our faith and steel."'
                    },
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: 'Lyra reaches up to touch the central levitating crystal prism, her fingertips tingling as the astral weave inside responds to her arcane aura. "This mantle is woven from condensed starlight and mithral thread! With this protection, Ssethra\'s Abyssal hexes will slide off us like rain off glass."'
                    }
                ],
                loot: {
                    gold: 200,
                    items: [
                        {
                            id: 'mantle_of_spell_resistance_azlanti',
                            name: 'Star-Woven Mantle of the Azlanti (+2)',
                            type: 'armor',
                            rarity: 'Rare',
                            bonus: 2,
                            baseAc: 15,
                            description: 'Iridescent astral weave that fits any adventurer; grants AC 15 + DEX and +2 to saving throws against magic.'
                        },
                        {
                            id: 'elixir_of_starlight_supreme',
                            name: 'Chalices of Liquid Starlight (Supreme Healing)',
                            type: 'potion',
                            rarity: 'Rare',
                            healDice: '8d4+8',
                            description: 'Pure celestial ambrosia from the Star-Priest fountain that restores 8d4 + 8 Hit Points.'
                        }
                    ]
                },
                restAvailable: 'both',
                choices: [
                    {
                        id: 'rest_starlight_fountain',
                        label: 'Drink from the Fountain of Liquid Starlight and take a restorative Long Rest',
                        type: 'rest',
                        successText: 'You kneel beside the alabaster basin and drink the cool, effervescent liquid starlight. Warm golden radiance courses through your veins, knitting bruised bone, purging every trace of Yuan-ti venom, and restoring your mind and spirit to peak heroic readiness!'
                    },
                    {
                        id: 'unlock_crystal_reliquary',
                        label: 'Intone the three-part Azlanti harmonic chord to unfold the crystal reliquary (Arcana/Religion DC 13)',
                        type: 'search',
                        skill: 'arcana',
                        ability: 'intelligence',
                        dc: 13,
                        successText: 'As you hum the resonant triad of the Star-Priests, the levitating crystal prism unfolds its facets like a blooming lotus of pure diamond! Floating gently into your outstretched hands is the iridescent Star-Woven Mantle of the Azlanti, accompanied by chalices of liquid starlight and two hundred pieces of mint-condition astral platinum!',
                        failText: 'Your pitch wavers on the final interval, forcing you to wedge your dagger blade into the gold filigree clasp and pry the crystal petals apart by main strength before claiming the ancient vestments within.',
                        rewardGold: 100
                    },
                    {
                        id: 'enter_throne_sleeping_god',
                        label: 'Step onto the golden teleporter dais into the Astral Engine (Boss Sanctum)',
                        type: 'move',
                        targetNodeId: 'throne_sleeping_god'
                    },
                    {
                        id: 'return_azlanti_library',
                        label: 'Return to the Archive of Star-Glass',
                        type: 'move',
                        targetNodeId: 'azlanti_library'
                    }
                ]
            },
            throne_sleeping_god: {
                id: 'throne_sleeping_god',
                title: '8. Astral Engine of the Sleeping God — Climax Sanctum',
                act: 4,
                type: 'boss',
                coordinates: { x: 90, y: 50 },
                environment: 'temple',
                readAloud: `You emerge onto a colossal ring-platform of transparent star-glass suspended above a subterranean abyss where captured nebulae swirl in slow, silent majesty! Directly beneath your boots, through the crystal floor, looms a slit-pupiled eye the size of a galleon—golden, ancient, and trembling on the verge of waking as veins of sickly green venom spiderweb across its iris! Around the chamber roar the three titanic gyroscopic rings of the Astral Engine, their star-sapphire bearings screeching and throwing off arcs of violet lightning where obsidian chains have been jammed into the gears. Coiled atop the high control throne is High Priestess Ssethra, a twelve-foot Yuan-ti Abomination armored in emerald scales and wielding a staff of black viper-fangs, flanked by an awakened Azlanti Helmed Horror wreathed in corrupted viridian fire. Ssethra flares her hooded neck and her forked tongue tastes the charged air: "Too late, warm-blooded insects—hear the gears of ten millennia crack! The Sleeping God wakes in the image of the Great Serpent, and your souls shall be its first feast!"`,
                dmNotes: 'Climax Boss Battle & Multi-Phase Mechanics: High Priestess Ssethra fights from the elevated Control Throne while the Corrupted Azlanti Helmed Horror hovers over the star-bridge to intercept melee combatants. Every time the overloaded gyroscopic rings complete a revolution, an Unstable Astral Gravity Pulse ripples across the outer rim (DC 14 Constitution save or take 2d8 force damage and be knocked Prone). If the party learned Savant Oros\'s command phrase ("Aethel-Sol-Vara") in the Archive, a character can spend an action (Arcana DC 13) to purge the Helmed Horror\'s corruption—turning the flying construct into an allied defender against Ssethra! Once Ssethra falls, locking the Engine\'s core crystal (Arcana/Investigation DC 14) restores the golden lullaby of the cosmos and raises the Complete Astral Codex and the Scepter of the Waking Star.',
                companionMoments: [
                    {
                        companionName: 'Lyra Silverleaf',
                        matchClass: 'wizard',
                        matchRace: 'high-elf',
                        text: 'Lyra gasps as the galleon-sized golden eye shifts beneath the transparent crystal floor, making the gravity in the chamber tilt for a heartbeat. "Gods of the stars, it\'s looking right at us! Shout Savant Oros\'s command phrase \'Aethel-Sol-Vara\' now—turn that Helmed Horror back to the light before the third gyroscope ring snaps!"'
                    },
                    {
                        companionName: 'Ser Garrick Stoneheart',
                        matchClass: 'paladin',
                        matchRace: 'human',
                        text: 'Ser Garrick plants his boots wide against the trembling star-glass and raises his radiant blade toward High Priestess Ssethra\'s throne. "Let the beast beneath the floor watch its false priestess fall! Hold the bridge—no step backward until the Engine sings in gold again!"'
                    },
                    {
                        companionName: 'Kaelen Shadowbow',
                        matchClass: 'ranger',
                        matchRace: 'wood-elf',
                        text: 'Kaelen steadies his stance as violet lightning arcs between the titanic star-sapphire bearings. "Watch the outer rim when the big rings align—the gravity pulse will knock you flat on your back! Aim for the obsidian chains around Ssethra\'s throne!"'
                    }
                ],
                npcs: [
                    {
                        id: 'high_priestess_ssethra',
                        name: 'High Priestess Ssethra',
                        role: 'Herald of the Coiled Star',
                        attitude: 'Hostile',
                        dialogue: '"Ten thousand years the coward-kings of Azlant kept the Star-Serpent bound in golden chains, rationing its dreams like thieves warming their hands at a caged sun! Look down through the glass, surface-dwellers—see how its slit pupil dilates at the taste of my venom! When the third ring shatters, the jungle of Kha\'zar will molt its skin and the Age of Fangs will dawn!"',
                        influenceDc: 16,
                        influenceSkill: 'intimidation',
                        secretInfo: 'Ssethra\'s concentration on corrupting the Astral Engine is tethered to the Helmed Horror\'s emerald flame; overriding the construct with Savant Oros\'s command word shatters her arcane shield.'
                    }
                ],
                encounter: {
                    title: 'High Priestess Ssethra & The Corrupted Sentinel',
                    difficulty: 'Boss',
                    xpReward: 2100,
                    monsters: [
                        { monsterId: 'yuan-ti-abomination', name: 'High Priestess Ssethra', count: 1 },
                        { monsterId: 'helmed-horror', name: 'Corrupted Azlanti Helmed Horror', count: 1 }
                    ],
                    tacticalNotes: 'Ssethra uses Constrict and Poison Spray/Longbow barrages from the Control Throne while the flying Helmed Horror shields her with its Force-infused greatsword.',
                    terrainFeature: 'Spinning Gyroscopic Astral Engine & Star-Bridge'
                },
                trapOrHazard: {
                    name: 'Unstable Astral Gravity Pulse',
                    trigger: 'Standing near the outer gyroscopic rings when the corrupted Engine discharges.',
                    detectSkill: 'arcana',
                    detectDc: 14,
                    disarmSkill: 'arcana',
                    disarmDc: 14,
                    saveAbility: 'constitution',
                    saveDc: 14,
                    damageDice: '2d8',
                    damageType: 'force',
                    condition: 'Prone',
                    description: 'Waves of raw astral force ripple outward from the overloaded rings.'
                },
                loot: {
                    gold: 1500,
                    items: [
                        {
                            id: 'codex_of_the_sleeping_god',
                            name: 'The Complete Astral Codex of the Azlanti',
                            type: 'quest',
                            rarity: 'Legendary',
                            bonus: 3,
                            description: 'The ultimate prize sought by Candlekeep; contains ten-thousand-year-old mastery of the cosmos (+3 arcane focus).'
                        },
                        {
                            id: 'staff_of_the_magi_star',
                            name: 'Scepter of the Waking Star (+3)',
                            type: 'weapon',
                            rarity: 'Legendary',
                            bonus: 3,
                            damageDice: '2d8',
                            description: 'Forged at the zenith of the Azlanti Empire; grants +3 to attack, damage, and spellcasting rolls.'
                        }
                    ]
                },
                restAvailable: 'long',
                choices: [
                    {
                        id: 'override_helmed_horror',
                        label: 'Thunder Savant Oros\'s command phrase "Aethel-Sol-Vara!" to reclaim the Helmed Horror (Arcana DC 13)',
                        type: 'puzzle',
                        skill: 'arcana',
                        ability: 'intelligence',
                        dc: 13,
                        successText: 'Your voice cuts through the roar of the gyroscopes like a trumpet of pure starlight! The sickly emerald flames wreathing the Azlanti Helmed Horror snap instantly to blazing solar gold, shattering the obsidian runes across its breastplate! Bringing its greatsword to its visor in an ancient imperial salute, the construct wheels in mid-air and charges High Priestess Ssethra with vengeance ten millennia in the making!',
                        failText: 'The roar of the overloaded gyroscopes drowns out the final syllable of the High Azlanti command! Even so, arcane feedback crackles violently across the Helmed Horror\'s visor, staggering the construct in mid-flight and leaving Ssethra\'s flank exposed!'
                    },
                    {
                        id: 'stabilize_astral_engine',
                        label: 'Re-lock the Astral Engine\'s core prism and claim the Scepter of the Waking Star (Investigation/Arcana DC 14)',
                        type: 'search',
                        skill: 'arcana',
                        ability: 'intelligence',
                        dc: 14,
                        successText: 'Stepping over the fallen coils of High Priestess Ssethra, you wrench the last obsidian chain from the central console and lock the star-sapphire core into harmonic equilibrium! A deep, resonant chord of golden starlight washes across the dome; beneath the crystal floor, the colossal eye of the Sleeping God slowly closes in peaceful slumber for another ten thousand years. From the heart of the console rises a plinth bearing the Complete Astral Codex and the blazing Scepter of the Waking Star!',
                        failText: 'As you slam the star-sapphire core into its cradle, a final backlash of violet astral static arcs across your gauntlets and singes your cloak! The gyroscopic rings lock into a steady golden rhythm as the colossal eye below closes in sleep, and the central plinth rises to reveal the Complete Astral Codex of the Azlanti!',
                        failDamageDice: '1d8',
                        rewardGold: 400
                    },
                    {
                        id: 'return_to_relichall',
                        label: 'Step back onto the teleporter dais to the Reliquary',
                        type: 'move',
                        targetNodeId: 'astral_relichall'
                    }
                ]
            }
        }
    };

export const ancientTempleAdventure = ancientTemple;
