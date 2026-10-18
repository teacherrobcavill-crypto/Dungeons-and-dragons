import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { GameProvider } from '../context/GameContext';
import CharacterCreator from './CharacterCreator';

describe('CharacterCreator Component', () => {
    it('renders without crashing and allows selecting race and class with proper highlights', () => {
        render(
            <MemoryRouter initialEntries={['/create']}>
                <GameProvider>
                    <CharacterCreator />
                </GameProvider>
            </MemoryRouter>
        );

        // Header and Step 1 Race Selection
        expect(screen.getByText('Choose Your Race')).toBeInTheDocument();
        const elfCard = screen.getByText('Elf').closest('div');
        expect(elfCard).toBeInTheDocument();

        // Click Elf -> should highlight and show SELECTED badge
        fireEvent.click(elfCard);
        expect(screen.getByText('SELECTED')).toBeInTheDocument();
        expect(screen.getByText('Select Subrace / Lineage:')).toBeInTheDocument();

        // Continue to Step 2: Class
        const continueButton = screen.getByText('Continue →');
        fireEvent.click(continueButton);

        expect(screen.getByText('Choose Your Class')).toBeInTheDocument();
        const wizardCard = screen.getByText('Wizard').closest('div');
        expect(wizardCard).toBeInTheDocument();

        // Click Wizard -> should highlight
        fireEvent.click(wizardCard);
        expect(screen.getByText('Iconic Subclasses / Archetypes:')).toBeInTheDocument();

        // Continue to Step 3: Stats
        fireEvent.click(screen.getByText('Continue →'));
        expect(screen.getByText('Forge Your Ability Scores')).toBeInTheDocument();
        expect(screen.getByText('Lore Origin Trials')).toBeInTheDocument();
        expect(screen.getByText('Heroic Ability Tree')).toBeInTheDocument();
    });

    it('navigates through all steps without any undefined length errors', () => {
        render(
            <MemoryRouter initialEntries={['/create']}>
                <GameProvider>
                    <CharacterCreator />
                </GameProvider>
            </MemoryRouter>
        );

        // Select Race
        fireEvent.click(screen.getByText('Human').closest('div'));
        fireEvent.click(screen.getByText('Continue →'));

        // Select Class
        fireEvent.click(screen.getByText('Fighter').closest('div'));
        fireEvent.click(screen.getByText('Continue →'));

        // Step 3: Stats
        expect(screen.getByText('Forge Your Ability Scores')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Continue →'));

        // Step 4: Skills
        expect(screen.getByText('Select Your Skills')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Continue →'));

        // Step 5: Personality
        expect(screen.getByText('Personality & Traits')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Continue →'));

        // Step 6: Background
        expect(screen.getByText("Hero's Identity & Background")).toBeInTheDocument();
        fireEvent.click(screen.getByText('Continue →'));

        // Step 7: Companions
        expect(screen.getByText('Form Your Party of Companions')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Continue →'));

        // Step 8: Review
        expect(screen.getByText('Review Your Character')).toBeInTheDocument();
        expect(screen.getByText('Start Adventure →')).toBeInTheDocument();
    });
});
