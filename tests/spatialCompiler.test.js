import test from 'node:test';
import assert from 'node:assert/strict';
import { adventures, generateCustomAdventure } from '../src/data/adventures.js';
import { compileSpatialLayout, boxesOverlap3D } from '../src/services/spatialCompiler.js';

test('Spatial Graph Compiler covers 100% of nodes across all 5 canonical campaigns', () => {
    assert.equal(adventures.length, 5);
    for (const adv of adventures) {
        const layout = compileSpatialLayout(adv);
        const expectedIds = Object.keys(adv.nodes);
        assert.equal(layout.nodeCount, expectedIds.length, `Node count mismatch for ${adv.id}`);
        for (const id of expectedIds) {
            assert.ok(layout.chambers[id], `Missing compiled chamber ${id} in ${adv.id}`);
        }
    }
});

test('Spatial Graph Compiler generates valid exits and full reachability for all adventure nodes', () => {
    for (const adv of adventures) {
        const layout = compileSpatialLayout(adv);
        assert.equal(
            layout.reachableNodeIds.length,
            layout.nodeCount,
            `Not all nodes reachable in ${adv.id}`
        );
        for (const chamber of Object.values(layout.chambers)) {
            assert.ok(Array.isArray(chamber.exits), `Exits array missing in ${chamber.id}`);
            assert.ok(chamber.exits.length >= 1, `Chamber ${chamber.id} has no exits`);
            for (const ex of chamber.exits) {
                assert.ok(['north', 'east', 'south', 'west'].includes(ex.wall));
                assert.ok(layout.chambers[ex.targetNodeId], `Invalid exit target ${ex.targetNodeId}`);
            }
        }
    }
});

test('Spatial Graph Compiler produces zero unintended 3D bounding-box collisions across all campaigns and custom themes', () => {
    const customCampaigns = ['dungeon', 'wilderness', 'undead', 'intrigue'].map((theme) =>
        generateCustomAdventure({ id: `test-${theme}`, name: `Test ${theme}`, theme })
    );
    const allCampaigns = [...adventures, ...customCampaigns];

    for (const adv of allCampaigns) {
        const layout = compileSpatialLayout(adv);
        assert.equal(layout.collisionCount, 0, `Collision detected in ${adv.id}`);
        const chamberList = Object.values(layout.chambers);
        for (let i = 0; i < chamberList.length; i++) {
            for (let j = i + 1; j < chamberList.length; j++) {
                const overlap = boxesOverlap3D(chamberList[i].worldBounds, chamberList[j].worldBounds, 0.5);
                assert.equal(
                    overlap,
                    false,
                    `3D AABB collision between ${chamberList[i].id} and ${chamberList[j].id} in ${adv.id}`
                );
            }
        }
    }
});

test('Spatial Graph Compiler resolves synthetic overlapping and missing 2D coordinates without 3D collisions', () => {
    const syntheticAdv = {
        id: 'synthetic-overlap',
        name: 'Synthetic Overlap Dungeon',
        startNodeId: 'n1',
        nodes: {
            n1: { id: 'n1', title: 'Room 1', type: 'exploration', coordinates: { x: 50, y: 50 }, choices: [{ targetNodeId: 'n2' }] },
            n2: { id: 'n2', title: 'Room 2', type: 'combat', coordinates: { x: 50, y: 50 }, choices: [{ targetNodeId: 'n3' }] },
            n3: { id: 'n3', title: 'Room 3', type: 'puzzle', coordinates: { x: 50, y: 50 }, choices: [{ targetNodeId: 'n4' }] },
            n4: { id: 'n4', title: 'Room 4 (No Coords)', type: 'boss', choices: [{ targetNodeId: 'n1' }] }
        }
    };

    const layout = compileSpatialLayout(syntheticAdv);
    assert.equal(layout.nodeCount, 4);
    assert.equal(layout.collisionCount, 0);
    assert.equal(layout.reachableNodeIds.length, 4);
});

test('Spatial Graph Compiler is deterministic across repeated compilations', () => {
    for (const adv of adventures) {
        const first = compileSpatialLayout(adv);
        const second = compileSpatialLayout(adv);
        assert.deepEqual(first, second, `Non-deterministic compilation for ${adv.id}`);
    }
});
