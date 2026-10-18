// Sound & Voice Narration Service for MythicBot D&D 5e Engine
// Provides procedural Web Audio API sound effects, ambient soundscapes,
// Web Speech API Text-to-Speech (TTS), and ElevenLabs Studio Voice Audio Playback.

import { VOICE_TRACKS, getVoiceTrack } from '../data/assets';

class SoundService {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.narrationEnabled = false;
        this.ambientEnabled = false;
        this.volume = 0.5;
        this.ambientNodes = [];
        this.currentAmbientTheme = null;
        this.isSpeakingState = false;
        this.currentSpeakingId = null;
        this.currentVoiceAudio = null;
        this.currentVoiceId = null;
        this.speechListeners = new Set();

        this.soundConfigs = {
            diceRoll: { type: 'dice', duration: 0.35 },
            critical: { type: 'success', duration: 0.6 },
            fumble: { type: 'fail', duration: 0.5 },
            message: { type: 'blip', duration: 0.1 },
            click: { type: 'click', duration: 0.05 },
            levelUp: { type: 'fanfare', duration: 0.9 },
            swordHit: { type: 'sword', duration: 0.3 },
            spellCast: { type: 'spell', duration: 0.55 },
            fireball: { type: 'fireball', duration: 0.7 },
            heal: { type: 'heal', duration: 0.6 },
            potion: { type: 'potion', duration: 0.4 },
            gold: { type: 'gold', duration: 0.35 },
            trap: { type: 'trap', duration: 0.45 },
            combatStart: { type: 'horn', duration: 0.8 },
            victory: { type: 'fanfare', duration: 1.0 },
            rest: { type: 'rest', duration: 0.8 }
        };
    }

    init() {
        if (typeof window === 'undefined') return;
        if (!this.audioContext) {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.audioContext = new AudioCtx();
                }
            } catch (e) {
                console.warn('Web Audio API not supported:', e);
            }
        }
    }

    setEnabled(enabled) {
        this.enabled = Boolean(enabled);
        if (!this.enabled) {
            this.stopAmbient();
        }
    }

    setNarrationEnabled(enabled) {
        this.narrationEnabled = Boolean(enabled);
        if (!this.narrationEnabled) {
            this.stopSpeaking();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.currentVoiceAudio) {
            try {
                this.currentVoiceAudio.volume = Math.max(0, Math.min(1, this.volume * 1.4));
            } catch {
                // ignore
            }
        }
    }

    play(soundName) {
        if (!this.enabled) return;
        if (!this.audioContext) {
            this.init();
        }
        if (!this.audioContext) return;

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }

        const config = this.soundConfigs[soundName];
        if (!config) return;

        try {
            switch (config.type) {
                case 'dice':
                    this.playDiceSound();
                    break;
                case 'success':
                    this.playSuccessSound();
                    break;
                case 'fail':
                    this.playFailSound();
                    break;
                case 'blip':
                    this.playBlipSound();
                    break;
                case 'click':
                    this.playClickSound();
                    break;
                case 'fanfare':
                    this.playFanfareSound();
                    break;
                case 'sword':
                    this.playSwordSound();
                    break;
                case 'spell':
                    this.playSpellSound();
                    break;
                case 'fireball':
                    this.playFireballSound();
                    break;
                case 'heal':
                    this.playHealSound();
                    break;
                case 'potion':
                    this.playPotionSound();
                    break;
                case 'gold':
                    this.playGoldSound();
                    break;
                case 'trap':
                    this.playTrapSound();
                    break;
                case 'horn':
                    this.playCombatHornSound();
                    break;
                case 'rest':
                    this.playRestSound();
                    break;
                default:
                    this.playClickSound();
            }
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }

    // Wooden tabletop clatter for dice rolls
    playDiceSound() {
        const now = this.audioContext.currentTime;
        for (let i = 0; i < 6; i++) {
            const delay = i * 0.045 + Math.random() * 0.015;
            const freq = 180 + Math.random() * 360;
            this.playTone(freq, now + delay, 0.035, 'triangle', this.volume * 0.6);
        }
    }

    // Critical 20 / Heroic success
    playSuccessSound() {
        const now = this.audioContext.currentTime;
        const notes = [440, 554.37, 659.25, 880]; // A major chord arpeggio
        notes.forEach((freq, idx) => {
            this.playTone(freq, now + idx * 0.09, 0.22, 'triangle', this.volume * 0.7);
        });
    }

    // Natural 1 / Fumble
    playFailSound() {
        const now = this.audioContext.currentTime;
        this.playTone(311.13, now, 0.18, 'sawtooth', this.volume * 0.45);
        this.playTone(277.18, now + 0.14, 0.18, 'sawtooth', this.volume * 0.45);
        this.playTone(207.65, now + 0.28, 0.28, 'sawtooth', this.volume * 0.5);
    }

    playBlipSound() {
        this.playTone(720, this.audioContext.currentTime, 0.07, 'sine', this.volume * 0.35);
    }

    playClickSound() {
        this.playTone(580, this.audioContext.currentTime, 0.025, 'sine', this.volume * 0.3);
    }

    playFanfareSound() {
        const now = this.audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            this.playTone(freq, now + i * 0.13, 0.28, 'triangle', this.volume * 0.75);
        });
    }

    playSwordSound() {
        const now = this.audioContext.currentTime;
        this.playTone(920, now, 0.05, 'sawtooth', this.volume * 0.5);
        this.playTone(420, now + 0.04, 0.09, 'triangle', this.volume * 0.6);
        this.playTone(140, now + 0.08, 0.14, 'sine', this.volume * 0.7);
    }

    playSpellSound() {
        const now = this.audioContext.currentTime;
        const freqs = [587.33, 739.99, 880, 1174.66, 1479.98];
        freqs.forEach((f, idx) => {
            this.playTone(f, now + idx * 0.06, 0.22, 'sine', this.volume * 0.45);
        });
    }

    playFireballSound() {
        const now = this.audioContext.currentTime;
        this.playTone(220, now, 0.15, 'sawtooth', this.volume * 0.6);
        this.playTone(110, now + 0.1, 0.35, 'sawtooth', this.volume * 0.8);
        this.playTone(65, now + 0.2, 0.4, 'triangle', this.volume * 0.9);
    }

    playHealSound() {
        const now = this.audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
        notes.forEach((f, idx) => {
            this.playTone(f, now + idx * 0.07, 0.25, 'sine', this.volume * 0.5);
        });
    }

    playPotionSound() {
        const now = this.audioContext.currentTime;
        this.playTone(360, now, 0.06, 'sine', this.volume * 0.5);
        this.playTone(540, now + 0.07, 0.08, 'sine', this.volume * 0.5);
        this.playTone(760, now + 0.15, 0.14, 'triangle', this.volume * 0.55);
    }

    playGoldSound() {
        const now = this.audioContext.currentTime;
        this.playTone(1318.5, now, 0.08, 'sine', this.volume * 0.5);
        this.playTone(1567.98, now + 0.07, 0.12, 'sine', this.volume * 0.55);
        this.playTone(2093.0, now + 0.14, 0.16, 'sine', this.volume * 0.5);
    }

    playTrapSound() {
        const now = this.audioContext.currentTime;
        this.playTone(800, now, 0.04, 'square', this.volume * 0.6);
        this.playTone(190, now + 0.05, 0.25, 'sawtooth', this.volume * 0.7);
    }

    playCombatHornSound() {
        const now = this.audioContext.currentTime;
        this.playTone(146.83, now, 0.35, 'sawtooth', this.volume * 0.5); // D3
        this.playTone(220.0, now + 0.28, 0.45, 'sawtooth', this.volume * 0.6); // A3
    }

    playRestSound() {
        const now = this.audioContext.currentTime;
        const chord = [261.63, 329.63, 392.0, 523.25];
        chord.forEach((f) => {
            this.playTone(f, now, 0.65, 'sine', this.volume * 0.3);
        });
    }

    playTone(frequency, startTime, duration, type = 'sine', customGain = null) {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, startTime);

        const peakGain = customGain !== null ? customGain : this.volume * 0.3;
        gainNode.gain.setValueAtTime(peakGain, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    // === VOICE NARRATION (TTS) ===
    cleanTextForSpeech(text) {
        if (!text) return '';
        return String(text)
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/#+\s*/g, '')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    subscribeSpeechState(listener) {
        if (typeof listener !== 'function') return () => {};
        this.speechListeners.add(listener);
        listener({ isSpeaking: this.isSpeakingState, speakingId: this.currentSpeakingId });
        return () => this.speechListeners.delete(listener);
    }

    notifySpeechListeners(state) {
        this.speechListeners.forEach((fn) => {
            try { fn(state); } catch (e) { console.warn(e); }
        });
    }

    isSpeaking(id = null) {
        if (typeof window === 'undefined') return false;
        const synthSpeaking = 'speechSynthesis' in window && window.speechSynthesis.speaking;
        const voicePlaying = Boolean(this.currentVoiceAudio && !this.currentVoiceAudio.paused);
        const active = synthSpeaking || voicePlaying || this.isSpeakingState;
        if (!active) return false;
        if (id === null) return true;
        return (this.currentSpeakingId === id || this.currentVoiceId === id);
    }

    playVoice(keyOrPath, id = null, forcePlay = false) {
        if (!forcePlay && !this.narrationEnabled && !this.enabled) return false;
        if (typeof window === 'undefined') return false;

        const trackUrl = getVoiceTrack(keyOrPath) || keyOrPath;
        if (!trackUrl) return false;

        // Cancel any active Web Speech synthesis and prior voice audio
        if ('speechSynthesis' in window) {
            try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
        }
        this.stopVoice();

        try {
            const audio = new Audio(trackUrl);
            audio.volume = Math.max(0.1, Math.min(1, this.volume * 1.4));
            this.currentVoiceAudio = audio;
            this.currentVoiceId = id;
            this.currentSpeakingId = id;
            this.isSpeakingState = true;

            this.notifySpeechListeners({ isSpeaking: true, speakingId: id, voiceTrack: trackUrl });

            audio.onended = () => {
                if (this.currentVoiceAudio === audio) {
                    this.stopVoice();
                }
            };

            audio.onerror = (e) => {
                console.warn('Voice track playback error:', e);
                if (this.currentVoiceAudio === audio) {
                    this.stopVoice();
                }
            };

            const playPromise = audio.play();
            if (playPromise && playPromise.catch) {
                playPromise.catch((err) => {
                    console.warn('Voice track playback prevented by browser:', err);
                    if (this.currentVoiceAudio === audio) {
                        this.stopVoice();
                    }
                });
            }
            return true;
        } catch (e) {
            console.warn('Voice playback failed:', e);
            this.stopVoice();
            return false;
        }
    }

    stopVoice() {
        if (this.currentVoiceAudio) {
            try {
                this.currentVoiceAudio.pause();
                this.currentVoiceAudio.currentTime = 0;
            } catch {
                // ignore
            }
            this.currentVoiceAudio = null;
        }
        const wasSpeaking = this.currentVoiceId !== null || this.isSpeakingState;
        this.currentVoiceId = null;
        if (wasSpeaking) {
            this.isSpeakingState = false;
            this.currentSpeakingId = null;
            this.notifySpeechListeners({ isSpeaking: false, speakingId: null });
        }
    }

    toggleVoice(keyOrPath, id = null) {
        if (this.isSpeaking(id)) {
            this.stopVoice();
            this.stopSpeaking();
            return false;
        }
        return this.playVoice(keyOrPath, id, true);
    }

    speak(text, speakerType = 'dm', personality = 'Wise', forceSpeak = false, id = null) {
        if (!forceSpeak && !this.narrationEnabled) return false;
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;

        this.stopVoice();

        const cleaned = this.cleanTextForSpeech(text);
        if (!cleaned) return false;

        try {
            window.speechSynthesis.cancel();
            const UtteranceClass = (typeof window !== 'undefined' && window.SpeechSynthesisUtterance) || (typeof globalThis !== 'undefined' && globalThis.SpeechSynthesisUtterance);
            if (!UtteranceClass) return false;
            const utterance = new UtteranceClass(cleaned);
            this.currentSpeakingId = id;

            // Configure theatrical voice profile
            if (speakerType === 'dm') {
                utterance.pitch = 0.88;
                utterance.rate = 0.96;
            } else {
                const profiles = {
                    Cheerful: { pitch: 1.2, rate: 1.06 },
                    Stoic: { pitch: 0.82, rate: 0.92 },
                    Sarcastic: { pitch: 1.05, rate: 1.04 },
                    Wise: { pitch: 0.9, rate: 0.92 },
                    Impulsive: { pitch: 1.15, rate: 1.12 },
                    Cautious: { pitch: 1.02, rate: 0.95 },
                    Grumpy: { pitch: 0.78, rate: 0.94 },
                    Mischievous: { pitch: 1.22, rate: 1.08 }
                };
                const profile = profiles[personality] || { pitch: 1.0, rate: 1.0 };
                utterance.pitch = profile.pitch;
                utterance.rate = profile.rate;
            }

            utterance.volume = Math.max(0.2, Math.min(1, this.volume * 1.4));
            const voices = window.speechSynthesis.getVoices?.() || [];
            const preferredVoice = voices.find(
                (v) => v.lang.startsWith('en') && (v.name.includes('Daniel') || v.name.includes('Arthur') || v.name.includes('Google UK') || v.name.includes('Samantha'))
            ) || voices.find((v) => v.lang.startsWith('en'));

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            this.isSpeakingState = true;
            this.notifySpeechListeners({ isSpeaking: true, speakingId: id });

            utterance.onstart = () => {
                this.isSpeakingState = true;
                this.notifySpeechListeners({ isSpeaking: true, speakingId: this.currentSpeakingId });
            };
            utterance.onend = () => {
                this.isSpeakingState = false;
                this.currentSpeakingId = null;
                this.notifySpeechListeners({ isSpeaking: false, speakingId: null });
            };
            utterance.onerror = () => {
                this.isSpeakingState = false;
                this.currentSpeakingId = null;
                this.notifySpeechListeners({ isSpeaking: false, speakingId: null });
            };

            window.speechSynthesis.speak(utterance);
            return true;
        } catch (e) {
            console.warn('TTS narration failed:', e);
            this.isSpeakingState = false;
            this.currentSpeakingId = null;
            this.notifySpeechListeners({ isSpeaking: false, speakingId: null });
            return false;
        }
    }

    toggleSpeak(text, speakerType = 'dm', personality = 'Wise', id = null) {
        if (this.isSpeaking(id)) {
            this.stopSpeaking();
            return false;
        }
        return this.speak(text, speakerType, personality, true, id);
    }

    stopSpeaking() {
        this.stopVoice();
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel();
            } catch {
                // ignore
            }
        }
        this.isSpeakingState = false;
        this.currentSpeakingId = null;
        this.notifySpeechListeners({ isSpeaking: false, speakingId: null });
    }

    startAmbient(theme = 'dungeon') {
        this.currentAmbientTheme = theme;
    }

    stopAmbient() {
        this.ambientNodes.forEach((node) => {
            try {
                node.stop?.();
                node.disconnect?.();
            } catch {
                // ignore
            }
        });
        this.ambientNodes = [];
    }
}

export const soundService = new SoundService();
export default soundService;
