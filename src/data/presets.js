// D&D 5e PHB Backgrounds, XP & Proficiency Tables, and One-Click Hero & Party Presets

export const levelXpThresholds = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000
};

export const getProficiencyBonus = (level = 1) => Math.floor((Math.max(1, level) - 1) / 4) + 2;

export const getAbilityModifier = (score = 10) => Math.floor((score - 10) / 2);

export const backgrounds = [
    {
        id: 'soldier',
        name: 'Soldier',
        icon: '🎖️',
        description: 'War has been your life for as long as you care to remember. You trained as a youth on muddy parade grounds, studied the grim calculus of steel and shield-walls, and learned how to stay alive when the sky turns black with arrows and dragonfire.',
        skillProficiencies: ['athletics', 'intimidation'],
        featureName: 'Military Rank & Savage Attacker',
        featureDescription: 'Soldiers of your former company still salute your scarred insignia, granting you audience inside frontier garrisons and watchposts along the Sword Coast; in battle, your drill-honed brutality lets you reroll weapon damage dice once per turn.',
        startingGold: 50,
        originHooks: [
            'Your entire vanguard company was ambushed along the Triboar Trail by unseen archers bearing the mark of the Black Spider.',
            'You deserted a corrupt mercenary banner in Blackhaven after refusing an order to burn a refugee caravan.',
            'You still carry the shattered battle-standard of Ashford, sworn to plant it atop Voranthos the Red’s skull.'
        ]
    },
    {
        id: 'sage',
        name: 'Sage',
        icon: '📚',
        description: 'You spent your formative years hunched over crumbling vellum in the candlelit vaults of Candlekeep and forgotten monastic scriptoriums, deciphering dead tongues, draconic prophecies, and the perilous geometry of the Weave.',
        skillProficiencies: ['arcana', 'history'],
        featureName: 'Researcher & Magic Initiate',
        featureDescription: 'Whenever a cipher, arcane sigil, or lost historical truth eludes your recall, your encyclopedic knowledge of realm-wide archives reveals exactly which crumbling ruin, reclusive archmage, or forbidden vault holds the answer.',
        startingGold: 50,
        originHooks: [
            'A half-burned ledger in Candlekeep revealed that the Lost Forge of Spells in Wave Echo Cave was powered by a fallen star.',
            'You translated a rubbed stone tablet from the Jungle of Kha’zar that began whispering to you in your sleep.',
            'Your mentor vanished inside Ravencrest Manor twenty years ago; last week, a raven delivered their bloodstained spectacles to your study.'
        ]
    },
    {
        id: 'criminal',
        name: 'Criminal',
        icon: '🗝️',
        description: 'You know the law only as a cobweb meant to catch the clumsy. Raised among the fog-choked alleys, smuggling coves, and velvet-draped gambling dens of Blackhaven, you learned early that a silent step and a sharp stiletto buy more mercy than any magistrate.',
        skillProficiencies: ['deception', 'stealth'],
        featureName: 'Criminal Contact & Alert',
        featureDescription: 'You know the thieves’ cant signs etched into tavern doorposts and maintain a trusted liaison among fences, dockside smugglers, and guild informers; your hair-trigger street paranoia adds your Proficiency Bonus to Initiative.',
        startingGold: 65,
        originHooks: [
            'The Guildmaster of Blackhaven framed you for the theft of the Crimson Claw and put a five-hundred-gold bounty on your head.',
            'You fenced a cursed ruby pried from the Ziggurat of the Sleeping God, and now everyone who touched it is turning to obsidian.',
            'You hold the only wax impression of the master key to Lord Ravencrest’s subterranean family vault.'
        ]
    },
    {
        id: 'acolyte',
        name: 'Acolyte',
        icon: '🕯️',
        description: 'You grew up amidst the scent of frankincense, forge-smoke, and chanted litanies in service to the gods. Whether tending the eternal anvil-fires of Moradin or keeping vigil at a roadside shrine of Lathander, divine purpose burns in your blood.',
        skillProficiencies: ['insight', 'religion'],
        featureName: 'Shelter of the Faithful',
        featureDescription: 'Clerics, wandering friars, and temple guardians recognize your sacred vestments and liturgical signs, offering you and your battered companions sanctuary, consecration, and free healing at shrines and abbey halls across the realm.',
        startingGold: 50,
        originHooks: [
            'An omen in the temple braziers showed Wave Echo Cave drowning in shadow unless a champion of the faith relights its sacred brazier.',
            'You were sent by the High Cathedral to exorcise the weeping bell of Ravencrest Manor, where three previous inquisitors vanished.',
            'A heretical sect stole a saint’s reliquary from your abbey and fled into the subterranean warrens beneath Blackhaven.'
        ]
    },
    {
        id: 'folk-hero',
        name: 'Folk Hero',
        icon: '🌾',
        description: 'You hail from the calloused hands and hearth-fires of the common folk—woodcutters, miners, and frontier homesteaders. When monsters descended from the peaks and the lords locked their castle gates, you were the one who stood in the mud with raised steel.',
        skillProficiencies: ['animal-handling', 'survival'],
        featureName: 'Rustic Hospitality & Tough',
        featureDescription: 'From Phandalin’s taprooms to remote shepherd cottages, commoners hail you as one of their own—hiding you from bounty hunters, sharing their last loaf of bread, and whispering warnings the nobility never hear.',
        startingGold: 50,
        originHooks: [
            'When Redbrand ruffians extorted your family’s farmstead near Phandalin, you broke their captain’s jaw with a blacksmith’s hammer.',
            'You led thirty villagers through smoke and falling ash when Voranthos the Red torched the grain valleys of Ashford.',
            'The miners of the Sword Mountains still sing a ballad about the night you held a collapsed shaft against a pack of cavern ghouls.'
        ]
    },
    {
        id: 'noble',
        name: 'Noble',
        icon: '👑',
        description: 'Born to silk banners, signet rings, and the heavy burden of an ancient bloodline, you were tutored in heraldry, statecraft, and the duelists’ blade. Yet you traded gilded courts for blood-soaked stone to redeem—or reclaim—your house’s honor.',
        skillProficiencies: ['history', 'persuasion'],
        featureName: 'Position of Privilege & Skilled',
        featureDescription: 'Your signet ring and aristocratic bearing part velvet ropes and iron portcullises alike; guards assume you have authority to walk castle corridors, and guildmasters treat your word as a promissory note of power.',
        startingGold: 100,
        originHooks: [
            'Your family’s ancestral estate, Ravencrest Manor, fell under a generational curse of undeath that only true-born blood can break.',
            'Your house bankrupted itself financing the original Pact of Phandelver centuries ago, and the deed to Wave Echo Cave is rightfully yours.',
            'A rival noble house hired the Blackhaven Thieves’ Guild to assassinate your heir and steal your family’s ceremonial dragon-helm.'
        ]
    },
    {
        id: 'outlander',
        name: 'Outlander',
        icon: '🏕️',
        description: 'You were raised beneath the ancient canopy and jagged crags where maps end and monsters rule. The wind through the pines is your scripture, the tracks in the ash are your chronicle, and city walls feel like a stone cage.',
        skillProficiencies: ['athletics', 'survival'],
        featureName: 'Wanderer',
        featureDescription: 'Your mind holds an unerring compass for mountain passes, subterranean waterways, and overgrown ruins; you can always locate pure water, edible roots, and defensible campgrounds where softer travelers would perish.',
        startingGold: 50,
        originHooks: [
            'Your nomadic clan was driven from the Dragonspine Mountains when Voranthos awakened the volcanic caldera above your winter hunting grounds.',
            'You are the sole guide who has walked the outer causeways of the Jungle of Kha’zar and returned without losing your mind to the emerald mist.',
            'Strange necrotic blight has been poisoning the streams flowing down from the ridge beneath Ravencrest Manor.'
        ]
    },
    {
        id: 'urchin',
        name: 'Urchin',
        icon: '🐀',
        description: 'You grew up ragged andnameless in the rain-slicked gutters and cellar drains of the great port cities, surviving by quick fingers, rooftop leaps, and listening at the keyholes of the rich and wicked.',
        skillProficiencies: ['sleight-of-hand', 'stealth'],
        featureName: 'City Secrets & Lucky',
        featureDescription: 'You know every loose sewer grate, smuggler’s crawlspace, and rooftop plank across the urban sprawl, allowing you to slip through city districts twice as fast while uncanny street luck turns fatal blows into narrow scrapes.',
        startingGold: 40,
        originHooks: [
            'You grew up hiding in the storm drains beneath Blackhaven and overheard the Guildmaster plotting a coup with an emissary of the Nine Hells.',
            'A dying dwarf prospector in a Neverwinter alley pressed a Brass Key and a half-torn map of Phandelver into your frostbitten hands.',
            'The orphanage you escaped as a child was secretly funded by Lord Ravencrest to harvest vessels for his necromantic rituals.'
        ]
    },
    {
        id: 'entertainer',
        name: 'Entertainer',
        icon: '🎭',
        description: 'With a silver lute-string, a flashed dagger, or a tragic soliloquy, you command the hearts of taprooms and throne rooms alike. You walk into the darkest dungeons on the Sword Coast because legends do not write themselves.',
        skillProficiencies: ['acrobatics', 'performance'],
        featureName: 'By Popular Demand & Musician',
        featureDescription: 'No matter how grim the frontier town, your ballads earn warm hearths, free tankards, and loose tongues at any inn; during Short Rests, your stirring melodies mend frayed nerves and bolster your companions’ resolve.',
        startingGold: 60,
        originHooks: [
            'You are composing an epic three-act ballad on the slaying of Voranthos the Red—and you refuse to let the dragon ruin your third act.',
            'A spectral violinist in the ballroom of Ravencrest Manor plays a haunting melody that only you can hear from miles away.',
            'Your traveling troupe was robbed by the Blackhaven Thieves’ Guild, who took your heirloom silver lute into their subterranean vault.'
        ]
    },
    {
        id: 'charlatan',
        name: 'Charlatan',
        icon: '🃏',
        description: 'You read greed, fear, and vanity like open parchment. Armed with forged patents of nobility, weighted dice, and a honeyed smile, you have talked your way out of gallows ropes, cult sanctums, and devils’ bargains.',
        skillProficiencies: ['deception', 'sleight-of-hand'],
        featureName: 'False Identity',
        featureDescription: 'You maintain a meticulously crafted second persona complete with wax seals, guild charters, and disguises, enabling you to infiltrate high society or underworld syndicates without raising a single eyebrow.',
        startingGold: 75,
        originHooks: [
            'You sold a fake map of the Ziggurat of the Sleeping God to a syndicate of ruthless mercenaries—only to discover your forgery was accidentally accurate.',
            'You impersonated a noble auditor in Blackhaven and accidentally walked out with the Thieves’ Guild’s true ledger of blackmail.',
            'You conned a devil’s cultist out of an infernal talisman, and now the artifact burns warmer whenever you approach the Dragonspine caldera.'
        ]
    }
];

export const getBackgroundById = (id) => backgrounds.find(b => b.id === id);

/**
 * Shared rich companion profiles so recurring companions across presets carry deep, consistent lore
 * while preserving their level-appropriate mechanical stats in each preset.
 */
const companionLore = {
    'Lyra Silverleaf': {
        personality: 'Sharp-witted, fiercely inquisitive, and perpetually ink-stained, Lyra treats every dungeon room like a peer-reviewed thesis with lethal consequences.',
        backstory: 'Born in the silver spires of Evereska and trained in the lower vaults of Candlekeep, Lyra Silverleaf became obsessed with how ancient pre-Spellplague empires bound elemental fire into living stone. Dismissed by senior archmages for her reckless field experiments, she took her spellbook to the frontier roads of the Sword Coast.\n\nShe joined your company after discovering that the magical resonance beneath Wave Echo Cave and the Ziggurat of Kha’zar share an identical weave-signature. Though she hides behind dry academic sarcasm, she will burn her last spell slot to shield a friend from the dark.',
        quirk: 'Mutters algebraic trajectory calculations in Elvish right before hurling a Scorching Ray, then grades her own accuracy out of ten.',
        secret: 'She secretly copied a forbidden page from the Necronomicon of Ravencrest during her apprenticeship, and its ink slowly shifts on her parchment at midnight.',
        personalQuest: 'Harvest an intact core of primordial flame from either the Forge of Spells or Voranthos’s volcanic lair to prove her unified theory of the Weave.',
        battleCry: 'By the Silver Stars—calculate your ashes!'
    },
    'Brother Brynn Ironforge': {
        personality: 'Boisterous, iron-bellied, and endlessly warm-hearted, Brynn dispenses cracked skulls and maternal dwarven scolding in equal measure.',
        backstory: 'For forty winters, Brother Brynn tended the great forge-altars of Moradin in Citadel Adbar, hammering blessed rivets into war-shields and brewing barley-stout strong enough to wake the dead. When word reached the northern halls that the Rockseeker clan had uncovered the long-lost route to Phandelver, Brynn strapped on his battle-dented scale mail and marched south.\n\nHe views the party as a band of tragically underfed forge-apprentices who desperately need his radiant wards and cast-iron skillet stew. Beneath his hearty laughter, however, lies a solemn vow to never again let a dwarven hold fall to subterranean horrors.',
        quirk: 'Polishes the silver anvil emblem on his shield with beard-oil before every rest and insists on blessing everyone’s boots against traps.',
        secret: 'His younger brother was part of the first scouting party into Wave Echo Cave and was turned into an undead husk that Brynn still prays he can lay to rest.',
        personalQuest: 'Sanctify the desecrated shrines of the Sword Mountains and relight the great Soul-Brazier of Moradin.',
        battleCry: 'Moradin’s hammer rings upon your wicked skulls!'
    },
    'Vax Shadowstep': {
        personality: 'Sardonic, nimble, and deceptively loyal, Vax smiles widest when the odds are ten-to-one and the lock has three poison needles.',
        backstory: 'Raised in the smoky dockside rafters of Blackhaven, Vax Shadowstep earned a reputation as the only halfling second-story thief who could rob a noble’s bedchamber without waking the guard hounds sleeping on the rug. His luck soured when he refused to assassinate an innocent witness for the Thieves’ Guild and barely escaped the city in a herring barrel.\n\nNow walking the sunlit roads with adventurers, Vax uses his uncanny ears and razor-keen daggers to keep his newfound family from stepping on pressure plates. He still checks every tavern shadow for Guild stiletto-men, determined to settle his debt in blood and gold.',
        quirk: 'Flips a shaved copper coin across his knuckles whenever a door looks trapped—and pockets small, non-essential candlesticks purely to stay in practice.',
        secret: 'He accidentally left his personalized brass lockpick inside the Blackhaven Guildmaster’s personal safe on the night he fled.',
        personalQuest: 'Break the spine of the Blackhaven Thieves’ Guild inner circle and buy a legitimate tavern where no one stabs anyone before dessert.',
        battleCry: 'Mind your purse, mind your throat, and mind the halfling behind you!'
    },
    'Ser Garrick Stoneheart': {
        personality: 'Stoic, chivalrous, and unyielding as granite, Garrick speaks in measured oaths and places himself squarely between every monster and his allies.',
        backstory: 'Once an honor-guard knight of the Order of the Aster in Neverwinter, Ser Garrick Stoneheart took the solemn Oath of Devotion after surviving a night-long siege at a haunted watchtower near the Mere of Dead Men. Where younger knights chased tournament glory, Garrick sought out the forgotten places where necrotic rot and fiendish corruption festered unchecked.\n\nHe pledged his shield to your cause when dark portents gathered over Ravencrest Manor and the Sword Coast frontier. Though he carries the grim weight of old scars, his faith in the dawn—and in the comrades beside him—never wavers.',
        quirk: 'Kneels to touch the flat of his blade to his forehead before crossing the threshold of any crypt or ruined temple.',
        secret: 'His ancestral blade once belonged to Lord Victor Ravencrest before the nobleman’s fall into necromancy, and the steel grows ice-cold near undead.',
        personalQuest: 'Purge the shadow-taint clinging to Ravencrest Manor and restore his fallen order’s tarnished honor.',
        battleCry: 'Stand fast behind my shield—the light does not yield!'
    },
    'Sister Seraphina': {
        personality: 'Compassionate yet steel-spined, Seraphina speaks with the gentle cadence of a sanctuary choir until undead abominations provoke her scorching wrath.',
        backstory: 'Born to a human apothecary and an elven moon-priestess in Silverymoon, Sister Seraphina was raised in a cloister dedicated to Selûne and Lathander. Gifted with prophetic dreams illuminated by silver starlight, she walked out of the abbey gates the night she envisioned a weeping bride trapped within the spectral halls of Ravencrest Manor.\n\nOn the road, she tends every wound with herbal poultices and luminous prayers, refusing to let despair take root in the party’s camp. Yet those who mistake her kindness for fragility quickly learn how blinding the dawn’s judgment can be.',
        quirk: 'Presses dried moonflower petals into the bandages of every companion she heals, claiming the scent wards off nightmares.',
        secret: 'Her prophetic visions have shown her that the Sleeping God beneath the Jungle of Kha’zar is beginning to dream of her by name.',
        personalQuest: 'Release the bound spirits of Ravencrest Manor and seal the necrotic rift beneath its chapel.',
        battleCry: 'May the Morninglord’s radiance burn away your shadow!'
    },
    'Nyx Nightbreeze': {
        personality: 'Dry-humored, cat-footed, and fiercely independent, Nyx treats high-stakes infiltration like an art form and authority figures like a punchline.',
        backstory: 'With violet skin, swept-back horns, and eyes like polished obsidian, Nyx Nightbreeze never had the luxury of blending into a crowd in daylight—so she mastered the art of vanishing into the dark. Trained as a rooftop courier and counter-spy in Blackhaven’s Undercity, she spent years intercepting coded dispatches between corrupt nobles and occult syndicates.\n\nWhen she uncovered a smuggling ring shipping cursed relics between Blackhaven and Ravencrest Manor, she realized she needed heavier firepower than a lone stiletto. She joined the party as their eyes in the dark, fiercely protective of anyone who judges her by her blade rather than her bloodline.',
        quirk: 'Hangs upside down from ceiling beams or tree branches during camp watches because she claims it improves her night vision.',
        secret: 'She carries a ciphered blackmail scroll from the Blackhaven Guild vault that implicates three Waterdhavian lords in devil-worship.',
        personalQuest: 'Expose the occult buyers funding the Blackhaven Thieves’ Guild and claim their shadow-silk treasury for herself.',
        battleCry: 'Blink twice and you’re already bleeding!'
    },
    'Thorgar Skullsplitter': {
        personality: 'Fierce, superstitious, and surprisingly poetic around a campfire, Thorgar laughs in the face of giants and despises bullies who prey on the weak.',
        backstory: 'Born among the frost-bitten crags of the Spine of the World, Thorgar Skullsplitter earned his name at sixteen when he cleaved the helm of an ogre chieftain in two with a notched iron greataxe. Exiled from his clan after challenging a corrupt war-shaman who wanted to sell prisoners to slavers, Thorgar wandered south into the port cities of the Sword Coast.\n\nAfter breaking a dozen guild enforcers’ arms in a Blackhaven dockside brawl, he threw his lot in with your company. He fights with volcanic fury on the front line, convinced that a glorious death—or an even more glorious victory—awaits him against the realm’s greatest monsters.',
        quirk: 'Carves a tiny notch into the haft of his greataxe for every locked door he "picks" by smashing it off its iron hinges.',
        secret: 'Despite his fearsome reputation, he is deathly afraid of disembodied ghosts because his axe cannot split a spirit cleanly in half.',
        personalQuest: 'Test his strength against the legendary wyrm Voranthos and claim a dragon-tooth trophy worthy of the northern sagas.',
        battleCry: 'Blood and thunder! Let’s see what your ribs are made of!'
    },
    'Melody Dawnwhisper': {
        personality: 'Charismatic, theatrical, and relentlessly optimistic, Melody turns grim dungeon marches into heroic ballads and disarms tension with a wink.',
        backstory: 'Trained at the prestigious College of Lore in Waterdeep, Melody Dawnwhisper grew bored of singing sanitized courtly romances to sleepy aristocrats. Craving authentic legends where the blood was real and the dragons breathed actual fire, she packed her silver-strung lute, a rapier, and a journal of blank parchment and headed for the deadliest rumors on the Sword Coast.\n\nWhether weaving sharp-tongued mockery that shatters a bandit’s confidence or strumming a chord of pure arcane healing, she is the beating heart of the party. She insists on casting every companion as the tragic or triumphant hero of her magnum opus.',
        quirk: 'Improvises rhyming couplets narrating the party’s combat maneuvers in real time, even while dodging crossbow bolts.',
        secret: 'Her prized lute was won in a midnight Crossroads wager against a disguised cambion who promised to collect his rematch in the Dragonspine peaks.',
        personalQuest: 'Recover the Lost Canticle of the Dawn from the crypts of Ravencrest and perform it before the High Court of Neverwinter.',
        battleCry: 'Strike a chord, strike a pose—now strike them down!'
    },
    'Kaelen Shadowbow': {
        personality: 'Quiet, hawk-eyed, and economical with words, Kaelen communicates primarily through warning whistles and feathered shafts planted between enemies’ eyes.',
        backstory: 'For a century, Kaelen Shadowbow patrolled the misty borders of the High Forest as a veil-archer, hunting aberrations, goblin war-bands, and poachers before they ever glimpsed an elven bough. When cultists and guild smugglers began carving clandestine trails from Blackhaven into the ancient wilds, Kaelen tracked their bootprints all the way into the stone heart of civilization.\n\nIn the party, he serves as the unblinking overwatch—perched on high ledges, reading the wind in subterranean caverns, and felling distant spellcasters before they can finish a syllable. Once he marks a quarry, neither stone walls nor jungle canopy can hide them.',
        quirk: 'Fletches his own arrows with differently colored feathers for different monster types—red for dragons, black for thieves, silver for the undead.',
        secret: 'He once had a clean shot at the Black Spider’s emissary on the Triboar Trail, but hesitated when he recognized his estranged cousin beside them.',
        personalQuest: 'Track down the syndicate smuggling corrupted elven relics out of the Jungle of Kha’zar and sever their supply line forever.',
        battleCry: 'The wind has already chosen your grave!'
    },
    'Sir Kaelen Dawnshield': {
        personality: 'Disciplined, honorable, and resolute, Kaelen leads from the vanguard where the steel is thickest and never leaves a fallen comrade behind.',
        backstory: 'A decorated veteran of the Neverwinter Watch, Sir Kaelen Dawnshield spent ten years holding the northern bridges against orcish raids and planar incursions. When bureaucratic rot in the city council left frontier towns like Phandalin to fend for themselves against the Redbrands and the Black Spider, Kaelen resigned his commission and rode south with his sword and shield.\n\nHe fights with textbook tactical precision, reading the flow of battle like a grandmaster’s chessboard and calling out openings for his allies. To Kaelen, true nobility is measured not in titles, but in who stands fast when the torchlight flickers out.',
        quirk: 'Checks the straps of his shield three times before every engagement and addresses even tavern barmaids with formal knightly courtesy.',
        secret: 'He carries the tarnished badge of a Watch patrolman who died saving his life during a botched raid in Blackhaven’s docks.',
        personalQuest: 'Secure the Phandelver frontier and forge a permanent shield-company to defend the Sword Coast’s forgotten towns.',
        battleCry: 'Hold the line! For the Dawn and the Sword Coast!'
    },
    'Sylva Whisperwind': {
        personality: 'Feral, observant, and deeply attuned to the pulse of the wild, Sylva listens to the stone and timber around her before trusting any mortal word.',
        backstory: 'Raised among the treetop enclaves of the Neverwinter Wood, Sylva Whisperwind learned to draw a yew longbow before she learned the Common tongue. When unnatural tremors from Wave Echo Cave and the volcanic ash of Dragonspine Peak began driving maddened beasts into the lowlands, the elders dispatched her to walk among the folk of stone and iron.\n\nThough she finds taverns noisy and gold coins pointless, she guards her companions with the fierce devotion of a wolf-matriarch protecting her pack. Her arrows strike with the weight of ancient forest wrath.',
        quirk: 'Presses her ear to cavern walls to listen to the "breathing of the stone" and refuses to sleep under a roof if the stars are visible.',
        secret: 'She slew a corrupted treant in the Neverwinter Wood whose heartwood was branded with the sigil of the Sleeping God of Kha’zar.',
        personalQuest: 'Cleanse the blighted ley-lines linking the Sword Mountains to the southern jungles.',
        battleCry: 'The forest remembers every wound—fly true!'
    },
    'Elara Starweaver': {
        personality: 'Poised, brilliant, and quietly intense, Elara commands the arcane with surgical precision and treats ignorance as the deadliest trap in any dungeon.',
        backstory: 'An initiate of Candlekeep’s inner star-chambers, Elara Starweaver spent decades charting the conjunctions of the Weave and the shattered magical engines of fallen empires. When fragments of an ancient codex pointed toward the Lost Forge of Spells and the haunted archives of Ravencrest Manor, she stepped out of the library stacks and into the mud of the frontier.\n\nIn battle, she shapes roaring elemental thunder and starlight around her companions without singeing a single cloak-hem. She believes that magic is too dangerous to be left in the hands of tyrants, liches, or greedy guildmasters.',
        quirk: 'Traces glowing arcane marginalia in the air with her fingertip while thinking, leaving faint violet afterimages in dark corridors.',
        secret: 'Her wand contains a splinter of spell-crystal taken from the original ruin of Phandelver, which hums louder as she nears the Forge of Spells.',
        personalQuest: 'Reclaim the lost arcane codices of the Sword Coast before dark powers twist them into weapons of mass ruin.',
        battleCry: 'Witness the fury of the unbridled Weave!'
    },
    'High Cleric Brynn': {
        personality: 'Battle-hardened, thunder-voiced, and unshakeable, High Cleric Brynn is a walking fortress of dwarven faith and golden radiant fire.',
        backstory: 'Tempered by countless subterranean campaigns from the depths of Wave Echo Cave to the cursed halls of Ravencrest, Brother Brynn Ironforge rose to the mantle of High Cleric of the Anvil. His armor bears the scorch-marks of dragon breath and the dents of giant clubs, each scar a testament to a companion he refused to let die.\n\nNow marching into the realm’s deadliest high-level crucibles, Brynn summons swirling guardians of ancestral dwarven spirits to crush the wicked while his prayers knit shattered bones back together in the heat of battle.',
        quirk: 'Intones the names of seven dwarven ancestor-smiths with every swing of his warhammer.',
        secret: 'Moradin granted him a vision that his final, greatest forging will require quenching his warhammer in the heart-flame of an ancient dragon.',
        personalQuest: 'Break the draconic tyranny of Voranthos and consecrate the high peaks in the All-Father’s name.',
        battleCry: 'By the Soul-Forge of Moradin—none shall fall while I draw breath!'
    },
    'Archmage Elara': {
        personality: 'Regal, luminous, and commanding, Archmage Elara wields fifth-circle mastery of the Weave with the calm authority of an elven high savant.',
        backstory: 'Having unlocked the secrets of the Forge of Spells and purged the spectral libraries of Ravencrest, Elara Starweaver ascended to the rank of Archmage on the Sword Coast frontier. The silver filigree of her robes crackles with bound lightning, and her mind holds countermeasures for every fiendish hex and draconic breath.\n\nShe walks into the caldera of Voranthos and the deepest vaults of Kha’zar not merely as a scholar, but as a warden of cosmic balance—ready to unravel enemy spells mid-incantation and rain lightning upon the titans of the old world.',
        quirk: 'Her eyes glow with pale astral starlight whenever she prepares a third-level spell or higher.',
        secret: 'She has glimpsed the astral tether binding the Sleeping God of Kha’zar and knows that severing it could shake the foundations of the Weave.',
        personalQuest: 'Seal the primordial rifts threatening the realm and establish a new Bastion of the Weave in the north.',
        battleCry: 'Your magic is unraveled—bow before the storm!'
    },
    'Sylva Dragonsbane': {
        personality: 'Fearless, wind-scarred, and lethal, Sylva Dragonsbane hunts apex monsters with the patient certainty of an avalanche.',
        backstory: 'After surviving the ash-storms of the Dragonspine foothills and piercing the scales of wyverns and hydras alike, Sylva earned the title "Dragonsbane" among the frontier tribes. Her longbow is strung with sinew blessed by the ancient spirits of the wood, capable of driving iron-tipped shafts through draconic armor at three hundred paces.\n\nShe leads the party through volcanic glass and suffocating jungle canopy alike, reading every tremor in the earth and loosing twin volleys before the enemy even knows they are surrounded.',
        quirk: 'Wears a necklace of charred wyvern talons that clink softly only when draconic magic is within a mile.',
        secret: 'She spared a newly hatched gold wyrmling in the northern crags and swore to keep its sanctuary hidden from poachers and cultists alike.',
        personalQuest: 'Fell Voranthos the Red in his volcanic lair and restore the natural balance of the northern peaks.',
        battleCry: 'One breath, two arrows—pierce the heart!'
    },
    'Sir Valerius': {
        personality: 'Blazing with draconic majesty and righteous zeal, Sir Valerius stands as a golden bulwark against the oldest horrors of the world.',
        backstory: 'Bearing the gleaming scales of his gold dragon ancestry and the sacred mantle of his paladin oaths, Sir Valerius Flameheart has become a living legend from Phandalin to the southern jungles. In his gauntleted hand burns a blade of pure sunlight, forged to cleave through temple guardians, shadow assassins, and ancient wyrms alike.\n\nHe marches beside you into the Ziggurat of the Sleeping God to ensure that whatever slumbers beneath the emerald canopy never rises to enslave the mortal realms.',
        quirk: 'Exhales tiny wisps of golden embers from his nostrils whenever falsehood or dark magic is spoken in his presence.',
        secret: 'The blood of Bahamut’s ancient heralds runs in his veins, and the idols inside the Ziggurat recognize him as an ancient enemy.',
        personalQuest: 'Cast down the false gods of the dark temples and reignite the sacred beacons of the dragon-knights.',
        battleCry: 'By golden scale and sacred flame—be purged!'
    },
    'Lyra Starweaver': {
        personality: 'Seasoned, audacious, and blazing with arcane confidence, Lyra delights in solving ancient temple puzzles with equal parts intellect and Fireballs.',
        backstory: 'Having mastered the high arts of evocation and transmutation across a dozen perilous delves, Lyra now travels as a celebrated Loremaster of the Realms. She translates forgotten serpent-glyphs on the fly while accelerating her allies with time-warping Haste magic and incinerating ambushes in rooms of roaring flame.\n\nThe deeper the ruin and the older the curse, the brighter her eyes shine—especially within the vine-choked vaults of the Jungle of Kha’zar.',
        quirk: 'Sketches architectural diagrams of deadly traps in her spellbook *before* letting the rogue disarm them.',
        secret: 'She carries a star-sapphire focus that records every incantation spoken inside the Ziggurat of the Sleeping God.',
        personalQuest: 'Unlock the Astral Observatory hidden beneath the Ziggurat’s apex.',
        battleCry: 'Step back, darlings—this room is about to get incandescent!'
    },
    'Silas Vane': {
        personality: 'Cool-headed, razor-sharp, and effortlessly suave, Silas treats ancient death-traps and dragon hoards as personal invitations.',
        backstory: 'Once the phantom king of Blackhaven’s rooftops, Silas Vane has graduated from picking guild vaults to disarming three-thousand-year-old divine murder-mechanisms in the world’s deadliest dungeons. Moving like smoke in his Boots of Elvenkind, he strikes from impossible angles with venomous steel before vanishing back into the gloom.\n\nWhether slipping past the obsidian idols of Kha’zar or flanking a dragon in its lair, Silas never loses his crooked grin—or his eye for the largest gem in the room.',
        quirk: 'Offers a polite tip of an imaginary hat to every stone gargoyle or pressure plate he successfully bypasses.',
        secret: 'He stole a black-jade idol from the outer shrine of Kha’zar years ago, and returning it is the only way to lift the shadow-mark on his palm.',
        personalQuest: 'Pull off the ultimate heist at the heart of the realm’s deadliest sanctuaries and live to spend every single gold piece.',
        battleCry: 'Nothing personal, friend—just business in the dark!'
    },
    'Korgath Bloodfang': {
        personality: 'Unstoppable, booming, and fiercely loyal to his battle-pack, Korgath charges into dragonfire and eldritch storms without a blink.',
        backstory: 'Clad in the scars of a hundred battles and wielding a greatsword wreathed in living flame, Korgath Bloodfang is the terror of the Dragonspine peaks. When the bear-totem spirit awakens in his blood, neither acid, frost, nor dragon-fang can slow his relentless advance.\n\nHe walks beside warlocks and heroes alike because he respects anyone bold enough to spit in the eye of devils and dragons rather than kneeling before them.',
        quirk: 'Tests the heat of campfires by sticking his bare palm into the coals while telling stories of the Ashford siege.',
        secret: 'The tribal totem braided into his hair contains a scale shed by Voranthos thirty years ago.',
        personalQuest: 'Cleave the skull of every tyrant-wyrm on the Sword Coast and build a hall of bones in the high peaks.',
        battleCry: 'ROAAAR! Come taste the iron of Ashford!'
    }
};

const enrichCompanion = (comp) => {
    const lore = companionLore[comp.name] || {};
    return {
        ...comp,
        specialAbility: comp.signatureMove,
        personality: lore.personality || 'Steadfast, battle-tested, and fiercely loyal in the darkest dungeons.',
        backstory: lore.backstory || 'A seasoned adventurer of the Sword Coast who swore an oath of steel and blood to stand beside the party.',
        quirk: lore.quirk || 'Keeps a tally of every dungeon delve etched into the leather of their scabbard.',
        secret: lore.secret || 'Carries a sealed letter from Neverwinter meant only to be opened at the heart of the dungeon.',
        personalQuest: lore.personalQuest || 'Protect the company and carve their name into the legends of the realm.',
        battleCry: lore.battleCry || 'For glory and the company—strike!'
    };
};

/**
 * 8 Ready-to-Play Iconic Hero Presets (spanning Levels 1, 3, and 5)
 * Each preset includes pre-built stats, subclass, skills, spells, equipment, rich narrative fields, and 3 AI Party Companions.
 */
export const heroPresets = [
    {
        id: 'kaelen-vanguard',
        title: 'Sir Kaelen Dawnshield — Human Battle Master Fighter (Lv 1)',
        badge: 'Classic Vanguard',
        recommendedAdventure: 'lost-mine',
        quirk: 'Methodically sharpens his longsword with forty-two even strokes of a whetstone every evening, reciting the names of the fallen Watchmen of Neverwinter under his breath.',
        secret: 'During the Siege of the High Road, he hesitated for three heartbeats when a masked lieutenant of the Black Spider offered him safe passage for his surrounded squad—a shame that burns hotter than any wound.',
        personalQuest: 'Locate Gundren Rockseeker, secure the Lost Forge of Spells in Wave Echo Cave, and prove that an honorable shield can still hold the frontier together.',
        voiceQuote: '"Stand behind my shield and keep your wits—steel wins battles, discipline wins wars."',
        character: {
            name: 'Sir Kaelen Dawnshield',
            race: 'human',
            subrace: 'variant-human',
            class: 'fighter',
            subclass: 'battle-master',
            background: 'soldier',
            alignment: 'Lawful Good',
            level: 1,
            xp: 0,
            gold: 75,
            inspiration: true,
            stats: { strength: 17, dexterity: 14, constitution: 16, intelligence: 11, wisdom: 13, charisma: 12 },
            skills: ['athletics', 'intimidation', 'perception', 'survival'],
            equipment: ['longsword', 'chain-mail', 'shield', 'light-crossbow', 'potion-of-healing', 'potion-of-healing'],
            spells: [],
            quirk: 'Methodically sharpens his longsword with forty-two even strokes of a whetstone every evening, reciting the names of the fallen Watchmen of Neverwinter under his breath.',
            secret: 'During the Siege of the High Road, he hesitated for three heartbeats when a masked lieutenant of the Black Spider offered him safe passage for his surrounded squad—a shame that burns hotter than any wound.',
            personalQuest: 'Locate Gundren Rockseeker, secure the Lost Forge of Spells in Wave Echo Cave, and prove that an honorable shield can still hold the frontier together.',
            voiceQuote: '"Stand behind my shield and keep your wits—steel wins battles, discipline wins wars."',
            backstory: 'For twelve winters, Sir Kaelen Dawnshield wore the silver starburst of the Neverwinter Watch, rising from a mud-splattered pikeman to Captain of the Eastgate Vanguard. He learned the art of war not in gilded academies, but in the freezing rain of the High Road—holding shield-walls against Cragmaw goblin ambushes, Blackhaven cutthroats, and undead horrors creeping down from the haunted ridges of Ravencrest. When city politicians slashed frontier patrols to line their own coffers, Kaelen laid his captain’s baton upon the Lord Protector’s oak table and walked out with only his notched longsword and dented kite shield.\n\nHis old friend and comrade-in-arms, the dwarven prospector Gundren Rockseeker, sought him out in a smoky dockside tavern with news that could reshape the North: the lost entrance to Wave Echo Cave and the legendary Forge of Spells had finally been found. Hiring Kaelen to escort a wagon of mining supplies down the treacherous Triboar Trail to Phandalin, Gundren rode ahead with a warrior escort—and vanished into the goblin-infested thickets.\n\nNow standing over the arrow-riddled horses of Gundren’s ambush site, Kaelen knows that the shadowy web stretching from Wave Echo Cave to Blackhaven’s underbelly and the volcanic peaks of Dragonspine is tightening around the Sword Coast. He has sworn on his knightly spurs to rescue his friend, break the Black Spider’s grip on Phandalin, and rally a band of heroes capable of facing whatever ancient darkness stirs beneath the realm.'
        },
        companions: [
            enrichCompanion({ id: 'comp-lyra', name: 'Lyra Silverleaf', race: 'Elf', class: 'Wizard', icon: '🔮', hp: 18, maxHp: 18, ac: 15, role: 'Evoker', attackBonus: 5, damageDice: '2d8', damageType: 'fire', signatureMove: 'Scorching Ray & Arcane Ward' }),
            enrichCompanion({ id: 'comp-bryn', name: 'Brother Brynn Ironforge', race: 'Dwarf', class: 'Cleric', icon: '✝️', hp: 24, maxHp: 24, ac: 18, role: 'Life Healer', attackBonus: 5, damageDice: '2d6', damageType: 'radiant', signatureMove: 'Sacred Flame & Healing Word' }),
            enrichCompanion({ id: 'comp-vax', name: 'Vax Shadowstep', race: 'Halfling', class: 'Rogue', icon: '🗡️', hp: 20, maxHp: 20, ac: 16, role: 'Scout', attackBonus: 6, damageDice: '2d6+3', damageType: 'piercing', signatureMove: 'Sneak Attack & Lockpicking' })
        ]
    },
    {
        id: 'elara-evoker',
        title: 'Elara Starweaver — High Elf Evocation Wizard (Lv 1)',
        badge: 'Arcane Scholar',
        recommendedAdventure: 'haunted-manor',
        quirk: 'Instinctively corrects the grammar of ominous dungeon inscriptions and archaic curses out loud before translating them for the party.',
        secret: 'The silver-bound spellbook she carries belonged to her vanished mentor, Archmage Caelen—and the final thirty pages are written in a necrotic cipher that only becomes legible under the moonlight of Ravencrest Manor.',
        personalQuest: 'Uncover the lost Azlanti and Netherese weave-anchors linking Ravencrest Manor, Wave Echo Cave, and the Ziggurat of Kha’zar before their seals shatter.',
        voiceQuote: '"Magic is not a parlor trick; it is the architecture of creation—and I intend to remodel your atoms into cinders."',
        character: {
            name: 'Elara Starweaver',
            race: 'elf',
            subrace: 'high-elf',
            class: 'wizard',
            subclass: 'evocation',
            background: 'sage',
            alignment: 'Neutral Good',
            level: 1,
            xp: 0,
            gold: 80,
            inspiration: true,
            stats: { strength: 8, dexterity: 16, constitution: 14, intelligence: 17, wisdom: 13, charisma: 11 },
            skills: ['arcana', 'history', 'investigation', 'insight'],
            equipment: ['quarterstaff', 'robes', 'wand-of-magic-missiles', 'potion-of-healing', 'potion-of-healing'],
            spells: ['fire-bolt', 'ray-of-frost', 'mage-hand', 'magic-missile', 'shield', 'burning-hands', 'sleep', 'detect-magic'],
            quirk: 'Instinctively corrects the grammar of ominous dungeon inscriptions and archaic curses out loud before translating them for the party.',
            secret: 'The silver-bound spellbook she carries belonged to her vanished mentor, Archmage Caelen—and the final thirty pages are written in a necrotic cipher that only becomes legible under the moonlight of Ravencrest Manor.',
            personalQuest: 'Uncover the lost Azlanti and Netherese weave-anchors linking Ravencrest Manor, Wave Echo Cave, and the Ziggurat of Kha’zar before their seals shatter.',
            voiceQuote: '"Magic is not a parlor trick; it is the architecture of creation—and I intend to remodel your atoms into cinders."',
            backstory: 'For nearly a century inside the sea-sprayed towers of Candlekeep, Elara Starweaver was regarded as the most promising—and most insufferably curious—evoker of her generation. While gray-bearded savants debated dusty treaties, Elara studied how cataclysmic magical events scarred the physical world: the green flame of Phandelver’s lost Forge of Spells, the volcanic ley-lines feeding Voranthos’s caldera, and the temporal distortions radiating from the Ziggurat of the Sleeping God in distant Kha’zar. She mastered the School of Evocation not out of bloodlust, but because she understood that raw elemental light is the only scalpel sharp enough to excise ancient darkness.\n\nThree moons ago, a raven with frost-limned feathers tapped at her high study window, bearing a tarnished signet ring sealed in black wax from the cursed estate of Ravencrest Manor. Inside was a scrap of vellum in the handwriting of her long-vanished mentor, warning that Lord Victor Ravencrest’s necromantic rituals had tapped into the same subterranean Weave-artery that once powered Wave Echo Cave.\n\nRefusing to wait for Candlekeep’s council to deliberate for another decade, Elara packed her Wand of Magic Missiles, strapped on her travel-stained robes, and set out for the frontier. Whether deciphering the wailing crypts of Ravencrest or blasting apart goblin warbands on the road to Phandalin, she walks into the dark with starlight on her fingertips and an unquenchable thirst for forbidden truth.'
        },
        companions: [
            enrichCompanion({ id: 'comp-garrick', name: 'Ser Garrick Stoneheart', race: 'Human', class: 'Paladin', icon: '🛡️', hp: 28, maxHp: 28, ac: 18, role: 'Defender', attackBonus: 5, damageDice: '1d8+4', damageType: 'radiant', signatureMove: 'Divine Smite & Lay on Hands' }),
            enrichCompanion({ id: 'comp-bryn', name: 'Sister Seraphina', race: 'Half-Elf', class: 'Cleric', icon: '✝️', hp: 22, maxHp: 22, ac: 17, role: 'Healer', attackBonus: 5, damageDice: '2d6', damageType: 'radiant', signatureMove: 'Guiding Bolt & Bless' }),
            enrichCompanion({ id: 'comp-nyx', name: 'Nyx Nightbreeze', race: 'Tiefling', class: 'Rogue', icon: '🗡️', hp: 20, maxHp: 20, ac: 16, role: 'Infiltrator', attackBonus: 6, damageDice: '2d6+3', damageType: 'piercing', signatureMove: 'Shadow Ambush' })
        ]
    },
    {
        id: 'silas-shadowblade',
        title: 'Silas Vane — Lightfoot Halfling Assassin Rogue (Lv 3)',
        badge: 'Master Infiltrator (Lv 3)',
        recommendedAdventure: 'thieves-guild',
        quirk: 'Never sits with his back to a tavern door, and unconsciously weighs every goblet, candelabrum, and quest-giver’s coin pouch with a single flick of his pinky finger.',
        secret: 'He was the one who originally cracked the outer vault puzzle of the Crimson Claw for the Blackhaven Guildmaster—before realizing the relic was meant to finance a blood-purge of the city’s Docks.',
        personalQuest: 'Infiltrate the subterranean cisterns of the Blackhaven Thieves’ Guild, reclaim the stolen Crimson Claw, and settle his score with Guildmaster Thorne.',
        voiceQuote: '"Locks are just polite suggestions from people who overestimated their blacksmith."',
        character: {
            name: 'Silas Vane',
            race: 'halfling',
            subrace: 'lightfoot-halfling',
            class: 'rogue',
            subclass: 'assassin',
            background: 'criminal',
            alignment: 'Chaotic Neutral',
            level: 3,
            xp: 900,
            gold: 140,
            inspiration: true,
            stats: { strength: 10, dexterity: 18, constitution: 14, intelligence: 14, wisdom: 12, charisma: 14 },
            skills: ['stealth', 'sleight-of-hand', 'deception', 'perception', 'acrobatics', 'investigation'],
            equipment: ['rapier', 'shortbow', 'dagger-of-venom', 'studded-leather', 'boots-of-elvenkind', 'thieves-tools', 'potion-of-healing', 'potion-of-invisibility'],
            spells: [],
            quirk: 'Never sits with his back to a tavern door, and unconsciously weighs every goblet, candelabrum, and quest-giver’s coin pouch with a single flick of his pinky finger.',
            secret: 'He was the one who originally cracked the outer vault puzzle of the Crimson Claw for the Blackhaven Guildmaster—before realizing the relic was meant to finance a blood-purge of the city’s Docks.',
            personalQuest: 'Infiltrate the subterranean cisterns of the Blackhaven Thieves’ Guild, reclaim the stolen Crimson Claw, and settle his score with Guildmaster Thorne.',
            voiceQuote: '"Locks are just polite suggestions from people who overestimated their blacksmith."',
            backstory: 'In the fog-wreathed port of Blackhaven, mothers used to tell their children to latch the shutters tight or Silas Vane would steal the silver fillings right out of their teeth while they snored. For seven years, the lightfoot halfling was the undisputed phantom of the Shadow Guild—a master of tumblers, counterweight traps, and silent rooftop ambushes who could slip through a guard barracks in his Boots of Elvenkind without disturbing a mote of dust. He lived by a simple code: take from those bloated with gold, never spill innocent blood, and always leave a crooked copper piece on the empty velvet cushion.\n\nThat code shattered the night Guildmaster Vesper Thorne ordered the theft of the Crimson Claw—an ancient ruby-hilted relic tied to the blood-cults of Kha’zar and the dragon-hoards of the North—and slaughtered the temple watchmen to cover the Guild’s tracks. When Silas protested, Thorne’s assassins cornered him on the Old Sewer Bridge, put a poisoned bolt through his shoulder, and left him to drown in the icy tide.\n\nFished out of the bay by frontier smugglers and nursing a venomous grudge, Silas spent two years honing the lethal arts of the Assassin from Phandalin’s Redbrand hideouts to the haunted crypts of Ravencrest. Now he has slipped back through Blackhaven’s water-gates with a Dagger of Venom at his hip and a handpicked crew at his back—ready to turn the Guild’s own shadows into their tomb.'
        },
        companions: [
            enrichCompanion({ id: 'comp-thorgar', name: 'Thorgar Skullsplitter', race: 'Half-Orc', class: 'Barbarian', icon: '🪓', hp: 38, maxHp: 38, ac: 15, role: 'Bruiser', attackBonus: 6, damageDice: '1d12+5', damageType: 'slashing', signatureMove: 'Reckless Greataxe Cleave' }),
            enrichCompanion({ id: 'comp-melody', name: 'Melody Dawnwhisper', race: 'Half-Elf', class: 'Bard', icon: '🎵', hp: 26, maxHp: 26, ac: 15, role: 'Support', attackBonus: 5, damageDice: '2d4+3', damageType: 'psychic', signatureMove: 'Bardic Inspiration & Healing Word' }),
            enrichCompanion({ id: 'comp-kael', name: 'Kaelen Shadowbow', race: 'Elf', class: 'Ranger', icon: '🏹', hp: 30, maxHp: 30, ac: 16, role: 'Sharpshooter', attackBonus: 6, damageDice: '1d8+1d6+3', damageType: 'piercing', signatureMove: 'Hunter’s Mark Volley' })
        ]
    },
    {
        id: 'thordak-paladin',
        title: 'Valerius Flameheart — Gold Dragonborn Oath of Vengeance Paladin (Lv 3)',
        badge: 'Holy Crusader (Lv 3)',
        recommendedAdventure: 'haunted-manor',
        quirk: 'Refuses to sit on cushioned chairs or sleep in feather beds while a sworn quarry remains unvanquished, resting instead in full armor with his gauntleted hands clasped over his sword pommel.',
        secret: 'His noble draconic clan once signed a blood-compact with House Ravencrest centuries ago, meaning the undead Lord Victor can sense Valerius’s heartbeat the moment he steps onto the manor grounds.',
        personalQuest: 'Cleanse the necromantic curse of Ravencrest Manor with radiant fire and hunt down the red wyrm Voranthos who desecrated his clan’s ancestral aerie.',
        voiceQuote: '"Mercy is a gift for the penitent. For the wicked, I bring only the furnace of judgment."',
        character: {
            name: 'Valerius Flameheart',
            race: 'dragonborn',
            subrace: 'red-dragonborn',
            class: 'paladin',
            subclass: 'oath-of-vengeance',
            background: 'noble',
            alignment: 'Lawful Neutral',
            level: 3,
            xp: 900,
            gold: 150,
            inspiration: true,
            stats: { strength: 18, dexterity: 10, constitution: 15, intelligence: 10, wisdom: 12, charisma: 16 },
            skills: ['athletics', 'persuasion', 'intimidation', 'religion'],
            equipment: ['longsword-plus-1', 'chain-mail', 'shield', 'holy-water', 'potion-of-healing', 'potion-of-greater-healing'],
            spells: ['cure-wounds', 'bless', 'shield-of-faith', 'thunderous-smite', 'divine-favor'],
            quirk: 'Refuses to sit on cushioned chairs or sleep in feather beds while a sworn quarry remains unvanquished, resting instead in full armor with his gauntleted hands clasped over his sword pommel.',
            secret: 'His noble draconic clan once signed a blood-compact with House Ravencrest centuries ago, meaning the undead Lord Victor can sense Valerius’s heartbeat the moment he steps onto the manor grounds.',
            personalQuest: 'Cleanse the necromantic curse of Ravencrest Manor with radiant fire and hunt down the red wyrm Voranthos who desecrated his clan’s ancestral aerie.',
            voiceQuote: '"Mercy is a gift for the penitent. For the wicked, I bring only the furnace of judgment."',
            backstory: 'Scion of the ancient Flameheart bloodline—dragonborn knights whose brass-and-gold scales gleamed in the high citadels of the Sword Mountains—Valerius was raised to believe that nobility is an unpaid debt owed to the realm. As a young squire, he watched his family’s mountain bastion fall to twin calamities: from the clouds above descended the ancient red wyrm Voranthos, while from the crypts below rose a tide of wraiths bound to the cursed bloodline of Ravencrest Manor. Standing amidst the molten slag of his ancestral hall, Valerius pressed his palm to the white-hot altar of Bahamut and swore the Oath of Vengeance.\n\nNeither courtly intrigue nor gentle absolution interests him now. Clad in heavy mail and wielding an enchanted longsword that rings like a cathedral bell when drawn, Valerius strides across the Sword Coast as an instrument of divine retribution. Whenever he channels a Divine Smite, golden dragonfire erupts along his blade, searing the eyes of undead abominations and chromatic cultists alike.\n\nHis crusade has led him first to the wrought-iron gates of Ravencrest Manor, where the weeping ghosts of his clan’s old allies cry out for release, and onward toward Wave Echo Cave and the smoking caldera of Dragonspine Peak. Until every lich’s phylactery is crushed and Voranthos’s head hangs from his shield, Valerius’s wrath will not cool.'
        },
        companions: [
            enrichCompanion({ id: 'comp-lyra', name: 'Lyra Silverleaf', race: 'Elf', class: 'Wizard', icon: '🔮', hp: 24, maxHp: 24, ac: 15, role: 'Arcane Blaster', attackBonus: 6, damageDice: '3d6', damageType: 'fire', signatureMove: 'Scorching Ray & Web' }),
            enrichCompanion({ id: 'comp-vax', name: 'Vax Shadowstep', race: 'Halfling', class: 'Rogue', icon: '🗡️', hp: 26, maxHp: 26, ac: 16, role: 'Trapfinder', attackBonus: 6, damageDice: '2d6+4', damageType: 'piercing', signatureMove: 'Cunning Ambush' }),
            enrichCompanion({ id: 'comp-bryn', name: 'Brother Brynn Ironforge', race: 'Dwarf', class: 'Cleric', icon: '✝️', hp: 29, maxHp: 29, ac: 18, role: 'Radiant Priest', attackBonus: 5, damageDice: '2d8', damageType: 'radiant', signatureMove: 'Spiritual Weapon & Aid' })
        ]
    },
    {
        id: 'morgran-cleric',
        title: 'Morgran Battlehammer — Hill Dwarf War Cleric (Lv 3)',
        badge: 'Divine Bastion (Lv 3)',
        recommendedAdventure: 'lost-mine',
        quirk: 'Taps his warhammer against the stone floor of every new cavern chamber and judges the craftsmanship of the masonry before acknowledging any monsters in the room.',
        secret: 'He possesses the second half of the ancient Dwarven Charter of Phandelver sewn into the leather lining of his beard-guard—a document that names the true nature of the entity bound beneath the Forge of Spells.',
        personalQuest: 'Rescue his cousin Gundren Rockseeker, reconsecrate the desecrated halls of Wave Echo Cave, and rekindle the legendary Forge of Spells in Moradin’s name.',
        voiceQuote: '"Stone cracks and iron rusts, lad, but a dwarf’s word and the Soul-Forger’s light endure forever!"',
        character: {
            name: 'Morgran Battlehammer',
            race: 'dwarf',
            subrace: 'hill-dwarf',
            class: 'cleric',
            subclass: 'life-domain',
            background: 'acolyte',
            alignment: 'Lawful Good',
            level: 3,
            xp: 900,
            gold: 120,
            inspiration: true,
            stats: { strength: 15, dexterity: 10, constitution: 16, intelligence: 11, wisdom: 18, charisma: 12 },
            skills: ['medicine', 'religion', 'insight', 'history'],
            equipment: ['warhammer', 'scale-mail', 'shield-plus-1', 'amulet-of-the-devout', 'potion-of-healing', 'potion-of-greater-healing'],
            spells: ['sacred-flame', 'guidance', 'toll-the-dead', 'cure-wounds', 'healing-word', 'guiding-bolt', 'bless', 'spiritual-weapon', 'aid'],
            quirk: 'Taps his warhammer against the stone floor of every new cavern chamber and judges the craftsmanship of the masonry before acknowledging any monsters in the room.',
            secret: 'He possesses the second half of the ancient Dwarven Charter of Phandelver sewn into the leather lining of his beard-guard—a document that names the true nature of the entity bound beneath the Forge of Spells.',
            personalQuest: 'Rescue his cousin Gundren Rockseeker, reconsecrate the desecrated halls of Wave Echo Cave, and rekindle the legendary Forge of Spells in Moradin’s name.',
            voiceQuote: '"Stone cracks and iron rusts, lad, but a dwarf’s word and the Soul-Forger’s light endure forever!"',
            backstory: 'Born beneath the ringing anvils of the Sword Mountains and ordained as High Anvil-Priest of Moradin, Morgran Battlehammer has spent a century tending both shattered bones and sacred steel. In his youth, he listened to his grandfather’s fireside tales of the Phandelver’s Pact—when dwarves, gnomes, and human spellcasters worked side by side in the booming caverns of Wave Echo Cave until orcish hordes and arcane cataclysm buried the Forge of Spells under tons of granite. To Morgran, every cracked rune-stone in the North is a verse of unfinished scripture.\n\nWhen his reckless cousin Gundren Rockseeker sent a breathless courier claiming he and his brothers had finally uncovered the hidden entrance to Wave Echo Cave, Morgran knew immediately that greed and shadow would follow close behind. Before the priest could reach Phandalin, visions in the templeforge braziers showed a spectral Black Spider spinning webs across the subterranean mines, while dark tremors echoed from Ravencrest Manor to the volcanic halls of Voranthos.\n\nBearing his gleaming +1 shield, the sacred Amulet of the Devout, and a warhammer that conjures spectral anvil-weapons in midair, Morgran marched down from the high shrines. He is an immovable bastion in the center of the line—calling down pillars of Sacred Flame upon goblinoid raiders and pouring the warm, golden lifeblood of the Soul-Forger into his battered companions.'
        },
        companions: [
            enrichCompanion({ id: 'comp-kaelen', name: 'Sir Kaelen Dawnshield', race: 'Human', class: 'Fighter', icon: '⚔️', hp: 32, maxHp: 32, ac: 18, role: 'Frontline Tank', attackBonus: 6, damageDice: '1d8+4', damageType: 'slashing', signatureMove: 'Action Surge Slash' }),
            enrichCompanion({ id: 'comp-sylva', name: 'Sylva Whisperwind', race: 'Wood Elf', class: 'Ranger', icon: '🏹', hp: 28, maxHp: 28, ac: 16, role: 'Archer', attackBonus: 6, damageDice: '1d8+1d6+3', damageType: 'piercing', signatureMove: 'Colossus Slayer Arrow' }),
            enrichCompanion({ id: 'comp-elara', name: 'Elara Starweaver', race: 'High Elf', class: 'Wizard', icon: '🔮', hp: 22, maxHp: 22, ac: 15, role: 'Evoker', attackBonus: 6, damageDice: '3d8', damageType: 'thunder', signatureMove: 'Shatter & Magic Missile' })
        ]
    },
    {
        id: 'grommash-barbarian',
        title: 'Korgath Bloodfang — Half-Orc Bear Totem Barbarian (Lv 5)',
        badge: 'Dragon Slayer (Lv 5)',
        recommendedAdventure: 'dragon-lair',
        quirk: 'Greets every boss monster by roaring its titles back at it twice as loudly and striking the flat of his Flame Tongue greatsword against his own iron-hard forehead.',
        secret: 'On the night Ashford burned, Voranthos the Red looked directly into young Korgath’s eyes and laughed, sparing him only because the dragon wanted the boy to grow strong enough to offer sport one day.',
        personalQuest: 'Ascend the volcanic caldera of Dragonspine Peak, cleave Voranthos the Red’s skull in two with his Flame Tongue blade, and scatter the wyrm’s hoard to the survivors of Ashford.',
        voiceQuote: '"Your fire only warms my blood, wyrm! Come down from the smoke and meet my steel!"',
        character: {
            name: 'Korgath Bloodfang',
            race: 'half-orc',
            subrace: 'standard-half-orc',
            class: 'barbarian',
            subclass: 'totem-warrior',
            background: 'outlander',
            alignment: 'Chaotic Good',
            level: 5,
            xp: 6500,
            gold: 250,
            inspiration: true,
            stats: { strength: 19, dexterity: 14, constitution: 18, intelligence: 8, wisdom: 12, charisma: 11 },
            skills: ['athletics', 'intimidation', 'survival', 'perception'],
            equipment: ['flame-tongue-greatsword', 'handaxe', 'cloak-of-protection', 'potion-of-greater-healing', 'potion-of-greater-healing', 'potion-of-heroism'],
            spells: [],
            quirk: 'Greets every boss monster by roaring its titles back at it twice as loudly and striking the flat of his Flame Tongue greatsword against his own iron-hard forehead.',
            secret: 'On the night Ashford burned, Voranthos the Red looked directly into young Korgath’s eyes and laughed, sparing him only because the dragon wanted the boy to grow strong enough to offer sport one day.',
            personalQuest: 'Ascend the volcanic caldera of Dragonspine Peak, cleave Voranthos the Red’s skull in two with his Flame Tongue blade, and scatter the wyrm’s hoard to the survivors of Ashford.',
            voiceQuote: '"Your fire only warms my blood, wyrm! Come down from the smoke and meet my steel!"',
            backstory: 'Korgath Bloodfang was born during a midwinter blizzard in the shadow of the Dragonspine Mountains, half-orc by blood and wholly untamed by nature. Raised in the frontier timber-town of Ashford alongside outlander trappers and tribal shamans, he learned to wrestle cave-bears in the snow and channel the primal spirit of the Great Bear into his sinews. When his rage takes hold, arrows bounce off his scarred hide, magic washes over him like warm rain, and his roar shakes stalactites loose from cavern roofs.\n\nTen years ago, the sky above Ashford tore open in a tempest of cinders. The ancient red dragon Voranthos descended from his volcanic caldera to demand tribute, reducing every timber hall and granary to white-hot ash while Korgath lay pinned beneath a burning roof-beam. Pulling himself from the wreckage with scorched hands, Korgath swore a blood-oath upon the melted iron of his father’s anvil: he would walk through every dungeon on the Sword Coast until he held a blade worthy of slaying a god of fire.\n\nFrom the subterranean depths of Wave Echo Cave and the haunted vaults of Ravencrest to the serpent-choked ruins of Kha’zar, Korgath has forged himself into an unstoppable juggernaut. Now wielding a legendary Flame Tongue Greatsword pried from an ancient warlord’s crypt, he climbs the sulfur-choked ledges of Voranthos’s Lair—ready to turn the dragon’s own element against its throat.'
        },
        companions: [
            enrichCompanion({ id: 'comp-bryn5', name: 'High Cleric Brynn', race: 'Dwarf', class: 'Cleric', icon: '✝️', hp: 44, maxHp: 44, ac: 19, role: 'Divine Healer', attackBonus: 7, damageDice: '3d8', damageType: 'radiant', signatureMove: 'Spirit Guardians & Mass Healing Word' }),
            enrichCompanion({ id: 'comp-elara5', name: 'Archmage Elara', race: 'Elf', class: 'Wizard', icon: '🔮', hp: 34, maxHp: 34, ac: 16, role: 'Spellcaster', attackBonus: 7, damageDice: '8d6', damageType: 'lightning', signatureMove: 'Lightning Bolt & Counterspell' }),
            enrichCompanion({ id: 'comp-sylva5', name: 'Sylva Dragonsbane', race: 'Wood Elf', class: 'Ranger', icon: '🏹', hp: 42, maxHp: 42, ac: 17, role: 'Sharpshooter', attackBonus: 8, damageDice: '2d8+4', damageType: 'piercing', signatureMove: 'Extra Attack Longbow Volley' })
        ]
    },
    {
        id: 'sylva-ranger',
        title: 'Sylva Moonwhisper — Wood Elf Gloom Stalker Ranger (Lv 5)',
        badge: 'Jungle Explorer (Lv 5)',
        recommendedAdventure: 'ancient-temple',
        quirk: 'Communicates tactical hand-signals using mimicry of twilight nightjars and collects a pinch of soil from every ancient ruin in small glass vials around her belt.',
        secret: 'During a solitary scouting trek three years ago, she stepped inside the outer threshold of the Ziggurat of Kha’zar and lost three days of memory—waking up with the Longbow of Warning clutched in her hands and emerald runes faded into her wrist.',
        personalQuest: 'Guide the expedition into the heart of the Ziggurat of the Sleeping God, slay its corrupted yuan-ti and elemental wardens, and prevent the ancient entity from waking.',
        voiceQuote: '"By the time you hear the bowstring, the dark has already claimed you."',
        character: {
            name: 'Sylva Moonwhisper',
            race: 'elf',
            subrace: 'wood-elf',
            class: 'ranger',
            subclass: 'gloom-stalker',
            background: 'outlander',
            alignment: 'Neutral Good',
            level: 5,
            xp: 6500,
            gold: 220,
            inspiration: true,
            stats: { strength: 12, dexterity: 19, constitution: 14, intelligence: 12, wisdom: 16, charisma: 10 },
            skills: ['stealth', 'perception', 'survival', 'nature', 'investigation'],
            equipment: ['longbow-of-warning', 'shortsword', 'mithral-chain-shirt', 'cloak-of-protection', 'potion-of-greater-healing', 'antitoxin'],
            spells: ['hunters-mark', 'cure-wounds', 'entangle', 'goodberry', 'pass-without-trace', 'spike-growth'],
            quirk: 'Communicates tactical hand-signals using mimicry of twilight nightjars and collects a pinch of soil from every ancient ruin in small glass vials around her belt.',
            secret: 'During a solitary scouting trek three years ago, she stepped inside the outer threshold of the Ziggurat of Kha’zar and lost three days of memory—waking up with the Longbow of Warning clutched in her hands and emerald runes faded into her wrist.',
            personalQuest: 'Guide the expedition into the heart of the Ziggurat of the Sleeping God, slay its corrupted yuan-ti and elemental wardens, and prevent the ancient entity from waking.',
            voiceQuote: '"By the time you hear the bowstring, the dark has already claimed you."',
            backstory: 'Trained among the shadow-wardens of the deep wood—an order of Gloom Stalkers who hunt in the lightless caverns and overgrown chasms where even wood elves fear to tread—Sylva Moonwhisper is invisible to those who rely on darkvision to see. Clad in a whisper-light Mithral Chain Shirt and veiled by Pass Without Trace, she moves through subterranean tunnels and strangler-fig jungles like a breath of cool night air. Her Longbow of Warning hums with ancient elven sentinel magic, alerting her to ambushes before an enemy’s hand even reaches for a hilt.\n\nFor five seasons, Sylva has tracked a creeping ecological corruption spreading across the realm: poisoned aquifers beneath Wave Echo Cave, necrotic brambles strangling the woods around Ravencrest Manor, and smuggled serpent-idols flowing through Blackhaven’s docks. Every trail converged southward upon the steaming, mist-shrouded expanse of the Jungle of Kha’zar, where the stepped stone pyramid of the Ziggurat of the Sleeping God rises above the canopy.\n\nAs the only horizon scout to survive the jungle’s outer death-gardens and guardian beasts, Sylva has assembled a veteran company of delvers to breach the Ziggurat’s inner sanctum. Before the blood-moon aligns over the temple’s altar and the Sleeping God opens its lidless eyes, her arrows will sever every cultist and aberration standing in the dark.'
        },
        companions: [
            enrichCompanion({ id: 'comp-valerius5', name: 'Sir Valerius', race: 'Dragonborn', class: 'Paladin', icon: '🛡️', hp: 46, maxHp: 46, ac: 19, role: 'Holy Tank', attackBonus: 8, damageDice: '2d8+4', damageType: 'radiant', signatureMove: 'Sun Blade Divine Smite' }),
            enrichCompanion({ id: 'comp-lyra5', name: 'Lyra Starweaver', race: 'High Elf', class: 'Wizard', icon: '🔮', hp: 34, maxHp: 34, ac: 16, role: 'Loremaster', attackBonus: 7, damageDice: '8d6', damageType: 'fire', signatureMove: 'Fireball & Haste' }),
            enrichCompanion({ id: 'comp-silas5', name: 'Silas Vane', race: 'Halfling', class: 'Rogue', icon: '🗡️', hp: 38, maxHp: 38, ac: 17, role: 'Relic Hunter', attackBonus: 8, damageDice: '3d6+4', damageType: 'piercing', signatureMove: 'Uncanny Dodge & Trap Disarm' })
        ]
    },
    {
        id: 'malakor-warlock',
        title: 'Zariel’s Envoy Kaelith — Tiefling Fiend Warlock (Lv 5)',
        badge: 'Eldritch Master (Lv 5)',
        recommendedAdventure: 'dragon-lair',
        quirk: 'Idly conjures tiny, harmless illusions of brimstone chess pieces dancing across his palm whenever someone tries to lie to him or negotiate a reward.',
        secret: 'His infernal pact with the Archduchess of Avernus contains a hidden loophole: if he claims the soul-spark of an ancient red dragon or a slumbering primordial god, his contract is paid in full and his soul is his own again.',
        personalQuest: 'Harvest the primordial power of Voranthos’s volcanic heart and the Ziggurat of Kha’zar to buy back his infernal contract—and become master of his own destiny.',
        voiceQuote: '"I have read the fine print of damnation, friend—and trust me, your name is on the next page."',
        character: {
            name: 'Kaelith Hellborn',
            race: 'tiefling',
            subrace: 'asmodeus-tiefling',
            class: 'warlock',
            subclass: 'the-fiend',
            background: 'charlatan',
            alignment: 'Chaotic Neutral',
            level: 5,
            xp: 6500,
            gold: 240,
            inspiration: true,
            stats: { strength: 9, dexterity: 16, constitution: 15, intelligence: 13, wisdom: 12, charisma: 19 },
            skills: ['arcana', 'deception', 'intimidation', 'persuasion'],
            equipment: ['staff-of-defense', 'studded-leather', 'ring-of-protection', 'pearl-of-power', 'potion-of-greater-healing', 'scroll-of-fireball'],
            spells: ['eldritch-blast', 'toll-the-dead', 'hex', 'hellish-rebuke', 'armor-of-agathys', 'misty-step', 'hold-person', 'hunger-of-hadar', 'counterspell'],
            quirk: 'Idly conjures tiny, harmless illusions of brimstone chess pieces dancing across his palm whenever someone tries to lie to him or negotiate a reward.',
            secret: 'His infernal pact with the Archduchess of Avernus contains a hidden loophole: if he claims the soul-spark of an ancient red dragon or a slumbering primordial god, his contract is paid in full and his soul is his own again.',
            personalQuest: 'Harvest the primordial power of Voranthos’s volcanic heart and the Ziggurat of Kha’zar to buy back his infernal contract—and become master of his own destiny.',
            voiceQuote: '"I have read the fine print of damnation, friend—and trust me, your name is on the next page."',
            backstory: 'Before he was known as Zariel’s Envoy, Kaelith Hellborn was the most audacious high-society con artist between Baldur’s Gate and Blackhaven—a crimson-skinned tiefling who wore false noble titles like tailored velvet coats and cheated corrupt guildmasters out of their own estates. His silver tongue finally met its match when he broke into a clandestine infernal sanctum beneath Blackhaven to steal a ruby reliquary, only to trigger a planar binding circle that dragged him face-to-face with an emissary of the Nine Hells.\n\nRather than begging for his life, Kaelith negotiated. Signing a pact in burning brimstone, he walked out of the circle alive, armed with the Staff of Defense, the freezing void of Hunger of Hadar, and agonizing beams of eldritch force that feed him temporary vitality every time a foe falls in ash. Though his patron expects him to act as an enforcer of hellish order across the Sword Coast, Kaelith plays a far deeper game.\n\nBy inserting a clever clause into the archaic High Infernal wording of his contract, Kaelith discovered that delivering a vessel of mythic power—whether from the Forge of Spells in Wave Echo Cave, the cursed blood-altar of Ravencrest, the Ziggurat of the Sleeping God, or the volcanic hoard of Voranthos the Red—will shatter his chains forever. With a wicked smile and hellfire in his eyes, he leads his companions straight into the jaws of legend.'
        },
        companions: [
            enrichCompanion({ id: 'comp-korgath5', name: 'Korgath Bloodfang', race: 'Half-Orc', class: 'Barbarian', icon: '🪓', hp: 55, maxHp: 55, ac: 16, role: 'Berserker', attackBonus: 8, damageDice: '2d6+6', damageType: 'slashing', signatureMove: 'Rage & Extra Attack' }),
            enrichCompanion({ id: 'comp-bryn5', name: 'High Cleric Brynn', race: 'Dwarf', class: 'Cleric', icon: '✝️', hp: 44, maxHp: 44, ac: 19, role: 'Life Cleric', attackBonus: 7, damageDice: '3d8', damageType: 'radiant', signatureMove: 'Spirit Guardians & Revivify' }),
            enrichCompanion({ id: 'comp-silas5', name: 'Silas Vane', race: 'Halfling', class: 'Rogue', icon: '🗡️', hp: 38, maxHp: 38, ac: 17, role: 'Assassin', attackBonus: 8, damageDice: '3d6+4', damageType: 'piercing', signatureMove: 'Venomous Sneak Attack' })
        ]
    }
];

export const partyPresets = heroPresets.map(preset => ({
    id: `party-${preset.id}`,
    name: `${preset.badge} Party`,
    heroPresetId: preset.id,
    recommendedAdventure: preset.recommendedAdventure,
    companions: preset.companions
}));
