import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { compileSpatialLayout, TILE_SIZE } from '../../services/spatialCompiler';
import DiegeticParchmentHUD from './DiegeticParchmentHUD';
import soundService from '../../services/soundService';

const ENVIRONMENT_PALETTES = {
    dungeon: {
        skyColor: '#1a1829',
        fogColor: '#1f1b2e',
        wallPrimary: '#475569',
        wallSecondary: '#334155',
        floorPrimary: '#3f3f46',
        floorSecondary: '#27272a',
        mortarColor: '#18181b',
        accentGlow: '#f59e0b',
        torchColor: '#ff9800',
        ambientColor: '#94a3b8'
    },
    cavern: {
        skyColor: '#111c24',
        fogColor: '#14222b',
        wallPrimary: '#3b4d54',
        wallSecondary: '#293840',
        floorPrimary: '#334155',
        floorSecondary: '#1e293b',
        mortarColor: '#0f172a',
        accentGlow: '#38bdf8',
        torchColor: '#fbbf24',
        ambientColor: '#7dd3fc'
    },
    volcano: {
        skyColor: '#261010',
        fogColor: '#2e1212',
        wallPrimary: '#451a1a',
        wallSecondary: '#2d1212',
        floorPrimary: '#3b1919',
        floorSecondary: '#260e0e',
        mortarColor: '#ea580c',
        accentGlow: '#f97316',
        torchColor: '#ff5722',
        ambientColor: '#fdba74'
    },
    crypt: {
        skyColor: '#131c21',
        fogColor: '#162126',
        wallPrimary: '#3f4e4f',
        wallSecondary: '#2c3639',
        floorPrimary: '#2f3e46',
        floorSecondary: '#1b262c',
        mortarColor: '#10b981',
        accentGlow: '#34d399',
        torchColor: '#6ee7b7',
        ambientColor: '#a7f3d0'
    },
    manor: {
        skyColor: '#211522',
        fogColor: '#261829',
        wallPrimary: '#5c3d46',
        wallSecondary: '#3d262e',
        floorPrimary: '#4a3228',
        floorSecondary: '#33221a',
        mortarColor: '#1f1216',
        accentGlow: '#e879f9',
        torchColor: '#fb923c',
        ambientColor: '#f5d0fe'
    },
    city: {
        skyColor: '#182030',
        fogColor: '#1d273b',
        wallPrimary: '#4b5563',
        wallSecondary: '#374151',
        floorPrimary: '#475569',
        floorSecondary: '#334155',
        mortarColor: '#1e293b',
        accentGlow: '#fbbf24',
        torchColor: '#fcd34d',
        ambientColor: '#cbd5e1'
    },
    temple: {
        skyColor: '#241e14',
        fogColor: '#2b2418',
        wallPrimary: '#786242',
        wallSecondary: '#5c492e',
        floorPrimary: '#695436',
        floorSecondary: '#4d3c24',
        mortarColor: '#d97706',
        accentGlow: '#facc15',
        torchColor: '#fde047',
        ambientColor: '#fef08a'
    },
    forest: {
        skyColor: '#132419',
        fogColor: '#162b1e',
        wallPrimary: '#365338',
        wallSecondary: '#243b26',
        floorPrimary: '#3f4f32',
        floorSecondary: '#2d3b22',
        mortarColor: '#1a2614',
        accentGlow: '#4ade80',
        torchColor: '#fbbf24',
        ambientColor: '#bbf7d0'
    },
    jungle: {
        skyColor: '#132419',
        fogColor: '#162b1e',
        wallPrimary: '#365338',
        wallSecondary: '#243b26',
        floorPrimary: '#3f4f32',
        floorSecondary: '#2d3b22',
        mortarColor: '#1a2614',
        accentGlow: '#4ade80',
        torchColor: '#fbbf24',
        ambientColor: '#bbf7d0'
    },
    town: {
        skyColor: '#1f2433',
        fogColor: '#252b3d',
        wallPrimary: '#645344',
        wallSecondary: '#4a3d31',
        floorPrimary: '#52473f',
        floorSecondary: '#3b332d',
        mortarColor: '#26211d',
        accentGlow: '#fbbf24',
        torchColor: '#f59e0b',
        ambientColor: '#fde68a'
    }
};

// Custom GLSL Shader for Portal Energy Field
const PORTAL_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const PORTAL_FRAGMENT_SHADER = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
    vec2 centered = vUv * 2.0 - 1.0;
    float dist = length(centered);
    float ripple = sin(dist * 10.0 - uTime * 3.5) * 0.5 + 0.5;
    float rim = smoothstep(0.95, 0.35, dist);
    vec3 col = mix(uColor * 0.45, uColor * 1.4, ripple * rim);
    float alpha = clamp(rim * (0.45 + 0.3 * ripple), 0.15, 0.82);
    gl_FragColor = vec4(col, alpha);
}
`;

function createProceduralStoneTexture(palette, isFloor = false) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = palette.mortarColor;
    ctx.fillRect(0, 0, 256, 256);

    if (isFloor) {
        // Tactical D&D 5-foot flagstone grid pattern
        const cells = 4;
        const step = 256 / cells;
        for (let r = 0; r < cells; r++) {
            for (let c = 0; c < cells; c++) {
                ctx.fillStyle = (r + c) % 2 === 0 ? palette.floorPrimary : palette.floorSecondary;
                ctx.fillRect(c * step + 3, r * step + 3, step - 6, step - 6);
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.lineWidth = 2;
                ctx.strokeRect(c * step + 5, r * step + 5, step - 10, step - 10);
            }
        }
    } else {
        // Ashlar masonry stone blocks
        const rows = 4;
        const rowH = 256 / rows;
        for (let r = 0; r < rows; r++) {
            const offset = (r % 2) * 32;
            for (let x = -32; x < 256; x += 64) {
                ctx.fillStyle = (r + x) % 128 === 0 ? palette.wallPrimary : palette.wallSecondary;
                ctx.fillRect(x + offset + 3, r * rowH + 3, 58, rowH - 6);
                ctx.strokeStyle = 'rgba(255,255,255,0.09)';
                ctx.lineWidth = 2;
                ctx.strokeRect(x + offset + 5, r * rowH + 5, 54, rowH - 10);
            }
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
}

function createStandeeTexture({ name, roleLabel, hp, maxHp, ac, borderColor = '#f59e0b', badgeIcon = '⚔️', isBoss = false }) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Standee Acrylic Card Frame
    const grad = ctx.createLinearGradient(0, 0, 0, 320);
    grad.addColorStop(0, isBoss ? '#450a0a' : '#1e293b');
    grad.addColorStop(0.6, '#0f172a');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(12, 12, 232, 296);

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = isBoss ? 10 : 7;
    ctx.strokeRect(14, 14, 228, 292);

    // Emblem / Portrait Circle
    ctx.beginPath();
    ctx.arc(128, 112, 58, 0, Math.PI * 2);
    ctx.fillStyle = isBoss ? '#7f1d1d' : '#312e81';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    ctx.font = '64px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(badgeIcon, 128, 114);

    // AC Shield Pill
    if (ac) {
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(196, 62, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(`AC${ac}`, 196, 63);
    }

    // Nameplate
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Georgia, serif';
    const shortName = String(name || 'Token').slice(0, 18);
    ctx.fillText(shortName, 128, 204);

    if (roleLabel) {
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '15px sans-serif';
        ctx.fillText(String(roleLabel).slice(0, 24), 128, 230);
    }

    // HP Bar
    if (typeof hp === 'number' && typeof maxHp === 'number' && maxHp > 0) {
        const pct = Math.max(0, Math.min(1, hp / maxHp));
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(32, 252, 192, 26);
        ctx.fillStyle = pct > 0.5 ? '#10b981' : pct > 0.25 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(32, 252, Math.round(192 * pct), 26);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(32, 252, 192, 26);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(`${hp}/${maxHp} HP`, 128, 266);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
}

function createPortalBannerTexture(exit) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, 500, 116);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 24px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🚪 ${exit.wall.toUpperCase()} PORTAL`, 256, 44);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 28px Georgia, serif';
    const cleanTitle = (exit.targetTitle || exit.targetNodeId).replace(/^\d+\.\s*/, '').slice(0, 30);
    ctx.fillText(cleanTitle, 256, 88);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
}

export default function DungeonViewport3D({
    adventure,
    currentNodeId,
    currentNode,
    character,
    companions = [],
    derivedStats,
    combat,
    visitedNodes = [],
    defeatedNodes = [],
    lootedNodes = [],
    searchedNodes = [],
    completedChoices = [],
    cameraMode = 'firstPerson',
    onToggleCameraMode,
    onSelectNode,
    onSelectChoice,
    onTriggerEncounter,
    onLootRoom,
    onManualRoll,
    onWeaponAttack
}) {
    const mountRef = useRef(null);
    const engineRef = useRef(null);

    // Compile deterministic 3D spatial manifest for the active adventure
    const spatialLayout = useMemo(() => compileSpatialLayout(adventure), [adventure]);
    const activeChamber = useMemo(() => {
        if (!spatialLayout?.chambers) return null;
        return spatialLayout.chambers[currentNodeId] || Object.values(spatialLayout.chambers)[0] || null;
    }, [spatialLayout, currentNodeId]);

    const [playerGridPos, setPlayerGridPos] = useState(() => ({
        gridX: activeChamber?.playerSpawn?.gridX ?? 3,
        gridZ: activeChamber?.playerSpawn?.gridZ ?? 5,
        yaw: activeChamber?.playerSpawn?.yaw ?? 0
    }));

    // Reset player grid coordinates to the new chamber's spawn point whenever currentNodeId changes
    useEffect(() => {
        if (!activeChamber) return;
        setPlayerGridPos({
            gridX: activeChamber.playerSpawn.gridX,
            gridZ: activeChamber.playerSpawn.gridZ,
            yaw: activeChamber.playerSpawn.yaw
        });
    }, [activeChamber]);

    // Step movement handler with strict wall-collision check & portal entry detection
    const handleStepMove = useCallback(
        (direction) => {
            if (!activeChamber) return;
            setPlayerGridPos((prev) => {
                // Yaw 0 = North (dz = -1, dx = 0)
                const forwardX = Math.round(-Math.sin(prev.yaw));
                const forwardZ = Math.round(-Math.cos(prev.yaw));
                const rightX = -forwardZ;
                const rightZ = forwardX;

                let dx = 0;
                let dz = 0;
                if (direction === 'forward') {
                    dx = forwardX;
                    dz = forwardZ;
                } else if (direction === 'backward') {
                    dx = -forwardX;
                    dz = -forwardZ;
                } else if (direction === 'left') {
                    dx = -rightX;
                    dz = -rightZ;
                } else if (direction === 'right') {
                    dx = rightX;
                    dz = rightZ;
                }

                const nextX = prev.gridX + dx;
                const nextZ = prev.gridZ + dz;

                // Check if stepping onto a portal tile on the perimeter
                const matchingExit = (activeChamber.exits || []).find(
                    (ex) =>
                        (!ex.hiddenUntilSearched || searchedNodes.includes(activeChamber.id)) &&
                        ex.gridX === nextX &&
                        ex.gridZ === nextZ
                );

                if (matchingExit && !combat?.active) {
                    soundService.play('portal');
                    setTimeout(() => onSelectNode?.(matchingExit.targetNodeId), 20);
                    return prev;
                }

                // Enforce strict interior tile bounds [1 .. gridWidth-2] so camera NEVER clips into perimeter walls
                const minTileX = 1;
                const maxTileX = Math.max(1, activeChamber.gridWidth - 2);
                const minTileZ = 1;
                const maxTileZ = Math.max(1, activeChamber.gridDepth - 2);

                const clampedX = Math.max(minTileX, Math.min(maxTileX, nextX));
                const clampedZ = Math.max(minTileZ, Math.min(maxTileZ, nextZ));

                if (clampedX !== prev.gridX || clampedZ !== prev.gridZ) {
                    soundService.play('step');
                }
                return {
                    ...prev,
                    gridX: clampedX,
                    gridZ: clampedZ
                };
            });
        },
        [activeChamber, searchedNodes, combat?.active, onSelectNode]
    );

    const handleStepRotate = useCallback((deltaYaw) => {
        soundService.play('click');
        setPlayerGridPos((prev) => ({
            ...prev,
            yaw: prev.yaw + deltaYaw
        }));
    }, []);

    // Keyboard WASD / Arrow / Q / E / C bindings for First-Person Grid-Stepper & Camera Toggle
    useEffect(() => {
        const onKeyDown = (e) => {
            const tag = (e.target?.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

            const key = e.key.toLowerCase();
            if (key === 'w' || e.key === 'ArrowUp') {
                e.preventDefault();
                handleStepMove('forward');
            } else if (key === 's' || e.key === 'ArrowDown') {
                e.preventDefault();
                handleStepMove('backward');
            } else if (key === 'a' || e.key === 'ArrowLeft') {
                e.preventDefault();
                handleStepMove('left');
            } else if (key === 'd' || e.key === 'ArrowRight') {
                e.preventDefault();
                handleStepMove('right');
            } else if (key === 'q') {
                e.preventDefault();
                handleStepRotate(Math.PI / 2);
            } else if (key === 'e') {
                e.preventDefault();
                handleStepRotate(-Math.PI / 2);
            } else if (key === 'c') {
                e.preventDefault();
                onToggleCameraMode?.();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [handleStepMove, handleStepRotate, onToggleCameraMode]);

    // Build and update the Three.js WebGL scene
    useEffect(() => {
        const container = mountRef.current;
        if (!container || !activeChamber) return;

        const width = Math.max(320, container.clientWidth || 800);
        const height = Math.max(280, container.clientHeight || 520);

        const envKey = (activeChamber.environment || adventure?.ambientTrack || 'dungeon').toLowerCase();
        const palette = ENVIRONMENT_PALETTES[envKey] || ENVIRONMENT_PALETTES.dungeon;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(palette.skyColor);
        scene.fog = new THREE.FogExp2(palette.fogColor, 0.022);

        const camera = new THREE.PerspectiveCamera(62, width / height, 0.15, 120);

        const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
        if (isJsdom) return;

        let renderer = null;
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                powerPreference: 'high-performance',
                preserveDrawingBuffer: true
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.shadowMap.enabled = true;
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
        } catch {
            // Headless JSDOM fallback when running unit tests without WebGL
            return;
        }

        // === LIGHTING PIPELINE (Bright, high-contrast warm dungeon lighting — zero black screens) ===
        const hemiLight = new THREE.HemisphereLight(palette.ambientColor, palette.floorSecondary, 1.45);
        hemiLight.position.set(0, activeChamber.ceilingHeight, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight('#fde68a', 0.85);
        dirLight.position.set(6, 12, 8);
        scene.add(dirLight);

        // Player-carried adventurer's lantern light
        const playerLantern = new THREE.PointLight(palette.torchColor, 6.5, 22, 1.4);
        playerLantern.position.set(0, 2.0, 2.0);
        scene.add(playerLantern);

        // Chamber Geometry Group (centered at origin for precision & zero floating-point jitter)
        const roomGroup = new THREE.Group();
        scene.add(roomGroup);

        const roomW = activeChamber.widthMeters;
        const roomD = activeChamber.depthMeters;
        const roomH = activeChamber.ceilingHeight;
        const midX = Math.floor(activeChamber.gridWidth / 2);
        const midZ = Math.floor(activeChamber.gridDepth / 2);

        const floorTex = createProceduralStoneTexture(palette, true);
        if (floorTex) {
            floorTex.repeat.set(activeChamber.gridWidth / 2, activeChamber.gridDepth / 2);
        }
        const wallTex = createProceduralStoneTexture(palette, false);
        if (wallTex) {
            wallTex.repeat.set(4, 2);
        }

        // 1. Tiled Stone Floor
        const floorGeo = new THREE.PlaneGeometry(roomW, roomD);
        const floorMat = new THREE.MeshStandardMaterial({
            color: palette.floorPrimary,
            map: floorTex,
            roughness: 0.78,
            metalness: 0.12
        });
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.receiveShadow = true;
        roomGroup.add(floorMesh);

        // Tactical Grid Overlay Lines
        const gridHelper = new THREE.GridHelper(
            Math.max(roomW, roomD),
            Math.max(activeChamber.gridWidth, activeChamber.gridDepth),
            palette.accentGlow,
            palette.wallSecondary
        );
        gridHelper.position.y = 0.02;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.35;
        roomGroup.add(gridHelper);

        // 2. Vaulted Ceiling Beams (visible in First-Person, open in Isometric)
        const ceilingGroup = new THREE.Group();
        const beamMat = new THREE.MeshStandardMaterial({
            color: palette.wallSecondary,
            roughness: 0.85
        });
        for (let z = -roomD / 2 + TILE_SIZE; z <= roomD / 2 - TILE_SIZE; z += TILE_SIZE * 2) {
            const beam = new THREE.Mesh(new THREE.BoxGeometry(roomW, 0.35, 0.45), beamMat);
            beam.position.set(0, roomH - 0.2, z);
            ceilingGroup.add(beam);
        }
        roomGroup.add(ceilingGroup);

        // 3. Perimeter Masonry Walls & Corner Pillars
        const wallMat = new THREE.MeshStandardMaterial({
            color: palette.wallPrimary,
            map: wallTex,
            roughness: 0.72,
            metalness: 0.15
        });

        const wallThickness = 0.6;
        // North Wall (-Z)
        const northWall = new THREE.Mesh(new THREE.BoxGeometry(roomW + wallThickness, roomH, wallThickness), wallMat);
        northWall.position.set(0, roomH / 2, -roomD / 2);
        roomGroup.add(northWall);

        // South Wall (+Z)
        const southWall = new THREE.Mesh(new THREE.BoxGeometry(roomW + wallThickness, roomH, wallThickness), wallMat);
        southWall.position.set(0, roomH / 2, roomD / 2);
        roomGroup.add(southWall);

        // West Wall (-X)
        const westWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, roomH, roomD + wallThickness), wallMat);
        westWall.position.set(-roomW / 2, roomH / 2, 0);
        roomGroup.add(westWall);

        // East Wall (+X)
        const eastWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, roomH, roomD + wallThickness), wallMat);
        eastWall.position.set(roomW / 2, roomH / 2, 0);
        roomGroup.add(eastWall);

        // 4 Corner Architectural Pillars
        const pillarGeo = new THREE.CylinderGeometry(0.55, 0.65, roomH, 8);
        const pillarMat = new THREE.MeshStandardMaterial({
            color: palette.wallSecondary,
            roughness: 0.6,
            metalness: 0.25
        });
        [
            [-roomW / 2 + 0.4, -roomD / 2 + 0.4],
            [roomW / 2 - 0.4, -roomD / 2 + 0.4],
            [-roomW / 2 + 0.4, roomD / 2 - 0.4],
            [roomW / 2 - 0.4, roomD / 2 - 0.4]
        ].forEach(([px, pz]) => {
            const pillar = new THREE.Mesh(pillarGeo, pillarMat);
            pillar.position.set(px, roomH / 2, pz);
            roomGroup.add(pillar);
        });

        // 4. Flickering Wall Sconces / Braziers with Dynamic Point Lights
        const torchLights = [];
        const torchFlames = [];
        const sconcePositions = [
            [-roomW / 2 + 0.5, 2.6, -roomD / 4],
            [roomW / 2 - 0.5, 2.6, -roomD / 4],
            [-roomW / 2 + 0.5, 2.6, roomD / 4],
            [roomW / 2 - 0.5, 2.6, roomD / 4]
        ];
        sconcePositions.forEach(([tx, ty, tz]) => {
            const bracket = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.12, 0.6, 6),
                new THREE.MeshStandardMaterial({ color: '#1c1917', metalness: 0.8, roughness: 0.3 })
            );
            bracket.position.set(tx, ty - 0.25, tz);
            roomGroup.add(bracket);

            const flameGeo = new THREE.OctahedronGeometry(0.22, 1);
            const flameMat = new THREE.MeshBasicMaterial({ color: palette.torchColor });
            const flame = new THREE.Mesh(flameGeo, flameMat);
            flame.position.set(tx, ty + 0.1, tz);
            roomGroup.add(flame);
            torchFlames.push(flame);

            const tLight = new THREE.PointLight(palette.torchColor, 4.5, 16, 1.5);
            tLight.position.set(tx * 0.85, ty + 0.2, tz * 0.85);
            roomGroup.add(tLight);
            torchLights.push(tLight);
        });

        // 5. Archway Portals for Exits (with Custom GLSL Ripple Shader + Clickable Hitbox)
        const portalMaterials = [];
        const interactiveMeshes = [];

        (activeChamber.exits || []).forEach((exit) => {
            if (exit.hiddenUntilSearched && !searchedNodes.includes(activeChamber.id)) return;

            const portalGroup = new THREE.Group();
            const lx = (exit.gridX - midX) * TILE_SIZE;
            const lz = (exit.gridZ - midZ) * TILE_SIZE;

            let posX = lx;
            let posZ = lz;
            let rotY = 0;

            if (exit.wall === 'north') {
                posZ = -roomD / 2 + 0.38;
                rotY = 0;
            } else if (exit.wall === 'south') {
                posZ = roomD / 2 - 0.38;
                rotY = Math.PI;
            } else if (exit.wall === 'east') {
                posX = roomW / 2 - 0.38;
                rotY = -Math.PI / 2;
            } else if (exit.wall === 'west') {
                posX = -roomW / 2 + 0.38;
                rotY = Math.PI / 2;
            }

            portalGroup.position.set(posX, 0, posZ);
            portalGroup.rotation.y = rotY;

            // Stone Archway Pillars & Lintel
            const archMat = new THREE.MeshStandardMaterial({
                color: '#d97706',
                roughness: 0.4,
                metalness: 0.5
            });
            const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 0.45), archMat);
            leftPost.position.set(-1.1, 1.6, 0);
            portalGroup.add(leftPost);

            const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 0.45), archMat);
            rightPost.position.set(1.1, 1.6, 0);
            portalGroup.add(rightPost);

            const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.45, 0.55), archMat);
            lintel.position.set(0, 3.3, 0);
            portalGroup.add(lintel);

            // Custom GLSL Portal Energy Curtain
            const shaderMat = new THREE.ShaderMaterial({
                vertexShader: PORTAL_VERTEX_SHADER,
                fragmentShader: PORTAL_FRAGMENT_SHADER,
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color(visitedNodes.includes(exit.targetNodeId) ? '#38bdf8' : palette.accentGlow) }
                },
                transparent: true,
                side: THREE.DoubleSide
            });
            portalMaterials.push(shaderMat);

            const portalPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 3.0), shaderMat);
            portalPlane.position.set(0, 1.55, 0.05);
            portalPlane.userData = { type: 'portal', targetNodeId: exit.targetNodeId };
            portalGroup.add(portalPlane);
            interactiveMeshes.push(portalPlane);

            // Overhead Destination Signboard
            const bannerTex = createPortalBannerTexture(exit);
            const bannerMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(2.6, 0.65),
                new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide })
            );
            bannerMesh.position.set(0, 3.9, 0.12);
            portalGroup.add(bannerMesh);

            roomGroup.add(portalGroup);
        });

        // 6. Chamber Props (Treasure Coffer, Runic Altar, Campfire Brazier, Trap Plate)
        (activeChamber.props || []).forEach((prop) => {
            const px = (prop.gridX - midX) * TILE_SIZE;
            const pz = (prop.gridZ - midZ) * TILE_SIZE;

            if (prop.type === 'chest' && !lootedNodes.includes(activeChamber.id)) {
                const chestGroup = new THREE.Group();
                chestGroup.position.set(px, 0, pz);
                const box = new THREE.Mesh(
                    new THREE.BoxGeometry(1.1, 0.75, 0.75),
                    new THREE.MeshStandardMaterial({ color: '#92400e', roughness: 0.5, metalness: 0.3 })
                );
                box.position.y = 0.38;
                chestGroup.add(box);
                const lid = new THREE.Mesh(
                    new THREE.BoxGeometry(1.14, 0.22, 0.79),
                    new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.3, metalness: 0.8 })
                );
                lid.position.y = 0.8;
                chestGroup.add(lid);
                roomGroup.add(chestGroup);
            } else if (prop.type === 'altar') {
                const altarGroup = new THREE.Group();
                altarGroup.position.set(px, 0, pz);
                const base = new THREE.Mesh(
                    new THREE.CylinderGeometry(1.1, 1.35, 1.1, 8),
                    new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.4, metalness: 0.4 })
                );
                base.position.y = 0.55;
                altarGroup.add(base);
                const crystal = new THREE.Mesh(
                    new THREE.OctahedronGeometry(0.48, 0),
                    new THREE.MeshStandardMaterial({
                        color: palette.accentGlow,
                        emissive: palette.accentGlow,
                        emissiveIntensity: 0.7,
                        roughness: 0.15
                    })
                );
                crystal.position.y = 1.65;
                altarGroup.add(crystal);
                torchFlames.push(crystal);
                roomGroup.add(altarGroup);
            } else if (prop.type === 'campfire') {
                const fireGroup = new THREE.Group();
                fireGroup.position.set(px, 0, pz);
                const ring = new THREE.Mesh(
                    new THREE.TorusGeometry(0.65, 0.16, 6, 10),
                    new THREE.MeshStandardMaterial({ color: '#57534e', roughness: 0.8 })
                );
                ring.rotation.x = Math.PI / 2;
                ring.position.y = 0.12;
                fireGroup.add(ring);
                const ember = new THREE.Mesh(
                    new THREE.ConeGeometry(0.38, 0.85, 6),
                    new THREE.MeshBasicMaterial({ color: '#f97316' })
                );
                ember.position.y = 0.45;
                fireGroup.add(ember);
                torchFlames.push(ember);
                roomGroup.add(fireGroup);
            }
        });

        // 7. 3D Tabletop Miniature Standees / Tokens (Player Hero, Companions, and Enemy Monsters)
        const standeeGroup = new THREE.Group();
        roomGroup.add(standeeGroup);

        const buildStandeeMesh = ({
            x,
            z,
            name,
            roleLabel,
            hp,
            maxHp,
            ac,
            borderColor,
            badgeIcon,
            isBoss = false,
            enemyInstance = null
        }) => {
            const tokenRoot = new THREE.Group();
            tokenRoot.position.set(x, 0, z);

            const scale = isBoss ? 1.35 : 1.0;
            // Sculpted Miniature Base
            const baseGeo = new THREE.CylinderGeometry(0.68 * scale, 0.78 * scale, 0.22, 24);
            const baseMat = new THREE.MeshStandardMaterial({
                color: borderColor,
                roughness: 0.35,
                metalness: 0.7
            });
            const baseMesh = new THREE.Mesh(baseGeo, baseMat);
            baseMesh.position.y = 0.11;
            tokenRoot.add(baseMesh);

            // Upright Acrylic Standee Billboard Card
            const cardTex = createStandeeTexture({
                name,
                roleLabel,
                hp,
                maxHp,
                ac,
                borderColor,
                badgeIcon,
                isBoss
            });
            const cardGeo = new THREE.PlaneGeometry(1.35 * scale, 1.72 * scale);
            const cardMat = new THREE.MeshBasicMaterial({
                map: cardTex,
                side: THREE.DoubleSide
            });
            const cardMesh = new THREE.Mesh(cardGeo, cardMat);
            cardMesh.position.y = 0.22 + (1.72 * scale) / 2;
            if (enemyInstance) {
                cardMesh.userData = { type: 'enemy', enemy: enemyInstance };
                interactiveMeshes.push(cardMesh);
            }
            tokenRoot.add(cardMesh);

            standeeGroup.add(tokenRoot);
            return tokenRoot;
        };

        // Enemy Standees (either live combat enemies or undefeated room encounter monsters)
        const activeEnemies = combat?.active
            ? (combat.enemies || []).filter((e) => e.hp > 0)
            : !defeatedNodes.includes(activeChamber.id) && currentNode?.encounter?.monsters
                ? currentNode.encounter.monsters.flatMap((m, idx) => {
                      const count = Math.min(4, m.count || 1);
                      return Array.from({ length: count }, (_, cIdx) => ({
                          instanceId: `preview_${idx}_${cIdx}`,
                          name: count > 1 ? `${m.name} #${cIdx + 1}` : m.name,
                          hp: m.hp || 18,
                          maxHp: m.maxHp || 18,
                          ac: m.ac || 13,
                          isBoss: activeChamber.type === 'boss' && idx === 0
                      }));
                  })
                : [];

        activeEnemies.slice(0, 6).forEach((enemy, idx) => {
            const total = Math.min(6, activeEnemies.length);
            const spread = (idx - (total - 1) / 2) * TILE_SIZE * 1.15;
            const ez = -TILE_SIZE * (enemy.isBoss ? 1.5 : 1.0);
            buildStandeeMesh({
                x: spread,
                z: ez,
                name: enemy.name,
                roleLabel: combat?.active ? 'Hostile Target (Click to Strike)' : 'Chamber Threat',
                hp: enemy.hp,
                maxHp: enemy.maxHp,
                ac: enemy.ac,
                borderColor: enemy.isBoss ? '#facc15' : '#ef4444',
                badgeIcon: enemy.isBoss ? '🐲' : '👹',
                isBoss: Boolean(enemy.isBoss),
                enemyInstance: enemy
            });
        });

        // Companion Standees flanking the player
        companions
            .filter((c) => !c.isDead && (c.hp === undefined || c.hp > 0))
            .slice(0, 2)
            .forEach((comp, idx) => {
                const offsetSide = idx === 0 ? -TILE_SIZE : TILE_SIZE;
                buildStandeeMesh({
                    x: offsetSide,
                    z: TILE_SIZE * 1.2,
                    name: comp.name,
                    roleLabel: `${comp.race || ''} ${comp.class || ''}`.trim(),
                    hp: comp.hp,
                    maxHp: comp.maxHp,
                    ac: comp.ac,
                    borderColor: '#6366f1',
                    badgeIcon: '🛡️',
                    isBoss: false
                });
            });

        // Player Hero Token (visible in Isometric mode, hidden in First-Person eye camera)
        const heroToken = buildStandeeMesh({
            x: 0,
            z: TILE_SIZE * 2,
            name: character?.name || 'Hero',
            roleLabel: `Lvl ${character?.level || 1} ${character?.class || 'Adventurer'}`,
            hp: character?.hp || 10,
            maxHp: character?.maxHp || 10,
            ac: derivedStats?.ac || 14,
            borderColor: '#10b981',
            badgeIcon: '⚔️',
            isBoss: false
        });

        // Raycaster for clicking portals or enemy standees in the 3D viewport
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const onCanvasClick = (event) => {
            if (!renderer?.domElement) return;
            const rect = renderer.domElement.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);
            const hits = raycaster.intersectObjects(interactiveMeshes, false);
            if (hits.length > 0) {
                const data = hits[0].object.userData;
                if (data?.type === 'portal' && data.targetNodeId && !combat?.active) {
                    soundService.play('portal');
                    onSelectNode?.(data.targetNodeId);
                } else if (data?.type === 'enemy' && data.enemy) {
                    if (combat?.active) {
                        onWeaponAttack?.(
                            { name: 'Longsword', damageDice: '1d8', damageType: 'Slashing' },
                            data.enemy,
                            'normal',
                            false
                        );
                    } else if (currentNode?.encounter) {
                        onTriggerEncounter?.(currentNode.encounter);
                    }
                }
            }
        };
        renderer.domElement.addEventListener('click', onCanvasClick);

        // Save references for live camera interpolation
        engineRef.current = {
            scene,
            camera,
            renderer,
            ceilingGroup,
            northWall,
            southWall,
            eastWall,
            westWall,
            heroToken,
            playerLantern,
            midX,
            midZ,
            targetCamPos: new THREE.Vector3(0, 1.7, 3.0),
            targetLookAt: new THREE.Vector3(0, 1.6, 0),
            currentLookAt: new THREE.Vector3(0, 1.6, 0)
        };

        let animId = null;
        const startTime = performance.now();

        const animate = (now) => {
            animId = requestAnimationFrame(animate);
            const elapsed = (now - startTime) * 0.001;

            // Update custom shader uniforms
            portalMaterials.forEach((mat) => {
                mat.uniforms.uTime.value = elapsed;
            });

            // Flicker torch flames & lights
            torchFlames.forEach((flame, idx) => {
                flame.rotation.y = elapsed * 2.2 + idx;
                const s = 0.92 + Math.sin(elapsed * 7.5 + idx * 1.7) * 0.12;
                flame.scale.set(s, s * 1.15, s);
            });
            torchLights.forEach((light, idx) => {
                light.intensity = 4.2 + Math.sin(elapsed * 8.0 + idx * 2.1) * 0.65;
            });

            // Smoothly interpolate camera position and lookAt target
            const eng = engineRef.current;
            if (eng) {
                camera.position.lerp(eng.targetCamPos, 0.18);
                eng.currentLookAt.lerp(eng.targetLookAt, 0.18);
                camera.lookAt(eng.currentLookAt);
            }

            renderer.render(scene, camera);
        };
        animId = requestAnimationFrame(animate);

        const handleResize = () => {
            if (!container || !renderer) return;
            const w = Math.max(320, container.clientWidth);
            const h = Math.max(280, container.clientHeight);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer?.domElement?.removeEventListener('click', onCanvasClick);
            if (animId) cancelAnimationFrame(animId);
            renderer?.dispose?.();
        };
    }, [
        activeChamber,
        adventure?.ambientTrack,
        combat,
        companions,
        character?.name,
        character?.level,
        character?.class,
        character?.hp,
        character?.maxHp,
        derivedStats?.ac,
        currentNode?.encounter,
        defeatedNodes,
        lootedNodes,
        searchedNodes,
        visitedNodes,
        onSelectNode,
        onTriggerEncounter,
        onWeaponAttack
    ]);

    // Update camera target transforms whenever playerGridPos or cameraMode changes
    useEffect(() => {
        const eng = engineRef.current;
        if (!eng || !activeChamber) return;

        const px = (playerGridPos.gridX - eng.midX) * TILE_SIZE;
        const pz = (playerGridPos.gridZ - eng.midZ) * TILE_SIZE;

        if (eng.heroToken) {
            eng.heroToken.position.set(px, 0, pz);
            eng.heroToken.visible = cameraMode === 'isometric';
        }
        if (eng.playerLantern) {
            eng.playerLantern.position.set(px, 2.3, pz);
        }

        if (cameraMode === 'isometric') {
            // Isometric Tactical Camera: angled overhead view, cutaway south/east walls & ceiling for unobstructed sightlines
            eng.ceilingGroup.visible = false;
            eng.southWall.visible = false;
            eng.eastWall.visible = false;
            eng.northWall.visible = true;
            eng.westWall.visible = true;

            eng.targetCamPos.set(11.5, 13.5, 12.5);
            eng.targetLookAt.set(0, 0.8, -0.5);
        } else {
            // First-Person Grid-Stepper Camera: eye-level inside chamber with full walls & vaulted ceiling
            eng.ceilingGroup.visible = true;
            eng.southWall.visible = true;
            eng.eastWall.visible = true;
            eng.northWall.visible = true;
            eng.westWall.visible = true;

            const eyeY = 1.72;
            const lookDist = 6.0;
            const lookX = px - Math.sin(playerGridPos.yaw) * lookDist;
            const lookZ = pz - Math.cos(playerGridPos.yaw) * lookDist;

            eng.targetCamPos.set(px, eyeY, pz);
            eng.targetLookAt.set(lookX, eyeY - 0.12, lookZ);
        }
    }, [playerGridPos, cameraMode, activeChamber]);

    return (
        <div
            data-testid="dungeon-viewport-3d"
            data-current-node={currentNodeId}
            data-camera-mode={cameraMode}
            className="relative w-full h-full min-h-[340px] bg-slate-950 overflow-hidden select-none"
        >
            {/* Three.js WebGL Mount Container */}
            <div ref={mountRef} className="w-full h-full min-h-[340px]" />

            {/* Diegetic Parchment HUD Overlay */}
            <DiegeticParchmentHUD
                adventure={adventure}
                currentNode={currentNode}
                currentChamber={activeChamber}
                character={character}
                companions={companions}
                derivedStats={derivedStats}
                visitedNodes={visitedNodes}
                defeatedNodes={defeatedNodes}
                lootedNodes={lootedNodes}
                searchedNodes={searchedNodes}
                completedChoices={completedChoices}
                inCombat={Boolean(combat?.active)}
                cameraMode={cameraMode}
                onToggleCameraMode={onToggleCameraMode}
                playerGridPos={playerGridPos}
                onStepMove={handleStepMove}
                onStepRotate={handleStepRotate}
                onSelectNode={onSelectNode}
                onSelectChoice={onSelectChoice}
                onTriggerEncounter={onTriggerEncounter}
                onLootRoom={onLootRoom}
                onManualRoll={onManualRoll}
            />
        </div>
    );
}
