// Living Module: thievesGuild
// Prose authored for MythicBot. Node ids, mechanics and links must stay stable.

export const thievesGuild = {
    id: 'thieves-guild',
    name: "The Thieves' Guild",
    description: 'Infiltrate the rain-slicked Warrens of Blackhaven, outwit a subterranean empire of masks and blades, and steal back the royal Crimson Claw.',
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    tags: ['Intrigue', 'Stealth', 'Urban'],
    setting: 'The City of Blackhaven',
    openingNarrative: `Cold harbor rain turns the cobblestones of Blackhaven's Warrens into black mirrors, reflecting the amber glow of shuttered tavern lanterns and the distant spires of the Royal Citadel. Up on the high hill, masked nobles toast the midnight hour behind cordons of halberdiers—none of them knowing that forty-eight hours ago, the Crown's most dangerous relic, the Crimson Claw ruby, vanished from a triple-warded royal vault without a single lock being forced.

Every whisper in the underworld points to one culprit: Guildmaster Vespera, the Whispering Blade, who rules the city's shadowy syndicate from a sunken court beneath the old storm-cisterns. Inspector Corvus Vale of the Royal Intelligence Service has slipped your party forged guild papers and a dead-drop password—because if uniformed soldiers march into the Warrens, Vespera will vanish into the tide-tunnels with the artifact before dawn.

Now you stand in a narrow, fog-choked alley before the creaking iron sign of the Rusty Anchor tavern, your cloaks heavy with rain and your fingers brushing the hilts of your concealed blades. Inside waits Renzo "Silver-Tongue" Vane, a fence who sells safe passage into the lower guildhalls—provided your nerve holds when you speak the cipher: "The crow flies at midnight."

What do you do?`,
    icon: '🗡️',
    recommendedLevel: 2,
    levelRange: 'Levels 2–4',
    patron: {
        name: 'Inspector Corvus Vale',
        role: 'Royal Crown Spymaster',
        attitude: 'Friendly',
        description: 'A gaunt, rain-soaked intelligence officer who arranged your underworld cover identities in a dockside coach and slipped you the tavern cipher to recover the stolen Crimson Claw.'
    },
    primaryVillain: {
        name: 'Guildmaster Vespera',
        monsterId: 'assassin',
        title: 'The Whispering Blade of Blackhaven',
        motivation: 'Seized the Nightscale syndicate on the Night of Broken Blades and stole the royal Crimson Claw ruby to auction its arcane blood-ward to Blackhaven\'s corrupt merchant princes.'
    },
    treasureTheme: 'Implements',
    ambientTrack: 'city',
    startNodeId: 'rusty_anchor',
    nodes: {
        rusty_anchor: {
            id: 'rusty_anchor',
            title: '1. The Rusty Anchor Tavern — The Midnight Password',
            act: 1,
            type: 'social',
            coordinates: { x: 14, y: 58 },
            environment: 'city',
            readAloud: `Tallow smoke, wet wool, and the sharp tang of spiced harbor gin hang thick beneath the tarred ship-timber beams of the Rusty Anchor. Scarred whalers, drowned-rat smugglers, and hooded cutpurses fall quiet as you step out of the driving rain, their fingers drifting toward boot-knives and weighted tankards. Near the pickled-herring barrels at the bar, a nervous halfling lookout known as Twitchy Finn drums a coded warning rhythm against his pewter mug. In a shadowed corner booth beside a brass-rimmed floor ring sits Renzo "Silver-Tongue" Vane—a sharp-featured half-elf rolling an obsidian guild token across his knuckles while two loaded hand-crossbows remain leveled at your ribs from beneath the oak table. His mismatched eyes study your wet cloaks with cold amusement as he waits to hear whether you speak the cant or bleed on the sawdust.`,
            dmNotes: `Underworld Parley & Cant: The Rusty Anchor is the primary surface filter for the Thieves' Guild. Renzo Vane and his lookout Twitchy Finn test every newcomer before opening the subterranean routes.
Social Resolution: Delivering the password ("The crow flies at midnight") and succeeding on a DC 12 Deception or Persuasion check convinces Renzo that you are high-stakes independent contractors here for Vespera's auction. He tosses over an Obsidian Crow Guild Token and whispers the three-part Thieves' Cant vault sequence: "Shadow, Coin, Blade."
Two Infiltration Routes: Behind the bar, a counterweighted trapdoor drops into the flooded Smuggler's Canal (Node 2, combat-focused), while an iron drainpipe and rope-hoist outside the back alley climbs onto the Blackhaven Rooftops (Node 3, parkour/stealth-focused).`,
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax flicks two fingers across his lapel in rapid Thieves\' Cant toward Twitchy Finn at the bar, his jaw tightening as Finn flashes back the sign for "Vespera\'s Blood-Purge." "Easy with your hands—I used to run the high slate for the old Nightscale crew out of this very booth before Vespera sold out my mentor on the Night of Broken Blades, and Finn just warned me she\'s doubled the lookouts below."'
                },
                {
                    companionName: 'Melody Dawnwhisper',
                    matchClass: 'bard',
                    matchRace: 'half-elf',
                    text: 'Melody leans lazily against the scarred oak pillar, matching Renzo\'s cadence with a purring dockside drawl while covertly noting the crossbow angles under the table. "Let me do the talking—half-elves like Renzo respect a velvet lie much more than an honest threat."'
                }
            ],
            npcs: [
                {
                    id: 'renzo_the_fence',
                    name: 'Renzo "Silver-Tongue" Vane',
                    role: 'Underworld Fence of the Warrens',
                    attitude: 'Indifferent',
                    dialogue: '"The crow flies at midnight, does it? Cute phrase—half the informants in the Royal Watch know that line by now. Vespera sealed the lower cisterns tight after lifting the Crimson Claw, and Twitchy Finn says the rooftops are crawling with Nightscale spotters. Convince me you\'re not wearing Crown iron under those wet cloaks, and I\'ll flip you a brass ferry token and the three marks that keep the vault needles out of your thumbs."',
                    influenceDc: 12,
                    influenceSkill: 'deception',
                    secretInfo: 'Whispers the three-symbol Thieves\' Cant combination to the Five-Tumbler Vault door: Shadow, Coin, Blade.',
                    rewardItem: {
                        id: 'guild_ferry_token',
                        name: 'Obsidian Crow Guild Token',
                        type: 'quest',
                        rarity: 'Uncommon',
                        description: 'A heavy black-glass coin stamped with the silver mark of the Whispering Blade; grants safe recognition at the Nightshade Apothecary and the Hall of Whispers.'
                    }
                }
            ],
            loot: {
                gold: 30,
                items: [
                    {
                        id: 'masterwork_thieves_tools',
                        name: 'Velvet Roll of Masterwork Thieves\' Tools (+1)',
                        type: 'gear',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'Oil-blackened tension wrenches, spider-silk feeler wires, and a warm wax key-mold concealed under Renzo\'s booth (+1 to lockpicking and trap disarm checks).'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'parley_with_renzo',
                    label: 'Speak the midnight cipher and match Renzo\'s Thieves\' Cant challenge (Deception/Persuasion DC 12)',
                    type: 'social',
                    skill: 'deception',
                    ability: 'charisma',
                    dc: 12,
                    successText: 'You slide two fingers across the wet oak table in the unmistakable Nightscale sign for "High-Table Buyer" as you murmur the password. Renzo\'s cold smirk warms into genuine respect; he signals his crossbowmen to stand down, flicks the Obsidian Crow Guild Token into your palm, and leans close: "When you reach the adamantine vault, dial Shadow, Coin, Blade—and take these masterwork picks from the dead-drop under your bench."',
                    failText: 'Your hesitation over the second clause of the cant makes Twitchy Finn spill his gin and Renzo\'s crossbowmen cock their triggers beneath the table! Only by slapping twenty gold sovereigns onto the scarred wood do you buy Renzo\'s reluctant nod toward the cellar trapdoor and back alley ladder.',
                    rewardGold: 25
                },
                {
                    id: 'descend_smuggler_canal',
                    label: 'Slip through the barroom cellar trapdoor into the Smuggler\'s Canal',
                    type: 'move',
                    targetNodeId: 'smuggler_canal'
                },
                {
                    id: 'climb_blackhaven_rooftops',
                    label: 'Scale the alley rain-chain onto the Blackhaven Rooftops',
                    type: 'move',
                    targetNodeId: 'blackhaven_rooftops'
                }
            ]
        },
        smuggler_canal: {
            id: 'smuggler_canal',
            title: '2. The Flooded Cistern — Smuggler\'s Gondola Dock',
            act: 1,
            type: 'combat',
            coordinates: { x: 28, y: 32 },
            environment: 'city',
            readAloud: `Sickly green lantern-light reflects off the oily black water of a subterranean Romanesque cistern running deep beneath the Warrens. Damp moss and nitre crust the weeping brick arches overhead, while the air smells of bilge water, smuggled cloves, and wet iron. Moored beside a slick limestone jetty sits a narrow, flat-bottomed black gondola, its prow carved like a striking adder and stacked with wax-sealed crates stamped with the Royal Customs crest. Before your boots even settle on the mossy stone pier, a sharp two-note boatswain's whistle echoes from the darkness across the canal! Shapes detach from the shadows of the neighboring contraband barges as a guild spy and three blade-wielding cutthroats leap onto the gangplanks to cut off your retreat!`,
            dmNotes: `Encounter & Tactical Terrain: One Blackhaven Canal Lookout (Spy) and three Guild Cutthroats (Bandits) guard the subterranean water-gate. The limestone jetty is slick with algae, and characters who bull-rush along the narrow barge gangplanks can knock enemies into the six-foot-deep canal water.
Contraband Crates: The wax-sealed boxes on the pier were hijacked from the Royal Dockyard that morning. Prying open the customs manifest crate (DC 12 Investigation or Sleight of Hand) uncovers a pair of Shadow-Stitched Boots of Silent Step (+1) and a waterproof oilskin map of the canal locks leading directly to the Nightshade Apothecary.`,
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax drops into a low crouch behind a tarred spice barrel, drawing twin stilettos as the whistle echoes off the brick vaulting. "That\'s a Nightscale river-ambush signal—take out the spotter on the high barge first before he cuts the gondola\'s mooring line!"'
                },
                {
                    companionName: 'Kaelen Shadowbow',
                    matchClass: 'ranger',
                    matchRace: 'elf',
                    text: 'Kaelen nocks an arrow in a single fluid motion, his keen elven eyes tracking the ripples in the dark canal water before the lanterns even catch the enemy\'s boots. "Three on the lower gangplank, one crossbowman perched above the arch—keep your footing on the wet limestone and let my arrows pin the lookout!"'
                }
            ],
            encounter: {
                title: 'Canal Dock Enforcers',
                difficulty: 'Moderate',
                xpReward: 350,
                monsters: [
                    { monsterId: 'spy', name: 'Blackhaven Canal Lookout', count: 1 },
                    { monsterId: 'bandit', name: 'Guild Cutthroat', count: 3 }
                ],
                tacticalNotes: 'The Canal Lookout uses Cunning Action to dart between the high contraband crates for cover while the three Cutthroats press the party toward the slick edge of the pier.',
                terrainFeature: 'Slick Canal Pier & Moored Contraband Barges'
            },
            loot: {
                gold: 65,
                items: [
                    {
                        id: 'boots_of_elvenkind_smuggler',
                        name: 'Shadow-Stitched Boots of Silent Step (+1)',
                        type: 'wondrous',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'Supple charcoal-dyed calfskin boots lined with spider-felt soles that drink the sound of footsteps on stone or slate (+1 AC and Stealth).'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'search_contraband_crates',
                    label: 'Crack the false bottom of the hijacked Royal Customs crate (Investigation/Sleight of Hand DC 12)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'Running your blade along the wax-sealed dovetail joints, you pop open a smuggling compartment hidden beneath layers of contraband silk! Inside rest a pair of Shadow-Stitched Boots of Silent Step (+1) and a heavy lockbox of uncirculated royal gold sovereigns!',
                    failText: 'Your crowbar splinters the top slats with a loud crack, spoiling a crate of smuggled brandy bottles before your fingers close around a waterproof oilskin pouch of guild silver and canal manifests.',
                    rewardGold: 40
                },
                {
                    id: 'pole_gondola_to_shop',
                    label: 'Pole the black smuggler\'s gondola down the subterranean canal to the Nightshade Apothecary',
                    type: 'move',
                    targetNodeId: 'poisoner_shop'
                },
                {
                    id: 'return_rusty_anchor_canal',
                    label: 'Climb the iron rungs back up into the Rusty Anchor Tavern',
                    type: 'move',
                    targetNodeId: 'rusty_anchor'
                }
            ]
        },
        blackhaven_rooftops: {
            id: 'blackhaven_rooftops',
            title: '3. Gargoyle Spires of the Warrens — Midnight Rooftop Chase',
            act: 2,
            type: 'trap',
            coordinates: { x: 32, y: 78 },
            environment: 'city',
            readAloud: `Rain-slicked slate tiles gleam like wet fish scales beneath the pale crescent moon as you haul yourselves onto the steeply pitched rooftops of the Warrens. Forty feet below, crooked cobblestone alleys yawn like black chasms, bridged only by swaying hemp clotheslines, crumbling brick chimneys, and leering stone gargoyles. The wind smells of coal smoke, wet slate, and ozone. Along the ridge-beam ahead, green lichen clings thickest to the bowed middle tiles, while faint brass tripwire eye-bolts glint behind the horns of a crouching gargoyle. Suddenly, a cloaked guild courier clutching a velvet cipher-case bolts across the gable ahead and vaults a fifteen-foot chasm toward the glowing skylight of the Nightshade Apothecary!`,
            dmNotes: `Rooftop Parkour & Hazard: The Warrens rooftops are the highway of the Nightscale lookouts. The read-aloud gives subtle visual tells: green lichen on rotten slate tiles and brass eye-bolts behind the gargoyle's horns.
Hazard Mechanics: Sprinting blindly across the central ridge or mistiming the fifteen-foot alley leap triggers the Loose Rain-Slick Slate & Crumbling Gargoyle Ledge hazard (DC 12 Perception to spot the safe chimney-flashing footholds; DC 12 Dexterity save or take 2d6 bludgeoning damage and land Prone on the lower awning).
Intercepting the Courier: A successful DC 12 Acrobatics check lets a hero bound off the solid cornerstone of the gargoyle spire, snag the courier's velvet purse and Folding Mithral Grapnel in mid-air, and land silently beside the apothecary skylight.`,
            companionMoments: [
                {
                    companionName: 'Kaelen Shadowbow',
                    matchClass: 'ranger',
                    matchRace: 'elf',
                    text: 'Kaelen catches your shoulder before your boot touches the mossy center ridge, pointing toward the gargoyle eaves across the gap. "Don\'t step on the green slate—Nightscale snipers greased those tiles to dump pursuers into the alley, and they left a mithral grapnel anchored behind that third gargoyle\'s left horn!"'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax grins into the driving rain, adjusting the balance of his daggers as he measures the fifteen-foot drop between the gables. "Stick to the lead flashing along the chimney line and push off the gargoyle\'s skull—I\'ve jumped this exact gap blindfolded with three watchmen on my tail!"'
                }
            ],
            trapOrHazard: {
                name: 'Loose Rain-Slick Slate & Crumbling Gargoyle Ledge',
                trigger: 'Sprinting across the greased lichen-covered slate tiles or misjudging the fifteen-foot leap between the gables.',
                detectSkill: 'perception',
                detectDc: 12,
                disarmSkill: 'athletics',
                disarmDc: 12,
                saveAbility: 'dexterity',
                saveDc: 12,
                damageDice: '2d6',
                damageType: 'bludgeoning',
                condition: 'Prone',
                description: 'Greased slate tiles shear away under a runner\'s boots above a forty-foot plunge into the cobblestones.'
            },
            loot: {
                gold: 50,
                items: [
                    {
                        id: 'grappling_silk_rope',
                        name: 'Folding Mithral Grapnel & Spider-Silk Rope',
                        type: 'gear',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'A spring-loaded three-prong mithral grappling hook coiled with fifty feet of braided dark-gray spider silk; grants +1 to climbing and rooftop acrobatics.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'vault_rooftop_gap',
                    label: 'Sprint the chimney flashing, bound off the gargoyle spire, and intercept the courier (Acrobatics DC 12)',
                    type: 'skillCheck',
                    skill: 'acrobatics',
                    ability: 'dexterity',
                    dc: 12,
                    successText: 'Keeping your boots to the dry lead flashing beside the chimneys, you launch yourself off the gargoyle\'s stone horns over the forty-foot abyss! In mid-air you snatch the startled courier\'s velvet tribute pouch and mithral grapnel line, executing a silent shoulder-roll beside the apothecary skylight!',
                    failText: 'Your heel skids across a patch of greased moss-slate with a sickening crack of shattering tile! You slam hard against the copper rain-gutter below, bruising your ribs before hauling yourself up onto the skylight ledge and prying loose the courier\'s dropped coin pouch.',
                    failDamageDice: '1d6',
                    rewardGold: 50
                },
                {
                    id: 'drop_into_poisoner_shop',
                    label: 'Descend the iron skylight ladder into the Nightshade Apothecary',
                    type: 'move',
                    targetNodeId: 'poisoner_shop'
                },
                {
                    id: 'return_rusty_anchor_roof',
                    label: 'Rappel back down the rain-chain to the Rusty Anchor alley',
                    type: 'move',
                    targetNodeId: 'rusty_anchor'
                }
            ]
        },
        poisoner_shop: {
            id: 'poisoner_shop',
            title: '4. The Nightshade Apothecary — Black Market Fence & Safe House',
            act: 2,
            type: 'merchant',
            coordinates: { x: 48, y: 56 },
            environment: 'city',
            readAloud: `Rows of blown-violet glass retorts, pickled basilisk glands, and clockwork tension picks gleam softly inside this subterranean boutique carved into the junction of the old canal and the sewer vaults. Spiral copper distillation coils hiss gently over blue alchemical burners, perfuming the air with bitter almonds, crushed nightshade, and rare Underdark black lotus. Behind an ebony counter inlaid with mother-of-pearl scales stands Madame Belladonna—formerly known to the old guild as "Widow Whisper"—adjusting triple brass jeweler's lenses over her painted eyes. Heavy curtains of soundproof crimson velvet drape the back archway, concealing a warded safe-room and two diverging passages into the Inner Guildhall.`,
            dmNotes: `Underworld Safe House & Quartermaster: Madame Belladonna runs the Nightshade Apothecary as neutral ground between the surface fences and Vespera's Inner Circle. So long as the party pays in gold or carries Renzo's Obsidian Crow Token, she gladly trades weapons, glamoured armor, and healing draughts, and lets them take a Short or Long Rest in her warded backroom.
Crucial Intelligence (Madame Belladonna): Winning Belladonna's confidence (DC 12 Persuasion) prompts her to share a vital secret about the final boss fight: "Vespera never stands alone in the Sanctum—her 'twin sister' beside the reflecting pool is Mirage, a shapechanging Doppelganger who mimics her blade-work down to the last breath. Watch the dark water at their feet: the true Vespera wears the Shadow-Mantle that casts no reflection in the pool!"
Two Paths Forward: The upper velvet curtain leads into the Hall of Whispers (Node 5, social/bluff route), while the lower iron floor-grate opens into the Obsidian Gauntlet (Node 6, trap & monster route).`,
            companionMoments: [
                {
                    companionName: 'Nyx Nightbreeze',
                    matchClass: 'warlock',
                    matchRace: 'drow',
                    text: 'Nyx leans over the bubbling copper distillation coil, inhaling the violet steam with a knowing half-smile before fixing Madame Belladonna with a stare of pure Menzoberranzan steel. "Widow Whisper\'s signature distillation—Underdark black-lotus resin cut with basilisk bile. You used to brew this for the old Nightscale captains before Vespera took the throne; tell us how to spot her Doppelganger pet, and we\'ll keep your name out of our report."'
                },
                {
                    companionName: 'Sylva Whisperwind',
                    matchClass: 'druid',
                    matchRace: 'wood-elf',
                    text: 'Sylva inspects a rack of dried subterranean fungi and amber antitoxin phials, her fingers deftly separating the lethal vials from the restorative draughts. "Half of these glass ampoules would stop a troll\'s heart in three beats, but her crimson velvet tonics are brewed with genuine sun-blessed yarrow—drink those and leave the violet vials untouched."'
                }
            ],
            npcs: [
                {
                    id: 'madame_belladonna',
                    name: 'Madame Belladonna',
                    role: 'Master Alchemist & Guild Quartermaster',
                    attitude: 'Friendly',
                    dialogue: '"Gold spends the exact same whether it bears the King\'s profile or blood from the gutter, darlings. Call me Madame Belladonna—or Widow Whisper, if you knew the old crew before Vespera\'s knives got ambitious. Stock up on velvet draughts and shadow-steel before you part that curtain: Vespera\'s pet Doppelganger is prowling the Inner Sanctum, and the Obsidian Gauntlet downstairs hasn\'t been fed since Tuesday."',
                    influenceDc: 12,
                    influenceSkill: 'persuasion',
                    secretInfo: 'Reveals that Vespera fights alongside a Doppelganger double named Mirage in the Shadow Sanctum, and that the real Vespera\'s magic mantle casts no reflection in the dark pool.'
                }
            ],
            shopInventory: [
                {
                    id: 'shop_velvet_healing',
                    name: 'Crimson Velvet Healing Draught',
                    type: 'potion',
                    price: 50,
                    rarity: 'Common',
                    healDice: '2d4+2',
                    description: 'A spiced underworld restorative brewed with crimson yarrow and clove oil that restores 2d4 + 2 Hit Points.'
                },
                {
                    id: 'shop_greater_healing_guild',
                    name: 'Elixir of Shadow Mending (Greater Healing)',
                    type: 'potion',
                    price: 110,
                    rarity: 'Uncommon',
                    healDice: '4d4+4',
                    description: 'A concentrated silver-stoppered phial that restores 4d4 + 4 Hit Points and neutralizes blade venoms.'
                },
                {
                    id: 'shop_dagger_venom',
                    name: 'Viper\'s Kiss (+1 Assassin\'s Dagger)',
                    type: 'weapon',
                    price: 150,
                    rarity: 'Rare',
                    bonus: 1,
                    damageDice: '1d4',
                    description: 'A hollow-fullered stiletto forged from blackened Damascus steel that weeps alchemical lotus venom along its edge (+1 attack and damage).'
                },
                {
                    id: 'shop_glamoured_leather',
                    name: 'Glamoured Shadow-Leather Armor (+1)',
                    type: 'armor',
                    price: 165,
                    rarity: 'Rare',
                    bonus: 1,
                    baseAc: 13,
                    description: 'Supple studded leather (+1 AC) woven with illusion-threads that can ripple into the appearance of silk noble attire or guild livery with a whispered word.'
                }
            ],
            restAvailable: 'both',
            choices: [
                {
                    id: 'rest_apothecary_backroom',
                    label: 'Rest behind Madame Belladonna\'s soundproof velvet curtains',
                    type: 'rest',
                    successText: 'Inside the lead-lined safe room behind the apothecary counter, the hiss of the copper stills lulls your nerves while aromatic herbal steam clears the chill of the cisterns from your lungs. You bind your wounds, sharpen your blades, and recover your full strength undisturbed.'
                },
                {
                    id: 'enter_hall_of_whispers',
                    label: 'Don porcelain crow-masks and step into the Hall of Whispers (Social/Intrigue Route)',
                    type: 'move',
                    targetNodeId: 'hall_of_whispers'
                },
                {
                    id: 'enter_rune_vault_corridor',
                    label: 'Unlatch the lower iron service grate into the Obsidian Gauntlet (Stealth/Trap Route)',
                    type: 'move',
                    targetNodeId: 'rune_vault_corridor'
                },
                {
                    id: 'back_to_canal',
                    label: 'Step back out to the Smuggler\'s Canal gondola dock',
                    type: 'move',
                    targetNodeId: 'smuggler_canal'
                },
                {
                    id: 'back_to_rooftops',
                    label: 'Climb the skylight ladder back onto the Blackhaven Rooftops',
                    type: 'move',
                    targetNodeId: 'blackhaven_rooftops'
                }
            ]
        },
        hall_of_whispers: {
            id: 'hall_of_whispers',
            title: '5. Hall of Whispers — Velvet Mask Parlor',
            act: 3,
            type: 'social',
            coordinates: { x: 62, y: 28 },
            environment: 'dungeon',
            readAloud: `Chandeliers of smoked black crystal cast a decadent amber glow across this sunken gaming parlor carved beneath the foundations of the Merchant Quarter. Guild captains and corrupt city magistrates—every face hidden behind a lacquered porcelain mask of a crow, fox, or viper—sip spiced wine around green-baize roulette tables while trading wax-sealed blackmail dossiers. Perfumed hookah smoke curls around crimson velvet divans, masking the metallic click of concealed hand-crossbows beneath the silk tablecloths. Standing before the gilded archway to the Guild Treasury is Lieutenant Silas "the Whisper," his gloved hand resting lightly on a blackened steel rapier as his porcelain beak tilts toward you: "New feathers in Vespera's rookery? Flash your token, or name the noble house whose debt bought the Crimson Claw."`,
            dmNotes: `High-Stakes Masquerade Parley: The Hall of Whispers is where Guildmaster Vespera's lieutenants broker blackmail and fence stolen royal treasures.
Bluffing Silas (Social Path): Passing a DC 13 Deception or Persuasion check (by flashing Renzo's Obsidian Crow Token and dropping the name of House Vance or Inspector Vale's planted cover story) convinces Lieutenant Silas that the party are high-table envoys invited to inspect the Crimson Claw before midnight. Impressed by your nerve, Silas hands over his Signet Ring of the Inner Circle, which automatically bypasses the outer shock-ward on the Treasury door!
Combat Fallback: If the party fails the bluff or draws steel, Silas blows his silver whistle and two Crow-Masked Guild Lieutenants (Spies) and two Velvet Guard Enforcers (Bandits) flip the heavy mahogany roulette tables for cover and open fire!`,
            companionMoments: [
                {
                    companionName: 'Melody Dawnwhisper',
                    matchClass: 'bard',
                    matchRace: 'half-elf',
                    text: 'Melody adjusts her porcelain crow-mask with a practiced flick of her wrist, catching a crystal flute of spiced wine from a passing tray without breaking stride. "Look at the wax seal on Silas\'s cuff—that\'s Lord Treasurer Vance\'s private signet! Drop Vance\'s name as our silent backer and Silas won\'t dare hold us at the arch."'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax keeps his chin low behind his mask, his eyes darting to the mirrored pillars flanking the roulette wheel. "Silas has two crossbowmen behind the velvet drapes and a stiletto up his left lace cuff—if we bluff him, don\'t flinch, and if we fight, kick the center card table into his knees first!"'
                }
            ],
            npcs: [
                {
                    id: 'silas_the_whisper',
                    name: 'Lieutenant Silas the Whisper',
                    role: 'Master of Blackmail & Parlor Warden',
                    attitude: 'Indifferent',
                    dialogue: '"Unfamiliar boots on my Persian rugs, friends—and right before Vespera opens the midnight bidding on the Crimson Claw. Whisper the cipher of the five tumblers or tell me which High Seat magistrate paid for tonight\'s auction, and I\'ll lend you my own signet ring to pass the vault arch."',
                    influenceDc: 13,
                    influenceSkill: 'deception',
                    secretInfo: 'Reveals that pressing his Inner Circle Signet Ring into the recess beside the Five-Tumbler Vault grounds out the poison-needle counterweights.',
                    rewardItem: {
                        id: 'silas_signet_ring',
                        name: 'Signet Ring of the Inner Circle',
                        type: 'quest',
                        rarity: 'Rare',
                        description: 'A heavy platinum ring set with a carved onyx crow; fits the ward-socket outside the Guild Treasury to disarm its outer needle-springs.'
                    }
                }
            ],
            encounter: {
                title: 'Masked Lieutenants of the Parlor',
                difficulty: 'Moderate',
                xpReward: 400,
                monsters: [
                    { monsterId: 'spy', name: 'Crow-Masked Guild Lieutenant', count: 2 },
                    { monsterId: 'bandit', name: 'Velvet Guard Enforcer', count: 2 }
                ],
                tacticalNotes: 'The Crow-Masked Lieutenants overturn the heavy mahogany roulette tables for half-cover and fire poisoned hand-crossbows while Velvet Guard Enforcers rush the doorway.',
                terrainFeature: 'Overturned Gaming Tables & Smoked Crystal Chandeliers'
            },
            loot: {
                gold: 110,
                items: [
                    {
                        id: 'rapier_of_quick_strike',
                        name: 'Whisper-Steel Rapier (+1)',
                        type: 'weapon',
                        rarity: 'Uncommon',
                        bonus: 1,
                        damageDice: '1d8',
                        description: 'A needle-pointed dueling rapier of matte-black Damascus steel with a basket hilt shaped like folded crow wings (+1 attack and damage).'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'bluff_parlor_lieutenants',
                    label: 'Trade porcelain-mask courtesies and drop Lord Vance\'s blackmail cipher to bluff Silas (Deception/Persuasion DC 13)',
                    type: 'social',
                    skill: 'deception',
                    ability: 'charisma',
                    dc: 13,
                    successText: 'You tilt your porcelain mask at the exact angle of an Inner Circle broker, flick the Obsidian Crow Token across your fingers, and murmur how Lord Treasurer Vance grows impatient for Vespera\'s price. Silas chuckles softly behind his lacquered beak, slips his platinum Signet Ring of the Inner Circle into your palm along with a velvet house-win purse, and bows you through the gilded archway!',
                    failText: 'A subtle slip in your underworld inflection makes Silas stiffen behind his porcelain mask, his hand dropping toward his silver alarm whistle! You are forced to upend the nearest roulette table in a shower of gold chips and steel to fight your way to the gilded arch.',
                    rewardGold: 50
                },
                {
                    id: 'advance_to_guild_treasury',
                    label: 'Pass through the gilded archway to the Five-Tumbler Guild Treasury',
                    type: 'move',
                    targetNodeId: 'guild_treasury'
                },
                {
                    id: 'return_to_poisoner_shop',
                    label: 'Slip back through the velvet drapes into the Nightshade Apothecary',
                    type: 'move',
                    targetNodeId: 'poisoner_shop'
                }
            ]
        },
        rune_vault_corridor: {
            id: 'rune_vault_corridor',
            title: '6. The Obsidian Gauntlet — Arcane Glyphs & Dissolving Pit',
            act: 3,
            type: 'trap',
            coordinates: { x: 64, y: 76 },
            environment: 'dungeon',
            readAloud: `Polished black basalt flagstones stretch down this dead-silent, ten-foot-wide service corridor beneath the guildhall. Unlike the mossy cisterns behind you, every inch of the floor and walls here has been scrubbed to an unnatural, mirror-like sheen, completely devoid of dust, rats, or cobwebs. Along the mortar seams of the central flagstones, hair-thin filaments of copper wire hum with a faint ozone vibration that makes the hairs on your arms stand upright. Halfway down the passage, a booted skeletal leg, a corroded steel buckler, and a scatter of gleaming gold coins hang suspended in mid-air at chest height—quivering inside a nearly invisible, ten-foot cube of caustic, acid-reeking jelly that fills the corridor from wall to wall!`,
            dmNotes: `Classic Dungeon Combo (Glyphs + Gelatinous Cube): Guildmaster Vespera uses a captive Gelatinous Cube to sweep the lower service tunnel clean of intruders and refuse.
The Trap & Monster Synergy: The central flagstones in front of the cube are wired with Arcane Shock-Glyph Pressure Tiles (DC 13 Investigation to spot the unwarded border stones along the wall; DC 13 Sleight of Hand or Arcana to short-circuit the copper bus-bars). Stepping on an active tile unleashes a 2d6 lightning arc (DC 13 Dexterity save or Stunned), leaving careless victims paralyzed directly in the path of the advancing Gelatinous Cube!
Clever Play: Short-circuiting the copper glyph plates with brass shims (the "disarm_shock_glyphs" choice) discharges the entire capacitor bank directly into the watery mass of the Gelatinous Cube, searing it and allowing the party to fish out the Acid-Etched Ring of Evasion (+1)!`,
            companionMoments: [
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra halts with her staff held horizontally across your chest, her eyes reflecting the faint blue static dancing along the mortar joints. "Copper-inlaid lightning glyphs wired in series—and they\'re positioned to stun intruders right in the path of that Gelatinous Cube! Short the baseboard bus-bar and we can fry the ooze with Vespera\'s own trap!"'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax pulls a thin brass tension shim from his leather roll, grinning grimly at the floating skeleton ahead. "See how clean the stone is? Every thieves\' guild worth its salt keeps a cellar-cube to dispose of bad accountants—walk the six-inch border stones against the wall while I bridge the copper contacts."'
                }
            ],
            encounter: {
                title: 'The Vault Sweeper Cube',
                difficulty: 'Moderate',
                xpReward: 450,
                monsters: [
                    { monsterId: 'gelatinous-cube', name: 'Translucent Vault Gelatinous Cube', count: 1 }
                ],
                tacticalNotes: 'The Gelatinous Cube fills the 10-foot-wide passage and glides silently toward the party, attempting to Engulf anyone slowed or stunned by the lightning floor tiles.',
                terrainFeature: '10-Foot Confined Corridor & Pressure-Plate Tiles'
            },
            trapOrHazard: {
                name: 'Arcane Shock-Glyph Pressure Tiles',
                trigger: 'Stepping onto the central basalt flagstones without hugging the narrow six-inch border ledge.',
                detectSkill: 'investigation',
                detectDc: 13,
                disarmSkill: 'arcana',
                disarmDc: 13,
                saveAbility: 'dexterity',
                saveDc: 13,
                damageDice: '2d6',
                damageType: 'lightning',
                condition: 'Stunned',
                description: 'Blinding arcs of blue-white lightning crackle from wall to wall across the copper-veined floor tiles.'
            },
            loot: {
                gold: 90,
                items: [
                    {
                        id: 'ring_of_evasion_cube',
                        name: 'Acid-Etched Ring of Evasion (+1)',
                        type: 'ring',
                        rarity: 'Rare',
                        bonus: 1,
                        description: 'A platinum band etched with wind-runes that survived undissolved inside the Gelatinous Cube; grants +1 AC and uncanny reflexes against area effects.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'disarm_shock_glyphs',
                    label: 'Bridge the copper baseboard relays to discharge the lightning glyphs into the Cube (Sleight of Hand/Arcana DC 13)',
                    type: 'skillCheck',
                    skill: 'sleight-of-hand',
                    ability: 'dexterity',
                    dc: 13,
                    successText: 'Balancing on the narrow six-inch masonry ledge, you slide two brass shims beneath the master copper bus-bar and twist! A blinding bolt of blue lightning rips down the wet flagstones and slams straight into the Gelatinous Cube, boiling the caustic ooze apart and dropping the Acid-Etched Ring of Evasion (+1) and a shower of undissolved gold coins at your feet!',
                    failText: 'Your brass pick slips against the charged copper filament, sending a teeth-rattling jolt of blue arc-lightning up your forearm before the glyph burns itself out in a shower of sparks! Shaking off the numbness in your fingers, you still scoop up the gold coins left in the corridor\'s wake.',
                    failDamageDice: '1d8',
                    rewardGold: 45
                },
                {
                    id: 'advance_treasury_from_gauntlet',
                    label: 'Pick the heavy service grate opening into the Five-Tumbler Guild Treasury',
                    type: 'move',
                    targetNodeId: 'guild_treasury'
                },
                {
                    id: 'return_apothecary_from_gauntlet',
                    label: 'Retreat up the iron steps into the Nightshade Apothecary',
                    type: 'move',
                    targetNodeId: 'poisoner_shop'
                }
            ]
        },
        guild_treasury: {
            id: 'guild_treasury',
            title: '7. The Five-Tumbler Vault — Guild Treasury',
            act: 3,
            type: 'puzzle',
            coordinates: { x: 78, y: 52 },
            environment: 'dungeon',
            readAloud: `A massive circular vault door of dwarven adamantine and polished clockwork brass dominates the far wall of this octagonal strongroom, barring the threshold to Guildmaster Vespera's inner sanctum. Set into the center of the door are three concentric rotating cipher rings engraved with six relief icons: a Crow, a Crown, a Shadow, a Coin, a Rose, and a Blade. Around the perimeter of the chamber, velvet-draped marble pedestals display stolen noble tiaras and blades beneath bell-jars of leaded crystal. Looking closely at the brass bezel of the vault wheel and the rims of the glass domes, you spot hair-thin tension wires glistening with beads of greenish, bitter-smelling oil. From beyond the massive adamantine door comes the faint, rhythmic murmur of two identical feminine voices rehearsing an auction speech.`,
            dmNotes: `The Five-Tumbler Vault Puzzle: This masterwork door was engineered by Master Corwin, the former Nightscale lock-smith whom Vespera betrayed on the Night of Broken Blades.
Solving the Cipher: Dialing the three concentric rings to the Thieves' Cant motto learned from Renzo in Node 1—"Shadow, Coin, Blade"—or succeeding on a DC 13 Sleight of Hand or Investigation check (aided by Silas's Signet Ring from Node 5) retracts all five adamantine bolts and simultaneously unhooks the counterweight poison-needle springs on the surrounding display pedestals!
Trap Mechanics (Clockwork Poison-Needle Lock): Turning the wheel to the wrong symbol ("Crown" or "Rose") or lifting a display bell-jar without unhooking the brass tension wire fires a volley of needles coated in Blackhaven slumber-venom (DC 13 Constitution save or take 2d6 poison damage and become Poisoned).`,
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax runs his fingertips reverently over the bevelled brass gear-teeth of the great vault wheel, his voice dropping to a fierce whisper. "Master Corwin built this five-tumbler lock the winter before Vespera put a dagger in his back on the Night of Broken Blades... He always set the third ring on a reverse feather-spring: dial Shadow, Coin, Blade, and hold the tension wrench left so his poison needles don\'t bite us."'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra peers through her arcane lens at the crystal display domes, pointing out the silver mercury switches hidden beneath the velvet cushions. "The display pedestals are slaved to the main vault wheel—crack the master cipher on the adamantine door first, and every glass dome in this room will unlock cleanly at once."'
                }
            ],
            trapOrHazard: {
                name: 'Clockwork Poison-Needle Lock',
                trigger: 'Rotating the cipher rings to an incorrect icon or lifting a crystal display dome before the master vault wheel disengages.',
                detectSkill: 'investigation',
                detectDc: 13,
                disarmSkill: 'sleight-of-hand',
                disarmDc: 13,
                saveAbility: 'constitution',
                saveDc: 13,
                damageDice: '2d6',
                damageType: 'poison',
                condition: 'Poisoned',
                description: 'A ring of hair-thin steel needles coated in green Blackhaven slumber-venom fires from the brass bezel.'
            },
            loot: {
                gold: 220,
                items: [
                    {
                        id: 'dagger_of_blindsight_guild',
                        name: 'Night-Fang (+2 Shadow Shortblade)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 2,
                        damageDice: '1d6',
                        description: 'A masterwork shadow-forged shortsword stolen from the Royal Citadel armory; its matte-black blade drinks ambient light and strikes with lethal precision (+2 attack and damage).'
                    },
                    {
                        id: 'gloves_of_thievery_vault',
                        name: 'Gloves of Thievery & Nimble Finger',
                        type: 'wondrous',
                        rarity: 'Uncommon',
                        bonus: 1,
                        description: 'Supple gray kidskin gloves that turn completely translucent when laced onto the wrists, granting preternatural sensitivity to tumblers and springs (+1).'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'dial_vault_cipher',
                    label: 'Align the concentric brass rings to "Shadow, Coin, Blade" and unhook the needle springs (Sleight of Hand/Investigation DC 13)',
                    type: 'puzzle',
                    skill: 'sleight-of-hand',
                    ability: 'dexterity',
                    dc: 13,
                    successText: 'Holding counter-tension on the reverse feather-spring just as Master Corwin designed it, you align the three brass rings to Shadow, Coin, and Blade—CLACK-CLACK-CLACK-CLACK-CLACK! All five adamantine bolts retract with oiled perfection, the poison-needle counterweights drop harmlessly slack, and the crystal display domes rise to yield Night-Fang (+2 Shadow Shortblade), the Gloves of Thievery, and 220 gp in stolen ducats!',
                    failText: 'The third brass ring sticks for a split second, triggering a sharp hiss from the bezel as a poison-tipped needle grazes your thumb before you jam your tension wrench into the gear train! Though venom stings your veins, you force the final adamantine bolt open and sweep a share of gold from the pedestals.',
                    failDamageDice: '1d6',
                    rewardGold: 100
                },
                {
                    id: 'enter_shadow_sanctum',
                    label: 'Slip through the parted adamantine vault door into the Sanctum of the Crimson Claw (Boss Lair)',
                    type: 'move',
                    targetNodeId: 'shadow_sanctum'
                },
                {
                    id: 'return_hall_of_whispers',
                    label: 'Step back through the gilded arch into the Hall of Whispers',
                    type: 'move',
                    targetNodeId: 'hall_of_whispers'
                },
                {
                    id: 'return_rune_corridor',
                    label: 'Duck back through the service grate into the Obsidian Gauntlet',
                    type: 'move',
                    targetNodeId: 'rune_vault_corridor'
                }
            ]
        },
        shadow_sanctum: {
            id: 'shadow_sanctum',
            title: '8. Sanctum of the Crimson Claw — Throne of Shadows',
            act: 4,
            type: 'boss',
            coordinates: { x: 90, y: 52 },
            environment: 'dungeon',
            readAloud: `Fluted columns of black marble rise from a wide, glass-still reflecting pool at the heart of the Thieves' Guild inner sanctum. Upon a raised island dais at the center of the dark water stands an obsidian altar where the Crimson Claw—a fist-sized royal ruby clutched in golden dragon talons—throbs with hypnotic scarlet light. Stepping from the shadows to the left of the altar is Guildmaster Vespera, twin venom-slicked daggers poised in her hands—while simultaneously, an identical Vespera steps from the right pillar with the exact same cruel smile! Both women speak in chilling unison across the water: "Inspector Vale's little errands end at the bottom of my cistern—tell me, which of my blades do you think will reach your heart first?" Yet as the scarlet light ripples across the pool at their feet, you notice a subtle discrepancy in the dark water's reflection.`,
            dmNotes: `Climax Boss Battle (The Mirror Ambush): Guildmaster Vespera (Assassin) fights alongside her bodyguard Mirage (a shapechanging Doppelganger wearing an identical mask and cloak) and a Shadow-Blade Sentinel (Spy).
Spotting the True Vespera ("spot_true_vespera" Choice, DC 13 Insight or Perception): As hinted by Madame Belladonna in Node 4 and the read-aloud above, the real Guildmaster Vespera wears the enchanted Mantle of the Whispering Blade—which drinks shadow and casts NO reflection in the dark pool! Calling out the left figure as the true Vespera ruins their synchronized Sneak Attack ambush and forces Mirage to revert to her grey-skinned Doppelganger form!
Seizing the Crimson Claw ("seize_crimson_claw" Choice, DC 13 Sleight of Hand): The golden dragon-talon cradle holding the Crimson Claw is counterweighted to a scarlet flare-ward. Swapping a weighted coin pouch onto the cradle lifts the Legendary artifact cleanly and secures victory!`,
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'halfling',
                    text: 'Vax steps to the very edge of the black reflecting pool, his twin blades bared as he locks eyes with the figure on the left who casts no reflection in the water. "That cloak didn\'t hide your treachery on the Night of Broken Blades, Vespera, and your Doppelganger pet won\'t save you tonight—this is for Master Corwin and the old Nightscale!"'
                },
                {
                    companionName: 'Kaelen Shadowbow',
                    matchClass: 'ranger',
                    matchRace: 'elf',
                    text: 'Kaelen draws his bowstring to his cheek, aiming not at the twin figures\' chests but at the still black water lapping their boots. "Look at the pool—the right figure reflects in the water, the left one leaves nothing but empty shadow! Target the left pillar first!"'
                },
                {
                    companionName: 'Nyx Nightbreeze',
                    matchClass: 'warlock',
                    matchRace: 'drow',
                    text: 'Nyx weaves a filament of eldritch violet fire between her fingers, her gaze fixed on the throbbing ruby atop the obsidian dais. "Keep Vespera and her mirror-double off the central causeway for six seconds—once I unseat the Crimson Claw from its pressure cradle, her entire syndicate loses its bargaining chip!"'
                }
            ],
            encounter: {
                title: 'Guildmaster Vespera & Her Mirror-Double',
                difficulty: 'Boss',
                xpReward: 1400,
                monsters: [
                    { monsterId: 'assassin', name: 'Guildmaster Vespera', count: 1 },
                    { monsterId: 'doppelganger', name: 'Mirage the Shapechanger', count: 1 },
                    { monsterId: 'spy', name: 'Shadow-Blade Sentinel', count: 1 }
                ],
                tacticalNotes: 'Vespera and Mirage weave between the black marble pillars around the reflecting pool to flank isolated heroes with Sneak Attacks and Ambusher strikes unless the party exposes which twin is real.',
                terrainFeature: 'Shadowed Reflecting Pool & Crimson Claw Pedestal'
            },
            loot: {
                gold: 650,
                items: [
                    {
                        id: 'crimson_claw_artifact',
                        name: 'The Crimson Claw of the Royal Treasury',
                        type: 'quest',
                        rarity: 'Legendary',
                        bonus: 2,
                        description: 'The fabled fist-sized ruby of the Blackhaven Crown set in golden dragon talons; channels regal fire (+2 to spell and weapon attacks) and earns Inspector Vale\'s 650 gp royal bounty.'
                    },
                    {
                        id: 'vespera_cloak_bat',
                        name: 'Vespera\'s Mantle of the Whispering Blade (+2)',
                        type: 'wondrous',
                        rarity: 'Rare',
                        bonus: 2,
                        description: 'Woven from shadow-silk that casts no reflection in water or glass; allows the wearer to melt into dim light and grants +2 to Armor Class and saving throws.'
                    }
                ]
            },
            restAvailable: 'long',
            choices: [
                {
                    id: 'spot_true_vespera',
                    label: 'Study the dark reflecting pool and blade-stance to expose the true Vespera (Insight/Perception DC 13)',
                    type: 'skillCheck',
                    skill: 'insight',
                    ability: 'wisdom',
                    dc: 13,
                    successText: 'Your eyes dart downward to the glass-still surface of the dark pool: the woman by the right pillar reflects clearly in the water, while the woman on the left casts no reflection at all beneath her shadow-woven mantle! You shout the tell aloud, shattering their synchronized ambush and forcing the startled Doppelganger to ripple back into its pale, faceless form while Vespera curses in fury!',
                    failText: 'The hypnotic scarlet pulse of the Crimson Claw dances across the ripples of the pool, blurring the reflections until both figures lunge from the shadows in uncanny unison! You barely parry a twin scissor-strike of poisoned steel as the battle erupts across the dais.'
                },
                {
                    id: 'seize_crimson_claw',
                    label: 'Swap a counter-weighted coin pouch onto the golden talon cradle to claim the Crimson Claw (Sleight of Hand DC 13)',
                    type: 'search',
                    skill: 'sleight-of-hand',
                    ability: 'dexterity',
                    dc: 13,
                    successText: 'Measuring the tension of the golden dragon talons in a single breath, you slide a lead-weighted pouch of guild coins onto the pressure plate at the exact instant you lift the Crimson Claw free! The ruby\'s scarlet ward purrs smoothly without discharging, leaving the Crown\'s priceless artifact—and Vespera\'s tribute chest—securely in your hands!',
                    failText: 'The golden dragon talons snap shut a fraction of a second before your counterweight settles, unleashing a searing flare of scarlet arcane fire across your knuckles as you wrench the Crimson Claw free by main force! Though your palm smokes from the ward\'s kiss, the royal artifact is yours.',
                    failDamageDice: '1d6',
                    rewardGold: 250
                },
                {
                    id: 'return_guild_treasury',
                    label: 'Withdraw through the adamantine vault door into the Guild Treasury',
                    type: 'move',
                    targetNodeId: 'guild_treasury'
                }
            ]
        }
    }
};

export const thievesGuildAdventure = thievesGuild;
