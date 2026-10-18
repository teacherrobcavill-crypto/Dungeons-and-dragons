# 🐉 Dungeons & Dragons Adventure Authoring & Engine Framework
### Unified 5e System: PHB (2014) • DMG (2024) • Monster Manual (2014 & 2024)

This framework synthesizes the four core D&D sources into a cohesive, modular system designed for **writing, validating, and playing interactive Dungeons & Dragons adventures**:

1. **[Player's Handbook (2014)](https://www.dndbeyond.com/sources/dnd/phb-2014)** → [`rules/phb_2014_mechanics.md`](file:///Volumes/TOSHIBA%20EXT/Antigravity%20Work/dnd-framework/rules/phb_2014_mechanics.md)
   * Core d20 resolution, the 6 Ability Scores, Proficiency Bonus, Advantage/Disadvantage, the 18 Skills, 9 Classic Races, 12 Classes, Equipment/AC/Weapons, Action Economy (Action, Bonus Action, Reaction, Movement), Cover, Death Saving Throws, Short/Long Rests, Spellcasting, and all 15 Conditions.
2. **[Dungeon Master's Guide (2024)](https://www.dndbeyond.com/sources/dnd/dmg-2024)** → [`rules/dmg_2024_guide.md`](file:///Volumes/TOSHIBA%20EXT/Antigravity%20Work/dnd-framework/rules/dmg_2024_guide.md)
   * Running the Game (DC benchmarks, Consequences, Improvised Damage, Social Interaction Attitudes & Influence checks, Exploration, Chases), DM's Toolbox (Doors, Traps, Hazards, Curses, Contagions, Poisons, Mob Combat), **Creating Adventures** (Four-Act Structure, **2024 Low/Moderate/High XP Encounter Budgets**), Campaign Lore & Great Wheel Cosmology, **2024 Treasure Themes** (*Arcana, Armaments, Implements, Relics*), and **Bastions**.
3. **[Monster Manual (2014)](https://www.dndbeyond.com/sources/dnd/mm-2014) & [Monster Manual (2024)](https://www.dndbeyond.com/sources/dnd/mm-2024)** → [`rules/mm_2014_2024_bestiary_guide.md`](file:///Volumes/TOSHIBA%20EXT/Antigravity%20Work/dnd-framework/rules/mm_2014_2024_bestiary_guide.md)
   * 2014 Monster Ecology, Lore, and Classic Archetypes fused with the **2024 "How to Use a Monster"** stat block architecture: explicit **Initiative** (`+Mod` and flat `10 + Mod`), side-by-side Ability Modifiers & Saving Throws, Habitat & Treasure Theme tags, streamlined `Melee/Ranged Attack Roll` riders, At-Will/X-per-Day Spellcasting, dedicated **Bonus Actions** & **Reactions**, and Boss Lair/Legendary mechanics.

---

## 📁 Directory Architecture

```text
dnd-framework/
├── README.md                              # Framework overview & adventure authoring workflow
├── rules/
│   ├── phb_2014_mechanics.md              # Player's Handbook (2014) core rules, classes, combat & spells
│   ├── dmg_2024_guide.md                  # Dungeon Master's Guide (2024) lore, toolbox, XP budgets & treasure
│   └── mm_2014_2024_bestiary_guide.md     # Monster Manual (2014/2024) stat block rules, tactics & CR scaling
├── data/
│   ├── rules_engine.json                  # Machine-readable lookup tables (XP budgets, DCs, skills, conditions, classes)
│   └── monster_manual.json                # Ready-to-run Bestiary in 2024 Stat Block JSON schema + 2014 lore
└── templates/
    ├── dnd_character_sheet.json           # Live character/party state sheet (stats, saves, skills, slots, inventory)
    ├── dnd_story_graph.json               # Node-based adventure graph schema with DCs, encounters & validation
    └── dnd_adventure_template.md          # Authoring template for numbered/scene-based D&D adventures
```

---

## ⚖️ How the 2014 + 2024 Hybrid Framework Works

| Pillar | Source Used | Why It Shines for Adventure Authoring |
| :--- | :--- | :--- |
| **Character & Combat Core** | **PHB (2014)** | Classic 5e races, 12 classes, 18 skills, d20 Advantage/Disadvantage, Concentration, and Death Saves that every player knows by heart. |
| **Adventure & Encounter Design** | **DMG (2024)** | Replaces clunky 2014 encounter multipliers with clean **Low / Moderate / High XP Budgets**, adds structured **Social Attitude/Influence** rules, **4 Treasure Themes**, and **Bastions**. |
| **Monster Lore & Ecology** | **MM (2014)** | Deep atmospheric lore, lair descriptions, and ecological habits for classic D&D monsters (Goblins, Owlbears, Mind Flayers, Beholders, Dragons, Liches). |
| **Monster Stat Blocks & Running Foes** | **MM (2024)** | Faster, deadlier, and cleaner stat blocks: pre-calculated **Initiative**, streamlined **Spellcasting**, dedicated **Bonus Actions/Reactions**, and automatic on-hit riders. |

---

## 🗺️ Next Stage: The 4-Step Adventure Writing Pipeline

When you are ready to write an adventure, we follow this structured workflow:

1. **Step 1 — Adventure Premise & Level Tier (`DMG 2024 Ch. 4–5`)**
   * Choose Party/Hero Level (e.g., Level 1–3), Campaign Flavor (*Heroic Fantasy, Sword & Sorcery, Dark Fantasy, Mystery*), Patron, Setting, and Primary Villain.
2. **Step 2 — Architect the Adventure Graph (`templates/dnd_story_graph.json`)**
   * Map out the Four-Act structure (Hook $\rightarrow$ Exploration/Dungeon Chambers $\rightarrow$ Climax $\rightarrow$ Resolution).
   * Assign **Ability/Skill Checks** (`DC 10 / 15 / 20`), **Social Encounters** (*Friendly / Indifferent / Hostile*), **Traps/Hazards**, **Short/Long Rest nodes**, and **Combat Encounters** balanced against the 2024 XP Budget table.
   * Validate graph integrity (no orphan nodes, guaranteed path to key items/clues, balanced rest spacing).
3. **Step 3 — Write the Adventure Manuscript (`templates/dnd_adventure_template.md`)**
   * Write atmospheric **Read-Aloud Boxed Text** for players, DM tactical notes, secret door/investigation triggers, inline **2024 Monster Stat Blocks**, and **Treasure Hoards**.
4. **Step 4 — Interactive Playthrough & Voice Narration**
   * Track character HP, Spell Slots, Conditions, Hit Dice, and Inventory in `dnd_character_sheet.json` while rolling d20 checks, saving throws, initiative, and combat rounds interactively.
