// Sound & Voice Narration Service for MythicBot D&D 5e Engine
// Provides procedural Web Audio API sound effects, ambient soundscapes,
// Web Speech API Text-to-Speech (TTS), and ElevenLabs Studio Voice Audio Playback.

import { VOICE_TRACKS, getVoiceTrack, resolveAssetUrl } from '../data/assets';

class SoundService {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.narrationEnabled = true;
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
            rest: { type: 'rest', duration: 0.8 },
            step: { type: 'step', duration: 0.12 },
            portal: { type: 'portal', duration: 0.45 }
        };
        this.ambientTimer = null;
        this.ambientListeners = new Set();
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
                case 'step':
                    this.playFootstepSound();
                    break;
                case 'portal':
                    this.playPortalSound();
                    break;
                default:
                    this.playClickSound();
            }
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }

    // Stone flagstone footstep thud
    playFootstepSound() {
        const now = this.audioContext.currentTime;
        const pitch = 85 + Math.random() * 25;
        this.playTone(pitch, now, 0.065, 'triangle', this.volume * 0.45);
        this.playTone(pitch * 2.1, now + 0.015, 0.035, 'sine', this.volume * 0.2);
    }

    // Stone archway portal transition
    playPortalSound() {
        const now = this.audioContext.currentTime;
        this.playTone(196.0, now, 0.22, 'sine', this.volume * 0.4);
        this.playTone(293.66, now + 0.08, 0.28, 'triangle', this.volume * 0.45);
        this.playTone(392.0, now + 0.16, 0.32, 'sine', this.volume * 0.4);
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
        const voicePlaying = Boolean(this.currentVoiceAudio && !this.currentVoiceAudio.paused);
        const active = voicePlaying || this.isSpeakingState;
        if (!active) return false;
        if (id === null) return true;
        return (this.currentSpeakingId === id || this.currentVoiceId === id);
    }

    playVoice(keyOrPath, id = null, forcePlay = false) {
        if (typeof window === 'undefined') return false;
        if (!this.enabled && !forcePlay) return false;
        if (this.narrationEnabled === false && !forcePlay) return false;

        const trackUrl = getVoiceTrack(keyOrPath) || (
            typeof keyOrPath === 'string' && (keyOrPath.startsWith('/') || keyOrPath.startsWith('audio/'))
                ? resolveAssetUrl(keyOrPath)
                : null
        );
        if (!trackUrl) return false;

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
                console.warn('ElevenLabs voice track playback error:', e);
                if (this.currentVoiceAudio === audio) {
                    this.stopVoice();
                }
            };

            const playPromise = audio.play();
            if (playPromise && playPromise.catch) {
                playPromise.catch((err) => {
                    console.warn('ElevenLabs voice track playback prevented by browser audio policy:', err);
                    if (this.currentVoiceAudio === audio) {
                        this.stopVoice();
                    }
                });
            }
            return true;
        } catch (e) {
            console.warn('ElevenLabs voice playback failed:', e);
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
            return false;
        }
        return this.playVoice(keyOrPath, id, true);
    }

    // Robotic browser Web Speech API (speechSynthesis) is removed.
    // Kept as safe no-op for backward compatibility.
    speak() {
        return false;
    }

    toggleSpeak() {
        return false;
    }

    stopSpeaking() {
        this.stopVoice();
    }

    subscribeAmbientState(listener) {
        if (typeof listener !== 'function') return () => {};
        this.ambientListeners.add(listener);
        listener({ ambientEnabled: this.ambientEnabled, theme: this.currentAmbientTheme });
        return () => this.ambientListeners.delete(listener);
    }

    notifyAmbientListeners() {
        this.ambientListeners.forEach((fn) => {
            try {
                fn({ ambientEnabled: this.ambientEnabled, theme: this.currentAmbientTheme });
            } catch (e) {
                console.warn(e);
            }
        });
    }

    toggleAmbient(theme = 'dungeon') {
        if (this.ambientEnabled) {
            this.stopAmbient();
            return false;
        }
        return this.startAmbient(theme);
    }

    startAmbient(theme = 'dungeon') {
        this.currentAmbientTheme = theme || 'dungeon';
        if (!this.enabled) return false;
        if (!this.audioContext) {
            this.init();
        }
        if (!this.audioContext) return false;

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }

        // Clear any existing ambient nodes before building new theme graph
        this.stopAmbient(true);
        this.ambientEnabled = true;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            // Theme acoustic profiles (sub-bass root frequency, filter cutoff, drip/crackle rate)
            const themeProfiles = {
                dungeon: { rootFreq: 55.0, fifthFreq: 82.41, filterCutoff: 240, dripChance: 0.45, crackleChance: 0.65 },
                cavern: { rootFreq: 48.99, fifthFreq: 73.42, filterCutoff: 210, dripChance: 0.75, crackleChance: 0.35 },
                volcano: { rootFreq: 41.2, fifthFreq: 61.74, filterCutoff: 320, dripChance: 0.2, crackleChance: 0.9 },
                crypt: { rootFreq: 51.91, fifthFreq: 77.78, filterCutoff: 190, dripChance: 0.5, crackleChance: 0.4 },
                manor: { rootFreq: 58.27, fifthFreq: 87.31, filterCutoff: 260, dripChance: 0.35, crackleChance: 0.6 },
                city: { rootFreq: 65.41, fifthFreq: 98.0, filterCutoff: 310, dripChance: 0.3, crackleChance: 0.5 },
                temple: { rootFreq: 61.74, fifthFreq: 92.5, filterCutoff: 280, dripChance: 0.4, crackleChance: 0.55 },
                forest: { rootFreq: 73.42, fifthFreq: 110.0, filterCutoff: 380, dripChance: 0.35, crackleChance: 0.5 },
                town: { rootFreq: 65.41, fifthFreq: 98.0, filterCutoff: 340, dripChance: 0.2, crackleChance: 0.6 }
            };
            const profile = themeProfiles[this.currentAmbientTheme] || themeProfiles.dungeon;

            // 1. Sub-bass dungeon resonant drone (two detuned oscillators + LFO)
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.001, now);
            if (masterGain.gain.linearRampToValueAtTime) {
                masterGain.gain.linearRampToValueAtTime(this.volume * 0.14, now + 1.2);
            } else {
                masterGain.gain.setValueAtTime(this.volume * 0.14, now);
            }
            masterGain.connect(ctx.destination);

            const lowpass = ctx.createBiquadFilter ? ctx.createBiquadFilter() : null;
            if (lowpass) {
                lowpass.type = 'lowpass';
                lowpass.frequency.setValueAtTime(profile.filterCutoff, now);
                lowpass.connect(masterGain);
            }
            const targetNode = lowpass || masterGain;

            const osc1 = ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(profile.rootFreq, now);
            osc1.connect(targetNode);
            osc1.start(now);

            const osc2 = ctx.createOscillator();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(profile.fifthFreq, now);
            const osc2Gain = ctx.createGain();
            osc2Gain.gain.setValueAtTime(0.35, now);
            osc2.connect(osc2Gain);
            osc2Gain.connect(targetNode);
            osc2.start(now);

            // 2. Filtered Brown Noise Wind / Torch Draft Buffer (if createBuffer is supported)
            let noiseSource = null;
            if (ctx.createBuffer && ctx.createBufferSource) {
                const bufferSize = ctx.sampleRate * 2;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                let lastOut = 0.0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + 0.02 * white) / 1.02;
                    lastOut = data[i];
                    data[i] *= 0.35;
                }
                noiseSource = ctx.createBufferSource();
                noiseSource.buffer = buffer;
                noiseSource.loop = true;
                const noiseGain = ctx.createGain();
                noiseGain.gain.setValueAtTime(0.25, now);
                noiseSource.connect(noiseGain);
                noiseGain.connect(targetNode);
                noiseSource.start(now);
            }

            this.ambientNodes = [osc1, osc2, osc2Gain, lowpass, masterGain, noiseSource].filter(Boolean);

            // 3. Periodic procedural cavern water droplets & torch ember crackles
            this.ambientTimer = setInterval(() => {
                if (!this.enabled || !this.ambientEnabled || !this.audioContext) return;
                const t = this.audioContext.currentTime;
                if (Math.random() < profile.dripChance) {
                    // Resonant cavern water droplet
                    const dripFreq = 900 + Math.random() * 700;
                    this.playTone(dripFreq, t, 0.09, 'sine', this.volume * 0.08);
                    this.playTone(dripFreq * 1.35, t + 0.03, 0.07, 'sine', this.volume * 0.05);
                }
                if (Math.random() < profile.crackleChance) {
                    // Torch sconce ember pop
                    const popFreq = 140 + Math.random() * 220;
                    this.playTone(popFreq, t + 0.12, 0.03, 'triangle', this.volume * 0.06);
                }
            }, 2400);

            this.notifyAmbientListeners();
            return true;
        } catch (e) {
            console.warn('Error starting procedural dungeon ambience:', e);
            return false;
        }
    }

    stopAmbient(silentNotify = false) {
        if (this.ambientTimer) {
            clearInterval(this.ambientTimer);
            this.ambientTimer = null;
        }
        this.ambientNodes.forEach((node) => {
            try {
                node.stop?.();
                node.disconnect?.();
            } catch {
                // ignore
            }
        });
        this.ambientNodes = [];
        this.ambientEnabled = false;
        if (!silentNotify) {
            this.notifyAmbientListeners();
        }
    }
}

export const soundService = new SoundService();
export default soundService;
