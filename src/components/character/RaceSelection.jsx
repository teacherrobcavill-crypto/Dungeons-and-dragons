import { races } from '../../data/races';
import Card from '../common/Card';

export default function RaceSelection({
    selectedRace,
    selected,
    selectedSubrace,
    onSelect,
    error
}) {
    const currentRaceId = selectedRace || selected;
    const activeRace = races.find((r) => r.id === currentRaceId) || null;

    const handleRaceClick = (race) => {
        const defaultSubrace = race.subraces?.[0]?.name || null;
        if (onSelect) {
            onSelect(race.id, defaultSubrace);
        }
    };

    const handleSubraceClick = (subraceName) => {
        if (onSelect && activeRace) {
            onSelect(activeRace.id, subraceName);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <span>🧝</span>
                    <span>Choose Your Race</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Each race brings ancient heritage, physical traits, and innate ability bonuses that shape your heroic journey.
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {/* Races Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {races.map((race) => {
                    const isSelected = currentRaceId === race.id;
                    const bonusSummary = Object.entries(race.statBonuses || {})
                        .map(([stat, val]) => `+${val} ${stat.slice(0, 3).toUpperCase()}`)
                        .join(', ');

                    return (
                        <div
                            key={race.id}
                            onClick={() => handleRaceClick(race)}
                            className={`group relative rounded-2xl p-4 sm:p-5 text-center transition-all duration-200 cursor-pointer border select-none ${
                                isSelected
                                    ? 'bg-amber-500/15 dark:bg-amber-500/20 border-amber-500 dark:border-amber-400 ring-4 ring-amber-500/30 shadow-xl shadow-amber-500/15 scale-[1.02]'
                                    : 'bg-white dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 hover:border-amber-400/60 dark:hover:border-amber-500/60 hover:shadow-md hover:scale-[1.01]'
                            }`}
                        >
                            {/* Selected Checkmark Badge */}
                            {isSelected && (
                                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wide shadow-sm flex items-center gap-1 animate-fade-in">
                                    <span>✓</span>
                                    <span>SELECTED</span>
                                </div>
                            )}

                            <div className="text-4xl sm:text-5xl mb-2.5 transition-transform group-hover:scale-110">
                                {race.icon}
                            </div>
                            <h3 className={`font-display font-bold text-base sm:text-lg mb-1 ${
                                isSelected ? 'text-amber-800 dark:text-amber-300' : 'text-gray-900 dark:text-white'
                            }`}>
                                {race.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2 leading-relaxed">
                                {race.description}
                            </p>

                            {/* Stat Bonus Tag */}
                            <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                                {bonusSummary || 'Flexible'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Race Deep-Dive & Subrace Selection */}
            {activeRace && (
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-800/95 border-2 border-amber-500/40 rounded-2xl shadow-md animate-fade-in space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{activeRace.icon}</span>
                            <div>
                                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                    <span>{activeRace.name}</span>
                                    <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                        {activeRace.size || 'Medium'} • {activeRace.speed || 30} ft Speed
                                    </span>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {activeRace.description}
                                </p>
                            </div>
                        </div>

                        {/* Trait Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {activeRace.darkvision > 0 && (
                                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                                    👁️ Darkvision {activeRace.darkvision} ft
                                </span>
                            )}
                            {activeRace.resistances?.map((res) => (
                                <span key={res} className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 capitalize">
                                    🛡️ {res} Resistance
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Subraces if available */}
                    {activeRace.subraces && activeRace.subraces.length > 0 && (
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-2">
                                Select Subrace / Lineage:
                            </span>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                {activeRace.subraces.map((subrace) => {
                                    const isSubSelected = (selectedSubrace || activeRace.subraces[0]?.name) === subrace.name;
                                    return (
                                        <button
                                            key={subrace.id || subrace.name}
                                            type="button"
                                            onClick={() => handleSubraceClick(subrace.name)}
                                            className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                                                isSubSelected
                                                    ? 'bg-amber-500/20 border-amber-500 text-gray-900 dark:text-white shadow-xs font-semibold ring-2 ring-amber-500/40'
                                                    : 'bg-gray-50 dark:bg-slate-900/60 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-amber-400/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="font-bold">{subrace.name}</span>
                                                {isSubSelected && <span className="text-amber-500 font-bold">✓</span>}
                                            </div>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                                {subrace.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Detailed Stats & Traits */}
                    <div className="grid md:grid-cols-2 gap-4 text-xs pt-1">
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700/60">
                            <span className="font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-1.5">
                                Stat Adjustments
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {Object.entries(activeRace.statBonuses || {}).map(([stat, bonus]) => (
                                    <span key={stat} className="px-2 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-semibold capitalize">
                                        +{bonus} {stat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700/60">
                            <span className="font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-1.5">
                                Racial Abilities
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {activeRace.traits?.map((trait) => (
                                    <span key={trait} className="px-2 py-1 rounded-md bg-gray-200/70 dark:bg-slate-700 text-gray-800 dark:text-gray-200 font-medium">
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
