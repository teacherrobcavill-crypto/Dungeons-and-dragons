import React, { useState } from 'react';
import { getClassById } from '../../data/classes';
import { getSpellsForClass, getDefaultSpellsForClass } from '../../data/spells';
import { getMonsterImage } from '../../data/assets';
import { CONDITIONS_INFO } from '../../services/dndEngine';

export default function CombatEncounterHUD({
    combat,
    character,
    companions = [],
    equippedItems = [],
    inventory = [],
    isCombatResolving = false,
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
    const [openDropdown, setOpenDropdown] = useState(null); // 'offensive' | 'defensive' | 'potions' | null

    if (!combat || !combat.active) return null;

    const enemies = combat.enemies || [];
    const livingEnemies = enemies.filter((e) => e.hp > 0);
    const activeTarget = livingEnemies.find((e) => e.instanceId === selectedEnemyId) || livingEnemies[0] || null;
    const isMultiAttacker = enemies.length > 3;

    const cls = getClassById(character.class || 'fighter');
    const maxSpellLvl = character.level >= 5 ? 3 : character.level >= 3 ? 2 : 1;
    const classSpells = getSpellsForClass ? getSpellsForClass(character.class || 'wizard', maxSpellLvl) : [];
    const defaultSpells = getDefaultSpellsForClass ? getDefaultSpellsForClass(character.class || 'wizard', character.level || 1) : [];
    const characterSpells = character.spells || [];

    // Collect all available unique spells for this character
    const allSpellsMap = new Map();
    [...characterSpells, ...classSpells, ...defaultSpells].forEach((sp) => {
        if (sp && sp.id && !allSpellsMap.has(sp.id)) {
            allSpellsMap.set(sp.id, sp);
        }
    });
    const availableSpells = Array.from(allSpellsMap.values());

    const offensiveSpells = availableSpells.filter((s) =>
        s.type === 'attack' ||
        s.type === 'save' ||
        Boolean(s.damageDice) ||
        Boolean(s.damageType) ||
        s.conditionApplied === 'slowed' ||
        s.conditionApplied === 'paralyzed' ||
        s.conditionApplied === 'frightened' ||
        (s.name || '').toLowerCase().includes('fire') ||
        (s.name || '').toLowerCase().includes('blast') ||
        (s.name || '').toLowerCase().includes('bolt') ||
        (s.name || '').toLowerCase().includes('missile')
    );

    const defensiveSpells = availableSpells.filter(
        (s) => !offensiveSpells.some((o) => o.id === s.id)
    );

    const potionItems = (inventory || []).filter((i) =>
        i.quantity > 0 && (
            i.type === 'consumable' ||
            i.name?.toLowerCase().includes('potion') ||
            i.name?.toLowerCase().includes('elixir') ||
            Boolean(i.healDice)
        )
    );

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
        <div className="mx-2 sm:mx-4 mt-2 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-red-950/95 via-slate-900 to-slate-950 text-white border border-red-500/50 shadow-lg space-y-2 animate-fade-in">
            {/* Top Combat Banner */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-red-500/30 pb-1.5">
                <div className="flex items-center gap-2">
                    <span className="text-base animate-pulse">⚔️</span>
                    <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display font-bold text-xs sm:text-sm text-red-200 flex items-center gap-1.5">
                            <span>{combat.title}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-600/80 text-white uppercase tracking-wider font-mono">
                                Round {combat.round}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                {combat.difficulty} ({combat.xpReward} XP)
                            </span>
                        </h4>
                        {combat.terrainFeature && (
                            <span className="text-[10px] text-amber-200/80 hidden md:inline">
                                • 🌋 {combat.terrainFeature}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Party Combat Vitals Strip */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 border border-slate-700/80">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-amber-400">
                        <span>🛡️</span> Party Vitals
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {/* Player Card */}
                    <div className="p-1 sm:p-1.5 rounded-lg bg-amber-950/40 border border-amber-500/40 space-y-0.5">
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-amber-300 truncate">
                                👤 {character.name || 'You'}
                            </span>
                            <span className="font-mono text-amber-200 text-[9px] sm:text-[10px]">
                                {character.hp}/{character.maxHp}
                            </span>
                        </div>
                        <div className="h-1 sm:h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-300 ${
                                    (character.hp / character.maxHp) > 0.5 ? 'bg-emerald-500' : (character.hp / character.maxHp) > 0.25 ? 'bg-amber-500' : 'bg-rose-600'
                                }`}
                                style={{ width: `${Math.max(0, Math.min(100, (character.hp / character.maxHp) * 100))}%` }}
                            />
                        </div>
                    </div>

                    {/* Companions */}
                    {companions.map((comp, idx) => {
                        const compMaxHp = comp.maxHp || 18;
                        const compHp = comp.hp !== undefined ? comp.hp : compMaxHp;
                        const pct = Math.max(0, Math.min(100, (compHp / compMaxHp) * 100));
                        const isDown = compHp <= 0;
                        return (
                            <div
                                key={comp.id || idx}
                                className={`p-1 sm:p-1.5 rounded-lg border transition-all ${
                                    isDown
                                        ? 'bg-red-950/20 border-red-900/60 opacity-50'
                                        : 'bg-indigo-950/30 border-indigo-500/30'
                                } space-y-0.5`}
                            >
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="font-bold text-indigo-200 truncate">
                                        🛡️ {comp.name}
                                    </span>
                                    <span className={`font-mono text-[9px] sm:text-[10px] ${isDown ? 'text-red-400 font-bold' : 'text-indigo-200'}`}>
                                        {isDown ? 'Down' : `${compHp}/${compMaxHp}`}
                                    </span>
                                </div>
                                <div className="h-1 sm:h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${
                                            pct > 50 ? 'bg-indigo-400' : pct > 25 ? 'bg-amber-500' : 'bg-rose-600'
                                        }`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Enemy Target Cards (Stretching horizontally across all available space) */}
            <div className={`flex flex-wrap w-full ${isMultiAttacker ? 'gap-1.5' : 'gap-2'}`}>
                {enemies.map((enemy) => {
                    const isDead = enemy.hp <= 0;
                    const isTargeted = activeTarget?.instanceId === enemy.instanceId;
                    const hpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
                    const monsterImg = getMonsterImage(enemy.id || enemy.monsterId, enemy.name) || enemy.image;
                    return (
                        <div
                            key={enemy.instanceId}
                            onClick={() => !isDead && setSelectedEnemyId(enemy.instanceId)}
                            className={`flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 rounded-lg border transition-all cursor-pointer ${
                                isMultiAttacker ? 'p-1.5 sm:p-2' : 'p-2 sm:p-2.5'
                            } ${
                                isDead
                                    ? 'bg-slate-900/40 border-slate-800 opacity-45 cursor-not-allowed'
                                    : isTargeted
                                        ? 'bg-red-900/40 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                                        : 'bg-slate-800/70 border-slate-700 hover:border-red-400/60'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    {monsterImg ? (
                                        <div className={`${isMultiAttacker ? 'w-6 h-6' : 'w-7 h-7 sm:w-8 sm:h-8'} rounded-md overflow-hidden border border-red-500/40 shrink-0 bg-slate-950`}>
                                            <img
                                                src={monsterImg}
                                                alt={enemy.name}
                                                className={`w-full h-full object-cover ${isDead ? 'grayscale opacity-40' : ''}`}
                                            />
                                        </div>
                                    ) : (
                                        <span className={isMultiAttacker ? "text-sm" : "text-base"}>
                                            {isDead ? '💀' : enemy.icon || '👹'}
                                        </span>
                                    )}
                                    <div className="min-w-0">
                                        <p className={`font-bold text-white truncate leading-tight ${
                                            isMultiAttacker ? 'text-[11px]' : 'text-xs'
                                        }`}>
                                            {enemy.name}
                                        </p>
                                        <span className="text-[9px] text-gray-300">
                                            AC {enemy.ac} • CR {enemy.cr}
                                        </span>
                                    </div>
                                </div>
                                {isTargeted && !isDead && (
                                    <span className={`rounded bg-amber-500 text-slate-950 font-bold shrink-0 ${
                                        isMultiAttacker ? 'text-[8px] px-1 py-0.2' : 'text-[9px] px-1.5 py-0.5'
                                    }`}>
                                        TARGET 🎯
                                    </span>
                                )}
                            </div>

                            {/* Enemy HP Bar */}
                            <div className="space-y-0.5">
                                <div className="flex justify-between text-[9px]">
                                    <span className="text-gray-300">{isDead ? 'Defeated' : 'HP'}</span>
                                    <span className="font-mono font-bold text-red-200">
                                        {enemy.hp} / {enemy.maxHp}
                                    </span>
                                </div>
                                <div className={`${isMultiAttacker ? 'h-1' : 'h-1.5'} bg-slate-950 rounded-full overflow-hidden`}>
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
                                <div className="flex flex-wrap gap-0.5 mt-1">
                                    {enemy.conditions.map((cond) => (
                                        <span
                                            key={cond}
                                            className="px-1 py-0.2 rounded text-[8px] font-semibold bg-purple-600/70 text-purple-100 uppercase"
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
            <div className="pt-1.5 border-t border-red-500/30 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${combat.actionUsed ? 'bg-slate-800 text-gray-400 line-through' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>
                            ⚡ Action {combat.actionUsed ? 'Spent' : 'Ready'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${combat.bonusActionUsed ? 'bg-slate-800 text-gray-400 line-through' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                            ✨ Bonus {combat.bonusActionUsed ? 'Spent' : 'Ready'}
                        </span>
                    </div>

                    {/* Roll Mode */}
                    <div className="flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-lg border border-slate-700">
                        {['normal', 'advantage', 'disadvantage'].map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setRollMode(m)}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-semibold capitalize transition-colors ${
                                    rollMode === m
                                        ? m === 'advantage'
                                            ? 'bg-emerald-600 text-white'
                                            : m === 'disadvantage'
                                                ? 'bg-rose-600 text-white'
                                                : 'bg-indigo-600 text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {m === 'normal' ? 'Normal' : m === 'advantage' ? 'Adv ▲' : 'Dis ▼'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Tactical Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {/* Weapon Attack */}
                    <button
                        type="button"
                        disabled={isCombatResolving || combat.actionUsed || !activeTarget}
                        onClick={() => activeTarget && onWeaponAttack(primaryWeapon, activeTarget, rollMode, useDivineSmite)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 text-white shadow transition-all flex items-center gap-1 cursor-pointer"
                    >
                        <span>⚔️</span>
                        <span>Attack with {primaryWeapon.name} ({primaryWeapon.damageDice})</span>
                    </button>

                    {/* Paladin Divine Smite Toggle */}
                    {character.class === 'paladin' && (
                        <button
                            type="button"
                            disabled={isCombatResolving}
                            onClick={() => setUseDivineSmite(!useDivineSmite)}
                            className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                useDivineSmite
                                    ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                                    : 'bg-slate-800 text-amber-300 border-amber-500/40'
                            }`}
                        >
                            ✨ Smite (+2d8)
                        </button>
                    )}

                    {/* Class Features */}
                    {activeFeatures.map((feat) => {
                        const isBonus = feat.actionType === 'bonus';
                        const isDisabled = (isBonus && combat.bonusActionUsed) || (feat.actionType === 'action' && combat.actionUsed);
                        return (
                            <button
                                key={feat.id || feat.name}
                                type="button"
                                disabled={isCombatResolving || isDisabled}
                                onClick={() => onUseClassFeature(feat, activeTarget)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-700/80 hover:bg-indigo-600 disabled:opacity-35 text-indigo-100 border border-indigo-400/40 transition-all cursor-pointer"
                            >
                                ⚡ {feat.name}
                            </button>
                        );
                    })}

                    {/* Offensive Spells Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            disabled={isCombatResolving || offensiveSpells.length === 0}
                            onClick={() => setOpenDropdown(openDropdown === 'offensive' ? null : 'offensive')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                openDropdown === 'offensive'
                                    ? 'bg-red-700 text-white border-amber-300 ring-2 ring-amber-300/60 shadow-lg'
                                    : 'bg-red-950/70 hover:bg-red-900/80 text-red-100 border-red-500/40'
                            }`}
                        >
                            <span>⚔️</span>
                            <span>Offensive Spells ({offensiveSpells.length})</span>
                            <span className="text-[9px] opacity-75">{openDropdown === 'offensive' ? '▲' : '▼'}</span>
                        </button>
                        {openDropdown === 'offensive' && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setOpenDropdown(null)}
                                />
                                <div className="absolute left-0 bottom-full mb-1.5 z-40 w-72 sm:w-80 max-h-64 overflow-y-auto rounded-xl bg-slate-900/98 border border-red-500/60 shadow-2xl p-1.5 space-y-1 backdrop-blur-md">
                                    <div className="px-2 py-1 border-b border-red-500/20 text-[11px] font-bold text-red-300 flex justify-between items-center">
                                        <span>⚔️ Offensive Spells</span>
                                        <span className="text-[10px] text-gray-400 font-normal">Target: {activeTarget?.name || 'Nearest Foe'}</span>
                                    </div>
                                    {offensiveSpells.map((spell) => {
                                        const isBonus = spell.castingTime === 'bonus';
                                        const isActionLocked = isBonus ? combat.bonusActionUsed : combat.actionUsed;
                                        const slotKey = `level${spell.level}`;
                                        const hasSlot = spell.level === 0 || (character.spellSlots?.[slotKey]?.current > 0);
                                        const isDisabled = isCombatResolving || isActionLocked || !hasSlot || !activeTarget;

                                        return (
                                            <button
                                                key={spell.id}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => {
                                                    onCastCombatSpell(spell, activeTarget);
                                                    setOpenDropdown(null);
                                                }}
                                                className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between gap-2 border ${
                                                    isDisabled
                                                        ? 'bg-slate-950/40 border-slate-800 text-gray-500 cursor-not-allowed opacity-45'
                                                        : 'bg-slate-800/80 hover:bg-red-950/70 border-slate-700 hover:border-red-400 text-white cursor-pointer'
                                                }`}
                                            >
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span>{spell.icon || '🔥'}</span>
                                                        <span className="font-bold text-xs truncate">{spell.name}</span>
                                                        <span className="text-[9px] px-1 py-0.2 rounded bg-red-900/60 text-red-200">
                                                            {spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-gray-300 flex items-center gap-1.5 mt-0.5">
                                                        {spell.damageDice && (
                                                            <span className="font-mono text-amber-300 font-semibold">{spell.damageDice} {spell.damageType}</span>
                                                        )}
                                                        <span className="text-gray-400">• {isBonus ? 'Bonus' : 'Action'}</span>
                                                        {spell.level > 0 && (
                                                            <span className={character.spellSlots?.[slotKey]?.current > 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                                                                ({character.spellSlots?.[slotKey]?.current ?? 0} slots)
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] px-2 py-1 rounded bg-red-600/80 text-white font-bold shrink-0">
                                                    Cast
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Defensive Spells Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            disabled={isCombatResolving || defensiveSpells.length === 0}
                            onClick={() => setOpenDropdown(openDropdown === 'defensive' ? null : 'defensive')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                openDropdown === 'defensive'
                                    ? 'bg-purple-700 text-white border-amber-300 ring-2 ring-amber-300/60 shadow-lg'
                                    : 'bg-purple-950/70 hover:bg-purple-900/80 text-purple-100 border-purple-500/40'
                            }`}
                        >
                            <span>🛡️</span>
                            <span>Defensive Spells ({defensiveSpells.length})</span>
                            <span className="text-[9px] opacity-75">{openDropdown === 'defensive' ? '▲' : '▼'}</span>
                        </button>
                        {openDropdown === 'defensive' && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setOpenDropdown(null)}
                                />
                                <div className="absolute left-0 bottom-full mb-1.5 z-40 w-72 sm:w-80 max-h-64 overflow-y-auto rounded-xl bg-slate-900/98 border border-purple-500/60 shadow-2xl p-1.5 space-y-1 backdrop-blur-md">
                                    <div className="px-2 py-1 border-b border-purple-500/20 text-[11px] font-bold text-purple-300 flex justify-between items-center">
                                        <span>🛡️ Defensive & Support Spells</span>
                                        <span className="text-[10px] text-gray-400 font-normal">Target: Self / Party</span>
                                    </div>
                                    {defensiveSpells.map((spell) => {
                                        const isBonus = spell.castingTime === 'bonus';
                                        const isActionLocked = isBonus ? combat.bonusActionUsed : combat.actionUsed;
                                        const slotKey = `level${spell.level}`;
                                        const hasSlot = spell.level === 0 || (character.spellSlots?.[slotKey]?.current > 0);
                                        const isDisabled = isCombatResolving || isActionLocked || !hasSlot;

                                        return (
                                            <button
                                                key={spell.id}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => {
                                                    onCastCombatSpell(spell, null);
                                                    setOpenDropdown(null);
                                                }}
                                                className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between gap-2 border ${
                                                    isDisabled
                                                        ? 'bg-slate-950/40 border-slate-800 text-gray-500 cursor-not-allowed opacity-45'
                                                        : 'bg-slate-800/80 hover:bg-purple-950/70 border-slate-700 hover:border-purple-400 text-white cursor-pointer'
                                                }`}
                                            >
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span>{spell.icon || '✨'}</span>
                                                        <span className="font-bold text-xs truncate">{spell.name}</span>
                                                        <span className="text-[9px] px-1 py-0.2 rounded bg-purple-900/60 text-purple-200">
                                                            {spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-gray-300 flex items-center gap-1.5 mt-0.5">
                                                        {spell.healDice && (
                                                            <span className="font-mono text-emerald-300 font-semibold">{spell.healDice} Heal</span>
                                                        )}
                                                        {spell.acBonus && (
                                                            <span className="font-mono text-amber-300 font-semibold">+{spell.acBonus} AC</span>
                                                        )}
                                                        <span className="text-gray-400">• {isBonus ? 'Bonus' : 'Action'}</span>
                                                        {spell.level > 0 && (
                                                            <span className={character.spellSlots?.[slotKey]?.current > 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                                                                ({character.spellSlots?.[slotKey]?.current ?? 0} slots)
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] px-2 py-1 rounded bg-purple-600/80 text-white font-bold shrink-0">
                                                    Cast
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Potions & Consumables Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            disabled={isCombatResolving || potionItems.length === 0}
                            onClick={() => setOpenDropdown(openDropdown === 'potions' ? null : 'potions')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                openDropdown === 'potions'
                                    ? 'bg-emerald-700 text-white border-amber-300 ring-2 ring-amber-300/60 shadow-lg'
                                    : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 border-emerald-500/40'
                            }`}
                        >
                            <span>🧪</span>
                            <span>Potions ({potionItems.reduce((acc, p) => acc + (p.quantity || 1), 0)})</span>
                            <span className="text-[9px] opacity-75">{openDropdown === 'potions' ? '▲' : '▼'}</span>
                        </button>
                        {openDropdown === 'potions' && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setOpenDropdown(null)}
                                />
                                <div className="absolute left-0 bottom-full mb-1.5 z-40 w-72 sm:w-80 max-h-64 overflow-y-auto rounded-xl bg-slate-900/98 border border-emerald-500/60 shadow-2xl p-1.5 space-y-1 backdrop-blur-md">
                                    <div className="px-2 py-1 border-b border-emerald-500/20 text-[11px] font-bold text-emerald-300 flex justify-between items-center">
                                        <span>🧪 Potions & Consumables</span>
                                        <span className="text-[10px] text-gray-400 font-normal">Costs Bonus Action</span>
                                    </div>
                                    {potionItems.map((item) => {
                                        const isDisabled = isCombatResolving || combat.bonusActionUsed;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => {
                                                    onDrinkPotion(item);
                                                    setOpenDropdown(null);
                                                }}
                                                className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between gap-2 border ${
                                                    isDisabled
                                                        ? 'bg-slate-950/40 border-slate-800 text-gray-500 cursor-not-allowed opacity-45'
                                                        : 'bg-slate-800/80 hover:bg-emerald-950/70 border-slate-700 hover:border-emerald-400 text-white cursor-pointer'
                                                }`}
                                            >
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span>🧪</span>
                                                        <span className="font-bold text-xs truncate">{item.name}</span>
                                                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-900/60 text-emerald-200">
                                                            x{item.quantity}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-gray-300 flex items-center gap-1.5 mt-0.5">
                                                        <span className="font-mono text-emerald-300 font-semibold">
                                                            {item.healDice || (item.name?.toLowerCase().includes('greater') ? '4d4+4' : '2d4+2')} HP
                                                        </span>
                                                        <span className="text-gray-400">• Bonus Action</span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] px-2 py-1 rounded bg-emerald-600/80 text-white font-bold shrink-0">
                                                    Quaff
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Dodge Action */}
                    <button
                        type="button"
                        disabled={isCombatResolving || combat.actionUsed}
                        onClick={onDodgeAction}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 disabled:opacity-35 text-gray-200 border border-slate-500 transition-all cursor-pointer"
                    >
                        🛡️ Dodge
                    </button>

                    {/* End Turn */}
                    <button
                        type="button"
                        disabled={isCombatResolving}
                        onClick={onEndTurn}
                        className={`ml-auto px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isCombatResolving
                                ? 'bg-amber-700/60 text-amber-200 cursor-not-allowed opacity-75'
                                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md ring-1 ring-amber-300/50'
                        }`}
                    >
                        <span>{isCombatResolving ? '⏳' : '⏭️'}</span>
                        <span>{isCombatResolving ? 'Skirmish Unfolding...' : 'End Turn (Companions & Monsters Act)'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
