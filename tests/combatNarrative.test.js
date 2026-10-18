import test from 'node:test';
import assert from 'node:assert/strict';
import {
    describePlayerWeaponAttack,
    describePlayerSpellCast,
    describeCompanionCombatAction,
    describeMonsterAttackTarget,
    describeMonsterSpellTarget,
    SPELL_CONDITION_EFFECTS
} from '../src/services/combatNarrative.js';
import { resolveMonsterTurn } from '../src/services/dndEngine.js';

test('describePlayerWeaponAttack generates rich narrative for hits and fatal kills', () => {
    // Fatal strike
    const fatal = describePlayerWeaponAttack({
        heroName: 'Rob',
        weaponName: 'mightblade',
        targetName: 'goblin',
        hit: true,
        damage: 12,
        damageType: 'slashing',
        isFatal: true,
        remainingHp: 0
    });

    assert.ok(fatal.title.includes('FATAL BLOW'));
    assert.ok(fatal.prose.includes('Rob'));
    assert.ok(fatal.prose.includes('mightblade'));
    assert.ok(fatal.prose.includes('goblin'));
    assert.ok(fatal.prose.toLowerCase().includes('screeches') || fatal.prose.toLowerCase().includes('lifeless') || fatal.prose.toLowerCase().includes('dead') || fatal.prose.toLowerCase().includes('slain'));

    // Miss
    const miss = describePlayerWeaponAttack({
        heroName: 'Rob',
        weaponName: 'mightblade',
        targetName: 'goblin',
        hit: false
    });
    assert.ok(miss.title.includes('Miss'));
    assert.ok(miss.prose.includes('Rob'));
    assert.ok(miss.prose.includes('goblin'));
});

test('describePlayerSpellCast describes spell damage and conditions', () => {
    const spellHit = describePlayerSpellCast({
        heroName: 'Rob',
        spell: { id: 'fire-bolt', name: 'Fire Bolt', type: 'attack', damageType: 'Fire' },
        targetName: 'goblin',
        hit: true,
        damage: 9,
        isFatal: false,
        remainingHp: 3
    });
    assert.ok(spellHit.prose.includes('Rob'));
    assert.ok(spellHit.prose.includes('Fire Bolt'));
    assert.ok(spellHit.prose.includes('9 Fire damage'));
});

test('describeMonsterAttackTarget clearly identifies who hits whom', () => {
    // Attack hitting Player
    const playerHit = describeMonsterAttackTarget({
        monsterName: 'Bugbear',
        actionName: 'Morningstar',
        targetName: 'Rob',
        isPlayer: true,
        hit: true,
        damage: 11,
        damageType: 'bludgeoning',
        remainingHp: 15
    });
    assert.ok(playerHit.prose.includes('Bugbear'));
    assert.ok(playerHit.prose.includes('Morningstar'));
    assert.ok(playerHit.prose.includes('11 bludgeoning damage'));

    // Attack hitting Companion
    const compHit = describeMonsterAttackTarget({
        monsterName: 'Goblin',
        actionName: 'Scimitar',
        targetName: 'Brother Brynn',
        isPlayer: false,
        hit: true,
        damage: 5,
        damageType: 'slashing',
        remainingHp: 11
    });
    assert.ok(compHit.prose.includes('Goblin'));
    assert.ok(compHit.prose.includes('Brother Brynn'));
    assert.ok(compHit.prose.includes('5 slashing damage'));
});

test('describeMonsterSpellTarget details spell cast and afflicted effect on character', () => {
    const spellImpact = describeMonsterSpellTarget({
        monsterName: 'Cult Fanatic',
        spellName: 'Hold Person',
        targetName: 'Rob',
        isPlayer: true,
        damage: 0,
        conditionInflicted: 'paralyzed',
        saved: false,
        saveAbility: 'WIS',
        saveDc: 13,
        saveRoll: 8,
        remainingHp: 20
    });

    assert.ok(spellImpact.prose.includes('Cult Fanatic'));
    assert.ok(spellImpact.prose.includes('Hold Person'));
    assert.ok(spellImpact.prose.includes('FAILED'));
    assert.ok(spellImpact.prose.includes('PARALYZED'));
    assert.ok(spellImpact.effect.includes('Incapacitated'));
    assert.ok(SPELL_CONDITION_EFFECTS.paralyzed);
});

test('resolveMonsterTurn targets either player or living companions and applies damage', () => {
    const goblin = {
        name: 'Goblin',
        hp: 7,
        maxHp: 7,
        ac: 15,
        actions: [{ name: 'Scimitar', toHit: 4, damageDice: '1d6+2', damageType: 'Slashing' }]
    };
    const hero = {
        name: 'Rob',
        hp: 20,
        maxHp: 20,
        stats: { dexterity: 12 },
        conditions: []
    };
    const companions = [
        { name: 'Brother Brynn', hp: 16, maxHp: 16, ac: 16 }
    ];

    const turn = resolveMonsterTurn(goblin, hero, { ac: 15 }, companions);
    assert.ok(turn);
    assert.ok(turn.targetName === 'Rob' || turn.targetName === 'Brother Brynn');
    assert.ok(typeof turn.damage === 'number');
    assert.ok(turn.log.length > 0);
});
