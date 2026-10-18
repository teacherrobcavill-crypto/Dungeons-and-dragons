# 👹 Monster Manual (2014 & 2024) — Bestiary & How to Use a Monster
**Source References:**
* **Monster Manual (2014):** `https://www.dndbeyond.com/sources/dnd/mm-2014` *(Classic Ecology, Lore & Bestiary)*
* **Monster Manual (2024):** `https://www.dndbeyond.com/sources/dnd/mm-2024` *("How to Use a Monster" & Modern Stat Block Engine)*

This guide merges the atmospheric lore and creature ecologies of the **2014 Monster Manual** with the streamlined, high-action stat block architecture and combat rules of the **2024 Monster Manual**.

---

## 1. How to Use a Monster: The 2024 Stat Block Anatomy

The **2024 Monster Manual** redesigned monster stat blocks so that a DM or automated engine can run any creature at a glance without flipping through spellbooks or calculating hidden modifiers.

### Standard 2024 Monster Stat Block Template

```markdown
### MONSTER NAME
*Size Creature Type (Subtype), Alignment*
- **Habitat:** Dungeon, Underdark, Forest, etc. | **Treasure:** Armaments / Arcana / Implements / Relics / None
- **AC:** 15 (Natural Armor) | **Initiative:** +3 (13)
- **HP:** 52 (8d8 + 16) | **Speed:** 30 ft., Climb 30 ft.

| Ability | Score | MOD | SAVE | Ability | Score | MOD | SAVE |
| :--- | :---: | :---: | :---: | :--- | :---: | :---: | :---: |
| **STR** | 16 | +3 | +3 | **INT** | 10 | +0 | +0 |
| **DEX** | 16 | +3 | +5 | **WIS** | 12 | +1 | +3 |
| **CON** | 14 | +2 | +2 | **CHA** | 8 | −1 | −1 |

- **Skills:** Perception +3, Stealth +5
- **Resistances:** Necrotic | **Immunities:** Poison; Exhaustion, Poisoned
- **Gear:** Longsword, Shortbow
- **Senses:** Darkvision 60 ft.; Passive Perception 13
- **Languages:** Common, Goblin
- **CR:** 2 (XP 450; PB +2)

#### Traits
* **Pack Tactics.** The monster has Advantage on an attack roll against a creature if at least one of the monster's allies is within 5 feet of the creature and the ally isn't Incapacitated.

#### Actions
* **Multiattack.** The monster makes two attacks, using Scimitar or Shortbow in any combination.
* **Scimitar.** *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage, plus 3 (1d6) Poison damage.
* **Spellcasting.** The monster casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):
  * **At Will:** *Guidance, Thaumaturgy*
  * **1/Day Each:** *Command, Hold Person*

#### Bonus Actions
* **Nimble Escape.** The monster takes the Disengage or Hide action.

#### Reactions
* **Parry.** *Trigger:* The monster is hit by a melee attack roll while holding a weapon. *Response:* The monster adds 2 to its AC against that attack, possibly causing it to miss.
```

---

## 2. Key 2024 Monster Mechanics & Rules Upgrades

### 1. Pre-Calculated Initiative (`+Mod (Static)`)
Every 2024 stat block lists both an **Initiative Modifier** and a **Static Initiative Score** in parentheses ($10 + \text{DEX Mod} + \text{Initiative Proficiency}$):
* **Rolling Mode:** Roll $\text{1d20} + \text{Initiative Modifier}$.
* **Fast Table Mode:** Use the static number in parentheses immediately so combat starts in zero seconds.
* **Boss Initiative Boost:** High-CR bosses and ambush predators in the 2024 MM gain **Proficiency or Expertise in Initiative**, ensuring bosses act early in Round 1 rather than getting burst down before taking a turn!

### 2. Side-by-Side Ability Modifiers (`MOD`) & Saving Throws (`SAVE`)
Instead of hunting for a separate "Saving Throws" line, the 6-ability table explicitly displays both the raw **MOD** (used for Ability Checks) and the **SAVE** (which already includes Proficiency Bonus if the monster is proficient in that save).

### 3. Streamlined On-Hit Rider Effects
In the 2014 MM, a Wolf bite or Ghoul claw required an attack roll *followed* by a separate STR or CON saving throw on every single hit, slowing down turns.
* **2024 Design:** Many signature monster attacks apply their tactical rider **automatically on a hit** (e.g., a Wolf's bite automatically knocks a Medium or smaller target **Prone** on hit; a Giant Octopus or Roper automatically **Grapples** on hit), while debilitating crowd-control conditions (*Paralyzed, Stunned, Petrified*) still allow a saving throw (` Constitution Saving Throw: DC X`).

### 4. Slotless Monster Spellcasting (`At Will` & `X/Day`)
Monsters no longer track 1st- through 9th-level spell slots. Instead:
* Damaging multi-target or signature blasts are built directly into **Actions** (e.g., *Arcane Burst*: Melee or Ranged Attack Roll dealing Force/Elemental damage).
* Utility and control spells are listed under **Spellcasting** as **At Will** or **1/Day, 2/Day, 3/Day Each**, with the exact **Spell Save DC** pre-calculated.

### 5. Limited Usage & Recharge (`Recharge X–6`)
* **X/Day:** Resets when the monster finishes a Long Rest.
* **Recharge X–6 (e.g., Dragon Breath `Recharge 5–6`):** Once used, at the **start of each of the monster's turns**, roll **1d6**. If the result is within the recharge range (e.g., 5 or 6), the ability is immediately ready to use again on that turn!

### 6. Legendary Resistance, Legendary Actions & Lair Effects
Solo Boss monsters (e.g., Dragons, Liches, Beholders, Vampire Lords, Lantern Kings) use three mechanics to challenge an entire party alone:
* **Legendary Resistance (3/Day, or 4/Day in Lair):** If the monster fails a saving throw, it can choose to **succeed instead**.
* **Legendary Actions (3 per Round; 4 in Lair):** Taken immediately **after another creature's turn ends**. Spent points refresh at the start of the boss's turn.
* **Lair Bonuses (2024 Integration):** Fighting a boss inside its sanctum boosts its **XP Value**, grants **+1 Legendary Resistance & +1 Legendary Action**, or triggers environmental **Lair Effects on Initiative Count 20** (losing ties).

---

## 3. The 14 Creature Types & Ecology (MM 2014 + 2024)

| Creature Type | Nature, Lore & Adventure Role | Classic Examples |
| :--- | :--- | :--- |
| **Aberration** |Utterly alien beings from the Far Realm or Deep Underdark with psionic minds and tentacled or geometric anatomy. | *Beholder, Mind Flayer (Illithid), Aboleth, Spectator, Chuul, Gibbering Mouther* |
| **Beast** | Natural animals, giant arachnids, and prehistoric predators; governed by instinct and territory *(affected by Animal Handling & Druid Wild Shape)*. | *Wolf, Dire Wolf, Giant Spider, Brown Bear, Giant Rat, Stirge, Swarm of Bats* |
| **Celestial** | Beings of the Upper Planes, radiant servants of deities; embody law, good, or divine wrath. | *Deva, Pegasus, Unicorn, Couatl, Planetar, Solar* |
| **Construct** | Manufactured automatons, animated objects, and golems bound by arcane runes; immune to poison, psychic, and exhaustion. | *Animated Armor, Flying Sword, Gargoyle, Helmed Horror, Flesh/Stone/Iron Golem* |
| **Dragon** | Ancient winged reptiles of immense power; **Chromatic** (*Red, Blue, Green, Black, White* — greedy & tyrannical) and **Metallic** (*Gold, Silver, Bronze, Brass, Copper* — noble & wise). | *Kobold (Draconic), Wyvern, Young/Adult/Ancient Red Dragon, Shadow Dragon* |
| **Elemental** | Living embodiments of Air, Earth, Fire, or Water summoned from the Inner Planes. | *Mephits (Magma, Ice, Steam), Air/Earth/Fire/Water Elemental, Salamander, Invisible Stalker* |
| **Fey** | Creatures of twilight magic tied to the Feywild; tricksters, hags, and nature spirits. | *Goblin (2024 Fey ancestry), Bugbear, Dryad, Pixie, Green Hag, Satyr, Displacer Beast* |
| **Fiend** | Wicked denizens of the Lower Planes: **Devils** (Lawful Evil schemers of the Nine Hells), **Demons** (Chaotic Evil destroyers of the Abyss), and **Yugoloths**. | *Imp, Quasit, Hell Hound, Incubus/Succubus, Barbed Devil, Balor, Pit Fiend* |
| **Giant** | Towering humanoids ordered by the ancient *Ordning* caste system. | *Ogre, Troll, Hill Giant, Stone Giant, Frost Giant, Fire Giant, Cloud/Storm Giant* |
| **Humanoid** | Mortal peoples of the Material Plane (bandits, cultists, knights, archmages, drow, orcs). | *Bandit, Cultist, Guard, Scout, Thug, Cult Fanatic, Veteran, Mage, Archmage* |
| **Monstrosity** | Unnatural hybrids, cursed beings, and arcane experiments that defy natural ecology. | *Owlbear, Mimic, Rust Monster, Harpy, Basilisk, Medusa, Minotaur, Chimera, Purple Worm* |
| **Ooze** | Mindless, amorphous protoplasmic scavengers that dissolve flesh, bone, and metal in dungeon corridors. | *Gelatinous Cube, Gray Ooze, Ochre Jelly, Black Pudding* |
| **Plant** | Ambulatory flora and fungal horrors (distinct from ordinary non-creature plants). | *Violet Fungus, Shrieker, Gas Spore, Awakened Tree, Shambling Mound, Myconid, Treant* |
| **Undead** | Once-living creatures animated by necromancy, curses, or unquiet grief; vulnerable to Cleric *Turn Undead* and Paladin *Divine Smite*. | *Skeleton, Zombie, Ghoul, Ghast, Shadow, Specter, Wight, Wraith, Ghost, Mummy, Vampire, Lich* |

---

## 4. Monster Tactical Roles in Encounter Design

When stocking a dungeon chamber in `dnd_story_graph.json`, combine monster roles for memorable tactical combat:

1. **Minions & Swarms (Low HP, Pack Pressure):** *Kobolds, Goblins, Skeletons, Giant Rats.* Use *Pack Tactics* or *Nimble Escape* to flank heroes and threaten backline spellcasters.
2. **Brutes & Frontliners (High HP, Heavy Melee):** *Zombies, Orcs, Ogres, Owlbears, Trolls.* Block doorways, grapple heroes, and soak damage while artillery fires from behind.
3. **Skirmishers & Ambushers (Stealth + High Mobility):** *Bugbears, Displacer Beasts, Phase Spiders, Shadows.* Open from stealth for surprise/ambush damage, hit-and-run with Bonus Actions.
4. **Artillery & Spellcasters (Ranged Threat & Control):** *Goblin Boss archers, Cult Fanatics, Mages, Mind Flayers.* Stay behind Half or Three-Quarters Cover (`+2` or `+5` AC), cast *Hold Person*, *Web*, or ranged blasts.
5. **Dungeon Traps-in-Disguise (Exploration Monsters):** *Mimics, Gelatinous Cubes, Gargoyles, Animated Armor, Roper.* Punish careless exploration when players touch chests or charge down suspiciously clean hallways.
6. **Solo Bosses (Multi-Phase Climax Threats):** *Young Dragons, Beholders, Wraiths, Liches, Custom Warlords.* Command the room with *Multiattack*, *Recharge* AoEs, *Legendary Actions*, and destructible environmental hazards.

---

## 5. Custom Monster Creation & CR Scaling Table (DMG/MM Reference)

Use this table whenever creating a **custom monster or boss** for a new adventure:

| Challenge Rating (CR) | Proficiency Bonus (PB) | Target AC | Hit Points Range | Attack Bonus | Damage / Round | Save DC | XP Value |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | +2 | 10–12 | 1–6 | +2 | 1–2 | 10 | 10 |
| **1/8** | +2 | 12–13 | 7–15 | +3 | 3–5 | 10 | 25 |
| **1/4** | +2 | 12–13 | 16–24 | +3 | 5–8 | 11 | 50 |
| **1/2** | +2 | 13–14 | 25–35 | +4 | 8–12 | 11 | 100 |
| **1** | +2 | 13–14 | 36–50 | +4 | 10–15 | 12 | 200 |
| **2** | +2 | 13–15 | 51–70 | +5 | 15–20 | 13 | 450 |
| **3** | +2 | 14–15 | 71–90 | +5 | 21–26 | 13 | 700 |
| **4** | +2 | 14–15 | 91–110 | +6 | 27–32 | 14 | 1,100 |
| **5** | +3 | 15–16 | 111–135 | +6 | 33–38 | 15 | 1,800 |
| **6** | +3 | 15–16 | 136–155 | +7 | 39–44 | 15 | 2,300 |
| **7** | +3 | 15–16 | 156–175 | +7 | 45–50 | 15 | 2,900 |
| **8** | +3 | 16–17 | 176–195 | +8 | 51–56 | 16 | 3,900 |
| **10** | +4 | 17–18 | 210–240 | +9 | 63–68 | 17 | 5,900 |
| **13** | +5 | 18 | 250–290 | +10 | 81–86 | 18 | 10,000 |
| **17** | +6 | 19 | 310–355 | +11 | 105–110 | 19 | 18,000 |
| **21** | +7 | 19–20 | 400–450 | +12 | 140–155 | 20 | 33,000 |
