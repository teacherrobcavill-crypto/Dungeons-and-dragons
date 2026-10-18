import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { getLoreQuestions, calculateStatsFromChoices } from '../../data/loreStatQuests.js';
import { getClassById } from '../../data/classes.js';
import { getRaceById } from '../../data/races.js';

const ABILITIES = [
    { id: 'strength', short: 'STR', name: 'Strength', icon: '💪', color: 'text-red-500 bg-red-500/10 border-red-500/30', barColor: 'bg-red-500', desc: 'Melee attacks, athletics, and raw physical power.' },
    { id: 'dexterity', short: 'DEX', name: 'Dexterity', icon: '🏹', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', barColor: 'bg-emerald-500', desc: 'Armor class, initiative, stealth, and agility.' },
    { id: 'constitution', short: 'CON', name: 'Constitution', icon: '🛡️', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30', barColor: 'bg-amber-500', desc: 'Max hit points, stamina, and concentration saves.' },
    { id: 'intelligence', short: 'INT', name: 'Intelligence', icon: '🔮', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30', barColor: 'bg-blue-500', desc: 'Arcana, investigation, memory, and wizard spellcraft.' },
    { id: 'wisdom', short: 'WIS', name: 'Wisdom', icon: '👁️', color: 'text-purple-500 bg-purple-500/10 border-purple-500/30', barColor: 'bg-purple-500', desc: 'Perception, insight, survival, and primal faith.' },
    { id: 'charisma', short: 'CHA', name: 'Charisma', icon: '👑', color: 'text-pink-500 bg-pink-500/10 border-pink-500/30', barColor: 'bg-pink-500', desc: 'Persuasion, deception, intimidation, and force of will.' }
];

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_DEFAULT = { strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 };
const POINT_BUY_COSTS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
const POINT_BUY_MAX = 27;

function roll4d6DropLowest() {
    const rolls = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
    ];
    rolls.sort((a, b) => b - a);
    return rolls[0] + rolls[1] + rolls[2];
}

export default function StatAllocation({
    stats = POINT_BUY_DEFAULT,
    onStatsChange,
    onChange,
    race = 'human',
    characterClass = 'fighter',
    raceBonuses = {}
}) {
    const updateStats = onStatsChange || onChange;

    // Default to 'lore' interactive questionnaire method
    const [method, setMethod] = useState('lore');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [chosenAnswers, setChosenAnswers] = useState({});
    const [loreResult, setLoreResult] = useState(null);

    // Standard array & point buy states
    const [standardAssignments, setStandardAssignments] = useState({});
    const [pointBuyStats, setPointBuyStats] = useState({ ...stats });
    const [rolledStats, setRolledStats] = useState(null);

    const questions = getLoreQuestions(race, characterClass);
    const raceObj = getRaceById(race);
    const classObj = getClassById(characterClass);

    // Initialize or compute stats when in lore mode
    useEffect(() => {
        if (method === 'lore') {
            const answerIds = questions.map((q, idx) => chosenAnswers[idx] || q.choices[0].id);
            const calculated = calculateStatsFromChoices(race, characterClass, answerIds);
            setLoreResult(calculated);
            if (updateStats) {
                updateStats(calculated.baseStats);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [race, characterClass, method]);

    const handleAnswerQuestion = (qIndex, choiceId) => {
        const nextAnswers = { ...chosenAnswers, [qIndex]: choiceId };
        setChosenAnswers(nextAnswers);

        const answerIds = questions.map((q, idx) => nextAnswers[idx] || q.choices[0].id);
        const calculated = calculateStatsFromChoices(race, characterClass, answerIds);
        setLoreResult(calculated);

        if (updateStats) {
            updateStats(calculated.baseStats);
        }

        // Advance to next question automatically if not at the end
        if (qIndex < questions.length - 1) {
            setCurrentQuestionIndex(qIndex + 1);
        }
    };

    const handleMethodChange = (newMethod) => {
        setMethod(newMethod);
        if (newMethod === 'lore') {
            const answerIds = questions.map((q, idx) => chosenAnswers[idx] || q.choices[0].id);
            const calculated = calculateStatsFromChoices(race, characterClass, answerIds);
            setLoreResult(calculated);
            updateStats?.(calculated.baseStats);
        } else if (newMethod === 'pointbuy') {
            updateStats?.(pointBuyStats);
        } else if (newMethod === 'standard') {
            applyStandardArray(standardAssignments);
        } else if (newMethod === 'roll' && rolledStats) {
            updateStats?.(rolledStats);
        }
    };

    const applyStandardArray = (assignments) => {
        const newStats = { ...POINT_BUY_DEFAULT };
        Object.entries(assignments).forEach(([ability, value]) => {
            if (value) newStats[ability] = value;
        });
        updateStats?.(newStats);
    };

    const handleStandardAssign = (ability, value) => {
        const newAssignments = { ...standardAssignments };
        Object.keys(newAssignments).forEach((key) => {
            if (newAssignments[key] === value) delete newAssignments[key];
        });
        newAssignments[ability] = value;
        setStandardAssignments(newAssignments);
        applyStandardArray(newAssignments);
    };

    const getPointsSpent = () => {
        return Object.values(pointBuyStats).reduce((total, val) => total + (POINT_BUY_COSTS[val] || 0), 0);
    };

    const handlePointBuyChange = (ability, delta) => {
        const current = pointBuyStats[ability] || 8;
        const newValue = current + delta;
        if (newValue < 8 || newValue > 15) return;

        const newStats = { ...pointBuyStats, [ability]: newValue };
        const newTotal = Object.values(newStats).reduce((t, v) => t + (POINT_BUY_COSTS[v] || 0), 0);
        if (newTotal > POINT_BUY_MAX) return;

        setPointBuyStats(newStats);
        updateStats?.(newStats);
    };

    const handleRollStats = () => {
        const rolled = {};
        ABILITIES.forEach((a) => {
            rolled[a.id] = roll4d6DropLowest();
        });
        setRolledStats(rolled);
        updateStats?.(rolled);
    };

    // Fine-tune stat in tree (+ / -)
    const handleFineTuneStat = (abilityId, delta) => {
        const currentBase = stats[abilityId] || 10;
        const newBase = Math.max(3, Math.min(18, currentBase + delta));
        const updated = { ...stats, [abilityId]: newBase };
        updateStats?.(updated);
    };

    const getModifier = (score) => {
        const mod = Math.floor((score - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    const getFinalStat = (abilityId) => {
        const base = stats[abilityId] || 10;
        const bonus = raceBonuses[abilityId] || 0;
        return base + bonus;
    };

    const currentQuestion = questions[currentQuestionIndex] || questions[0];

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <span>📊</span>
                    <span>Forge Your Ability Scores</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shape the physical, mental, and spiritual attributes that govern your rolls, spell power, and survival.
                </p>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                    { id: 'lore', icon: '📜', name: 'Lore Origin Trials', badge: 'RECOMMENDED' },
                    { id: 'pointbuy', icon: '⚖️', name: 'Custom Point Buy', badge: '27 PTS' },
                    { id: 'standard', icon: '📋', name: 'Standard Array', badge: 'CLASSIC' },
                    { id: 'roll', icon: '🎲', name: 'Roll 4d6', badge: 'RANDOM' }
                ].map((m) => {
                    const isSelected = method === m.id;
                    return (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => handleMethodChange(m.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                                isSelected
                                    ? 'bg-amber-500/15 dark:bg-amber-500/20 border-amber-500 text-gray-900 dark:text-white ring-2 ring-amber-500/30 font-semibold shadow-xs'
                                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-amber-400/50'
                            }`}
                        >
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-base">{m.icon}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                                    isSelected
                                        ? 'bg-amber-500 text-slate-950'
                                        : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
                                }`}>
                                    {m.badge}
                                </span>
                            </div>
                            <span className="text-xs font-bold block">{m.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* METHOD 1: INTERACTIVE LORE ORIGIN TRIALS */}
            {method === 'lore' && (
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-800/95 border-2 border-amber-500/40 rounded-2xl shadow-md space-y-5 animate-fade-in">
                    {/* Progress Bar & Question Step */}
                    <div>
                        <div className="flex items-center justify-between gap-2 text-xs mb-2">
                            <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                <span>Trial {currentQuestionIndex + 1} of {questions.length}:</span>
                                <span>{currentQuestion.category}</span>
                            </span>
                            <div className="flex items-center gap-1">
                                {questions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        className={`w-6 h-6 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                            currentQuestionIndex === idx
                                                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400/60 shadow-xs'
                                                : chosenAnswers[idx]
                                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                                                    : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {chosenAnswers[idx] && currentQuestionIndex !== idx ? '✓' : idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <h3 className="font-display font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-1.5">
                            {currentQuestion.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                            "{currentQuestion.prompt}"
                        </p>
                    </div>

                    {/* Question Choices */}
                    <div className="grid sm:grid-cols-2 gap-3">
                        {currentQuestion.choices.map((choice) => {
                            const isChosen = chosenAnswers[currentQuestionIndex] === choice.id;
                            const statBiasBadges = Object.entries(choice.statBias || {}).map(([s, b]) => `+${b} ${s.slice(0, 3).toUpperCase()}`);

                            return (
                                <button
                                    key={choice.id}
                                    type="button"
                                    onClick={() => handleAnswerQuestion(currentQuestionIndex, choice.id)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative group ${
                                        isChosen
                                            ? 'bg-amber-500/20 border-amber-500 text-gray-900 dark:text-white ring-2 ring-amber-500/40 shadow-sm'
                                            : 'bg-gray-50 dark:bg-slate-900/60 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-amber-400/60 hover:bg-amber-500/5'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                                            {isChosen && <span className="text-amber-500 font-bold">✓</span>}
                                            <span>{choice.label}</span>
                                        </h4>
                                        <div className="flex items-center gap-1">
                                            {statBiasBadges.map((badge) => (
                                                <span key={badge} className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                                        {choice.description}
                                    </p>

                                    {choice.quote && (
                                        <div className="text-[11px] font-mono italic opacity-75 text-amber-900 dark:text-amber-200">
                                            "{choice.quote}"
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Lore Archetype Banner */}
                    {loreResult && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">✨</span>
                                <div>
                                    <span className="font-bold text-amber-900 dark:text-amber-300 block">
                                        {loreResult.archetypeTitle}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400 text-[11px]">
                                        {loreResult.narrativeSummary}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setChosenAnswers({});
                                    setCurrentQuestionIndex(0);
                                }}
                                className="px-2.5 py-1 text-xs rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 shrink-0 cursor-pointer"
                                title="Reset questions and choices"
                            >
                                ↺ Restart Trials
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* METHOD 2: POINT BUY */}
            {method === 'pointbuy' && (
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-slate-700 text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                            Allocate 27 points. Scores range from 8 to 15 before race bonuses.
                        </span>
                        <span className={`px-3 py-1 rounded-full font-bold font-mono ${
                            getPointsSpent() <= POINT_BUY_MAX
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                : 'bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30'
                        }`}>
                            Points Remaining: {POINT_BUY_MAX - getPointsSpent()} / {POINT_BUY_MAX}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {ABILITIES.map((ability) => {
                            const val = pointBuyStats[ability.id] || 8;
                            return (
                                <div key={ability.id} className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
                                        <span>{ability.icon}</span>
                                        <span>{ability.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handlePointBuyChange(ability.id, -1)}
                                            disabled={val <= 8}
                                            className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 font-bold disabled:opacity-30 cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center font-bold text-sm font-mono text-gray-900 dark:text-white">
                                            {val}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handlePointBuyChange(ability.id, 1)}
                                            disabled={val >= 15 || getPointsSpent() >= POINT_BUY_MAX}
                                            className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 font-bold disabled:opacity-30 cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* METHOD 3: STANDARD ARRAY */}
            {method === 'standard' && (
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-4 animate-fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-slate-700 text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                            Assign standard scores [15, 14, 13, 12, 10, 8] across your abilities:
                        </span>
                        <div className="flex items-center gap-1 font-mono">
                            {STANDARD_ARRAY.map((v) => {
                                const used = Object.values(standardAssignments).includes(v);
                                return (
                                    <span
                                        key={v}
                                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                                            used
                                                ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 line-through'
                                                : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                        }`}
                                    >
                                        {v}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {ABILITIES.map((ability) => (
                            <div key={ability.id} className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
                                    <span>{ability.icon}</span>
                                    <span>{ability.name}</span>
                                </div>
                                <select
                                    value={standardAssignments[ability.id] || ''}
                                    onChange={(e) => handleStandardAssign(ability.id, parseInt(e.target.value) || 0)}
                                    className="px-2.5 py-1 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-mono font-bold"
                                >
                                    <option value="">--</option>
                                    {STANDARD_ARRAY.filter(
                                        (v) => !Object.values(standardAssignments).includes(v) || standardAssignments[ability.id] === v
                                    ).map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* METHOD 4: ROLL 4d6 */}
            {method === 'roll' && (
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 text-center space-y-4 animate-fade-in">
                    <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Roll 4 six-sided dice for each ability score, dropping the lowest roll. Classic tabletop risk and glory!
                    </p>
                    <Button variant="accent" onClick={handleRollStats} className="shadow-md">
                        🎲 Roll All 6 Ability Scores
                    </Button>
                </div>
            )}

            {/* THE INTERACTIVE D&D 5E STAT TREE & HEXAGON DISPLAY */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 space-y-5 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/80">
                    <div className="flex items-center gap-2.5">
                        <span className="text-2xl">🌳</span>
                        <div>
                            <h3 className="font-display font-bold text-base sm:text-lg flex items-center gap-2">
                                <span>Heroic Ability Tree</span>
                                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    {raceObj?.name || 'Race'} & {classObj?.name || 'Class'} Modifiers Active
                                </span>
                            </h3>
                            <p className="text-xs text-slate-400">
                                Click + / - to fine-tune individual attributes if desired.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 6 Stat Tree Nodes */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                    {ABILITIES.map((ability) => {
                        const base = stats[ability.id] || 10;
                        const raceBonus = raceBonuses[ability.id] || 0;
                        const total = base + raceBonus;
                        const mod = getModifier(total);
                        const isPrimary = classObj?.primaryAbility?.toLowerCase() === ability.id;

                        // Power bar percentage (8 to 20 range)
                        const barPercent = Math.min(100, Math.max(10, ((total - 8) / 12) * 100));

                        return (
                            <div
                                key={ability.id}
                                className={`relative rounded-xl p-3.5 sm:p-4 border transition-all ${
                                    isPrimary
                                        ? 'bg-amber-500/10 border-amber-500/60 ring-2 ring-amber-500/30'
                                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                                }`}
                            >
                                {/* Primary Star Badge */}
                                {isPrimary && (
                                    <div className="absolute top-2 right-2 px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">
                                        Primary
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{ability.icon}</span>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-sm text-slate-200">{ability.name}</span>
                                            <span className="text-[10px] font-mono text-slate-400 font-bold">({ability.short})</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 line-clamp-1">
                                            {ability.desc}
                                        </span>
                                    </div>
                                </div>

                                {/* Score & Modifier Display */}
                                <div className="flex items-baseline justify-between mb-2">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                                            {total}
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">
                                            ({base} base {raceBonus > 0 ? `+ ${raceBonus} race` : ''})
                                        </span>
                                    </div>

                                    <div className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs sm:text-sm">
                                        {mod} MOD
                                    </div>
                                </div>

                                {/* Visual Progress Bar */}
                                <div className="w-full bg-slate-950/80 rounded-full h-1.5 mb-2.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${ability.barColor}`}
                                        style={{ width: `${barPercent}%` }}
                                    />
                                </div>

                                {/* Fine-Tuning Controls */}
                                <div className="flex items-center justify-between pt-1 border-t border-slate-700/60 text-xs">
                                    <span className="text-[10px] text-slate-400">Fine-tune:</span>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleFineTuneStat(ability.id, -1)}
                                            className="w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 font-bold text-slate-200 flex items-center justify-center cursor-pointer text-xs"
                                            title="Decrease stat"
                                        >
                                            -
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleFineTuneStat(ability.id, 1)}
                                            className="w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 font-bold text-slate-200 flex items-center justify-center cursor-pointer text-xs"
                                            title="Increase stat"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
