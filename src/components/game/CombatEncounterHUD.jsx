import React, { useState } from 'react';
import { getClassById } from '../../data/classes';
import { getSpellsForClass } from '../../data/spells';
import { CONDITIONS_INFO } from '../../services/dndEngine';

export default function CombatEncounterHUD({
    combat,
    character,
    equippedItems = [],
    inventory = [],
    onWeaponAttack,
    onCastCombatSpell,
    onUseClassFeature,
    onDrinkPotion,
    onDodgeAction,
    onEndTurn
}) {
    const [selectedEnemyId, setSelectedEnemyId] = useState(null);
    const [rollMode, setRollMode] = useState('normal');
    const [useDivineSmite, setUseDivineSmite] = useState(false);

    if (!combat || !combat.active) return null;

    const livingEnemies = (combat.enemies || []).filter((e) => e.hp > 0);
    const activeTarget = livingEnemies.find((e) => e.instanceId === selectedEnemyId) || livingEnemies[0] || null;

    const cls = getClassById(character.class || 'fighter');
    const maxSpellLvl = character.level >= 5 ? 3 : character.level >= 3 ? 2 : 1;
    const combatSpells = (getSpellsForClass ? getSpellsForClass(character.class || 'wizard', maxSpellLvl) : []).slice(0, 6);

    // Primary equipped weapon or class default weapon
    const primaryWeapon = equippedItems.find((i) => i.type === 'weapon' || i.damageDice) || {
        name: character.class === 'rogue' ? 'Shortsword' : character.class === 'ranger' ? 'Longbow' : character.class === 'wizard' ? 'Quarterstaff' : 'Longsword',
        damageDice: character.class === 'barbarian' ? '1d12' : character.class === 'rogue' ? '1d6' : '1d8',
        damageType: character.class === 'ranger' || character.class === 'rogue' ? 'Piercing' : 'Slashing',
        properties: character.class === 'rogue' ? ['finesse'] : character.class === 'ranger' ? ['ranged'] : []
    };

    const healingPotion = inventory.find((i) => i.name?.toLowerCase().includes('potion') && i.quantity > 0);
    const activeFeatures = (cls?.classFeatures || []).filter(
        (f) => (f.level || 1) <= (character.level || 1) && f.actionType && f.actionType !== 'passive'
    );

    return (
        <div className="mx-4 mt-3 p-4 rounded-2xl bg-gradient-to-br from-red-950/90 via-slate-900 to-slate-950 text-white border-2 border-red-500/60 shadow-xl space-y-3 animate-fade-in">
            {/* Top Combat Banner & Initiative Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/30 pb-2.5">
                <div className="flex items-center gap-2">
                    <span className="text-xl animate-pulse">⚔️</span>
                    <div>
                        <h4 className="font-display font-bold text-sm text-red-200 flex items-center gap-2">
                            {combat.title}
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-600/80 text-white uppercase tracking-wider">
                                Round {combat.round}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                {combat.difficulty} ({combat.xpReward} XP)
                            </span>
                        </h4>
                        {combat.terrainFeature && (
                            <p className="text-[11px] text-amber-200/80">
                                🌋 Battlefield Terrain: {combat.terrainFeature}
                            </p>
                        )}
                    </div>
                </div>

                {/* Initiative Order Pills */}
                <div className="flex items-center gap-1 overflow-x-auto">
                    {(combat.initiativeOrder || []).map((entry) => {
                        const enemyObj = entry.isEnemy ? combat.enemies.find((e) => e.instanceId === entry.id) : null;
                        if (entry.isEnemy && (!enemyObj || enemyObj.hp <= 0)) return null;
                        return (
                            <span
                                key={entry.id}
                                className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 border ${
                                    entry.isPlayer
                                        ? 'bg-amber-500/30 border-amber-400 text-amber-100'
                                        : entry.isCompanion
                                            ? 'bg-indigo-500/30 border-indigo-400 text-indigo-100'
                                            : 'bg-red-500/30 border-red-400 text-red-100'
                                }`}
                            >
                                <span>{entry.icon}</span>
                                <span className="max-w-[75px] truncate">{entry.name}</span>
                                <span className="opacity-75">({entry.initiative})</span>
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Enemy Target Cards (2024 Monster Manual HUD) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {(combat.enemies || []).map((enemy) => {
                    const isDead = enemy.hp <= 0;
                    const isTargeted = activeTarget?.instanceId === enemy.instanceId;
                    const hpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
                    return (
                        <div
                            key={enemy.instanceId}
                            onClick={() => !isDead && setSelectedEnemyId(enemy.instanceId)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${
                                isDead
                                    ? 'bg-slate-900/40 border-slate-800 opacity-45 cursor-not-allowed'
                                    : isTargeted
                                        ? 'bg-red-900/40 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                                        : 'bg-slate-800/70 border-slate-700 hover:border-red-400/60'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-lg">{isDead ? '💀' : enemy.icon || '👹'}</span>
                                    <div className="min-w-0">
                                        <p className="font-bold text-xs text-white truncate">{enemy.name}</p>
                                        <span className="text-[10px] text-gray-300">
                                            AC {enemy.ac} • CR {enemy.cr}
                                        </span>
                                    </div>
                                </div>
                                {isTargeted && !isDead && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                                        TARGET 🎯
                                    </span>
                                )}
                            </div>

                            {/* Enemy HP Bar */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-gray-300">{isDead ? 'Defeated' : 'HP'}</span>
                                    <span className="font-mono font-bold text-red-200">
                                        {enemy.hp} / {enemy.maxHp}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${
                                            hpPct > 50 ? 'bg-red-500' : hpPct > 25 ? 'bg-amber-500' : 'bg-rose-600'
                                        }`}
                                        style={{ width: `${hpPct}%` }}
                                    />
                                </div>
                            </div>

                            {/* Enemy Conditions */}
                            {enemy.conditions?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {enemy.conditions.map((cond) => (
                                        <span
                                            key={cond}
                                            className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-purple-600/70 text-purple-100 uppercase"
                                        >
                                            {CONDITIONS_INFO[cond]?.icon || '⚡'} {cond}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 5e Action Economy & Tactical Controls */}
            <div className="pt-2 border-t border-red-500/30 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${combat.actionUsed ? 'bg-slate-800 text-gray-400 line-through' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>
                            ⚡ Action {combat.actionUsed ? 'Spent' : 'Ready'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${combat.bonusActionUsed ? 'bg-slate-800 text-gray-400 line-through' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                            ✨ Bonus Action {combat.bonusActionUsed ? 'Spent' : 'Ready'}
                        </span>
                    </div>

                    {/* Roll Mode (Normal / Advantage / Disadvantage) */}
                    <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700">
                        {['normal', 'advantage', 'disadvantage'].map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setRollMode(m)}
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-colors ${
                                    rollMode === m
                                        ? m === 'advantage'
                                            ? 'bg-emerald-600 text-white'
                                            : m === 'disadvantage'
                                                ? 'bg-rose-600 text-white'
                                                : 'bg-indigo-600 text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {m === 'normal' ? '1d20 Normal' : m === 'advantage' ? '2d20 Adv ▲' : '2d20 Dis ▼'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Tactical Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Weapon Attack */}
                    <button
                        type="button"
                        disabled={combat.actionUsed || !activeTarget}
                        onClick={() => activeTarget && onWeaponAttack(primaryWeapon, activeTarget, rollMode, useDivineSmite)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 text-white shadow-md transition-all flex items-center gap-1.5"
                    >
                        <span>⚔️</span>
                        <span>Attack with {primaryWeapon.name} ({primaryWeapon.damageDice})</span>
                    </button>

                    {/* Paladin Divine Smite Toggle */}
                    {character.class === 'paladin' && (
                        <button
                            type="button"
                            onClick={() => setUseDivineSmite(!useDivineSmite)}
                            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                useDivineSmite
                                    ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                                    : 'bg-slate-800 text-amber-300 border-amber-500/40'
                            }`}
                        >
                            ✨ Divine Smite (+2d8)
                        </button>
                    )}

                    {/* Quick Spells in Combat */}
                    {combatSpells.map((spell) => {
                        const isBonus = spell.castingTime === 'bonus';
                        const isDisabled = isBonus ? combat.bonusActionUsed : combat.actionUsed;
                        const slotKey = `level${spell.level}`;
                        const hasSlot = spell.level === 0 || (character.spellSlots?.[slotKey]?.current > 0);
                        return (
                            <button
                                key={spell.id}
                                type="button"
                                disabled={isDisabled || !hasSlot || (!activeTarget && spell.type !== 'heal' && spell.type !== 'buff')}
                                onClick={() => onCastCombatSpell(spell, activeTarget)}
                                className="px-3 py-2 rounded-xl text-xs font-semibold bg-purple-700/80 hover:bg-purple-600 disabled:opacity-35 text-purple-100 border border-purple-400/40 transition-all flex items-center gap-1"
                                title={`${spell.name} (${spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`}, ${spell.castingTime || 'action'})`}
                            >
                                <span>{spell.icon || '🔮'}</span>
                                <span>{spell.name}</span>
                                <span className="text-[10px] opacity-75">
                                    ({spell.level === 0 ? '0' : `L${spell.level}`})
                                </span>
                            </button>
                        );
                    })}

                    {/* Class Features (Second Wind, Action Surge, Rage, Sneak/Cunning Action, Turn Undead, etc.) */}
                    {activeFeatures.map((feat) => {
                        const isBonus = feat.actionType === 'bonus';
                        const isDisabled = (isBonus && combat.bonusActionUsed) || (feat.actionType === 'action' && combat.actionUsed);
                        return (
                            <button
                                key={feat.id || feat.name}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => onUseClassFeature(feat, activeTarget)}
                                className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-700/80 hover:bg-indigo-600 disabled:opacity-35 text-indigo-100 border border-indigo-400/40 transition-all"
                            >
                                ⚡ {feat.name}
                            </button>
                        );
                    })}

                    {/* Drink Healing Potion (Bonus Action in 2024 DMG/PHB!) */}
                    {healingPotion && (
                        <button
                            type="button"
                            disabled={combat.bonusActionUsed}
                            onClick={() => onDrinkPotion(healingPotion)}
                            className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-700/80 hover:bg-emerald-600 disabled:opacity-35 text-emerald-100 border border-emerald-400/40 transition-all"
                        >
                            🧪 Quaff {healingPotion.name} (Bonus)
                        </button>
                    )}

                    {/* Dodge Action */}
                    <button
                        type="button"
                        disabled={combat.actionUsed}
                        onClick={onDodgeAction}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 disabled:opacity-35 text-gray-200 border border-slate-500 transition-all"
                    >
                        🛡️ Dodge
                    </button>

                    {/* End Turn / Execute Party & Enemy Round */}
                    <button
                        type="button"
                        onClick={onEndTurn}
                        className="ml-auto px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg ring-2 ring-amber-300/50 transition-all flex items-center gap-1.5"
                    >
                        <span>⏭️</span>
                        <span>End Turn (Companions & Monsters Act)</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
