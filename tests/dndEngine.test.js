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

test('D&D 5e Death Saving Throws resolve correctly', async () => {
    const { resolveDeathSave } = await import('../src/services/dndEngine.js');

    // Nat 20: Instant 1 HP Revival
    const nat20 = resolveDeathSave({ successes: 1, failures: 2 }, 20);
    assert.equal(nat20.revived, true);
    assert.equal(nat20.regainedHp, 1);
    assert.equal(nat20.deathSaves.successes, 0);
    assert.equal(nat20.deathSaves.failures, 0);
    assert.equal(nat20.dead, false);

    // Nat 1: 2 Failures
    const nat1 = resolveDeathSave({ successes: 0, failures: 1 }, 1);
    assert.equal(nat1.deathSaves.failures, 3);
    assert.equal(nat1.dead, true);

    // Success (roll 15)
    const success = resolveDeathSave({ successes: 1, failures: 0 }, 15);
    assert.equal(success.success, true);
    assert.equal(success.deathSaves.successes, 2);
    assert.equal(success.stabilized, false);

    // 3rd Success: Stabilized
    const stabilized = resolveDeathSave({ successes: 2, failures: 1 }, 12);
    assert.equal(stabilized.success, true);
    assert.equal(stabilized.deathSaves.successes, 3);
    assert.equal(stabilized.stabilized, true);
    assert.equal(stabilized.dead, false);

    // Failure (roll 7)
    const failure = resolveDeathSave({ successes: 0, failures: 1 }, 7);
    assert.equal(failure.success, false);
    assert.equal(failure.deathSaves.failures, 2);
    assert.equal(failure.dead, false);

    // 3rd Failure: Dead
    const death = resolveDeathSave({ successes: 0, failures: 2 }, 8);
    assert.equal(death.success, false);
    assert.equal(death.deathSaves.failures, 3);
    assert.equal(death.dead, true);
});

test('Dead companions are excluded from combat initiative and cannot act', async () => {
    const { createCombatEncounter, resolveCompanionTurn, resolveMonsterTurn } = await import('../src/services/dndEngine.js');
    const { getMonsterById } = await import('../src/data/monsters.js');

    const hero = {
        name: 'Kaelen',
        class: 'fighter',
        race: 'half-orc',
        level: 3,
        hp: 25,
        maxHp: 25,
        stats: { strength: 16, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 12, charisma: 8 }
    };

    const livingComp = { name: 'Aria', class: 'wizard', race: 'elf', hp: 14, maxHp: 18, isDead: false };
    const deadComp1 = { name: 'Garrick', class: 'paladin', race: 'human', hp: 0, maxHp: 24, isDead: true };
    const deadComp2 = { name: 'Brynn', class: 'cleric', race: 'dwarf', hp: -5, maxHp: 20, isDead: false };

    const encounter = createCombatEncounter(
        {
            title: 'Crypt Battle',
            monsters: [{ monsterId: 'skeleton', name: 'Skeleton', count: 2 }]
        },
        hero,
        [livingComp, deadComp1, deadComp2],
        getMonsterById
    );

    // Only Hero, 1 living companion, and 2 skeletons should be in initiative (total: 4)
    assert.equal(encounter.initiativeOrder.length, 4);
    assert.ok(encounter.initiativeOrder.some((i) => i.name === 'Aria'));
    assert.ok(!encounter.initiativeOrder.some((i) => i.name === 'Garrick'));
    assert.ok(!encounter.initiativeOrder.some((i) => i.name === 'Brynn'));
    assert.deepEqual(encounter.featureCooldowns, {});

    // Dead companions return null on their turn
    const deadTurn1 = resolveCompanionTurn(deadComp1, encounter.enemies, hero);
    assert.equal(deadTurn1, null);
    const deadTurn2 = resolveCompanionTurn(deadComp2, encounter.enemies, hero);
    assert.equal(deadTurn2, null);

    // Living companion successfully acts
    const livingTurn = resolveCompanionTurn(livingComp, encounter.enemies, hero);
    assert.ok(livingTurn !== null);
    assert.equal(livingTurn.companionName, 'Aria');

    // Monster targeting ignores dead companions
    const monsterTurn = resolveMonsterTurn(encounter.enemies[0], hero, { ac: 16 }, [livingComp, deadComp1, deadComp2]);
    assert.ok(monsterTurn !== null);
    assert.ok(monsterTurn.targetName !== 'Garrick');
    assert.ok(monsterTurn.targetName !== 'Brynn');
});
