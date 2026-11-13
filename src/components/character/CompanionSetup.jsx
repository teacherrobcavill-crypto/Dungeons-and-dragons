import { useState } from 'react';
import { races } from '../../data/races';
import { classes } from '../../data/classes';
import { getCompanionAvatar, getRaceImage } from '../../data/assets';
import Input from '../common/Input';
import Button from '../common/Button';

const DEFAULT_COMPANION = { name: '', race: '', class: '', personality: '' };

export default function CompanionSetup({
    companions = [],
    onCompanionsChange,
    onChange,
    error
}) {
    const updateCompanions = onCompanionsChange || onChange || (() => {});
    const [activeIndex, setActiveIndex] = useState(0);

    const list = Array.isArray(companions) ? companions : [];
    const currentCompanions = list.length === 3
        ? list.map((c) => ({ ...DEFAULT_COMPANION, ...(c || {}) }))
        : [
            { name: 'Aria', race: 'elf', class: 'wizard', personality: 'Wise' },
            { name: 'Thorin', race: 'dwarf', class: 'cleric', personality: 'Grumpy' },
            { name: 'Vex', race: 'halfling', class: 'rogue', personality: 'Mischievous' }
        ];

    const updateCompanion = (index, field, value) => {
        const updated = [...currentCompanions];
        updated[index] = { ...updated[index], [field]: value };
        updateCompanions(updated);
    };

    const randomizeName = (index) => {
        const names = [
            'Althea', 'Brom', 'Celeste', 'Dorian', 'Elena', 'Finn',
            'Gwen', 'Hugo', 'Iris', 'Jasper', 'Kira', 'Leo',
            'Mira', 'Nolan', 'Ophelia', 'Percy', 'Quinn', 'Rowan'
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        updateCompanion(index, 'name', randomName);
    };

    const randomizeCompanion = (index) => {
        const randomRace = races[Math.floor(Math.random() * races.length)];
        const randomClass = classes[Math.floor(Math.random() * classes.length)];
        const personalities = ['Cheerful', 'Stoic', 'Sarcastic', 'Wise', 'Impulsive', 'Cautious'];
        const randomPersonality = personalities[Math.floor(Math.random() * personalities.length)];

        const names = ['Althea', 'Brom', 'Celeste', 'Dorian', 'Elena', 'Finn', 'Gwen', 'Hugo'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const updated = [...currentCompanions];
        updated[index] = {
            name: randomName,
            race: randomRace?.id || 'human',
            class: randomClass?.id || 'fighter',
            personality: randomPersonality
        };
        updateCompanions(updated);
    };

    const activeCompanion = currentCompanions[activeIndex] || DEFAULT_COMPANION;

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <span>👥</span>
                    <span>Form Your Party of Companions</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    You do not journey alone. Choose up to 3 companions with distinct personalities and abilities to fight alongside you.
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {/* Companion Tabs */}
            <div className="flex gap-2">
                {[0, 1, 2].map((index) => {
                    const companion = currentCompanions[index] || DEFAULT_COMPANION;
                    const isComplete = Boolean(companion.name && companion.race && companion.class);
                    const isTabActive = activeIndex === index;

                        const compPortrait = getCompanionAvatar(companion);
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`flex-1 p-3 sm:p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                    isTabActive
                                        ? 'border-amber-500 bg-amber-500/15 dark:bg-amber-500/20 text-gray-900 dark:text-white ring-2 ring-amber-500/30'
                                        : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-400/50'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    {compPortrait && (
                                        <img
                                            src={compPortrait}
                                            alt={companion.name || `Companion ${index + 1}`}
                                            className="w-8 h-8 rounded-lg object-cover border border-amber-400/50 shrink-0"
                                        />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-1">
                                            <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                                                {companion.name || `Companion ${index + 1}`}
                                            </span>
                                            {isComplete && (
                                                <span className="text-amber-500 font-bold text-xs">✓</span>
                                            )}
                                        </div>
                                        {companion.race && companion.class && (
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                                {races.find((r) => r.id === companion.race)?.name || companion.race}{' '}
                                                {classes.find((c) => c.id === companion.class)?.name || companion.class}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Active Companion Form */}
                <div className="bg-white dark:bg-slate-800/95 border border-gray-200 dark:border-slate-700 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                            {getCompanionAvatar(activeCompanion) && (
                                <img
                                    src={getCompanionAvatar(activeCompanion)}
                                    alt={activeCompanion.name || 'Companion'}
                                    className="w-9 h-9 rounded-lg object-cover border border-amber-400/50"
                                />
                            )}
                            <span>Companion {activeIndex + 1} Profile</span>
                        </h3>
                        <Button variant="secondary" size="sm" onClick={() => randomizeCompanion(activeIndex)}>
                            🎲 Randomize
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                label="Name"
                                placeholder="Enter companion name"
                                value={activeCompanion.name || ''}
                                onChange={(e) => updateCompanion(activeIndex, 'name', e.target.value)}
                                className="flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => randomizeName(activeIndex)}
                                className="self-end px-4 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-colors cursor-pointer text-lg"
                                title="Random name"
                            >
                                🎲
                            </button>
                        </div>

                        <div>
                            <label className="label dark:text-gray-300 text-xs font-bold uppercase tracking-wider block mb-1.5">
                                Race
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                                {races.map((race) => {
                                    const isSelected = activeCompanion.race === race.id;
                                    const raceImg = getRaceImage(race.id);
                                    return (
                                        <button
                                            key={race.id}
                                            type="button"
                                            onClick={() => updateCompanion(activeIndex, 'race', race.id)}
                                            className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                                                isSelected
                                                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs'
                                                    : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:border-amber-400/50'
                                            }`}
                                        >
                                            {raceImg ? (
                                                <img
                                                    src={raceImg}
                                                    alt={race.name}
                                                    className="w-9 h-9 mx-auto rounded-lg object-cover border border-amber-400/40"
                                                />
                                            ) : (
                                                <span className="text-xl block">{race.icon}</span>
                                            )}
                                            <p className="text-[10px] mt-0.5 truncate">{race.name}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="label dark:text-gray-300 text-xs font-bold uppercase tracking-wider block mb-1.5">
                                Class
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                                {classes.map((cls) => {
                                    const isSelected = activeCompanion.class === cls.id;
                                    return (
                                        <button
                                            key={cls.id}
                                            type="button"
                                            onClick={() => updateCompanion(activeIndex, 'class', cls.id)}
                                            className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                                                isSelected
                                                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs'
                                                    : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:border-amber-400/50'
                                            }`}
                                        >
                                            <span className="text-lg block">{cls.icon}</span>
                                            <p className="text-[10px] mt-0.5 truncate">{cls.name}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <Input
                            label="Personality / Demeanor"
                            placeholder="e.g., Cheerful, Stoic, Sarcastic, Wise, Impulsive..."
                            value={activeCompanion.personality || ''}
                            onChange={(e) => updateCompanion(activeIndex, 'personality', e.target.value)}
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2">
                        Current Adventuring Party
                    </h4>
                    <div className="flex gap-3">
                        {currentCompanions.map((comp, index) => {
                            const race = races.find((r) => r.id === comp.race);
                            const cls = classes.find((c) => c.id === comp.class);
                            const portrait = getCompanionAvatar(comp);
                            return (
                                <div key={index} className="flex-1 text-center p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-amber-500/20">
                                    {portrait ? (
                                        <img
                                            src={portrait}
                                            alt={comp.name || `Companion ${index + 1}`}
                                            className="w-11 h-11 mx-auto mb-1 rounded-xl object-cover border border-amber-400/50 shadow-xs"
                                        />
                                    ) : (
                                        <div className="text-2xl mb-1">{race?.icon || '👤'}</div>
                                    )}
                                    <p className="font-bold text-xs text-gray-900 dark:text-white truncate">
                                        {comp.name || `Companion ${index + 1}`}
                                    </p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                        {race?.name || 'Race'} • {cls?.name || 'Class'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
    );
}
