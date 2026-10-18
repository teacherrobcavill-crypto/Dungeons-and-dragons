import { useState, useRef, useEffect, useCallback } from 'react';
import { useDice } from '../../hooks/useDice';
import Button from '../common/Button';
import { RollResult } from './AnimatedDice';
import soundService from '../../services/soundService';
import LoreText from '../common/LoreText';
import MagicalRevealText from '../common/MagicalRevealText';
import { getSceneImage, getRaceImage } from '../../data/assets';

const getRaceEmoji = (race) => {
    const raceEmojis = {
        human: '👤',
        elf: '🧝',
        dwarf: '⛏️',
        halfling: '🍀',
        tiefling: '😈',
        dragonborn: '🐉',
        gnome: '🔧',
        'half-elf': '🌿',
        'half-orc': '💪'
    };
    return raceEmojis[race] || '👤';
};

const getPersonalityColor = (personality) => {
    const colors = {
        Cheerful: 'from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-900/30 dark:to-orange-900/30 dark:border-yellow-700',
        Stoic: 'from-slate-50 to-gray-100 border-slate-200 dark:from-slate-800 dark:to-gray-800 dark:border-slate-600',
        Sarcastic: 'from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900/30 dark:to-pink-900/30 dark:border-purple-700',
        Wise: 'from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-700',
        Impulsive: 'from-red-50 to-orange-50 border-red-200 dark:from-red-900/30 dark:to-orange-900/30 dark:border-red-700',
        Cautious: 'from-green-50 to-teal-50 border-green-200 dark:from-green-900/30 dark:to-teal-900/30 dark:border-green-700',
        Grumpy: 'from-gray-100 to-slate-100 border-gray-300 dark:from-gray-800 dark:to-slate-800 dark:border-gray-600',
        Mischievous: 'from-pink-50 to-purple-50 border-pink-200 dark:from-pink-900/30 dark:to-purple-900/30 dark:border-pink-700'
    };
    return colors[personality] || 'from-gray-50 to-gray-100 border-gray-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600';
};

const getCompanionAbilities = (companion) => {
    if (companion.abilities) return companion.abilities;
    if (companion.specialAbility) return companion.specialAbility;
    if (companion.signatureMove) return companion.signatureMove;
    const cls = (companion.companionClass || companion.class || '').toLowerCase();
    const defaultAbilities = {
        cleric: 'Healing Word • Sacred Flame',
        wizard: 'Fire Bolt • Evocation',
        paladin: 'Divine Smite • Lay on Hands',
        rogue: 'Sneak Attack • Cunning Action',
        ranger: 'Hunter\'s Mark • Longbow',
        barbarian: 'Rage • Reckless Attack',
        fighter: 'Second Wind • Action Surge',
        bard: 'Bardic Inspiration • Vicious Mockery',
        druid: 'Wild Shape • Entangle',
        sorcerer: 'Chromatic Orb • Metamagic',
        warlock: 'Eldritch Blast • Hex',
        monk: 'Flurry of Blows • Martial Arts'
    };
    return defaultAbilities[cls] || 'Tactical Strike';
};

export default function ChatInterface({
    messages,
    onSendMessage,
    isLoading,
    animationsEnabled = true,
    pendingRoll,
    onManualRoll,
    currentNode = null,
    searchedNodes = [],
    lootedNodes = [],
    defeatedNodes = [],
    completedChoices = [],
    inCombat = false,
    onSelectChoice,
    onTriggerEncounter,
    onLootRoom,
    onOpenVictoryModal,
    isReaderMode = false,
    onToggleReaderMode,
    readerFontSize = 'normal',
    readerTheme = 'dark'
}) {
    const [input, setInput] = useState('');
    const [messageFilter, setMessageFilter] = useState('all');
    const [isChoicesExpanded, setIsChoicesExpanded] = useState(true);
    const [showQuickPrompts, setShowQuickPrompts] = useState(false);
    const [speakingId, setSpeakingId] = useState(null);
    const messagesEndRef = useRef(null);
    const { rollDie, formatRollMessage } = useDice();

    useEffect(() => {
        const unsubscribe = soundService.subscribeSpeechState?.((speechState) => {
            setSpeakingId(speechState.isSpeaking ? speechState.speakingId : null);
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleToggleNarrate = (id, text, speakerType = 'dm', personality = 'Wise', voiceTrack = null) => {
        if (voiceTrack) {
            soundService.toggleVoice?.(voiceTrack, id);
        } else {
            soundService.toggleSpeak?.(text, speakerType, personality, id);
        }
    };

    const handleQuickRoll = () => {
        const result = rollDie(20);
        if (pendingRoll && onManualRoll) {
            onManualRoll(result);
        } else {
            const rollText = formatRollMessage(result);
            onSendMessage(rollText);
        }
    };

    const scrollToBottom = useCallback(() => {
        // Disabled general jump-to-bottom so the player reads down naturally without skipping upcoming story
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const quickActions = [
        'Look around',
        'Search for secret doors & traps',
        'Talk to companion',
        'Check surroundings (Perception)'
    ];

    const filteredMessages = messages.filter((message) => {
        if (messageFilter === 'all') return true;
        if (messageFilter === 'rolls') return Boolean(message.roll);
        if (messageFilter === 'companions') return message.type === 'companion' || Array.isArray(message.companionMessages);
        return message.type === messageFilter;
    });

    const latestBubbleRef = useRef(null);

    // Auto-scroll to each new bubble as it arrives so the player never has to manually move the mouse or scroll
    useEffect(() => {
        if (filteredMessages.length > 0 && latestBubbleRef.current) {
            latestBubbleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [filteredMessages.length]);

    const isNodeSearched = currentNode && searchedNodes.includes(currentNode.id);
    const isNodeLooted = currentNode && lootedNodes.includes(currentNode.id);
    const isNodeDefeated = currentNode && defeatedNodes.includes(currentNode.id);
    const hasActiveEncounter = currentNode?.encounter && !isNodeDefeated && !inCombat;
    const hasUnclaimedLoot = currentNode?.loot && !isNodeLooted && (!currentNode.encounter || isNodeDefeated);

    const isBossChamber = Boolean(
        currentNode?.type === 'boss' ||
        ['black_spider_sanctum', 'voranthos_caldera', 'ritual_ossuary', 'shadow_sanctum', 'throne_sleeping_god'].includes(currentNode?.id)
    );
    const isBossDefeated = isBossChamber && (isNodeDefeated || !currentNode?.encounter);

    const isChoiceCompleted = (choice) => {
        const key = `${currentNode?.id || 'node'}:${choice.id || choice.label}`;
        return (completedChoices || []).includes(key);
    };

    const visibleChoices = (currentNode?.choices || []).filter(
        (c) => (!c.hiddenUntilSearched || isNodeSearched) && !isChoiceCompleted(c)
    );

    // Dynamic reader theme classes
    const getReaderThemeStyles = () => {
        if (!isReaderMode) return 'bg-white dark:bg-slate-900';
        switch (readerTheme) {
            case 'parchment':
                return 'bg-[#fcf7ee] text-[#2c221e]';
            case 'midnight':
                return 'bg-[#070b16] text-[#e2e8f0]';
            case 'dark':
            default:
                return 'bg-slate-950 text-gray-100';
        }
    };

    const getReaderFontClass = () => {
        if (!isReaderMode) return 'text-sm sm:text-base leading-relaxed';
        switch (readerFontSize) {
            case 'huge':
                return 'text-lg sm:text-2xl leading-loose font-normal';
            case 'large':
                return 'text-base sm:text-xl leading-loose font-normal';
            case 'normal':
            default:
                return 'text-base sm:text-lg leading-relaxed';
        }
    };

    return (
        <div className={`flex flex-col h-full relative transition-colors duration-300 ${getReaderThemeStyles()}`}>
            {/* Top Filter Bar (Hidden in Reader Mode to maximize story space) */}
            {!isReaderMode && (
                <div className="px-3 sm:px-4 pt-2.5 pb-1 flex items-center justify-between gap-2 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Chat filters">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'combat', label: '⚔️ Skirmish' },
                            { id: 'ai', label: 'DM' },
                            { id: 'user', label: 'Player' },
                            { id: 'companions', label: 'Companions' },
                            { id: 'rolls', label: 'Rolls' }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setMessageFilter(filter.id)}
                                className={`px-2.5 py-1 text-[11px] rounded-full whitespace-nowrap transition-colors ${
                                    messageFilter === filter.id
                                        ? 'bg-primary-500 text-white font-semibold'
                                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Quick switch into Reader Mode */}
                    {onToggleReaderMode && (
                        <button
                            type="button"
                            onClick={onToggleReaderMode}
                            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0"
                            title="Hide buttons and focus on reading"
                        >
                            <span>📖</span>
                            <span className="hidden sm:inline">Focus Story</span>
                        </button>
                    )}
                </div>
            )}

            {/* Narrative Log */}
            {/* Narrative Chronicle Log - Edge-to-Edge Immersive Book Layout */}
            <div className={`flex-1 overflow-y-auto w-full px-2.5 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4 ${isReaderMode ? 'pt-10 sm:pt-12' : ''}`}>
                {filteredMessages.length === 0 && (
                    <div className="text-center py-16 px-4 text-gray-400 dark:text-gray-500 w-full">
                        <div className="text-5xl mb-3">📜</div>
                        <h3 className="font-display font-bold text-base text-gray-700 dark:text-gray-300">Your Chronicle Begins</h3>
                        <p className="text-xs sm:text-sm mt-1 max-w-md mx-auto text-gray-500 dark:text-gray-400">
                            The pages lie open before you. Choose a path, roll for perception, or take action to embark.
                        </p>
                    </div>
                )}

                {filteredMessages.map((message, index) => {
                    const isLatest = index === filteredMessages.length - 1;
                    return (
                        <div
                            key={index}
                            ref={isLatest ? latestBubbleRef : null}
                            className="w-full space-y-2.5 scroll-mb-10 scroll-mt-6"
                        >
                        {/* Player Action - Full Width Heroic Banner */}
                        {message.type === 'user' && (
                            <div className="w-full animate-fade-in">
                                <div className="w-full px-3.5 sm:px-5 py-3 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-500 dark:border-amber-400 text-gray-900 dark:text-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-amber-500/20 text-xs">
                                        <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 tracking-wider uppercase text-[11px]">
                                            <span>⚔️</span>
                                            <span>Your Action</span>
                                        </div>
                                        <span className="text-[10px] opacity-50 font-mono">
                                            {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className={`whitespace-pre-line ${getReaderFontClass()} font-medium leading-relaxed`}>
                                        <LoreText text={message.text} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Combat Chronicle Action Card - In Main Story Body with Real-Time Magical Reveal */}
                        {message.type === 'combat' && (
                            <div className="w-full animate-fade-in">
                                <div className={`w-full rounded-2xl p-4 sm:p-5 transition-all shadow-md border-l-4 ${
                                    message.subtype === 'fatal_blow'
                                        ? 'bg-emerald-950/40 dark:bg-emerald-950/60 border-l-emerald-500 border border-emerald-500/30 text-emerald-100 shadow-emerald-900/20'
                                        : message.subtype === 'spell' || message.subtype === 'monster_spell'
                                            ? 'bg-purple-950/40 dark:bg-purple-950/60 border-l-purple-500 border border-purple-500/30 text-purple-100 shadow-purple-900/20'
                                            : message.subtype === 'monster_hit'
                                                ? 'bg-rose-950/40 dark:bg-rose-950/60 border-l-rose-500 border border-rose-500/30 text-rose-100 shadow-rose-900/20'
                                                : message.subtype === 'companion_attack' || message.subtype === 'companion_heal'
                                                    ? 'bg-indigo-950/40 dark:bg-indigo-950/60 border-l-indigo-500 border border-indigo-500/30 text-indigo-100 shadow-indigo-900/20'
                                                    : message.subtype === 'victory' || message.subtype === 'skirmish_victory'
                                                        ? 'bg-amber-950/50 dark:bg-amber-950/70 border-l-amber-400 border border-amber-400/40 text-amber-100 shadow-amber-900/20'
                                                        : 'bg-amber-950/30 dark:bg-slate-800/90 border-l-amber-500 border border-amber-500/30 text-amber-100 shadow-slate-900/20'
                                }`}>
                                    {/* Header bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10 text-xs">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                message.subtype === 'fatal_blow'
                                                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                                                    : message.subtype === 'spell' || message.subtype === 'monster_spell'
                                                        ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40'
                                                        : message.subtype === 'monster_hit'
                                                            ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                                                            : message.subtype === 'companion_attack' || message.subtype === 'companion_heal'
                                                                ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40'
                                                                : message.subtype === 'victory' || message.subtype === 'skirmish_victory'
                                                                    ? 'bg-amber-500/40 text-amber-200 border border-amber-400/60'
                                                                    : 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                                            }`}>
                                                {message.subtype === 'fatal_blow' ? '💀 Fatal Blow' :
                                                 message.subtype === 'spell' || message.subtype === 'monster_spell' ? '🔮 Spell Cast' :
                                                 message.subtype === 'monster_hit' ? '🩸 Enemy Strike' :
                                                 message.subtype === 'companion_attack' || message.subtype === 'companion_heal' ? '🛡️ Companion Action' :
                                                 message.subtype === 'victory' || message.subtype === 'skirmish_victory' ? '🏆 Victory' :
                                                 message.subtype === 'skirmish_start' ? '⚔️ Battle Joined' :
                                                 '⚔️ Hero Action'}
                                            </span>
                                            <span className="font-bold text-gray-100 text-xs sm:text-sm">
                                                {message.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {message.rollText && (
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/40 text-gray-300 border border-white/10">
                                                    {message.rollText}
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleToggleNarrate(`msg-${index}`, message.text, 'dm', 'Stoic', message.voiceTrack)}
                                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                                                    speakingId === `msg-${index}`
                                                        ? 'bg-amber-500/30 text-amber-200 border border-amber-500/60 animate-pulse font-bold'
                                                        : 'bg-black/20 hover:bg-black/30 text-amber-300'
                                                }`}
                                                title={speakingId === `msg-${index}` ? 'Mute narration' : (message.voiceTrack ? 'Play high-immersion voice track' : 'Read skirmish action aloud (TTS)')}
                                            >
                                                <span>{speakingId === `msg-${index}` ? '🔇' : (message.voiceTrack ? '🎙️' : '🔊')}</span>
                                                <span>{speakingId === `msg-${index}` ? 'Mute' : (message.voiceTrack ? 'Voice' : 'Narrate')}</span>
                                            </button>
                                            <span className="text-[10px] opacity-40 font-mono">
                                                {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dedicated Spell Impact & Condition Callout */}
                                    {message.effect && (
                                        <div className="my-2 p-2.5 rounded-xl bg-purple-900/30 border border-purple-400/40 text-purple-200 text-xs flex items-start gap-2 animate-fade-in">
                                            <span className="text-base animate-pulse">⚡</span>
                                            <div>
                                                <strong className="text-amber-300 uppercase tracking-wide mr-1.5">
                                                    Condition Impact:
                                                </strong>
                                                <span>{message.effect}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Prose with Magical Reveal Real-Time Animation */}
                                    <div className={`whitespace-pre-line ${getReaderFontClass()} font-normal leading-relaxed text-gray-100 pt-0.5`}>
                                        <MagicalRevealText
                                            text={message.text}
                                            isNew={message.isNew !== false}
                                            speed={200}
                                            autoScroll={true}
                                            className="leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dungeon Master / Story Chapter - Full Width Illuminated Chronicle */}
                        {message.type === 'ai' && (
                            <div className="w-full animate-fade-in">
                                <div className={`w-full rounded-2xl p-4 sm:p-6 transition-all shadow-sm ${
                                    isReaderMode
                                        ? readerTheme === 'parchment'
                                            ? 'bg-[#f4ecdb] border-l-4 border-amber-700 text-[#2b2118] shadow-md'
                                            : readerTheme === 'midnight'
                                                ? 'bg-[#0d1326] border-l-4 border-cyan-500 text-slate-100 shadow-md'
                                                : 'bg-slate-900 border-l-4 border-amber-500 text-gray-100 shadow-md'
                                        : 'bg-white dark:bg-slate-800/90 border border-gray-200/70 dark:border-slate-700/80 border-l-4 border-l-primary-500 dark:border-l-primary-400 text-gray-900 dark:text-gray-100'
                                }`}>
                                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-slate-700/60 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">📜</span>
                                            <span className="font-bold tracking-wide uppercase text-primary-600 dark:text-primary-400 text-[11px] sm:text-xs">
                                                {message.speaker || 'The Dungeon Master'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleNarrate(`msg-${index}`, message.text, 'dm', 'Wise', message.voiceTrack)}
                                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                                                    speakingId === `msg-${index}`
                                                        ? 'bg-amber-500/25 text-amber-900 dark:text-amber-200 border border-amber-500/60 animate-pulse font-bold'
                                                        : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-amber-700 dark:text-amber-300'
                                                }`}
                                                title={speakingId === `msg-${index}` ? 'Mute narration' : (message.voiceTrack ? 'Play ElevenLabs Studio voice track' : 'Read passage aloud (TTS)')}
                                            >
                                                <span>{speakingId === `msg-${index}` ? '🔇' : (message.voiceTrack ? '🎙️' : '🔊')}</span>
                                                <span>{speakingId === `msg-${index}` ? 'Mute' : (message.voiceTrack ? 'Voice' : 'Narrate')}</span>
                                            </button>
                                            <span className="text-[10px] opacity-40 font-mono">
                                                {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                    {message.image && (
                                        <div className="mb-3 rounded-xl overflow-hidden border border-amber-300/40 dark:border-slate-700 shadow-sm max-h-64 sm:max-h-80">
                                            <img
                                                src={message.image}
                                                alt={message.speaker || 'Scene illustration'}
                                                className="w-full h-full object-cover object-center"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div className={`whitespace-pre-line ${getReaderFontClass()} font-normal leading-relaxed`}>
                                        <LoreText text={message.text} fontClass={getReaderFontClass()} />
                                    </div>
                                    {message.roll && (
                                        <div className="mt-3 pt-3 border-t border-gray-200/60 dark:border-slate-600">
                                            <RollResult
                                                value={message.roll}
                                                sides={20}
                                                label="d20 Roll Result"
                                                animate={message.animateRoll !== false}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Companion Dialogue - Compact Class & Abilities Layout */}
                        {message.type === 'ai' && message.companionMessages && message.companionMessages.length > 0 && (
                            <div className="w-full space-y-1.5 mt-2">
                                {message.companionMessages.map((companion, cIndex) => {
                                    const compId = `comp-${index}-${cIndex}`;
                                    const isCompSpeaking = speakingId === compId;
                                    const compRaceImg = getRaceImage(companion.companionRace);
                                    return (
                                        <div
                                            key={cIndex}
                                            className="w-full animate-fade-in"
                                            style={{ animationDelay: `${(cIndex + 1) * 120}ms` }}
                                        >
                                            <div className="w-full px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl border border-l-4 border-l-amber-500 dark:border-l-amber-400 border-gray-200/70 dark:border-slate-700/70 bg-amber-50/40 dark:bg-slate-800/60 shadow-xs">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                                                        {compRaceImg ? (
                                                            <img
                                                                src={compRaceImg}
                                                                alt={companion.companionRace || 'Companion'}
                                                                className="w-5 h-5 rounded-md object-cover border border-amber-400/40 shrink-0"
                                                            />
                                                        ) : (
                                                            <span className="text-sm">{getRaceEmoji(companion.companionRace)}</span>
                                                        )}
                                                        <span className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                                                            {companion.companionName}
                                                        </span>
                                                        <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold capitalize">
                                                            • {companion.companionClass}
                                                        </span>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-medium border border-amber-500/30 truncate max-w-[220px]">
                                                            ⚡ {getCompanionAbilities(companion)}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleNarrate(compId, companion.text, 'companion', companion.personality, companion.voiceTrack)}
                                                        className={`text-xs p-1 rounded-md transition-all shrink-0 cursor-pointer ${
                                                            isCompSpeaking
                                                                ? 'bg-amber-500/25 text-amber-800 dark:text-amber-200 opacity-100 animate-pulse font-bold'
                                                                : 'opacity-50 hover:opacity-100 text-gray-600 dark:text-gray-300'
                                                        }`}
                                                        title={isCompSpeaking ? 'Mute companion voice' : (companion.voiceTrack ? 'Play companion voice track' : 'Speak companion line')}
                                                    >
                                                        <span>{isCompSpeaking ? '🔇' : (companion.voiceTrack ? '🎙️' : '🔊')}</span>
                                                    </button>
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 italic leading-snug pl-0.5">
                                                    &ldquo;<LoreText text={companion.text} />&rdquo;
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Standalone Companion Dialogue - Compact Class & Abilities Layout */}
                        {message.type === 'companion' && (() => {
                            const compMsgId = `comp-msg-${index}`;
                            const isCompMsgSpeaking = speakingId === compMsgId;
                            return (
                                <div className="w-full animate-fade-in">
                                    <div className="w-full px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl border border-l-4 border-l-amber-500 dark:border-l-amber-400 border-gray-200/70 dark:border-slate-700/70 bg-amber-50/40 dark:bg-slate-800/60 shadow-xs">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                                                <span className="text-sm">{getRaceEmoji(message.companionRace)}</span>
                                                <span className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                                                    {message.companionName}
                                                </span>
                                                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold capitalize">
                                                    • {message.companionClass}
                                                </span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-medium border border-amber-500/30 truncate max-w-[220px]">
                                                    ⚡ {getCompanionAbilities(message)}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleNarrate(compMsgId, message.text, 'companion', message.personality, message.voiceTrack)}
                                                className={`text-xs p-1 rounded-md transition-all shrink-0 cursor-pointer ${
                                                    isCompMsgSpeaking
                                                        ? 'bg-amber-500/25 text-amber-800 dark:text-amber-200 opacity-100 animate-pulse font-bold'
                                                        : 'opacity-50 hover:opacity-100 text-gray-600 dark:text-gray-300'
                                                }`}
                                                title={isCompMsgSpeaking ? 'Mute companion voice' : (message.voiceTrack ? 'Play companion voice track' : 'Speak companion line')}
                                            >
                                                <span>{isCompMsgSpeaking ? '🔇' : (message.voiceTrack ? '🎙️' : '🔊')}</span>
                                            </button>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 italic leading-snug pl-0.5">
                                            &ldquo;<LoreText text={message.text} />&rdquo;
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                        </div>
                    );
                })}

                {/* Loading / Writing State - Full Width */}
                {isLoading && (
                    <div className="w-full animate-fade-in">
                        <div className="w-full px-4 py-3 rounded-xl bg-gray-100/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 flex items-center gap-3">
                            <span className="text-xl animate-pulse">📜</span>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                <span>The Dungeon Master writes the next chapter...</span>
                                <span className="flex gap-1 ml-1">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* In-Line Adventure Actions & Next Steps (Integrated directly into the story flow) */}
                {!inCombat && (
                    <div className="w-full mt-6 pt-4 border-t-2 border-dashed border-amber-300/50 dark:border-slate-700/80 space-y-4 animate-fade-in">
                        {/* Pending Roll Callout */}
                        {pendingRoll && (
                            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-2 border-amber-500 dark:border-amber-400 shadow-lg text-center space-y-2.5 animate-pulse-glow">
                                <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                                    <span className="text-xl animate-bounce">🎲</span>
                                    <span>Roll Required: {pendingRoll.ability?.toUpperCase() || 'Ability'} Check (DC {pendingRoll.dc})</span>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300">
                                    The Dungeon Master awaits your fate roll.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleQuickRoll}
                                    disabled={isLoading}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                                >
                                    <span>🎲 Roll d20</span>
                                    <span>(Target DC {pendingRoll.dc})</span>
                                </button>
                            </div>
                        )}

                        {/* Room Paths & Tactical Exits */}
                        {currentNode && (() => {
                            const sceneArt = getSceneImage(currentNode.id) || currentNode.image;
                            return (
                                <div className="w-full rounded-2xl overflow-hidden bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200/60 dark:border-slate-700/70 shadow-sm space-y-0">
                                    {sceneArt && (
                                        <div className="relative w-full h-36 sm:h-48 overflow-hidden group border-b border-amber-200/60 dark:border-slate-700">
                                            <img
                                                src={sceneArt}
                                                alt={currentNode.title}
                                                className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex items-end justify-between p-3.5">
                                                <span className="text-xs font-semibold text-amber-200 tracking-wide uppercase px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-amber-500/30">
                                                    📍 {currentNode.environment || 'Dungeon Chamber'}
                                                </span>
                                                <span className="text-[11px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-amber-500/20">
                                                    Act {currentNode.act || 1}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-3.5 sm:p-4 space-y-3">
                                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-amber-200/40 dark:border-slate-700/50">
                                            <button
                                                type="button"
                                                onClick={() => setIsChoicesExpanded(!isChoicesExpanded)}
                                                className="flex items-center gap-2 font-display font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-300 tracking-wide uppercase hover:opacity-80 transition-opacity cursor-pointer text-left"
                                                title={isChoicesExpanded ? 'Hide actions and paths' : 'Show actions and paths'}
                                            >
                                                <span>🧭</span>
                                                <span className="truncate max-w-[150px] sm:max-w-none">{currentNode.title}</span>
                                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-slate-700 text-amber-900 dark:text-amber-200 font-bold ml-1 shrink-0">
                                                    {isChoicesExpanded ? '▲ Hide Actions' : `▼ Show Actions (${visibleChoices.length})`}
                                                </span>
                                            </button>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                {isReaderMode && onToggleReaderMode && (
                                                    <button
                                                        type="button"
                                                        onClick={onToggleReaderMode}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                                                        title="Exit Story Mode back to Tabletop UI"
                                                    >
                                                        ✕ Normal View
                                                    </button>
                                                )}
                                                {hasActiveEncounter && onTriggerEncounter && (
                                                    <button
                                                        type="button"
                                                        onClick={() => onTriggerEncounter(currentNode.encounter)}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm animate-pulse flex items-center gap-1 cursor-pointer"
                                                    >
                                                        ⚔️ Engage
                                                    </button>
                                                )}
                                                {hasUnclaimedLoot && onLootRoom && (
                                                    <button
                                                        type="button"
                                                        onClick={() => onLootRoom(currentNode)}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        💰 Loot
                                                    </button>
                                                )}
                                                {isBossChamber && isBossDefeated && onOpenVictoryModal && (
                                                    <button
                                                        type="button"
                                                        onClick={onOpenVictoryModal}
                                                        className="px-3 py-1 rounded-lg text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md flex items-center gap-1.5 cursor-pointer animate-pulse-glow"
                                                        title="View campaign victory summary and epilogue"
                                                    >
                                                        <span>🏆</span>
                                                        <span>Campaign Victory</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Available Choice Buttons - Collapsible */}
                                        {isChoicesExpanded && (
                                            <>
                                                {visibleChoices.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2 pt-1 animate-fade-in">
                                                        {isBossChamber && isBossDefeated && onOpenVictoryModal && (
                                                            <button
                                                                type="button"
                                                                onClick={onOpenVictoryModal}
                                                                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 border border-amber-400 shadow-md flex items-center gap-2 cursor-pointer animate-pulse-glow w-full sm:w-auto justify-center"
                                                            >
                                                                <span className="text-base">🏆</span>
                                                                <span>View Campaign Victory & Epilogue</span>
                                                            </button>
                                                        )}
                                                        {visibleChoices.map((choice) => {
                                                            const isSkill = choice.type === 'skillCheck' || choice.dc;
                                                            const isMove = choice.type === 'move' || Boolean(choice.targetNodeId && !choice.dc);
                                                            return (
                                                                <button
                                                                    key={choice.id || choice.label}
                                                                    type="button"
                                                                    disabled={isLoading}
                                                                    onClick={() => onSelectChoice && onSelectChoice(choice)}
                                                                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer ${
                                                                        isSkill
                                                                            ? 'bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200'
                                                                            : isMove
                                                                                ? 'bg-amber-100/90 dark:bg-slate-700 hover:bg-amber-200 dark:hover:bg-slate-600 border-amber-300 dark:border-slate-500 text-amber-950 dark:text-amber-100'
                                                                                : 'bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                                                                    }`}
                                                                >
                                                                    <span className="text-base">
                                                                        {isSkill ? '🎲' : choice.type === 'rest' ? '⛺' : choice.type === 'social' ? '💬' : '🚪'}
                                                                    </span>
                                                                    <span>{choice.label}</span>
                                                                    {choice.dc && (
                                                                        <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold uppercase">
                                                                            {choice.skill || choice.ability || 'Check'} DC {choice.dc}
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                ) : isBossChamber && isBossDefeated ? (
                                                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-500/80 shadow-lg text-center space-y-3 animate-fade-in">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="text-2xl animate-bounce">🏆</span>
                                                            <span className="font-display font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                                                                Campaign Climax Reached & Boss Vanquished!
                                                            </span>
                                                            <span className="text-2xl animate-bounce">⚔️</span>
                                                        </div>
                                                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
                                                            You have triumphed over the final threat of this adventure! The realm sings of your bravery, and your patron awaits to commend your deeds.
                                                        </p>
                                                        {onOpenVictoryModal && (
                                                            <button
                                                                type="button"
                                                                onClick={onOpenVictoryModal}
                                                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <span>🏆</span>
                                                                <span>View Campaign Victory & Epilogue</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="py-2.5 px-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                                                        <span className="text-base">✨</span>
                                                        <span>All choices and actions in this chamber have been resolved. Use the automap to travel onward or declare a custom action below!</span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Integrated Custom Action & Dice Roller (Inline in Chronicle) - Collapsible */}
                        {isChoicesExpanded && (
                            <div className="w-full rounded-2xl p-3.5 sm:p-4 bg-gray-50 dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700/70 space-y-2.5 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                                        <span>✍️</span>
                                        <span>Declare Action / Freeform Choice</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleQuickRoll}
                                        disabled={isLoading}
                                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1 transition-all cursor-pointer"
                                        title="Roll a d20 die"
                                    >
                                        <span>🎲</span>
                                        <span>Roll d20</span>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={
                                            pendingRoll
                                                ? `Waiting for ${pendingRoll.characterName === 'player' ? 'your' : pendingRoll.characterName + "'s"} roll (DC ${pendingRoll.dc})...`
                                                : 'What do you do?'
                                        }
                                        disabled={isLoading || Boolean(pendingRoll)}
                                        className="input flex-1 py-2 sm:py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                                    />
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={!input.trim() || isLoading || Boolean(pendingRoll)}
                                        className="px-4 py-2 sm:py-2.5 text-xs sm:text-sm shrink-0"
                                    >
                                        Send
                                    </Button>
                                </form>

                                {/* Quick Action Prompt Chips */}
                                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                                    <span className="text-gray-500 dark:text-gray-400 font-semibold mr-1">Prompts:</span>
                                    {quickActions.map((action) => (
                                        <button
                                            key={action}
                                            type="button"
                                            onClick={() => setInput(action)}
                                            className="px-2.5 py-0.5 rounded-full bg-gray-200/70 dark:bg-slate-700/70 hover:bg-amber-100 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
