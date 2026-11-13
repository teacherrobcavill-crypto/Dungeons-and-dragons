import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { compileSpatialLayout, TILE_SIZE } from '../../services/spatialCompiler';
import {
    getSceneImage,
    getCharacterAvatar,
    getCompanionAvatar,
    getMonsterImage,
    getMonsterVisualProfile,
    resolveAssetUrl
} from '../../data/assets';
import DiegeticParchmentHUD from './DiegeticParchmentHUD';
import soundService from '../../services/soundService';

const ENVIRONMENT_PALETTES = {
    forest: {
        skyColor: '#13261c',
        fogColor: '#193024',
        groundPrimary: '#364d2c',
        groundSecondary: '#293b21',
        pathColor: '#6b533b',
        accentGlow: '#4ade80',
        torchColor: '#fbbf24',
        ambientColor: '#d9f99d',
        particleColor: '#fde047'
    },
    jungle: {
        skyColor: '#102920',
        fogColor: '#153328',
        groundPrimary: '#2d4f33',
        groundSecondary: '#1f3a24',
        pathColor: '#786242',
        accentGlow: '#34d399',
        torchColor: '#fde047',
        ambientColor: '#a7f3d0',
        particleColor: '#6ee7b7'
    },
    cavern: {
        skyColor: '#0e1b26',
        fogColor: '#132433',
        groundPrimary: '#334155',
        groundSecondary: '#1e293b',
        pathColor: '#475569',
        accentGlow: '#38bdf8',
        torchColor: '#fb923c',
        ambientColor: '#bae6fd',
        particleColor: '#7dd3fc'
    },
    volcano: {
        skyColor: '#290d0d',
        fogColor: '#361111',
        groundPrimary: '#291d1d',
        groundSecondary: '#1c1414',
        pathColor: '#451a1a',
        accentGlow: '#f97316',
        torchColor: '#ff5722',
        ambientColor: '#fed7aa',
        particleColor: '#fb923c'
    },
    town: {
        skyColor: '#1e2638',
        fogColor: '#263047',
        groundPrimary: '#57534e',
        groundSecondary: '#44403c',
        pathColor: '#78716c',
        accentGlow: '#fbbf24',
        torchColor: '#f59e0b',
        ambientColor: '#fde68a',
        particleColor: '#fcd34d'
    },
    city: {
        skyColor: '#161e2e',
        fogColor: '#1e293b',
        groundPrimary: '#475569',
        groundSecondary: '#334155',
        pathColor: '#64748b',
        accentGlow: '#fbbf24',
        torchColor: '#f59e0b',
        ambientColor: '#cbd5e1',
        particleColor: '#fde68a'
    },
    manor: {
        skyColor: '#211324',
        fogColor: '#2a182e',
        groundPrimary: '#4a3228',
        groundSecondary: '#36231b',
        pathColor: '#7f1d1d',
        accentGlow: '#e879f9',
        torchColor: '#fb923c',
        ambientColor: '#f5d0fe',
        particleColor: '#f0abfc'
    },
    crypt: {
        skyColor: '#0f1c1e',
        fogColor: '#142628',
        groundPrimary: '#2f3e46',
        groundSecondary: '#1f2a30',
        pathColor: '#115e59',
        accentGlow: '#34d399',
        torchColor: '#6ee7b7',
        ambientColor: '#a7f3d0',
        particleColor: '#34d399'
    },
    temple: {
        skyColor: '#261f12',
        fogColor: '#302717',
        groundPrimary: '#695436',
        groundSecondary: '#4d3c24',
        pathColor: '#b45309',
        accentGlow: '#facc15',
        torchColor: '#fde047',
        ambientColor: '#fef08a',
        particleColor: '#fde047'
    },
    dungeon: {
        skyColor: '#171626',
        fogColor: '#1e1c30',
        groundPrimary: '#3f3f46',
        groundSecondary: '#27272a',
        pathColor: '#52525b',
        accentGlow: '#f59e0b',
        torchColor: '#ff9800',
        ambientColor: '#cbd5e1',
        particleColor: '#fbbf24'
    }
};

const CLASS_VISUALS = {
    fighter: { armor: '#475569', cape: '#b91c1c', weapon: 'swordShield' },
    paladin: { armor: '#cbd5e1', cape: '#eab308', weapon: 'swordShield' },
    barbarian: { armor: '#78350f', cape: '#991b1b', weapon: 'greataxe' },
    rogue: { armor: '#1e293b', cape: '#312e81', weapon: 'daggers' },
    ranger: { armor: '#365314', cape: '#166534', weapon: 'bow' },
    wizard: { armor: '#1d4ed8', cape: '#312e81', weapon: 'staff' },
    sorcerer: { armor: '#7e22ce', cape: '#9d174d', weapon: 'staff' },
    warlock: { armor: '#4c1d95', cape: '#581c87', weapon: 'staff' },
    cleric: { armor: '#ca8a04', cape: '#f8fafc', weapon: 'mace' },
    druid: { armor: '#3f6212', cape: '#713f12', weapon: 'staff' },
    bard: { armor: '#be185d', cape: '#7c3aed', weapon: 'swordShield' },
    monk: { armor: '#d97706', cape: '#92400e', weapon: 'staff' }
};

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
    float rim = smoothstep(0.95, 0.30, dist);
    vec3 col = mix(uColor * 0.45, uColor * 1.45, ripple * rim);
    float alpha = clamp(rim * (0.42 + 0.32 * ripple), 0.12, 0.80);
    gl_FragColor = vec4(col, alpha);
}
`;

function createTerrainTexture(envKey, palette) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = palette.groundSecondary;
    ctx.fillRect(0, 0, 512, 512);

    const isNatural = envKey === 'forest' || envKey === 'jungle' || envKey === 'cavern' || envKey === 'volcano';
    if (isNatural) {
        // Organic terrain patches + subtle tactical grid
        for (let i = 0; i < 180; i++) {
            const rx = ((i * 73) % 512);
            const ry = ((i * 137) % 512);
            const rad = 14 + (i % 28);
            ctx.beginPath();
            ctx.arc(rx, ry, rad, 0, Math.PI * 2);
            ctx.fillStyle = i % 3 === 0 ? palette.groundPrimary : i % 5 === 0 ? palette.pathColor : palette.groundSecondary;
            ctx.globalAlpha = 0.42;
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = 'rgba(255,255,255,0.045)';
        ctx.lineWidth = 2;
        for (let g = 0; g <= 512; g += 128) {
            ctx.beginPath();
            ctx.moveTo(g, 0);
            ctx.lineTo(g, 512);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, g);
            ctx.lineTo(512, g);
            ctx.stroke();
        }
    } else {
        // Cobblestone / Carved Flagstone pattern
        const cells = 4;
        const step = 512 / cells;
        for (let r = 0; r < cells; r++) {
            for (let c = 0; c < cells; c++) {
                ctx.fillStyle = (r + c) % 2 === 0 ? palette.groundPrimary : palette.groundSecondary;
                ctx.fillRect(c * step + 4, r * step + 4, step - 8, step - 8);
                ctx.strokeStyle = 'rgba(255,255,255,0.10)';
                ctx.lineWidth = 2;
                ctx.strokeRect(c * step + 7, r * step + 7, step - 14, step - 14);
            }
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
}

function drawBadgeCanvas(ctx, { name, hp, maxHp, ac, borderColor, badgeIcon, isTargeted, imgObj }) {
    ctx.clearRect(0, 0, 320, 148);

    // Pill background
    ctx.fillStyle = isTargeted ? 'rgba(69, 10, 10, 0.94)' : 'rgba(15, 23, 42, 0.90)';
    ctx.strokeStyle = isTargeted ? '#fde047' : borderColor;
    ctx.lineWidth = isTargeted ? 6 : 4;

    const r = 24;
    ctx.beginPath();
    ctx.moveTo(10 + r, 10);
    ctx.lineTo(310 - r, 10);
    ctx.quadraticCurveTo(310, 10, 310, 10 + r);
    ctx.lineTo(310, 138 - r);
    ctx.quadraticCurveTo(310, 138, 310 - r, 138);
    ctx.lineTo(10 + r, 138);
    ctx.quadraticCurveTo(10, 138, 10, 138 - r);
    ctx.lineTo(10, 10 + r);
    ctx.quadraticCurveTo(10, 10, 10 + r, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Circular Portrait Medallion on Left
    const cx = 64;
    const cy = 74;
    const rad = 42;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.clip();

    if (imgObj && imgObj.complete && imgObj.naturalWidth > 0) {
        ctx.drawImage(imgObj, cx - rad, cy - rad, rad * 2, rad * 2);
    } else {
        ctx.font = '42px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(badgeIcon || '⚔️', cx, cy + 2);
    }
    ctx.restore();

    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.strokeStyle = isTargeted ? '#fde047' : borderColor;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Name
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 23px Georgia, serif';
    const shortName = String(name || 'Unit').slice(0, 15);
    ctx.fillText(shortName, 118, 46);

    // AC Pill
    if (ac) {
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`🛡️ AC ${ac}`, 118, 76);
    }

    if (isTargeted) {
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('🎯 TARGET', 214, 76);
    }

    // HP Bar
    if (typeof hp === 'number' && typeof maxHp === 'number' && maxHp > 0) {
        const pct = Math.max(0, Math.min(1, hp / maxHp));
        ctx.fillStyle = '#020617';
        ctx.fillRect(118, 96, 174, 24);
        ctx.fillStyle = pct > 0.5 ? '#10b981' : pct > 0.25 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(118, 96, Math.round(174 * pct), 24);
        ctx.strokeStyle = 'rgba(255,255,255,0.65)';
        ctx.lineWidth = 2;
        ctx.strokeRect(118, 96, 174, 24);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(`${hp}/${maxHp}`, 205, 109);
    }
}

function createFloatingUnitBadge(opts) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 148;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    drawBadgeCanvas(ctx, { ...opts, imgObj: null });
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;

    if (opts.portraitUrl && typeof Image !== 'undefined') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            drawBadgeCanvas(ctx, { ...opts, imgObj: img });
            tex.needsUpdate = true;
        };
        img.src = opts.portraitUrl;
    }

    return tex;
}

function createPortalBannerTexture(exit) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, 500, 116);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🚪 ${exit.wall.toUpperCase()} PATH`, 256, 44);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 28px Georgia, serif';
    const cleanTitle = (exit.targetTitle || exit.targetNodeId).replace(/^\d+\.\s*/, '').slice(0, 28);
    ctx.fillText(cleanTitle, 256, 88);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
}

function buildPineTree(scale = 1.0, snowCapped = false) {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18 * scale, 0.28 * scale, 1.6 * scale, 7),
        new THREE.MeshStandardMaterial({ color: '#452719', roughness: 0.9 })
    );
    trunk.position.y = 0.8 * scale;
    g.add(trunk);

    const foliageColor = snowCapped ? '#cbd5e1' : '#166534';
    const foliageDark = snowCapped ? '#475569' : '#14532d';
    [
        { r: 1.25, h: 2.1, y: 2.0, col: foliageDark },
        { r: 0.98, h: 1.8, y: 3.1, col: foliageColor },
        { r: 0.68, h: 1.5, y: 4.05, col: foliageColor }
    ].forEach((tier) => {
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(tier.r * scale, tier.h * scale, 8),
            new THREE.MeshStandardMaterial({ color: tier.col, roughness: 0.82 })
        );
        cone.position.y = tier.y * scale;
        g.add(cone);
    });
    return g;
}

function buildHero3DMesh({ charClass = 'fighter', scale = 1.0 }) {
    const clsKey = (charClass || 'fighter').toLowerCase();
    const vis = CLASS_VISUALS[clsKey] || CLASS_VISUALS.fighter;
    const root = new THREE.Group();

    // Boots / Legs
    const legMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.7 });
    [-0.16, 0.16].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.10, 0.65, 8), legMat);
        leg.position.set(lx, 0.32, 0);
        root.add(leg);
    });

    // Armored Torso / Tunic
    const torso = new THREE.Mesh(
        new THREE.CylinderGeometry(0.30, 0.24, 0.78, 10),
        new THREE.MeshStandardMaterial({ color: vis.armor, roughness: 0.4, metalness: 0.55 })
    );
    torso.position.y = 0.96;
    root.add(torso);

    // Flowing Cape
    const cape = new THREE.Mesh(
        new THREE.BoxGeometry(0.56, 0.88, 0.08),
        new THREE.MeshStandardMaterial({ color: vis.cape, roughness: 0.75 })
    );
    cape.position.set(0, 0.90, 0.22);
    cape.rotation.x = 0.18;
    root.add(cape);

    // Pauldrons
    [-0.34, 0.34].forEach((sx) => {
        const pauldron = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 8, 8),
            new THREE.MeshStandardMaterial({ color: vis.armor, metalness: 0.7, roughness: 0.3 })
        );
        pauldron.position.set(sx, 1.24, 0);
        root.add(pauldron);
    });

    // Head
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 12, 12),
        new THREE.MeshStandardMaterial({ color: '#f1c27d', roughness: 0.6 })
    );
    head.position.y = 1.54;
    root.add(head);

    // Class Headgear
    if (vis.weapon === 'staff') {
        const brim = new THREE.Mesh(
            new THREE.CylinderGeometry(0.36, 0.36, 0.04, 12),
            new THREE.MeshStandardMaterial({ color: vis.cape, roughness: 0.7 })
        );
        brim.position.y = 1.69;
        root.add(brim);
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.22, 0.48, 10),
            new THREE.MeshStandardMaterial({ color: vis.armor, roughness: 0.7 })
        );
        cone.position.y = 1.93;
        root.add(cone);
    } else {
        const helm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.23, 0.24, 0.22, 10),
            new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.8, roughness: 0.25 })
        );
        helm.position.y = 1.66;
        root.add(helm);
    }

    // Class Weaponry
    if (vis.weapon === 'staff') {
        const shaft = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 1.85, 8),
            new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.7 })
        );
        shaft.position.set(0.42, 0.95, -0.1);
        root.add(shaft);
        const orb = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.14, 0),
            new THREE.MeshStandardMaterial({ color: '#38bdf8', emissive: '#38bdf8', emissiveIntensity: 0.9 })
        );
        orb.position.set(0.42, 1.94, -0.1);
        root.add(orb);
    } else if (vis.weapon === 'bow') {
        const bow = new THREE.Mesh(
            new THREE.TorusGeometry(0.45, 0.035, 6, 14, Math.PI * 1.15),
            new THREE.MeshStandardMaterial({ color: '#854d0e', roughness: 0.6 })
        );
        bow.position.set(0.40, 1.05, -0.18);
        bow.rotation.y = Math.PI / 2;
        root.add(bow);
    } else {
        // Longsword / Warhammer + Kite Shield
        const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 1.05, 0.03),
            new THREE.MeshStandardMaterial({ color: '#e2e8f0', metalness: 0.9, roughness: 0.15 })
        );
        blade.position.set(0.44, 1.28, -0.16);
        blade.rotation.x = -0.35;
        root.add(blade);

        const shield = new THREE.Mesh(
            new THREE.BoxGeometry(0.48, 0.62, 0.08),
            new THREE.MeshStandardMaterial({ color: vis.cape, metalness: 0.5, roughness: 0.4 })
        );
        shield.position.set(-0.42, 0.98, -0.16);
        shield.rotation.y = 0.35;
        root.add(shield);
    }

    root.scale.setScalar(scale);
    return root;
}

function buildMonster3DMesh(profile) {
    const { archetype, bodyColor, accentColor, eyeColor, scale = 1.0 } = profile;
    const root = new THREE.Group();
    const animParts = {};

    const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.55, metalness: 0.2 });
    const accentMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.4, metalness: 0.45 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: eyeColor, emissive: eyeColor, emissiveIntensity: 1.2 });

    if (archetype === 'dragon') {
        // Quadruped Scaled Dragon with Wings, Horned Head & Glowing Maw
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.72, 1.9, 12), bodyMat);
        body.rotation.x = Math.PI / 2.3;
        body.position.set(0, 1.15, 0.1);
        root.add(body);

        // Four clawed legs
        [
            [-0.48, 0.5, -0.45],
            [0.48, 0.5, -0.45],
            [-0.52, 0.5, 0.55],
            [0.52, 0.5, 0.55]
        ].forEach(([lx, ly, lz]) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.20, 1.0, 8), bodyMat);
            leg.position.set(lx, ly, lz);
            root.add(leg);
        });

        // Neck & Head facing South (+Z toward party)
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 1.05, 10), bodyMat);
        neck.position.set(0, 1.85, 0.75);
        neck.rotation.x = -0.5;
        root.add(neck);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.46, 0.82), bodyMat);
        head.position.set(0, 2.25, 1.18);
        root.add(head);

        // Glowing Fiery Maw & Eyes
        const maw = new THREE.Mesh(new THREE.SphereGeometry(0.20, 8, 8), eyeMat);
        maw.position.set(0, 2.12, 1.48);
        root.add(maw);
        [-0.18, 0.18].forEach((ex) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), eyeMat);
            eye.position.set(ex, 2.36, 1.52);
            root.add(eye);
            const horn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.55, 6), accentMat);
            horn.position.set(ex * 1.4, 2.62, 0.98);
            horn.rotation.x = -0.65;
            root.add(horn);
        });

        // Articulated Bat-like Dragon Wings
        const leftWing = new THREE.Group();
        leftWing.position.set(-0.45, 1.55, 0.1);
        const lwPane = new THREE.Mesh(
            new THREE.BoxGeometry(1.85, 0.08, 1.25),
            new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.6, side: THREE.DoubleSide })
        );
        lwPane.position.set(-0.9, 0.35, -0.1);
        lwPane.rotation.z = -0.35;
        leftWing.add(lwPane);
        root.add(leftWing);

        const rightWing = new THREE.Group();
        rightWing.position.set(0.45, 1.55, 0.1);
        const rwPane = new THREE.Mesh(
            new THREE.BoxGeometry(1.85, 0.08, 1.25),
            new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.6, side: THREE.DoubleSide })
        );
        rwPane.position.set(0.9, 0.35, -0.1);
        rwPane.rotation.z = 0.35;
        rightWing.add(rwPane);
        root.add(rightWing);

        // Spiked Tail
        const tail = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.6, 8), bodyMat);
        tail.position.set(0, 0.85, -1.25);
        tail.rotation.x = -Math.PI / 2.4;
        root.add(tail);

        animParts.leftWing = leftWing;
        animParts.rightWing = rightWing;
    } else if (archetype === 'spider') {
        // Giant Arachnid / Black Spider
        const abdomen = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 12), bodyMat);
        abdomen.scale.set(1.0, 0.82, 1.3);
        abdomen.position.set(0, 0.72, -0.38);
        root.add(abdomen);

        const thorax = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 10), accentMat);
        thorax.position.set(0, 0.62, 0.36);
        root.add(thorax);

        [-0.14, -0.05, 0.05, 0.14].forEach((ex) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), eyeMat);
            eye.position.set(ex, 0.72, 0.70);
            root.add(eye);
        });

        for (let i = 0; i < 4; i++) {
            const zOff = -0.25 + i * 0.24;
            [-1, 1].forEach((side) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.03, 1.15, 6), bodyMat);
                leg.position.set(side * 0.68, 0.48, zOff);
                leg.rotation.z = side * 0.85;
                root.add(leg);
            });
        }
    } else if (archetype === 'beast') {
        // Dire Wolf / Hell Hound
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.52, 1.25), bodyMat);
        torso.position.set(0, 0.72, 0);
        root.add(torso);

        const mane = new THREE.Mesh(new THREE.SphereGeometry(0.38, 8, 8), accentMat);
        mane.position.set(0, 0.86, 0.42);
        root.add(mane);

        const snout = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.58, 8), bodyMat);
        snout.rotation.x = Math.PI / 2;
        snout.position.set(0, 0.92, 0.86);
        root.add(snout);

        [-0.10, 0.10].forEach((ex) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), eyeMat);
            eye.position.set(ex, 1.02, 0.80);
            root.add(eye);
            const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 5), bodyMat);
            ear.position.set(ex * 1.3, 1.20, 0.58);
            root.add(ear);
        });

        [
            [-0.20, 0.32, 0.42],
            [0.20, 0.32, 0.42],
            [-0.20, 0.32, -0.42],
            [0.20, 0.32, -0.42]
        ].forEach(([lx, ly, lz]) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.65, 6), bodyMat);
            leg.position.set(lx, ly, lz);
            root.add(leg);
        });
    } else {
        // Humanoid / Brute / Goblin / Undead / Construct
        const heightMod = archetype === 'brute' ? 1.22 : archetype === 'goblin' ? 0.78 : 1.0;
        const widthMod = archetype === 'brute' ? 1.35 : 1.0;

        [-0.18 * widthMod, 0.18 * widthMod].forEach((lx) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * widthMod, 0.10 * widthMod, 0.68 * heightMod, 8), bodyMat);
            leg.position.set(lx, 0.34 * heightMod, 0);
            root.add(leg);
        });

        const chest = new THREE.Mesh(
            new THREE.CylinderGeometry(0.36 * widthMod, 0.28 * widthMod, 0.85 * heightMod, 10),
            bodyMat
        );
        chest.position.y = 1.02 * heightMod;
        root.add(chest);

        [-0.42 * widthMod, 0.42 * widthMod].forEach((sx) => {
            const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18 * widthMod, 8, 8), accentMat);
            shoulder.position.set(sx, 1.32 * heightMod, 0);
            root.add(shoulder);
        });

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.24 * widthMod, 10, 10), bodyMat);
        head.position.y = 1.62 * heightMod;
        root.add(head);

        [-0.09 * widthMod, 0.09 * widthMod].forEach((ex) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), eyeMat);
            eye.position.set(ex, 1.64 * heightMod, 0.21 * widthMod);
            root.add(eye);
        });

        if (archetype === 'goblin') {
            [-0.28, 0.28].forEach((earX) => {
                const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 5), bodyMat);
                ear.position.set(earX, 1.66 * heightMod, 0);
                ear.rotation.z = earX < 0 ? 1.1 : -1.1;
                root.add(ear);
            });
        }

        // Menacing Weapon (Morningstar / Scimitar / Spectral Blade)
        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 1.15, 6),
            new THREE.MeshStandardMaterial({ color: '#451a03' })
        );
        handle.position.set(0.48 * widthMod, 1.15 * heightMod, 0.25);
        handle.rotation.x = 0.45;
        root.add(handle);

        const weaponHead = new THREE.Mesh(
            archetype === 'brute'
                ? new THREE.DodecahedronGeometry(0.22, 0)
                : new THREE.BoxGeometry(0.10, 0.85, 0.04),
            archetype === 'undead' ? eyeMat : accentMat
        );
        weaponHead.position.set(0.48 * widthMod, 1.62 * heightMod, 0.48);
        root.add(weaponHead);
    }

    root.scale.setScalar(scale);
    return { root, animParts };
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
    onWeaponAttack,
    isBattleArena = false,
    selectedEnemyId = null,
    onSelectEnemy,
    onReturnToStory
}) {
    const mountRef = useRef(null);
    const engineRef = useRef(null);

    const spatialLayout = useMemo(() => compileSpatialLayout(adventure), [adventure]);
    const activeChamber = useMemo(() => {
        if (spatialLayout?.chambers) {
            const found = spatialLayout.chambers[currentNodeId] || Object.values(spatialLayout.chambers)[0];
            if (found) return found;
        }
        return {
            id: currentNodeId || 'arena_stage',
            title: currentNode?.title || adventure?.name || 'Encounter Stage',
            environment: currentNode?.environment || adventure?.ambientTrack || 'dungeon',
            gridWidth: 7,
            gridDepth: 7,
            widthMeters: 16,
            depthMeters: 16,
            exits: [],
            playerSpawn: { gridX: 3, gridZ: 5, yaw: 0 }
        };
    }, [spatialLayout, currentNodeId, currentNode?.title, currentNode?.environment, adventure?.name, adventure?.ambientTrack]);

    const [playerGridPos, setPlayerGridPos] = useState(() => ({
        gridX: activeChamber?.playerSpawn?.gridX ?? 3,
        gridZ: activeChamber?.playerSpawn?.gridZ ?? 5,
        yaw: activeChamber?.playerSpawn?.yaw ?? 0
    }));

    useEffect(() => {
        if (!activeChamber) return;
        setPlayerGridPos({
            gridX: activeChamber.playerSpawn.gridX,
            gridZ: activeChamber.playerSpawn.gridZ,
            yaw: activeChamber.playerSpawn.yaw
        });
    }, [activeChamber]);

    const handleStepMove = useCallback(
        (direction) => {
            if (!activeChamber) return;
            setPlayerGridPos((prev) => {
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

    // Build Scene-Aware 3D Diorama
    useEffect(() => {
        const container = mountRef.current;
        if (!container || !activeChamber) return;

        const width = Math.max(300, container.clientWidth || 800);
        const height = Math.max(260, container.clientHeight || 520);

        const envKey = (currentNode?.environment || activeChamber.environment || adventure?.ambientTrack || 'dungeon').toLowerCase();
        const palette = ENVIRONMENT_PALETTES[envKey] || ENVIRONMENT_PALETTES.dungeon;
        const nodeId = (currentNodeId || activeChamber.id || '').toLowerCase();

        const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
        if (isJsdom) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(palette.skyColor);
        scene.fog = new THREE.FogExp2(palette.fogColor, 0.014);

        const camera = new THREE.PerspectiveCamera(58, width / height, 0.15, 140);

        let renderer = null;
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                powerPreference: 'high-performance',
                preserveDrawingBuffer: true
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.15;
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
        } catch {
            return;
        }

        // === 1. CINEMATIC LIGHTING ===
        const hemiLight = new THREE.HemisphereLight(palette.ambientColor, palette.groundSecondary, 1.65);
        hemiLight.position.set(0, 18, 0);
        scene.add(hemiLight);

        const keyLight = new THREE.DirectionalLight('#fffbeb', 1.25);
        keyLight.position.set(7, 15, 10);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(palette.accentGlow, 0.75);
        rimLight.position.set(-8, 10, -12);
        scene.add(rimLight);

        const playerLantern = new THREE.PointLight(palette.torchColor, 5.5, 24, 1.3);
        playerLantern.position.set(0, 2.5, 3.0);
        scene.add(playerLantern);

        const dioramaGroup = new THREE.Group();
        scene.add(dioramaGroup);

        const midX = Math.floor(activeChamber.gridWidth / 2);
        const midZ = Math.floor(activeChamber.gridDepth / 2);
        const stageW = Math.max(18, activeChamber.widthMeters * 1.15);
        const stageD = Math.max(18, activeChamber.depthMeters * 1.15);

        const torchFlames = [];
        const torchLights = [];
        const portalMaterials = [];
        const interactiveMeshes = [];
        const billboardMeshes = [];
        const animatedUnits = [];
        let waterMesh = null;
        let lavaMesh = null;

        // === 2. CURVED PAINTED SCENE PANORAMA SKYBOX ===
        const sceneImgUrl = getSceneImage(nodeId, envKey) || resolveAssetUrl(currentNode?.image);
        if (sceneImgUrl) {
            const panoGeo = new THREE.CylinderGeometry(23.5, 23.5, 14.5, 56, 1, true, Math.PI * 0.42, Math.PI * 1.16);
            const panoMat = new THREE.MeshBasicMaterial({
                color: '#cbd5e1',
                side: THREE.BackSide,
                fog: false
            });
            const panoMesh = new THREE.Mesh(panoGeo, panoMat);
            panoMesh.position.set(0, 5.8, -1.5);
            dioramaGroup.add(panoMesh);

            const loader = new THREE.TextureLoader();
            loader.load(
                sceneImgUrl,
                (tex) => {
                    tex.colorSpace = THREE.SRGBColorSpace;
                    tex.wrapS = THREE.RepeatWrapping;
                    tex.repeat.x = -1;
                    tex.offset.x = 1;
                    panoMat.map = tex;
                    panoMat.color.set('#ffffff');
                    panoMat.needsUpdate = true;
                },
                undefined,
                () => {}
            );
        }

        // === 3. TERRAIN GROUND & ENVIRONMENT-SPECIFIC 3D SCENERY ===
        const groundTex = createTerrainTexture(envKey, palette);
        if (groundTex) {
            groundTex.repeat.set(5, 5);
        }

        // Extended outer ground skirt so no void is ever visible around the stage
        const outerGround = new THREE.Mesh(
            new THREE.CircleGeometry(32, 48),
            new THREE.MeshStandardMaterial({
                color: envKey === 'volcano' ? '#450a0a' : palette.groundSecondary,
                roughness: 0.92
            })
        );
        outerGround.rotation.x = -Math.PI / 2;
        outerGround.position.y = -0.06;
        dioramaGroup.add(outerGround);

        const mainFloor = new THREE.Mesh(
            new THREE.PlaneGeometry(stageW, stageD, 16, 16),
            new THREE.MeshStandardMaterial({
                map: groundTex,
                roughness: 0.8,
                metalness: 0.1
            })
        );
        mainFloor.rotation.x = -Math.PI / 2;
        dioramaGroup.add(mainFloor);

        // Environment Builders
        if (envKey === 'forest' || envKey === 'jungle') {
            const isSnowy = nodeId.includes('frost');
            // Winding dirt trail
            const road = new THREE.Mesh(
                new THREE.PlaneGeometry(4.6, stageD * 1.15),
                new THREE.MeshStandardMaterial({ color: isSnowy ? '#94a3b8' : '#6b4f35', roughness: 0.95 })
            );
            road.rotation.x = -Math.PI / 2;
            road.position.y = 0.02;
            dioramaGroup.add(road);

            // Flanking Pine / Jungle Trees & Boulders
            const treeCoords = [
                [-7.2, -6.5, 1.25], [-8.8, -2.5, 1.1], [-6.8, 1.8, 1.0], [-8.5, 5.5, 1.2],
                [7.4, -6.2, 1.2], [8.6, -2.0, 1.15], [6.9, 2.2, 0.95], [8.4, 5.8, 1.1],
                [-4.5, -8.5, 1.3], [4.6, -8.4, 1.25], [-9.8, -7.8, 1.4], [9.8, -7.5, 1.35]
            ];
            treeCoords.forEach(([tx, tz, sc]) => {
                const tree = buildPineTree(sc, isSnowy);
                tree.position.set(tx, 0, tz);
                dioramaGroup.add(tree);
            });

            // Mossy Boulders
            [[-5.2, -3.5, 0.9], [5.4, -4.0, 1.1], [-5.6, 3.8, 0.75], [5.5, 4.2, 0.85]].forEach(([bx, bz, bs]) => {
                const rock = new THREE.Mesh(
                    new THREE.DodecahedronGeometry(bs, 0),
                    new THREE.MeshStandardMaterial({ color: '#4b5563', roughness: 0.9 })
                );
                rock.position.set(bx, bs * 0.45, bz);
                dioramaGroup.add(rock);
            });

            // Signature Overturned Wagon on Ambush Trail
            if (nodeId === 'ambush_trail') {
                const wagon = new THREE.Group();
                wagon.position.set(-2.3, 0.55, -2.8);
                wagon.rotation.set(0.12, 0.42, 0.46);
                const bed = new THREE.Mesh(
                    new THREE.BoxGeometry(2.2, 0.75, 1.35),
                    new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.85 })
                );
                wagon.add(bed);
                [-0.75, 0.75].forEach((wx) => {
                    const wheel = new THREE.Mesh(
                        new THREE.TorusGeometry(0.48, 0.07, 6, 14),
                        new THREE.MeshStandardMaterial({ color: '#451a03', roughness: 0.8 })
                    );
                    wheel.position.set(wx, -0.2, 0.72);
                    wagon.add(wheel);
                });
                dioramaGroup.add(wagon);
            }
        } else if (envKey === 'cavern') {
            // Jagged Cavern Stalagmites & Overhead Stalactites
            const rockMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.88 });
            [
                [-7.5, -5.5, 3.8], [-8.2, -1.2, 4.4], [-7.2, 3.2, 3.2],
                [7.6, -5.2, 4.1], [8.1, -0.8, 3.9], [7.3, 3.4, 3.4],
                [-4.8, -7.8, 4.5], [4.9, -7.6, 4.3]
            ].forEach(([rx, rz, rh], idx) => {
                const stalagmite = new THREE.Mesh(new THREE.ConeGeometry(1.15, rh, 7), rockMat);
                stalagmite.position.set(rx, rh / 2 - 0.2, rz);
                dioramaGroup.add(stalagmite);

                // Bioluminescent crystal cluster
                if (idx % 2 === 0) {
                    const crystal = new THREE.Mesh(
                        new THREE.OctahedronGeometry(0.42, 0),
                        new THREE.MeshStandardMaterial({
                            color: palette.accentGlow,
                            emissive: palette.accentGlow,
                            emissiveIntensity: 0.9
                        })
                    );
                    crystal.position.set(rx * 0.78, 0.45, rz);
                    dioramaGroup.add(crystal);
                }
            });

            // Underground Stream / Flood Pool or Spell Forge
            if (nodeId === 'wave_echo_forge' || nodeId === 'dwarven_armory') {
                const forgeDais = new THREE.Mesh(
                    new THREE.CylinderGeometry(1.8, 2.2, 0.75, 8),
                    new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.5, roughness: 0.4 })
                );
                forgeDais.position.set(0, 0.38, -3.2);
                dioramaGroup.add(forgeDais);

                const greenFlame = new THREE.Mesh(
                    new THREE.ConeGeometry(0.75, 1.85, 8),
                    new THREE.MeshBasicMaterial({ color: '#34d399' })
                );
                greenFlame.position.set(0, 1.55, -3.2);
                dioramaGroup.add(greenFlame);
                torchFlames.push(greenFlame);

                const forgeLight = new THREE.PointLight('#10b981', 7.0, 18);
                forgeLight.position.set(0, 2.5, -3.2);
                dioramaGroup.add(forgeLight);
                torchLights.push(forgeLight);
            } else {
                waterMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(4.2, stageD * 1.1),
                    new THREE.MeshStandardMaterial({
                        color: '#0284c7',
                        emissive: '#0369a1',
                        emissiveIntensity: 0.35,
                        roughness: 0.15,
                        metalness: 0.7,
                        transparent: true,
                        opacity: 0.82
                    })
                );
                waterMesh.rotation.x = -Math.PI / 2;
                waterMesh.position.set(-4.6, 0.04, 0);
                dioramaGroup.add(waterMesh);
            }
        } else if (envKey === 'volcano') {
            // Molten Magma Sea + Basalt Bridge Platform + Obsidian Spires
            mainFloor.scale.set(0.55, 1.0, 1.0); // Narrow basalt bridge / caldera causeway
            lavaMesh = new THREE.Mesh(
                new THREE.CircleGeometry(28, 40),
                new THREE.MeshStandardMaterial({
                    color: '#ea580c',
                    emissive: '#dc2626',
                    emissiveIntensity: 1.1,
                    roughness: 0.35
                })
            );
            lavaMesh.rotation.x = -Math.PI / 2;
            lavaMesh.position.y = -0.18;
            dioramaGroup.add(lavaMesh);

            const spireMat = new THREE.MeshStandardMaterial({ color: '#18181b', roughness: 0.4, metalness: 0.6 });
            [[-7.2, -5.2, 4.8], [7.4, -4.8, 5.2], [-6.8, 2.5, 3.8], [7.0, 2.8, 4.1]].forEach(([sx, sz, sh]) => {
                const spire = new THREE.Mesh(new THREE.ConeGeometry(1.3, sh, 6), spireMat);
                spire.position.set(sx, sh / 2 - 0.3, sz);
                dioramaGroup.add(spire);
            });

            if (nodeId === 'voranthos_caldera') {
                // Dragon Gold Hoard Mounds
                [[-3.2, -4.6], [3.4, -4.4]].forEach(([gx, gz]) => {
                    const gold = new THREE.Mesh(
                        new THREE.ConeGeometry(1.5, 0.85, 10),
                        new THREE.MeshStandardMaterial({ color: '#facc15', emissive: '#ca8a04', emissiveIntensity: 0.35, metalness: 0.85, roughness: 0.25 })
                    );
                    gold.position.set(gx, 0.4, gz);
                    dioramaGroup.add(gold);
                });
            }
        } else if (envKey === 'town' || envKey === 'city') {
            // Medieval Timber-Framed Tavern / Town Buildings Flanking Cobblestone Plaza
            const wallMat = new THREE.MeshStandardMaterial({ color: '#d6d3d1', roughness: 0.85 });
            const roofMat = new THREE.MeshStandardMaterial({ color: '#7c2d12', roughness: 0.75 });
            const winMat = new THREE.MeshBasicMaterial({ color: '#fde047' });

            [[-8.4, -2.5], [-8.4, 3.5], [8.4, -2.5], [8.4, 3.5]].forEach(([bx, bz]) => {
                const house = new THREE.Group();
                house.position.set(bx, 0, bz);
                const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 4.2, 4.8), wallMat);
                body.position.y = 2.1;
                house.add(body);

                const roof = new THREE.Mesh(new THREE.ConeGeometry(3.1, 2.2, 4), roofMat);
                roof.position.y = 5.3;
                roof.rotation.y = Math.PI / 4;
                house.add(roof);

                const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), winMat);
                win.position.set(bx < 0 ? 1.72 : -1.72, 2.2, 0);
                win.rotation.y = bx < 0 ? Math.PI / 2 : -Math.PI / 2;
                house.add(win);

                const lantern = new THREE.PointLight('#f59e0b', 3.5, 12);
                lantern.position.set(bx < 0 ? 2.2 : -2.2, 2.6, 0);
                house.add(lantern);
                torchLights.push(lantern);

                dioramaGroup.add(house);
            });
        } else {
            // Open Theatrical Cutaway Colonnade for Manor / Crypt / Temple / Dungeon (NO closed brick box!)
            const runnerColor =
                envKey === 'manor' ? '#7f1d1d' : envKey === 'temple' ? '#b45309' : envKey === 'crypt' ? '#065f46' : '#312e81';
            const runner = new THREE.Mesh(
                new THREE.PlaneGeometry(3.4, stageD * 0.92),
                new THREE.MeshStandardMaterial({ color: runnerColor, roughness: 0.75 })
            );
            runner.rotation.x = -Math.PI / 2;
            runner.position.y = 0.02;
            dioramaGroup.add(runner);

            const pillarMat = new THREE.MeshStandardMaterial({
                color: envKey === 'temple' ? '#a16207' : '#475569',
                roughness: 0.55,
                metalness: 0.25
            });

            [
                [-6.8, -5.8], [-6.8, -1.5], [-6.8, 2.8],
                [6.8, -5.8], [6.8, -1.5], [6.8, 2.8]
            ].forEach(([px, pz], idx) => {
                const col = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 5.2, 12), pillarMat);
                col.position.set(px, 2.6, pz);
                dioramaGroup.add(col);

                const cap = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.35, 1.25), pillarMat);
                cap.position.set(px, 5.25, pz);
                dioramaGroup.add(cap);

                if (idx % 2 === 0) {
                    const flame = new THREE.Mesh(
                        new THREE.ConeGeometry(0.22, 0.52, 7),
                        new THREE.MeshBasicMaterial({ color: palette.torchColor })
                    );
                    flame.position.set(px < 0 ? px + 0.75 : px - 0.75, 2.85, pz);
                    dioramaGroup.add(flame);
                    torchFlames.push(flame);

                    const ptLight = new THREE.PointLight(palette.torchColor, 4.0, 14);
                    ptLight.position.set(px < 0 ? px + 0.85 : px - 0.85, 3.0, pz);
                    dioramaGroup.add(ptLight);
                    torchLights.push(ptLight);
                }
            });
        }

        // === 4. GLOWING ATMOSPHERIC PARTICLES (Fireflies / Embers / Arcane Motes) ===
        const particleCount = 48;
        const pPositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pPositions[i * 3] = (Math.sin(i * 19.3) * 0.5) * 18;
            pPositions[i * 3 + 1] = 0.6 + ((i * 7) % 55) * 0.1;
            pPositions[i * 3 + 2] = (Math.cos(i * 23.7) * 0.5) * 16;
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const particleSystem = new THREE.Points(
            particleGeo,
            new THREE.PointsMaterial({
                color: palette.particleColor,
                size: 0.18,
                transparent: true,
                opacity: 0.8
            })
        );
        dioramaGroup.add(particleSystem);

        // === 5. PORTAL ARCHWAYS FOR CONNECTED EXITS (Hidden during Full-Screen Battle Arena) ===
        if (!isBattleArena && !combat?.active) {
            const visibleExits = (activeChamber.exits || []).filter(
                (ex) => !ex.hiddenUntilSearched || searchedNodes.includes(activeChamber.id)
            );
            const archMat = new THREE.MeshStandardMaterial({ color: '#b45309', roughness: 0.4, metalness: 0.6 });

            visibleExits.forEach((exit) => {
                const portalGroup = new THREE.Group();
                const halfW = Math.min(7.5, activeChamber.widthMeters / 2 - 0.5);
                const halfD = Math.min(7.5, activeChamber.depthMeters / 2 - 0.5);

                if (exit.wall === 'north') {
                    portalGroup.position.set(0, 0, -halfD);
                } else if (exit.wall === 'south') {
                    portalGroup.position.set(0, 0, halfD);
                    portalGroup.rotation.y = Math.PI;
                } else if (exit.wall === 'east') {
                    portalGroup.position.set(halfW, 0, 0);
                    portalGroup.rotation.y = -Math.PI / 2;
                } else if (exit.wall === 'west') {
                    portalGroup.position.set(-halfW, 0, 0);
                    portalGroup.rotation.y = Math.PI / 2;
                }

                [-1.05, 1.05].forEach((px) => {
                    const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.1, 0.36), archMat);
                    post.position.set(px, 1.55, 0);
                    portalGroup.add(post);
                });
                const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.38, 0.44), archMat);
                lintel.position.set(0, 3.15, 0);
                portalGroup.add(lintel);

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

                const portalPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 2.85), shaderMat);
                portalPlane.position.set(0, 1.48, 0.04);
                portalPlane.userData = { type: 'portal', targetNodeId: exit.targetNodeId };
                portalGroup.add(portalPlane);
                interactiveMeshes.push(portalPlane);

                const bannerTex = createPortalBannerTexture(exit);
                const bannerMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(2.5, 0.62),
                    new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide })
                );
                bannerMesh.position.set(0, 3.72, 0.08);
                portalGroup.add(bannerMesh);

                dioramaGroup.add(portalGroup);
            });
        }

        // === 6. CHAMBER TREASURE CHEST PROP ===
        if (!lootedNodes.includes(activeChamber.id) && currentNode?.loot && !isBattleArena) {
            const chestGroup = new THREE.Group();
            chestGroup.position.set(2.4, 0, -2.0);
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(1.05, 0.68, 0.72),
                new THREE.MeshStandardMaterial({ color: '#92400e', roughness: 0.5, metalness: 0.3 })
            );
            box.position.y = 0.34;
            chestGroup.add(box);
            const lid = new THREE.Mesh(
                new THREE.BoxGeometry(1.1, 0.22, 0.76),
                new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.25, metalness: 0.85 })
            );
            lid.position.y = 0.74;
            chestGroup.add(lid);
            dioramaGroup.add(chestGroup);
        }

        // === 7. 3D SCULPTED MONSTERS, HERO & COMPANIONS + PAINTED PORTRAIT MEDALLIONS ===
        const unitsGroup = new THREE.Group();
        dioramaGroup.add(unitsGroup);

        const activeEnemies = combat?.active
            ? (combat.enemies || []).filter((e) => e.hp > 0)
            : !defeatedNodes.includes(activeChamber.id) && currentNode?.encounter?.monsters
                ? currentNode.encounter.monsters.flatMap((m, idx) => {
                      const count = Math.min(4, m.count || 1);
                      return Array.from({ length: count }, (_, cIdx) => ({
                          instanceId: `preview_${idx}_${cIdx}`,
                          monsterId: m.monsterId,
                          name: count > 1 ? `${m.name} #${cIdx + 1}` : m.name,
                          hp: m.hp || 18,
                          maxHp: m.maxHp || 18,
                          ac: m.ac || 13,
                          isBoss: activeChamber.type === 'boss' && idx === 0
                      }));
                  })
                : [];

        const effectiveTargetId = selectedEnemyId || activeEnemies[0]?.instanceId || null;

        activeEnemies.slice(0, 6).forEach((enemy, idx) => {
            const total = Math.min(6, activeEnemies.length);
            const spacing = total > 3 ? 2.15 : 2.75;
            const ex = (idx - (total - 1) / 2) * spacing;
            const ez = -2.6 - (idx % 2) * 0.75;
            const isTargeted = Boolean(combat?.active && enemy.instanceId === effectiveTargetId);

            const profile = getMonsterVisualProfile(enemy);
            const monsterPortrait = getMonsterImage(enemy.monsterId || enemy.id, enemy.name) || resolveAssetUrl(enemy.image);

            const unitRoot = new THREE.Group();
            unitRoot.position.set(ex, 0, ez);

            // Sculpted Miniature Plinth + Target Reticle
            const plinth = new THREE.Mesh(
                new THREE.CylinderGeometry(0.75 * profile.scale, 0.88 * profile.scale, 0.18, 24),
                new THREE.MeshStandardMaterial({
                    color: isTargeted ? '#facc15' : '#991b1b',
                    metalness: 0.65,
                    roughness: 0.35
                })
            );
            plinth.position.y = 0.09;
            unitRoot.add(plinth);

            if (isTargeted) {
                const reticle = new THREE.Mesh(
                    new THREE.RingGeometry(0.95 * profile.scale, 1.18 * profile.scale, 32),
                    new THREE.MeshBasicMaterial({ color: '#fde047', side: THREE.DoubleSide })
                );
                reticle.rotation.x = -Math.PI / 2;
                reticle.position.y = 0.05;
                unitRoot.add(reticle);
            }

            const { root: monsterMesh, animParts } = buildMonster3DMesh(profile);
            monsterMesh.position.y = 0.18;
            unitRoot.add(monsterMesh);
            animatedUnits.push({ mesh: monsterMesh, animParts, phase: idx * 1.3 });

            // Invisible click hitbox so tapping anywhere on the 3D monster selects / attacks it
            const hitBox = new THREE.Mesh(
                new THREE.CylinderGeometry(0.95 * profile.scale, 0.95 * profile.scale, 2.8 * profile.scale, 10),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            hitBox.position.y = 1.4 * profile.scale;
            hitBox.userData = { type: 'enemy', enemy };
            unitRoot.add(hitBox);
            interactiveMeshes.push(hitBox);

            // Floating Painted Portrait + HP Plate above monster
            const badgeTex = createFloatingUnitBadge({
                name: enemy.name,
                hp: enemy.hp,
                maxHp: enemy.maxHp,
                ac: enemy.ac,
                borderColor: enemy.isBoss ? '#facc15' : '#ef4444',
                badgeIcon: profile.icon,
                isTargeted,
                portraitUrl: monsterPortrait
            });
            if (badgeTex) {
                const badgeW = enemy.isBoss ? 1.75 : 1.44;
                const badgeH = enemy.isBoss ? 0.80 : 0.66;
                const badgeMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(badgeW, badgeH),
                    new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true, depthTest: false })
                );
                badgeMesh.position.y = 2.25 * profile.scale + 0.38 + (idx % 2) * 0.38;
                badgeMesh.renderOrder = 10;
                badgeMesh.userData = { type: 'enemy', enemy };
                unitRoot.add(badgeMesh);
                billboardMeshes.push(badgeMesh);
                interactiveMeshes.push(badgeMesh);
            }

            unitsGroup.add(unitRoot);
        });

        // 3D Companions Flanking the Hero
        const livingCompanions = companions.filter((c) => !c.isDead && (c.hp === undefined || c.hp > 0)).slice(0, 3);
        const compOffsets = [-2.5, 2.5, -4.3];
        livingCompanions.forEach((comp, idx) => {
            const cx = compOffsets[idx] || (idx % 2 === 0 ? -2.5 : 2.5);
            const cz = 2.6 + (idx === 2 ? 0.8 : 0);
            const compRoot = new THREE.Group();
            compRoot.position.set(cx, 0, cz);
            // Face North (-Z toward monsters)
            const plinth = new THREE.Mesh(
                new THREE.CylinderGeometry(0.65, 0.76, 0.18, 20),
                new THREE.MeshStandardMaterial({ color: '#6366f1', metalness: 0.65, roughness: 0.35 })
            );
            plinth.position.y = 0.09;
            compRoot.add(plinth);

            const compBody = buildHero3DMesh({ charClass: comp.class, scale: 0.96 });
            compBody.position.y = 0.18;
            compRoot.add(compBody);
            animatedUnits.push({ mesh: compBody, animParts: {}, phase: 2.0 + idx });

            if (!isBattleArena) {
                const compPortrait = getCompanionAvatar(comp);
                const badgeTex = createFloatingUnitBadge({
                    name: comp.name,
                    hp: comp.hp,
                    maxHp: comp.maxHp,
                    ac: comp.ac,
                    borderColor: '#818cf8',
                    badgeIcon: '🛡️',
                    isTargeted: false,
                    portraitUrl: compPortrait
                });
                if (badgeTex) {
                    const badgeMesh = new THREE.Mesh(
                        new THREE.PlaneGeometry(1.42, 0.65),
                        new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true, depthTest: false })
                    );
                    badgeMesh.position.y = 2.42;
                    badgeMesh.renderOrder = 10;
                    compRoot.add(badgeMesh);
                    billboardMeshes.push(badgeMesh);
                }
            }

            unitsGroup.add(compRoot);
        });

        // 3D Player Hero Miniature + Painted Hero Portrait Medallion
        const heroToken = new THREE.Group();
        heroToken.position.set(0, 0, 3.2);
        const heroPlinth = new THREE.Mesh(
            new THREE.CylinderGeometry(0.75, 0.88, 0.2, 24),
            new THREE.MeshStandardMaterial({ color: '#10b981', metalness: 0.75, roughness: 0.25 })
        );
        heroPlinth.position.y = 0.1;
        heroToken.add(heroPlinth);

        const heroBody = buildHero3DMesh({ charClass: character?.class || 'fighter', scale: 1.08 });
        heroBody.position.y = 0.2;
        heroToken.add(heroBody);
        animatedUnits.push({ mesh: heroBody, animParts: {}, phase: 0.4 });

        if (!isBattleArena) {
            const heroPortrait = getCharacterAvatar(character);
            const heroBadgeTex = createFloatingUnitBadge({
                name: character?.name || 'Hero',
                hp: character?.hp || 10,
                maxHp: character?.maxHp || 10,
                ac: derivedStats?.ac || 14,
                borderColor: '#34d399',
                badgeIcon: '⚔️',
                isTargeted: false,
                portraitUrl: heroPortrait
            });
            if (heroBadgeTex) {
                const heroBadge = new THREE.Mesh(
                    new THREE.PlaneGeometry(1.56, 0.72),
                    new THREE.MeshBasicMaterial({ map: heroBadgeTex, transparent: true, depthTest: false })
                );
                heroBadge.position.y = 2.62;
                heroBadge.renderOrder = 10;
                heroToken.add(heroBadge);
                billboardMeshes.push(heroBadge);
            }
        }
        unitsGroup.add(heroToken);

        // Raycaster for tapping 3D Monsters or Portals
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
                        if (onSelectEnemy) {
                            onSelectEnemy(data.enemy.instanceId);
                        } else {
                            onWeaponAttack?.(
                                { name: 'Longsword', damageDice: '1d8', damageType: 'Slashing' },
                                data.enemy,
                                'normal',
                                false
                            );
                        }
                    } else if (currentNode?.encounter) {
                        onTriggerEncounter?.(currentNode.encounter);
                    }
                }
            }
        };
        renderer.domElement.addEventListener('click', onCanvasClick);

        engineRef.current = {
            scene,
            camera,
            renderer,
            heroToken,
            playerLantern,
            midX,
            midZ,
            aspect: width / height,
            targetCamPos: new THREE.Vector3(0, 6.2, 11.5),
            targetLookAt: new THREE.Vector3(0, 1.4, -1.0),
            currentLookAt: new THREE.Vector3(0, 1.4, -1.0)
        };

        let animId = null;
        const startTime = performance.now();

        const animate = (now) => {
            animId = requestAnimationFrame(animate);
            const elapsed = (now - startTime) * 0.001;

            portalMaterials.forEach((mat) => {
                mat.uniforms.uTime.value = elapsed;
            });

            torchFlames.forEach((flame, idx) => {
                flame.rotation.y = elapsed * 2.2 + idx;
                const s = 0.92 + Math.sin(elapsed * 7.5 + idx * 1.7) * 0.12;
                flame.scale.set(s, s * 1.15, s);
            });
            torchLights.forEach((light, idx) => {
                light.intensity = 4.2 + Math.sin(elapsed * 8.0 + idx * 2.1) * 0.65;
            });

            // Subtle idle / combat breathing & dragon wing flaps
            animatedUnits.forEach(({ mesh, animParts, phase }) => {
                mesh.position.y = 0.18 + Math.sin(elapsed * 2.6 + phase) * 0.05;
                if (animParts?.leftWing && animParts?.rightWing) {
                    const flap = Math.sin(elapsed * 3.4 + phase) * 0.28;
                    animParts.leftWing.rotation.z = flap;
                    animParts.rightWing.rotation.z = -flap;
                }
            });

            if (waterMesh) {
                waterMesh.material.emissiveIntensity = 0.3 + Math.sin(elapsed * 2.5) * 0.12;
            }
            if (lavaMesh) {
                lavaMesh.material.emissiveIntensity = 0.95 + Math.sin(elapsed * 3.2) * 0.25;
            }

            particleSystem.rotation.y = elapsed * 0.06;

            const eng = engineRef.current;
            if (eng) {
                camera.position.lerp(eng.targetCamPos, 0.15);
                eng.currentLookAt.lerp(eng.targetLookAt, 0.15);
                camera.lookAt(eng.currentLookAt);
            }

            // Keep floating portrait/HP plates facing the camera
            billboardMeshes.forEach((bm) => {
                bm.quaternion.copy(camera.quaternion);
            });

            renderer.render(scene, camera);
        };
        animId = requestAnimationFrame(animate);

        const handleResize = () => {
            if (!container || !renderer) return;
            const w = Math.max(300, container.clientWidth);
            const h = Math.max(260, container.clientHeight);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            if (engineRef.current) {
                engineRef.current.aspect = w / h;
            }
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
        currentNodeId,
        currentNode?.environment,
        currentNode?.image,
        currentNode?.loot,
        currentNode?.encounter,
        adventure?.ambientTrack,
        combat,
        companions,
        character,
        derivedStats?.ac,
        defeatedNodes,
        lootedNodes,
        searchedNodes,
        visitedNodes,
        isBattleArena,
        selectedEnemyId,
        onSelectEnemy,
        onSelectNode,
        onTriggerEncounter,
        onWeaponAttack
    ]);

    // Aspect-Aware Camera Framing (Responsive for iPhone Portrait & Desktop Widescreen)
    useEffect(() => {
        const eng = engineRef.current;
        if (!eng || !activeChamber) return;

        const container = mountRef.current;
        const w = Math.max(300, container?.clientWidth || 800);
        const h = Math.max(260, container?.clientHeight || 520);
        const aspect = w / h;
        const isPortrait = aspect < 0.95;
        const portraitPullback = isPortrait ? Math.min(1.52, (0.95 / Math.max(0.42, aspect)) * 0.78) : 1.0;

        if (isBattleArena) {
            // Shift optical center into the upper open stage above the bottom tactical dock
            eng.camera.setViewOffset(
                w,
                h,
                0,
                Math.round(h * (isPortrait ? 0.16 : 0.10)),
                w,
                h
            );
            eng.camera.updateProjectionMatrix();

            eng.heroToken.position.set(0, 0, 3.1);
            eng.heroToken.visible = true;
            eng.playerLantern.position.set(0, 3.0, 2.5);

            if (cameraMode === 'isometric') {
                eng.targetCamPos.set(
                    5.0 * portraitPullback,
                    8.2 * portraitPullback,
                    11.0 * portraitPullback
                );
                eng.targetLookAt.set(0, 0.9, -0.3);
            } else {
                // Heroic Over-the-Shoulder Battle Camera showing Hero + Party + Monsters + Horizon
                eng.targetCamPos.set(
                    0,
                    (isPortrait ? 4.5 : 5.1) * portraitPullback,
                    (isPortrait ? 9.8 : 10.4) * portraitPullback
                );
                eng.targetLookAt.set(0, isPortrait ? 1.25 : 1.65, -1.6);
            }
            return;
        }

        eng.camera.clearViewOffset();
        eng.camera.updateProjectionMatrix();

        const px = (playerGridPos.gridX - eng.midX) * TILE_SIZE * 0.75;
        const pz = Math.max(-1.5, (playerGridPos.gridZ - eng.midZ) * TILE_SIZE * 0.85);

        if (cameraMode === 'isometric') {
            eng.heroToken.position.set(px, 0, Math.max(1.8, pz));
            eng.heroToken.visible = true;
            eng.playerLantern.position.set(px, 2.8, pz);

            eng.targetCamPos.set(
                7.8 * portraitPullback,
                9.8 * portraitPullback,
                11.0 * portraitPullback
            );
            eng.targetLookAt.set(0, 0.9, -0.8);
        } else {
            // Scenic First-Person / Cutaway Camera
            eng.heroToken.position.set(px, 0, 3.1);
            eng.heroToken.visible = true;
            eng.playerLantern.position.set(px, 2.5, pz + 2.0);

            const eyeY = isPortrait ? 3.2 : 2.55;
            const camDist = (isPortrait ? 8.8 : 6.8);
            const camX = px + Math.sin(playerGridPos.yaw) * camDist * 0.45;
            const camZ = Math.max(4.5, pz + Math.cos(playerGridPos.yaw) * camDist);
            const lookX = px - Math.sin(playerGridPos.yaw) * 5.0;
            const lookZ = -2.8 * Math.cos(playerGridPos.yaw);

            eng.targetCamPos.set(camX, eyeY, camZ);
            eng.targetLookAt.set(lookX, 1.45, lookZ);
        }
    }, [playerGridPos, cameraMode, activeChamber, isBattleArena]);

    return (
        <div
            data-testid="dungeon-viewport-3d"
            data-current-node={currentNodeId}
            data-camera-mode={cameraMode}
            data-battle-arena={isBattleArena ? 'true' : 'false'}
            className="relative w-full h-full min-h-[260px] bg-slate-950 overflow-hidden select-none"
        >
            {/* Three.js WebGL Mount Container */}
            <div ref={mountRef} className="w-full h-full min-h-[260px]" />

            {/* Diegetic Parchment HUD Overlay (Shown in 3D Cutaway exploration; hidden in Full-Screen Battle Arena where Battle HUD takes over) */}
            {!isBattleArena && (
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
                    onReturnToStory={onReturnToStory}
                />
            )}
        </div>
    );
}
