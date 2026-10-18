import React, { useState } from 'react';
import { monsters } from '../../data/monsters';
import { allEquipment } from '../../data/equipment';
import { spells } from '../../data/spells';

// Rich D&D 5e & Campaign Lore Compendium
const LORE_DICTIONARY = {
    'triboar trail': {
        title: 'The Triboar Trail',
        category: 'Historic Highway',
        icon: '🌲',
        description: 'The windswept merchant path running through the foothills of the Sword Mountains, notorious for bandit raids and Cragmaw goblin ambushes.'
    },
    'phandalin': {
        title: 'Phandalin',
        category: 'Frontier Town',
        icon: '⛏️',
        description: 'A bustling frontier mining settlement built upon the ruins of an ancient town, serving as the gateway to the Sword Mountains and Wave Echo Cave.'
    },
    'wave echo cave': {
        title: 'Wave Echo Cave',
        category: 'Lost Mine & Dungeon',
        icon: '🌊',
        description: 'The fabled subterranean complex where human mages, dwarven smiths, and gnome artificers formed the Phandelver Pact and constructed the Great Spell Forge.'
    },
    'spell forge': {
        title: 'The Forge of Spells',
        category: 'Primordial Artifact',
        icon: '✨',
        description: 'An ancient furnace burning with heatless green flame, channeling deep earth magic to enchant permanent wondrous weapons and armor.'
    },
    'forge of spells': {
        title: 'The Forge of Spells',
        category: 'Primordial Artifact',
        icon: '✨',
        description: 'An ancient furnace burning with heatless green flame, channeling deep earth magic to enchant permanent wondrous weapons and armor.'
    },
    'phandelver pact': {
        title: 'The Phandelver Pact',
        category: 'Historical Alliance',
        icon: '📜',
        description: 'A historic brotherhood between dwarves, gnomes, and human wizards that ushered in a golden age of peace and magical craftsmanship before the orc invasion.'
    },
    'cragmaw': {
        title: 'The Cragmaw Tribe',
        category: 'Goblinoid Host',
        icon: '🏹',
        description: 'A ruthless coalition of goblins, hobgoblins, and bugbears hiding throughout Neverwinter Wood, answering to King Grol and the enigmatic Black Spider.'
    },
    'sildar hallwinter': {
        title: 'Sildar Hallwinter',
        category: 'Lords’ Alliance Champion',
        icon: '🛡️',
        description: 'An honorable veteran knight of Neverwinter and investigator for the Lords’ Alliance, sworn to establish order on the frontier.'
    },
    'gundren rockseeker': {
        title: 'Gundren Rockseeker',
        category: 'Dwarven Prospector',
        icon: '⛏️',
        description: 'An intrepid dwarf prospector who, with his brothers Tharden and Nundro, found the long-lost entrance to Wave Echo Cave before being ambushed.'
    },
    'nezznar': {
        title: 'Nezznar the Black Spider',
        category: 'Drow Conspirator',
        icon: '🕷️',
        description: 'A sinister dark elf wizard exiled from the Underdark, scheming to monopolize the secrets of the Spell Forge for personal dominion.'
    },
    'black spider': {
        title: 'Nezznar the Black Spider',
        category: 'Drow Conspirator',
        icon: '🕷️',
        description: 'A sinister dark elf wizard exiled from the Underdark, scheming to monopolize the secrets of the Spell Forge for personal dominion.'
    },
    'klarg': {
        title: 'Klarg the Bugbear',
        category: 'Cragmaw Warlord',
        icon: '👹',
        description: 'A brutish, ambitious bugbear chief holding the upper caverns of Cragmaw Hideout alongside his pet wolf Ripper.'
    },
    'lords alliance': {
        title: 'The Lords’ Alliance',
        category: 'Regional Coalition',
        icon: '🏛️',
        description: 'A mutual security pact formed by northern city-states (including Neverwinter and Waterdeep) to uphold justice and combat encroaching wilderness threats.'
    },
    "lords' alliance": {
        title: 'The Lords’ Alliance',
        category: 'Regional Coalition',
        icon: '🏛️',
        description: 'A mutual security pact formed by northern city-states (including Neverwinter and Waterdeep) to uphold justice and combat encroaching wilderness threats.'
    },
    'voranthos': {
        title: 'Voranthos the Red Wyrm',
        category: 'Ancient Red Dragon',
        icon: '🐉',
        description: 'A tyrannical, fire-breathing red dragon who laid waste to the Ashford March and now roosts atop a hoard of molten gold within Mount Cinder.'
    },
    'ashford': {
        title: 'The Ashford March',
        category: 'Scorched Realm',
        icon: '🔥',
        description: 'Once a proud barony of stone watchtowers and knightly manors, now reduced to smoking basalt ruins beneath Voranthos’s caldera.'
    },
    'ravencrest manor': {
        title: 'Ravencrest Manor',
        category: 'Haunted Estate',
        icon: '🏰',
        description: 'An opulent, storm-lashed gothic manor cursed by betrayal, where the restless wight of Lord Malakor and the tragic specter of Lady Evelyn wander.'
    },
    'blackhaven': {
        title: 'Blackhaven',
        category: 'City of Shadows',
        icon: '⚓',
        description: 'A fog-drenched port city of narrow alleys and black-water canals, governed beneath the surface by the Nightscale Thieves’ Guild.'
    },
    'vespera': {
        title: 'Guildmaster Vespera',
        category: 'Master Assassin',
        icon: '🗡️',
        description: 'The cold, calculating head of the Blackhaven Thieves’ Guild, renowned for her twin poison blades and web of disguised agents.'
    },
    'sleeping god': {
        title: 'The Sleeping God',
        category: 'Cosmic Elder Entity',
        icon: '👁️',
        description: 'A dormant primordial serpent deity sealed deep beneath the jungle ziggurat of Xul-Khorath, whose fitful dreams warp gravity and time.'
    },
    'tiamat': {
        title: 'Tiamat',
        category: 'Draconic Deity',
        icon: '🐲',
        description: 'The five-headed chromatic queen of dragons, reigning over Avernus in the Nine Hells as the dark patron of pride, fury, and devastation.'
    },
    'dumathoin': {
        title: 'Dumathoin',
        category: 'Dwarven Deity',
        icon: '💎',
        description: 'The dwarven Keeper of Secrets Beneath the Mountain, god of mining, gems, and subterranean sanctity.'
    },
    'redbrand': {
        title: 'The Redbrand Ruffians',
        category: 'Outlaw Syndicate',
        icon: '🗡️',
        description: 'A ruthless bandit gang donning scarlet cloaks, terrorizing the frontier town of Phandalin from the ruins of Tresendar Manor.'
    },
    'tresendar': {
        title: 'Tresendar Manor',
        category: 'Ruined Stronghold',
        icon: '🏰',
        description: 'The ancient stone ruins on Phandalin’s eastern crest, concealing subterranean cellars, secret crypts, and an otherworldly crevasse.'
    },
    'stonehill inn': {
        title: 'Stonehill Inn',
        category: 'Tavern Hub',
        icon: '🍺',
        description: 'The warm, firelit common room of Phandalin operated by Toblen Stonehill, where prospectors, miners, and travelers trade rumors.'
    },
    'moradin': {
        title: 'Moradin the Soulforger',
        category: 'Dwarven Deity',
        icon: '⚒️',
        description: 'The father of the dwarven pantheon, patron of smithing, unyielding stone, and craft.'
    },
    'clan grimhelm': {
        title: 'Clan Grimhelm',
        category: 'Ancient Dwarven Clan',
        icon: '🛡️',
        description: 'An ancient brotherhood of master armorers who forged legendary dragon-slaying weapons beneath Mount Cinder.'
    },
    'malakor': {
        title: 'Lord Malakor Ravencrest',
        category: 'Cursed Wight Lord',
        icon: '👑',
        description: 'The tragic patriarch of Ravencrest Manor whose dark pact with the Shadowfell bound the estate in eternal mourning.'
    },
    'lady evelyn': {
        title: 'Lady Evelyn Ravencrest',
        category: 'Spectral Banshee',
        icon: '👻',
        description: 'The mournful spirit whose wail echoes through Ravencrest’s belfry, longing for release from the necrotic curse.'
    },
    'dawnfather': {
        title: 'The Dawnfather',
        category: 'Solar Deity',
        icon: '☀️',
        description: 'Lathander, deity of dawn, holy radiance, and the renewal of hope against shadow and undeath.'
    },
    'shadowfell': {
        title: 'The Shadowfell',
        category: 'Plane of Shadow',
        icon: '🌑',
        description: 'A desolate echo plane of gloom, decay, and necrotic energies that borders the mortal Material Plane.'
    },
    'underdark': {
        title: 'The Underdark',
        category: 'Subterranean Realm',
        icon: '🕳️',
        description: 'A colossal subterranean world of endless caverns, strange bioluminescence, and alien horrors lying beneath the surface.'
    },
    'xul-khorath': {
        title: 'Ziggurat of Xul-Khorath',
        category: 'Ancient Ziggurat',
        icon: '🏛️',
        description: 'A colossal pre-human stepped pyramid half-swallowed by the primeval jungle, housing the seal of the Sleeping God.'
    },
    'yuan-ti': {
        title: 'The Yuan-ti',
        category: 'Serpent Folk',
        icon: '🐍',
        description: 'An ancient, cold-blooded empire of serpentine humanoids who worship cosmic serpent horrors and practice blood sorcery.'
    },
    'ssethra': {
        title: 'High Priestess Ssethra',
        category: 'Yuan-ti Abomination',
        icon: '👑',
        description: 'The fanatical serpentine high priestess guarding the inner sanctum of Xul-Khorath, seeking to awaken the Sleeping God.'
    },
    'nightscale': {
        title: 'The Nightscale Syndicate',
        category: 'Thieves’ Guild',
        icon: '🗝️',
        description: 'The dominant criminal syndicate of Blackhaven, controlling smuggling canals, poison dispensaries, and rooftop safehouses.'
    },
    'thieves cant': {
        title: 'Thieves’ Cant',
        category: 'Secret Language',
        icon: '🤫',
        description: 'A secret dialect of coded double-talk, discreet hand gestures, and chalk markings known only to rogues and fences.'
    },
    "thieves' cant": {
        title: 'Thieves’ Cant',
        category: 'Secret Language',
        icon: '🤫',
        description: 'A secret dialect of coded double-talk, discreet hand gestures, and chalk markings known only to rogues and fences.'
    }
};

export default function LoreText({ text = '', className = '', fontClass = '' }) {
    const [activeLore, setActiveLore] = useState(null);

    if (!text) return null;

    // Helper to find monster match
    const findMonster = (cleanName) => {
        const lower = cleanName.toLowerCase().trim();
        return monsters.find(
            (m) =>
                m.name.toLowerCase() === lower ||
                m.id.toLowerCase() === lower ||
                lower.includes(m.name.toLowerCase())
        );
    };

    // Helper to find item match
    const findItem = (cleanName) => {
        const lower = cleanName.toLowerCase().trim();
        return allEquipment.find(
            (i) => i.name.toLowerCase() === lower || lower.includes(i.name.toLowerCase())
        );
    };

    // Helper to find spell match
    const findSpell = (cleanName) => {
        const lower = cleanName.toLowerCase().trim();
        return spells.find(
            (s) => s.name.toLowerCase() === lower || lower.includes(s.name.toLowerCase())
        );
    };

    // Helper to find lore match
    const findLore = (cleanName) => {
        const lower = cleanName.toLowerCase().trim();
        if (LORE_DICTIONARY[lower]) return LORE_DICTIONARY[lower];
        for (const [key, val] of Object.entries(LORE_DICTIONARY)) {
            if (lower.includes(key)) return val;
        }
        return null;
    };

    // Tokenize text into chunks:
    // ***bold italic / lore***
    // **bold / lore**
    // *italics*
    // `code / checks`
    // normal text
    const parseFormattedSegments = (rawText) => {
        if (typeof rawText !== 'string') return [String(rawText)];

        // Regex matches:
        // Group 1: ***bold italic / lore***
        // Group 2: **bold / lore**
        // Group 3: *italics*
        // Group 4: `code / checks`
        const regex = /\*\*\*([^*\n]+?)\*\*\*|\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*|`([^`]+)`/g;
        const elements = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(rawText)) !== null) {
            // Push plain text before the match
            if (match.index > lastIndex) {
                let plainText = rawText.substring(lastIndex, match.index);
                // Convert bullet points like "\n* " or "* " to "• "
                plainText = plainText.replace(/(^|\n)\*\s+/g, '$1• ');
                // Strip any remaining stray asterisks
                plainText = plainText.replace(/\*/g, '');
                if (plainText) {
                    elements.push({
                        type: 'text',
                        content: plainText
                    });
                }
            }

            if (match[1] !== undefined) {
                // ***bold italic / lore target***
                const term = match[1];
                const clean = term.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim();
                const matchedMonster = findMonster(clean);
                const matchedItem = findItem(clean);
                const matchedSpell = findSpell(clean);
                const matchedLore = findLore(clean);

                elements.push({
                    type: 'lore',
                    term: clean,
                    content: term,
                    isItalic: true,
                    monster: matchedMonster,
                    item: matchedItem,
                    spell: matchedSpell,
                    lore: matchedLore
                });
            } else if (match[2] !== undefined) {
                // **bold / lore target**
                const term = match[2];
                const clean = term.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim();

                // Check for DC check (e.g. DC 12 Athletics, DC 15 Stealth)
                const dcMatch = clean.match(/^(?:(?:make a\s+)?(?:an?\s+)?)?DC\s*(\d+)\s*(.*)/i);
                if (dcMatch) {
                    elements.push({
                        type: 'check',
                        dc: dcMatch[1],
                        skill: dcMatch[2] || 'Check',
                        content: term
                    });
                } else {
                    const matchedMonster = findMonster(clean);
                    const matchedItem = findItem(clean);
                    const matchedSpell = findSpell(clean);
                    const matchedLore = findLore(clean);

                    elements.push({
                        type: 'lore',
                        term: clean,
                        content: term,
                        isItalic: false,
                        monster: matchedMonster,
                        item: matchedItem,
                        spell: matchedSpell,
                        lore: matchedLore
                    });
                }
            } else if (match[3] !== undefined) {
                // *italics*
                elements.push({
                    type: 'italic',
                    content: match[3].replace(/\*/g, '')
                });
            } else if (match[4] !== undefined) {
                // `code / check`
                elements.push({
                    type: 'badge',
                    content: match[4]
                });
            }

            lastIndex = regex.lastIndex;
        }

        // Remaining text
        if (lastIndex < rawText.length) {
            let plainText = rawText.substring(lastIndex);
            plainText = plainText.replace(/(^|\n)\*\s+/g, '$1• ');
            plainText = plainText.replace(/\*/g, '');
            if (plainText) {
                elements.push({
                    type: 'text',
                    content: plainText
                });
            }
        }

        return elements;
    };

    const segments = parseFormattedSegments(text);

    return (
        <span className={`inline leading-relaxed ${fontClass} ${className}`}>
            {segments.map((seg, idx) => {
                if (seg.type === 'text') {
                    return <span key={idx}>{seg.content}</span>;
                }

                if (seg.type === 'italic') {
                    return (
                        <em key={idx} className="font-serif italic text-amber-900/90 dark:text-amber-200/90">
                            {seg.content}
                        </em>
                    );
                }

                if (seg.type === 'check') {
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() =>
                                setActiveLore({
                                    title: `DC ${seg.dc} ${seg.skill || 'Ability Check'}`,
                                    category: 'Tabletop 5e Check',
                                    icon: '🎲',
                                    description: `Roll a d20 and add your ${seg.skill || 'governing'} modifier. Total must equal or beat ${seg.dc} to succeed!`
                                })
                            }
                            className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 hover:brightness-110 active:scale-95 transition-all shadow-sm"
                        >
                            <span>🎲</span>
                            <span>DC {seg.dc} {seg.skill}</span>
                        </button>
                    );
                }

                if (seg.type === 'badge') {
                    return (
                        <span
                            key={idx}
                            className="inline-block mx-1 px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-xs font-mono font-semibold text-gray-800 dark:text-gray-200"
                        >
                            {seg.content}
                        </span>
                    );
                }

                if (seg.type === 'lore') {
                    const { monster, item, spell, lore, term, content, isItalic } = seg;
                    const hasLoreMatch = Boolean(monster || item || spell || lore);

                    // If not a matched lore item, check if it's a section header or simple emphasis
                    if (!hasLoreMatch) {
                        const isHeader = content.endsWith(':') || (term.length > 3 && term.toUpperCase() === term);
                        if (isHeader) {
                            return (
                                <strong key={idx} className="font-bold text-gray-900 dark:text-white">
                                    {content}
                                </strong>
                            );
                        }
                        return (
                            <strong
                                key={idx}
                                className={`font-semibold ${isItalic ? 'italic ' : ''}text-amber-950 dark:text-amber-100`}
                            >
                                {content}
                            </strong>
                        );
                    }

                    // Click handler to open the lore popup card
                    const handleClick = () => {
                        if (monster) {
                            setActiveLore({
                                title: monster.name,
                                category: `Monster Manual (CR ${monster.cr})`,
                                icon: monster.icon || '👹',
                                description: monster.lore || `${monster.size} ${monster.type}, ${monster.alignment}. AC ${monster.ac}, HP ${monster.hp}.`,
                                stats: `AC ${monster.ac} • HP ${monster.hp} • Speed ${monster.speed} • XP ${monster.xp}`
                            });
                        } else if (item) {
                            setActiveLore({
                                title: item.name,
                                category: item.type === 'magic' ? 'Magic Item' : 'Equipment',
                                icon: item.icon || '⚔️',
                                description: item.description || `Cost: ${item.costGp} gp. ${item.properties?.join(', ') || ''}`,
                                stats: item.damageDice ? `Damage: ${item.damageDice} ${item.damageType}` : item.baseAc ? `AC: ${item.baseAc}` : ''
                            });
                        } else if (spell) {
                            setActiveLore({
                                title: spell.name,
                                category: `Level ${spell.level} ${spell.school || 'Spell'}`,
                                icon: spell.icon || '🔮',
                                description: spell.description,
                                stats: `Cast: ${spell.castingTime} • Range: ${spell.range} • ${spell.damageDice || spell.healDice || ''}`
                            });
                        } else if (lore) {
                            setActiveLore(lore);
                        }
                    };

                    // Distinct styling per lore type
                    let badgeStyles = 'text-amber-800 dark:text-amber-300 font-bold decoration-amber-500/40 hover:text-amber-600';

                    if (monster) {
                        badgeStyles = 'text-rose-700 dark:text-rose-300 font-bold hover:text-rose-500';
                    } else if (item) {
                        badgeStyles = 'text-emerald-700 dark:text-emerald-300 font-bold hover:text-emerald-500';
                    } else if (spell) {
                        badgeStyles = 'text-purple-700 dark:text-purple-300 font-bold hover:text-purple-500';
                    } else if (lore) {
                        badgeStyles = 'text-amber-700 dark:text-amber-300 font-bold hover:text-amber-500';
                    }

                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={handleClick}
                            className={`inline underline decoration-dotted decoration-2 underline-offset-2 hover:decoration-solid transition-all cursor-pointer font-semibold ${isItalic ? 'italic ' : ''}${badgeStyles}`}
                            title={`Tap to inspect lore: ${term}`}
                        >
                            <span>{content}</span>
                        </button>
                    );
                }

                return null;
            })}

            {/* Mobile-Friendly Lore Modal / Bottom Sheet */}
            {activeLore && (
                <div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setActiveLore(null)}
                >
                    <div
                        className="w-full max-w-md bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 rounded-3xl p-5 shadow-2xl space-y-3 animate-slide-in relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-3xl p-2 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
                                    {activeLore.icon || '📖'}
                                </span>
                                <div>
                                    <h4 className="font-display font-extrabold text-base text-gray-900 dark:text-white">
                                        {activeLore.title}
                                    </h4>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                                        {activeLore.category}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveLore(null)}
                                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {activeLore.description}
                        </p>

                        {activeLore.stats && (
                            <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs font-mono font-semibold text-amber-900 dark:text-amber-300">
                                {activeLore.stats}
                            </div>
                        )}

                        <div className="pt-1 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setActiveLore(null)}
                                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
                            >
                                Continue Reading →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}
