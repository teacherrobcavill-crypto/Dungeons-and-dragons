// Living Module: lostMine
// Prose authored for MythicBot. Node ids, mechanics and links must stay stable.

export const lostMine = {
    id: 'lost-mine',
    name: 'The Lost Mine of Phandelver',
    description: 'Escort a dwarven prospector\'s wagon along the perilous Triboar Trail, break a shadowy conspiracy gripping the frontier town of Phandalin, and reclaim the arcane Spell Forge of Wave Echo Cave.',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    tags: ['Fantasy', 'Dungeon', 'Mystery'],
    setting: 'The Sword Coast',
    openingNarrative: `You rattle south along the rain-rutted mud of the High Road before turning east onto the Triboar Trail, where wind-lashed pines and craggy foothills cast long shadows across your supply wagon. In Neverwinter, the irrepressible shield dwarf Gundren Rockseeker pressed ten gold coins into your palms to haul a wagonload of pickaxes, lanterns, and salted flour to the frontier settlement of Phandalin.

Gundren and his grizzled escort, a veteran swordsman of the Lords' Alliance named Sildar Hallwinter, rode out a day ahead of you on fast horses. Before spurring his mount through the city gates, Gundren clapped his saddlebag with a secretive grin and whispered that he and his brothers had uncovered "something that will shake the Sword Coast to its bedrock."

Now the sky bruises to the color of tarnished pewter, the scent of wet pine needles and woodsmoke hangs thick on the cold breeze, and ravens wheel low over a sharp bend in the trail ahead. Your oxen snort nervously, rolling their eyes at the darkened thickets flanking the road.

What do you do?`,
    icon: '⛏️',
    recommendedLevel: 1,
    levelRange: 'Levels 1–3',
    patron: {
        name: 'Gundren Rockseeker',
        role: 'Dwarven Prospector & Expedition Patron',
        attitude: 'Friendly',
        description: 'A fiercely determined shield dwarf who uncovered the lost entrance to Wave Echo Cave and hired your party in Neverwinter.'
    },
    primaryVillain: {
        name: 'Nezznar the Black Spider',
        monsterId: 'cult-fanatic',
        title: 'Drow Mastermind of Wave Echo Cave',
        motivation: 'Seeks to seize the arcane Spell Forge of Phandelver and silence anyone who knows the secret location of the mine.'
    },
    treasureTheme: 'Armaments',
    ambientTrack: 'cavern',
    startNodeId: 'ambush_trail',
    nodes: {
        ambush_trail: {
            id: 'ambush_trail',
            title: '1. Triboar Trail — Goblin Ambush',
            act: 1,
            type: 'combat',
            coordinates: { x: 12, y: 50 },
            environment: 'forest',
            readAloud: `You crest a muddy rise along the Triboar Trail where steep, briar-choked embankments pinch the road into a shadowy defile. Sprawled across the wheel ruts fifty paces ahead lie two dead riding horses, their dappled flanks bristling with black-feathered arrows. Flies buzz lazily over the spilled leather saddlebags, and the copper tang of fresh blood mingles with the damp smell of crushed bracken. A Brass-bound leather map case lies trampled into the mire beside a snapped silver bridle. Before you can draw rein, the thorny underbrush explodes with shrill war-cries as four yellow-eyed goblins vault from the thicket with jagged scimitars and notched shortbows!`,
            dmNotes: 'The slain mounts belong to Gundren Rockseeker and Sildar Hallwinter, ambushed less than a day ago on orders from King Grol and the Black Spider. Two Cragmaw skirmishers rush the wagon in melee while two archers fire from three-quarters cover atop the briar embankment, using Nimble Escape to dart between roots. If three goblins fall, the survivor bolts north along a concealed footpath leading toward Cragmaw Hideout.',
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax crouches beside the slain roan gelding and plucks a black-fletched shaft from the leather cantle. "Cragmaw fletching—crow feathers bound with sinew. Look at the mud by the embankment: they dragged two bodies north into the treeline, and whoever led them knew to strip Gundren\'s map tube first."'
                },
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick\'s jaw tightens as he recognizes the silver-stamped saddle blanket trampled in the mire. "That is Sildar Hallwinter\'s mount—a sworn blade of the Lords\' Alliance. If those green-skinned cutthroats still hold him alive, we owe him steel and swift rescue."'
                }
            ],
            encounter: {
                title: 'Cragmaw Road Ambushers',
                difficulty: 'Moderate',
                xpReward: 200,
                monsters: [
                    { monsterId: 'goblin', name: 'Cragmaw Goblin Skirmisher', count: 4 }
                ],
                tacticalNotes: 'Goblins use Nimble Escape to duck behind the embankment after loosing arrows. If three fall, the survivor attempts to flee north up the hidden footpath.',
                terrainFeature: 'Dense Briar Embankment (Half Cover & Difficult Terrain)'
            },
            loot: {
                gold: 18,
                items: [
                    {
                        id: 'gundren_empty_map_case',
                        name: 'Gundren\'s Engraved Leather Map Case',
                        type: 'quest',
                        rarity: 'Common',
                        description: 'Tooled with the Rockseeker clan rune; the map inside was torn away, leaving a scrap mentioning Cragmaw Hideout.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'inspect_horses',
                    label: 'Examine the slain mounts, arrows, and muddy drag marks (Investigation DC 10)',
                    type: 'skillCheck',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 10,
                    successText: 'You part the trampled ferns and piece together the ambush in vivid detail: the horses have been dead less than twenty hours, their saddlebags rifled with practiced haste. Two sets of boot heels—one heavy and iron-shod, the other spurred—were dragged north into Neverwinter Wood by a dozen goblin tracks, leaving behind Gundren\'s split leather map tube and a pouch of spilled silver.',
                    failText: 'You pull a black-feathered shaft from a saddlebag and confirm the ambushers were Cragmaw goblins, though the churning mud and wagon ruts obscure the finer details of the struggle. Still, a bruised trail of snapped twigs clearly leads north into the gloomy pines.',
                    rewardGold: 10
                },
                {
                    id: 'follow_goblin_trail',
                    label: 'Tether the wagon in the trees and stalk north up the goblin footpath',
                    type: 'move',
                    targetNodeId: 'goblin_trail'
                },
                {
                    id: 'ride_to_phandalin',
                    label: 'Drive the supply wagon onward down the trail toward Phandalin',
                    type: 'move',
                    targetNodeId: 'phandalin_hub'
                }
            ]
        },
        goblin_trail: {
            id: 'goblin_trail',
            title: '2. Cragmaw Forest Path — Winding Game Trail',
            act: 1,
            type: 'trap',
            coordinates: { x: 24, y: 24 },
            environment: 'forest',
            readAloud: `Shafts of pale sunlight slant through a tangled ceiling of ancient oaks and bearded moss as you press northwest along a damp game trail. The air smells of rotting autumn leaves, crushed pine resin, and the sour musk of goblin sweat. Deep heel-gouges in the black loam prove that heavy captives were hauled down this hollow at a forced march. Ahead, where the trail narrows between two lichen-crusted granite boulders, a patch of fallen pine needles and dead bracken lies unusually flat and tidy across the choke point. Beyond the boulders, the faint murmur of a cold mountain creek drifts through the trees.`,
            dmNotes: 'Hidden Trap! Cragmaw lookouts rigged a counterweighted ash-sapling snare and a 10-foot spiked pit beneath the woven mat of twigs and pine needles between the boulders (Perception DC 12 to spot the taut hemp cord and false earth; Sleight of Hand DC 11 to lash the sapling and wedge the pit frame).',
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax throws out a leather-clad arm to halt the column, his eyes narrowing at the lichen-covered granite. "Hold your boots—nobody sweeps the forest floor that neat by accident. Look up at that bent ash sapling; there\'s a waxed hemp trigger-line waiting to string the point-man up by his ankles."'
                },
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn kneels in the dark mud beside a scarred tree root, tracing a hobnailed boot print with his thumb. "That\'s dwarf-forged iron heel-plating—Gundren\'s work boots, no mistaking it. He kicked hard when they hauled him past here, bless his stubborn stone heart."'
                }
            ],
            trapOrHazard: {
                name: 'Camouflaged Snare & Spiked Pit',
                trigger: 'Stepping onto the false mat of woven twigs and pine needles in the center of the path.',
                detectSkill: 'perception',
                detectDc: 12,
                disarmSkill: 'sleight-of-hand',
                disarmDc: 11,
                saveAbility: 'dexterity',
                saveDc: 12,
                damageDice: '1d6',
                damageType: 'piercing',
                condition: 'Restrained',
                description: 'A hemp noose yanks the victim skyward while the brushwood mat collapses over sharpened wooden stakes.'
            },
            loot: {
                gold: 12,
                items: [
                    {
                        id: 'hunting_trap_kit',
                        name: 'Salvaged Ranger\'s Snare Cord',
                        type: 'gear',
                        rarity: 'Common',
                        description: 'Strong waxed hemp cord and iron pitons salvaged from the goblin trap.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'disarm_forest_snare',
                    label: 'Lash the bent sapling and disarm the hidden trigger mechanism (Sleight of Hand DC 11)',
                    type: 'skillCheck',
                    skill: 'sleight-of-hand',
                    ability: 'dexterity',
                    dc: 11,
                    successText: 'Working with surgical patience, you slide a dagger beneath the camouflaged pine needles, wedge the wooden toggle with an iron piton, and sever the taut hemp cord. The bent ash sapling relaxes without a whisper, leaving a coil of fine ranger cord and a dropped goblin coin-pouch at the edge of the exposed pit.',
                    failText: 'Your blade slips against the wet bark and the bent sapling whips skyward with a pistol-crack of snapping wood! You throw yourself backward just as the brushwood lattice collapses into a pit of fire-hardened stakes, though flying splinters rake painfully across your shins.',
                    failDamageDice: '1d4',
                    rewardGold: 12
                },
                {
                    id: 'advance_cragmaw_entrance',
                    label: 'Press onward toward the sound of rushing water at Cragmaw Hideout',
                    type: 'move',
                    targetNodeId: 'cragmaw_entrance'
                },
                {
                    id: 'return_ambush_trail',
                    label: 'Retrace your steps south to the wagon on the Triboar Trail',
                    type: 'move',
                    targetNodeId: 'ambush_trail'
                }
            ]
        },
        cragmaw_entrance: {
            id: 'cragmaw_entrance',
            title: '3. Cragmaw Hideout — Cave Mouth & Briar Blind',
            act: 1,
            type: 'exploration',
            coordinates: { x: 38, y: 18 },
            environment: 'cavern',
            readAloud: `The forest trail opens into a shadowy ravine where an icy mountain stream foams out of the jagged maw of a hillside cavern. Cold spray beads on your cloaks as the water tumbles over slick mossy boulders, filling the clearing with a steady, rhythmic roar. Across the shallow ford on the eastern bank, a dense tangle of dead thorns has been hollowed out and woven into a crude archer's blind. Just inside the yawning darkness of the cave mouth, iron chains clank furiously against stone, accompanied by the savage, starving snarls of caged wolves.`,
            dmNotes: 'Two bored goblin sentries crouch inside the hollowed briar thicket on the east bank, bickering over a game of knucklebones. Because the roaring mountain creek drowns out footsteps, heroes wading along the western boulder shadow can slip past unnoticed (Stealth DC 11). If the sentries spot intruders, they loose arrows and shriek an alarm into the wolf kennel.',
            companionMoments: [
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax melts into the fern shadow beside the foaming water and points two fingers toward the hollowed-out brambles on the east bank. "Two lookouts in the thorns, too busy rattling knucklebones to watch the waterline. With this creek roaring in their ears, we can ghost right up the western ledge."'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra pulls her midnight cloak tight against the icy spray and studies the carved runes scratched into the boulder beside the cave mouth. "Cragmaw territory markers, freshly smeared with wolf tallow. Be wary—the acoustics of that cavern will carry a single shouted alarm all the way to their chieftain."'
                }
            ],
            encounter: {
                title: 'Briar Blind Lookouts',
                difficulty: 'Low',
                xpReward: 100,
                monsters: [
                    { monsterId: 'goblin', name: 'Cragmaw Sentry', count: 2 }
                ],
                tacticalNotes: 'The sentries are arguing over dice. If surprised, they panic and try to shout a warning up the stream tunnel.',
                terrainFeature: 'Roaring Mountain Stream (Masks Sound)'
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'sneak_stream_bank',
                    label: 'Use the roaring whitewater to ghost past the briar blind unseen (Stealth DC 11)',
                    type: 'skillCheck',
                    skill: 'stealth',
                    ability: 'dexterity',
                    dc: 11,
                    successText: 'Timing each stride to the crash of the foaming cascade, you hug the wet granite shadow along the western bank. Above you in the thorns, the two goblin sentries keep arguing over their bone dice as your party slips like wraiths into the cavern mouth.',
                    failText: 'A slick river cobble rolls beneath your boot heel and splashes loudly into the shallows! The bickering in the briar thicket stops dead, and two notched arrow-tips poke through the thorns as a sentry rasps an alarm!'
                },
                {
                    id: 'enter_wolf_kennel',
                    label: 'Slip into the eastern fissure where the chained wolves are snarling',
                    type: 'move',
                    targetNodeId: 'wolf_kennel'
                },
                {
                    id: 'wade_up_flood_hall',
                    label: 'Wade upstream into the main echoing cavern passage',
                    type: 'move',
                    targetNodeId: 'flood_hall'
                },
                {
                    id: 'retreat_goblin_trail',
                    label: 'Withdraw down the ravine to the forest trail',
                    type: 'move',
                    targetNodeId: 'goblin_trail'
                }
            ]
        },
        wolf_kennel: {
            id: 'wolf_kennel',
            title: '4. The Starving Kennel — Chained Wolves & Chimney',
            act: 1,
            type: 'puzzle',
            coordinates: { x: 48, y: 40 },
            environment: 'cavern',
            readAloud: `The overpowering stench of wet fur, sour tallow, and cracked marrow bones hits you like a physical blow inside this cramped limestone fissure. Three rib-gaunt timber wolves lunge and choke against heavy iron chains hammered into the base of a slick stalagmite, their yellow fangs snapping inches from your knees. Every frantic yank makes the rusted iron spike in the stalagmite groan and shower flakes of crumbled stone. At the back of the kennel, a narrow natural chimney of ribbed flowstone climbs thirty feet straight up toward a faint orange glow and the smell of roasting meat.`,
            dmNotes: 'The wolves are half-mad with hunger and abuse; tossing salted meat or speaking in soothing tones calms them (Animal Handling DC 11), whereas fighting them risks the iron tether spike pulling free on Round 2. Secret Shortcut: The narrow flowstone chimney at the rear of the chamber can be scaled (Athletics DC 11) to emerge behind the supply crates in Klarg\'s sanctum, completely bypassing the Surge Channel flood trap!',
            companionMoments: [
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn squints upward past the snapping fangs toward the fluted limestone shaft at the rear of the den. "Look at the soot stains on that natural chimney, friends—warm air is drawing straight up into the chieftain\'s hall. A steady climb there will put us right behind the bugbear\'s back!"'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax unfastens a strip of smoked venison from his belt pouch and clicks his tongue softly at the scarred alpha wolf. "Easy, ragged ones... goblins beat you with iron rods, didn\'t they? Chew on good deer-meat and let us pass in peace."'
                }
            ],
            encounter: {
                title: 'Starving Cragmaw Wolves',
                difficulty: 'Low',
                xpReward: 150,
                monsters: [
                    { monsterId: 'wolf', name: 'Starving Kennel Wolf', count: 3 }
                ],
                tacticalNotes: 'The wolves have Pack Tactics. Each round they lunge against the iron spike; on round 2 it pulls free unless they were calmed.',
                terrainFeature: 'Stalagmite Chain Tethers & Narrow Rock Chimney'
            },
            loot: {
                gold: 15,
                items: [
                    {
                        id: 'silvered_collar_charm',
                        name: 'Silver-Buckled Hound Collar',
                        type: 'treasure',
                        rarity: 'Common',
                        description: 'A fine silver buckle on a chewed leather collar worth 15 gp.'
                    }
                ]
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'calm_wolves',
                    label: 'Toss salted rations and soothe the starving wolves (Animal Handling DC 11)',
                    type: 'skillCheck',
                    skill: 'animal-handling',
                    ability: 'wisdom',
                    dc: 11,
                    successText: 'Dropping to one knee to appear non-threatening, you toss generous strips of salted beef across the bone-strewn stone. The three wolves snatch the meat out of the air, their hackles smoothing as they curl around the stalagmite to gnaw in quiet contentment while you move freely through the den.',
                    failText: 'Your sudden movement spooks the scarred alpha! With a deafening snarl, all three wolves throw their weight against the chains at once, wrenching the rusted iron spike straight out of the cracked stalagmite!'
                },
                {
                    id: 'climb_chimney_shortcut',
                    label: 'Scale the narrow stone chimney directly into Klarg\'s sanctum (Athletics DC 11)',
                    type: 'skillCheck',
                    skill: 'athletics',
                    ability: 'strength',
                    dc: 11,
                    targetNodeId: 'klarg_throne',
                    successText: 'Wedging your boots and shoulders against the ribbed limestone walls, you haul yourself hand-over-hand up the thirty-foot flue. You crest the lip in complete silence behind a fortress of stolen Lionshield crates, ambushing Klarg\'s throne room from the shadows!',
                    failText: 'Slick cave moss and crumbling shale give way beneath your boot midway up the shaft! You scrape down the rock face in a shower of pebbles and thud painfully back onto the kennel floor.',
                    failDamageDice: '1d4'
                },
                {
                    id: 'move_to_flood_hall',
                    label: 'Step out of the kennel into the main stream channel',
                    type: 'move',
                    targetNodeId: 'flood_hall'
                },
                {
                    id: 'move_to_cragmaw_entrance',
                    label: 'Slip back out to the cavern entrance',
                    type: 'move',
                    targetNodeId: 'cragmaw_entrance'
                }
            ]
        },
        flood_hall: {
            id: 'flood_hall',
            title: '5. The Surge Channel — Main Stream Passage',
            act: 2,
            type: 'trap',
            coordinates: { x: 52, y: 16 },
            environment: 'cavern',
            readAloud: `The main cavern passage climbs steeply upstream along a slick bed of water-polished shale and ankle-deep rapids. Twenty feet overhead, a rickety plank bridge spans the gorge between two shadowy rock ledges, dripping condensation onto your shoulders. A cold draft smells of wet river clay and freshly chopped pine timbers. Up in the gloom beyond the bridge, the rushing stream sounds strangely muffled—as though a vast weight of water is straining against stacked stone and mud. A pair of yellow eyes glints from the upper ledge, followed by the scrape of a heavy wooden mallet against timber!`,
            dmNotes: 'Hidden Flood Trap! Above the eastern passage, the goblins constructed two collapsible wooden dams holding back thousands of gallons of icy mountain water. When intruders reach mid-channel, lookouts knock free the timber props, unleashing a raging wall of water (Strength Save DC 12 or Athletics DC 12 to dive into the western rock alcove; failure deals 2d4 bludgeoning damage and knocks victims Prone).',
            companionMoments: [
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick plants his gauntleted hand against the wet shale wall and points urgently toward a recessed western niche. "Hear that hollow groan upstream? Those bastards have dammed the creek above the bridge! Get your backs into that rock alcove before they knock the timbers loose!"'
                }
            ],
            trapOrHazard: {
                name: 'Cragmaw Flash-Flood Barrage',
                trigger: 'Goblin lookouts knocking away the wooden dam braces as intruders ascend the wet stone slope.',
                detectSkill: 'perception',
                detectDc: 12,
                disarmSkill: 'athletics',
                disarmDc: 12,
                saveAbility: 'strength',
                saveDc: 12,
                damageDice: '2d4',
                damageType: 'bludgeoning',
                condition: 'Prone',
                description: 'Thousands of gallons of frigid mountain water roar down the cramped passage, threatening to sweep adventurers off their feet.'
            },
            restAvailable: 'none',
            choices: [
                {
                    id: 'brace_against_flood',
                    label: 'Lunging into the western rock alcove, wedge your shields against the surge (Athletics DC 12)',
                    type: 'skillCheck',
                    skill: 'athletics',
                    ability: 'strength',
                    dc: 12,
                    successText: 'Seconds before the timber dam gives way with a thunderous boom, you haul your companions into the jagged western recess and lock your boots against the stone! A foaming wall of frigid mountain water roars past your knees, sweeping barrels and loose boulders down the gorge while leaving your party unharmed.',
                    failText: 'The wooden dam bursts with the roar of a breaking storm! A chest-high torrent of icy whitewater and tumbling river stones slams into your formation, battering your armor against the cavern walls before the surge drains away.',
                    failDamageDice: '2d4'
                },
                {
                    id: 'ascend_to_klarg',
                    label: 'Charge up the slick stone steps into Klarg\'s twin-pool cavern',
                    type: 'move',
                    targetNodeId: 'klarg_throne'
                },
                {
                    id: 'back_to_entrance',
                    label: 'Retreat downstream toward the cavern mouth',
                    type: 'move',
                    targetNodeId: 'cragmaw_entrance'
                }
            ]
        },
        klarg_throne: {
            id: 'klarg_throne',
            title: '6. Klarg\'s Twin-Pool Cavern — Sub-Boss Sanctum',
            act: 2,
            type: 'combat',
            coordinates: { x: 66, y: 28 },
            environment: 'cavern',
            readAloud: `Flickering orange firelight dances across the wet stalactites of this wide, split-level cavern, where twin retention pools feed a noisy waterfall. Stacked crates and flour sacks stamped with the blue lion crest of the Lionshield Coster have been piled into a megalomaniacal throne at the center of the chamber. Towering atop the plunder stands Klarg—a hulking, scar-chested bugbear draped in mangy wolf pelts, swinging a spiked iron morningstar in one massive fist. Beside the crackling firepit, his grey-muzzled alpha wolf Ripper bares bloodied fangs, while near the edge of the upper ledge lies a bruised human warrior in torn chainmail, bound hand and foot in rusty iron fetters.`,
            dmNotes: 'Klarg is deluded with grandeur and bellows in the third person ("Who dares challenge the mighty Klarg?!"). He uses the stacked Lionshield crates for half cover before charging in with Brute melee strikes. If his beloved wolf Ripper is slain, Klarg panics and fights defensively. Striking the fetters off Sildar Hallwinter reveals the truth about Gundren Rockseeker, Cragmaw Castle, and the mysterious Black Spider.',
            companionMoments: [
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick lowers his visor and points his longsword directly at the bugbear warlord\'s throat. "Hold fast, Brother Hallwinter—the Lords\' Alliance does not abandon its own! Stand behind my shield while we teach this overgrown brigand the price of highway robbery!"'
                },
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn\'s beard bristles with righteous fury as he spots a crushed dwarven mining Pickaxe beside Klarg\'s firepit. "That filthy brute is sitting on Gundren\'s expedition crates! By Moradin\'s anvil, let\'s crack his skull and find out where he sent my kinsman!"'
                }
            ],
            npcs: [
                {
                    id: 'sildar_hallwinter',
                    name: 'Sildar Hallwinter',
                    role: 'Agent of the Lords\' Alliance',
                    attitude: 'Friendly',
                    dialogue: '"Gods bless your steel, friends—another hour on this cold stone and Klarg would have made good on his threat to roast me! Listen closely: King Grol\'s goblins ambushed us on the direct orders of a drow sorcerer calling himself the Black Spider. They hauled Gundren and his map of Wave Echo Cave away toward the high peaks, and I overheard Klarg boasting that the Redbrand mercenaries in Phandalin answer to the very same master!"',
                    influenceDc: 10,
                    influenceSkill: 'persuasion',
                    secretInfo: 'Sildar came to Phandalin searching for Iarno "Glasstaff" Albrek, a missing wizard of the Lords\' Alliance who vanished near Tresendar Manor—and who has secretly become the leader of the Redbrands.',
                    rewardItem: {
                        id: 'sildar_signet_voucher',
                        name: 'Lords\' Alliance Signet Writ (50 gp)',
                        type: 'quest',
                        rarity: 'Uncommon',
                        description: 'A wax-sealed voucher from Sildar Hallwinter redeemable in Phandalin and granting authority against the Redbrands.'
                    }
                }
            ],
            encounter: {
                title: 'Warlord Klarg & His Retinue',
                difficulty: 'High',
                xpReward: 400,
                monsters: [
                    { monsterId: 'bugbear', name: 'Klarg the Cragmaw Warlord', count: 1 },
                    { monsterId: 'wolf', name: 'Ripper the Mangy Wolf', count: 1 },
                    { monsterId: 'goblin', name: 'Cragmaw Bodyguard', count: 2 }
                ],
                tacticalNotes: 'Klarg uses Brute for heavy melee hits and hides behind supply crates for cover before ambushing.',
                terrainFeature: 'Roaring Firepit & Stacked Supply Crates'
            },
            loot: {
                gold: 85,
                items: [
                    {
                        id: 'jade_frog_statuette',
                        name: 'Golden-Eyed Jade Frog Statuette',
                        type: 'treasure',
                        rarity: 'Uncommon',
                        description: 'A delicately carved jade frog with tiny golden orbs for eyes, worth 40 gp.'
                    },
                    {
                        id: 'potion_healing_klarg',
                        name: 'Potion of Healing',
                        type: 'potion',
                        rarity: 'Common',
                        healDice: '2d4+2',
                        description: 'A crystal vial of shimmering crimson liquid that restores 2d4 + 2 Hit Points.'
                    },
                    {
                        id: 'klarg_morningstar_plus1',
                        name: 'Klarg\'s Ironspike Morningstar +1',
                        type: 'weapon',
                        rarity: 'Uncommon',
                        bonus: 1,
                        damageDice: '1d8',
                        description: 'A brutal dwarven-forged morningstar conferring a +1 bonus to attack and damage rolls.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'rescue_sildar',
                    label: 'Strike off Sildar Hallwinter\'s fetters and tend his wounds (Persuasion DC 10)',
                    type: 'social',
                    skill: 'persuasion',
                    ability: 'charisma',
                    dc: 10,
                    successText: 'You shatter the rusted manacles and offer Sildar a pull from your waterskin. Gripping your forearm with an iron clasp, the veteran knight writes you a wax-sealed Lords\' Alliance voucher for fifty gold pieces and reveals that a secret woodland tunnel beneath Tresendar Manor leads straight into the Redbrands\' subterranean lair.',
                    failText: 'Wincing as you pry the heavy chains off his bruised wrists, Sildar catches his breath and leans on a spear for support. Though too battered to remember every detail, he pledges fifty gold upon reaching Phandalin and warns you that the Redbrands in Tresendar Manor serve the Black Spider.',
                    rewardGold: 50
                },
                {
                    id: 'travel_to_phandalin',
                    label: 'Load the recovered provisions and escort Sildar into Phandalin',
                    type: 'move',
                    targetNodeId: 'phandalin_hub'
                },
                {
                    id: 'descend_chimney_kennel',
                    label: 'Climb down the natural rock chimney into the wolf kennel',
                    type: 'move',
                    targetNodeId: 'wolf_kennel'
                }
            ]
        },
        phandalin_hub: {
            id: 'phandalin_hub',
            title: '7. Frontier Town of Phandalin — Safe Haven & Market',
            act: 2,
            type: 'merchant',
            coordinates: { x: 42, y: 74 },
            environment: 'town',
            readAloud: `Set amidst the timbered foothills of the Sword Mountains, the frontier settlement of Phandalin rises from the mossy stone foundations of a long-fallen kingdom. New log cabins and busy smithies cluster around a rutted town green where hardy prospectors, woodcutters, and ox-drovers trade news in hushed voices. The savory aroma of mutton stew and fresh-baked brown bread drifts from the warm lantern-lit porch of the Stonehill Inn, while across the lane, Elmar Barthen waves you toward the stacked barrels of his trading post. Yet high on the wooded knoll east of town, the jagged, ivy-strangled ruins of Tresendar Manor cast a brooding shadow over every hearth. Whenever a scarlet cloak appears on the lane, shutters slam shut and mothers hurry their children indoors.`,
            dmNotes: 'Phandalin is the party\'s frontier hub for Long Rests at the Stonehill Inn and purchasing upgraded arms at Barthen\'s Provisions. Canvassing the fearful townsfolk (Persuasion DC 11) introduces young Carp Alderleaf, a halfling lad who discovered the Redbrands\' secret smugglers\' tunnel in the woods beneath Tresendar Manor.',
            companionMoments: [
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn inhales the scent of hearth-smoke and claps Elmar Barthen on the shoulder like an old friend. "Good Master Barthen! We brought Gundren\'s wagon through the Cragmaw ambush, and by Moradin\'s beard, we won\'t rest until every Rockseeker brother stands safe in this square."'
                },
                {
                    companionName: 'Ser Garrick Stoneheart',
                    matchClass: 'fighter',
                    matchRace: 'human',
                    text: 'Ser Garrick gazes up at the ruined silhouette of Tresendar Manor on the eastern hill, his hand resting on his pommel. "Scarlet-cloaked bullies shaking down honest merchants while the Townmaster cowers behind his inkwell? Not on our watch. Let\'s take the fight straight to their cellar."'
                }
            ],
            npcs: [
                {
                    id: 'elmar_barthen',
                    name: 'Elmar Barthen',
                    role: 'Proprietor of Barthen\'s Provisions',
                    attitude: 'Friendly',
                    dialogue: '"Thank the gods the wagon made it—and Sildar with you! When Gundren and his brothers Tharden and Nundro came through here two weeks back, their eyes were shining like they\'d struck the Motherlode of old Phandelver itself! Take whatever blades, shields, or healing draughts you need from my shelves, and please—break those Redbrand cutthroats up on Tresendar Hill before they strangle this town!"',
                    influenceDc: 11,
                    influenceSkill: 'persuasion',
                    secretInfo: 'Barthen whispers that Qelline Alderleaf\'s boy, Carp, spotted Redbrands sneaking out of a hidden culvert in the alder thicket just south of Tresendar Manor.',
                },
                {
                    id: 'toblen_stonehill',
                    name: 'Toblen Stonehill',
                    role: 'Innkeeper of the Stonehill Inn',
                    attitude: 'Friendly',
                    dialogue: '"Come in out of the wind, friends! I\'ve got hot spiced cider on the hob, thick mutton stew in the kettle, and clean featherbeds upstairs. Just keep your voices low when speaking of Tresendar Manor—the Redbrands have ears in the taproom, and folk who cross their wizard leader \'Glasstaff\' vanish into the dark."',
                    influenceDc: 10,
                    influenceSkill: 'insight',
                    secretInfo: 'Toblen overheard two drunken Redbrands boasting about a "one-eyed whisper-beast" living in the cold crevasse beneath the manor that feeds on anyone Glasstaff dislikes.'
                }
            ],
            shopInventory: [
                {
                    id: 'shop_healing_potion',
                    name: 'Potion of Healing',
                    type: 'potion',
                    price: 50,
                    rarity: 'Common',
                    healDice: '2d4+2',
                    description: 'Restores 2d4 + 2 Hit Points when quaffed.'
                },
                {
                    id: 'shop_greater_healing',
                    name: 'Potion of Greater Healing',
                    type: 'potion',
                    price: 120,
                    rarity: 'Uncommon',
                    healDice: '4d4+4',
                    description: 'Restores 4d4 + 4 Hit Points when quaffed.'
                },
                {
                    id: 'shop_longsword_plus1',
                    name: 'Dwarven Longsword +1',
                    type: 'weapon',
                    price: 150,
                    rarity: 'Uncommon',
                    bonus: 1,
                    damageDice: '1d8',
                    description: 'Finely balanced steel blade bearing Phandelver runes (+1 attack/damage).'
                },
                {
                    id: 'shop_studded_leather_plus1',
                    name: 'Ranger\'s Studded Leather +1',
                    type: 'armor',
                    price: 160,
                    rarity: 'Uncommon',
                    bonus: 1,
                    baseAc: 13,
                    description: 'Reinforced dark leather armor granting base AC 13 + DEX modifier.'
                },
                {
                    id: 'shop_shield_sentinel',
                    name: 'Shield of the Phandalin Militia (+1)',
                    type: 'shield',
                    price: 140,
                    rarity: 'Uncommon',
                    bonus: 1,
                    description: 'Heavy oak-and-iron shield granting an additional +1 AC bonus.'
                }
            ],
            restAvailable: 'both',
            choices: [
                {
                    id: 'long_rest_stonehill',
                    label: 'Share a hot meal and take a Long Rest at the Stonehill Inn',
                    type: 'rest',
                    successText: 'You gather round the crackling hearth of the Stonehill Inn over steaming bowls of rosemary mutton stew and crusted bread before retiring to clean, lavender-scented beds. By dawn, your wounds are mended, your spell slots are restored, and your spirits are ready for the perils beneath the hills.'
                },
                {
                    id: 'gather_phandalin_rumors',
                    label: 'Win the trust of the townsfolk to learn a secret way into Tresendar Manor (Persuasion DC 11)',
                    type: 'social',
                    skill: 'persuasion',
                    ability: 'charisma',
                    dc: 11,
                    successText: 'Reassured by your badges of courage, the halfling lad Carp Alderleaf tugs your cloak behind the apple orchard and points out a mossy stone culvert hidden in the woods! The smugglers\' tunnel bypasses the manor\'s front guardhouse and leads straight into the natural crevasse cavern beneath the cellar.',
                    failText: 'The miners and weavers glance nervously toward the ruined manor on the hill and mutter excuses before hurrying away. Though they fear the scarlet cloaks too much to guide you, their frightened glances confirm that the Redbrands lair in the old cellars beneath Tresendar Hill.'
                },
                {
                    id: 'enter_redbrand_cellar',
                    label: 'Infiltrate the Redbrand Hideout beneath Tresendar Manor',
                    type: 'move',
                    targetNodeId: 'redbrand_cellar'
                },
                {
                    id: 'march_to_wave_echo',
                    label: 'Set out into the craggy Sword Mountains toward Wave Echo Cave',
                    type: 'move',
                    targetNodeId: 'wave_echo_forge'
                },
                {
                    id: 'return_triboar_trail',
                    label: 'Ride back out along the Triboar Trail',
                    type: 'move',
                    targetNodeId: 'ambush_trail'
                }
            ]
        },
        redbrand_cellar: {
            id: 'redbrand_cellar',
            title: '8. Tresendar Cellar — The Cold Crevasse & The Nothic',
            act: 3,
            type: 'social',
            coordinates: { x: 66, y: 76 },
            environment: 'dungeon',
            readAloud: `A biting, unnatural cold rises like grave-breath from a jagged twenty-foot crevasse that splits the rough-hewn stone floor of this subterranean vault. Two weathered wooden bridges arch across the chasm, their planks creaking softly in the draft that smells of ozone, dry rot, and copper blood. Dressed stone steps climb the western wall toward the bolted doors of Glasstaff's sanctum. Down in the shadowed rubble behind a cracked marble column, a hunched, spiny aberration uncoils its clawed limbs and fixes a single colossal, weeping yellow eye upon your party. Suddenly, a wet, rasping voice slithers directly inside your skulls: "Warm flesh... pulsing with little secrets! Feed the Eye a truth or a treasure, or tumble into the dark!"`,
            dmNotes: 'Vesk the Nothic is a once-human arcanist warped by the residual Netherese magic leaking from the crevasse floor—the same magic that radiates faint necromantic cold throughout the chasm. The creature despises the bullying Redbrands and their cowardly master Glasstaff (Iarno Albrek). Heroes who bargain with it via Arcana or Deception (DC 13) can turn the Nothic into an informant who reveals the Black Spider\'s sealed map to Wave Echo Cave. Hidden at the bottom of the northern crevasse in a frost-rimed iron chest lies Talon, the ancestral +1 hawk-hilted longsword of Sir Aldith Tresendar.',
            companionMoments: [
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra shivers as silver sparks prickle along her fingertips, her eyes wide with horrified fascination as she gazes into the chasm. "That chill isn\'t natural cold—it\'s a scar in the Weave left by Netherese magic centuries ago! And that poor wretch behind the pillar was once a wizard who stared too deeply into its depths."'
                },
                {
                    companionName: 'Vax Shadowstep',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Vax keeps one hand on his dagger and taps his temple with the other, grinning crookedly into the gloom. "Get out of my head, one-eye—you won\'t like the cobwebs in there. Tell us where Glasstaff hides the Black Spider\'s letters, and you can have all the Redbrand carrion you can eat."'
                }
            ],
            npcs: [
                {
                    id: 'tresendar_nothic',
                    name: 'Vesk the Nothic',
                    role: 'Aberrant Sentinel of the Crevasse',
                    attitude: 'Indifferent',
                    dialogue: '"Heheheh... Glasstaff paces in his velvet robes, terrified of the drow! The Black Spider spins his web in the booming mountain where the green fire burns! Give the Eye arcane secrets or shiny gold, and the Eye shows you where the little wizard hid the Spider\'s map!"',
                    influenceDc: 13,
                    influenceSkill: 'deception',
                    secretInfo: 'Reveals the concealed niche behind the western pillar holding Iarno "Glasstaff" Albrek\'s correspondence from Nezznar the Black Spider, including the exact mountain route to Wave Echo Cave.',
                    rewardItem: {
                        id: 'black_spider_map_letter',
                        name: 'The Black Spider\'s Sealed Map to Wave Echo Cave',
                        type: 'quest',
                        rarity: 'Rare',
                        description: 'A parchment bearing the Black Spider\'s wax seal and the exact mountain coordinates of Wave Echo Cave.'
                    }
                }
            ],
            encounter: {
                title: 'The Crevasse Guardian & Redbrand Sentries',
                difficulty: 'Moderate',
                xpReward: 500,
                monsters: [
                    { monsterId: 'nothic', name: 'Crevasse Nothic', count: 1 },
                    { monsterId: 'bandit', name: 'Redbrand Ruffian', count: 2 }
                ],
                tacticalNotes: 'The Nothic uses Rotting Gaze from behind the stone pillars while the Redbrands attempt to shove heroes toward the crevasse edge.',
                terrainFeature: '20-Foot Necrotic Crevasse & Rickety Wooden Bridges'
            },
            loot: {
                gold: 110,
                items: [
                    {
                        id: 'talon_longsword_plus1',
                        name: 'Talon (+1 Longsword of Tresendar)',
                        type: 'weapon',
                        rarity: 'Uncommon',
                        bonus: 1,
                        damageDice: '1d8',
                        description: 'Sir Aldith Tresendar\'s ancestral blade with a hawk-shaped silver hilt (+1 attack and damage rolls).'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'parley_with_nothic',
                    label: 'Barter arcane lore and secrets telepathically with the Nothic (Arcana DC 13)',
                    type: 'social',
                    skill: 'arcana',
                    ability: 'intelligence',
                    dc: 13,
                    successText: 'Projecting a fragment of ancient spellcraft into the Nothic\'s fractured mind, you soothe its ravenous curiosity. The creature\'s giant eye dilates with glee as it pries loose a flagstone behind the pillar, tossing you a pouch of gold and Glasstaff\'s wax-sealed parchment detailing the Black Spider\'s hidden route into Wave Echo Cave!',
                    failText: 'The Nothic shudders and claws at its own skull as your telepathic gambit falters, its cyclopean eye flaring with sickly emerald light: "Empty lies! Tin-plated fools! The Eye will crack your bones and drink the marrow instead!"',
                    rewardGold: 30
                },
                {
                    id: 'search_crevasse_hoard',
                    label: 'Climb down into the freezing crevasse to search the frost-rimed chest (Investigation DC 12)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 12,
                    successText: 'Braving the necrotic chill at the bottom of the fault line, you brush away centuries of hoarfrost from a decayed oak coffer buried beneath the northern bridge. Inside, wrapped in oiled velvet alongside forty-five silvered coins, gleams Talon—the +1 silver-hawk longsword of the Black Hawk, Sir Aldith Tresendar!',
                    failText: 'The necrotic draft numbs your fingers as you wrestle with the rusted iron padlock of the buried coffer. Though the lock finally snaps with a loud metallic clang that echoes through the cellar, you haul the heavy blade Talon and a handful of tarnished coins out of the frost.',
                    rewardGold: 45,
                    rewardItem: {
                        id: 'talon_longsword_plus1',
                        name: 'Talon (+1 Longsword of Tresendar)',
                        type: 'weapon',
                        rarity: 'Uncommon',
                        bonus: 1,
                        damageDice: '1d8',
                        description: 'Sir Aldith Tresendar\'s ancestral blade with a hawk-shaped silver hilt (+1 attack and damage rolls).'
                    }
                },
                {
                    id: 'advance_wave_echo_forge',
                    label: 'Follow the Black Spider\'s secret mountain coordinates to Wave Echo Cave',
                    type: 'move',
                    targetNodeId: 'wave_echo_forge'
                },
                {
                    id: 'return_phandalin_from_cellar',
                    label: 'Climb back up to the streets of Phandalin',
                    type: 'move',
                    targetNodeId: 'phandalin_hub'
                }
            ]
        },
        wave_echo_forge: {
            id: 'wave_echo_forge',
            title: '9. Wave Echo Cave — The Spell Forge of Phandelver',
            act: 3,
            type: 'exploration',
            coordinates: { x: 78, y: 50 },
            environment: 'dungeon',
            readAloud: `A deep, rhythmic thunder rolls through the darkness every thirty seconds—the awe-inspiring heartbeat of a subterranean sea crashing against hollow cavern walls. Following that resonant pulse through blast-scarred tunnels strewn with ancient dwarven bones, you step through sheared bronze doors into a vaulted arcane workshop. At the center of a cracked marble dais stands a brass-bound stone brazier where a pillar of roaring, heatless emerald flame dances and crackles with raw magic! The air tastes of copper, ozone, and centuries-old ash. As your boots cross the threshold, green light catches the eye-sockets of charred skeletons in Phandelver war-plate, and a cadaverous ghoul in the tattered robes of an archmage rises from the anvil with a rasping shriek!`,
            dmNotes: 'This is the legendary Spell Forge of the Phandelver Pact, where dwarf master-smiths and human arcanists once channeled the mountain\'s Weave-node into enchanted arms. Though five hundred years have weakened its matrix, a hero who attunes to the emerald brazier (Arcana DC 13) can bathe the party\'s weapons in lingering emerald fire and recover the radiant mace Lightbringer from the altar pedestal.',
            companionMoments: [
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn falls to both knees on the scorched flagstones, tears of emerald light reflecting in his eyes as he traces the hammer-and-star seal carved into the dais. "By Moradin\'s Soul-Forge... five hundred winters my clan sang dirges for the lost smiths of the Phandelver Pact, and here their green flame still burns! Raise your steel, my friends—let our ancestors bless our blades!"'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra steps toward the emerald brazier with her palms upturned, her silver hair lifting in the static draft of pure Weave energy. "Incredible... human wizards of old Phalorm and shield dwarf runesmiths braided two entirely different traditions of magic into a single living flame. If we harmonize with its cadence, the Forge itself will arm us against the drow!"'
                }
            ],
            encounter: {
                title: 'Undead Guardians of the Spell Forge',
                difficulty: 'Moderate',
                xpReward: 350,
                monsters: [
                    { monsterId: 'ghoul', name: 'Mormesk\'s Ghoul Acolyte', count: 1 },
                    { monsterId: 'skeleton', name: 'Phandelver Forge-Guard Skeleton', count: 3 }
                ],
                tacticalNotes: 'The skeletons form a shield wall on the stone steps while the ghoul leaps from the brazier platform to paralyze spellcasters.',
                terrainFeature: 'Emerald Brazier of the Spell Forge (+1 Radiant Aura)'
            },
            loot: {
                gold: 150,
                items: [
                    {
                        id: 'lightbringer_mace',
                        name: 'Lightbringer (+1 Radiant Mace)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 1,
                        damageDice: '1d6',
                        description: 'Forged for clerics of Lathander; glows like a torch and deals an extra 1d6 radiant damage to undead.'
                    },
                    {
                        id: 'wand_magic_missiles_forge',
                        name: 'Wand of Magic Missiles',
                        type: 'wand',
                        rarity: 'Uncommon',
                        damageDice: '3d4+3',
                        description: 'An ebony-and-silver wand etched with Phandelver stars that unleashes unerring bolts of arcane force.'
                    }
                ]
            },
            restAvailable: 'short',
            choices: [
                {
                    id: 'attune_spell_forge',
                    label: 'Intone the Phandelver binding canticle and plunge your weapons into the emerald flame (Arcana DC 13)',
                    type: 'puzzle',
                    skill: 'arcana',
                    ability: 'intelligence',
                    dc: 13,
                    successText: 'Matching your breath to the booming rhythm of the subterranean waves, you thrust your steel into the heart of the brass brazier. Cool emerald fire cascades harmlessly over your gauntlets, infusing your weapons with a singing harmonic edge as the stone pedestal parts to reveal Lightbringer—the golden +1 sun-burst mace of Lathander!',
                    failText: 'Your incantation clashes with the surging cadence of the subterranean surf, causing the unstable emerald flame to lash out in a whip of crackling green lightning! Sparks scorch your fingers before the brazier settles back into a low hum.',
                    failDamageDice: '1d6',
                    rewardGold: 50
                },
                {
                    id: 'enter_black_spider_sanctum',
                    label: 'Cross the booming chasm into the Temple of Dumathoin (Boss Sanctum)',
                    type: 'move',
                    targetNodeId: 'black_spider_sanctum'
                },
                {
                    id: 'return_to_cellar',
                    label: 'Retrace the mountain trail toward Tresendar Cellar',
                    type: 'move',
                    targetNodeId: 'redbrand_cellar'
                },
                {
                    id: 'return_to_phandalin_direct',
                    label: 'Hike back down the mountain to Phandalin for supplies',
                    type: 'move',
                    targetNodeId: 'phandalin_hub'
                }
            ]
        },
        black_spider_sanctum: {
            id: 'black_spider_sanctum',
            title: '10. Temple of Dumathoin — Sanctum of the Black Spider',
            act: 4,
            type: 'boss',
            coordinates: { x: 90, y: 50 },
            environment: 'dungeon',
            readAloud: `Six towering pillars of cracked black marble support the vaulted ceiling of this ancient dwarven temple, their carved capitals choked in thick, glistening curtains of spiderweb. At the far end of the nave looms a monolithic granite statue of Dumathoin, Keeper of Secrets Under the Mountain, whose twin emerald eyes gleam through the gloom. Bound in cocoon-like strands of silk at the statue's feet lies Gundren Rockseeker, bloodied but defiant. Standing before the altar with a black adamant staff crowned by a silver spider is Nezznar the Black Spider—a pale-haired drow arcanist whose violet eyes narrow with cold malice. "So the little flies of Phandalin have crawled all the way into my parlor," Nezznar purrs, tapping his staff as two horse-sized giant spiders lower themselves from the ceiling on ropes of silk!`,
            dmNotes: 'Climax Boss Battle! Nezznar the Black Spider seeks to claim the Spell Forge to buy back his house\'s favor in Menzoberranzan. He uses the granite altar for cover while casting Shield and Web, ordering his Giant Spiders and elite bugbear champion to pin the party between the web-choked central pillars. Hidden Trap: The glittering emerald eyes of Dumathoin\'s statue are rigged with a dwarven counterweight mechanism (Investigation DC 14); prying an emerald loose without wedging the socket drops a cracked marble ceiling slab onto the altar!',
            companionMoments: [
                {
                    companionName: 'Nyx Nightbreeze',
                    matchClass: 'rogue',
                    matchRace: 'elf',
                    text: 'Nyx steps into the emerald glow with twin blades bared, her voice cutting across the temple like frost. "Playing king in a collapsed surface mine, Nezznar? Even the lowest drider in Menzoberranzan would laugh at your pathetic little web—and today we cut every thread!"'
                },
                {
                    companionName: 'Lyra Silverleaf',
                    matchClass: 'wizard',
                    matchRace: 'elf',
                    text: 'Lyra raises her staff as arcane sigils blaze around her wrists, matching the drow arcanist\'s violet glare. "The Spell Forge was woven in fellowship between surface kindreds, Nezznar—not to fuel the petty ambitions of a Menzoberranzan exile. Your shadow over Phandalin ends here!"'
                },
                {
                    companionName: 'Brother Brynn Ironforge',
                    matchClass: 'cleric',
                    matchRace: 'dwarf',
                    text: 'Brother Brynn thunders a dwarven war-prayer that echoes off the statue of Dumathoin, his warhammer blazing with golden light. "Hang on, Gundren! By the Keeper of Secrets Under the Mountain, we\'ll sweep this drow\'s filth from your ancestral halls!"'
                }
            ],
            npcs: [
                {
                    id: 'gundren_rockseeker_captive',
                    name: 'Gundren Rockseeker',
                    role: 'Rescued Dwarven Patron',
                    attitude: 'Friendly',
                    dialogue: '"By Moradin\'s smoking hammer, I knew I hired the finest blades in Neverwinter! Snap that drow bastard\'s spider-staff in two and Wave Echo Cave belongs to the Rockseeker Compact once more! Ten percent of every gold bar and enchanted ingot pulled from these halls is yours in perpetuity!"',
                    influenceDc: 10,
                    influenceSkill: 'persuasion',
                    secretInfo: 'With Nezznar defeated and the Spell Forge reclaimed, Gundren and Sildar establish your party as the honored Protectors of Phandalin with a permanent share of the restored mine\'s revenues.'
                }
            ],
            encounter: {
                title: 'Nezznar the Black Spider & His Brood',
                difficulty: 'Boss',
                xpReward: 900,
                monsters: [
                    { monsterId: 'cult-fanatic', name: 'Nezznar the Black Spider', count: 1 },
                    { monsterId: 'giant-spider', name: 'Sanctum Giant Spider', count: 2 },
                    { monsterId: 'bugbear', name: 'Cragmaw Elite Champion', count: 1 }
                ],
                tacticalNotes: 'Nezznar stays behind the altar using his Spider Staff while Giant Spiders drop from the ceiling webs to restrain melee heroes.',
                terrainFeature: 'Thick Ceiling Webs & Statue of Dumathoin'
            },
            trapOrHazard: {
                name: 'Web-Choked Pillars & Crumbling Ceiling Trap',
                trigger: 'Touching the webs between the central pillars or prying the emerald eye from Dumathoin\'s statue without bracing the keystone.',
                detectSkill: 'investigation',
                detectDc: 13,
                disarmSkill: 'sleight-of-hand',
                disarmDc: 13,
                saveAbility: 'dexterity',
                saveDc: 12,
                damageDice: '2d6',
                damageType: 'bludgeoning',
                condition: 'Restrained',
                description: 'Sticky webs entangle intruders while rigged counterweights drop cracked marble blocks from the ceiling.'
            },
            loot: {
                gold: 350,
                items: [
                    {
                        id: 'spider_staff_defense',
                        name: 'Nezznar\'s Spider Staff of Defense (+1)',
                        type: 'weapon',
                        rarity: 'Rare',
                        bonus: 1,
                        damageDice: '1d8',
                        description: 'A black adamant quarterstaff topped with a carved spider; grants +1 AC and +1 to attack and damage rolls.'
                    },
                    {
                        id: 'gauntlets_ogre_power_mine',
                        name: 'Gauntlets of Ogre Power',
                        type: 'wondrous',
                        rarity: 'Uncommon',
                        bonus: 2,
                        description: 'Ancient dwarven gauntlets forged in the Spell Forge that imbue the wearer with titanic strength.'
                    },
                    {
                        id: 'deed_wave_echo_share',
                        name: 'Charter of the Rockseeker Compact',
                        type: 'quest',
                        rarity: 'Rare',
                        description: 'Signed by Gundren Rockseeker, granting your party a 10% share of the restored Phandelver Pact Mine.'
                    }
                ]
            },
            restAvailable: 'long',
            choices: [
                {
                    id: 'cut_gundren_free',
                    label: 'Sever the enchanted spider-silk binding Gundren Rockseeker (Sleight of Hand DC 12)',
                    type: 'skillCheck',
                    skill: 'sleight-of-hand',
                    ability: 'dexterity',
                    dc: 12,
                    successText: 'Ducking beneath a spray of venomous webbing, you flick your blade along the non-adhesive anchor threads and slice Gundren\'s cocoon open in a single stroke! The shield dwarf roars a Rockseeker battle-cry, snatches up a fallen warhammer from the altar steps, and presses a hundred gold sovereigns and the signed mine charter into your hands!',
                    failText: 'The enchanted drow silk clings stubbornly to your gauntlets and blade like pitch, forcing you to saw through the sticky strands by main force. Though it costs precious seconds, you finally wrench Gundren free so he can scramble behind your shield wall.',
                    rewardGold: 100
                },
                {
                    id: 'loot_dumathoin_emeralds',
                    label: 'Inspect the statue of Dumathoin and pry free its twin emerald eyes (Investigation DC 14)',
                    type: 'search',
                    skill: 'investigation',
                    ability: 'intelligence',
                    dc: 14,
                    successText: 'Climbing onto the granite shoulders of the Keeper of Secrets, you spot a hair-thin bronze tripwire recessed behind the left gem socket. You jam an iron piton into the counterweight gear and cleanly lever out both fist-sized, flawless emeralds without disturbing a single stone in the vaulted ceiling!',
                    failText: 'As your dagger pops the glittering emerald out of the statue\'s socket, a hidden bronze counterweight snaps inside the granite skull! With a deafening rumble, a cracked marble keystone breaks loose from the ceiling vault and crashes down across the altar steps!',
                    failDamageDice: '2d6',
                    rewardGold: 150
                },
                {
                    id: 'return_to_spell_forge',
                    label: 'Return across the booming chasm to the Spell Forge chamber',
                    type: 'move',
                    targetNodeId: 'wave_echo_forge'
                }
            ]
        }
    }
};

export const lostMineAdventure = lostMine;
export default lostMine;
