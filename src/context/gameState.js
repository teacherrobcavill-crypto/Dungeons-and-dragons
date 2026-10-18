import { XP_THRESHOLDS, getAbilityMod } from '../services/dndEngine.js';

export const initialState = {
    character: {
        name: '',
        race: null,
        subrace: null,
        class: null,
        subclass: null,
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        },
        skills: [],
        spells: [],
        spellSlots: {
            level1: { current: 2, max: 2 },
            level2: { current: 0, max: 0 },
            level3: { current: 0, max: 0 }
        },
        classResources: {},
        conditions: [],
        hitDiceRemaining: 1,
        deathSaves: { successes: 0, failures: 0 },
        gold: 25,
        personality: '',
        traits: '',
        background: '',
        hp: 10,
        maxHp: 10,
        tempHp: 0,
        level: 1,
        experience: 0
    },
    companions: [],
    adventure: null,
    currentNodeId: null,
    visitedNodes: [],
    searchedNodes: [],
    lootedNodes: [],
    defeatedNodes: [],
    disarmedNodes: [],
    completedChoices: [],
    npcAttitudes: {},
    encounteredMonsters: ['goblin', 'wolf', 'bugbear', 'skeleton', 'mimic', 'owlbear', 'young-red-dragon'],
    combat: null,
    chatHistory: [],
    inventory: [
        { id: 1, name: 'Backpack', quantity: 1, type: 'gear', icon: '🎒' },
        { id: 2, name: 'Torch', quantity: 3, type: 'gear', icon: '🔥' },
        { id: 3, name: 'Rations', quantity: 5, type: 'consumable', healDice: '1d4+1', icon: '🍖', description: 'Hearty trail rations (restores 1d4+1 HP).' },
        { id: 4, name: 'Gold Pieces', quantity: 15, type: 'currency', icon: '💰' }
    ],
    equippedItems: [],
    gameStarted: false,
    currentStep: 0,
    settings: {
        aiModel: 'mock',
        darkMode: true,
        soundEnabled: true,
        narrationEnabled: false,
        animationsEnabled: true
    },
    pendingRoll: null
};

export const ActionTypes = {
    SET_CHARACTER_FIELD: 'SET_CHARACTER_FIELD',
    SET_CHARACTER: 'SET_CHARACTER',
    SET_STATS: 'SET_STATS',
    SET_SKILLS: 'SET_SKILLS',
    SET_COMPANIONS: 'SET_COMPANIONS',
    SET_ADVENTURE: 'SET_ADVENTURE',
    ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
    CLEAR_CHAT: 'CLEAR_CHAT',
    ADD_INVENTORY_ITEM: 'ADD_INVENTORY_ITEM',
    REMOVE_INVENTORY_ITEM: 'REMOVE_INVENTORY_ITEM',
    EQUIP_ITEM: 'EQUIP_ITEM',
    UNEQUIP_ITEM: 'UNEQUIP_ITEM',
    UPDATE_HP: 'UPDATE_HP',
    UPDATE_GOLD: 'UPDATE_GOLD',
    GAIN_XP: 'GAIN_XP',
    LEVEL_UP: 'LEVEL_UP',
    USE_SPELL_SLOT: 'USE_SPELL_SLOT',
    RESTORE_SPELL_SLOTS: 'RESTORE_SPELL_SLOTS',
    ADD_CONDITION: 'ADD_CONDITION',
    REMOVE_CONDITION: 'REMOVE_CONDITION',
    SHORT_REST: 'SHORT_REST',
    LONG_REST: 'LONG_REST',
    SET_CURRENT_NODE: 'SET_CURRENT_NODE',
    MARK_NODE_SEARCHED: 'MARK_NODE_SEARCHED',
    MARK_NODE_LOOTED: 'MARK_NODE_LOOTED',
    MARK_NODE_DEFEATED: 'MARK_NODE_DEFEATED',
    MARK_NODE_DISARMED: 'MARK_NODE_DISARMED',
    MARK_CHOICE_COMPLETED: 'MARK_CHOICE_COMPLETED',
    SET_NPC_ATTITUDE: 'SET_NPC_ATTITUDE',
    UNLOCK_MONSTER_CODEX: 'UNLOCK_MONSTER_CODEX',
    SET_COMBAT: 'SET_COMBAT',
    UPDATE_COMBAT: 'UPDATE_COMBAT',
    END_COMBAT: 'END_COMBAT',
    SET_CURRENT_STEP: 'SET_CURRENT_STEP',
    START_GAME: 'START_GAME',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    LOAD_STATE: 'LOAD_STATE',
    RESET_STATE: 'RESET_STATE',
    SET_PENDING_ROLL: 'SET_PENDING_ROLL',
    CLEAR_PENDING_ROLL: 'CLEAR_PENDING_ROLL'
};

export function normalizeCompanion(comp, fallbackIndex = 0) {
    if (!comp) return null;
    const cls = (comp.class || 'fighter').toLowerCase();
    const classHpDefaults = {
        barbarian: 26,
        paladin: 24,
        fighter: 22,
        cleric: 20,
        druid: 18,
        ranger: 20,
        monk: 18,
        bard: 18,
        rogue: 18,
        warlock: 16,
        wizard: 16,
        sorcerer: 16
    };
    const defaultMaxHp = classHpDefaults[cls] || 18;
    const maxHp = comp.maxHp || (comp.hp && comp.hp > 14 ? comp.hp : defaultMaxHp);
    const currentHp = comp.hp !== undefined ? Math.min(maxHp, Math.max(0, comp.hp)) : maxHp;

    const classAcDefaults = {
        barbarian: 15,
        paladin: 18,
        fighter: 18,
        cleric: 17,
        druid: 14,
        ranger: 16,
        monk: 16,
        bard: 14,
        rogue: 15,
        warlock: 13,
        wizard: 13,
        sorcerer: 13
    };
    const ac = comp.ac || classAcDefaults[cls] || 14;

    return {
        ...comp,
        id: comp.id || `comp-${fallbackIndex}-${(comp.name || 'ally').toLowerCase().replace(/\s+/g, '_')}`,
        name: comp.name || 'Companion',
        race: comp.race || 'Human',
        class: comp.class || 'Fighter',
        personality: comp.personality || 'Wise',
        maxHp,
        hp: currentHp,
        ac
    };
}

export function gameReducer(state, action) {
    switch (action.type) {
        case ActionTypes.SET_CHARACTER_FIELD:
            return {
                ...state,
                character: {
                    ...state.character,
                    [action.field]: action.value
                }
            };

        case ActionTypes.SET_CHARACTER:
            return {
                ...state,
                character: { ...state.character, ...action.character }
            };

        case ActionTypes.SET_STATS:
            return {
                ...state,
                character: {
                    ...state.character,
                    stats: { ...state.character.stats, ...action.stats }
                }
            };

        case ActionTypes.SET_SKILLS:
            return {
                ...state,
                character: {
                    ...state.character,
                    skills: action.skills
                }
            };

        case ActionTypes.SET_COMPANIONS:
            return {
                ...state,
                companions: (action.companions || []).map((c, i) => normalizeCompanion(c, i))
            };

        case ActionTypes.SET_ADVENTURE: {
            const adv = action.adventure;
            const startNode = adv?.startNodeId || (adv?.nodes ? Object.keys(adv.nodes)[0] : null);
            return {
                ...state,
                adventure: adv,
                currentNodeId: startNode,
                visitedNodes: startNode ? [startNode] : [],
                searchedNodes: [],
                lootedNodes: [],
                defeatedNodes: [],
                disarmedNodes: [],
                combat: null
            };
        }

        case ActionTypes.SET_CURRENT_NODE: {
            const nodeId = action.nodeId;
            if (!nodeId) return state;
            const visited = state.visitedNodes.includes(nodeId)
                ? state.visitedNodes
                : [...state.visitedNodes, nodeId];
            return {
                ...state,
                currentNodeId: nodeId,
                visitedNodes: visited
            };
        }

        case ActionTypes.MARK_NODE_SEARCHED:
            return {
                ...state,
                searchedNodes: state.searchedNodes.includes(action.nodeId)
                    ? state.searchedNodes
                    : [...state.searchedNodes, action.nodeId]
            };

        case ActionTypes.MARK_NODE_LOOTED:
            return {
                ...state,
                lootedNodes: state.lootedNodes.includes(action.nodeId)
                    ? state.lootedNodes
                    : [...state.lootedNodes, action.nodeId]
            };

        case ActionTypes.MARK_NODE_DEFEATED:
            return {
                ...state,
                defeatedNodes: state.defeatedNodes.includes(action.nodeId)
                    ? state.defeatedNodes
                    : [...state.defeatedNodes, action.nodeId]
            };

        case ActionTypes.MARK_NODE_DISARMED:
            return {
                ...state,
                disarmedNodes: state.disarmedNodes.includes(action.nodeId)
                    ? state.disarmedNodes
                    : [...state.disarmedNodes, action.nodeId]
            };

        case ActionTypes.MARK_CHOICE_COMPLETED:
            return {
                ...state,
                completedChoices: (state.completedChoices || []).includes(action.choiceKey)
                    ? state.completedChoices
                    : [...(state.completedChoices || []), action.choiceKey]
            };

        case ActionTypes.SET_NPC_ATTITUDE:
            return {
                ...state,
                npcAttitudes: {
                    ...state.npcAttitudes,
                    [action.npcId]: action.attitude
                }
            };

        case ActionTypes.UNLOCK_MONSTER_CODEX: {
            const ids = Array.isArray(action.monsterIds) ? action.monsterIds : [action.monsterIds];
            const merged = Array.from(new Set([...(state.encounteredMonsters || []), ...ids.filter(Boolean)]));
            return {
                ...state,
                encounteredMonsters: merged
            };
        }

        case ActionTypes.SET_COMBAT:
            return {
                ...state,
                combat: action.combat
            };

        case ActionTypes.UPDATE_COMBAT:
            return {
                ...state,
                combat: state.combat ? { ...state.combat, ...action.updates } : null
            };

        case ActionTypes.END_COMBAT:
            return {
                ...state,
                combat: null,
                character: {
                    ...state.character,
                    conditions: (state.character.conditions || []).filter(
                        (c) => !['raging', 'shielded', 'dodging', 'hidden', 'hunters_mark', 'hexed'].includes(c)
                    )
                }
            };

        case ActionTypes.ADD_CHAT_MESSAGE:
            return { ...state, chatHistory: [...state.chatHistory, action.message] };

        case ActionTypes.CLEAR_CHAT:
            return { ...state, chatHistory: [] };

        case ActionTypes.ADD_INVENTORY_ITEM: {
            const existingItem = state.inventory.find((i) => i.name === action.item.name);
            if (existingItem) {
                return {
                    ...state,
                    inventory: state.inventory.map((i) =>
                        i.name === action.item.name
                            ? { ...i, quantity: i.quantity + (action.item.quantity || 1) }
                            : i
                    )
                };
            }
            return {
                ...state,
                inventory: [...state.inventory, { ...action.item, id: action.item.id || Date.now() + Math.random(), quantity: action.item.quantity || 1 }]
            };
        }

        case ActionTypes.REMOVE_INVENTORY_ITEM:
            return {
                ...state,
                inventory: state.inventory.filter((i) => i.id !== action.itemId),
                equippedItems: (state.equippedItems || []).filter((i) => i.id !== action.itemId)
            };

        case ActionTypes.EQUIP_ITEM: {
            const item = action.item;
            if (!item) return state;
            const currentEquipped = state.equippedItems || [];
            // Replace existing item of same slot (armor, shield, weapon)
            const filtered = currentEquipped.filter((eq) => {
                if (item.type === 'armor' && eq.type === 'armor') return false;
                if (item.type === 'shield' && eq.type === 'shield') return false;
                if (item.type === 'weapon' && eq.type === 'weapon') return false;
                return eq.id !== item.id;
            });
            return {
                ...state,
                equippedItems: [...filtered, item]
            };
        }

        case ActionTypes.UNEQUIP_ITEM:
            return {
                ...state,
                equippedItems: (state.equippedItems || []).filter((i) => i.id !== action.itemId)
            };

        case ActionTypes.UPDATE_HP: {
            const newHp = Math.max(0, Math.min(state.character.maxHp, state.character.hp + action.amount));
            return {
                ...state,
                character: {
                    ...state.character,
                    hp: newHp,
                    deathSaves: newHp > 0 ? { successes: 0, failures: 0 } : state.character.deathSaves
                }
            };
        }

        case ActionTypes.UPDATE_GOLD: {
            const currentGold = state.character.gold ?? 25;
            const newGold = Math.max(0, currentGold + action.amount);
            return {
                ...state,
                character: {
                    ...state.character,
                    gold: newGold
                }
            };
        }

        case ActionTypes.GAIN_XP: {
            const currentXp = state.character.experience || 0;
            const newXp = currentXp + (action.amount || 0);
            let newLevel = state.character.level || 1;
            let maxHp = state.character.maxHp || 10;
            let hp = state.character.hp || 10;
            const conMod = getAbilityMod(state.character.stats?.constitution || 10);

            while (newLevel < 10 && newXp >= (XP_THRESHOLDS[newLevel + 1] || 999999)) {
                newLevel += 1;
                const hpGain = Math.max(4, 6 + conMod);
                maxHp += hpGain;
                hp = maxHp;
            }

            const spellSlots = { ...(state.character.spellSlots || initialState.character.spellSlots) };
            if (newLevel >= 3 && (!spellSlots.level2 || spellSlots.level2.max === 0)) {
                spellSlots.level1 = { current: 4, max: 4 };
                spellSlots.level2 = { current: 2, max: 2 };
            }
            if (newLevel >= 5 && (!spellSlots.level3 || spellSlots.level3.max === 0)) {
                spellSlots.level2 = { current: 3, max: 3 };
                spellSlots.level3 = { current: 2, max: 2 };
            }

            return {
                ...state,
                character: {
                    ...state.character,
                    experience: newXp,
                    level: newLevel,
                    maxHp,
                    hp,
                    hitDiceRemaining: newLevel,
                    spellSlots
                }
            };
        }

        case ActionTypes.LEVEL_UP: {
            const nextLevel = Math.min(10, (state.character.level || 1) + 1);
            const conMod = getAbilityMod(state.character.stats?.constitution || 10);
            const hpGain = Math.max(5, (action.hitDieAvg || 6) + conMod);
            const newMaxHp = (state.character.maxHp || 10) + hpGain;
            const nextXp = Math.max(state.character.experience || 0, XP_THRESHOLDS[nextLevel] || 300);

            const spellSlots = { ...(state.character.spellSlots || initialState.character.spellSlots) };
            spellSlots.level1 = { current: Math.min(4, nextLevel + 1), max: Math.min(4, nextLevel + 1) };
            if (nextLevel >= 3) {
                spellSlots.level2 = { current: 2, max: 2 };
            }
            if (nextLevel >= 5) {
                spellSlots.level3 = { current: 2, max: 2 };
            }

            return {
                ...state,
                character: {
                    ...state.character,
                    level: nextLevel,
                    experience: nextXp,
                    maxHp: newMaxHp,
                    hp: newMaxHp,
                    hitDiceRemaining: nextLevel,
                    spellSlots
                }
            };
        }

        case ActionTypes.USE_SPELL_SLOT: {
            const slotKey = `level${action.level}`;
            const currentSlots = state.character.spellSlots || initialState.character.spellSlots;
            const slotObj = currentSlots[slotKey];
            if (!slotObj || slotObj.current <= 0) return state;
            return {
                ...state,
                character: {
                    ...state.character,
                    spellSlots: {
                        ...currentSlots,
                        [slotKey]: { ...slotObj, current: slotObj.current - 1 }
                    }
                }
            };
        }

        case ActionTypes.RESTORE_SPELL_SLOTS: {
            const currentSlots = state.character.spellSlots || initialState.character.spellSlots;
            const restored = {};
            Object.entries(currentSlots).forEach(([k, v]) => {
                restored[k] = { ...v, current: v.max };
            });
            return {
                ...state,
                character: {
                    ...state.character,
                    spellSlots: restored
                }
            };
        }

        case ActionTypes.ADD_CONDITION: {
            const cond = action.condition;
            if (!cond) return state;
            const current = state.character.conditions || [];
            if (current.includes(cond)) return state;
            return {
                ...state,
                character: {
                    ...state.character,
                    conditions: [...current, cond]
                }
            };
        }

        case ActionTypes.REMOVE_CONDITION:
            return {
                ...state,
                character: {
                    ...state.character,
                    conditions: (state.character.conditions || []).filter((c) => c !== action.condition)
                }
            };

        case ActionTypes.SHORT_REST: {
            const healAmount = action.healAmount || Math.max(4, Math.floor(state.character.maxHp * 0.45));
            const newHp = Math.min(state.character.maxHp, state.character.hp + healAmount);
            const currentHd = state.character.hitDiceRemaining ?? state.character.level ?? 1;
            // Warlocks and Wizards (Arcane Recovery) recover a spell slot on Short Rest
            const currentSlots = { ...(state.character.spellSlots || initialState.character.spellSlots) };
            if (['warlock', 'wizard', 'druid', 'cleric'].includes(state.character.class)) {
                if (currentSlots.level1) {
                    currentSlots.level1 = {
                        ...currentSlots.level1,
                        current: Math.min(currentSlots.level1.max, currentSlots.level1.current + 1)
                    };
                }
            }
            const healedCompanions = (state.companions || []).map((c, i) => {
                const norm = normalizeCompanion(c, i);
                const maxHp = norm.maxHp;
                const currentHp = norm.hp;
                const compHeal = Math.max(4, Math.floor(maxHp * 0.45));
                return {
                    ...norm,
                    hp: Math.min(maxHp, currentHp + compHeal)
                };
            });
            return {
                ...state,
                character: {
                    ...state.character,
                    hp: newHp,
                    hitDiceRemaining: Math.max(0, currentHd - 1),
                    spellSlots: currentSlots,
                    conditions: (state.character.conditions || []).filter((c) => !['frightened', 'charmed', 'prone', 'stunned'].includes(c))
                },
                companions: healedCompanions
            };
        }

        case ActionTypes.LONG_REST: {
            const currentSlots = state.character.spellSlots || initialState.character.spellSlots;
            const restoredSlots = {};
            Object.entries(currentSlots).forEach(([k, v]) => {
                restoredSlots[k] = { ...v, current: v.max };
            });
            const restoredCompanions = (state.companions || []).map((c, i) => {
                const norm = normalizeCompanion(c, i);
                return {
                    ...norm,
                    hp: norm.maxHp
                };
            });
            return {
                ...state,
                character: {
                    ...state.character,
                    hp: state.character.maxHp,
                    tempHp: 0,
                    hitDiceRemaining: state.character.level || 1,
                    deathSaves: { successes: 0, failures: 0 },
                    conditions: [],
                    spellSlots: restoredSlots
                },
                companions: restoredCompanions
            };
        }

        case ActionTypes.SET_CURRENT_STEP:
            return { ...state, currentStep: action.step };

        case ActionTypes.START_GAME:
            return { ...state, gameStarted: true };

        case ActionTypes.UPDATE_SETTINGS:
            return { ...state, settings: { ...state.settings, ...action.settings } };

        case ActionTypes.LOAD_STATE: {
            const loaded = action.state || {};
            const loadedChar = loaded.character || {};
            return {
                ...initialState,
                ...loaded,
                character: {
                    ...initialState.character,
                    ...loadedChar,
                    stats: {
                        ...initialState.character.stats,
                        ...(loadedChar.stats || {})
                    },
                    skills: Array.isArray(loadedChar.skills) ? loadedChar.skills : [],
                    spells: Array.isArray(loadedChar.spells) ? loadedChar.spells : [],
                    conditions: Array.isArray(loadedChar.conditions) ? loadedChar.conditions : []
                },
                companions: Array.isArray(loaded.companions)
                    ? loaded.companions.map((c, i) => normalizeCompanion(c, i))
                    : [],
                inventory: Array.isArray(loaded.inventory) ? loaded.inventory : initialState.inventory,
                equippedItems: Array.isArray(loaded.equippedItems) ? loaded.equippedItems : [],
                visitedNodes: Array.isArray(loaded.visitedNodes) ? loaded.visitedNodes : [],
                searchedNodes: Array.isArray(loaded.searchedNodes) ? loaded.searchedNodes : [],
                lootedNodes: Array.isArray(loaded.lootedNodes) ? loaded.lootedNodes : [],
                defeatedNodes: Array.isArray(loaded.defeatedNodes) ? loaded.defeatedNodes : [],
                completedChoices: Array.isArray(loaded.completedChoices) ? loaded.completedChoices : [],
                chatHistory: Array.isArray(loaded.chatHistory) ? loaded.chatHistory : [],
                settings: {
                    ...initialState.settings,
                    ...(loaded.settings || {})
                }
            };
        }

        case ActionTypes.RESET_STATE:
            return initialState;

        case ActionTypes.SET_PENDING_ROLL:
            return { ...state, pendingRoll: action.rollData };

        case ActionTypes.CLEAR_PENDING_ROLL:
            return { ...state, pendingRoll: null };

        default:
            return state;
    }
}
