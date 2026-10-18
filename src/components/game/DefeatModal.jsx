import Button from '../common/Button';

export default function DefeatModal({
    isOpen,
    character,
    adventure,
    currentNode,
    cause = 'Succumbed to mortal wounds in battle.',
    onRevive,
    onRestartEncounter,
    onLoadSave,
    onNewCharacter
}) {
    if (!isOpen) return null;

    const charName = character?.name || 'Your Hero';
    const chamberTitle = currentNode?.title || 'Unknown Chamber';
    const adventureName = adventure?.name || 'The Dungeon Delve';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border-2 border-red-800/80 shadow-2xl shadow-red-950/80 overflow-hidden text-gray-100">
                {/* Ominous red top banner */}
                <div className="bg-gradient-to-r from-red-950 via-red-900 to-black px-6 py-5 border-b border-red-700/50 flex items-center gap-3">
                    <span className="text-3xl animate-pulse">💀</span>
                    <div>
                        <h2 className="text-2xl font-display font-extrabold text-red-100 tracking-wide">
                            YOU HAVE FALLEN
                        </h2>
                        <p className="text-xs text-red-300/80 font-mono">
                            0 Hit Points • Succumbed to the Dark
                        </p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Theatrical boxed narrative */}
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-sm leading-relaxed text-red-200/90 italic font-serif">
                        “The steel grows cold against your skin. Shadows gather at the edge of your vision, whispering forgotten names as the torchlight of {chamberTitle} flickers out. Your journey through {adventureName} has come to a perilous end...”
                    </div>

                    {/* Summary stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                        <div>
                            <span className="text-gray-400">Hero:</span>{' '}
                            <span className="font-semibold text-gray-200">{charName}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Class & Level:</span>{' '}
                            <span className="font-semibold text-amber-300 capitalize">
                                Level {character?.level || 1} {character?.class || 'Adventurer'}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-400">Last Stand:</span>{' '}
                            <span className="font-semibold text-gray-200">{chamberTitle}</span>
                        </div>
                        <div className="col-span-2 text-red-400/90 font-mono text-[11px]">
                            {cause}
                        </div>
                    </div>

                    {/* Action Choices */}
                    <div className="pt-2 space-y-2">
                        {/* 1. Heroic Second Wind / Revive */}
                        <button
                            type="button"
                            onClick={onRevive}
                            className="w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-lg shadow-amber-900/30 transition-all flex items-center justify-between cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <span>⚡</span>
                                <span>Heroic Second Wind (Revive with 50% HP)</span>
                            </span>
                            <span className="text-[11px] font-mono opacity-80">Continue Delve</span>
                        </button>

                        {/* 2. Restart Chamber Encounter */}
                        {onRestartEncounter && (
                            <button
                                type="button"
                                onClick={onRestartEncounter}
                                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-between cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <span>🔄</span>
                                    <span>Restart Current Chamber Encounter</span>
                                </span>
                                <span className="text-[10px] text-gray-400">Reset Foes & Party</span>
                            </button>
                        )}

                        {/* 3. Load Last Saved Game */}
                        {onLoadSave && (
                            <button
                                type="button"
                                onClick={onLoadSave}
                                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-950/60 hover:bg-indigo-900/70 text-indigo-200 border border-indigo-700/50 transition-all flex items-center justify-between cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <span>💾</span>
                                    <span>Load Last Saved Checkpoint</span>
                                </span>
                                <span className="text-[10px] text-indigo-400">Restore Save</span>
                            </button>
                        )}

                        {/* 4. Return to Character Setup */}
                        {onNewCharacter && (
                            <button
                                type="button"
                                onClick={onNewCharacter}
                                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-900/50 transition-all flex items-center justify-between cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <span>🗡️</span>
                                    <span>Start a New Character</span>
                                </span>
                                <span className="text-[10px] text-red-400">Begin Anew</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
