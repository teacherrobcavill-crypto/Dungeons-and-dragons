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
    inCombat = false
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

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span>🗺️</span> Dungeon & World Automap
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

            {/* Interactive SVG Map Canvas */}
            <div className="relative w-full h-72 rounded-xl overflow-hidden border-2 border-amber-700/40 dark:border-slate-600 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 shadow-inner">
                {/* Grid overlay */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="dndGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path
                                d="M 10 0 L 0 0 0 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.2"
                                className="text-amber-900/15 dark:text-slate-600/30"
                            />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#dndGrid)" />

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
                                stroke={edge.isSecret ? '#f59e0b' : edge.isVisited ? '#6366f1' : '#94a3b8'}
                                strokeWidth={edge.isVisited ? '1.2' : '0.8'}
                                strokeDasharray={edge.isSecret || !edge.isVisited ? '2,2' : 'none'}
                                opacity={edge.isVisited ? 0.9 : 0.55}
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
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md border-2 transition-all ${
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
                            </div>
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
                        </button>
                    );
                })}
            </div>

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
        </div>
    );
}
