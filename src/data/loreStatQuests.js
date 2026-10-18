// Interactive Lore-Themed Stat Quest Generator
// Generates personalized origin questions tailored to the player's chosen Race & Class,
// and derives a balanced D&D 5e stat tree from their choices.

import { getClassById } from './classes.js';
import { getRaceById } from './races.js';

// Race-specific origin trials
const RACE_QUESTIONS = {
    human: {
        title: "The Crucible of Ambition",
        prompt: "Humans have neither the lifespan of elves nor the stone-forged endurance of dwarves. In your youth, how did you carve your place in the world?",
        choices: [
            {
                id: 'might',
                label: "Labor & Frontier Warfare",
                description: "Swung a woodsman's axe and stood watch on the frontier stockade.",
                quote: "Sweat, blood, and calluses — that is how humans endure.",
                statBias: { strength: 3, constitution: 2, dexterity: 1 }
            },
            {
                id: 'cunning',
                label: "City Rooftops & Alleys",
                description: "Slipped through crowded merchant bazaars, dodging city watch and rival cutpurses.",
                quote: "If you cannot outlast them, outrun and outsmart them.",
                statBias: { dexterity: 3, intelligence: 2, charisma: 1 }
            },
            {
                id: 'scholarly',
                label: "Great Guild Libraries",
                description: "Devoured dusty codices by candlelight, mastering histories and trade ledgers.",
                quote: "Knowledge is the greatest lever to move kingdoms.",
                statBias: { intelligence: 3, wisdom: 2, constitution: 1 }
            },
            {
                id: 'diplomatic',
                label: "The Grand Council Halls",
                description: "Learned the cadence of diplomacy and persuasion, winning allies through sheer presence.",
                quote: "A well-chosen word turns an enemy into an army at your back.",
                statBias: { charisma: 3, wisdom: 2, dexterity: 1 }
            }
        ]
    },
    elf: {
        title: "The Twilight Awakening",
        prompt: "During your century of youth beneath the ancient canopy of the Fey-touched groves, which ancestral grace resonated most deeply with your soul?",
        choices: [
            {
                id: 'blade_dance',
                label: "The Swift Way of the Fey Blade",
                description: "Practiced the silent sword-dance across moss-draped branches.",
                quote: "Move like wind through silver leaves; strike before the dew drops.",
                statBias: { dexterity: 3, strength: 2, wisdom: 1 }
            },
            {
                id: 'ancient_weave',
                label: "Communion with the Arcane Weave",
                description: "Listened to the singing ley-lines and decoded forgotten celestial charts.",
                quote: "The Weave is alive; you must only remember how to hear its verse.",
                statBias: { intelligence: 3, wisdom: 2, dexterity: 1 }
            },
            {
                id: 'nature_harmony',
                label: "The Silent Watch of the Woods",
                description: "Tracked the spirit beasts of the deep timber, reading signs in every broken twig.",
                quote: "The forest reveals all secrets to those who quiet their pride.",
                statBias: { wisdom: 3, constitution: 2, dexterity: 1 }
            },
            {
                id: 'fey_allure',
                label: "Court of the Summer Reverie",
                description: "Studied the ethereal arts of poetry, illusion, and timeless elven glamour.",
                quote: "Beauty and elegance can disarm a warlord faster than a poisoned arrow.",
                statBias: { charisma: 3, dexterity: 2, intelligence: 1 }
            }
        ]
    },
    dwarf: {
        title: "The Rite of the Deep Anvil",
        prompt: "Beneath the roots of the mountain, every dwarf must present their masterwork or martial prowess to the Clan Thanes. How did you earn your beard's silver ring?",
        choices: [
            {
                id: 'iron_arm',
                label: "Three Days at the Great Forge",
                description: "Pounded glowing mithral and battle-steel without dropping your hammer once.",
                quote: "The metal yields only to iron will and a stronger arm.",
                statBias: { strength: 3, constitution: 3, wisdom: 1 }
            },
            {
                id: 'stone_lore',
                label: "Deciphering Ancestral Runes",
                description: "Mapped the lost veins of the First Deep and unlocked the vault of King Torag.",
                quote: "The stone never lies, but it only speaks to the patient mind.",
                statBias: { intelligence: 3, wisdom: 2, constitution: 1 }
            },
            {
                id: 'shield_wall',
                label: "Holding the Underdark Breach",
                description: "Locked shields against a swarm of cave horrors until the relief vanguard arrived.",
                quote: "A dwarf in a breach is a mountain with boots.",
                statBias: { constitution: 3, strength: 2, wisdom: 1 }
            },
            {
                id: 'clan_voice',
                label: "Settling the Blood-Feud",
                description: "Broke bread between warring guildmasters, invoking the ancient hospitality oaths.",
                quote: "Gold is heavy, but an unbroken oath outweighs the mountain.",
                statBias: { charisma: 3, wisdom: 2, strength: 1 }
            }
        ]
    },
    halfling: {
        title: "The Shire's Perilous Spark",
        prompt: "Halflings are renowned for comfortable hearths and good food, yet something restless tugged at your heels. What drew you past the garden gate?",
        choices: [
            {
                id: 'quick_fingers',
                label: "The Curious Pocket & Nimble Dash",
                description: "Borrowing trinkets from grumpy innkeepers and slipping through dog-doors unseen.",
                quote: "I didn't steal it; I was merely keeping it safe from gravity!",
                statBias: { dexterity: 3, charisma: 2, intelligence: 1 }
            },
            {
                id: 'brave_heart',
                label: "Standing Up to the Big Folk",
                description: "Stepped in front of an ogre's club with a sling and a laugh to protect your kin.",
                quote: "Size means nothing when your courage is ten feet tall.",
                statBias: { constitution: 2, dexterity: 2, strength: 2 }
            },
            {
                id: 'keen_ears',
                label: "Wandering Troubadour & Scout",
                description: "Listened to rumors at every crossroad tavern and read the signs of foul weather.",
                quote: "Listen long enough, and the road tells you where the treasure is buried.",
                statBias: { wisdom: 3, dexterity: 2, charisma: 1 }
            },
            {
                id: 'silver_tongue',
                label: "The Charming Merchant-Rover",
                description: "Traded three brass buttons for a pony and talked a goblin into sharing his pie.",
                quote: "A smile and an open hand will open gates that siege engines cannot crack.",
                statBias: { charisma: 3, dexterity: 2, wisdom: 1 }
            }
        ]
    },
    dragonborn: {
        title: "The Dragon-Sire's Crucible",
        prompt: "The roaring pride of dragon kings flows hot through your veins. In the martial arenas of your clan, how did your draconic spark manifest?",
        choices: [
            {
                id: 'overwhelming_might',
                label: "Crushing Force of the Dragon's Claw",
                description: "Shattered the stone training pillars with heavy greataxe strikes.",
                quote: "Our blood conquered the skies; our blades conquer the earth.",
                statBias: { strength: 4, constitution: 2 }
            },
            {
                id: 'fearsome_majesty',
                label: "The Dread Dragon's Roar",
                description: "Terrified elder warriors with sheer imposing presence and unyielding authority.",
                quote: "When a dragon speaks, even kings lower their eyes.",
                statBias: { charisma: 3, strength: 2, constitution: 1 }
            },
            {
                id: 'draconic_resilience',
                label: "Walking Through the Wyrm-Fire",
                description: "Endured the trial of the molten basin without flinching or crying out.",
                quote: "Scales are forged in heat; the body endures what the mind commands.",
                statBias: { constitution: 4, strength: 2 }
            },
            {
                id: 'draconic_insight',
                label: "The Dragon's Ancient Eye",
                description: "Studied the draconic runes of antiquity, discerning hidden truths in forgotten prophecies.",
                quote: "Power without wisdom is merely a beast burning its own lair.",
                statBias: { intelligence: 3, wisdom: 2, charisma: 1 }
            }
        ]
    },
    tiefling: {
        title: "The Infernal Heritage",
        prompt: "The dark whisper of the Nine Hells curls about your horns and tail. How did you learn to master the legacy that mortals fear?",
        choices: [
            {
                id: 'cunning_charm',
                label: "Master of Masks & Deception",
                description: "Turned mortal suspicion into fascinating intrigue and political leverage.",
                quote: "They expect a devil? Then let them bargain with one they cannot resist.",
                statBias: { charisma: 4, dexterity: 2 }
            },
            {
                id: 'shadow_stalker',
                label: "Vanishing into the Gloom",
                description: "Moved through the darkest alleys unseen, striking from shadows before anyone heard footsteps.",
                quote: "They fear the dark because they don't know who owns it.",
                statBias: { dexterity: 3, intelligence: 2, charisma: 1 }
            },
            {
                id: 'forbidden_pacts',
                label: "Decoding the Brimstone Tomes",
                description: "Studied the contracts and occult laws of the Lower Planes to turn them against their makers.",
                quote: "The devil is in the details, and I have read every clause.",
                statBias: { intelligence: 3, charisma: 2, wisdom: 1 }
            },
            {
                id: 'hellfire_vigor',
                label: "Enduring the Flames",
                description: "Survived poison, blades, and fire that would have slaughtered lesser folk.",
                quote: "Hellfire burns in my blood. What can your little sparks do to me?",
                statBias: { constitution: 3, strength: 2, charisma: 1 }
            }
        ]
    },
    gnome: {
        title: "The Clockwork Wonder",
        prompt: "With an inquisitive mind and relentless optimism, your gnomish burrow was filled with inventions, illusions, and strange experiments. What was your greatest breakthrough?",
        choices: [
            {
                id: 'contraption',
                label: "The Miniature Master-Mechanism",
                description: "Invented a clockwork lockpick that bypasses arcane tumbler wards.",
                quote: "Every puzzle is just a machine waiting to be disassembled!",
                statBias: { intelligence: 4, dexterity: 2 }
            },
            {
                id: 'illusion',
                label: "The Living Mirage",
                description: "Spun light and sound into a phantom dragon that fooled the local magistrate.",
                quote: "Reality is merely a matter of creative perspective.",
                statBias: { intelligence: 3, charisma: 2, dexterity: 1 }
            },
            {
                id: 'burrow_keen',
                label: "Whispers of the Deep Roots",
                description: "Discovered an ancient underground waterway by feeling vibrations in the soil.",
                quote: "Small creatures hear the things the giants stomp right over.",
                statBias: { wisdom: 3, intelligence: 2, constitution: 1 }
            },
            {
                id: 'nimble_dodge',
                label: "Dodging the Explosion",
                description: "Tested explosive alchemical concoctions and learned to leap out of the blast radius.",
                quote: "Failure is just rapid learning accompanied by loud noises!",
                statBias: { dexterity: 3, constitution: 2, intelligence: 1 }
            }
        ]
    },
    'half-elf': {
        title: "The Bridge of Two Worlds",
        prompt: "Walking between the fleeting passions of humans and the timeless grace of elves, you never truly belonged to either. How did you forge your identity?",
        choices: [
            {
                id: 'diplomat',
                label: "The Envoy of Both Courts",
                description: "Translated between elven lords and human merchants, commanding respect from both.",
                quote: "Belonging to neither means understanding both better than they understand themselves.",
                statBias: { charisma: 4, wisdom: 2 }
            },
            {
                id: 'wanderer',
                label: "The Lone Ranger of the Borderlands",
                description: "Found sanctuary in the wild frontier where neither race's judgment could reach you.",
                quote: "The wild cares nothing for your pedigree; it only asks if you can shoot straight.",
                statBias: { dexterity: 3, wisdom: 2, constitution: 1 }
            },
            {
                id: 'scholar',
                label: "Student of Dual Legacies",
                description: "Mastered human history and elven spellcraft, combining them into unique techniques.",
                quote: "Human urgency combined with elven technique is an unstoppable art.",
                statBias: { intelligence: 3, dexterity: 2, charisma: 1 }
            },
            {
                id: 'soldier',
                label: "The Hardened Sellsword",
                description: "Proved your heritage on the field of battle where steel is the only argument.",
                quote: "On the battlefield, blood is blood. Mine just moves faster.",
                statBias: { strength: 3, constitution: 2, dexterity: 1 }
            }
        ]
    },
    'half-orc': {
        title: "The Battle-Born Fury",
        prompt: "The fierce blood of Gruumsh beats a war-drum in your chest, tempered by human grit and resilience. When the tribe or city tested your mettle, how did you answer?",
        choices: [
            {
                id: 'unbroken',
                label: "The Relentless Juggernaut",
                description: "Took a blow that would have killed three men, stood back up, and smashed the attacker down.",
                quote: "You hit hard. Now it's my turn.",
                statBias: { strength: 4, constitution: 2 }
            },
            {
                id: 'savage_scout',
                label: "The Stalker of the Blood-Trail",
                description: "Tracked prey across frozen jagged crags, striking with terrifying suddenness.",
                quote: "They think we are clumsy brutes. That is the last mistake they ever make.",
                statBias: { dexterity: 3, strength: 2, wisdom: 1 }
            },
            {
                id: 'tribal_shaman',
                label: "Communion with the Ancestor Spirits",
                description: "Listened to the roar of fallen warriors in the thunder, drawing uncanny insight.",
                quote: "The ghosts of our fathers walk beside us; they scream when danger is near.",
                statBias: { wisdom: 3, strength: 2, constitution: 1 }
            },
            {
                id: 'warlord_presence',
                label: "The Iron-Chieftain's Command",
                description: "Silenced a brawling tavern or warband with a single gaze and an iron command.",
                quote: "Power isn't just in your fist; it's in knowing when everyone else must bow.",
                statBias: { charisma: 3, strength: 2, constitution: 1 }
            }
        ]
    }
};

// Class-specific Crucible Trials
const CLASS_QUESTIONS = {
    fighter: {
        title: "The Vanguard's Trial",
        prompt: "In your final martial trial against the garrison champion, the commander watched from the parapet. What was your battle doctrine?",
        choices: [
            {
                id: 'heavy_assault',
                label: "Unstoppable Heavy Blade & Shield",
                description: "Overwhelmed their guard with relentless, crushing strikes until their shield cracked.",
                statBias: { strength: 4, constitution: 2 }
            },
            {
                id: 'tactical_finesse',
                label: "Flawless Parries & Counter-Thrusts",
                description: "Danced on the balls of your feet, letting their heavy strikes miss by inches before striking.",
                statBias: { dexterity: 4, constitution: 2 }
            },
            {
                id: 'unshakable_bastion',
                label: "Iron Wall Defense & Grit",
                description: "Planted your boots, absorbed their full fury on your armor, and outlasted them in a war of attrition.",
                statBias: { constitution: 4, strength: 2 }
            },
            {
                id: 'battlefield_commander',
                label: "Strategic Feint & Roaring Command",
                description: "Used tactical terrain and shouted orders that confused the champion into making a fatal blunder.",
                statBias: { strength: 2, charisma: 2, intelligence: 2 }
            }
        ]
    },
    wizard: {
        title: "The Arcane Paradox",
        prompt: "During your master's absence, a rift of raw planar energy tore open inside the academy spire. How did you confront the breach?",
        choices: [
            {
                id: 'analytical_mastery',
                label: "Calculate Counter-Harmonics",
                description: "Inscribed the inverse geometry of the Ley-lines into the air, dispelling the vortex mathematically.",
                statBias: { intelligence: 5, wisdom: 1 }
            },
            {
                id: 'quick_wards',
                label: "Evasive Arcane Weaving",
                description: "Dodged falling arcane debris while weaving shield barriers to protect the fragile manuscripts.",
                statBias: { intelligence: 3, dexterity: 2, constitution: 1 }
            },
            {
                id: 'endure_backlash',
                label: "Channel & Ground the Arcane Surge",
                description: "Grabbed the volatile catalyst with your bare hands and grounded the magical lightning through your body.",
                statBias: { intelligence: 3, constitution: 3 }
            },
            {
                id: 'planar_communion',
                label: "Discern the Entity Behind the Rift",
                description: "Perceived the extraplanar consciousness peering through, using sheer willpower to banish it.",
                statBias: { intelligence: 3, wisdom: 3 }
            }
        ]
    },
    rogue: {
        title: "The Heist of Broken Knives",
        prompt: "To prove your worth to the shadow syndicates, you were tasked with retrieving the Black Ledger from the Baron's locked manor. How did you pull it off?",
        choices: [
            {
                id: 'shadow_infiltrator',
                label: "Silent Rooftops & Window Tumblers",
                description: "Ghosted past three sentries across the slate tiles and picked the vault lock in absolute silence.",
                statBias: { dexterity: 5, intelligence: 1 }
            },
            {
                id: 'silver_impostor',
                label: "The Grand Disguise & False Papers",
                description: "Walked right through the front gates disguised as a royal tax inspector, smiling all the way.",
                statBias: { dexterity: 3, charisma: 3 }
            },
            {
                id: 'blueprint_architect',
                label: "Studied the Mechanical Blueprints",
                description: "Found the hidden sewage bypass and disabled the poisoned pressure plates with surgical precision.",
                statBias: { dexterity: 3, intelligence: 3 }
            },
            {
                id: 'ruthless_scout',
                label: "Patience from the Rafters",
                description: "Observed the guard rotations for twelve hours, striking only when the odds were 100% in your favor.",
                statBias: { dexterity: 3, wisdom: 3 }
            }
        ]
    },
    cleric: {
        title: "The Calling of the Divine Altar",
        prompt: "When the plague of shadow struck the frontier settlement, the townspeople huddled in your temple. Where did you place your faith?",
        choices: [
            {
                id: 'miraculous_prayer',
                label: "Invoking Holy Radiance & Healing",
                description: "Channeling pure divine grace through your holy symbol to burn away the darkness.",
                statBias: { wisdom: 5, charisma: 1 }
            },
            {
                id: 'righteous_mace',
                label: "Smite the Unclean Fiends",
                description: "Donned heavy chainmail and raised a blessed warhammer to defend the sanctuary doors.",
                statBias: { wisdom: 3, strength: 3 }
            },
            {
                id: 'sacred_stamina',
                label: "Tending the Sick Night & Day",
                description: "Endured the virulent pestilence without collapsing, shielded by your divine constitution.",
                statBias: { wisdom: 3, constitution: 3 }
            },
            {
                id: 'inspirational_shepherd',
                label: "Sermon of Hope in the Gloom",
                description: "Rallied the terrified townsfolk with fiery sermons that kept fear and panic from consuming their souls.",
                statBias: { wisdom: 3, charisma: 3 }
            }
        ]
    },
    paladin: {
        title: "The Sacred Oath's First Dawn",
        prompt: "Before the high altar at midnight, you knelt with your blade flat across your palms to swear your holy oath. What was the core of your vow?",
        choices: [
            {
                id: 'wrath_of_justice',
                label: "I Shall Be the Hammer of the Wicked",
                description: "Smite evil wherever it hides; no villain shall escape the righteous fury of my blade.",
                statBias: { strength: 4, charisma: 2 }
            },
            {
                id: 'radiant_beacon',
                label: "I Shall Be the Light That Guides the Lost",
                description: "Inspire courage in the hopeless; lead armies with unshakeable honor and charismatic glory.",
                statBias: { charisma: 4, strength: 2 }
            },
            {
                id: 'shield_of_the_innocent',
                label: "My Armor Shall Shield the Defenseless",
                description: "Stand as an unmovable wall between the innocent and death, enduring any wound.",
                statBias: { constitution: 3, strength: 2, charisma: 1 }
            },
            {
                id: 'inquisitor_truth',
                label: "I Shall Root Out Falsehood & Sin",
                description: "See through the lies of demons and tyrants with clear, incorruptible vision.",
                statBias: { charisma: 3, wisdom: 2, strength: 1 }
            }
        ]
    },
    ranger: {
        title: "The Apex Hunt in the Wilds",
        prompt: "Deep in the monster-stalked borderlands where civilization ends, an ancient beast began hunting the logging settlements. How did you track it down?",
        choices: [
            {
                id: 'deadly_archery',
                label: "Silent Bowshot from the Canopy",
                description: "Stalked from tree to tree, sinking two black-fletched arrows through its eyes before it smelled you.",
                statBias: { dexterity: 4, wisdom: 2 }
            },
            {
                id: 'woodland_intuition',
                label: "Reading the Scent & Broken Grass",
                description: "Listened to the warning calls of the birds and anticipated its ambush before it sprang.",
                statBias: { wisdom: 4, dexterity: 2 }
            },
            {
                id: 'hardy_survival',
                label: "Surviving the Frozen Waste",
                description: "Chased the beast through a blizzard for four days without a campfire, wearing it out.",
                statBias: { constitution: 3, dexterity: 2, wisdom: 1 }
            },
            {
                id: 'twin_blades',
                label: "Close-Quarters Steel & Fang",
                description: "Dived under its claws and carved through its flanks with twin hunting swords.",
                statBias: { dexterity: 3, strength: 2, wisdom: 1 }
            }
        ]
    },
    barbarian: {
        title: "The Roar of the Totem",
        prompt: "When the rival war-clan besieged your village and your shield shattered, the red mist descended over your eyes. What guided your rage?",
        choices: [
            {
                id: 'colossal_fury',
                label: "Pure Muscle & Primal Devastation",
                description: "Tore up a wooden pallisade log and swung it like a club, shattering their front line.",
                statBias: { strength: 5, constitution: 1 }
            },
            {
                id: 'iron_flesh',
                label: "Shrugging Off Spear-Thrusts",
                description: "Ignored arrows in your shoulders and blade cuts across your ribs, laughing at their weakness.",
                statBias: { constitution: 5, strength: 1 }
            },
            {
                id: 'panther_sprint',
                label: "Explosive Athletic Leaps",
                description: "Leaped over their shields to tackle the enemy chieftain into the dirt with blinding speed.",
                statBias: { strength: 3, dexterity: 2, constitution: 1 }
            },
            {
                id: 'beast_instinct',
                label: "The Spirit Guide's Warning",
                description: "Sensed the enemy ambush before the horns blew, guiding your clan to high ground.",
                statBias: { strength: 3, wisdom: 2, constitution: 1 }
            }
        ]
    },
    bard: {
        title: "The Court of Whispers & Revelry",
        prompt: "At the Midsummer Masquerade of the High King, an assassin slipped poison into the royal goblet. How did your performance change destiny?",
        choices: [
            {
                id: 'mesmerizing_song',
                label: "The Song That Stilled Every Heart",
                description: "Hit a note so haunting and resonant that the assassin dropped their goblet in tears.",
                statBias: { charisma: 5, dexterity: 1 }
            },
            {
                id: 'sleight_switch',
                label: "Nimble Sleight of Hand Switch",
                description: "Slipped between the dancers, swapped the poisoned goblet with vinegar, and stole the assassin's dagger.",
                statBias: { charisma: 3, dexterity: 3 }
            },
            {
                id: 'cutting_wit',
                label: "Unmasking Through Satire & Lore",
                description: "Composed an impromptu limerick that publicly deduced the assassin's identity and lineage.",
                statBias: { charisma: 3, intelligence: 3 }
            },
            {
                id: 'reading_the_room',
                label: "Keen Intuition for Murderous Intent",
                description: "Spotted the twitch in the assassin's eyelid from across the ballroom before anyone else suspected.",
                statBias: { charisma: 3, wisdom: 3 }
            }
        ]
    },
    druid: {
        title: "The Weeping Grove of the Elders",
        prompt: "An unnatural corruption from the Underdark seeped into the sacred pool of your circle. How did you commune with the ancient earth?",
        choices: [
            {
                id: 'commune_roots',
                label: "Deep Meditation with the World Tree",
                description: "Merged your consciousness with the deep soil to locate the poisoned source-stone.",
                statBias: { wisdom: 5, constitution: 1 }
            },
            {
                id: 'wild_shape_form',
                label: "Taking the Claws of the Dire Bear",
                description: "Shifted into a massive beast and carved a drainage canal through solid rock to divert the blight.",
                statBias: { wisdom: 3, constitution: 2, strength: 1 }
            },
            {
                id: 'purifying_elements',
                label: "Summoning Thunder & Fresh Rain",
                description: "Called down cleansing lightning and downpours to wash the rot from the blighted leaves.",
                statBias: { wisdom: 3, dexterity: 2, intelligence: 1 }
            },
            {
                id: 'ancient_herbal_secrets',
                label: "Brewing the Salve of the First Sprout",
                description: "Synthesized rare forest mosses and lunar nectar to cure the dying dryads.",
                statBias: { wisdom: 3, intelligence: 2, constitution: 1 }
            }
        ]
    },
    monk: {
        title: "The Temple of the Silent Fall",
        prompt: "At the mountain monastery above the clouds, your grandmaster placed a burning candle between two falling porcelain cups. What was your discipline?",
        choices: [
            {
                id: 'flawless_reflex',
                label: "Catching Both Before the Flame Flickered",
                description: "Moved with instantaneous grace, capturing both cups in mid-air without spilling a drop.",
                statBias: { dexterity: 5, wisdom: 1 }
            },
            {
                id: 'ki_clarity',
                label: "Freezing Time Through Ki Focus",
                description: "Slowed your heartbeat until the world seemed to stop, moving with supernatural harmony.",
                statBias: { wisdom: 4, dexterity: 2 }
            },
            {
                id: 'iron_palm',
                label: "Striking the Air with Focused Shockwave",
                description: "Sent a controlled wave of force from your palms to cushion the cups safely to the tatami mat.",
                statBias: { dexterity: 3, strength: 2, wisdom: 1 }
            },
            {
                id: 'ascetic_body',
                label: "The Unmovable Mountain Stance",
                description: "Allowed the wax to drop on your arm without a flinch, embodying total physical mastery.",
                statBias: { constitution: 3, dexterity: 2, wisdom: 1 }
            }
        ]
    },
    sorcerer: {
        title: "The Uncontrolled Awakening",
        prompt: "On the night your innate sorcerous bloodline first exploded into being, raw magic surged around you like a storm. How did you survive your own power?",
        choices: [
            {
                id: 'sheer_willpower',
                label: "Commanding the Chaos with Pure Ego",
                description: "Refused to let the magic break you; forced the raging fire into an obedient ring around your fists.",
                statBias: { charisma: 5, constitution: 1 }
            },
            {
                id: 'magical_endurance',
                label: "Letting the Power Burn Through Your Veins",
                description: "Absorbed the searing planar energy into your flesh, discovering your body was born for this.",
                statBias: { charisma: 3, constitution: 3 }
            },
            {
                id: 'dancing_sparks',
                label: "Riding the Lightning Arc",
                description: "Vaulted across rooftops as arcs of wild magic lifted you into the air, laughing at the wind.",
                statBias: { charisma: 3, dexterity: 3 }
            },
            {
                id: 'mystic_intuition',
                label: "Intuitive Grasp of Metamagic",
                description: "Instinctively twisted the chaotic surge into harmless blossoms of colored embers.",
                statBias: { charisma: 3, wisdom: 2, intelligence: 1 }
            }
        ]
    },
    warlock: {
        title: "The Crossroads Pact",
        prompt: "In your darkest hour of desperation, the entity appeared in the shadows with an outstretched hand and an offer of power. How did you negotiate your contract?",
        choices: [
            {
                id: 'magnetic_pact',
                label: "Bartered with Unflinching Charm",
                description: "Faced the otherworldly horror without trembling, extracting dangerous boons on your own terms.",
                statBias: { charisma: 5, intelligence: 1 }
            },
            {
                id: 'cunning_fine_print',
                label: "Scrutinized Every Eldritch Clause",
                description: "Found the loophole in their blood-ink contract, ensuring your soul remained bound to no one.",
                statBias: { charisma: 3, intelligence: 3 }
            },
            {
                id: 'sacrificial_stamina',
                label: "Endured the Eldritch Brand",
                description: "Allowed their dark brand to be burned into your chest, grimacing through pain that would drive others mad.",
                statBias: { charisma: 3, constitution: 3 }
            },
            {
                id: 'shadow_slipping',
                label: "Gained the Step of the Nether",
                description: "Asked for the power to slip between spaces and vanish before any blade could strike you.",
                statBias: { charisma: 3, dexterity: 3 }
            }
        ]
    }
};

// Question 3: The Peril Philosophy (Universal Dungeon Delver Archetype)
const PHILOSOPHY_QUESTION = {
    title: "The Perilous Threshold",
    prompt: "Your party stands before the heavy obsidian doors of an ancient subterranean crypt. Unknown malice stirs in the dark beyond. What is your immediate instinct?",
    choices: [
        {
            id: 'vanguard_shield',
            label: "Kick the Doors In & Draw Weapons",
            description: "No hesitation. I take the front line and meet whatever lurks inside head-on.",
            quote: "Let them come. My armor was made to take a beating.",
            statBias: { strength: 2, constitution: 2 }
        },
        {
            id: 'shadow_scout',
            label: "Check the Floor for Pressure Plates & Creep In",
            description: "Extinguish torches. I melt into the shadows ahead to disarm traps and locate enemy sentries.",
            quote: "The dungeon belongs to whoever moves without a sound.",
            statBias: { dexterity: 2, intelligence: 1, wisdom: 1 }
        },
        {
            id: 'arcane_analysis',
            label: "Examine the Runes & Wardings First",
            description: "Analyze the age of the architecture, decipher the protective glyphs, and prepare counter-spells.",
            quote: "Blind bravery gets you burned; understanding the trap disarms it.",
            statBias: { intelligence: 3, wisdom: 1 }
        },
        {
            id: 'rally_morale',
            label: "Rally the Party & Assign Roles",
            description: "Check on companions, ensure spirits are high, and remind everyone that we return victorious together.",
            quote: "Fear dies when comrades stand shoulder to shoulder.",
            statBias: { charisma: 2, wisdom: 2 }
        }
    ]
};

// Standard D&D 5e Heroic Array Templates based on Class Archetype
const CLASS_PRIMARY_STATS = {
    fighter: 'strength',
    wizard: 'intelligence',
    rogue: 'dexterity',
    cleric: 'wisdom',
    paladin: 'strength',
    ranger: 'dexterity',
    barbarian: 'strength',
    bard: 'charisma',
    druid: 'wisdom',
    monk: 'dexterity',
    sorcerer: 'charisma',
    warlock: 'charisma'
};

const CLASS_SECONDARY_STATS = {
    fighter: 'constitution',
    wizard: 'constitution',
    rogue: 'intelligence',
    cleric: 'strength',
    paladin: 'charisma',
    ranger: 'wisdom',
    barbarian: 'constitution',
    bard: 'dexterity',
    druid: 'constitution',
    monk: 'wisdom',
    sorcerer: 'constitution',
    warlock: 'constitution'
};

export function getLoreQuestions(raceId = 'human', classId = 'fighter') {
    const raceQ = RACE_QUESTIONS[raceId] || RACE_QUESTIONS.human;
    const classQ = CLASS_QUESTIONS[classId] || CLASS_QUESTIONS.fighter;
    const philQ = PHILOSOPHY_QUESTION;

    return [
        { ...raceQ, step: 1, category: 'Racial Heritage' },
        { ...classQ, step: 2, category: 'Class Crucible' },
        { ...philQ, step: 3, category: 'Delving Doctrine' }
    ];
}

export function calculateStatsFromChoices(raceId, classId, chosenOptionIds = []) {
    const questions = getLoreQuestions(raceId, classId);
    const primaryAbility = CLASS_PRIMARY_STATS[classId] || 'strength';
    const secondaryAbility = CLASS_SECONDARY_STATS[classId] || 'constitution';

    // Accumulate weights from the player's choices
    const weights = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    };

    // Ensure baseline relevance for the chosen class so stats are always playable
    weights[primaryAbility] += 8;
    weights[secondaryAbility] += 5;

    questions.forEach((q, qIndex) => {
        const chosenId = chosenOptionIds[qIndex];
        const option = q.choices.find(c => c.id === chosenId) || q.choices[0];
        if (option?.statBias) {
            Object.entries(option.statBias).forEach(([stat, boost]) => {
                weights[stat] = (weights[stat] || 0) + boost;
            });
        }
    });

    // Sort stats by accumulated weight
    const sortedStats = Object.keys(weights).sort((a, b) => weights[b] - weights[a]);

    // Map to authentic D&D 5e Standard Array: [15, 14, 13, 12, 10, 8]
    const standardScores = [15, 14, 13, 12, 10, 8];
    const baseStats = {};

    sortedStats.forEach((stat, index) => {
        baseStats[stat] = standardScores[index] || 10;
    });

    // Generate flavorful archetype title & description
    const raceObj = getRaceById(raceId);
    const classObj = getClassById(classId);

    const raceName = raceObj?.name || 'Hero';
    const className = classObj?.name || 'Adventurer';

    let archetypeTitle = `The ${raceName} ${className}`;
    if (weights.strength > 10) archetypeTitle = `The Iron-Bred ${className}`;
    else if (weights.dexterity > 10) archetypeTitle = `The Shadow-Dancer ${className}`;
    else if (weights.intelligence > 10) archetypeTitle = `The Arcane Tactician ${className}`;
    else if (weights.wisdom > 10) archetypeTitle = `The Seer-Guardian ${className}`;
    else if (weights.charisma > 10) archetypeTitle = `The Silver-Tongued ${className}`;

    const narrativeSummary = `Shaped by the traditions of the ${raceName} folk and forged through the trials of the ${className}, your innate talents favor ${primaryAbility.toUpperCase()} and ${secondaryAbility.toUpperCase()}.`;

    return {
        baseStats,
        archetypeTitle,
        narrativeSummary,
        primaryAbility,
        secondaryAbility
    };
}
