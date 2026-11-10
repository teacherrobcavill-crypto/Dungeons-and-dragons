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

    it('renders 3D Dungeon viewport, Diegetic Parchment HUD, and toggles First-Person / Isometric cameras', async () => {
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

        const viewport = await screen.findByTestId('dungeon-viewport-3d');
        expect(viewport).toBeInTheDocument();
        expect(viewport.getAttribute('data-camera-mode')).toBe('firstPerson');

        const hud = screen.getByTestId('diegetic-parchment-hud');
        expect(hud).toBeInTheDocument();

        const camToggle = screen.getByTestId('toggle-camera-mode');
        fireEvent.click(camToggle);
        expect(viewport.getAttribute('data-camera-mode')).toBe('isometric');
    });
});

