# 🐉 D&D 5e Interactive Adventure Manuscript & Authoring Template
**System:** Unified 5e Engine — *Player's Handbook (2014)* • *Dungeon Master's Guide (2024)* • *Monster Manual (2014 & 2024)*  
**Graph Sync:** Every `### Section [N]` in an adventure manuscript maps 1-to-1 to a node in [`dnd_story_graph.json`](file:///Volumes/TOSHIBA%20EXT/Antigravity%20Work/dnd-framework/templates/dnd_story_graph.json), while live hero stats are tracked in [`dnd_character_sheet.json`](file:///Volumes/TOSHIBA%20EXT/Antigravity%20Work/dnd-framework/templates/dnd_character_sheet.json).

---

## 🛠️ Part I: Adventure Section Authoring Blueprint

When authoring any new D&D adventure in this framework, use the following standard blocks for every numbered section/chamber:

1. **Section Header & Metadata Bar:**
   * Format: `## Section [N]: [Chamber or Scene Title] (Act [I–IV] — [Node Type])`
   * Include **Lighting** (*Bright Light, Dim Light, Darkness*), **Terrain / Cover**, and **Encounter Budget** (*Low / Moderate / High XP*).
2. **Read-Aloud Boxed Text (`> 📜 **Read Aloud:**`):**
   * Written in evocative, atmospheric second-person present tense (*"You step into the torchlit cavern..."*).
   * When narrating via TTS (`speak` tool), read this boxed text aloud first before presenting the mechanical choices!
3. **Interactive Checks, Traps & Social Influence:**
   * Format skill checks clearly as **`[Ability] ([Skill]) — DC [X] ([Difficulty])`** with **Success**, **Success at a Cost (Miss by 1–2)**, and **Failure** outcomes.
   * For social encounters, specify **Starting Attitude** (*Friendly [Advantage] / Indifferent [Normal] / Hostile [Disadvantage]*) and **Leverage**.
4. **Inline 2024 Monster Stat Block:**
   * Include pre-calculated **Initiative** (`+Mod (Static)`), **AC**, **HP**, side-by-side **MOD / SAVE**, and streamlined on-hit riders.
5. **Treasure Hoard (`💰 Treasure ([Theme]):`):**
   * Tag with one of the four 2024 themes (*Arcana, Armaments, Implements, Relics*).
6. **Exits & Player Choices (`🧭 What do you do?`):**
   * Numbered actionable choices linking to valid target sections in `dnd_story_graph.json`.

---

## ⚔️ Part II: Playable Sample Adventure — *The Cragmaw Ambush & Goblin Delve*
*An Interactive D&D 5e Adventure for a Level 2 Hero (`Kaelen Vane, Paladin 2`) & Sidekick (`Sister Lyra, Acolyte 2`)*

---

## Section 1: The Dead Horses on the Triboar Trail
**Act I — The Hook & Combat Ambush** | **Node ID:** `node_1_triboar_trail`  
**Lighting:** Bright Light | **Terrain:** Sunken Dirt Road & Briar Thickets (Half Cover `+2 AC` in brush) | **Encounter:** Low Difficulty (`150 XP`)

> 📜 **Read Aloud:**
> You have been driving Gundren Rockseeker's creaking supply wagon south along the High Road for three days alongside your companion, Sister Lyra of Neverwinter. Just after midday, you turn east onto the Triboar Trail—an uneven dirt track winding through dense pine woods toward the frontier town of Phandalin.
> 
> Rounding a sharp bend where steep, briar-choked embankments rise on either side of the road, you pull hard on the reins. Sprawled in the middle of the trail fifty feet ahead are two dead horses, their flanks bristling with black-feathered arrows. A battered leather saddlebag lies torn open in the mud beside them. The woods press close and ominously silent.

### 🎲 Active Checks & Tactical Setup
* **Spot the Ambush — `Wisdom (Perception) DC 12`:**
  * **Success:** You catch the glint of rusted iron arrowheads and yellow eyes peering from the northeast briar thicket! Neither you nor Sister Lyra are Surprised in Round 1.
  * **Success at a Cost (Roll 10–11):** You spot movement a heartbeat before bowstrings twang; you are not Surprised, but the goblins gain `+2` to Initiative.
  * **Failure (9 or lower):** Three Cragmaw goblins loose a volley from hidden cover before you can raise your shield (their Round 1 Shortbow attacks have **Advantage**).

### 👹 Combat Encounter: Cragmaw Bushwhackers (3× Goblin — 150 XP)
> **DM Tactical Note:** Two goblins stay in the briar embankment (**Half Cover: AC 17**) firing Shortbows and using **Nimble Escape** as a Bonus Action to Hide or Disengage. One goblin charges the wagon with a Scimitar. When two goblins are slain, the survivor tries to flee northwest down the hidden forest trail.

#### GOBLIN (×3)
*Small Fey (Goblinoid), Neutral Evil*
- **Habitat:** Forest, Hill, Underdark | **Treasure:** Implements
- **AC:** 15 (Leather Armor, Shield) | **Initiative:** +2 (12)
- **HP:** 10 (3d6) each | **Speed:** 30 ft.

| Ability | Score | MOD | SAVE | Ability | Score | MOD | SAVE |
| :--- | :---: | :---: | :---: | :--- | :---: | :---: | :---: |
| **STR** | 8 | −1 | −1 | **INT** | 10 | +0 | +0 |
| **DEX** | 14 | +2 | +2 | **WIS** | 8 | −1 | −1 |
| **CON** | 10 | +0 | +0 | **CHA** | 8 | −1 | −1 |

- **Skills:** Stealth +6 | **Senses:** Darkvision 60 ft.; Passive Perception 9
- **CR:** 1/4 (XP 50 each; PB +2)
- **Actions:**
  - **Scimitar.** *Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage.
  - **Shortbow.** *Ranged Attack Roll:* +4, range 80/320 ft. *Hit:* 5 (1d6 + 2) Piercing damage (plus `1d4` Piercing if attacking from hiding).
- **Bonus Actions:**
  - **Nimble Escape.** The goblin takes the Disengage or Hide action.

### 🔍 Post-Combat Investigation & Loot
* **Inspect the Scene — `Wisdom (Survival) DC 10`:** You recognize the dead mounts as belonging to your patron **Gundren Rockseeker** and his escort **Sildar Hallwinter**. Heavy drag-marks and small,cleated goblin bootprints lead northwest into the dark pines.
* **💰 Treasure (Implements):** `12 SP`, `4 GP`, and an **empty leather map case** stamped with Gundren's clan rune.

### 🧭 What do you do?
1. **Follow the goblin drag-marks northwest along the shaded forest trail** $\rightarrow$ **Go to Section 2**.

---

## Section 2: The Snare-Lined Forest Trail
**Act II — Exploration & Mechanical Traps** | **Node ID:** `node_2_forest_snare_trail`  
**Lighting:** Dim Light (Canopy Shadows) | **Terrain:** Narrow Forest Path & Babbling Creek

> 📜 **Read Aloud:**
> Securing the supply wagon in a concealed clearing off the road, you and Sister Lyra advance single-file up the trampled goblin trail. Pine boughs blot out the afternoon sun, bathing the mossy path in cool green twilight. To your left, a cold mountain stream tumbles over slick gray boulders. Ahead, the trail narrows between twisted tree roots and suspiciously undisturbed patches of dead fern.

### ⚠️ Traps Along the Trail (2024 Trap Format)
1. **Trap 1: Counterweight Rope Snare (Level 1–4 Nuisance Trap)**
   * **Detect:** `Wisdom (Perception) DC 12` spots the hemp loop hidden under dry pine needles.
   * **Disarm:** `Dexterity (Thieves' Tools or Sleight of Hand) DC 10` cuts the tension line harmlessly.
   * **Trigger & Effect:** Stepping onto the snare forces a **`DC 12 Dexterity Saving Throw`**. On a failed save, a bent sapling whips the lead character upside-down 10 feet in the air (**Restrained** until cut down; falling deals `1d6` Bludgeoning damage).
2. **Trap 2: Camouflaged Spiked Pit (Level 1–4 Nuisance Trap)**
   * **Detect:** `Wisdom (Perception) or Intelligence (Investigation) DC 15` notices sagging twigs across a 6-foot-wide section of trail.
   * **Disarm / Bypass:** Skirt the stone rim or wedge logs across (`DC 12 Survival`).
   * **Trigger & Effect:** Crossing without spotting it forces a **`DC 13 Dexterity Saving Throw`**. On a failure, you plunge 10 feet onto sharpened wooden stakes, taking **`1d6` Bludgeoning + `1d10` Piercing damage**.

### 🧭 What do you do?
1. **Press onward to the twin crags where the stream pours out of a dark cave mouth** $\rightarrow$ **Go to Section 3**.

---

## Section 3: The Cave Mouth & Chained Wolves
**Act II — Branching Exploration / Beast Encounter** | **Node ID:** `node_3_cave_mouth_kennel`  
**Lighting:** Dim Light at entrance; Darkness deeper inside | **Encounter:** Low Difficulty (`100 XP` — Optional)

> 📜 **Read Aloud:**
> The forest trail ends before a yawning cavern mouth set into the base of a craggy hillside. A shallow, icy stream flows out of the cave, bordered by a narrow ledge of dry stone on the right. Just inside the shadowed overhang, two gaunt, gray-furred wolves strain against iron chains hammered into the base of a stalagmite. As your shadow falls across the threshold, their hackles rise and a low, rumbling growl echoes through the rock. Above their kennel, a narrow natural rock chimney angles steeply upward into the dark ceiling.

### 🎲 Interactive Approaches
* **Option A — Calm and Feed the Wolves (`Wisdom [Animal Handling] DC 15`):**
  * *Tactical Leverage:* If you toss **1 Ration** from your pack to the starving wolves, you roll with **Advantage** (or automatically lower the DC to **10**)!
  * **Success:** The wolves tear into the salted meat and curl down quietly, letting you pass up the main stream tunnel or scale the rock chimney in silence.
  * **Failure:** Snapping furiously, the wolves yank the loose iron spike free of the crumbling limestone and lunge to attack!
* **Option B — Scale the 30-Foot Rock Chimney (`Strength [Athletics] DC 15`, or `DC 10` with Rope & Grappling Hook):**
  * Once the wolves are calm or defeated, climbing this narrow shaft bypasses the main tunnel traps and drops you directly behind Klarg's throne in **Section 7** with **Surprise**!

### 👹 Combat Encounter: Starving Cragmaw Wolves (2× Wolf — 100 XP)
#### WOLF (×2)
*Medium Beast, Unaligned*
- **AC:** 13 (Natural Armor) | **Initiative:** +2 (12)
- **HP:** 11 (2d8 + 2) each | **Speed:** 40 ft.
- **Traits:** **Pack Tactics** (Advantage on attacks when an ally is within 5 ft. of target).
- **Actions:**
  - **Bite.** *Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Piercing damage. **2024 Auto-Rider:** If the target is Medium or smaller, it automatically has the **Prone** condition.

### 🧭 What do you do?
1. **Advance northward along the rushing underground stream into the main cavern passage** $\rightarrow$ **Go to Section 4**.
2. **Climb the 30-foot natural rock chimney directly into the upper boss sanctum (Requires Athletics DC 15 / DC 10 w/ Rope)** $\rightarrow$ **Go to Section 7**.

---

## Section 4: The Shadowed Overpass & Flood Trap
**Act II — Environmental Hazard & Dungeon Junction** | **Node ID:** `node_4_flood_trap_passage`  
**Lighting:** Darkness (Requires Torch, *Light* cantrip, or Darkvision)

> 📜 **Read Aloud:**
> Inside the cavern, the roar of rushing water fills your ears, drowning out the sounds of the forest behind you. The narrow stone walkway hugs the eastern bank of the stream. Twenty feet above your head, a silhouette of planks and frayed hemp rope spans the chasm like a high bridge. To your left, rough-hewn stone steps climb westward toward the smell of woodsmoke and the shrill bickering of goblin voices. To your right, the damp eastern wall bears unusually square, chisel-cut blocks buried beneath thick cave moss.

### 🎲 Checks & Hazards
* **Sneak Beneath the Bridge Lookout — `Dexterity (Stealth) DC 10`:**
  * *Light Penalty:* Carrying an open Torch or *Light* spell imposes **Disadvantage** unless Sister Lyra shields the flame under her cloak.
  * **Success:** You glide past the overpass unseen.
  * **Failure — Cragmaw Dam Flash Flood!** A goblin lookout on the high bridge spots your light, shrieks *"Bree-yark!"*, and kicks loose the floodgate timber upstream. A churning wall of icy water roars down the tunnel! Make a **`DC 15 Strength Saving Throw`** (or duck into the western stairs with a `DC 12 Dexterity Save`). On a failure, take **`2d6` Bludgeoning damage**, fall **Prone**, and get swept back to **Section 3**!
* **Search the Eastern Chisel-Cut Wall — `Wisdom (Perception) DC 15`:**
  * **Success:** You spot a concealed dwarven pivot-stone! Pressing it swings open a hidden door into **Section 6 (The Forgotten Dwarven Shrine)**.

### 🧭 What do you do?
1. **Climb the western stone steps toward the smoky den and bickering goblins** $\rightarrow$ **Go to Section 5**.
2. **Open the secret dwarven pivot-door in the eastern wall (If spotted via Perception DC 15)** $\rightarrow$ **Go to Section 6**.
3. **Scramble up the eastern ledge and cross the rope bridge toward the waterfall cavern** $\rightarrow$ **Go to Section 7**.

---

## Section 5: Yeemik's Den & The Hostage Parley
**Act II — Social Interaction (2024 Influence Engine) or Combat** | **Node ID:** `node_5_yeemik_parley_den`  
**Lighting:** Dim Light (Cooking Fire) | **Encounter:** Social Parley (`DC 15`) or Moderate Combat (`300 XP`)

> 📜 **Read Aloud:**
> The western passage opens into a tiered, smoke-stained cavern that serves as the goblins' barracks. On a ten-foot-high stone ledge at the back of the chamber stands a tall, scar-faced goblin wearing a tarnished silver medallion around his neck. Two lesser goblins flank him with bows drawn.
> 
> Kneeling at the edge of the drop, bound in rusted chains and bruised to the bone, is a silver-haired human warrior in torn leather—Sildar Hallwinter! The scarred goblin presses a notched scimitar to Sildar's throat and barks in broken Common:
> 
> *"Stop right there, tall-folk! One step closer and the old man takes a dive! Listen to Yeemik instead—that big, stupid bugbear Klarg thinks he's king of the Cragmaws. Bring me Klarg's head from across the bridge, and you can walk out of here with your friend alive!"*

### 🗣️ Social Interaction Engine (2024 DMG Influence Rules)
* **NPC:** **Yeemik the Goblin Boss** | **Starting Attitude:** `Indifferent` (Self-interested & greedy; turns `Hostile` if attacked).
* **Roleplay Leverage:** If you appeal to Yeemik's ambition to rule the tribe or offer him Klarg's plunder, his attitude shifts to `Friendly` (**Advantage** on your Influence roll!).
* **Make an Influence Check — `Charisma (Persuasion, Intimidation, or Deception) DC 15`:**
  * **Success:** Yeemik grins wickedly and shoves Sildar Hallwinter down the steps into Sister Lyra's care right now as a sign of good faith! Even better, Yeemik whispers a tip: *"Watch out for Klarg's pet wolf, and check the mossy dwarven wall in the main stream tunnel—there's an old stone room the bugbear doesn't know about!"* (Unlocks **Section 6** automatically).
  * **Success at a Cost (Roll 13–14):** Yeemik agrees to hold Sildar unharmed for `25 GP` up front (or until you bring back Klarg's morningstar) and orders his archers to let you pass.
  * **Failure (12 or lower):** Yeemik cackles, shoves Sildar off the 10-foot ledge (Sildar drops to `0 HP` and needs Sister Lyra's *Healing Word* or a `DC 10 Medicine` check within 3 rounds!), and attacks!

### 👹 Combat Encounter (If Parley Fails): Yeemik & Den Guards (300 XP)
* **1× Goblin Boss (`Yeemik`)** — **AC** 17, **HP** 21, **Initiative** +2 (12). **Multiattack:** Two Scimitar attacks (`+4` to hit, `1d6 + 2` Slashing; second attack has Disadvantage). **Reaction — Redirect Attack:** Swaps places with a goblin ally within 5 ft. so the minion takes the hit instead!
* **2× Goblin (`Den Guards`)** — **AC** 15, **HP** 10 each, **Shortbow/Scimitar** `+4` to hit (`1d6 + 2`).

### 💰 Treasure & Intel (Relics / Implements)
* **Sildar's Rescue:** Once healed, Sildar reveals that **Gundren Rockseeker** and the map to **Wave Echo Cave** were taken to **Cragmaw Castle**, and that Klarg keeps a cipher map in his strongbox!
* **Loot (if Yeemik is defeated):** `25 GP`, `60 SP`, and **Sildar's Silver Signet Ring of Neverwinter**.

### 🧭 What do you do?
1. **Visit the secret dwarven shrine across the stream to take a safe Short Rest and claim its relics** $\rightarrow$ **Go to Section 6**.
2. **Cross the high rope bridge over the underground river to confront Klarg in his waterfall sanctum** $\rightarrow$ **Go to Section 7**.

---

## Section 6: The Forgotten Dwarven Shrine (Safe Short Rest)
**Act II — Rest & Relic Node** | **Node ID:** `node_6_secret_provisions_shrine`  
**Lighting:** Dim Light (Phosphorescent Dwarven Runes) | **Terrain:** Secure, Dry Vault

> 📜 **Read Aloud:**
> Pivoting the heavy stone block aside, you step into a dry, octagonal chamber untouched by goblin filth. Pale blue runes glimmer softly along the vaulted ceiling, illuminating a low altar of polished gray granite carved with afaceted mountain gem—the sacred symbol of Dumathoin, Dwarven Keeper of Secrets Under the Mountain. When the stone door clicks shut behind you, even the roar of the underground river fades to a soothing murmur.

### ⛺ Short Rest & Shrine Blessing
* **Take a Short Rest (1 Hour):**
  * Spend **Hit Dice** (`1d10 + CON mod` per die) to restore Hit Points.
  * Sister Lyra offers a prayer of restoration, healing an additional **`1d4 + 3` HP** at no spell slot cost.
* **Inspect the Altar — `Intelligence (Religion or History) DC 12`:**
  * **Success:** You trace the rune of the Silent Keeper in the proper sequence. A hidden drawer slides out from the base of the altar, and warm golden light fills your chest—granting you **Heroic Inspiration** (reroll any d20 roll in Section 7)!

### 💰 Treasure (Relics Theme)
* **`30 GP`** in ancient dwarven electrum-stamped coins.
* **Jade Frog Statuette** with tiny golden ruby eyes (worth `40 GP`).
* **Potion of Healing** (*2024 Bonus Action: restores `2d4 + 2` HP*).
* **Spell Scroll of *Shield of Faith*** (`+2 AC` for 10 minutes).

### 🧭 What do you do?
1. **Step out of the hidden shrine, refreshed and blessed, and ascend into Klarg's waterfall sanctum** $\rightarrow$ **Go to Section 7**.

---

## Section 7: Klarg's Waterfall Sanctum (Act III Boss Climax)
**Act III — The Climax** | **Node ID:** `node_7_klarg_throne_cavern`  
**Lighting:** Dim Light (Roaring Iron Brazier) | **Terrain:** Stacked Crates (Half Cover `+2 AC`), Retaining Pools & Fire Brazier | **Encounter:** High Difficulty (`350 XP`)

> 📜 **Read Aloud:**
> Half of this grand cavern is filled by two deep, stone-walled pools fed by a roaring waterfall that plunges from the ceiling high above. Stacked around the dry eastern floor are dozens of stolen crates and barrels stamped with the blue lion of the Lionshield Coster.
> 
> Looming atop a makeshift throne of wolf pelts and ale casks is a hulking,seven-foot-tall bugbear with thick, brindled fur and mad, bloodshot eyes. He hefted a wickedly spiked morningstar in one hand while his other rests on the collar of a snarling, scar-muzzled wolf. Two goblin archers crouch behind supply crates near the pool's edge.
> 
> *"Who dares creep into the domain of Klarg the Destroyer?!"* the bugbear bellows over the thunder of the falls. *"Ripper! Feast on their bones!"*

### 🎲 Tactical Ambush & Environmental Stunts
* **Opening Stealth — `Dexterity (Stealth) DC 12` (Roll with Advantage due to the roaring waterfall or if entering via the Section 3 Chimney!):**
  * **Success:** You catch Klarg mid-rant! You and Sister Lyra act with **Advantage on Initiative** and gain a free opening strike before the goblins can react.
* **Environmental Hazard — Topple the Roaring Brazier (`Strength [Athletics] DC 14` or *Thunderous Smite*):**
  * Kicking over the iron coal-brazier or shoving an enemy into it deals **`1d10` Fire damage** (2024 Improvised Nuisance Damage) and ignites the spilled lamp oil!

### 👹 Boss Encounter: Klarg the Bugbear Warlord, Ripper & 2 Bodyguards (350 XP)
> **DM Tactical Note:** Klarg commands from the front with his 10-foot-reach Morningstar while **Ripper** flanks for **Pack Tactics**. **Special Weakness:** Klarg loves his wolf; if **Ripper** is reduced to `0 HP`, Klarg cries out in grief and suffers **Disadvantage** on his next attack roll!

#### KLARG THE BUGBEAR WARLORD
*Medium Fey (Goblinoid), Chaotic Evil*
- **Habitat:** Underdark, Dungeon | **Treasure:** Armaments & Implements
- **AC:** 16 (Hide Armor, Shield) | **Initiative:** +2 (12)
- **HP:** 27 (5d8 + 5) | **Speed:** 30 ft.

| Ability | Score | MOD | SAVE | Ability | Score | MOD | SAVE |
| :--- | :---: | :---: | :---: | :--- | :---: | :---: | :---: |
| **STR** | 15 | +2 | +2 | **INT** | 8 | −1 | −1 |
| **DEX** | 14 | +2 | +2 | **WIS** | 11 | +0 | +0 |
| **CON** | 13 | +1 | +1 | **CHA** | 9 | −1 | −1 |

- **Skills:** Stealth +6, Survival +2 | **Senses:** Darkvision 60 ft.; Passive Perception 10
- **CR:** 1 (XP 200; PB +2)
- **Traits:**
  - **Brute & Surprise Attack.** Klarg's melee weapons deal one extra damage die (included below). If he hits a surprised target in Round 1, he deals an extra 7 (`2d6`) damage.
  - **Long-Limbed.** Klarg has a melee reach of 10 feet on his turn.
- **Actions:**
  - **Morningstar.** *Melee Attack Roll:* +4, reach 10 ft. *Hit:* 11 (2d8 + 2) Piercing damage.
  - **Javelin.** *Melee or Ranged Attack Roll:* +4, reach 10 ft. or range 30/120 ft. *Hit:* 9 (2d6 + 2) Piercing damage.

#### RIPPER (KLARG'S WOLF) & 2 CRAGMAW BODYGUARDS
- **Ripper (Wolf, CR 1/4 — 50 XP):** **AC** 13 | **HP** 11 | **Speed** 40 ft. | **Bite:** `+4` to hit, `7 (2d4 + 2)` Piercing + automatic **Prone** on Medium or smaller targets.
- **Cragmaw Bodyguards (2× Goblin, CR 1/4 — 50 XP each):** **AC** 15 | **HP** 10 each | **Shortbow/Scimitar:** `+4` to hit, `5 (1d6 + 2)` Piercing/Slashing | **Bonus Action:** *Nimble Escape*.

### 💰 Act III Boss Treasure Hoard (Armaments & Implements)
Hidden behind Klarg's throne under a pile of grain sacks is an ironbound chest (unlocked with the iron key on Klarg's belt) containing:
* **Coins:** `600 CP`, `110 SP`, and `50 GP`.
* **Magic Weapon (Uncommon Armament):** ***+1 Longsword ("Talon")*** — A finely balanced blade with a silver hilt sculpted in the likeness of a hawk with spread wings (`+1` to attack and damage rolls; once belonged to the knight Aldith Tresendar).
* **Potions:** **2× Potions of Healing** (`2d4 + 2` HP as a Bonus Action).
* **Quest Item:** **The Cragmaw Castle Cipher Map** — A charcoal-drawn hide map showing the secret forest trail to King Grol's fortress where Gundren Rockseeker is held!
* **Trade Cargo:** **Lionshield Coster Stolen Crates** (worth a `50 GP` bounty upon return to Phandalin).

### 🧭 What do you do?
1. **Load the recovered provisions and Klarg's treasure onto your wagon and ride into Phandalin** $\rightarrow$ **Go to Section 8**.

---

## Section 8: Triumph in Phandalin (Act IV Resolution & Level Up)
**Act IV — Resolution & Rewards** | **Node ID:** `node_8_phandalin_victory`

> 📜 **Read Aloud:**
> As dusk settles over the foothills of the Sword Mountains, your heavily laden wagon rolls down the rutted main street of Phandalin. Warm golden light spills from the windows of the Stonehill Inn.
> 
> Word of your victory over the Cragmaw raiders spreads through the frontier town like wildfire. Elmar Barthen and Linene Graywind of the Lionshield Coster gladly count out sacks of gleaming gold coin into your palm, while a recovered Sildar Hallwinter clasps your forearm in a soldier's salute.
> 
> *"You saved my life in that dark cave, my friend,"* Sildar says solemnly as you unroll Klarg's captured hide map across the tavern table. *"Rest tonight and sharpen your new blade. Tomorrow, we hunt down the Redbrands—and march on Cragmaw Castle to bring Gundren home!"*

### 🏆 Adventure Rewards & Character Progression
* **XP / Milestone Awarded:** `+600 XP` $\rightarrow$ **Advance to Character Level 3!**
  * Increase Max HP (`+1d10 + CON mod`), unlock **3rd-Level Sacred Oath / Subclass features**, and gain an additional **1st-Level Spell Slot**!
* **Gold Earned:** `+150 GP` total contract rewards (`50 GP` from Barthen + `50 GP` from Lionshield Coster + `50 GP` from Sildar Hallwinter).
* **Next Adventure Seed:** *Act II of the Campaign — The Redbrand Hideout & The Siege of Cragmaw Castle*.
