import React from 'react';
import { soundService } from '../../services/soundService';

export default function VictoryModal({
    isOpen,
    character,
    adventure,
    companions = [],
    epilogue,
    onClose,
    onEmbarkNext
}) {
    if (!isOpen || !epilogue) return null;

    const charName = character?.name || 'Your Hero';
    const advName = adventure?.name || epilogue.adventureName || 'The Campaign';
    const survivingCompanions = (companions || []).filter((c) => !c.isDead && (c.hp !== undefined ? c.hp > 0 : true));
    const fallenCompanions = (companions || []).filter((c) => c.isDead || (c.hp !== undefined && c.hp <= 0));

    const handlePlayVoice = () => {
        if (epilogue.voiceTrack) {
            soundService.playVoice(epilogue.voiceTrack, null, true);
        } else {
            soundService.play('victory');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/60 border-2 border-amber-500/80 shadow-2xl shadow-amber-500/20 overflow-hidden text-gray-100">
                {/* Radiant Golden Victory Banner */}
                <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 px-5 sm:px-6 py-4 border-b border-amber-400/50 flex items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl animate-bounce">🏆</span>
                        <div>
                            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-950 bg-amber-300/90 px-2 py-0.5 rounded-full font-bold">
                                Campaign Victory
                            </span>
                            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wide drop-shadow-md">
                                {epilogue.title || 'CAMPAIGN CONQUERED!'}
                            </h2>
                        </div>
                    </div>

                    {epilogue.voiceTrack && (
                        <button
                            type="button"
                            onClick={handlePlayVoice}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-300/40 shadow transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                            title="Play dramatic voice narration"
                        >
                            <span>🔊</span>
                            <span className="hidden sm:inline">Play Voice</span>
                        </button>
                    )}
                </div>

                {/* Scrollable Content Body */}
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                    {/* Awarded Title Pill */}
                    {epilogue.awardedTitle && (
                        <div className="text-center py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/40">
                            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                                Mythic Honor Bestowed
                            </span>
                            <span className="font-display font-bold text-base sm:text-lg text-amber-200 drop-shadow-sm">
                                ✨ {epilogue.awardedTitle} ✨
                            </span>
                        </div>
                    )}

                    {/* Theatrical Epilogue Narrative */}
                    <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm leading-relaxed text-amber-100/95 font-serif space-y-2.5">
                        {epilogue.epilogueProse.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="italic">
                                “{paragraph}”
                            </p>
                        ))}
                    </div>

                    {/* Patron Reaction Bark */}
                    {epilogue.patronReaction && (
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-400/20 text-xs text-amber-200 font-sans">
                            <span className="font-bold text-amber-400 block mb-0.5">🗣️ Patron's Commendation:</span>
                            <span className="italic">{epilogue.patronReaction}</span>
                        </div>
                    )}

                    {/* Spoils of Victory & Campaign Loot */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <span>🎁</span> Spoils of Victory & Rewards
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-lg bg-slate-900 border border-amber-500/20 flex items-center gap-2">
                                <span className="text-lg">⭐</span>
                                <div>
                                    <span className="text-[10px] text-gray-400 block">Experience Award</span>
                                    <span className="font-bold text-amber-300">+{epilogue.bonusXp || 500} XP</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-900 border border-amber-500/20 flex items-center gap-2">
                                <span className="text-lg">💰</span>
                                <div>
                                    <span className="text-[10px] text-gray-400 block">Hoard Gold</span>
                                    <span className="font-bold text-amber-300">+{epilogue.bonusGold || 300} GP</span>
                                </div>
                            </div>
                        </div>

                        {epilogue.specialReward && (
                            <div className="p-2.5 rounded-lg bg-gradient-to-r from-purple-950/40 to-amber-950/40 border border-purple-500/40 flex items-center gap-2.5">
                                <span className="text-2xl shrink-0">{epilogue.specialReward.icon || '🏆'}</span>
                                <div className="min-w-0">
                                    <span className="font-bold text-xs text-amber-200 block truncate">
                                        {epilogue.specialReward.name}
                                    </span>
                                    <p className="text-[11px] text-gray-300 line-clamp-2">
                                        {epilogue.specialReward.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Party Survival & Hall of Fame */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                        <div className="flex justify-between items-center text-gray-400">
                            <span>Hero: <strong className="text-gray-200">{charName}</strong> (Level {character?.level || 1} {character?.class || 'Hero'})</span>
                            <span>Surviving Companions: <strong className="text-emerald-400">{survivingCompanions.length}</strong></span>
                        </div>
                        {survivingCompanions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {survivingCompanions.map((comp, idx) => (
                                    <span
                                        key={comp.id || idx}
                                        className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 font-medium"
                                    >
                                        🛡️ {comp.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        {fallenCompanions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {fallenCompanions.map((comp, idx) => (
                                    <span
                                        key={comp.id || idx}
                                        className="px-2 py-0.5 rounded-full text-[10px] bg-red-950/70 border border-red-500/40 text-red-300 line-through font-medium"
                                    >
                                        💀 {comp.name} (Fallen)
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Action Choices */}
                <div className="p-4 sm:p-5 bg-slate-950 border-t border-amber-500/30 flex flex-col sm:flex-row gap-2.5 justify-end shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 transition-all cursor-pointer text-center"
                    >
                        🏰 Keep Exploring This Delve
                    </button>
                    <button
                        type="button"
                        onClick={onEmbarkNext}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span>🗺️</span>
                        <span>Embark on Next Adventure</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
