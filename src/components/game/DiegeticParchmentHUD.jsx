import React, { useState, useEffect } from 'react';
import DungeonAutomap from './DungeonAutomap';
import PolyhedralDice3D from './PolyhedralDice3D';
import soundService from '../../services/soundService';

const COMPASS_LABELS = [
    { label: 'N', yaw: 0 },
    { label: 'E', yaw: -Math.PI / 2 },
    { label: 'S', yaw: Math.PI },
    { label: 'W', yaw: Math.PI / 2 }
];

function getCardinalName(yaw = 0) {
    // Normalize angle to [-PI, PI]
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
    onManualRoll
}) {
    const [showDiceTray, setShowDiceTray] = useState(false);
    const [showMinimap, setShowMinimap] = useState(true);
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

    const handleToggleAmbient = () => {
        soundService.toggleAmbient(envTheme);
    };

    return (
        <div
            data-testid="diegetic-parchment-hud"
            className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-2 sm:p-3 select-none overflow-hidden"
        >
            {/* Top Row: Diegetic Parchment Chamber Scroll + Mini Automap & Camera Controls */}
            <div className="flex items-start justify-between gap-2">
                {/* Top-Left: Weathered Parchment Chamber Scroll & Party Vitals */}
                <div className="pointer-events-auto max-w-[270px] sm:max-w-[330px] rounded-xl border-2 border-amber-600/85 bg-gradient-to-br from-stone-950/92 via-amber-950/90 to-stone-900/92 px-3 py-2 shadow-2xl backdrop-blur-md text-amber-100">
                    <div className="flex items-center justify-between gap-2 border-b border-amber-500/30 pb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                            <span>📜</span> Act {currentNode?.act || 1} • {envTheme.toUpperCase()}
                        </span>
                        <span
                            data-testid="hud-compass-badge"
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-900/90 text-amber-200 border border-amber-500/60"
                        >
                            🧭 {facingName} ({playerGridPos.gridX},{playerGridPos.gridZ})
                        </span>
                    </div>
                    <h2
                        data-testid="hud-chamber-title"
                        className="font-display font-extrabold text-xs sm:text-sm text-amber-100 mt-1 truncate"
                    >
                        {currentNode?.title || 'Uncharted Chamber'}
                    </h2>
                    <p className="text-[10px] text-amber-200/85 line-clamp-1 leading-snug mt-0.5 italic">
                        {currentNode?.readAloud}
                    </p>

                    {/* Diegetic Party Vitals Ribbon */}
                    <div className="mt-1.5 pt-1 border-t border-amber-500/30 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                        <span className="px-1.5 py-0.5 rounded bg-red-900/85 text-red-100 border border-red-500/40">
                            ❤️ {character?.hp}/{character?.maxHp}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800/90 text-amber-200 border border-amber-600/40">
                            🛡️ AC {derivedStats?.ac || 14}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-800/80 text-amber-100 border border-amber-500/40">
                            💰 {character?.gold ?? 25}g
                        </span>
                        {companions.slice(0, 2).map((comp) => (
                            <span
                                key={comp.id || comp.name}
                                className={`px-1.5 py-0.5 rounded text-[10px] border ${
                                    comp.isDead || comp.hp <= 0
                                        ? 'bg-red-950/80 text-red-300 border-red-700 line-through'
                                        : 'bg-indigo-950/85 text-indigo-200 border-indigo-500/40'
                                }`}
                            >
                                🤝 {comp.name.split(' ')[0]} {comp.hp}/{comp.maxHp}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Top-Right: Camera Toggle, Web Audio Ambience, 3D Dice Toggle & Fog-of-War Minimap */}
                <div className="pointer-events-auto flex flex-col items-end gap-1.5">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                        {/* Camera Mode Switcher */}
                        <button
                            type="button"
                            data-testid="toggle-camera-mode"
                            onClick={onToggleCameraMode}
                            className="px-2.5 py-1 rounded-xl border-2 border-amber-500/80 bg-gradient-to-r from-amber-900/95 via-stone-900/95 to-amber-950/95 text-amber-100 hover:text-white hover:border-amber-300 text-[11px] font-extrabold shadow-lg flex items-center gap-1 active:scale-95 transition-all"
                            title="Switch between First-Person Grid-Stepper Camera and Isometric Tactical Camera (Key: C)"
                        >
                            <span>{cameraMode === 'firstPerson' ? '👁️' : '♟️'}</span>
                            <span>{cameraMode === 'firstPerson' ? '1st-Person Stepper' : 'Isometric Tactical'}</span>
                        </button>

                        {/* Web Audio Dungeon Ambience Toggle */}
                        <button
                            type="button"
                            data-testid="toggle-dungeon-ambience"
                            onClick={handleToggleAmbient}
                            className={`px-2 py-1 rounded-xl border text-[11px] font-bold shadow-lg flex items-center gap-1 transition-all active:scale-95 ${
                                ambientActive
                                    ? 'bg-emerald-900/90 border-emerald-400 text-emerald-100'
                                    : 'bg-stone-900/90 border-amber-700/60 text-amber-200 hover:border-amber-400'
                            }`}
                            title="Toggle Procedural Web Audio Dungeon Ambience"
                        >
                            <span>{ambientActive ? '🔊' : '🔈'}</span>
                            <span className="hidden sm:inline">Ambience</span>
                        </button>

                        {/* 3D Polyhedral Physics Dice Toggle */}
                        <button
                            type="button"
                            data-testid="toggle-3d-dice-tray"
                            onClick={() => setShowDiceTray((v) => !v)}
                            className={`px-2 py-1 rounded-xl border text-[11px] font-bold shadow-lg flex items-center gap-1 transition-all active:scale-95 ${
                                showDiceTray
                                    ? 'bg-purple-900/95 border-purple-400 text-purple-100 ring-2 ring-purple-400/50'
                                    : 'bg-stone-900/90 border-amber-700/60 text-amber-200 hover:border-amber-400'
                            }`}
                            title="Open 3D Polyhedral Physics Dice Tray"
                        >
                            <span>🎲</span>
                            <span className="hidden sm:inline">3D Dice</span>
                        </button>

                        {/* Minimap Collapse Toggle */}
                        <button
                            type="button"
                            data-testid="toggle-hud-minimap"
                            onClick={() => setShowMinimap((v) => !v)}
                            className="px-2 py-1 rounded-xl border border-amber-700/60 bg-stone-900/90 text-amber-200 hover:border-amber-400 text-[11px] font-bold shadow-lg"
                            title="Toggle Fog-of-War Auto-Mapper Overlay"
                        >
                            🗺️
                        </button>
                    </div>

                    {/* Floating Fog-of-War Auto-Mapper Mini-Map (auto-hidden when 3D Dice Tray is open to prevent overlap) */}
                    {showMinimap && !showDiceTray && (
                        <div className="w-52 sm:w-56 rounded-xl border-2 border-amber-700/80 bg-stone-950/90 p-1.5 shadow-2xl backdrop-blur-md">
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
                        <div className="w-60 sm:w-64 shadow-2xl">
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

            {/* Bottom Row: Grid-Stepper D-Pad Controls + Diegetic Portal & Chamber Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-2">
                {/* Bottom-Left: Contextual Chamber Actions & Portal Archways */}
                <div className="pointer-events-auto flex-1 max-w-xl rounded-xl border-2 border-amber-700/80 bg-gradient-to-r from-stone-950/90 via-amber-950/85 to-stone-950/90 px-2.5 py-1.5 shadow-2xl backdrop-blur-md space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-amber-300/90">
                        <span>⚡ Chamber Portals & Diegetic Actions</span>
                        <span className="text-amber-400/80 hidden sm:inline">WASD: Step • Q/E: Turn 90° • C: Camera</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {/* Engage Combat Encounter Button if Threat Active */}
                        {hasUndefeatedEncounter && (
                            <button
                                type="button"
                                data-testid="hud-engage-encounter"
                                onClick={() => onTriggerEncounter?.(currentNode.encounter)}
                                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-extrabold text-[11px] border border-red-300 shadow-md flex items-center gap-1 animate-pulse"
                            >
                                <span>⚔️</span>
                                <span>Engage: {currentNode.encounter.title}</span>
                            </button>
                        )}

                        {/* Claim Treasure Chest if Available */}
                        {hasUnlootedTreasure && (
                            <button
                                type="button"
                                data-testid="hud-loot-chamber"
                                onClick={() => onLootRoom?.(currentNode)}
                                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-[11px] border border-amber-200 shadow-md flex items-center gap-1"
                            >
                                <span>💰</span>
                                <span>Loot Coffer ({currentNode.loot.gold || 0} gp)</span>
                            </button>
                        )}

                        {/* Skill / Search / Trap / Rest Choices */}
                        {actionChoices.map((choice) => {
                            const choiceKey = `${currentNode?.id}:${choice.id}`;
                            const isDone = completedChoices.includes(choiceKey);
                            return (
                                <button
                                    key={choice.id}
                                    type="button"
                                    disabled={inCombat || (isDone && choice.type !== 'rest')}
                                    data-testid={`hud-action-${choice.id}`}
                                    onClick={() => onSelectChoice?.(choice)}
                                    className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 ${
                                        isDone && choice.type !== 'rest'
                                            ? 'bg-stone-800/60 text-stone-400 border-stone-700 cursor-not-allowed'
                                            : 'bg-amber-900/75 hover:bg-amber-800 text-amber-100 border-amber-500/60 active:scale-95'
                                    }`}
                                >
                                    <span>
                                        {choice.type === 'rest'
                                            ? '⛺'
                                            : choice.type === 'puzzle'
                                                ? '🧩'
                                                : choice.type === 'search'
                                                    ? '🔍'
                                                    : '🎯'}
                                    </span>
                                    <span className="truncate max-w-[175px]">
                                        {choice.label.replace(/\s*\(.*?\)\s*$/, '')}
                                    </span>
                                </button>
                            );
                        })}

                        {/* Connected 3D Portal Exits */}
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
                                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-900/90 to-slate-900/90 hover:from-indigo-700 hover:to-slate-800 text-amber-200 border border-amber-400/70 text-[11px] font-extrabold shadow-md flex items-center gap-1 active:scale-95 transition-all"
                                >
                                    <span>🚪</span>
                                    <span>
                                        [{ex.wall.toUpperCase()}] {ex.targetTitle.replace(/^\d+\.\s*/, '')}
                                    </span>
                                    <span className="text-[10px] text-amber-300/80">
                                        {isVisited ? '(Visited)' : '→'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom-Right: First-Person Grid-Stepper & Rotation Pad */}
                <div
                    data-testid="grid-stepper-controls"
                    className="pointer-events-auto rounded-xl border-2 border-amber-700/80 bg-stone-950/92 p-2 shadow-2xl backdrop-blur-md flex flex-col items-center gap-1"
                >
                    <div className="grid grid-cols-3 gap-1">
                        <button
                            type="button"
                            data-testid="stepper-turn-left"
                            onClick={() => onStepRotate?.(Math.PI / 2)}
                            className="w-10 h-9 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Turn Left 90° (Q)"
                        >
                            ↺ Q
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-forward"
                            onClick={() => onStepMove?.('forward')}
                            className="w-10 h-9 rounded-lg bg-amber-700 hover:bg-amber-600 text-white border border-amber-400 font-extrabold text-xs flex items-center justify-center active:scale-95"
                            title="Step Forward (W / ↑)"
                        >
                            ▲ W
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-turn-right"
                            onClick={() => onStepRotate?.(-Math.PI / 2)}
                            className="w-10 h-9 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Turn Right 90° (E)"
                        >
                            E ↻
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-left"
                            onClick={() => onStepMove?.('left')}
                            className="w-10 h-9 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Sidestep Left (A / ←)"
                        >
                            ◀ A
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-backward"
                            onClick={() => onStepMove?.('backward')}
                            className="w-10 h-9 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Step Backward (S / ↓)"
                        >
                            ▼ S
                        </button>
                        <button
                            type="button"
                            data-testid="stepper-move-right"
                            onClick={() => onStepMove?.('right')}
                            className="w-10 h-9 rounded-lg bg-stone-800 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-bold text-xs flex items-center justify-center active:scale-95"
                            title="Sidestep Right (D / →)"
                        >
                            D ▶
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
