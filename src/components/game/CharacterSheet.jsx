import React, { useState } from 'react';
import { getRaceById } from '../../data/races';
import { getClassById } from '../../data/classes';
import { skills as allSkills, getSkillById } from '../../data/skills';
import { getCharacterAvatar, getRaceImage } from '../../data/assets';
import {
    calculateCharacterDerivedStats,
    formatMod,
    XP_THRESHOLDS,
    CONDITIONS_INFO
} from '../../services/dndEngine';
import LoreText from '../common/LoreText';

export default function CharacterSheet({
    character,
    companions = [],
    equippedItems = [],
    onHpChange,
    onLevelUp,
    onRollSkillCheck,
    onRemoveCondition
}) {
    const [showHeroLore, setShowHeroLore] = useState(false);
    const [expandedCompIndex, setExpandedCompIndex] = useState(null);

    const race = getRaceById(character.race);
    const cls = getClassById(character.class);
    const derived = calculateCharacterDerivedStats(character, cls, race, equippedItems);
    const avatarImg = getCharacterAvatar(character);

    const hpPercentage = Math.max(0, Math.min(100, ((character.hp || 0) / (character.maxHp || 10)) * 100));
    const hpColor = hpPercentage > 50 ? 'bg-emerald-500' : hpPercentage > 25 ? 'bg-amber-500' : 'bg-red-500';

    const currentLevel = character.level || 1;
    const currentXp = character.experience || 0;
    const nextLevelXp = XP_THRESHOLDS[currentLevel + 1] || 64000;
    const prevLevelXp = XP_THRESHOLDS[currentLevel] || 0;
    const xpProgress = Math.max(
        0,
        Math.min(100, ((currentXp - prevLevelXp) / Math.max(1, nextLevelXp - prevLevelXp)) * 100)
    );

    const proficientSaves = cls?.savingThrows || [];
    const heroStory = character.backstory || character.background || '';

    return (
        <div className="space-y-5">
            {/* Character Identity Header */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    {avatarImg ? (
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-400/50 shadow-lg bg-slate-900 shrink-0">
                            <img
                                src={avatarImg}
                                alt={character.name || 'Hero'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl shadow-lg shrink-0">
                            {race?.icon || cls?.icon || '👤'}
                        </div>
                    )}
                    <div>
                        <h3 className="font-display font-bold text-base text-gray-900 dark:text-white">
                            {character.name || 'Hero'}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Level {currentLevel} {character.subrace || race?.name || 'Human'} {cls?.name || 'Adventurer'}
                        </p>
                        {character.subclass && (
                            <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium">
                                {character.subclass}
                            </span>
                        )}
                    </div>
                </div>

                {onLevelUp && currentLevel < 10 && (
                    <button
                        type="button"
                        onClick={() => onLevelUp(cls?.hitDieValue ? Math.floor(cls.hitDieValue / 2) + 1 : 6)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-sm transition-all"
                        title="Advance to next character level"
                    >
                        ⬆️ Level Up
                    </button>
                )}
            </div>

            {/* Hero Chronicle, Quirk & Secret Drawer */}
            {(heroStory || character.quirk || character.secret || character.personalQuest) && (
                <div className="rounded-xl bg-amber-50/70 dark:bg-slate-800/90 border border-amber-200/80 dark:border-slate-700 overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setShowHeroLore(!showHeroLore)}
                        className="w-full px-3 py-2 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-slate-700/60 transition-colors"
                    >
                        <span>📖 Hero Chronicle, Quirk & Secret</span>
                        <span>{showHeroLore ? '▲ Hide' : '▼ Read'}</span>
                    </button>
                    {showHeroLore && (
                        <div className="px-3 pb-3 pt-1 space-y-2 text-xs text-gray-700 dark:text-gray-300 border-t border-amber-200/50 dark:border-slate-700">
                            {character.voiceQuote && (
                                <p className="italic text-amber-800 dark:text-amber-300 font-medium">
                                    "{character.voiceQuote}"
                                </p>
                            )}
                            {heroStory && (
                                <div className="space-y-1.5 whitespace-pre-line leading-relaxed text-[11px]">
                                    <LoreText text={heroStory} />
                                </div>
                            )}
                            {character.quirk && (
                                <p className="text-[11px]">
                                    <span className="font-bold text-indigo-700 dark:text-indigo-300">🎭 Quirk: </span>
                                    {character.quirk}
                                </p>
                            )}
                            {character.secret && (
                                <p className="text-[11px]">
                                    <span className="font-bold text-rose-700 dark:text-rose-300">🤫 Secret: </span>
                                    {character.secret}
                                </p>
                            )}
                            {character.personalQuest && (
                                <p className="text-[11px]">
                                    <span className="font-bold text-emerald-700 dark:text-emerald-300">🧭 Personal Quest: </span>
                                    {character.personalQuest}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* XP Progress Bar */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200/70 dark:border-slate-700">
                <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Experience (XP)</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        {currentXp} / {nextLevelXp} XP
                    </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                        style={{ width: `${xpProgress}%` }}
                    />
                </div>
            </div>

            {/* Core 5e Combat Vitals Grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block">AC</span>
                    <span className="text-base font-bold text-indigo-700 dark:text-indigo-300">🛡️ {derived.ac}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200/60 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block">Init</span>
                    <span className="text-base font-bold text-amber-700 dark:text-amber-300">
                        ⚡ {formatMod(derived.initiativeMod)}
                    </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200/60 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block">Prof</span>
                    <span className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                        +{derived.proficiencyBonus}
                    </span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-slate-800 border border-purple-200/60 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block">Pass. Perc</span>
                    <span className="text-base font-bold text-purple-700 dark:text-purple-300">
                        👁️ {derived.passivePerception}
                    </span>
                </div>
            </div>

            {/* Hit Points Bar */}
            <div className="bg-gray-50 dark:bg-slate-700/80 p-3.5 rounded-xl border border-gray-200/60 dark:border-slate-600">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">❤️ Hit Points</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {character.hp} / {character.maxHp}
                    </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${hpColor} transition-all duration-300`}
                        style={{ width: `${hpPercentage}%` }}
                    />
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                    <button
                        type="button"
                        onClick={() => onHpChange(-5)}
                        className="py-1 text-xs font-semibold bg-red-100 dark:bg-red-900/40 hover:bg-red-200 text-red-700 dark:text-red-300 rounded-lg transition-colors"
                    >
                        -5 HP
                    </button>
                    <button
                        type="button"
                        onClick={() => onHpChange(-1)}
                        className="py-1 text-xs font-semibold bg-red-100 dark:bg-red-900/40 hover:bg-red-200 text-red-700 dark:text-red-300 rounded-lg transition-colors"
                    >
                        -1 HP
                    </button>
                    <button
                        type="button"
                        onClick={() => onHpChange(1)}
                        className="py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 rounded-lg transition-colors"
                    >
                        +1 HP
                    </button>
                    <button
                        type="button"
                        onClick={() => onHpChange(5)}
                        className="py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 rounded-lg transition-colors"
                    >
                        +5 HP
                    </button>
                </div>
            </div>

            {/* Active Conditions */}
            {character.conditions?.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Active Conditions & Buffs
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {character.conditions.map((cond) => {
                            const info = CONDITIONS_INFO[cond] || { name: cond, icon: '⚡', effect: '' };
                            return (
                                <button
                                    key={cond}
                                    type="button"
                                    onClick={() => onRemoveCondition && onRemoveCondition(cond)}
                                    title={`${info.effect} (Click to clear)`}
                                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex items-center gap-1"
                                >
                                    <span>{info.icon}</span>
                                    <span className="capitalize">{info.name}</span>
                                    <span className="opacity-60 ml-0.5">×</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 6 Ability Scores + Modifiers + Saving Throws */}
            <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    Ability Scores & Saving Throws (★ = Proficient)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(character.stats || {}).map(([ability, score]) => {
                        const mod = derived.mods[ability] || 0;
                        const isSaveProf = proficientSaves.includes(ability);
                        const saveMod = mod + (isSaveProf ? derived.proficiencyBonus : 0);
                        return (
                            <div
                                key={ability}
                                className="text-center p-2.5 bg-gray-50 dark:bg-slate-700/80 rounded-xl border border-gray-200/60 dark:border-slate-600"
                            >
                                <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 block">
                                    {ability.slice(0, 3)} {isSaveProf ? '★' : ''}
                                </span>
                                <p className="text-base font-bold text-gray-900 dark:text-white">{score}</p>
                                <div className="flex items-center justify-center gap-1.5 text-xs mt-0.5">
                                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                                        {formatMod(mod)}
                                    </span>
                                    <span className="text-[10px] text-gray-400">|</span>
                                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium" title="Saving Throw">
                                        Save {formatMod(saveMod)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Skills List (Click to Roll Check) */}
            <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    Skills (Click Any Skill to Roll d20 Check)
                </h4>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {(allSkills || []).map((skill) => {
                        const isProf = (character.skills || []).includes(skill.id);
                        const abilityMod = derived.mods[skill.ability] || 0;
                        const totalBonus = abilityMod + (isProf ? derived.proficiencyBonus : 0);
                        return (
                            <button
                                key={skill.id}
                                type="button"
                                onClick={() => onRollSkillCheck && onRollSkillCheck(skill, totalBonus)}
                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                                    isProf
                                        ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 font-semibold border border-primary-200 dark:border-primary-800'
                                        : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                }`}
                            >
                                <span className="truncate">
                                    {isProf ? '● ' : '○ '}
                                    {skill.name}
                                </span>
                                <span className="font-mono font-bold ml-1">{formatMod(totalBonus)}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Party Companions Summary (Click to Expand Backstory & Secrets) */}
            {companions?.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Party Companions ({companions.length}) — Click for Lore
                    </h4>
                    <div className="space-y-2">
                        {companions.map((comp, idx) => {
                            const isExpanded = expandedCompIndex === idx;
                            const compImg = getRaceImage(comp.race);
                            return (
                                <div
                                    key={idx}
                                    className="rounded-xl bg-gray-50 dark:bg-slate-700/70 border border-gray-200/70 dark:border-slate-600 overflow-hidden text-xs"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setExpandedCompIndex(isExpanded ? null : idx)}
                                        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-gray-100/70 dark:hover:bg-slate-600/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            {compImg ? (
                                                <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-400/40 shadow-xs bg-slate-900 shrink-0">
                                                    <img src={compImg} alt={comp.name} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <span className="text-xl shrink-0">{comp.icon || '🛡️'}</span>
                                            )}
                                            <div>
                                                <p className={`font-bold ${comp.isDead || (comp.hp !== undefined && comp.hp <= 0) ? 'text-red-600 dark:text-red-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                                    {comp.isDead || (comp.hp !== undefined && comp.hp <= 0) ? '💀 ' : ''}{comp.name}
                                                </p>
                                                <p className="text-[11px] text-gray-500 dark:text-gray-400 capitalize">
                                                    {comp.race} {comp.class} • {comp.personality} • {comp.isDead || (comp.hp !== undefined && comp.hp <= 0) ? (
                                                        <span className="font-mono text-red-600 dark:text-red-400 font-bold">DEAD (0 HP)</span>
                                                    ) : (
                                                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{comp.hp !== undefined ? comp.hp : (comp.maxHp || 18)}/{comp.maxHp || 18} HP</span>
                                                    )} • AC {comp.ac || 13}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold shrink-0">
                                            {isExpanded ? '▲ Hide' : '▼ Story'}
                                        </span>
                                    </button>
                                    {isExpanded && (
                                        <div className="px-3 pb-3 pt-1.5 border-t border-gray-200/60 dark:border-slate-600 space-y-1.5 text-[11px] text-gray-700 dark:text-gray-300">
                                            {comp.battleCry && (
                                                <p className="italic text-amber-700 dark:text-amber-300 font-medium">
                                                    "{comp.battleCry}"
                                                </p>
                                            )}
                                            {comp.backstory && (
                                                <div className="whitespace-pre-line leading-relaxed">
                                                    <LoreText text={comp.backstory} />
                                                </div>
                                            )}
                                            {comp.quirk && (
                                                <p>
                                                    <span className="font-bold text-indigo-600 dark:text-indigo-300">🎭 Quirk: </span>
                                                    {comp.quirk}
                                                </p>
                                            )}
                                            {comp.secret && (
                                                <p>
                                                    <span className="font-bold text-rose-600 dark:text-rose-300">🤫 Secret: </span>
                                                    {comp.secret}
                                                </p>
                                            )}
                                            {comp.personalQuest && (
                                                <p>
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-300">🧭 Quest: </span>
                                                    {comp.personalQuest}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Racial Traits */}
            {race?.traits && (
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Racial Traits ({race.name})
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {race.traits.map((trait) => (
                            <li key={trait} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                                {trait}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
