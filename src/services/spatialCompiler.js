import { adventures, generateCustomAdventure } from '../data/adventures.js';

const CARDINAL_WALLS = ['north', 'east', 'south', 'west'];

const ROOM_DIMENSIONS_BY_TYPE = {
    boss: { gridWidth: 9, gridDepth: 9, ceilingHeight: 6.5 },
    combat: { gridWidth: 7, gridDepth: 7, ceilingHeight: 5.0 },
    exploration: { gridWidth: 7, gridDepth: 7, ceilingHeight: 5.0 },
    puzzle: { gridWidth: 7, gridDepth: 7, ceilingHeight: 5.5 },
    trap: { gridWidth: 7, gridDepth: 5, ceilingHeight: 4.5 },
    merchant: { gridWidth: 7, gridDepth: 7, ceilingHeight: 4.8 },
    social: { gridWidth: 7, gridDepth: 7, ceilingHeight: 4.8 },
    rest: { gridWidth: 5, gridDepth: 5, ceilingHeight: 4.5 },
    victory: { gridWidth: 9, gridDepth: 9, ceilingHeight: 6.5 }
};

export const TILE_SIZE = 2.0; // 2 meters per 5ft D&D square

/**
 * Deterministic string hash (FNV-1a 32-bit)
 */
export function hashString(str = '') {
    let h = 2166136261;
    const s = String(str);
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/**
 * Checks whether two 3D axis-aligned bounding boxes intersect (with optional padding margin)
 */
export function boxesOverlap3D(a, b, margin = 1.5) {
    return (
        a.minX - margin < b.maxX + margin &&
        a.maxX + margin > b.minX - margin &&
        a.minY - margin < b.maxY + margin &&
        a.maxY + margin > b.minY - margin &&
        a.minZ - margin < b.maxZ + margin &&
        a.maxZ + margin > b.minZ - margin
    );
}

/**
 * Computes the bounding box of a chamber given its center and dimensions
 */
function computeWorldBounds(center, widthMeters, depthMeters, heightMeters) {
    const halfW = widthMeters / 2;
    const halfD = depthMeters / 2;
    return {
        minX: Number((center.x - halfW).toFixed(3)),
        maxX: Number((center.x + halfW).toFixed(3)),
        minY: Number(center.y.toFixed(3)),
        maxY: Number((center.y + heightMeters).toFixed(3)),
        minZ: Number((center.z - halfD).toFixed(3)),
        maxZ: Number((center.z + halfD).toFixed(3))
    };
}

/**
 * Assigns each exit from a source node to a distinct cardinal wall ('north', 'east', 'south', 'west')
 * based on the relative vector from source center to target center.
 */
function assignWallDirections(sourceCenter, exitsRaw) {
    // Score each exit's preferred cardinal wall based on angle
    const wallAssignments = new Map();
    const usedWalls = new Set();

    const scoredExits = exitsRaw.map((ex, idx) => {
        const dx = ex.targetCenter.x - sourceCenter.x;
        const dz = ex.targetCenter.z - sourceCenter.z;
        // In Three.js: -Z is North, +X is East, +Z is South, -X is West
        const preferences = [
            { wall: 'north', score: -dz },
            { wall: 'east', score: dx },
            { wall: 'south', score: dz },
            { wall: 'west', score: -dx }
        ].sort((a, b) => b.score - a.score || CARDINAL_WALLS.indexOf(a.wall) - CARDINAL_WALLS.indexOf(b.wall));

        return {
            ...ex,
            idx,
            angle: Math.atan2(dz, dx),
            preferences
        };
    });

    // Assign primary preferred wall when available, otherwise next available cardinal wall
    scoredExits.forEach((ex) => {
        let chosenWall = ex.preferences.find((p) => !usedWalls.has(p.wall))?.wall;
        let slotOffset = 0;
        if (!chosenWall) {
            chosenWall = ex.preferences[0].wall;
            slotOffset = 1;
        }
        usedWalls.add(chosenWall);
        wallAssignments.set(ex.targetNodeId, { wall: chosenWall, slotOffset });
    });

    return wallAssignments;
}

/**
 * Compiles an adventure's 2D node graph into a deterministic, collision-free 3D spatial layout manifest.
 */
export function compileSpatialLayout(adventure) {
    if (!adventure || !adventure.nodes) {
        return {
            adventureId: adventure?.id || 'unknown',
            adventureName: adventure?.name || 'Unknown Adventure',
            startNodeId: null,
            tileSize: TILE_SIZE,
            nodeCount: 0,
            chambers: {},
            corridors: [],
            reachableNodeIds: [],
            collisionCount: 0
        };
    }

    const nodeIds = Object.keys(adventure.nodes);
    const startNodeId = adventure.startNodeId && adventure.nodes[adventure.startNodeId]
        ? adventure.startNodeId
        : nodeIds[0] || null;

    // Step 1: Initial 3D chamber placements from 2D coordinates (or deterministic fallback grid)
    const chambersDraft = nodeIds.map((nodeId, idx) => {
        const node = adventure.nodes[nodeId];
        const dims = ROOM_DIMENSIONS_BY_TYPE[node.type] || ROOM_DIMENSIONS_BY_TYPE.exploration;
        const gridWidth = dims.gridWidth;
        const gridDepth = dims.gridDepth;
        const ceilingHeight = dims.ceilingHeight;

        const hasValid2D =
            node.coordinates &&
            typeof node.coordinates.x === 'number' &&
            !Number.isNaN(node.coordinates.x) &&
            typeof node.coordinates.y === 'number' &&
            !Number.isNaN(node.coordinates.y);

        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const rawX = hasValid2D ? node.coordinates.x : 20 + col * 30;
        const rawY = hasValid2D ? node.coordinates.y : 15 + row * 25;

        // Scale 0..100 2D map coordinates into spacious 3D world coordinates (meters)
        const worldX = Math.round(((rawX - 50) * 1.6) / TILE_SIZE) * TILE_SIZE;
        const worldZ = Math.round(((rawY - 50) * 1.6) / TILE_SIZE) * TILE_SIZE;
        const worldY = 0;

        const widthMeters = gridWidth * TILE_SIZE;
        const depthMeters = gridDepth * TILE_SIZE;

        const center = { x: worldX, y: worldY, z: worldZ };
        const worldBounds = computeWorldBounds(center, widthMeters, depthMeters, ceilingHeight);

        return {
            id: nodeId,
            title: node.title || nodeId,
            act: node.act || 1,
            type: node.type || 'exploration',
            environment: node.environment || adventure.ambientTrack || 'dungeon',
            gridWidth,
            gridDepth,
            ceilingHeight,
            tileSize: TILE_SIZE,
            widthMeters,
            depthMeters,
             coordinates2D: { x: rawX, y: rawY },
            center,
            worldBounds,
            node
        };
    });

    // Step 2: Iterative deterministic AABB separation to guarantee zero 3D bounding-box collisions
    const MIN_SEPARATION_MARGIN = 4.0; // Minimum 4m gap between chamber outer walls
    const maxIterations = 80;
    for (let iter = 0; iter < maxIterations; iter++) {
        let movedAny = false;
        for (let i = 0; i < chambersDraft.length; i++) {
            for (let j = i + 1; j < chambersDraft.length; j++) {
                const a = chambersDraft[i];
                const b = chambersDraft[j];
                if (boxesOverlap3D(a.worldBounds, b.worldBounds, MIN_SEPARATION_MARGIN)) {
                    movedAny = true;
                    let dx = b.center.x - a.center.x;
                    let dz = b.center.z - a.center.z;

                    if (Math.abs(dx) < 0.01 && Math.abs(dz) < 0.01) {
                        // Deterministic tie-breaker when two nodes have identical synthetic coordinates
                        const h = hashString(`${a.id}:${b.id}:${j}`);
                        const angle = ((h % 8) * Math.PI) / 4;
                        dx = Math.cos(angle) * TILE_SIZE * 2;
                        dz = Math.sin(angle) * TILE_SIZE * 2;
                    }

                    const reqX = (a.widthMeters + b.widthMeters) / 2 + MIN_SEPARATION_MARGIN + TILE_SIZE;
                    const reqZ = (a.depthMeters + b.depthMeters) / 2 + MIN_SEPARATION_MARGIN + TILE_SIZE;

                    const overlapX = reqX - Math.abs(dx);
                    const overlapZ = reqZ - Math.abs(dz);

                    if (overlapX < overlapZ) {
                        const signX = dx >= 0 ? 1 : -1;
                        const shiftX = Math.ceil((overlapX / 2) / TILE_SIZE) * TILE_SIZE;
                        a.center.x -= signX * shiftX;
                        b.center.x += signX * shiftX;
                    } else {
                        const signZ = dz >= 0 ? 1 : -1;
                        const shiftZ = Math.ceil((overlapZ / 2) / TILE_SIZE) * TILE_SIZE;
                        a.center.z -= signZ * shiftZ;
                        b.center.z += signZ * shiftZ;
                    }

                    a.worldBounds = computeWorldBounds(a.center, a.widthMeters, a.depthMeters, a.ceilingHeight);
                    b.worldBounds = computeWorldBounds(b.center, b.widthMeters, b.depthMeters, b.ceilingHeight);
                }
            }
        }
        if (!movedAny) break;
    }

    // Verify collision count
    let collisionCount = 0;
    for (let i = 0; i < chambersDraft.length; i++) {
        for (let j = i + 1; j < chambersDraft.length; j++) {
            if (boxesOverlap3D(chambersDraft[i].worldBounds, chambersDraft[j].worldBounds, 0.1)) {
                collisionCount++;
            }
        }
    }

    const chamberById = {};
    chambersDraft.forEach((c) => {
        chamberById[c.id] = c;
    });

    // Step 3: Build directed and undirected adjacency + reachability
    const outgoingMap = {};
    nodeIds.forEach((id) => {
        outgoingMap[id] = [];
    });

    nodeIds.forEach((id) => {
        const node = adventure.nodes[id];
        const seenTargets = new Set();
        (node.choices || []).forEach((choice) => {
            if (choice.targetNodeId && chamberById[choice.targetNodeId] && !seenTargets.has(choice.targetNodeId)) {
                seenTargets.add(choice.targetNodeId);
                outgoingMap[id].push({
                    choiceId: choice.id || `move_${choice.targetNodeId}`,
                    label: choice.label || `Travel to ${chamberById[choice.targetNodeId].title}`,
                    targetNodeId: choice.targetNodeId,
                    hiddenUntilSearched: Boolean(choice.hiddenUntilSearched),
                    targetCenter: chamberById[choice.targetNodeId].center
                });
            }
        });
    });

    // Ensure full graph reachability from startNodeId (connect any orphan components if present)
    const reachable = new Set();
    if (startNodeId) {
        const queue = [startNodeId];
        reachable.add(startNodeId);
        while (queue.length > 0) {
            const curr = queue.shift();
            for (const ex of outgoingMap[curr] || []) {
                if (!reachable.has(ex.targetNodeId)) {
                    reachable.add(ex.targetNodeId);
                    queue.push(ex.targetNodeId);
                }
            }
        }
        // If any node was unreachable in a synthetic graph, wire a bidirectional portal to the last reachable node
        nodeIds.forEach((id) => {
            if (!reachable.has(id)) {
                const anchorId = Array.from(reachable)[reachable.size - 1] || startNodeId;
                outgoingMap[anchorId].push({
                    choiceId: `auto_bridge_${id}`,
                    label: `Proceed to ${chamberById[id].title}`,
                    targetNodeId: id,
                    hiddenUntilSearched: false,
                    targetCenter: chamberById[id].center
                });
                outgoingMap[id].push({
                    choiceId: `auto_return_${anchorId}`,
                    label: `Return to ${chamberById[anchorId].title}`,
                    targetNodeId: anchorId,
                    hiddenUntilSearched: false,
                    targetCenter: chamberById[anchorId].center
                });
                reachable.add(id);
            }
        });
    }

    // Step 4: Finalize each chamber's local tile grid, props, spawn points, and cardinal wall exits
    const chambers = {};
    const corridorMap = new Map();

    chambersDraft.forEach((draft) => {
        const exitsRaw = outgoingMap[draft.id] || [];
        const wallAssignments = assignWallDirections(draft.center, exitsRaw);

        const midX = Math.floor(draft.gridWidth / 2);
        const midZ = Math.floor(draft.gridDepth / 2);

        const exits = exitsRaw.map((ex) => {
            const assignment = wallAssignments.get(ex.targetNodeId) || { wall: 'north', slotOffset: 0 };
            const wall = assignment.wall;
            const offset = assignment.slotOffset ? 1 : 0;

            let gridX = midX;
            let gridZ = midZ;
            let yaw = 0; // Radians: 0 = facing North (-Z), PI/2 = West, PI = South (+Z), -PI/2 = East

            if (wall === 'north') {
                gridX = Math.min(draft.gridWidth - 2, Math.max(1, midX + offset));
                gridZ = 0;
                yaw = 0;
            } else if (wall === 'south') {
                gridX = Math.min(draft.gridWidth - 2, Math.max(1, midX - offset));
                gridZ = draft.gridDepth - 1;
                yaw = Math.PI;
            } else if (wall === 'east') {
                gridX = draft.gridWidth - 1;
                gridZ = Math.min(draft.gridDepth - 2, Math.max(1, midZ + offset));
                yaw = -Math.PI / 2;
            } else if (wall === 'west') {
                gridX = 0;
                gridZ = Math.min(draft.gridDepth - 2, Math.max(1, midZ - offset));
                yaw = Math.PI / 2;
            }

            const localX = (gridX - midX) * TILE_SIZE;
            const localZ = (gridZ - midZ) * TILE_SIZE;

            const corridorKey = [draft.id, ex.targetNodeId].sort().join('<->');
            if (!corridorMap.has(corridorKey)) {
                corridorMap.set(corridorKey, {
                    id: corridorKey,
                    fromNodeId: draft.id,
                    toNodeId: ex.targetNodeId,
                    fromPoint: {
                        x: draft.center.x + localX,
                        y: 0,
                        z: draft.center.z + localZ
                    },
                    toPoint: {
                        x: ex.targetCenter.x,
                        y: 0,
                        z: ex.targetCenter.z
                    },
                    isSecret: ex.hiddenUntilSearched
                });
            }

            return {
                choiceId: ex.choiceId,
                label: ex.label,
                targetNodeId: ex.targetNodeId,
                targetTitle: chamberById[ex.targetNodeId]?.title || ex.targetNodeId,
                wall,
                gridX,
                gridZ,
                localPosition: { x: localX, y: 0, z: localZ },
                worldPosition: {
                    x: draft.center.x + localX,
                    y: 0,
                    z: draft.center.z + localZ
                },
                yaw,
                hiddenUntilSearched: ex.hiddenUntilSearched
            };
        });

        // Build props & spawn markers inside chamber
        const props = [];
        if (draft.node.loot && ((draft.node.loot.gold || 0) > 0 || (draft.node.loot.items || []).length > 0)) {
            props.push({
                id: `${draft.id}_loot_chest`,
                type: 'chest',
                label: 'Treasure Coffer',
                gridX: Math.max(1, midX - 1),
                gridZ: Math.max(1, midZ - 1)
            });
        }
        if (draft.node.trapOrHazard) {
            props.push({
                id: `${draft.id}_hazard_plate`,
                type: 'trap',
                label: draft.node.trapOrHazard.name || 'Warding Mechanism',
                gridX: midX,
                gridZ: Math.max(1, midZ - 1)
            });
        }
        if (draft.type === 'puzzle' || draft.type === 'boss') {
            props.push({
                id: `${draft.id}_altar_pedestal`,
                type: 'altar',
                label: draft.type === 'boss' ? 'Sovereign Dais' : 'Runic Pedestal',
                gridX: midX,
                gridZ: 1
            });
        }
        if (draft.node.restAvailable && draft.node.restAvailable !== 'none') {
            props.push({
                id: `${draft.id}_sanctuary_brazier`,
                type: 'campfire',
                label: 'Rest Brazier',
                gridX: Math.min(draft.gridWidth - 2, midX + 1),
                gridZ: Math.min(draft.gridDepth - 2, midZ + 1)
            });
        }

        // Player spawn tile (near south-center of room facing north so the whole chamber & enemies are immediately visible in front)
        const playerSpawn = {
            gridX: midX,
            gridZ: Math.min(draft.gridDepth - 2, midZ + 2),
            yaw: 0 // Looking North (-Z) toward center/altar/enemies
        };

        chambers[draft.id] = {
            id: draft.id,
            title: draft.title,
            act: draft.act,
            type: draft.type,
            environment: draft.environment,
            gridWidth: draft.gridWidth,
            gridDepth: draft.gridDepth,
            ceilingHeight: draft.ceilingHeight,
            tileSize: draft.tileSize,
            widthMeters: draft.widthMeters,
            depthMeters: draft.depthMeters,
            coordinates2D: draft.coordinates2D,
            center: draft.center,
            worldBounds: draft.worldBounds,
            playerSpawn,
            exits,
            props
        };
    });

    return {
        adventureId: adventure.id,
        adventureName: adventure.name,
        startNodeId,
        tileSize: TILE_SIZE,
        nodeCount: nodeIds.length,
        chambers,
        corridors: Array.from(corridorMap.values()),
        reachableNodeIds: Array.from(reachable),
        collisionCount
    };
}

/**
 * Compiles all 5 canonical campaigns into a complete manifest dictionary.
 */
export function compileAllCanonicalCampaigns() {
    const manifest = {
        version: '1.0.0',
        tileSize: TILE_SIZE,
        campaigns: {}
    };

    for (const adv of adventures) {
        manifest.campaigns[adv.id] = compileSpatialLayout(adv);
    }

    // Also include sample custom themes
    ['dungeon', 'wilderness', 'undead', 'intrigue'].forEach((theme) => {
        const customAdv = generateCustomAdventure({
            id: `custom-${theme}`,
            name: `Custom ${theme} Campaign`,
            theme
        });
        manifest.campaigns[customAdv.id] = compileSpatialLayout(customAdv);
    });

    return manifest;
}
