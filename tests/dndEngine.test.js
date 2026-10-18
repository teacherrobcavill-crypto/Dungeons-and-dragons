import test from 'node:test';
import assert from 'node:assert/strict';
import {
    getAbilityMod,
    getProficiencyBonus,
    rollDiceFormula,
    rollD20Test,
    calculateCharacterDerivedStats,
    createCombatEncounter,
    resolveWeaponAttack,
    resolveSpellCast
} from '../src/services/dndEngine.js';
import { races, getRaceById } from '../src/data/races.js';
import { classes, getClassById } from '../src/data/classes.js';
import { spells, getSpellById } from '../src/data/spells.js';
import { monsters, getMonsterById } from '../src/data/monsters.js';
import { adventures, generateCustomAdventure } from '../src/data/adventures.js';

test('PHB compendium includes all 9 races and 12 classes', () => {
    assert.equal(races.length, 9);
    assert.equal(classes.length, 12);
    assert.ok(getRaceById('half-elf'));
    assert.ok(getClassById('paladin'));
    assert.ok(getClassById('warlock'));
});

test('Spell and Monster compendiums load with 2024 stat blocks', () => {
    assert.ok(spells.length >= 45);
    assert.ok(monsters.length >= 30);
    const fireball = getSpellById('fireball');
    assert.equal(fireball.level, 3);
    const dragon = getMonsterById('young-red-dragon');
    assert.ok(dragon.ac >= 18);
    assert.ok(dragon.hp >= 150);
});

test('All 5 campaigns have interconnected multi-room node graphs', () => {
    assert.equal(adventures.length, 5);
    for (const adv of adventures) {
        assert.ok(adv.startNodeId);
        assert.ok(adv.nodes[adv.startNodeId]);
        assert.ok(Object.keys(adv.nodes).length >= 8);
    }

    const custom = generateCustomAdventure({
        setting: 'The Astral Sea',
        theme: 'Eldritch Heist',
        difficulty: 'High',
        level: 3,
        treasureTheme: 'Arcana'
    });
    assert.ok(custom.startNodeId);
    assert.equal(Object.keys(custom.nodes).length, 6);
});

test('D&D 5e combat engine resolves attacks, spells, and initiative', () => {
    const hero = {
        name: 'Kaelen',
        race: 'human',
        class: 'paladin',
        level: 3,
        hp: 28,
        maxHp: 28,
        stats: { strength: 16, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 12, charisma: 14 },
        skills: ['athletics', 'perception'],
        conditions: []
    };
    const cls = getClassById('paladin');
    const derived = calculateCharacterDerivedStats(hero, cls, getRaceById('human'), []);
    assert.equal(derived.proficiencyBonus, 2);
    assert.ok(derived.ac >= 16);

    const encounter = createCombatEncounter(
        {
            title: 'Goblin Ambush',
            difficulty: 'Low',
            xpReward: 100,
            monsters: [{ monsterId: 'goblin', name: 'Goblin', count: 2 }]
        },
        hero,
        [{ name: 'Aria', race: 'elf', class: 'wizard', personality: 'Wise' }],
        getMonsterById
    );

    assert.equal(encounter.active, true);
    assert.equal(encounter.enemies.length, 2);
    assert.equal(encounter.initiativeOrder.length, 4);

    const atk = resolveWeaponAttack({
        character: hero,
        weapon: { name: 'Longsword', damageDice: '1d8', damageType: 'Slashing' },
        targetEnemy: encounter.enemies[0],
        rollMode: 'advantage',
        useDivineSmite: true,
        companionCount: 1
    });
    assert.ok(typeof atk.hit === 'boolean');
    assert.ok(atk.attackRoll.total >= 1);

    const spellRes = resolveSpellCast({
        character: hero,
        spell: getSpellById('cure-wounds'),
        targetEnemy: null,
        classData: cls
    });
    assert.equal(spellRes.kind, 'heal');
    assert.ok(spellRes.totalHeal >= 2);
});
