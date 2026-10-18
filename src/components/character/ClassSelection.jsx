import { classes } from '../../data/classes';

export default function ClassSelection({
    selectedClass,
    selected,
    selectedSubclass,
    onSelect,
    error
}) {
    const currentClassId = selectedClass || selected;
    const activeClass = classes.find((c) => c.id === currentClassId) || null;

    const handleClassClick = (cls) => {
        const defaultSubclass = cls.subclasses?.[0]?.name || null;
        if (onSelect) {
            onSelect(cls.id, defaultSubclass);
        }
    };

    const handleSubclassClick = (subclassName) => {
        if (onSelect && activeClass) {
            onSelect(activeClass.id, subclassName);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <span>⚔️</span>
                    <span>Choose Your Class</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your class is your vocation, defining your martial discipline, spellcasting tradition, and role in the adventuring party.
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {/* Classes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {classes.map((cls) => {
                    const isSelected = currentClassId === cls.id;

                    return (
                        <div
                            key={cls.id}
                            onClick={() => handleClassClick(cls)}
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
                                {cls.icon}
                            </div>
                            <h3 className={`font-display font-bold text-base sm:text-lg mb-1 ${
                                isSelected ? 'text-amber-800 dark:text-amber-300' : 'text-gray-900 dark:text-white'
                            }`}>
                                {cls.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2 leading-relaxed">
                                {cls.description}
                            </p>

                            {/* Key Stats Pill */}
                            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700">
                                    {cls.hitDice}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 uppercase">
                                    {cls.primaryAbility?.slice(0, 3)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Class Deep-Dive & Subclass Selection */}
            {activeClass && (
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-800/95 border-2 border-amber-500/40 rounded-2xl shadow-md animate-fade-in space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{activeClass.icon}</span>
                            <div>
                                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                    <span>{activeClass.name}</span>
                                    <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                        Primary: <strong className="capitalize">{activeClass.primaryAbility}</strong>
                                    </span>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {activeClass.description}
                                </p>
                            </div>
                        </div>

                        {/* Quick Metrics */}
                        <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 font-semibold text-gray-800 dark:text-gray-200">
                                🎲 Hit Die: {activeClass.hitDice}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 font-semibold text-gray-800 dark:text-gray-200 capitalize">
                                🛡️ Saves: {activeClass.savingThrows?.join(', ')}
                            </span>
                        </div>
                    </div>

                    {/* Subclasses if available */}
                    {activeClass.subclasses && activeClass.subclasses.length > 0 && (
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-2">
                                Iconic Subclasses / Archetypes:
                            </span>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                {activeClass.subclasses.map((subclass) => {
                                    const isSubSelected = (selectedSubclass || activeClass.subclasses[0]?.name) === subclass.name;
                                    return (
                                        <button
                                            key={subclass.id || subclass.name}
                                            type="button"
                                            onClick={() => handleSubclassClick(subclass.name)}
                                            className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                                                isSubSelected
                                                    ? 'bg-amber-500/20 border-amber-500 text-gray-900 dark:text-white shadow-xs font-semibold ring-2 ring-amber-500/40'
                                                    : 'bg-gray-50 dark:bg-slate-900/60 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-amber-400/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="font-bold">{subclass.name}</span>
                                                {isSubSelected && <span className="text-amber-500 font-bold">✓</span>}
                                            </div>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                                {subclass.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Key Class Features Preview */}
                    {activeClass.classFeatures && activeClass.classFeatures.length > 0 && (
                        <div className="pt-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-2">
                                Early Class Features (Levels 1–3):
                            </span>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                {activeClass.classFeatures.slice(0, 3).map((feat) => (
                                    <div key={feat.id || feat.name} className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700/60">
                                        <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white mb-0.5">
                                            <span>{feat.name}</span>
                                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 capitalize font-mono">
                                                Lvl {feat.level}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {feat.description || feat.effect}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
