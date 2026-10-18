# 🏰 Dungeon Master's Guide (2024) — Lore, Toolbox & Adventure Engine
**Source Reference:** `https://www.dndbeyond.com/sources/dnd/dmg-2024`

This document synthesizes the **2024 Dungeon Master's Guide** into an actionable framework for running sessions, adjudicated outcomes, building balanced encounters, stocked dungeons, planar lore, treasure hoards, and player Bastions.

---

## 1. Running the Game (Chapters 1–2)

### Setting Difficulty Classes (DCs)
Whenever a player attempts an action with a meaningful risk of failure, assign a **Difficulty Class (DC)** using the standard 2024 benchmarks:

| Difficulty | DC | When to Use in an Adventure |
| :--- | :---: | :--- |
| **Very Easy** | **5** | Almost anyone can do this without training; noticing something large in plain sight |
| **Easy** | **10** | Routine task for an adventurer; climbing a knotted rope, recalling common local lore |
| **Medium** | **15** | Requires training or natural talent; picking a standard lock, spotting a well-hidden tripwire |
| **Hard** | **20** | Challenging even for experts; swimming against a raging underground river, disarming an arcane glyph |
| **Very Hard** | **25** | Heroic feat; picking a masterwork dwarven vault, tracking a creature across bare rain-washed stone |
| **Nearly Impossible** | **30** | Legendary mastery required; persuading a hostile warlord to stand down mid-siege |

### Graduated Outcomes & Consequences
Instead of binary pass/fail stalls, the 2024 DMG encourages **forward-moving adjudication**:
* **Success at a Cost (Miss by 1–2):** The character achieves their goal, but suffers a complication (e.g., picks the lock, but breaks a pick and alerts guards on the other side; leaps the chasm, but drops their torch or takes $1\text{d}6$ bludgeoning damage landing on the ledge).
* **Degrees of Failure (Fail by 5 or more):** Triggers a worse consequence (e.g., failing to disarm a trap by 5+ immediately springs it; failing an arcane deciphering check by 5+ triggers a psychic ward).

### Improvising Damage (2024 Table)
Use these two scales (**Nuisance** vs. **Deadly**) whenever a character suffers environmental, trap, or improvised damage:

| Character Level Tier | Nuisance Damage *(Setback / Minor)* | Deadly Damage *(Severe / Lethal)* |
| :--- | :---: | :---: |
| **Levels 1–4** *(Tier 1)* | **1d10** *(5)* | **4d10** *(22)* |
| **Levels 5–10** *(Tier 2)* | **2d10** *(11)* | **10d10** *(55)* |
| **Levels 11–16** *(Tier 3)* | **4d10** *(22)* | **18d10** *(99)* |
| **Levels 17–20** *(Tier 4)* | **10d10** *(55)* | **24d10** *(132)* |

* **Examples:** Falling bookshelves or stumbling into campfires = `1d10`; crushed by compacting dungeon walls = `10d10`; wading through lava or hit by a crashing fortress tower = `18d10`.

---

## 2. Social Interaction Engine (Chapter 2)

Every NPC or intelligent monster starts a social encounter with one of three **Starting Attitudes**:

| Attitude | Behavior Toward Adventurers | Influence Action Modifier |
| :--- | :--- | :--- |
| **Friendly** | Wishes the party well; offers help, information, or fair bargains if risk is low | **Advantage** on Charisma checks to influence |
| **Indifferent** | Neutral or self-interested; cares about their own safety, coin, or duty | **Normal roll** (no modifier) |
| **Hostile** | Opposes the party; seeks to thwart, deceive, drive off, or attack them | **Disadvantage** on Charisma checks to influence |

### Resolving the Influence Action
1. **Roleplay & Leverage:** If the player appeals to an NPC's **Bond, Ideal, Flaw, or Greed**, shift the NPC's attitude one step toward Friendly or grant Advantage.
2. **Determine Check:**
   * **Charisma (Persuasion):** Good-faith negotiation, etiquette, shared interest.
   * **Charisma (Deception):** Bluffing, fast-talking, forged credentials.
   * **Charisma (Intimidation):** Coercion, display of force *(often turns NPC Hostile once the threat passes)*.
   * **Wisdom (Animal Handling):** Calming or influencing a Beast or Monstrosity.
3. **Standard DC:** **DC 15** (or $\max(15, \text{NPC's Passive Insight})$).

---

## 3. The DM's Toolbox: Dungeons, Doors, Traps & Hazards (Chapter 3)

### Dungeon Doors
| Door Type | AC | Hit Points | Athletics DC (Force Open) | Thieves' Tools DC (Pick Lock) |
| :--- | :---: | :---: | :---: | :---: |
| **Simple Wooden Door** | 15 | 10 (barred: 15) | DC 13 (barred: DC 15) | DC 10–12 |
| **Reinforced / Heavy Oak Door** | 15 | 25 | DC 18 | DC 15 |
| **Stone Slab Door** | 17 | 60 | DC 20 | DC 18 |
| **Iron Vault Door** | 19 | 100 (Damage Threshold 10) | DC 25 | DC 20–25 |
| **Iron Portcullis** | 19 | 60 | DC 20 (Lift) | N/A (Winch mechanism) |
| **Secret Door** | — | — | **Perception DC 15** to spot seam | **Investigation DC 15** to find latch |

### Traps (2024 Format)
Every trap in the 2024 DMG is defined by four clean components:
1. **Severity & Level Tier:** *Nuisance* or *Deadly* for Levels 1–4, 5–10, 11–16, or 17–20.
2. **Trigger:** What sets it off (stepping on a pressure plate, opening an unwarded chest, crossing a tripwire, speaking the wrong passphrase).
3. **Duration:** Instantaneous (dart volley, pit collapse) or Continuous/Initiative-based (rolling boulder, flooding chamber, poison gas every round on Initiative 0).
4. **Countermeasures (Detect & Disarm):**
   * **Detect:** **Wisdom (Perception)** to spot physical cues (scratches on stone, pinhole nozzles, taut wire).
   * **Inspect / Understand:** **Intelligence (Investigation)** or **Arcana** to deduce how the mechanism or rune triggers.
   * **Disarm:** **Dexterity (Thieves' Tools)** for mechanical traps, or **Intelligence (Arcana)** / *Dispel Magic* for magical traps.

#### Classic 2024 Sample Traps
* **Hidden Pit / Spiked Pit (Levels 1–4):** Perception DC 15 to spot; DEX Save DC 13 or fall 10–20 ft. (`1d6` to `2d6` Bludgeoning + `2d10` Piercing from spikes).
* **Poisoned Needle Lock (Levels 1–4):** Investigation DC 15; triggers if lock is picked and fails by 5+ or opened without the key. CON Save DC 13 or take `1d10` Poison damage and become **Poisoned** for 1 hour.
* **Fire-Breathing Statue (Levels 1–4 Deadly / 5–10 Nuisance):** Pressure plate triggers a 15-ft. cone of flame (`4d10` Fire damage, DEX Save DC 13 for half). Arcana or Thieves' Tools DC 15 to wedge/disable.
* **Rolling Stone Sphere (Levels 5–10 Deadly):** Rolls on Initiative count 20 (Speed 60 ft.). DEX Save DC 15 or take `10d10` Bludgeoning damage and be knocked **Prone**.

### Classic Environmental Hazards
* **Green Slime:** Drops from ceilings when movement/heat passes beneath (Perception DC 10). Deals `1d10` Acid damage (destroys wood/metal; `2d10` vs. objects) at the start of each turn until scraped off or burned with Fire, Cold, or Radiant damage.
* **Yellow Mold:** Releases a 10-ft. cube spore cloud when touched (`2d10` Poison damage + **Poisoned** for 1 min; CON Save DC 15). Destroyed instantly by Fire or sunlight.
* **Brown Mold:** Feeds on warmth; creatures within 5 ft. make a CON Save DC 12 or take `4d10` Cold damage (half on save). Immune to Fire (Fire causes it to expand!); destroyed instantly by Cold damage.
* **Falling:** `1d6` Bludgeoning damage per **10 feet** fallen (max `20d6`), landing **Prone** unless damage is avoided.
* **Suffocation / Drowning:** Hold breath for $1 + \text{CON Mod}$ minutes (minimum 30 seconds). When out of breath, survive for $\text{CON Mod}$ rounds (minimum 1), then drop to **0 HP and begin dying** at the start of your next turn (cannot regain HP or stabilize until you can breathe).

### Mob Combat Rules (Chapter 3)
When large numbers of identical low-CR minions attack a single target, skip rolling 20 dice and use the **Mob Lookup Table**:

| d20 Roll Needed to Hit ($\text{Target AC} - \text{Attack Bonus}$) | Attackers Needed for 1 Guaranteed Hit |
| :---: | :---: |
| **1–5** | **1** |
| **6–12** | **2** |
| **13–14** | **3** |
| **15–16** | **4** |
| **17–18** | **5** |
| **19** | **10** |
| **20** | **20** |

---

## 4. Creating Adventures & 2024 Encounter XP Budgets (Chapter 4)

### The Four-Act Adventure Structure
Every great D&D adventure follows a clear dramatic arc that maps directly to our `dnd_story_graph.json`:
1. **Act I — The Hook & Premise:** A Patron, rumor, crisis, or map draws the heroes to the adventure site. Establishes the stakes, key NPCs, and what happens if the villain succeeds.
2. **Act II — Exploration & Escalating Challenges:** The party navigates the dungeon, wilderness, or mystery. Features branching paths, **2–3 Low/Moderate combat encounters**, environmental puzzles, secret doors, and a safe or defensible spot for a **Short Rest**.
3. **Act III — The Climax (Boss Lair):** The final confrontation against the primary antagonist (a **High-difficulty encounter**), incorporating dynamic terrain, lair hazards, or a secondary objective (rescuing captives, shattering a ritual focus, escaping a collapsing sanctum).
4. **Act IV — Resolution & Rewards:** Awarding the **Treasure Hoard**, XP/Milestone leveling, Bastion progression, and planting the **Seed** for the next adventure.

### 2024 Combat Encounter Difficulty & XP Budgets
> [!IMPORTANT]
> **2024 DMG Upgrade:** The 2024 DMG **eliminated** the confusing 2014 "monster count XP multipliers" ($\times 1.5, \times 2, \times 2.5$). Instead, each character contributes an **XP Budget** based on their level and desired difficulty (**Low**, **Moderate**, or **High**). You simply spend that budget directly on monsters' raw XP values!

#### XP Budget per Character by Level (2024 DMG Table)

| Character Level | Low Difficulty (XP) | Moderate Difficulty (XP) | High Difficulty (XP) | Solo / Single Hero Adjusted Budget *(w/ Sidekick or Heroic Boons)* |
| :---: | :---: | :---: | :---: | :---: |
| **Level 1** | **50** | **75** | **100** | 100 – 200 |
| **Level 2** | **100** | **150** | **200** | 200 – 400 |
| **Level 3** | **150** | **225** | **400** | 300 – 700 |
| **Level 4** | **250** | **375** | **500** | 500 – 1,100 |
| **Level 5** | **500** | **750** | **1,100** | 1,100 – 1,800 |
| **Level 6** | **600** | **1,000** | **1,400** | 1,400 – 2,300 |
| **Level 7** | **750** | **1,300** | **1,700** | 1,700 – 2,900 |
| **Level 8** | **1,000** | **1,700** | **2,100** | 2,100 – 3,900 |
| **Level 9** | **1,300** | **2,000** | **2,600** | 2,600 – 5,000 |
| **Level 10** | **1,600** | **2,300** | **3,100** | 3,100 – 5,900 |
| **Level 11** | **1,900** | **2,900** | **4,100** | 4,100 – 7,200 |
| **Level 12** | **2,200** | **3,700** | **4,700** | 4,700 – 8,400 |
| **Level 15** | **3,900** | **5,900** | **7,800** | 7,800 – 13,000 |
| **Level 20** | **6,400** | **10,600** | **14,200** | 14,200 – 25,000 |

* **Low Difficulty:** Few resources spent; good for entrance guards, wandering monsters, or teaching a dungeon's gimmick.
* **Moderate Difficulty:**Requires tactical play and some healing or spell slots; standard main-path dungeon encounter.
* **High Difficulty:** Tests the party's limits; somebody might drop to 0 HP if careless. Ideal for mini-bosses and Act III Climax fights.

---

## 5. Lore, Campaign Flavors & Cosmology (Chapters 5–6)

### The Five Campaign Flavors
1. **Heroic Fantasy:** Classic D&D (*Forgotten Realms / Sword Coast*). Champions battle dragons, liches, and evil cults to protect towns and kingdoms.
2. **Sword & Sorcery:** Gritty, perilous pulp fantasy (*Greyhawk / Dark Sun*). Moral ambiguity, ancient tombs, forbidden sorcery, and hard-won gold.
3. **Dark Fantasy / Gothic Horror:** Dread, curses, undead overlords, and creeping corruption (*Ravenloft / Shadowfell*). Silver weapons, holy water, and sanity/fear checks matter deeply.
4. **Epic Fantasy:** World-shaking wars between gods, archdevils, and elder evils across the planes (*Dragonlance*).
5. **Intrigue & Mystery:** Urban guilds, noble courts, shapeshifters, heists, and investigation (*Waterdeep / Eberron*).

### The Great Wheel Cosmology (Chapter 6)
* **The Material Plane:** The nexus of mortal worlds (*Toril / Forgotten Realms, Oerth / Greyhawk, Krynn, Eberron*).
* **The Echo Planes (Parallel to the Material):**
  * **The Feywild (Plane of Faerie):** Lush, twilight realm of untamed emotion, Archfey (Seelie and Unseelie Courts), eladrin, hags, and time warps.
  * **The Shadowfell (Plane of Shadow):** Bleak, monochrome mirror of decay, ghosts, darkpowers, the Raven Queen, and necrotic dread.
* **The Inner (Elemental) Planes:** Planes of **Air, Earth, Fire, Water** (and Para-Elemental borders of Ice, Magma, Ooze, Smoke), centered around the **Elemental Chaos**.
* **The Transitive Planes:**
  * **Ethereal Plane:** Misty Border Ethereal overlapping the Material Plane (*Blink*, *Etherealness*, ghosts, phase spiders) and Deep Ethereal.
  * **Astral Plane:** Silvery sea of thought connecting to the Outer Planes; home of githyanki astral pirates and dead gods.
* **The Outer Planes:** Alignment-defined realms of deities, Celestials (*Mount Celestia, Elysium, Arborea*), Fiends (*The Nine Hells of Baator* [Lawful Evil Devils], *The Infinite Layers of the Abyss* [Chaotic Evil Demons]), and Mechanus (*Modrons*).

---

## 6. Treasure Themes, Magic Items & Bastions (Chapters 7–8)

### The 4 New 2024 Treasure Themes
In the 2024 DMG & MM, every monster stat block lists a **Treasure Theme** indicating what kind of loot it keeps:
1. **Arcana:** Magical knowledge and mysticism — *gemstones, spell scrolls, potions, wands, staffs, rings, and wondrous items*.
2. **Armaments:** Martial war-gear — *coins, trade bars, +1/+2/+3 weapons, shields, armor, and ammunition*.
3. **Implements:** Adventuring tools and utility — *coins, mundane gear, thieves' tools, bags of holding, boots/cloaks, ropes, and utility magic items*.
4. **Relics:** Sacred, ancient, or cursed artifacts — *art objects, holy symbols, divine scrolls, censers, and relic magic items*.

### Treasure Hoards by Challenge Rating Tier (2024 DMG)
| CR Tier of Boss / Encounter | Monetary Hoard Value | Magic Items Rolled |
| :--- | :--- | :---: |
| **CR 0–4** *(Tier 1)* | **2d4 × 100 GP** *(~500 GP)* | **1d4 − 1** *(Common / Uncommon)* |
| **CR 5–10** *(Tier 2)* | **8d10 × 100 GP** *(~4,400 GP)* | **1d3** *(Uncommon / Rare)* |
| **CR 11–16** *(Tier 3)* | **8d8 × 1,000 GP** *(~36,000 GP)* | **1d4** *(Rare / Very Rare)* |
| **CR 17+** *(Tier 4)* | **6d10 × 10,000 GP** *(~330,000 GP)* | **1d6** *(Very Rare / Legendary)* |

### Magic Item Rarities & Attunement
* **Rarities:** `Common` (50–100 GP) $\rightarrow$ `Uncommon` (101–400 GP, e.g., *+1 Weapon, Bag of Holding, Cloak of Protection*) $\rightarrow$ `Rare` (401–4,000 GP, e.g., *+2 Weapon, Flame Tongue, Ring of Spell Storing*) $\rightarrow$ `Very Rare` (4,001–40,000 GP, e.g., *+3 Weapon, Staff of Power*) $\rightarrow$ `Legendary` (40,001+ GP, e.g., *Vorpal Sword, Holy Avenger*) $\rightarrow$ `Artifact`.
* **Attunement Rule:** Some magic items require **Attunement** (1 Short Rest focused on the item). A creature can be attuned to **at most 3 magic items** at a time.
* **Potions of Healing (2024 Bonus Action Rule):** Drinking or administering a *Potion of Healing* now takes a **Bonus Action** (2024 update!), making mid-combat survival much smoother:
  * *Potion of Healing:* **$2\text{d}4 + 2$ HP**
  * *Potion of Greater Healing:* **$4\text{d}4 + 4$ HP**
  * *Potion of Superior Healing:* **$8\text{d}4 + 8$ HP**
  * *Potion of Supreme Healing:* **$10\text{d}4 + 20$ HP**

### Bastions (Chapter 8 — Player Strongholds)
Starting at **Level 5**, characters can establish a **Bastion** (a keep, wizard tower, thieves' guildhall, or temple) that progresses between adventures via **Bastion Turns**:
* **Special Facilities (Level 5+):** *Arcane Study* (craft magic items/charms), *Armory* (stockpile gear for Bastion Defenders), *Barrack* (recruit Defenders), *Garden* (harvest healing herbs/poisons), *Library* (research lore secrets), *Sanctuary* (craft sacred charms), *Smithy* (forge masterwork/magic weapons), *Storehouse* (trade profit), *Teleportation Circle* (Level 9+), *Reliquary*, *Guildhall*.
* **Bastion Orders:** `Craft`, `Empower`, `Harvest`, `Maintain`, `Recruit`, `Research`, `Trade`.
