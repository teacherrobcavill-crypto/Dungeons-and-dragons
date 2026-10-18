import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatInterface from './ChatInterface';
import soundService from '../../services/soundService';

// Mock scrollToBottom since it uses refs that might not behave perfectly in JSDOM or just to avoid errors
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ChatInterface Component', () => {
    const mockMessages = [
        { type: 'ai', text: 'Welcome to the game!', timestamp: new Date().toISOString() },
        { type: 'user', text: 'Hello', timestamp: new Date().toISOString() }
    ];

    it('renders messages correctly', () => {
        render(
            <ChatInterface
                messages={mockMessages}
                onSendMessage={() => { }}
                isLoading={false}
            />
        );

        expect(screen.getByText('Welcome to the game!')).toBeInTheDocument();
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('allows typing and sending a message', () => {
        const handleSendMessage = vi.fn();
        render(
            <ChatInterface
                messages={[]}
                onSendMessage={handleSendMessage}
                isLoading={false}
            />
        );

        const input = screen.getByPlaceholderText('What do you do?');
        const button = screen.getByText('Send');

        fireEvent.change(input, { target: { value: 'Attack goblin' } });
        fireEvent.click(button);

        expect(handleSendMessage).toHaveBeenCalledTimes(1);
        expect(handleSendMessage).toHaveBeenCalledWith('Attack goblin');
    });

    it('disables input when loading', () => {
        render(
            <ChatInterface
                messages={[]}
                onSendMessage={() => { }}
                isLoading={true}
            />
        );

        const input = screen.getByPlaceholderText('What do you do?');
        const button = screen.getByText('Send');

        expect(input).toBeDisabled();
        expect(button.closest('button')).toBeDisabled();
    });

    it('toggles between narrate and mute on button press', async () => {
        class MockSpeechSynthesisUtterance {
            constructor(text) {
                this.text = text;
                this.pitch = 1;
                this.rate = 1;
                this.volume = 1;
                this.voice = null;
                this.onstart = null;
                this.onend = null;
                this.onerror = null;
            }
        }
        window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
        globalThis.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

        window.speechSynthesis = {
            speaking: false,
            cancel: vi.fn(function () {
                this.speaking = false;
            }),
            speak: vi.fn(function (utterance) {
                this.speaking = true;
                utterance.onstart?.();
            }),
            getVoices: vi.fn(() => [])
        };

        render(
            <ChatInterface
                messages={mockMessages}
                onSendMessage={() => { }}
                isLoading={false}
            />
        );

        // Initially shows Narrate
        const narrateButton = screen.getByText('Narrate').closest('button');
        expect(narrateButton).toBeInTheDocument();

        // Click to narrate -> should switch to Mute
        fireEvent.click(narrateButton);
        expect(await screen.findByText('Mute')).toBeInTheDocument();

        // Click again -> should switch back to Narrate
        const muteButton = screen.getByText('Mute').closest('button');
        fireEvent.click(muteButton);
        expect(await screen.findByText('Narrate')).toBeInTheDocument();
    });
});
