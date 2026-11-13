import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../utils/test-utils';
import GameInterface from './GameInterface';
import * as aiService from '../services/aiService';

// Mock AI service to avoid network calls and delays
vi.mock('../services/aiService', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        generateOpeningNarrative: vi.fn().mockResolvedValue('Welcome to the adventure!'),
        generateDMResponse: vi.fn().mockResolvedValue({
            success: true,
            message: 'Transformation complete.',
            metadata: { roll: null, requiresRoll: false }
        })
    };
});

// Mock SoundService
vi.mock('../services/soundService', () => ({
    default: {
        init: vi.fn(),
        play: vi.fn(),
        setEnabled: vi.fn(),
        setNarrationEnabled: vi.fn(),
        startAmbient: vi.fn(),
        stopAmbient: vi.fn(),
        toggleAmbient: vi.fn(),
        subscribeAmbientState: vi.fn(() => () => {})
    }
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('GameInterface Integration', () => {
    it('redirects if game not started', () => {
        // Baseline check
    });

    it('renders the game interface when game is active', async () => {
        const activeState = {
            schemaVersion: 2,
            state: {
                gameStarted: true,
                adventure: { name: 'Test Adventure', setting: 'Test World' },
                character: {
                    name: 'Hero',
                    race: 'human',
                    class: 'fighter',
                    hp: 10,
                    maxHp: 10,
                    level: 1,
                    stats: {
                        strength: 10,
                        dexterity: 12,
                        constitution: 14,
                        intelligence: 8,
                        wisdom: 10,
                        charisma: 16
                    }
                },
                chatHistory: [],
                inventory: [],
                companions: [],
                settings: { soundEnabled: true, animationsEnabled: false }
            }
        };

        localStorage.setItem('mythicbot_game_state', JSON.stringify(activeState));

        renderWithProviders(<GameInterface />);

        expect(await screen.findByText('Test Adventure')).toBeInTheDocument();

        await waitFor(() => {
            expect(aiService.generateOpeningNarrative).toHaveBeenCalled();
        });

        expect(await screen.findByText('Welcome to the adventure!')).toBeInTheDocument();
    });

    it('removes top banner in Story Mode and displays floating exit controls', async () => {
        const activeState = {
            schemaVersion: 2,
            state: {
                gameStarted: true,
                adventure: { name: 'Test Adventure', setting: 'Test World' },
                character: {
                    name: 'Hero',
                    race: 'human',
                    class: 'fighter',
                    hp: 10,
                    maxHp: 10,
                    level: 1,
                    stats: { strength: 10, dexterity: 12, constitution: 14, intelligence: 8, wisdom: 10, charisma: 16 }
                },
                chatHistory: [{ type: 'ai', text: 'Welcome to the adventure!', timestamp: new Date().toISOString() }],
                inventory: [],
                companions: [],
                settings: { soundEnabled: true, animationsEnabled: false }
            }
        };

        localStorage.setItem('mythicbot_game_state', JSON.stringify(activeState));

        const { fireEvent } = await import('@testing-library/react');
        renderWithProviders(<GameInterface />);

        expect(screen.getByRole('banner')).toBeInTheDocument();
        const storyModeButton = screen.getByTitle('Enter Story Focus Mode (Hides interface clutter)');
        expect(storyModeButton).toBeInTheDocument();

        fireEvent.click(storyModeButton);

        expect(screen.queryByRole('banner')).not.toBeInTheDocument();

        const exitButton = screen.getByTitle('Exit Story Mode');
        expect(exitButton).toBeInTheDocument();

        fireEvent.click(exitButton);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('defaults to Story view with Scenic Cutaway and switches cleanly to 3D Scene Cutaway and back', async () => {
        const activeState = {
            schemaVersion: 2,
            state: {
                gameStarted: true,
                adventure: { id: 'lost-mine', name: 'The Lost Mine of Phandelver', setting: 'The Sword Coast' },
                currentNodeId: 'ambush_trail',
                visitedNodes: ['ambush_trail'],
                character: {
                    name: 'Kaelen',
                    race: 'human',
                    class: 'fighter',
                    hp: 14,
                    maxHp: 14,
                    level: 1,
                    stats: { strength: 16, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 12, charisma: 10 }
                },
                chatHistory: [{ type: 'ai', text: 'Opening narrative', timestamp: new Date().toISOString() }],
                inventory: [],
                companions: [],
                settings: { soundEnabled: true, animationsEnabled: true }
            }
        };

        localStorage.setItem('mythicbot_game_state', JSON.stringify(activeState));

        const { fireEvent } = await import('@testing-library/react');
        renderWithProviders(<GameInterface />);

        // Story-First default: 3D viewport is tucked away behind Scenic Cutaway button
        expect(screen.queryByTestId('dungeon-viewport-3d')).not.toBeInTheDocument();
        const openCutawayBtn = await screen.findByTestId('open-3d-cutaway');
        expect(openCutawayBtn).toBeInTheDocument();

        fireEvent.click(openCutawayBtn);

        const viewport = await screen.findByTestId('dungeon-viewport-3d');
        expect(viewport).toBeInTheDocument();
        expect(viewport.getAttribute('data-camera-mode')).toBe('firstPerson');

        const hud = screen.getByTestId('diegetic-parchment-hud');
        expect(hud).toBeInTheDocument();

        const camToggle = screen.getByTestId('toggle-camera-mode');
        fireEvent.click(camToggle);
        expect(viewport.getAttribute('data-camera-mode')).toBe('isometric');

        const backToStoryBtn = screen.getByTestId('return-to-story-btn');
        fireEvent.click(backToStoryBtn);
        expect(screen.queryByTestId('dungeon-viewport-3d')).not.toBeInTheDocument();
    });

    it('enters Full-Screen 3D Battle Arena automatically when combat is active', async () => {
        const activeBattleState = {
            schemaVersion: 2,
            state: {
                gameStarted: true,
                adventure: { id: 'lost-mine', name: 'The Lost Mine of Phandelver', setting: 'The Sword Coast' },
                currentNodeId: 'ambush_trail',
                visitedNodes: ['ambush_trail'],
                character: {
                    name: 'Kaelen',
                    race: 'human',
                    class: 'fighter',
                    hp: 14,
                    maxHp: 14,
                    level: 1,
                    stats: { strength: 16, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 12, charisma: 10 }
                },
                combat: {
                    active: true,
                    title: 'Goblin Arrows',
                    round: 1,
                    actionUsed: false,
                    bonusActionUsed: false,
                    enemies: [
                        {
                            instanceId: 'goblin-1',
                            id: 'goblin',
                            name: 'Goblin Ambushers',
                            hp: 7,
                            maxHp: 7,
                            ac: 15
                        }
                    ],
                    rollingFeed: [
                        {
                            id: 'init-1',
                            title: 'Battle Joined: Goblin Arrows',
                            text: 'Goblins leap from the briars!',
                            rollText: 'Round 1'
                        }
                    ]
                },
                chatHistory: [{ type: 'ai', text: 'Opening narrative', timestamp: new Date().toISOString() }],
                inventory: [],
                companions: [],
                settings: { soundEnabled: true, animationsEnabled: true }
            }
        };

        localStorage.setItem('mythicbot_game_state', JSON.stringify(activeBattleState));

        renderWithProviders(<GameInterface />);

        const battleArena = await screen.findByTestId('fullscreen-battle-arena');
        expect(battleArena).toBeInTheDocument();

        const viewport = screen.getByTestId('dungeon-viewport-3d');
        expect(viewport).toBeInTheDocument();
        expect(viewport.getAttribute('data-battle-arena')).toBe('true');

        expect(screen.getByTestId('combat-encounter-hud')).toBeInTheDocument();
    });
});
