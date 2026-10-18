import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { saveGameState, loadGameState, clearGameState } from '../services/storage';
import { ActionTypes, gameReducer, initialState } from './gameState';

const GameContext = createContext(null);

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        const savedState = loadGameState();
        if (savedState) {
            dispatch({ type: ActionTypes.LOAD_STATE, state: savedState });
        }
    }, []);

    useEffect(() => {
        if (state.gameStarted || state.currentStep > 0) {
            saveGameState(state);
        }
    }, [state]);

    const actions = useMemo(() => ({
        setCharacterField: (field, value) =>
            dispatch({ type: ActionTypes.SET_CHARACTER_FIELD, field, value }),

        setCharacter: (character) =>
            dispatch({ type: ActionTypes.SET_CHARACTER, character }),

        setStats: (stats) =>
            dispatch({ type: ActionTypes.SET_STATS, stats }),

        setSkills: (skills) =>
            dispatch({ type: ActionTypes.SET_SKILLS, skills }),

        setCompanions: (companions) =>
            dispatch({ type: ActionTypes.SET_COMPANIONS, companions }),

        setAdventure: (adventure) =>
            dispatch({ type: ActionTypes.SET_ADVENTURE, adventure }),

        setCurrentNode: (nodeId) =>
            dispatch({ type: ActionTypes.SET_CURRENT_NODE, nodeId }),

        markNodeSearched: (nodeId) =>
            dispatch({ type: ActionTypes.MARK_NODE_SEARCHED, nodeId }),

        markNodeLooted: (nodeId) =>
            dispatch({ type: ActionTypes.MARK_NODE_LOOTED, nodeId }),

        markNodeDefeated: (nodeId) =>
            dispatch({ type: ActionTypes.MARK_NODE_DEFEATED, nodeId }),

        markNodeDisarmed: (nodeId) =>
            dispatch({ type: ActionTypes.MARK_NODE_DISARMED, nodeId }),

        markChoiceCompleted: (choiceKey) =>
            dispatch({ type: ActionTypes.MARK_CHOICE_COMPLETED, choiceKey }),

        setNpcAttitude: (npcId, attitude) =>
            dispatch({ type: ActionTypes.SET_NPC_ATTITUDE, npcId, attitude }),

        unlockMonsterCodex: (monsterIds) =>
            dispatch({ type: ActionTypes.UNLOCK_MONSTER_CODEX, monsterIds }),

        setCombat: (combat) =>
            dispatch({ type: ActionTypes.SET_COMBAT, combat }),

        updateCombat: (updates) =>
            dispatch({ type: ActionTypes.UPDATE_COMBAT, updates }),

        endCombat: () =>
            dispatch({ type: ActionTypes.END_COMBAT }),

        addChatMessage: (message) =>
            dispatch({ type: ActionTypes.ADD_CHAT_MESSAGE, message }),

        clearChat: () =>
            dispatch({ type: ActionTypes.CLEAR_CHAT }),

        addInventoryItem: (item) =>
            dispatch({ type: ActionTypes.ADD_INVENTORY_ITEM, item }),

        removeInventoryItem: (itemId) =>
            dispatch({ type: ActionTypes.REMOVE_INVENTORY_ITEM, itemId }),

        equipItem: (item) =>
            dispatch({ type: ActionTypes.EQUIP_ITEM, item }),

        unequipItem: (itemId) =>
            dispatch({ type: ActionTypes.UNEQUIP_ITEM, itemId }),

        updateHp: (amount) =>
            dispatch({ type: ActionTypes.UPDATE_HP, amount }),

        updateGold: (amount) =>
            dispatch({ type: ActionTypes.UPDATE_GOLD, amount }),

        gainXp: (amount) =>
            dispatch({ type: ActionTypes.GAIN_XP, amount }),

        levelUp: (hitDieAvg) =>
            dispatch({ type: ActionTypes.LEVEL_UP, hitDieAvg }),

        useSpellSlot: (level) =>
            dispatch({ type: ActionTypes.USE_SPELL_SLOT, level }),

        restoreSpellSlots: () =>
            dispatch({ type: ActionTypes.RESTORE_SPELL_SLOTS }),

        addCondition: (condition) =>
            dispatch({ type: ActionTypes.ADD_CONDITION, condition }),

        removeCondition: (condition) =>
            dispatch({ type: ActionTypes.REMOVE_CONDITION, condition }),

        shortRest: (healAmount) =>
            dispatch({ type: ActionTypes.SHORT_REST, healAmount }),

        longRest: () =>
            dispatch({ type: ActionTypes.LONG_REST }),

        setCurrentStep: (step) =>
            dispatch({ type: ActionTypes.SET_CURRENT_STEP, step }),

        startGame: () =>
            dispatch({ type: ActionTypes.START_GAME }),

        updateSettings: (settings) =>
            dispatch({ type: ActionTypes.UPDATE_SETTINGS, settings }),

        resetGame: () => {
            dispatch({ type: ActionTypes.RESET_STATE });
            clearGameState();
        },

        setPendingRoll: (rollData) =>
            dispatch({ type: ActionTypes.SET_PENDING_ROLL, rollData }),

        clearPendingRoll: () =>
            dispatch({ type: ActionTypes.CLEAR_PENDING_ROLL })
    }), []);

    const contextValue = useMemo(() => ({ state, ...actions }), [state, actions]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

export default GameContext;
