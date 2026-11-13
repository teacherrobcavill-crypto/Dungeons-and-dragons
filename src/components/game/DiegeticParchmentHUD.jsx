import React, { useState, useEffect } from 'react';
import DungeonAutomap from './DungeonAutomap';
import PolyhedralDice3D from './PolyhedralDice3D';
import soundService from '../../services/soundService';
import { getCharacterAvatar, getCompanionAvatar } from '../../data/assets';

function getCardinalName(yaw = 0) {
    const norm = Math.atan2(Math.sin(yaw), Math.cos(yaw));
    const deg = Math.round((-norm * 180) / Math.PI);
    const wrapped = ((deg % 360) + 360) % 360;
    if (wrapped >= 315 || wrapped < 45) return 'NORTH';
    if (wrapped >= 45 && wrapped < 135) return 'EAST';
    if (wrapped >= 135 && wrapped < 225) return 'SOUTH';
    return 'WEST';
}

export default function DiegeticParchmentHUD({
    adventure,
    currentNode,
    currentChamber,
    character,
    companions = [],
    derivedStats,
    visitedNodes = [],
    defeatedNodes = [],
    lootedNodes = [],
    searchedNodes = [],
    completedChoices = [],
    inCombat = false,
    cameraMode = 'firstPerson',
    onToggleCameraMode,
    playerGridPos = { gridX: 3, gridZ: 5, yaw: 0 },
    onStepMove,
    onStepRotate,
    onSelectNode,
    onSelectChoice,
    onTriggerEncounter,
    onLootRoom,
    onManualRoll,
    onReturnToStory
}) {
    const isDesktopDefault = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
    const [showDiceTray, setShowDiceTray] = useState(false);
    const [showMinimap, setShowMinimap] = useState(isDesktopDefault);
    const [showMobileStepper, setShowMobileStepper] = useState(false);
    const [ambientActive, setAmbientActive] = useState(Boolean(soundService.ambientEnabled));

    useEffect(() => {
        const unsub = soundService.subscribeAmbientState?.((st) => {
            setAmbientActive(Boolean(st.ambientEnabled));
        });
        return () => unsub?.();
    }, []);

    const exits = currentChamber?.exits || [];
    const visibleExits = exits.filter(
        (ex) => !ex.hiddenUntilSearched || searchedNodes.includes(currentNode?.id)
    );
    const actionChoices = (currentNode?.choices || []).filter((c) => c.type !== 'move');

    const hasUndefeatedEncounter =
        Boolean(currentNode?.encounter) &&
        !defeatedNodes.includes(currentNode?.id) &&
        !inCombat;

    const hasUnlootedTreasure =
        Boolean(currentNode?.loot) &&
        ((currentNode.loot.gold || 0) > 0 || (currentNode.loot.items || []).length > 0) &&
        !lootedNodes.includes(currentNode?.id) &&
        (!currentNode?.encounter || defeatedNodes.includes(currentNode?.id));

    const facingName = getCardinalName(playerGridPos.yaw);
    const envTheme = currentNode?.environment || adventure?.ambientTrack || 'dungeon';
    const heroAvatar = getCharacterAvatar(character);

    const handleToggleAmbient = () => {
        soundService.toggleAmbient(envTheme);
    };

    return (
        <div
            data-testid="diegetic-parchment-hud"
            className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-2 sm:p-3 select-none overflow-hidden"
        >
            {/* Top Row: Chamber Banner + Return to Story & Camera Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-1.5 sm:gap-2">
                {/* Top-Left: Compact Scene Plaque & Party Portrait Chips */}
                <div className="pointer-events-auto max-w-[235px] sm:max-w-[330px] rounded-xl border border-amber-500/75 bg-slate-950/82 px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-2xl backdrop-blur-md text-amber-100">
                    <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400 truncate">
                            📍 {envTheme.toUpperCase()} • Act {currentNode?.act || 1}
                        </span>
                        <span
                            data-testid="hud-compass-badge"
                            className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-900/80 text-amber-200 border border-amber-500/50 shrink-0"
                        >
                            🧭 {facingName.slice(0, 1)} ({playerGridPos.gridX},{playerGridPos.gridZ})
                        </span>
                    </div>
                    <h2
                        data-testid="hud-chamber-title"
                        className="font-display font-extrabold text-xs sm:text-sm text-white mt-0.5 truncate"
                    >
                        {currentNode?.title || 'Uncharted Scene'}
                    </h2>

                    {/* Party Portrait + HP Pills */}
                    <div className="mt-1 pt-1 border-t border-amber-500/25 flex flex-wrap items-center gap-1 text-[10px] font-bold">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-950/85 text-red-100 border border-red-500/40">
                            {heroAvatar ? (
                                <img src={heroAvatar} alt={character?.name || 'Hero'} className="w-3.5 h-3.5 rounded-full object-cover" />
                            ) : (
                                <span>❤️</span>
                            )}
                            <span>{character?.hp}/{character?.maxHp}</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-800/90 text-amber-200 border border-amber-600/40">
                            🛡️ {derivedStats?.ac || 14}
                        </span>
                        {companions.slice(0, 2).map((comp) => {
                            const compImg = getCompanionAvatar(comp);
                            const isDead = comp.isDead || comp.hp <= 0;
                            return (
                                <span
                                    key={comp.id || comp.name}
                                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] border ${
                                        isDead
                                            ? 'bg-red-950/80 text-red-300 border-red-700 line-through'
                                            : 'bg-indigo-950/85 text-indigo-200 border-indigo-500/40'
                                    }`}
                                >
                                    {compImg && <img src={compImg} alt={comp.name} className="w-3.5 h-3.5 rounded-full object-cover" />}
                                    <span>{comp.name.split(' ')[0]} {comp.hp}/{comp.maxHp}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Top-Right: Return to Story, Camera Mode, Audio, Dice, Minimap */}
                <div className="pointer-events-auto flex flex-col items-end gap-1.5 ml-auto">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                        {onReturnToStory && (
                            <button
                                type="button"
                                data-testid="return-to-story-btn"
                                onClick={onReturnToStory}
                                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-[11px] sm:text-xs font-black shadow-lg border border-amber-200 flex items-center gap-1 active:scale-95 transition-all"
                                title="Return to Story Text & Options"
                            >
                                <span>📜</span>
                                <span>Back to Story</span>
                            </button>
                        )}

                        <button
                            type="button"
                            data-testid="toggle-camera-mode"
                            onClick={onToggleCameraMode}
                            className="px-2 sm:px-2.5 py-1.5 rounded-xl border border-amber-500/80 bg-slate-950/90 text-amber-100 hover:text-white hover:border-amber-300 text-[11px] font-extrabold shadow-lg flex items-center gap-1 active:scale-95 transition-all"
                            title="Switch between First-Person Scenic View and Tactical Overhead View (Key: C)"
                        >
                            <span>{cameraMode === 'firstPerson' ? '👁️' : '♟️'}</span>
                            <span className="hidden sm:inline">
                                {cameraMode === 'firstPerson' ? 'Scenic Eye' : 'Overhead'}
                            </span>
                        </button>

                        <button
                            type="button"
                            data-testid="toggle-dungeon-ambience"
                            onClick={handleToggleAmbient}
                            className={`px-2 py-1.5 rounded-xl border text-[11px] font-bold shadow-lg flex items-center gap-1 transition-all active:scale-95 ${
                                ambientActive
                                    ? 'bg-emerald-900/90 border-emerald-400 text-emerald-100'
                                    : 'bg-slate-950/90 border-amber-700/60 text-amber-200 hover:border-amber-400'
                            }`}
                            title="Toggle Procedural Scene Ambience"
                        >
                            <span>{ambientActive ? '🔊' : '🔈'}</span>
                        </button>

                        <button
                            type="button"
                            data-testid="toggle-3d-dice-tray"
                            onClick={() => setShowDiceTray((v) => !v)}
                            className={`px-2 py-1.5 rounded-xl border text-[11px] font-bold shadow-lg flex items-center gap-1 transition-all active:scale-95 ${
                                showDiceTray
                                    ? 'bg-purple-900/95 border-purple-400 text-purple-100 ring-2 ring-purple-400/50'
                                    : 'bg-slate-950/90 border-amber-700/60 text-amber-200 hover:border-amber-400'
                            }`}
                            title="Open 3D Polyhedral Physics Dice Tray"
                        >
                            <span>🎲</span>
                        </button>

                        <button
                            type="button"
                            data-testid="toggle-hud-minimap"
                            onClick={() => setShowMinimap((v) => !v)}
                            className={`px-2 py-1.5 rounded-xl border text-[11px] font-bold shadow-lg transition-all ${
                                showMinimap
                                    ? 'bg-amber-800/90 border-amber-400 text-white'
                                    : 'border-amber-700/60 bg-slate-950/90 text-amber-200 hover:border-amber-400'
                            }`}
                            title="Toggle Fog-of-War Auto-Mapper Overlay"
                        >
                            🗺️
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowMobileStepper((v) => !v)}
                            className="sm:hidden px-2 py-1.5 rounded-xl border border-amber-700/60 bg-slate-950/90 text-amber-200 text-[11px] font-bold shadow-lg"
                            title="Toggle Movement Pad"
                        >
                            🕹️
                        </button>
                    </div>

                    {/* Floating Fog-of-War Auto-Mapper Mini-Map */}
                    {showMinimap && !showDiceTray && (
                        <div className="w-48 sm:w-56 rounded-xl border border-amber-700/80 bg-slate-950/92 p-1.5 shadow-2xl backdrop-blur-md">
                            <DungeonAutomap
                                adventure={adventure}
                                currentNodeId={currentNode?.id}
                                visitedNodes={visitedNodes}
                                defeatedNodes={defeatedNodes}
                                lootedNodes={lootedNodes}
                                searchedNodes={searchedNodes}
                                onSelectNode={onSelectNode}
                                inCombat={inCombat}
                                playerFacingYaw={playerGridPos.yaw}
                                compact={true}
                            />
                        </div>
                    )}

                    {/* Floating 3D Polyhedral Physics Dice Overlay */}
                    {showDiceTray && (
                        <div className="w-56 sm:w-64 shadow-2xl">
                            <PolyhedralDice3D
                                defaultSides={20}
                                compact={true}
                                onRollComplete={(roll) => {
                                    onManualRoll?.(roll);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row: Compact Scene Actions + Stepper Pad */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-2 pb-[env(safe-area-inset-bottom)]">
                {/* Bottom-Left: Contextual Scene Actions & Exits */}
                <div className="pointer-events-auto flex-1 max-w-xl rounded-xl border border-amber-600/60 bg-slate-950/85 px-2.5 py-2 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar sm:flex-wrap">
                        {hasUndefeatedEncounter && (
                            <button
                                type="button"
                                data-testid="hud-engage-encounter"
                                onClick={() => onTriggerEncounter?.(currentNode.encounter)}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-extrabold text-[11px] border border-red-300 shadow-md flex items-center gap-1 shrink-0 animate-pulse"
                            >
                                <span>⚔️</span>
                                <span>Battle: {currentNode.encounter.title}</span>
                            </button>
                        )}

                        {hasUnlootedTreasure && (
                            <button
                                type="button"
                                data-testid="hud-loot-chamber"
                                onClick={() => onLootRoom?.(currentNode)}
                                className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-[11px] border border-amber-200 shadow-md flex items-center gap-1 shrink-0"
                            >
                                <span>💰</span>
                                <span>Loot ({currentNode.loot.gold || 0} gp)</span>
                            </button>
                        )}

                        {actionChoices.slice(0, 3).map((choice) => {
                            const choiceKey = `${currentNode?.id}:${choice.id}`;
                            const isDone = completedChoices.includes(choiceKey);
                            return (
                                <button
                                    key={choice.id}
                                    type="button"
                                    disabled={inCombat || (isDone && choice.type !== 'rest')}
                                    data-testid={`hud-action-${choice.id}`}
                                    onClick={() => onSelectChoice?.(choice)}
                                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 shrink-0 ${
                                        isDone && choice.type !== 'rest'
                                            ? 'bg-stone-800/60 text-stone-400 border-stone-700 cursor-not-allowed'
                                            : 'bg-amber-950/90 hover:bg-amber-800 text-amber-100 border-amber-500/60 active:scale-95'
                                    }`}
                                >
                                    <span>
                                        {choice.type === 'rest'
                                            ? '⛺'
                                            : choice.type === 'puzzle'
                                                ? '🧩'
                                                : choice.type === 'search'
                                                    ? '🔍'
                                                    : '🎲'}
                                    </span>
                                    <span className="truncate max-w-[155px]">
                                        {choice.label.replace(/\s*\(.*?\)\s*$/, '')}
                                    </span>
                                </button>
                            );
                        })}

                        {visibleExits.map((ex) => {
                            const isVisited = visitedNodes.includes(ex.targetNodeId);
                            return (
                                <button
                                    key={ex.targetNodeId}
                                    type="button"
                                    disabled={inCombat}
                                    data-testid={`hud-portal-${ex.targetNodeId}`}
                                    onClick={() => {
                                        soundService.play('portal');
                                        onSelectNode?.(ex.targetNodeId);
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg bg-indigo-950/90 hover:bg-indigo-800 text-amber-200 border border-amber-400/70 text-[11px] font-extrabold shadow-md flex items-center gap-1 shrink-0 active:scale-95 transition-all"
                                >
                                    <span>🚪</span>
                                    <span>{ex.targetTitle.replace(/^\d+\.\s*/, '')}</span>
                                    <span className="text-[10px] text-amber-300/80">
                                        {isVisited ? '✓' : '→'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom-Right: Grid-Stepper & Rotation Pad (Desktop always visible; Mobile toggleable via 🕹️) */}
                <div
                    data-testid="grid-stepper-controls"
                    className={`pointer-events-auto rounded-xl border border-amber-700/80 bg-slate-950/90 p-1.5 shadow-2xl backdrop-blur-md flex-col items-center gap-1 self-end ${
                        showMobileStepper ? 'flex' : 'hidden sm:flex'
                    }`}
                >
                    <div className="grid grid-cols-3 gap-1">
                        <button
                            type="button"
                            data-testid="stepper-turn-left"
                            onClick={() => onStepRotate?.(Math.PI / 2)}
                            className="w-9 h-8 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Turn Left 90° (Q)"
                        >
                            ↺
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-forward"
                            onClick={() => onStepMove?.('forward')}
                            className="w-9 h-8 rounded-lg bg-amber-700 hover:bg-amber-600 text-white border border-amber-400 font-extrabold text-xs flex items-center justify-center active:scale-95"
                            title="Step Forward (W / ↑)"
                        >
                            ▲
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-turn-right"
                            onClick={() => onStepRotate?.(-Math.PI / 2)}
                            className="w-9 h-8 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Turn Right 90° (E)"
                        >
                            ↻
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-left"
                            onClick={() => onStepMove?.('left')}
                            className="w-9 h-8 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Sidestep Left (A / ←)"
                        >
                            ◀
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-backward"
                            onClick={() => onStepMove?.('backward')}
                            className="w-9 h-8 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Step Backward (S / ↓)"
                        >
                            ▼
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-right"
                            onClick={() => onStepMove?.('right')}
                            className="w-9 h-8 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Sidestep Right (D / →)"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
