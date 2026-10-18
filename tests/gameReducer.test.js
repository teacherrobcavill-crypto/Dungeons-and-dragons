/* global global */
import test from 'node:test';
import assert from 'node:assert/strict';
import { gameReducer, initialState, ActionTypes } from '../src/context/gameState.js';

test('START_GAME sets gameStarted true', () => {
    const next = gameReducer(initialState, { type: ActionTypes.START_GAME });
    assert.equal(next.gameStarted, true);
});

test('initialState has Dark Mode enabled by default', () => {
    assert.equal(initialState.settings.darkMode, true);
});

test('UPDATE_HP respects floor and ceiling', () => {
    const hurt = gameReducer(initialState, { type: ActionTypes.UPDATE_HP, amount: -999 });
    assert.equal(hurt.character.hp, 0);

    const healed = gameReducer(initialState, { type: ActionTypes.UPDATE_HP, amount: 999 });
    assert.equal(healed.character.hp, initialState.character.maxHp);
});

test('ADD_INVENTORY_ITEM increases quantity for existing item', () => {
    const next = gameReducer(initialState, {
        type: ActionTypes.ADD_INVENTORY_ITEM,
        item: { name: 'Torch', quantity: 2 }
    });

    const torch = next.inventory.find((item) => item.name === 'Torch');
    assert.equal(torch.quantity, 5);
});

test('SET_COMPANIONS normalizes companions with robust maxHp and hp', () => {
    const rawCompanions = [
        { name: 'Lyra', race: 'Elf', class: 'Wizard', personality: 'Wise' },
        { name: 'Thorin', race: 'Dwarf', class: 'Cleric', personality: 'Grumpy' }
    ];
    const state = gameReducer(initialState, {
        type: ActionTypes.SET_COMPANIONS,
        companions: rawCompanions
    });

    assert.equal(state.companions.length, 2);
    assert.equal(state.companions[0].maxHp, 16);
    assert.equal(state.companions[0].hp, 16);
    assert.equal(state.companions[1].maxHp, 20);
    assert.equal(state.companions[1].hp, 20);
});

test('Companion damage preserves maxHp and SHORT_REST / LONG_REST heal companions', () => {
    // Initial state with normalized companion
    const initializedState = gameReducer(initialState, {
        type: ActionTypes.SET_COMPANIONS,
        companions: [{ id: 'comp-1', name: 'Thorin', race: 'Dwarf', class: 'Cleric', personality: 'Grumpy' }]
    });
    const comp = initializedState.companions[0];
    assert.equal(comp.maxHp, 20);
    assert.equal(comp.hp, 20);

    // Simulate taking 12 damage in combat
    const damagedCompanions = initializedState.companions.map((c) => ({
        ...c,
        hp: Math.max(0, c.hp - 12)
    }));
    const damagedState = { ...initializedState, companions: damagedCompanions };
    assert.equal(damagedState.companions[0].hp, 8);
    assert.equal(damagedState.companions[0].maxHp, 20); // maxHp must NOT collapse to 8!

    // Short Rest heals companion
    const shortRestedState = gameReducer(damagedState, { type: ActionTypes.SHORT_REST });
    assert.ok(shortRestedState.companions[0].hp > 8);
    assert.ok(shortRestedState.companions[0].hp <= 20);
    assert.equal(shortRestedState.companions[0].maxHp, 20);

    // Long Rest fully restores companion to maxHp
    const longRestedState = gameReducer(damagedState, { type: ActionTypes.LONG_REST });
    assert.equal(longRestedState.companions[0].hp, 20);
    assert.equal(longRestedState.companions[0].maxHp, 20);
});

test('LOAD_STATE normalizes loaded companions', () => {
    const loadedState = {
        character: { name: 'Hero' },
        companions: [
            { name: 'Aria', class: 'Rogue', hp: 10 } // missing maxHp, hp is 10
        ]
    };
    const state = gameReducer(initialState, {
        type: ActionTypes.LOAD_STATE,
        state: loadedState
    });

    assert.equal(state.companions.length, 1);
    assert.equal(state.companions[0].maxHp, 18); // Default rogue maxHp
    assert.equal(state.companions[0].hp, 10);
});

test('UPDATE_HP sets unconscious condition at 0 HP and clears it on revival', () => {
    // Drop to 0 HP
    const downed = gameReducer(initialState, { type: ActionTypes.UPDATE_HP, amount: -999 });
    assert.equal(downed.character.hp, 0);
    assert.ok(downed.character.conditions.includes('unconscious'));

    // Revive character
    const revived = gameReducer(downed, { type: ActionTypes.REVIVE_CHARACTER, hpAmount: 15 });
    assert.equal(revived.character.hp, 15);
    assert.ok(!revived.character.conditions.includes('unconscious'));
    assert.equal(revived.character.deathSaves.successes, 0);
    assert.equal(revived.character.deathSaves.failures, 0);
});


