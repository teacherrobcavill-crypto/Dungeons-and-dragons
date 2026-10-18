# 📖 Player's Handbook (2014) — Core Mechanics & Player Rules
**Source Reference:** `https://www.dndbeyond.com/sources/dnd/phb-2014`

This document distills the mechanical engine of the **2014 Player's Handbook (5th Edition)** into a structured reference for designing challenges, resolving player actions, and tracking character capabilities in adventures.

---

## 1. The Core Mechanic (Introduction & Chapter 7)

Almost every uncertain action in Dungeons & Dragons is resolved with the **d20 Test**:

$$\text{Total Roll} = \text{1d20} + \text{Ability Modifier} + \text{Proficiency Bonus (if proficient)} + \text{Situational Modifiers}$$

1. **Roll a d20.**
2. **Add Modifiers:** Apply the relevant **Ability Modifier** and, if the character is proficient in the skill, saving throw, tool, or weapon, add their **Proficiency Bonus (PB)**.
3. **Compare to Target Number:**
   * **Ability Check / Saving Throw:** Meet or exceed the **Difficulty Class (DC)**.
   * **Attack Roll:** Meet or exceed the target's **Armor Class (AC)**.

### Advantage & Disadvantage
* **Advantage:** Roll **2d20** and use the **higher** result.
* **Disadvantage:** Roll **2d20** and use the **lower** result.
* **Cancellation Rule:** If *any* number of Advantage sources and *any* number of Disadvantage sources apply to the same roll, they completely cancel out (roll a single 1d20), regardless of how many of each exist.
* **Passive Effect:** Advantage grants **+5** to Passive Checks; Disadvantage imposes **−5**.

### Proficiency Bonus by Character Level
A character's Proficiency Bonus scales strictly by total character level:

| Character Level | Proficiency Bonus (PB) | Tier of Play |
| :---: | :---: | :--- |
| **1–4** | **+2** | Tier 1: Local Heroes |
| **5–8** | **+3** | Tier 2: Heroes of the Realm |
| **9–12** | **+4** | Tier 2 / Tier 3: Masters of the Realm |
| **13–16** | **+5** | Tier 3: Masters of the World |
| **17–20** | **+6** | Tier 4: Masters of the Multiverse |

* **Expertise (Bards/Rogues):** Doubles the Proficiency Bonus ($\text{PB} \times 2$) for chosen skills or thieves' tools.

---

## 2. The Six Ability Scores & 18 Skills (Chapter 7)

### Ability Score & Modifier Formula
$$\text{Ability Modifier} = \left\lfloor \frac{\text{Ability Score} - 10}{2} \right\rfloor$$

| Score | Modifier | Score | Modifier | Score | Modifier |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | −5 | **10–11** | +0 | **20–21** | +5 |
| **2–3** | −4 | **12–13** | +1 | **22–23** | +6 |
| **4–5** | −3 | **14–15** | +2 | **24–25** | +7 |
| **6–7** | −2 | **16–17** | +3 | **26–27** | +8 |
| **8–9** | −1 | **18–19** | +4 | **28–29** | +9 |
| | | | | **30** | +10 |

### Ability Score Breakdown & Associated Skills

| Ability | What It Measures | Associated Skills | Saving Throw Resists... |
| :--- | :--- | :--- | :--- |
| **Strength (STR)** | Physical power, bodily athletic force, carrying capacity | • **Athletics** (climbing, jumping, swimming, grappling/shoving) | Being pushed, knocked prone, bound, or crushed by physical force |
| **Dexterity (DEX)** | Agility, reflexes, balance, hand-eye coordination, initiative | • **Acrobatics** (balance, tumbling, escaping grapples)<br>• **Sleight of Hand** (pickpocketing, concealing objects)<br>• **Stealth** (hiding, moving silently) | Dodging areas of effect (*Fireball*, dragon breath, lightning traps, pit traps) |
| **Constitution (CON)** | Health, stamina, vital force, concentration | *(No skills — governs HP, Hit Dice, and Concentration)* | Poison, disease, necrosis, extreme cold/heat, petrification, maintaining spell Concentration |
| **Intelligence (INT)** | Mental acuity, memory, analytical reasoning, arcane recall | • **Arcana** (spells, magic items, planes, eldritch symbols)<br>• **History** (historical events, ancient kingdoms, wars)<br>• **Investigation** (deducing clues, finding hidden traps/mechanisms)<br>• **Nature** (terrain, flora, fauna, weather)<br>• **Religion** (deities, rites, undead lore, cults) | Psychic assaults (*Mind Blast*), illusions (*Phantasmal Force*), mental maze effects |
| **Wisdom (WIS)** | Perceptiveness, intuition, willpower, attunement to environment | • **Animal Handling** (calming mounts, intuiting beast intent)<br>• **Insight** (reading body language, detecting lies/motives)<br>• **Medicine** (stabilizing the dying, diagnosing poison/wounds)<br>• **Perception** (spotting/hearing hidden threats)<br>• **Survival** (tracking, foraging, navigating wilderness) | Charm (*Charm Person*, *Dominate*), fear (*Frightful Presence*), scrying, polymorph |
| **Charisma (CHA)** | Force of personality, eloquence, leadership, innate magical presence | • **Deception** (lying, disguises, fast-talking)<br>• **Intimidation** (coercion, threats, breaking morale)<br>• **Performance** (music, storytelling, acting)<br>• **Persuasion** (diplomacy, negotiation, inspiring goodwill) | Banishment, planar binding, possession (ghosts), zone of truth |

### Passive Checks
Used when a character is not actively rolling or when the DM secretly tests awareness against a hidden threat (such as a monster's Stealth roll or a secret door):

$$\text{Passive Score} = 10 + \text{Skill Modifier} + (\text{+5 if Advantage, −5 if Disadvantage})$$

### Contests (Opposed Checks)
When two creatures directly oppose each other (e.g., *Monster Stealth* vs. *Player Perception*, or *Grapple*: Attacker's *Athletics* vs. Target's *Athletics* or *Acrobatics*):
* Both roll the relevant check. Higher total wins.
* If tied, the situation remains **unchanged** (e.g., the grapple fails to take hold, or the hidden creature stays hidden).

---

## 3. Character Creation: Races, Classes & Backgrounds (Chapters 1–6)

### Standard Ability Score Generation Methods
1. **Standard Array:** `15, 14, 13, 12, 10, 8`
2. **4d6 Drop Lowest:** Roll 4d6, sum the highest 3 dice, repeat 6 times.
3. **27-Point Buy:** Start all scores at 8; spend 27 points to raise scores up to 15 before racial modifiers.

### The 9 Classic PHB Races (Chapter 2)

| Race | Speed | Size | Key Racial Traits & Adventure Hooks |
| :--- | :---: | :---: | :--- |
| **Dwarf** (*Hill / Mountain*) | 25 ft. | Medium | Darkvision (60 ft.), **Dwarven Resilience** (Advantage on saves vs. poison, Resistance to poison damage), **Stonecunning** (double PB on History checks related to stonework). |
| **Elf** (*High / Wood / Drow*) | 30 ft. | Medium | Darkvision (60 ft.; Drow 120 ft.), **Keen Senses** (Perception proficiency), **Fey Ancestry** (Advantage on saves vs. Charmed; magic cannot put you to sleep), **Trance** (4-hour meditation = Long Rest). |
| **Halfling** (*Lightfoot / Stout*) | 25 ft. | Small | **Lucky** (reroll natural 1s on d20 attack, check, or save), **Brave** (Advantage vs. Frightened), **Halfling Nimbleness** (move through spaces of Medium+ creatures). |
| **Human** (*Standard / Variant*) | 30 ft. | Medium | Adaptable (+1 to all 6 abilities, or Variant: +1 to two abilities, 1 Skill proficiency, and 1 **Feat** at Level 1). |
| **Dragonborn** | 30 ft. | Medium | **Draconic Ancestry** (Elemental Breath Weapon [2d6 scaling to 5d6, DEX or CON save] + Damage Resistance to matching element). |
| **Gnome** (*Forest / Rock*) | 25 ft. | Small | Darkvision (60 ft.), **Gnome Cunning** (Advantage on all INT, WIS, and CHA saving throws against magic). |
| **Half-Elf** | 30 ft. | Medium | Darkvision (60 ft.), **Fey Ancestry**, **Skill Versatility** (proficiency in any 2 skills). |
| **Half-Orc** | 30 ft. | Medium | Darkvision (60 ft.), **Menacing** (Intimidation proficiency), **Relentless Endurance** (1/Long Rest: drop to 1 HP instead of 0 HP), **Savage Attacks** (+1 weapon damage die on critical hits). |
| **Tiefling** | 30 ft. | Medium | Darkvision (60 ft.), **Hellish Resistance** (Fire damage resistance), **Infernal Legacy** (*Thaumaturgy*, *Hellish Rebuke*, *Darkness*). |

### The 12 Core Classes (Chapter 3)

| Class | Hit Die | Primary Ability | Saving Throws | Core Adventure & Combat Identity |
| :--- | :---: | :--- | :--- | :--- |
| **Barbarian** | d12 | STR | STR, CON | **Rage** (Bonus Action: Advantage on STR checks/saves, +2/+3/+4 melee damage, Resistance to Bludgeoning/Piercing/Slashing), **Unarmored Defense** ($10 + \text{DEX} + \text{CON}$), **Reckless Attack**. |
| **Bard** | d8 | CHA | DEX, CHA | Full Spellcaster (CHA), **Bardic Inspiration** (Bonus Action d6→d12 die to ally), **Jack of All Trades** ($+\lfloor\text{PB}/2\rfloor$ to non-proficient checks), **Expertise**. |
| **Cleric** | d8 | WIS | WIS, CHA | Prepared Divine Spellcaster (WIS), **Divine Domain**, **Channel Divinity** (*Turn Undead*: WIS save or undead flee for 1 min; CR $\le 1/2$ destroyed at L5+). |
| **Druid** | d8 | WIS | INT, WIS | Prepared Primal Spellcaster (WIS), **Druidic**, **Wild Shape** (transform into Beasts for scouting or tanking HP pools). |
| **Fighter** | d10 | STR or DEX | STR, CON | **Fighting Style**, **Second Wind** (Bonus Action heal $1\text{d}10 + \text{Level}$), **Action Surge** (1/Short Rest: take an entire extra Action!), up to 4 attacks per Action. |
| **Monk** | d8 | DEX & WIS | STR, DEX | **Unarmored Defense** ($10 + \text{DEX} + \text{WIS}$), **Martial Arts**, **Ki Points** (1/Short Rest: *Flurry of Blows*, *Patient Defense*, *Step of the Wind*, *Stunning Strike* [CON save or Stunned]). |
| **Paladin** | d10 | STR & CHA | WIS, CHA | **Divine Sense**, **Lay on Hands** ($\text{Level} \times 5$ HP healing pool; cure disease/poison for 5 HP), **Divine Smite** (expend spell slot on hit for $+2\text{d}8$ to $5\text{d}8$ Radiant damage, $+1\text{d}8$ vs. Undead/Fiends), **Aura of Protection** (L6: $+\text{CHA}$ to all saves within 10 ft.). |
| **Ranger** | d10 | DEX & WIS | STR, DEX | **Favored Enemy**, **Natural Explorer** (cannot become lost, alert while foraging/tracking), Half-Caster (WIS) with *Hunter's Mark* ($+1\text{d}6$ damage per hit). |
| **Rogue** | d8 | DEX | DEX, INT | **Expertise**, **Sneak Attack** ($1\text{d}6$ to $10\text{d}6$ extra damage 1/turn with Finesse/Ranged weapon if Advantage or ally within 5 ft. of target), **Cunning Action** (L2 Bonus Action: Dash, Disengage, or Hide), **Uncanny Dodge** (L5), **Evasion** (L7). |
| **Sorcerer** | d6 | CHA | CON, CHA | Innate Arcane Caster (CHA), **Sorcery Points** & **Metamagic** (*Twinned Spell*, *Quickened Spell*, *Subtle Spell*, *Careful Spell*). |
| **Warlock** | d8 | CHA | WIS, CHA | **Otherworldly Patron**, **Pact Magic** (fewer spell slots, always cast at highest level, recharge on **Short Rest**!), *Eldritch Blast* ($1\text{d}10$ Force) + **Eldritch Invocations** (*Agonizing Blast*, *Devil's Sight*). |
| **Wizard** | d6 | INT | INT, WIS | Spellbook Arcane Caster (INT), largest spell list, **Ritual Casting** (cast ritual spells from spellbook without expending a slot by adding 10 minutes), **Arcane Recovery** (regain slots on Short Rest). |

---

## 4. Equipment, Armor Class & Weapons (Chapter 5)

### Armor Class (AC) Formulas
* **Unarmored:** $\text{AC} = 10 + \text{DEX Mod}$
* **Light Armor:**
  * *Padded / Leather:* $11 + \text{DEX Mod}$
  * *Studded Leather:* $12 + \text{DEX Mod}$
* **Medium Armor (Max $+\text{2 DEX Mod}$):**
  * *Hide:* $12 + \text{DEX}$ | *Chain Shirt:* $13 + \text{DEX}$ | *Scale Mail / Breastplate:* $14 + \text{DEX}$ | *Half Plate:* $15 + \text{DEX}$
* **Heavy Armor (No DEX Mod; requires STR 13–15 for full speed):**
  * *Ring Mail:* $14$ | *Chain Mail:* $16$ | *Splint:* $17$ | *Plate:* $18$
* **Shield:** **$+2\text{ AC}$** (wielded in one hand).

### Key Weapon Properties & Damage
* **Attack Roll:**
  * **Melee Weapon:** $\text{1d20} + \text{STR Mod} + \text{PB}$ *(or $\text{DEX Mod}$ if weapon has **Finesse**: Dagger `1d4`, Shortsword `1d6`, Scimitar `1d6`, Rapier `1d8`, Whip `1d4`)*.
  * **Ranged Weapon:** $\text{1d20} + \text{DEX Mod} + \text{PB}$ *(Shortbow `1d6`, Light Crossbow `1d8`, Longbow `1d8`, Heavy Crossbow `1d10`)*.
* **Damage Roll:** $\text{Weapon Die} + \text{Same Ability Modifier used for the Attack Roll}$.
* **Versatile Weapons:** Longsword (`1d8` one-handed / `1d10` two-handed), Battleaxe (`1d8`/`1d10`), Warhammer (`1d8`/`1d10`), Quarterstaff (`1d6`/`1d8`), Spear (`1d6`/`1d8`).
* **Two-Handed Heavy Weapons:** Greatsword (`2d6`), Maul (`2d6`), Greataxe (`1d12`), Halberd/Glaive (`1d10`, Reach 10 ft.).
* **Two-Weapon Fighting:** When attacking with a **Light** melee weapon in one hand, you can use a **Bonus Action** to attack with a different Light melee weapon in the other hand (do not add positive Ability Mod to the off-hand damage unless you have the *Two-Weapon Fighting* style).

---

## 5. Adventuring & Resting (Chapter 8)

### Time & Movement Scales
* **Combat Round:** **6 seconds** (10 rounds = 1 minute).
* **Dungeon Exploration Turn:** **10 minutes** (searching a room, picking locks, casting a ritual).
* **Overland Travel Pace:**
  * **Fast:** 4 mph / 30 miles per day (**−5 penalty to Passive Perception**).
  * **Normal:** 3 mph / 24 miles per day.
  * **Slow:** 2 mph / 18 miles per day (able to use **Stealth**).

### Vision & Light
* **Bright Light:** Normal vision.
* **Dim Light (Shadows, twilight, torch outer radius):** Creates a **Lightly Obscured** area → **Disadvantage on Wisdom (Perception) checks that rely on sight**.
* **Darkness:** Creates a **Heavily Obscured** area → creatures without Darkvision effectively suffer the **Blinded** condition when trying to see into it.
* **Darkvision:** Sees in Dim Light as Bright Light, and in Darkness as Dim Light (shades of gray only; still has Disadvantage on sight-based Perception checks in total darkness unless they have *Devil's Sight* or a light source).

### Resting Mechanics
1. **Short Rest (At least 1 hour of light activity):**
   * Characters may spend one or more **Hit Dice** up to their level. For each Hit Die spent, roll the class Hit Die $+ \text{CON Mod}$ and regain that many HP.
   * Recharges Short-Rest features (*Fighter Action Surge & Second Wind, Warlock Pact Magic slots, Monk Ki Points, Druid Wild Shape, Cleric Channel Divinity*).
2. **Long Rest (At least 8 hours: 6 hours sleep + up to 2 hours light watch; max 1 per 24 hours):**
   * Regain **all lost Hit Points**.
   * Regain spent **Hit Dice** up to **half of total Hit Dice** (minimum 1).
   * Regain **all expended Spell Slots** and Long-Rest class features.
   * Reduces **Exhaustion** by 1 level (if given food and drink).

---

## 6. Combat Engine (Chapter 9)

### Combat Step-by-Step Sequence
1. **Determine Surprise:** Compare hidden ambushers' **Dexterity (Stealth)** checks against opponents' **Passive Perception** (or active Perception). Surprised creatures cannot move or take an Action/Bonus Action on their first turn, and cannot take a Reaction until that first turn ends *(Note: in 2024 rules, Surprise instead imposes Disadvantage on Initiative; our framework supports either toggle!)*.
2. **Establish Positions:** Distance, terrain, and cover.
3. **Roll Initiative:** Everyone rolls **Dexterity Check ($\text{1d20} + \text{DEX Mod}$)** to set turn order from highest to lowest.
4. **Take Turns:** Each creature gets **Movement**, **1 Action**, up to **1 Bonus Action** (if a feature grants one), and **1 Free Object Interaction** (e.g., drawing a weapon or opening an unlocked door). Out of turn, each creature gets **1 Reaction** per round (resets at the start of their turn).
5. **Begin Next Round:** When everyone has acted, round increments ($R \rightarrow R+1$).

### Standard Actions in Combat
* **Attack:** Make one melee or ranged attack (or more with *Extra Attack* / *Multiattack*).
* **Cast a Spell:** Cast a spell with a casting time of 1 Action.
* **Dash:** Gain extra movement equal to your current Speed for this turn.
* **Disengage:** Your movement does not provoke **Opportunity Attacks** for the rest of the turn.
* **Dodge:** Until the start of your next turn, any attack roll made against you has **Disadvantage** (if you can see the attacker), and you make **Dexterity saving throws with Advantage**.
* **Help:** Grant an ally **Advantage** on their next ability check, or on their next attack roll against a creature within 5 ft. of you.
* **Hide:** Make a **Dexterity (Stealth)** check when Heavily Obscured or behind Total Cover to become hidden (Unseen Attacker = Advantage on next attack).
* **Ready:** Hold an Action for a specific perceivable **Trigger**; uses your **Reaction** when triggered (if readying a spell, requires Concentration).
* **Search:** Devote attention to a **Wisdom (Perception)** or **Intelligence (Investigation)** check.
* **Use an Object / Magic Item:** Quaff a potion, pull a lever, activate a wand.
* **Grapple / Shove (Special Melee Attack):**
  * **Grapple:** Target (max 1 size larger) must Lose a contested check (Attacker's *Athletics* vs. Target's *Athletics* or *Acrobatics*) or have its Speed reduced to 0 (**Grappled**).
  * **Shove:** Contested check to either knock target **Prone** or push it **5 feet** away.

### Rolling 1 or 20 (Critical Hits & Fumbles)
* **Natural 20 on Attack Roll:** Automatic hit regardless of AC, and a **Critical Hit** — roll **all of the attack's damage dice twice** and add your normal ability modifier once.
* **Natural 1 on Attack Roll:** Automatic miss regardless of modifiers.

### Cover Rules
| Degree of Cover | Bonus to AC & DEX Saving Throws | Effect |
| :--- | :---: | :--- |
| **Half Cover** (low wall, furniture, another creature) | **+2** | Target is at least 50% blocked |
| **Three-Quarters Cover** (portcullis, arrow slit, thick tree) | **+5** | Target is at least 75% blocked |
| **Total Cover** (solid wall, closed door) | **Cannot be targeted directly** | Only affected by AoE reaching around corners |

### Damage Types (The 13 Types)
* **Physical:** `Bludgeoning`, `Piercing`, `Slashing`
* **Elemental:** `Acid`, `Cold`, `Fire`, `Lightning`, `Thunder`
* **Magical / Planar:** `Force`, `Necrotic`, `Poison`, `Psychic`, `Radiant`

### Dropping to 0 Hit Points & Death Saving Throws
* **Instant Death:** If remaining damage after hitting 0 HP equals or exceeds your **Hit Point Maximum**, you die instantly.
* **Falling Unconscious:** Otherwise, you drop to 0 HP and fall **Unconscious** (and Prone).
* **Death Saving Throws:** At the start of each turn at 0 HP, roll a flat **1d20** (no ability modifier):
  * **10 or higher:** 1 Success.
  * **9 or lower:** 1 Failure.
  * **Natural 1:** Counts as **2 Failures**.
  * **Natural 20:** Immediately regain **1 HP** and wake up!
  * **Taking Damage at 0 HP:** Causes 1 automatic Failure (2 Failures if from a Critical Hit — melee attacks within 5 ft. of an Unconscious creature are automatic Critical Hits if they hit).
  * **3 Successes:** You become **Stable** at 0 HP (no more rolls; regain 1 HP in $1\text{d}4$ hours).
  * **3 Failures:** **Your character dies.**

---

## 7. Spellcasting Rules (Chapters 10–11)

### Spell Save DC & Spell Attack Bonus
$$\text{Spell Save DC} = 8 + \text{Proficiency Bonus} + \text{Spellcasting Ability Modifier}$$
$$\text{Spell Attack Bonus} = \text{Proficiency Bonus} + \text{Spellcasting Ability Modifier}$$

* **Intelligence:** Wizard, Eldritch Knight Fighter, Arcane Trickster Rogue
* **Wisdom:** Cleric, Druid, Ranger
* **Charisma:** Bard, Paladin, Sorcerer, Warlock

### Concentration
* A spellcaster can only concentrate on **one Concentration spell at a time** (casting a second Concentration spell immediately ends the first).
* **Taking Damage while Concentrating:** Make a **Constitution Saving Throw**:
  $$\text{Concentration DC} = \max\left(10, \left\lfloor \frac{\text{Damage Taken}}{2} \right\rfloor\right)$$
* Being **Incapacitated** or killed immediately ends Concentration.

---

## 8. Appendix A: The 15 Conditions

| Condition | Mechanical Effects |
| :--- | :--- |
| **Blinded** | Automatically fails sight-based checks; Attack rolls against the creature have **Advantage**, and the creature's attack rolls have **Disadvantage**. |
| **Charmed** | Cannot attack the charmer or target the charmer with harmful abilities/magical effects; the charmer has **Advantage** on any ability check to interact socially with the creature. |
| **Deafened** | Automatically fails any ability check that requires hearing. |
| **Exhaustion** | 6 Cumulative Levels: **1:** Disadvantage on Ability Checks; **2:** Speed halved; **3:** Disadvantage on Attacks & Saves; **4:** HP Max halved; **5:** Speed = 0; **6:** Death. |
| **Frightened** | **Disadvantage** on ability checks and attack rolls while the source of fear is within line of sight; cannot willingly move closer to the source of fear. |
| **Grappled** | Speed becomes **0**, and cannot benefit from any bonus to speed. Ends if grappler is Incapacitated or forced out of reach. |
| **Incapacitated** | Can't take **Actions** or **Reactions** (and loses **Concentration**). |
| **Invisible** | Impossible to see without magic/special sense (counts as Heavily Obscured for hiding). Attack rolls against the creature have **Disadvantage**, and the creature's attack rolls have **Advantage**. |
| **Paralyzed** | **Incapacitated**, can't move or speak. Automatically fails **STR** and **DEX** saves. Attacks against it have **Advantage**, and any hit from within 5 ft. is an automatic **Critical Hit**. |
| **Petrified** | Transformed to solid stone (weight $\times 10$). **Incapacitated**, unaware, Resistance to all damage, Immune to poison/disease, auto-fails STR/DEX saves, attacks against have Advantage. |
| **Poisoned** | **Disadvantage** on **attack rolls** and **ability checks**. |
| **Prone** | Only movement is crawling (1 extra ft. per ft.) unless standing up (costs **half your Speed**). Creature has **Disadvantage** on attack rolls. Attacks against it have **Advantage** if attacker is within 5 ft., otherwise **Disadvantage**. |
| **Restrained** | Speed becomes **0**. Attack rolls against the creature have **Advantage**, the creature's attack rolls have **Disadvantage**, and the creature has **Disadvantage on DEX saving throws**. |
| **Stunned** | **Incapacitated**, can't move, speaks only falteringly. Automatically fails **STR** and **DEX** saving throws. Attack rolls against the creature have **Advantage**. |
| **Unconscious** | **Incapacitated**, can't move or speak, unaware of surroundings, drops held items and falls **Prone**. Auto-fails STR/DEX saves, attacks against have Advantage, any hit within 5 ft. is an automatic **Critical Hit**. |
