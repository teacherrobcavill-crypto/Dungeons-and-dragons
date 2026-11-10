import React from 'react';

const NODE_TYPE_ICONS = {
    exploration: '🏰',
    combat: '⚔️',
    boss: '🐲',
    social: '💬',
    merchant: '🛒',
    rest: '🔥',
    puzzle: '🧩',
    trap: '⚠️',
    victory: '🏆'
};

export default function DungeonAutomap({
    adventure,
    currentNodeId,
    visitedNodes = [],
    defeatedNodes = [],
    lootedNodes = [],
    searchedNodes = [],
    onSelectNode,
    inCombat = false,
    playerFacingYaw = 0,
    compact = false
}) {
    const nodesMap = adventure?.nodes || {};
    const nodeList = Object.values(nodesMap);

    if (nodeList.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No map data available for this adventure.
            </div>
        );
    }

    const currentNode = nodesMap[currentNodeId] || nodeList[0];

    // Determine which nodes are reachable from visited nodes
    const reachableIds = new Set(visitedNodes);
    visitedNodes.forEach((vId) => {
        const n = nodesMap[vId];
        (n?.choices || []).forEach((c) => {
            if (c.targetNodeId && (!c.hiddenUntilSearched || searchedNodes.includes(vId))) {
                reachableIds.add(c.targetNodeId);
            }
        });
    });

    // Build edges between nodes
    const edges = [];
    nodeList.forEach((node) => {
        const isSourceKnown = visitedNodes.includes(node.id);
        if (!isSourceKnown) return;

        (node.choices || []).forEach((choice) => {
            if (!choice.targetNodeId || !nodesMap[choice.targetNodeId]) return;
            if (choice.hiddenUntilSearched && !searchedNodes.includes(node.id)) return;
            const target = nodesMap[choice.targetNodeId];
            edges.push({
                id: `${node.id}->${target.id}`,
                from: node,
                to: target,
                isVisited: visitedNodes.includes(target.id),
                isSecret: Boolean(choice.hiddenUntilSearched)
            });
        });
    });

    // Assign fallback coordinates if any node lacks x/y
    const getCoords = (node, idx) => {
        if (node?.coordinates && typeof node.coordinates.x === 'number' && typeof node.coordinates.y === 'number') {
            return node.coordinates;
        }
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        return {
            x: 20 + col * 30,
            y: 15 + row * 22
        };
    };

    const coordLookup = {};
    nodeList.forEach((n, idx) => {
        coordLookup[n.id] = getCoords(n, idx);
    });

    // Convert yaw in radians (0 = North, -PI/2 = East, PI = South, PI/2 = West) to CSS degrees
    const facingDeg = Math.round((-playerFacingYaw * 180) / Math.PI);

    return (
        <div data-testid={compact ? 'automap-minimap' : 'dungeon-automap'} className={compact ? 'space-y-1.5' : 'space-y-4'}>
            {!compact && (
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span>🗺️</span> Fog-of-War Dungeon Automap
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Explored: {visitedNodes.length} / {nodeList.length} Chambers
                        </p>
                    </div>
                    {currentNode?.act && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            Act {currentNode.act}
                        </span>
                    )}
                </div>
            )}

            {/* Interactive SVG Map Canvas with Fog-of-War Shroud */}
            <div className={`relative w-full ${compact ? 'h-36' : 'h-72'} rounded-xl overflow-hidden border-2 border-amber-700/50 dark:border-amber-600/40 bg-gradient-to-br from-amber-100 via-stone-200 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-stone-900 shadow-inner`}>
                {/* Grid & Fog-of-War SVG overlay */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id={compact ? 'dndGridMini' : 'dndGrid'} width="10" height="10" patternUnits="userSpaceOnUse">
                            <path
                                d="M 10 0 L 0 0 0 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.25"
                                className="text-amber-900/20 dark:text-amber-500/15"
                            />
                        </pattern>
                        <radialGradient id={compact ? 'fogClearMini' : 'fogClear'} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.18)" />
                            <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
                        </radialGradient>
                    </defs>
                    <rect width="100" height="100" fill={`url(#${compact ? 'dndGridMini' : 'dndGrid'})`} />

                    {/* Illuminated discovery halos around visited nodes */}
                    {nodeList.map((n) => {
                        if (!visitedNodes.includes(n.id)) return null;
                        const c = coordLookup[n.id];
                        return (
                            <circle
                                key={`halo-${n.id}`}
                                cx={c.x}
                                cy={c.y}
                                r="18"
                                fill={`url(#${compact ? 'fogClearMini' : 'fogClear'})`}
                            />
                        );
                    })}

                    {/* Unexplored Fog-of-War Shroud Clouds */}
                    {nodeList.map((n) => {
                        if (visitedNodes.includes(n.id)) return null;
                        const c = coordLookup[n.id];
                        const isFrontier = reachableIds.has(n.id);
                        return (
                            <circle
                                key={`fog-${n.id}`}
                                cx={c.x}
                                cy={c.y}
                                r={isFrontier ? '10' : '14'}
                                fill={isFrontier ? 'rgba(30, 41, 59, 0.45)' : 'rgba(2, 6, 23, 0.78)'}
                                stroke={isFrontier ? 'rgba(245, 158, 11, 0.35)' : 'none'}
                                strokeDasharray="1.5,1.5"
                                strokeWidth="0.4"
                            />
                        );
                    })}

                    {/* Edges */}
                    {edges.map((edge) => {
                        const p1 = coordLookup[edge.from.id];
                        const p2 = coordLookup[edge.to.id];
                        if (!p1 || !p2) return null;
                        return (
                            <line
                                key={edge.id}
                                x1={p1.x}
                                y1={p1.y}
                                x2={p2.x}
                                y2={p2.y}
                                stroke={edge.isSecret ? '#f59e0b' : edge.isVisited ? '#f59e0b' : '#94a3b8'}
                                strokeWidth={edge.isVisited ? '1.3' : '0.8'}
                                strokeDasharray={edge.isSecret || !edge.isVisited ? '2,2' : 'none'}
                                opacity={edge.isVisited ? 0.92 : 0.6}
                            />
                        );
                    })}
                </svg>

                {/* Node Markers */}
                {nodeList.map((node) => {
                    const isVisited = visitedNodes.includes(node.id);
                    const isReachable = reachableIds.has(node.id);
                    if (!isVisited && !isReachable) return null;

                    const isCurrent = node.id === currentNodeId;
                    const isCleared = defeatedNodes.includes(node.id);
                    const isLooted = lootedNodes.includes(node.id);
                    const isBoss = node.type === 'boss' || ['black_spider_sanctum', 'voranthos_caldera', 'ritual_ossuary', 'shadow_sanctum', 'throne_sleeping_god'].includes(node.id);
                    const coords = coordLookup[node.id];
                    const icon = isVisited ? (isBoss && isCleared ? '🏆' : (NODE_TYPE_ICONS[node.type] || '📍')) : '❓';

                    return (
                        <button
                            key={node.id}
                            type="button"
                            data-testid={`automap-node-${node.id}`}
                            disabled={inCombat || (!isVisited && !isReachable)}
                            onClick={() => onSelectNode && onSelectNode(node.id)}
                            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                            title={isVisited ? `${node.title} (${isBoss && isCleared ? '🏆 VICTORY - BOSS CONQUERED' : node.type})` : 'Unexplored Area — Click to travel'}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center transition-all ${
                                isCurrent
                                    ? 'z-20 scale-110'
                                    : isVisited
                                        ? 'z-10 hover:scale-110'
                                        : 'z-10 opacity-75 hover:opacity-100 hover:scale-105'
                            }`}
                        >
                            <div
                                className={`${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} rounded-full flex items-center justify-center shadow-md border-2 transition-all relative ${
                                    isCurrent
                                        ? 'bg-amber-500 text-white border-white dark:border-amber-200 ring-4 ring-amber-400/50 animate-pulse'
                                        : isVisited
                                            ? isCleared
                                                ? isBoss
                                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 shadow-amber-500/50'
                                                    : 'bg-emerald-600 text-white border-emerald-300'
                                                : 'bg-indigo-600 text-white border-indigo-300'
                                            : 'bg-slate-700 text-gray-300 border-slate-500 border-dashed'
                                }`}
                            >
                                <span>{icon}</span>
                                {isCurrent && (
                                    <span
                                        data-testid="automap-facing-arrow"
                                        style={{ transform: `rotate(${facingDeg}deg)` }}
                                        className="absolute -top-2.5 text-[10px] text-amber-300 drop-shadow font-black pointer-events-none"
                                    >
                                        ▲
                                    </span>
                                )}
                            </div>
                            {!compact && (
                                <span
                                    className={`mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap max-w-[110px] truncate shadow-sm ${
                                        isCurrent
                                            ? 'bg-amber-900 text-amber-100'
                                            : isVisited
                                                ? 'bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-200'
                                                : 'bg-slate-800/80 text-gray-300'
                                    }`}
                                >
                                    {isVisited ? node.title.replace(/^\d+\.\s*/, '') : 'Unexplored'}
                                    {isLooted ? ' 💰' : ''}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {compact ? (
                <div className="flex items-center justify-between text-[10px] text-amber-200/90 px-1">
                    <span className="truncate font-semibold">{currentNode?.title?.replace(/^\d+\.\s*/, '')}</span>
                    <span className="font-mono text-amber-300">{visitedNodes.length}/{nodeList.length}</span>
                </div>
            ) : (
                <>

            {/* Current Chamber Summary Card */}
            {currentNode && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-slate-800 border border-amber-200/80 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                            📍 Current Location
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 capitalize">
                            {currentNode.environment || currentNode.type}
                        </span>
                    </div>
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white">{currentNode.title}</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                        {currentNode.readAloud}
                    </p>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {defeatedNodes.includes(currentNode.id) && (
                            (currentNode.type === 'boss' || ['black_spider_sanctum', 'voranthos_caldera', 'ritual_ossuary', 'shadow_sanctum', 'throne_sleeping_god'].includes(currentNode.id)) ? (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-sm flex items-center gap-1">
                                    <span>🏆</span> Campaign Boss Conquered!
                                </span>
                            ) : (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                                    ✅ Threat Cleared
                                </span>
                            )
                        )}
                        {searchedNodes.includes(currentNode.id) && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                                🔍 Searched
                            </span>
                        )}
                        {lootedNodes.includes(currentNode.id) && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                                💰 Looted
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Chamber Travel List */}
            <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    Discovered Chambers (Click to Fast-Travel)
                </h5>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {nodeList
                        .filter((n) => visitedNodes.includes(n.id) || reachableIds.has(n.id))
                        .map((node) => {
                            const isVisited = visitedNodes.includes(node.id);
                            const isCurrent = node.id === currentNodeId;
                            return (
                                <button
                                    key={node.id}
                                    type="button"
                                    disabled={inCombat}
                                    onClick={() => onSelectNode && onSelectNode(node.id)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                                        isCurrent
                                            ? 'bg-primary-500 text-white font-semibold'
                                            : 'bg-gray-50 dark:bg-slate-700/70 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200'
                                    }`}
                                >
                                    <span className="truncate flex items-center gap-2">
                                        <span>{isVisited ? (NODE_TYPE_ICONS[node.type] || '📍') : '❓'}</span>
                                        <span>{isVisited ? node.title : 'Unexplored Path'}</span>
                                    </span>
                                    <span className="text-[10px] opacity-80 ml-2 flex-shrink-0">
                                        {isCurrent ? 'Here' : isVisited ? 'Visited' : 'Enter →'}
                                    </span>
                                </button>
                            );
                        })}
                </div>
            </div>
                </>
            )}
        </div>
    );
}
