import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import soundService from '../../services/soundService';

const DICE_CATALOG = [
    { sides: 4, label: 'd4', color: '#dc2626', accent: '#fca5a5' },
    { sides: 6, label: 'd6', color: '#ea580c', accent: '#fdba74' },
    { sides: 8, label: 'd8', color: '#ca8a04', accent: '#fde047' },
    { sides: 10, label: 'd10', color: '#16a34a', accent: '#86efac' },
    { sides: 12, label: 'd12', color: '#2563eb', accent: '#93c5fd' },
    { sides: 20, label: 'd20', color: '#7c3aed', accent: '#c4b5fd' }
];

function createPolyhedronGeometry(sides) {
    switch (Number(sides)) {
        case 4:
            return new THREE.TetrahedronGeometry(1.15, 0);
        case 6:
            return new THREE.BoxGeometry(1.4, 1.4, 1.4);
        case 8:
            return new THREE.OctahedronGeometry(1.2, 0);
        case 10:
            // Pentagonal bipyramid approximation using CylinderGeometry or Octahedron
            return new THREE.OctahedronGeometry(1.2, 0);
        case 12:
            return new THREE.DodecahedronGeometry(1.2, 0);
        case 20:
        default:
            return new THREE.IcosahedronGeometry(1.25, 0);
    }
}

function createDieBadgeTexture(value, sides, baseColor, isCrit, isFumble) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Rich gem-like background gradient
    const grad = ctx.createRadialGradient(128, 100, 16, 128, 128, 140);
    if (isCrit) {
        grad.addColorStop(0, '#fef08a');
        grad.addColorStop(0.5, '#eab308');
        grad.addColorStop(1, '#713f12');
    } else if (isFumble) {
        grad.addColorStop(0, '#fca5a5');
        grad.addColorStop(0.5, '#dc2626');
        grad.addColorStop(1, '#450a0a');
    } else {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.25, baseColor);
        grad.addColorStop(1, '#0f172a');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Engraved gold rim
    ctx.strokeStyle = isCrit ? '#fef08a' : '#f59e0b';
    ctx.lineWidth = 10;
    ctx.strokeRect(12, 12, 232, 232);

    // Die type label
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(`D${sides}`, 128, 56);

    // Die rolled number
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 10;
    ctx.font = 'bold 104px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(value ?? sides), 128, 142);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
}

export default function PolyhedralDice3D({
    defaultSides = 20,
    onRollComplete,
    compact = false,
    pendingLabel = null
}) {
    const mountRef = useRef(null);
    const sceneStateRef = useRef(null);
    const [selectedSides, setSelectedSides] = useState(defaultSides);
    const [isRolling, setIsRolling] = useState(false);
    const [lastRoll, setLastRoll] = useState({
        sides: defaultSides,
        value: defaultSides,
        isCrit: false,
        isFumble: false
    });

    const triggerPhysicsRoll = useCallback((sidesToRoll = selectedSides) => {
        if (isRolling) return;
        const resultValue = Math.floor(Math.random() * sidesToRoll) + 1;
        const isCrit = sidesToRoll === 20 && resultValue === 20;
        const isFumble = sidesToRoll === 20 && resultValue === 1;

        setSelectedSides(sidesToRoll);
        setIsRolling(true);
        soundService.play('diceRoll');

        const s = sceneStateRef.current;
        if (s && s.rebuildDieMesh) {
            s.rebuildDieMesh(sidesToRoll, resultValue, isCrit, isFumble, true);
        }

        // Complete physics settle after 750ms
        setTimeout(() => {
            setIsRolling(false);
            const rollPayload = {
                die: `d${sidesToRoll}`,
                sides: sidesToRoll,
                value: resultValue,
                result: resultValue,
                isCrit,
                isFumble,
                timestamp: Date.now()
            };
            setLastRoll(rollPayload);
            if (isCrit) {
                soundService.play('critical');
            } else if (isFumble) {
                soundService.play('fumble');
            }
            onRollComplete?.(rollPayload);
        }, 720);
    }, [isRolling, selectedSides, onRollComplete]);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = Math.max(220, container.clientWidth || 280);
        const height = compact ? 150 : 190;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#13111c');

        const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
        camera.position.set(0, 4.6, 5.2);
        camera.lookAt(0, 0, 0);

        const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
        if (isJsdom) return;

        let renderer = null;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
        } catch {
            // Headless JSDOM fallback when WebGL context is unavailable in unit tests
            return;
        }

        // Lighting
        const ambient = new THREE.AmbientLight('#fde68a', 1.2);
        scene.add(ambient);

        const keyLight = new THREE.PointLight('#fbbf24', 8, 20);
        keyLight.position.set(3, 6, 4);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight('#818cf8', 5, 18);
        rimLight.position.set(-4, 4, -3);
        scene.add(rimLight);

        // Octagonal Velvet & Brass Dice Tray Floor
        const trayGeo = new THREE.CylinderGeometry(3.4, 3.6, 0.3, 8);
        const trayMat = new THREE.MeshStandardMaterial({
            color: '#31102f',
            roughness: 0.75,
            metalness: 0.15
        });
        const trayMesh = new THREE.Mesh(trayGeo, trayMat);
        trayMesh.position.y = -1.35;
        scene.add(trayMesh);

        const rimGeo = new THREE.TorusGeometry(3.45, 0.18, 8, 8);
        const rimMat = new THREE.MeshStandardMaterial({
            color: '#d97706',
            roughness: 0.35,
            metalness: 0.8
        });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.rotation.x = Math.PI / 2;
        rimMesh.position.y = -1.2;
        scene.add(rimMesh);

        let dieGroup = new THREE.Group();
        scene.add(dieGroup);

        const physics = {
            pos: new THREE.Vector3(0, 0, 0),
            vel: new THREE.Vector3(0, 0, 0),
            angVel: new THREE.Vector3(0.4, 0.7, 0.2),
            active: false,
            bounces: 0
        };

        const rebuildDieMesh = (sides, value, isCrit, isFumble, launchImpulse = false) => {
            while (dieGroup.children.length > 0) {
                const child = dieGroup.children[0];
                dieGroup.remove(child);
                child.geometry?.dispose?.();
            }

            const dieMeta = DICE_CATALOG.find((d) => d.sides === Number(sides)) || DICE_CATALOG[5];
            const geom = createPolyhedronGeometry(sides);
            const tex = createDieBadgeTexture(value, sides, dieMeta.color, isCrit, isFumble);

            const mat = new THREE.MeshStandardMaterial({
                color: isCrit ? '#facc15' : isFumble ? '#ef4444' : dieMeta.color,
                map: tex,
                roughness: 0.25,
                metalness: 0.35,
                emissive: isCrit ? '#ca8a04' : isFumble ? '#991b1b' : '#1e1b4b',
                emissiveIntensity: isCrit || isFumble ? 0.55 : 0.2
            });

            const mesh = new THREE.Mesh(geom, mat);
            dieGroup.add(mesh);

            // Wireframe gold polyhedral edges for clear 3D facet definition
            const wireGeo = new THREE.EdgesGeometry(geom);
            const wireMat = new THREE.LineBasicMaterial({
                color: isCrit ? '#fef08a' : '#fbbf24',
                transparent: true,
                opacity: 0.85
            });
            const wire = new THREE.LineSegments(wireGeo, wireMat);
            dieGroup.add(wire);

            if (launchImpulse) {
                physics.pos.set((Math.random() - 0.5) * 1.6, 1.9, (Math.random() - 0.5) * 1.2);
                physics.vel.set((Math.random() - 0.5) * 4.5, -2.5, (Math.random() - 0.5) * 4.5);
                physics.angVel.set(
                    (Math.random() * 14 + 10) * (Math.random() > 0.5 ? 1 : -1),
                    (Math.random() * 14 + 10) * (Math.random() > 0.5 ? 1 : -1),
                    (Math.random() * 12 + 8)
                );
                physics.active = true;
                physics.bounces = 0;
            } else {
                physics.pos.set(0, 0, 0);
                physics.active = false;
                dieGroup.position.set(0, 0, 0);
                dieGroup.rotation.set(0.25, 0.4, 0);
            }
        };

        rebuildDieMesh(defaultSides, defaultSides, false, false, false);
        sceneStateRef.current = { rebuildDieMesh };

        let animId = null;
        let lastTime = performance.now();

        const animate = (now) => {
            animId = requestAnimationFrame(animate);
            const dt = Math.min(0.05, (now - lastTime) / 1000);
            lastTime = now;

            if (physics.active) {
                // Gravity
                physics.vel.y -= 24.0 * dt;
                physics.pos.addScaledVector(physics.vel, dt);

                // Floor restitution bounce
                const floorY = -0.15;
                if (physics.pos.y < floorY) {
                    physics.pos.y = floorY;
                    physics.vel.y = -physics.vel.y * 0.58;
                    physics.vel.x *= 0.78;
                    physics.vel.z *= 0.78;
                    physics.angVel.multiplyScalar(0.76);
                    physics.bounces += 1;
                    if (physics.bounces > 4 && Math.abs(physics.vel.y) < 0.8) {
                        physics.active = false;
                        physics.pos.set(0, 0, 0);
                        dieGroup.rotation.set(0.15, 0.25, 0);
                    }
                }

                // Tray wall bounds
                const r = Math.hypot(physics.pos.x, physics.pos.z);
                if (r > 2.0) {
                    const scale = 2.0 / r;
                    physics.pos.x *= scale;
                    physics.pos.z *= scale;
                    physics.vel.x *= -0.65;
                    physics.vel.z *= -0.65;
                }

                dieGroup.position.copy(physics.pos);
                dieGroup.rotation.x += physics.angVel.x * dt;
                dieGroup.rotation.y += physics.angVel.y * dt;
                dieGroup.rotation.z += physics.angVel.z * dt;
            } else {
                // Gentle idle levitation and slow rotation so facets glint in torchlight
                dieGroup.position.y = Math.sin(now * 0.0025) * 0.08;
                dieGroup.rotation.y += 0.45 * dt;
            }

            renderer.render(scene, camera);
        };
        animId = requestAnimationFrame(animate);

        return () => {
            if (animId) cancelAnimationFrame(animId);
            renderer?.dispose?.();
        };
    }, [compact, defaultSides]);

    return (
        <div
            data-testid="polyhedral-dice-3d"
            className="rounded-xl border border-amber-500/40 bg-slate-950/95 p-3 text-amber-100 shadow-xl space-y-2.5"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="text-base">🎲</span>
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-amber-300">
                        3D Polyhedral Physics Dice
                    </span>
                </div>
                {lastRoll && (
                    <span
                        data-testid="dice-3d-result"
                        className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                            lastRoll.isCrit
                                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400'
                                : lastRoll.isFumble
                                    ? 'bg-red-500/30 text-red-300 border border-red-400'
                                    : 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                        }`}
                    >
                        d{lastRoll.sides}: {lastRoll.value}
                        {lastRoll.isCrit ? ' CRIT!' : lastRoll.isFumble ? ' FUMBLE!' : ''}
                    </span>
                )}
            </div>

            {pendingLabel && (
                <div className="text-[11px] text-amber-200/90 bg-amber-950/50 border border-amber-500/30 rounded-lg px-2.5 py-1">
                    ⚡ {pendingLabel}
                </div>
            )}

            {/* 3D WebGL Physics Tray Canvas */}
            <div
                ref={mountRef}
                onClick={() => triggerPhysicsRoll(selectedSides)}
                title="Click tray to hurl 3D polyhedral die"
                className="w-full rounded-lg overflow-hidden border border-amber-700/40 cursor-pointer relative bg-slate-900 flex items-center justify-center"
                style={{ minHeight: compact ? '150px' : '190px' }}
            />

            {/* Polyhedral Selector Strip */}
            <div className="grid grid-cols-6 gap-1.5">
                {DICE_CATALOG.map((d) => (
                    <button
                        key={d.sides}
                        type="button"
                        disabled={isRolling}
                        onClick={() => triggerPhysicsRoll(d.sides)}
                        data-testid={`roll-3d-${d.label}`}
                        className={`py-1.5 px-1 rounded-lg font-bold text-xs text-white transition-all active:scale-95 ${
                            selectedSides === d.sides ? 'ring-2 ring-amber-300 scale-105' : 'opacity-85 hover:opacity-100'
                        }`}
                        style={{
                            background: `linear-gradient(135deg, ${d.color}, #1e1b4b)`
                        }}
                    >
                        {d.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
