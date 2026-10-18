import React, { useState } from 'react';
import { getClassById } from '../../data/classes';
import { getSpellsForClass, getDefaultSpellsForClass } from '../../data/spells';
import { calculateCharacterDerivedStats, formatMod } from '../../services/dndEngine';

export default function SpellbookPanel({
    character,
    onCastSpell,
    onUseClassFeature,
    onShortRest,
    onLongRest,
    inCombat = false,
    actionUsed = false,
    bonusActionUsed = false,
    featureCooldowns = {},
    round = 1
}) {
    const [selectedLevelFilter, setSelectedLevelFilter] = useState('all');
    const cls = getClassById(character.class || 'wizard');
    const derived = calculateCharacterDerivedStats(character, cls, null);

    // Get spells available to this character
    const maxSpellLvl = character.level >= 5 ? 3 : character.level >= 3 ? 2 : 1;
    const classSpells = getSpellsForClass
        ? getSpellsForClass(character.class || 'wizard', maxSpellLvl)
        : [];
    const defaultSpells = getDefaultSpellsForClass
        ? getDefaultSpellsForClass(character.class || 'wizard', character.level || 1)
        : [];

    const displaySpells = classSpells.length > 0 ? classSpells : defaultSpells;
    const filteredSpells = displaySpells.filter((s) => {
        if (selectedLevelFilter === 'all') return true;
        return s.level === Number(selectedLevelFilter);
    });

    const spellSlots = character.spellSlots || {
        level1: { current: 2, max: 2 },
        level2: { current: character.level >= 3 ? 2 : 0, max: character.level >= 3 ? 2 : 0 },
        level3: { current: character.level >= 5 ? 2 : 0, max: character.level >= 5 ? 2 : 0 }
    };

    const classFeatures = (cls?.classFeatures || []).filter((f) => (f.level || 1) <= (character.level || 1));

    return (
        <div className="space-y-5">
            {/* Spellcasting Header */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800/60">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-sm text-purple-950 dark:text-purple-200 flex items-center gap-2">
                        <span>🔮</span> Grimoire & Class Powers
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-200/70 dark:bg-purple-800/60 text-purple-900 dark:text-purple-200 capitalize">
                        {derived.spellAbility || cls?.primaryAbility || 'Martial'}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80">
                        <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 block">Spell Save DC</span>
                        <span className="font-bold text-sm text-purple-700 dark:text-purple-300">
                            {derived.spellSaveDc || 12}
                        </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80">
                        <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 block">Spell Attack</span>
                        <span className="font-bold text-sm text-purple-700 dark:text-purple-300">
                            {formatMod(derived.spellAttackBonus ?? 4)}
                        </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80">
                        <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 block">Hit Dice</span>
                        <span className="font-bold text-sm text-emerald-700 dark:text-emerald-300">
                            {character.hitDiceRemaining ?? character.level ?? 1}/{character.level || 1} ({cls?.hitDice || 'd8'})
                        </span>
                    </div>
                </div>
            </div>

            {/* Rest & Recovery Bar (PHB Ch. 8) */}
            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <span>🔥</span> Rest & Recovery (PHB Rules)
                    </span>
                    {inCombat && (
                        <span className="text-[10px] text-red-500 font-medium">Unavailable in combat</span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        disabled={inCombat}
                        onClick={() => onShortRest && onShortRest()}
                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white shadow-sm transition-all"
                    >
                        ⛺ Short Rest (1 hr)
                        <span className="block text-[10px] opacity-90 font-normal">Spend Hit Die + Recover</span>
                    </button>
                    <button
                        type="button"
                        disabled={inCombat}
                        onClick={() => onLongRest && onLongRest()}
                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white shadow-sm transition-all"
                    >
                        🌙 Long Rest (8 hrs)
                        <span className="block text-[10px] opacity-90 font-normal">Full HP & Spell Slots</span>
                    </button>
                </div>
            </div>

            {/* Spell Slots Tracker */}
            {cls?.isSpellcaster !== false && (
                <div className="space-y-2">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Spell Slots Available
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((lvl) => {
                            const slot = spellSlots[`level${lvl}`] || { current: 0, max: 0 };
                            return (
                                <div
                                    key={lvl}
                                    className="p-2.5 rounded-lg bg-gray-50 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 text-center"
                                >
                                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 block">
                                        Level {lvl}
                                    </span>
                                    <div className="flex items-center justify-center gap-1 my-1">
                                        {slot.max > 0 ? (
                                            Array.from({ length: slot.max }).map((_, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`w-3 h-3 rounded-full border ${
                                                        idx < slot.current
                                                            ? 'bg-purple-500 border-purple-300 shadow-sm shadow-purple-500/50'
                                                            : 'bg-gray-300 dark:bg-slate-600 border-gray-400'
                                                    }`}
                                                />
                                            ))
                                        ) : (
                                            <span className="text-[10px] text-gray-400">Locked</span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                        {slot.current} / {slot.max}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Class Features & Martial Powers */}
            {classFeatures.length > 0 && (
                <div className="space-y-2">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {cls?.name} Class Features
                    </h5>
                    <div className="space-y-2">
                        {classFeatures.map((feat) => (
                            <div
                                key={feat.id || feat.name}
                                className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/70 border border-gray-200/80 dark:border-slate-600 flex items-start justify-between gap-2"
                            >
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                                            {feat.name}
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 uppercase">
                                            {feat.actionType || 'Feature'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                        {feat.effect || feat.description}
                                    </p>
                                </div>
                                {feat.actionType && feat.actionType !== 'passive' && onUseClassFeature && (() => {
                                    const featKey = (feat.id || feat.name || '').toLowerCase().replace(/[^a-z0-9]/g, '_');
                                    const lastUsed = featureCooldowns?.[featKey];
                                    const curRnd = round || 1;
                                    const roundsElapsed = lastUsed !== undefined ? (curRnd - lastUsed) : 999;
                                    const onCooldown = inCombat && roundsElapsed < 4;
                                    const roundsLeft = 4 - roundsElapsed;

                                    const isBonus = feat.actionType === 'bonus';
                                    const isActionLocked = inCombat && ((isBonus && bonusActionUsed) || (feat.actionType === 'action' && actionUsed));
                                    const isDisabled = isActionLocked || onCooldown;
                                    return (
                                        <button
                                            type="button"
                                            disabled={isDisabled}
                                            onClick={() => onUseClassFeature(feat)}
                                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-colors cursor-pointer disabled:cursor-not-allowed ${
                                                onCooldown
                                                    ? 'bg-slate-700 text-gray-400 opacity-50'
                                                    : 'bg-primary-500 hover:bg-primary-600 disabled:opacity-40 text-white'
                                            }`}
                                            title={
                                                onCooldown
                                                    ? `On cooldown for ${roundsLeft} more round(s)`
                                                    : isActionLocked
                                                        ? `${isBonus ? 'Bonus Action' : 'Action'} already spent this round`
                                                        : `Activate ${feat.name}`
                                            }
                                        >
                                            {onCooldown ? `⏳ Cooldown (${roundsLeft})` : isActionLocked ? 'Spent' : 'Use'}
                                        </button>
                                    );
                                })()}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Spells List */}
            {displaySpells.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Prepared Spells ({filteredSpells.length})
                        </h5>
                        <div className="flex gap-1">
                            {['all', '0', '1', '2', '3'].map((lvl) => (
                                <button
                                    key={lvl}
                                    type="button"
                                    onClick={() => setSelectedLevelFilter(lvl)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                        selectedLevelFilter === lvl
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                                    }`}
                                >
                                    {lvl === 'all' ? 'All' : lvl === '0' ? 'Cantrip' : `L${lvl}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {filteredSpells.map((spell) => {
                            const isBonus = spell.castingTime === 'bonus';
                            const isActionLocked = inCombat && (isBonus ? bonusActionUsed : actionUsed);
                            const slotNeeded = spell.level > 0 ? spellSlots[`level${spell.level}`] : null;
                            const hasSlot = spell.level === 0 || (slotNeeded && slotNeeded.current > 0);
                            const canCast = !isActionLocked && hasSlot;
                            return (
                                <div
                                    key={spell.id}
                                    className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/70 border border-gray-200/80 dark:border-slate-600 flex items-center justify-between gap-2"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span>{spell.icon || '✨'}</span>
                                            <span className="font-semibold text-xs text-gray-900 dark:text-white">
                                                {spell.name}
                                            </span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                                                {spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`}
                                            </span>
                                            {(spell.damageDice || spell.healDice) && (
                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                                                    {spell.damageDice || spell.healDice} {spell.damageType || 'HP'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                            {spell.description}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={!canCast}
                                        onClick={() => onCastSpell && onCastSpell(spell)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white flex-shrink-0 transition-colors cursor-pointer disabled:cursor-not-allowed"
                                        title={
                                            isActionLocked
                                                ? (isBonus ? 'Bonus Action spent this round' : 'Action spent this round')
                                                : !hasSlot
                                                    ? 'No spell slots remaining'
                                                    : 'Cast spell'
                                        }
                                    >
                                        {isActionLocked ? (isBonus ? 'Bonus Spent' : 'Action Spent') : 'Cast'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
