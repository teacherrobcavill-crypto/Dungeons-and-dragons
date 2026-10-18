import React, { useState } from 'react';
import { monsters } from '../../data/monsters';
import { getAbilityMod, formatMod } from '../../services/dndEngine';

export default function BestiaryCodex({ encounteredMonsters = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedMonster, setSelectedMonster] = useState(monsters[0] || null);

    const creatureTypes = ['all', ...Array.from(new Set((monsters || []).map((m) => m.type).filter(Boolean)))];

    const filteredMonsters = (monsters || []).filter((m) => {
        const matchesSearch = !searchQuery ||
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (m.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (m.habitat || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || m.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const active = selectedMonster || filteredMonsters[0];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span>👹</span> Monster Manual Codex
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        2024 Stat Blocks & 2014 Ecological Lore ({monsters?.length || 0} Creatures)
                    </p>
                </div>
            </div>

            {/* Search & Type Filter */}
            <div className="space-y-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search monster, habitat, or type..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white"
                />
                <div className="flex gap-1 overflow-x-auto pb-1">
                    {creatureTypes.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTypeFilter(t)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                                typeFilter === t
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                            }`}
                        >
                            {t === 'all' ? 'All Types' : t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Monster Roster Pills */}
            <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
                {filteredMonsters.map((monster) => {
                    const isSelected = active?.id === monster.id;
                    const isEncountered = encounteredMonsters.includes(monster.id);
                    return (
                        <button
                            key={monster.id}
                            type="button"
                            onClick={() => setSelectedMonster(monster)}
                            className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs border transition-all ${
                                isSelected
                                    ? 'bg-red-50 dark:bg-red-950/50 border-red-500 text-red-900 dark:text-red-200 font-semibold'
                                    : 'bg-gray-50 dark:bg-slate-800/80 border-gray-200/70 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                            }`}
                        >
                            <span className="truncate flex items-center gap-1.5">
                                <span>{monster.icon || '👹'}</span>
                                <span className="truncate">{monster.name}</span>
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200/80 dark:bg-slate-700 text-gray-700 dark:text-gray-300 ml-1 flex-shrink-0">
                                CR {monster.cr} {isEncountered ? '👁️' : ''}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 2024 Monster Stat Block Display */}
            {active && (
                <div className="p-4 rounded-xl bg-gradient-to-b from-amber-50/90 to-stone-50 dark:from-slate-800 dark:to-slate-900 border-2 border-red-800/40 dark:border-red-900/60 shadow-md space-y-3 text-xs">
                    {/* Header */}
                    <div className="border-b-2 border-red-800/40 dark:border-red-700/50 pb-2">
                        <div className="flex items-center justify-between">
                            <h5 className="font-display font-bold text-base text-red-900 dark:text-red-300 flex items-center gap-2">
                                <span className="text-xl">{active.icon || '👹'}</span>
                                {active.name}
                            </h5>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200">
                                CR {active.cr} ({active.xp || 100} XP)
                            </span>
                        </div>
                        <p className="italic text-gray-600 dark:text-gray-400 text-[11px] mt-0.5">
                            {active.size || 'Medium'} {active.type || 'Monstrosity'}, {active.alignment || 'Unaligned'}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1.5 text-[10px] text-gray-600 dark:text-gray-300">
                            {active.habitat && (
                                <span className="px-2 py-0.5 rounded bg-amber-200/60 dark:bg-slate-700">
                                    🌍 Habitat: <strong>{active.habitat}</strong>
                                </span>
                            )}
                            {active.treasureTheme && (
                                <span className="px-2 py-0.5 rounded bg-amber-200/60 dark:bg-slate-700">
                                    💎 Treasure: <strong>{active.treasureTheme}</strong>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Core Combat Vitals (2024 MM Format) */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-white/70 dark:bg-slate-800/80 p-2 rounded-lg border border-amber-200/60 dark:border-slate-700">
                        <div>
                            <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 block">Armor Class</span>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">{active.ac}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 block">Hit Points</span>
                            <span className="font-bold text-sm text-red-600 dark:text-red-400">{active.hp}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 block">Initiative</span>
                            <span className="font-bold text-sm text-amber-700 dark:text-amber-400">
                                {formatMod(active.initiativeMod ?? 1)} ({active.initiativeStatic || (10 + (active.initiativeMod ?? 1))})
                            </span>
                        </div>
                    </div>

                    {/* 6 Ability Scores + Mod + Save (2024 Table) */}
                    {active.abilities && (
                        <div className="grid grid-cols-6 gap-1 text-center bg-amber-100/50 dark:bg-slate-800 p-2 rounded-lg">
                            {Object.entries(active.abilities).map(([ab, val]) => {
                                const score = typeof val === 'object' ? val.score : val;
                                const mod = typeof val === 'object' && val.mod !== undefined ? val.mod : getAbilityMod(score);
                                const save = active.saves?.[ab] !== undefined ? active.saves[ab] : mod;
                                return (
                                    <div key={ab} className="p-1 rounded bg-white/80 dark:bg-slate-700/80">
                                        <span className="text-[9px] font-bold uppercase text-red-800 dark:text-red-300 block">
                                            {ab.slice(0, 3)}
                                        </span>
                                        <span className="font-bold text-xs text-gray-900 dark:text-white">{score}</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-300 block">
                                            {formatMod(mod)} / S:{formatMod(save)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Resistances, Immunities & Senses */}
                    <div className="space-y-1 text-[11px] text-gray-700 dark:text-gray-300">
                        <div><strong>Speed:</strong> {active.speed || '30 ft.'}</div>
                        {active.resistances?.length > 0 && (
                            <div><strong>Resistances:</strong> {active.resistances.join(', ')}</div>
                        )}
                        {active.immunities?.length > 0 && (
                            <div><strong>Immunities:</strong> {active.immunities.join(', ')}</div>
                        )}
                        {active.senses && <div><strong>Senses:</strong> {active.senses}</div>}
                    </div>

                    {/* Traits */}
                    {active.traits?.length > 0 && (
                        <div className="space-y-1 border-t border-red-800/20 dark:border-slate-700 pt-2">
                            <h6 className="font-bold uppercase tracking-wider text-[10px] text-red-800 dark:text-red-400">
                                Traits
                            </h6>
                            {active.traits.map((t, i) => (
                                <p key={i} className="text-[11px] text-gray-700 dark:text-gray-300">
                                    <strong>{t.name}.</strong> {t.description}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    {active.actions?.length > 0 && (
                        <div className="space-y-1.5 border-t border-red-800/20 dark:border-slate-700 pt-2">
                            <h6 className="font-bold uppercase tracking-wider text-[10px] text-red-800 dark:text-red-400">
                                Actions
                            </h6>
                            {active.actions.map((act, i) => (
                                <div key={i} className="text-[11px] text-gray-700 dark:text-gray-300">
                                    <strong>{act.name}{act.recharge ? ` (Recharge ${act.recharge})` : ''}.</strong>{' '}
                                    {act.toHit !== undefined && <em>Attack: +{act.toHit} to hit. </em>}
                                    {act.saveDc && <em>Save: {act.saveAbility?.toUpperCase() || 'DEX'} DC {act.saveDc}. </em>}
                                    {act.damageDice && <span>Hit: <strong>{act.damageDice}</strong> {act.damageType} damage. </span>}
                                    {act.description}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Legendary Actions / Lair */}
                    {active.legendaryActions?.length > 0 && (
                        <div className="space-y-1 border-t border-red-800/20 dark:border-slate-700 pt-2">
                            <h6 className="font-bold uppercase tracking-wider text-[10px] text-amber-700 dark:text-amber-400">
                                👑 Legendary Actions
                            </h6>
                            {active.legendaryActions.map((la, i) => (
                                <p key={i} className="text-[11px] text-gray-700 dark:text-gray-300">
                                    <strong>{la.name}.</strong> {la.description}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* 2014 Monster Manual Lore */}
                    {active.lore && (
                        <div className="p-2.5 rounded-lg bg-amber-100/60 dark:bg-slate-800/90 border-l-4 border-amber-600 text-[11px] italic text-gray-700 dark:text-gray-300">
                            📖 <strong>Monster Manual Lore:</strong> {active.lore}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
