// Living Module: hauntedManor
// Prose authored for MythicBot. Node ids, mechanics and links must stay stable.

export const hauntedManor = {
    id: 'haunted-manor',
    name: 'The Haunted Manor',
    description: 'Brave the storm-lashed halls of Ravencrest Manor, unravel a fifty-year tragedy of forbidden necromancy and betrayed love, and lay a weeping dynasty to rest.',
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    tags: ['Horror', 'Mystery', 'Puzzle'],
    setting: 'Ravencrest Manor',
    openingNarrative: `Cold October rain lashes the rusted wrought-iron gates of Ravencrest Manor as your hired coach clatters away down the muddy hill, its driver refusing to linger a heartbeat longer. Overhead, jagged forks of violet lightning split the storm clouds, throwing the crooked chimneys, weeping gargoyles, and leaded lancet windows of the abandoned Gothic estate into stark silhouette.

Fifty years ago on All Hallows' Eve, Lord Malakor Ravencrest locked the doors of his ancestral seat during his wedding feast to the gentle Lady Evelyn—and by sunrise, not a single living soul remained within. Now, blood-red candlelight flickers behind the upper gallery drapes at midnight, and the wind carries the ghostly sobbing of a bride mixed with the mournful notes of an unseen harpsichord.

Burgomaster Aldous Sterling of Oakhaven has pressed the consecrated silver lantern of St. Markovia into your hands, begging you to enter the cursed manor and sever whatever profane tether binds its dead. Ahead of you, beyond a courtyard choked with blackthorn briars, the manor's massive oak double doors groan open of their own accord, exhaling a draft of grave-cold air and dried funerary roses.

What do you do?`,
    icon: '👻',
    recommendedLevel: 1,
    levelRange: 'Levels 1–3',
    patron: {
        name: 'Burgomaster Aldous Sterling',
        role: 'Mayor of Oakhaven Village',
        attitude: 'Friendly',
        description: 'A gaunt, sleepless village magistrate who entrusted you with the silver lantern of St. Markovia and pleaded with you to silence the spectral weeping drifting down from Ravencrest Hill.'
    },
    primaryVillain: {
        name: 'Lord Malakor Ravencrest',
        monsterId: 'wight',
        title: 'The Undying Patriarch of Ravencrest',
        motivation: 'Obsessed with conquering mortality, he performed a profane Shadowfell soul-binding ritual on his wedding night fifty years ago—chaining his unwilling bride Lady Evelyn and his entire household to his own undying corpse.'
    },
    treasureTheme: 'Relics',
    ambientTrack: 'crypt',
    startNodeId: 'manor_gates',
    nodes: {
        manor_gates: {
            id: 'manor_gates',
            title: '1. Rusted Gates of Ravencrest — Stormy Courtyard',
            act: 1,
            type: 'exploration',
            coordinates: { x: 14, y: 54 },
            environment: 'manor',
            readAloud: `Forked lightning splits the bruised purple sky above Ravencrest Hill, illuminating a circular flagstone courtyard choked with razor-thorned blackbriars and moss-streaked statues of weeping seraphim. Rain drums relentlessly against the lacquered roof of a bone-white bridal carriage left abandoned beside a dry, leaf-choked gargoyle fountain. Even through the lash of the gale, you notice a faint metallic glint wedged beneath the carriage's velvet cushion and strange chisel-marks carved into the fountain's rim. Ahead, the manor's towering oak double doors creak wider on rusted iron hinges, spilling the slow, aching notes of a harpsichord sarabande out into the storm. A chill mist coils across the threshold like pale fingers beckoning you inside.`,
            dmNotes: `Atmosphere & Clues: The storm outside mirrors the restless grief of Lady Evelyn. The bridal carriage was meant to carry Lord Malakor and Lady Evelyn on their honeymoon fifty years ago, before Malakor sealed the estate at midnight.
Hidden Secrets: A DC 10 Investigation check inside the carriage and dry fountain basin uncovers a velvet-lined bridal coffer holding a Silvered Ravencrest Letter-Dagger (+1) and a water-stained page torn from the old groundskeeper's journal: "Lord Malakor bound the belfry clapper in black iron at eleven minutes to twelve—for if St. Markovia's silver bell ever tolls the true midnight hour, his necrotic shroud in the ossuary below shall fracture like glass."
Tactical & Environmental Notes: Characters may take a brief breather under the lee of the carriage roof before entering, though the rusted gates behind them have frozen shut with unnatural frost.`,
            companionMoments: [
                {
                    companionName: 'Melody Dawnwhisper',
                    matchClass: 'bard',
                    matchRace: 'half-elf',
                    text: 'Melody tilts her head toward the open oak doors, raindrops glistening on her lashes as she hums a trembling counter-melody. "Listen to that harpsichord... that\'s the Sarabande of House Ravencrest, written for Lady Evelyn\'s wedding night—except the player is repeating the third measure like a soul trapped before the final cadence."'
                },
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina raises the silver lantern toward the weeping angel statues, her voice dropping to a solemn murmur. "Look at their chiseled eyes—someone chiseled away the Dawnfather\'s halo from every statue in this courtyard fifty years ago to keep consecrated light from touching the hill."'
                }
            ],
            loot: {
                gold: 20,
                items: [
                    {
                        id: 'silvered_mourning_dagger',
                        name: 'Silvered Ravencrest Letter-Dagger (+1)',
                        type: 'weapon',
                        rarity: 'Uncommon',
                        bonus: 1,
                        damageDice: '1d4',
                        description: 'A keen silver-plated stiletto engraved with the weeping raven crest and wedding date of Lady Evelyn; its consecrated edge bites deep into undead flesh.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'search_courtyard_carriage',
                    label: 'Examine the abandoned bridal carriage and dry gargoyle fountain (Investigation DC 10)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 10,
                    successText: 'Beneath the rotted white silk seat of the bridal carriage, your fingers close around a velvet case containing a Silvered Ravencrest Letter-Dagger (+1) and a pouch of tarnished wedding silver. Tucked inside the lining is a frantic journal page from the groundskeeper: "Only when the Silver Bell in the high clocktower tolls midnight shall the Master\'s necrotic shroud falter!"',
                    failText: 'Cold rainwater pours from the carriage awning down your sleeves as blackbriars snag at your cloak, hiding the deeper compartment from view. Even so, you pry a handful of tarnished silver wedding coins from the mud of the dry fountain.',
                    rewardGold: 20
                },
                {
                    id: 'enter_grand_foyer',
                    label: 'Cross the mist-wreathed threshold into the Grand Foyer',
                    type: 'move',
                    targetNodeId: 'grand_foyer'
                }
            ]
        },
        grand_foyer: {
            id: 'grand_foyer',
            title: '2. The Grand Foyer — Phantom Harpsichord & Animated Suits',
            act: 1,
            type: 'combat',
            coordinates: { x: 30, y: 54 },
            environment: 'manor',
            readAloud: `Cobweb-shrouded crystal chandeliers sway overhead as the heavy oak doors boom shut behind you, sealing out the storm with a sound like a tomb slab falling into place. A sweeping staircase carpeted in moth-eaten crimson velvet rises toward a shadowed mezzanine, while the air smells of cold tallow, dried lavender, and ozone. In the niche beneath the stairs, a gilded rosewood harpsichord plays a mournful waltz entirely on its own, its yellowed ivory keys depressing beneath unseen, trembling fingers. Sheet music lies open upon its stand, stained with a single dried drop of crimson where the final measure breaks off unfinished. As your boots click against the black-and-white checkerboard marble, two suits of fluted Gothic plate armor wrench themselves from their plinths with a screech of rusted steel, halberds leveling at your throat!`,
            dmNotes: `Encounter Overview: One suit of Ravencrest Animated Plate and two Skeletal Footmen in rotted livery animate the instant the party reaches the center of the checkerboard floor. They are bound to repeat the final minutes of the wedding lockdown.
Harpsichord Interaction: The unseen spirit of Lady Evelyn's chamber musician is trying to finish "Evelyn's Requiem in D Minor." If a character succeeds on a DC 11 Performance or Arcana check to play the resolving D-minor plagal cadence on the harpsichord keys, a wave of golden harmonic resonance ripples through the foyer—staggering the undead guardians and popping open the harpsichord's secret music compartment.
Secret Clue: The recovered sheet music contains handwritten family dates in the margins ("1st: Corvus the Founder, 1612; 2nd: Aurelia the Star-Scholar, 1689; 3rd: Evelyn the Sorrow-Bride, 1748; Never light Malakor the Betrayer"), providing the exact solution to the portrait puzzle upstairs in the Whispering Gallery.`,
            companionMoments: [
                {
                    companionName: 'Melody Dawnwhisper',
                    matchClass: 'bard',
                    matchRace: 'half-elf',
                    text: 'Melody steps fearless toward the self-playing harpsichord, her fingers hovering over the trembling ivory keys as her eyes glisten with sorrow. "She wrote this in D minor to hide a plea for deliverance inside a wedding waltz—cover me for one measure, and I\'ll strike the resolving chord her murderer never let her finish!"'
                },
                {
                    companionName: 'Garrick Ironheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Garrick parries a sweeping halberd blow with his shield, eyeing the blackened rivets at the armor\'s gorget. "Ceremonial funeral plate welded shut from the inside—keep them off the marble stairs and smash their breastplates where the necrotic runes are etched!"'
                }
            ],
            encounter: {
                title: 'Haunted Suits of Ravencrest Plate',
                difficulty: 'Moderate',
                xpReward: 250,
                monsters: [
                    { monsterId: 'animated-armor', name: 'Ravencrest Animated Plate', count: 1 },
                    { monsterId: 'skeleton', name: 'Skeletal Footman', count: 2 }
                ],
                tacticalNotes: 'The Animated Armor locks down the foot of the grand staircase with sweeping halberd strikes while the two Skeletal Footmen flank from the velvet coat-check alcoves.',
                terrainFeature: 'Sweeping Marble Staircase & Self-Playing Harpsichord'
            },
            loot: {
                gold: 40,
                items: [
                    {
                        id: 'phantom_music_sheet',
                        name: 'Sheet Music: "Evelyn\'s Requiem in D Minor"',
                        type: 'quest',
                        rarity: 'Uncommon',
                        description: 'Vellum manuscript penned in Lady Evelyn\'s delicate hand; its margins list the generational order of the Ravencrest portraits in the upstairs Whispering Gallery.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'complete_harpsichord_melody',
                    label: 'Play the missing resolving cadence on the phantom harpsichord (Performance/Arcana DC 11)',
                    type: 'puzzle',
                    skill: 'performance',
                    ability: 'charisma',
                    dc: 11,
                    successText: 'Your fingers join the invisible hands upon the icy ivory keys, striking a resonant, heart-piercing D-minor chord that fills the foyer with warm golden light! A soft feminine sigh of gratitude echoes from the upper balcony, the necrotic frost recedes from the walls, and a hidden drawer beneath the keyboard clicks open to reveal "Evelyn\'s Requiem in D Minor" along with a velvet pouch of gold!',
                    failText: 'Your fingers slip against the freezing ivory keys, unleashing a jangling, discordant shriek of snapped harpsichord wire that makes the chandeliers shudder overhead. The unseen spirit recoils with a muffled sob, though you still manage to snatch a loose handful of gold coins from the music rest.',
                    rewardGold: 25
                },
                {
                    id: 'ascend_whispering_gallery',
                    label: 'Ascend the crimson-carpeted staircase to the Whispering Gallery',
                    type: 'move',
                    targetNodeId: 'whispering_gallery'
                },
                {
                    id: 'enter_alchemist_conservatory',
                    label: 'Push through the leaded stained-glass doors into the Alchemist\'s Conservatory',
                    type: 'move',
                    targetNodeId: 'alchemist_conservatory'
                },
                {
                    id: 'return_manor_gates',
                    label: 'Heave open the heavy oak doors back to the Stormy Courtyard',
                    type: 'move',
                    targetNodeId: 'manor_gates'
                }
            ]
        },
        whispering_gallery: {
            id: 'whispering_gallery',
            title: '3. Gallery of Weeping Portraits — The Bloodline Riddle',
            act: 2,
            type: 'puzzle',
            coordinates: { x: 44, y: 26 },
            environment: 'manor',
            readAloud: `Towering oil portraits of four generations of the Ravencrest dynasty line this drafty upper gallery, their varnished eyes seeming to pivot in the candlelight as you pass. Thick, tarry tears of black pitch ooze from the painted corners of their eyes, filling the corridor with the bitter stench of turpentine and charred bone. Beneath each gilded frame juts an unlit wrought-iron torch sconce—though the fourth sconce, set below a severe portrait of Lord Malakor holding a black chalice, is crusted with strange violet soot. At the far end of the hall, flanking the carved mahogany doors to the Master Study, an engraved bronze tablet reads: "Light first the Founder who tamed the hill, second the Scholar who mapped the stars, third the Bride of silver sorrow—and leave in darkness the Betrayer who drank the night."`,
            dmNotes: `The Bloodline Riddle: The four portraits depict Lord Corvus the Founder (holding a surveyor's staff), Lady Aurelia the Astronomer (holding a brass astrolabe), Lady Evelyn in her wedding veil (wearing a silver mourning locket and wedding band), and Lord Malakor the Undying (lifting a black obsidian chalice).
Trap Mechanics (Curse of the Weeping Gaze): Notice the violet soot around the fourth sconce mentioned in the read-aloud. If anyone lights Malakor's sconce, lights the sconces out of generational order, or slashes the canvases, a flock of spectral Shadowfell ravens erupts from the paint! All creatures in the gallery must make a DC 12 Wisdom saving throw or take 1d8 necrotic damage and become Frightened.
Solving the Puzzle: A DC 12 Investigation or History check (automatic or with advantage if the party recovered "Evelyn's Requiem in D Minor" in the foyer) lights Corvus, Aurelia, and Evelyn in sequence while leaving Malakor's sconce cold. Lady Evelyn's painted face softens into a grateful smile, and the frame swings ajar to reveal a velvet-lined reliquary containing Lady Evelyn's Locket of Warding.`,
            companionMoments: [
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra traces a glowing arcane sigil in the air inches from Lady Evelyn\'s painted hand, her elven eyes narrowing at the portrait\'s brushstroke. "Look at the wedding ring painted on her finger—Malakor mixed powdered bone and Shadowfell pitch into the oil pigment itself to anchor her soul to this corridor. Whatever you do, do not touch flame to his fourth sconce!"'
                },
                {
                    companionName: 'Malakai Duskryn',
                    matchClass: 'warlock',
                    matchRace: 'tiefling',
                    text: 'Malakai curls his lip at the portrait of Lord Malakor, the air around his horns prickling with eldritch static. "Amateurish greed dressed up as immortality—he didn\'t even bargain with an archfey or fiend properly; he cannibalized his own bride\'s lifeforce to patch his rotting soul."'
                }
            ],
            trapOrHazard: {
                name: 'Curse of the Weeping Gaze',
                trigger: 'Lighting the fourth sconce beneath Lord Malakor\'s portrait, lighting the portraits out of chronological order, or slashing the canvases.',
                detectSkill: 'investigation',
                detectDc: 12,
                disarmSkill: 'arcana',
                disarmDc: 12,
                saveAbility: 'wisdom',
                saveDc: 12,
                damageDice: '1d8',
                damageType: 'necrotic',
                condition: 'Frightened',
                description: 'A murder of shrieking spectral ravens bursts from the bleeding oil paint, tearing at the minds and souls of intruders with grave-cold talons.'
            },
            loot: {
                gold: 50,
                items: [
                    {
                        id: 'amulet_proof_undead',
                        name: 'Lady Evelyn\'s Locket of Warding',
                        type: 'wondrous',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'A tarnished silver heart-locket containing a braided lock of golden hair and a miniature portrait of Evelyn before her marriage; grants +1 to AC and saving throws against undead and can awaken her memories in the Ossuary.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'solve_portrait_sconces',
                    label: 'Light the three ancestral sconces in order and leave the Betrayer in darkness (History/Investigation DC 12)',
                    type: 'puzzle',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'You touch your lantern flame first to Corvus the Founder, second to Aurelia the Star-Scholar, and third to Lady Evelyn, deliberately leaving Malakor\'s soot-stained sconce cold and dark. The black pitch tears cease flowing across Lady Evelyn\'s canvas, her painted lips curving into a tragic, grateful smile as her gilded frame clicks open to reveal Lady Evelyn\'s Locket of Warding and an offering of gold!',
                    failText: 'As the torch flame nears the wrong sconce, Lord Malakor\'s painted eyes flare with venomous emerald fire and a murder of spectral ravens shrieks out of the canvas! Icy necrotic talons rake across your face before you manage to smother the torch and force the study latch.',
                    failDamageDice: '1d6',
                    rewardGold: 35
                },
                {
                    id: 'enter_master_study',
                    label: 'Step through the mahogany double doors into Lord Malakor\'s Master Study',
                    type: 'move',
                    targetNodeId: 'master_study'
                },
                {
                    id: 'return_grand_foyer',
                    label: 'Descend the crimson staircase back to the Grand Foyer',
                    type: 'move',
                    targetNodeId: 'grand_foyer'
                }
            ]
        },
        alchemist_conservatory: {
            id: 'alchemist_conservatory',
            title: '4. The Blighted Conservatory — Alchemist\'s Glasshouse',
            act: 2,
            type: 'rest',
            coordinates: { x: 46, y: 80 },
            environment: 'manor',
            readAloud: `Sheets of rain hammer against the cracked wrought-iron glass dome of this overgrown Victorian conservatory, where lightning flashes through a tangle of dead weeping willows and skeletal rose trellises. The humid air is heavy with the bitter-sweet aroma of crushed nightshade, arsenic distillate, and damp cemetery earth. Along the marble potting benches, shattered bell jars spill luminescent blue moss across the flagstones, yet in the far corner, a coiled copper alembic still bubbles gently over a sheltered silver brazier. Standing beside the workbench is the translucent, cerulean spectre of an elderly apothecary in a stained leather apron, his ghostly hands gesturing imploringly toward three crystal phials of liquid golden light. A faint ring of salt and dried rosemary encircles the hearth, holding the manor's oppressive chill at bay.`,
            dmNotes: `Sanctuary & Lore: Apothecary Elias Vance was the Ravencrest family herbalist who tried to slip Lady Evelyn a sleeping draught so she could escape the manor before midnight. Lord Malakor discovered the plot and slew Elias among his bell jars, but the apothecary's devotion to St. Markovia consecrated this conservatory as a safe haven where Malakor's minions cannot cross the rosemary-and-salt circle.
NPC Interaction: Elias is eager to aid living heroes. Speaking with him or passing a DC 10 Religion/Medicine check earns his Flask of Dawnlight Holy Water and crucial tactical advice:
1) Ringing the consecrated Silver Bell in the Clocktower Belfry will shatter Malakor's necrotic ward in the Ossuary.
2) Presenting Lady Evelyn's Locket of Warding or her Requiem sheet music in the final battle will awaken her humanity and turn her spectral wail against Malakor!`,
            companionMoments: [
                {
                    companionName: 'Sylva Whisperwind',
                    matchClass: 'druid',
                    matchRace: 'wood-elf',
                    text: 'Sylva kneels beside a cracked terracotta planter, gently touching a withered white bridal lily that blooms for a single heartbeat beneath her fingers. "Even the roots beneath this glasshouse are choking on Malakor\'s necromancy—yet this old apothecary kept a circle of pure sun-dew and rosemary alive for fifty winters just to help someone end the curse."'
                },
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina bows her head respectfully to the translucent apothecary, tracing the sign of the Dawnfather over the bubbling copper coil. "Your vigil is nearly over, Master Elias; by St. Markovia\'s grace, we will carry your consecrated light down into the bone vaults and set Lady Evelyn free."'
                }
            ],
            npcs: [
                {
                    id: 'ghost_apothecary_elias',
                    name: 'Apothecary Elias (Benevolent Spirit)',
                    role: 'Ghostly Alchemist of Ravencrest',
                    attitude: 'Friendly',
                    dialogue: '"Do not fear me, travelers—I am Elias, who tended Lady Evelyn\'s rose garden when this house still knew the sun! Malakor poisoned the wedding wine with arsenic and nightshade so none could flee his midnight ritual, while poor Evelyn wept at the altar! Please, take my consecrated sun-flasks: climb to the belfry to ring St. Markovia\'s silver bell, and show my lady her silver locket in the ossuary below so she remembers who she was!"',
                    influenceDc: 10,
                    influenceSkill: 'religion',
                    secretInfo: 'Reveals that Lady Evelyn\'s spirit is bound against her will; showing her Locket of Warding or Requiem in the Ossuary breaks Malakor\'s control over her without needing to destroy her.',
                    rewardItem: {
                        id: 'consecrated_sun_flask',
                        name: 'Flask of Dawnlight Holy Water',
                        type: 'potion',
                        rarity: 'Uncommon',
                        healDice: '2d4+4',
                        damageDice: '2d6',
                        description: 'Distilled from morning dew and powdered silver under St. Markovia\'s blessing; restores 2d4+4 HP to the living or sears undead for 2d6 radiant damage.'
                    }
                }
            ],
            loot: {
                gold: 45,
                items: [
                    {
                        id: 'potion_healing_conservatory',
                        name: 'Potion of Healing',
                        type: 'potion',
                        rarity: 'Common',
                        healDice: '2d4+2',
                        description: 'A ruby herbal restorative infused with dried rosehips and sun-blessed honey from Elias\'s private stock.'
                    }
                ]
            },
            restAvailable: 'both',
            choices: [
                {
                    id: 'rest_conservatory',
                    label: 'Rest within Apothecary Elias\'s consecrated circle of rosemary and warm light',
                    type: 'rest',
                    successText: 'You settle beside the gently bubbling copper alembic as the spectral apothecary stands quiet vigil by the rain-streaked glass doors. The warmth of the silver brazier banishes the grave-chill from your bones, allowing your party to tend wounds and recover full strength.'
                },
                {
                    id: 'distill_holy_elixir',
                    label: 'Assist Elias\'s spirit in finishing the silvered distillation at the workbench (Arcana/Medicine DC 11)',
                    type: 'skillCheck',
                    skill: 'medicine',
                    ability: 'wisdom',
                    dc: 11,
                    successText: 'Following Elias\'s spectral hand gestures, you carefully regulate the silver flame and filter the glowing condensation through powdered moonstone. Two crystal phials fill with radiant, golden liquid that hums like captured summer sunlight, and you uncover a stash of silver sovereigns in the workbench drawer!',
                    failText: 'A sudden draft from the cracked glass dome cools the copper coil too quickly, cracking one of the glass retorts with a sharp hiss. Even so, you salvage a potent restorative draught and recover the alchemist\'s spare silver coins from the potting bench.',
                    rewardGold: 30
                },
                {
                    id: 'passage_to_master_study',
                    label: 'Climb the narrow iron spiral service stair up to the Master Study',
                    type: 'move',
                    targetNodeId: 'master_study'
                },
                {
                    id: 'passage_to_sunken_crypts',
                    label: 'Descend the stone root-cellar steps into the Sunken Crypts',
                    type: 'move',
                    targetNodeId: 'sunken_crypts'
                },
                {
                    id: 'return_foyer_from_conservatory',
                    label: 'Return through the stained-glass doors to the Grand Foyer',
                    type: 'move',
                    targetNodeId: 'grand_foyer'
                }
            ]
        },
        master_study: {
            id: 'master_study',
            title: '5. Lord Malakor\'s Study — The Ravenous Chest & Secret Ledger',
            act: 2,
            type: 'trap',
            coordinates: { x: 60, y: 44 },
            environment: 'manor',
            readAloud: `Floor-to-ceiling mahogany bookshelves crammed with human-skin grimoires and astronomical charts enclose this oppressive, windowless study. The air reeks of old sealing wax, copper blood, and a peculiar, sharp tang of musky vinegar. Upon the claw-footed desk lies a massive leather-bound journal open beside a cold silver candelabra and a shattered bridal goblet. At the foot of the desk sits an ornate brass-bound strongbox, its dark wood gleaming with an odd, dewy sheen and not a single speck of dust resting upon its lid. Along the eastern wall, semicircular crescent scratches mar the floorboards in front of a section of occult treatises where one crimson spine juts half an inch past the rest.`,
            dmNotes: `The Study Mimic (Hidden Hazard): The "brass-bound strongbox" at the foot of the desk is actually a ravenous Heirloom Mimic fed by Malakor to devour thieves and snooping servants! The read-aloud gives subtle clues (the musky vinegar smell of mimic adhesive, the dewy sheen, and the complete absence of dust on its lid). The moment a character approaches the desk or chest, its lid splits into rows of glistening white teeth and a violet pseudopod lashes out!
The Revolving Bookcase (Secret Passage): The crescent scrape marks on the floorboards and the protruding crimson volume titled "De Vermis Mysteriis: Chronicles of the Raven" mark a counterweighted revolving bookcase. A DC 12 Investigation check spots the hollow spine lever cleanly, opening the hidden spiral turret up to the Clocktower Belfry and the stone steps down to the Sunken Crypts while revealing a secret wardrobe niche holding the Raven-Feather Cloak of Protection (+1).
Lore in Malakor's Journal: Reading the open grimoire reveals how Malakor forged a Soul-Tether Brazier in the Ossuary beneath the crypts, using Lady Evelyn's stolen wedding vows as the anchor.`,
            companionMoments: [
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra bends over the open leather journal on the desk, her voice trembling with cold fury as she reads the geometric soul-diagrams. "Here is the proof—Malakor forged a necrotic siphon linking Lady Evelyn\'s wedding band directly to the obsidian brazier in the ossuary so her sorrow would feed his undying heart forever."'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax catches your sleeve with a gloved hand, pointing his dagger tip toward the brass-bound chest at the foot of the desk. "Hold up—fifty years of cobwebs on every chair in this room, and that chest is shiny as a freshly licked boot? That lock has teeth, friend, and the real secret latch is on that scuffed bookcase."'
                }
            ],
            encounter: {
                title: 'The Study Mimic',
                difficulty: 'Moderate',
                xpReward: 450,
                monsters: [
                    { monsterId: 'mimic', name: 'Ravenous Heirloom Mimic', count: 1 }
                ],
                tacticalNotes: 'The Mimic ambushes the first character to approach the desk, using its Adhesive trait to grapple melee attackers while lashing out with acid-slick pseudopods.',
                terrainFeature: 'Heavy Mahogany Desk & Revolving Bookcase'
            },
            loot: {
                gold: 95,
                items: [
                    {
                        id: 'malakor_ritual_journal',
                        name: 'Lord Malakor\'s Occult Grimoire',
                        type: 'quest',
                        rarity: 'Rare',
                        description: 'Bound in black calfskin and inked in blood; details the All Hallows\' soul-tether ritual and explains how shattering the Ossuary brazier or tolling the midnight bell unravels his immortality.'
                    },
                    {
                        id: 'cloak_of_protection_raven',
                        name: 'Raven-Feather Cloak of Protection (+1)',
                        type: 'wondrous',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'A midnight-velvet mantle clasped with silver raven wings that turns aside blades and dark magic (+1 to Armor Class and saving throws).'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'search_secret_bookcase',
                    label: 'Inspect the crescent floor-scratches and occult spines for the hidden mechanism (Investigation DC 12)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'Tracing the semicircular wear marks on the parquet floor, you tilt the hollow crimson spine of "De Vermis Mysteriis." Counterweights rumble inside the wall as the entire mahogany bookcase pivots smoothly open, unveiling a hidden cloak-niche holding a Raven-Feather Cloak of Protection (+1), a coffer of gold, and twin stone stairwells leading up to the Belfry and down to the Crypts!',
                    failText: 'You pull three wrong volumes that shower you in fifty-year-old dust and dried beetles before spotting the iron seam along the wainscoting. Putting your shoulder to the mahogany frame, you grind the heavy revolving bookcase open by sheer brute force.',
                    rewardGold: 40
                },
                {
                    id: 'climb_to_belfry',
                    label: 'Ascend the narrow spiral turret stairs to the Clocktower Belfry',
                    type: 'move',
                    targetNodeId: 'clocktower_belfry'
                },
                {
                    id: 'descend_to_crypts',
                    label: 'Descend the hidden stone passage into the Sunken Crypts',
                    type: 'move',
                    targetNodeId: 'sunken_crypts'
                },
                {
                    id: 'return_whispering_gallery',
                    label: 'Step back out into the Whispering Gallery',
                    type: 'move',
                    targetNodeId: 'whispering_gallery'
                }
            ]
        },
        clocktower_belfry: {
            id: 'clocktower_belfry',
            title: '6. Midnight Belfry — The Chime of Silvered Souls',
            act: 3,
            type: 'puzzle',
            coordinates: { x: 68, y: 18 },
            environment: 'manor',
            readAloud: `Howling gale winds and freezing rain whip through the open Gothic stone arches at the dizzying pinnacle of Ravencrest Manor's clocktower. Suspended from ancient oak crossbeams hangs a six-foot bell cast from gleaming consecrated silver, its surface engraved with prayers to St. Markovia and the Dawnfather. Yet the bell hangs mute: thick chains of weeping black iron wrap tightly around its clapper, pulsing with sickly violet runes that drink the lightning overhead. Behind the bell, a labyrinth of colossal brass escapement gears stands jammed with an iron crowbar, freezing the tower's illuminated glass clock-face at eleven minutes before midnight. Far below through the floorboards, a vertical rope-shaft plunges straight into the flooded gloom of the manor's foundations.`,
            dmNotes: `The Midnight Bell Puzzle: Fifty years ago, Lord Malakor jammed the clockwork mechanism at 11:49 PM on All Hallows' Eve so midnight would symbolically never arrive and the consecrated bell of St. Markovia could never toll over the dead.
Mechanics: Freeing the jammed brass escapement gears and shattering the necrotic black iron chains around the silver clapper requires a DC 12 Religion or Athletics check.
Consequence: When the Silver Bell tolls midnight, its pure radiant chime echoes across the entire valley and down the vertical rope-shaft into the Ossuary—shattering Lord Malakor's necrotic ward, stripping away his temporary hit points, and gifting the party the resonant Chime of St. Markovia's Grace (+2)!`,
            companionMoments: [
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina presses both palms against the freezing black-iron chains binding the silver bell, golden radiance flaring between her fingers as she chants in Celestial. "Malakor thought he could chain the dawn itself at eleven minutes to midnight—strike the escapement lever on my word, and let the Dawnfather\'s voice thunder through his tomb!"'
                },
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'paladin',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn spits on his gauntleted hands and grips the cursed iron crowbar jamming the master gear-wheel. "Dwarven brass and holy silver weren\'t forged to sit silent for some craven necromancer—heave with me, and we\'ll ring a knell they\'ll hear in Oakhaven!"'
                }
            ],
            loot: {
                gold: 60,
                items: [
                    {
                        id: 'silver_bell_resonance_charm',
                        name: 'Chime of St. Markovia\'s Grace',
                        type: 'wondrous',
                        rarity: 'Rare',
                        bonus: 2,
                        description: 'A consecrated silver tuning chime detached from the belfry\'s harmonic assembly; hums with pure radiant pitch that shatters undead wards and bolsters attacks (+2).'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'toll_silver_bell',
                    label: 'Shatter the necrotic chains, set the clock gears to midnight, and toll the Silver Bell (Religion/Athletics DC 12)',
                    type: 'puzzle',
                    skill: 'religion',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'With a sanctified prayer and a mighty heave, you wrench the cursed iron bar from the brass gears! The monumental clock hands lurch forward to twelve, the black-iron chains shatter like brittle ice, and the great Silver Bell tolls—BONG! A shockwave of pure golden sound rolls across the storm-lashed valley, answered from deep beneath the manor by Lord Malakor\'s furious scream as his necrotic barrier shatters!',
                    failText: 'Necrotic frost bites at your hands as you strain against the jammed brass gears, your boots slipping on the rain-slick beams before the iron chain finally snaps with a violent crack. The bell rings a jagged, off-beat peal that still sends a tremor through the dark wards below.',
                    rewardGold: 50
                },
                {
                    id: 'descend_belfry_to_crypts',
                    label: 'Rappel down the vertical bell-rope shaft straight into the Sunken Crypts',
                    type: 'move',
                    targetNodeId: 'sunken_crypts'
                },
                {
                    id: 'return_study_from_belfry',
                    label: 'Descend the narrow spiral turret stairs back to the Master Study',
                    type: 'move',
                    targetNodeId: 'master_study'
                }
            ]
        },
        sunken_crypts: {
            id: 'sunken_crypts',
            title: '7. The Sunken Catacombs — Reliquary of the Ancestors',
            act: 3,
            type: 'combat',
            coordinates: { x: 74, y: 70 },
            environment: 'crypt',
            readAloud: `Ankle-deep black water laps against the slime-coated pillars of these ancient vaulted catacombs deep beneath Ravencrest Manor. Along the flooded aisles stand marble sarcophagi carved in the stern likenesses of crusader ancestors, their stone shields defaced with smeared necrotic runes. Eerie blue corpse-candles gutter inside skull-stacked wall niches, casting wavering reflections across the dark water. On a raised dry dais at the center of the vault rests the pristine white marble tomb of Sir Rowan Ravencrest, his sculpted hands clasped over a gleaming silvered broadsword. Before you can take three steps through the freezing water, ripples surge from the submerged side-alcoves and four rotting figures burst upward with grave-filth dripping from their claws!`,
            dmNotes: `Combat & Terrain: Two Ravenous Crypt Ghouls and two Drowned Estate Servants (Zombies) lurk beneath the dark water of the side niches. The ankle-deep water slows careless movement, making the raised central dais of Sir Rowan's tomb valuable high ground.
The Crusader Reliquary: Sir Rowan Ravencrest was a paladin of the Dawnfather who fought alongside St. Markovia centuries ago. Malakor dared not open his ancestor's consecrated tomb, instead smearing blood runes around its base to seal the blade inside. Cleaning the defaced runes and offering a prayer (Religion or Athletics DC 12) opens the sarcophagus peacefully, bestowing the +2 silvered longsword Dawncrest upon the party before the boss fight!`,
            companionMoments: [
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'paladin',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn splashes forward to plant his boots before Sir Rowan\'s marble sarcophagus, wiping a smear of black grave-grease from the carved sun-emblem on the knight\'s shield. "This crusader died in the light of the Dawnfather, and his kinsman dared defile his rest with ghoul-filth! Stand behind my shield while we reclaim his sacred blade!"'
                },
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina lifts her holy symbol high, its golden glow turning the black floodwater around her ankles clear as crystal. "Hear the prayer of your sisters and brothers, Sir Rowan of Ravencrest—lend your consecrated steel to those who come to free your house from bondage!"'
                }
            ],
            encounter: {
                title: 'Crypt Ghouls of the Flooded Vault',
                difficulty: 'Moderate',
                xpReward: 400,
                monsters: [
                    { monsterId: 'ghoul', name: 'Ravenous Crypt Ghoul', count: 2 },
                    { monsterId: 'zombie', name: 'Drowned Estate Servant', count: 2 }
                ],
                tacticalNotes: 'The Crypt Ghouls dart through the shallow water to paralyze isolated spellcasters, while the Drowned Estate Servants shamble in to pin the frontline against the sarcophagi.',
                terrainFeature: 'Ankle-Deep Flooded Crypts & Crusader Sarcophagi'
            },
            loot: {
                gold: 110,
                items: [
                    {
                        id: 'sun_blade_ravencrest',
                        name: 'Dawncrest (+2 Silvered Crusader Longsword)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 2,
                        damageDice: '1d8',
                        description: 'The ancestral silvered broadsword of Sir Rowan Ravencrest; its fuller is inlaid with sun-gold prayers that blaze with warm daylight against the undead (+2 attack and damage).'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'open_crusader_sarcophagus',
                    label: 'Cleanse the defaced sun-runes and invoke the Dawnfather\'s rite at Sir Rowan\'s tomb (Religion/Athletics DC 12)',
                    type: 'search',
                    skill: 'religion',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'As you wash the foul necrotic smudges from the marble shield and speak the ancient litany of the Dawnfather, a warm golden sigh breathes from the stone! The heavy marble effigy slides effortlessly aside, revealing the skeletal paladin holding Dawncrest (+2 Silvered Crusader Longsword) and a reliquary pouch of ancient gold sovereigns offered freely to your cause!',
                    failText: 'The ancient seal resists your halting prayer, forcing you to wedge iron crowbars beneath the heavy marble lid and heave with every ounce of strength. With a deafening groan of stone on stone, the lid shifts enough for you to claim the heirloom blade and burial coins.',
                    rewardGold: 45
                },
                {
                    id: 'enter_ritual_ossuary',
                    label: 'Throw open the verdigris bronze doors into the All Hallows\' Ossuary (Boss Sanctum)',
                    type: 'move',
                    targetNodeId: 'ritual_ossuary'
                },
                {
                    id: 'return_conservatory_from_crypt',
                    label: 'Climb the stone root-cellar steps back up to the Conservatory',
                    type: 'move',
                    targetNodeId: 'alchemist_conservatory'
                },
                {
                    id: 'return_study_from_crypt',
                    label: 'Ascend the hidden stone stairway back to the Master Study',
                    type: 'move',
                    targetNodeId: 'master_study'
                }
            ]
        },
        ritual_ossuary: {
            id: 'ritual_ossuary',
            title: '8. The All Hallows\' Ossuary — Lord Malakor & Lady Evelyn',
            act: 4,
            type: 'boss',
            coordinates: { x: 88, y: 52 },
            environment: 'crypt',
            readAloud: `Thousands of bleached human skulls and femurs are mortared into the vaulted walls of this subterranean bone-cathedral, their empty sockets staring down upon a sunken wedding altar draped in rotting white lace. At the heart of the floor burns a wide ritual circle of violet necrotic fire fed by an obsidian Soul-Tether Brazier. Standing before the altar is Lord Malakor Ravencrest—a towering Wight crowned in tarnished silver and corroded black plate, a life-drinking broadsword bared in his gauntleted fist. Chained above the altar by ribbons of dark Shadowfell energy floats the translucent, weeping Banshee of Lady Evelyn in her tattered wedding gown! Green fire flares in Malakor's sunken eye sockets as he raises his blade: "Fifty years I have defied the grave so she would remain mine forever—and your warm blood shall feed our eternity!"`,
            dmNotes: `Climax Boss Battle: Lord Malakor Ravencrest (Wight) is accompanied by two Ossuary Honor Guards (Skeletons) and the Sorrow-Bound Spirit of Lady Evelyn (Banshee).
Redeeming Lady Evelyn (Crucial Story Choice): Lady Evelyn does not wish to fight the party—she is enslaved by the Soul-Tether Brazier and her forgotten memories. If a character uses the "redeem_lady_evelyn" choice (DC 12 Persuasion or Religion, aided by possessing Lady Evelyn's Locket of Warding or "Evelyn's Requiem in D Minor"), Evelyn remembers her true self, shatters her spectral chains, and unleashes her devastating Banshee Wail directly against Lord Malakor and his skeletal guards before ascending in peace!
Shattering the Soul Brazier: Overturning or dispelling the central Soul-Tether Brazier (DC 13 Arcana or Athletics) extinguishes the necrotic healing aura feeding Malakor and breaks the fifty-year storm over Ravencrest Hill.`,
            companionMoments: [
                {
                    companionName: 'Sister Seraphina',
                    matchClass: 'cleric',
                    matchRace: 'human',
                    text: 'Sister Seraphina steps fearlessly to the edge of the violet ritual circle, holding St. Markovia\'s silver lantern toward the weeping bride. "Love does not chain a soul in darkness, Malakor! Look upon your silver locket, Lady Evelyn—hear the Dawnfather\'s call and be free of his chains!"'
                },
                {
                    companionName: 'Melody Dawnwhisper',
                    matchClass: 'bard',
                    matchRace: 'half-elf',
                    text: 'Melody raises her voice in a clear, soaring soprano, singing the final resolving cadence of Evelyn\'s Requiem across the bone-lined vault. "Remember the music you wrote before the doors were barred, my lady—your song ends in light, not in his shadow!"'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra points her staff at the pulsing obsidian gem inside the central brazier, arcane frost gathering around her fingertips. "That Soul-Tether Brazier is the fulcrum of his whole immortality matrix—shatter the obsidian core and his stolen half-century collapses in seconds!"'
                }
            ],
            npcs: [
                {
                    id: 'lady_evelyn_spirit',
                    name: 'Lady Evelyn Ravencrest',
                    role: 'Tormented Banshee Bride',
                    attitude: 'Indifferent',
                    dialogue: '"Malakor, have mercy... it has been so cold for fifty winters... Wait—do I hear the harpsichord from the foyer? Is that the silver locket I wore above my heart before the wine turned bitter?"',
                    influenceDc: 12,
                    influenceSkill: 'persuasion',
                    secretInfo: 'When shown her silver Locket of Warding or reminded of her Requiem melody, Lady Evelyn breaks Malakor\'s necrotic tether, turns her wail upon him, and departs into the light.'
                }
            ],
            encounter: {
                title: 'Lord Malakor the Undying & The Weeping Bride',
                difficulty: 'Boss',
                xpReward: 1100,
                monsters: [
                    { monsterId: 'wight', name: 'Lord Malakor Ravencrest', count: 1 },
                    { monsterId: 'banshee', name: 'Sorrow-Bound Spirit', count: 1 },
                    { monsterId: 'skeleton', name: 'Ossuary Honor Guard', count: 2 }
                ],
                tacticalNotes: 'Lord Malakor advances with Life Drain strikes while his Ossuary Honor Guards screen the Soul-Tether Brazier; redeeming Lady Evelyn turns her from a deadly threat into the party\'s greatest ally.',
                terrainFeature: 'Soul-Tether Ritual Brazier & Bone Altar'
            },
            loot: {
                gold: 450,
                items: [
                    {
                        id: 'ravencrest_deed_seal',
                        name: 'Consecrated Seal & Deed of Ravencrest Manor',
                        type: 'quest',
                        rarity: 'Rare',
                        description: 'The ducal signet and ancestral charter of Ravencrest Hill, cleansed of its curse; Burgomaster Sterling awards your party title to the manor and a 450 gp reward.'
                    },
                    {
                        id: 'mace_of_disruption_relic',
                        name: 'St. Markovia\'s Mace of Disruption (+2)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 2,
                        damageDice: '1d8',
                        description: 'A sacred sun-brass flanged mace recovered from beneath the shattered ossuary altar; sheds pure golden daylight and smites undead and fiends (+2 attack and damage).'
                    }
                ]
            },
            restAvailable: 'long',
            choices: [
                {
                    id: 'redeem_lady_evelyn',
                    label: 'Hold aloft Lady Evelyn\'s Locket and call her true name across the altar (Persuasion/Religion DC 12)',
                    type: 'social',
                    skill: 'persuasion',
                    ability: 'charisma',
                    dc: 12,
                    successText: 'As the silver locket catches the lantern light and you speak her name with compassion, tears of warm golden light spill down Lady Evelyn\'s spectral cheeks! "I remember the sun..." she whispers, snapping the Shadowfell chains around her wrists and turning upon Lord Malakor with a righteous, keening wail that shatters his black breastplate before she dissolves into peaceful starlight!',
                    failText: 'Your voice is nearly drowned out by Lord Malakor\'s roar as he lashes the violet ritual chains tighter around Evelyn\'s wrists, forcing her to shriek in torment! Even so, her resistance falters his stance long enough for you to press the attack toward the altar.',
                    rewardGold: 100
                },
                {
                    id: 'shatter_soul_brazier',
                    label: 'Shatter the obsidian Soul-Tether Brazier at the heart of the ritual circle (Arcana/Athletics DC 13)',
                    type: 'skillCheck',
                    skill: 'arcana',
                    ability: 'intelligence',
                    dc: 13,
                    successText: 'Braving the whipping tongues of violet flame, you strike the precise runic fault-line of the obsidian Soul-Tether Brazier! The dark crystal explodes in a shower of harmless sparks, the fifty-year necrotic vortex collapses inward, and high above Ravencrest Hill, golden morning sunlight pierces the storm clouds at last!',
                    failText: 'Arcs of freezing necrotic lightning sear up your arms as you kick the heavy iron tripod off its pedestal by sheer force! The brazier crashes onto its side and cracks apart, though the backlash leaves your fingers blistered with grave-frost.',
                    failDamageDice: '1d6',
                    rewardGold: 100
                },
                {
                    id: 'return_to_sunken_crypts',
                    label: 'Ascend the ossuary steps back to the Sunken Catacombs',
                    type: 'move',
                    targetNodeId: 'sunken_crypts'
                }
            ]
        }
    }
};

export const hauntedManorAdventure = hauntedManor;
