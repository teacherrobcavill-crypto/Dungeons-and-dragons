import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { adventures, generateCustomAdventure } from '../data/adventures';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

export default function AdventureSelection() {
    const navigate = useNavigate();
    const { setAdventure, startGame, clearChat, state } = useGame();

    const [selectedType, setSelectedType] = useState('premade');
    const [selectedAdventure, setSelectedAdventure] = useState(adventures[0] || null);
    const [customSettings, setCustomSettings] = useState({
        name: '',
        setting: 'The Underdark Caverns of Menzoberranzan',
        theme: 'Dark Fantasy & Eldritch Mystery',
        difficulty: 'Moderate',
        level: state.character.level || 1,
        treasureTheme: 'Relics',
        tags: 'Underdark, Drow, Mind Flayers, Relics'
    });
    const [importCode, setImportCode] = useState('');
    const [error, setError] = useState('');

    const handleStartAdventure = () => {
        if (selectedType === 'premade' && selectedAdventure) {
            clearChat();
            setAdventure(selectedAdventure);
            startGame();
            navigate('/game');
        } else if (selectedType === 'custom') {
            if (!customSettings.setting || !customSettings.theme) {
                setError('Please fill in setting and theme for your custom adventure');
                return;
            }
            const customAdventure = generateCustomAdventure
                ? generateCustomAdventure({
                    name: customSettings.name || `Chronicles of ${customSettings.setting}`,
                    setting: customSettings.setting,
                    theme: customSettings.theme,
                    difficulty: customSettings.difficulty,
                    level: Number(customSettings.level) || 1,
                    treasureTheme: customSettings.treasureTheme,
                    tags: customSettings.tags.split(',').map((t) => t.trim()).filter(Boolean)
                })
                : {
                    id: 'custom-' + Date.now(),
                    name: customSettings.name || 'Custom Adventure',
                    description: `A ${customSettings.theme} adventure in ${customSettings.setting}`,
                    difficulty: customSettings.difficulty,
                    tags: customSettings.tags.split(',').map((t) => t.trim()).filter(Boolean),
                    setting: customSettings.setting,
                    openingNarrative: `You find yourself in ${customSettings.setting}. What do you do?`,
                    icon: '🌟'
                };
            clearChat();
            setAdventure(customAdventure);
            startGame();
            navigate('/game');
        } else if (selectedType === 'import') {
            try {
                const imported = JSON.parse(importCode);
                if (!imported.name || !imported.openingNarrative) {
                    throw new Error('Invalid adventure format');
                }
                clearChat();
                setAdventure(imported);
                startGame();
                navigate('/game');
            } catch {
                setError('Invalid adventure code. Please check the format.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/create')}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                                    Choose Your D&D 5e Campaign Module
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Multi-Room Dungeon Maps • DMG 2024 Encounter Budgets • Monster Manual Bosses
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Party Summary Ribbon */}
            <div className="bg-primary-50 dark:bg-primary-900/30 border-b border-primary-100 dark:border-primary-800">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl shadow-md">
                            ⚔️
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {state.character.name || 'Your Hero'}{' '}
                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-200 dark:bg-primary-800 text-primary-900 dark:text-primary-200 ml-1">
                                    Level {state.character.level || 1}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                {state.character.race} {state.character.class} • HP {state.character.hp}/{state.character.maxHp}
                                {state.companions.length > 0 && ` • Party: ${state.companions.map((c) => c.name).join(', ')}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Adventure Type Selection */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {[
                        { id: 'premade', icon: '📜', title: '5 Authored Campaign Modules', desc: 'Full multi-room maps, NPCs, traps & bosses' },
                        { id: 'custom', icon: '✨', title: 'DMG Campaign Generator', desc: 'Procedurally build a 4-Act dungeon module' },
                        { id: 'import', icon: '📥', title: 'Import Story Graph JSON', desc: 'Load a custom dnd_story_graph.json module' }
                    ].map((type) => (
                        <Card
                            key={type.id}
                            hover
                            onClick={() => {
                                setSelectedType(type.id);
                                setError('');
                            }}
                            className={`text-center cursor-pointer ${
                                selectedType === type.id ? 'ring-2 ring-primary-500 border-primary-200 dark:border-primary-600' : ''
                            }`}
                        >
                            <div className="text-4xl mb-3">{type.icon}</div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{type.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{type.desc}</p>
                        </Card>
                    ))}
                </div>

                {/* Pre-made Adventures */}
                {selectedType === 'premade' && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">
                            Select a Campaign Module
                        </h2>
                        <div className="space-y-4">
                            {adventures.map((adventure) => {
                                const nodeCount = adventure.nodes ? Object.keys(adventure.nodes).length : 1;
                                return (
                                    <Card
                                        key={adventure.id}
                                        hover
                                        onClick={() => setSelectedAdventure(adventure)}
                                        className={`cursor-pointer ${
                                            selectedAdventure?.id === adventure.id
                                                ? 'ring-2 ring-primary-500 border-primary-200 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">{adventure.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                                                        {adventure.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold">
                                                            🗺️ {nodeCount} Chambers
                                                        </span>
                                                        {adventure.levelRange && (
                                                            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-semibold">
                                                                {adventure.levelRange}
                                                            </span>
                                                        )}
                                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                            adventure.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' :
                                                            adventure.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' :
                                                            'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                                                        }`}>
                                                            {adventure.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                                    {adventure.description}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>⏱️ {adventure.estimatedTime}</span>
                                                    <span>•</span>
                                                    <span>📍 {adventure.setting}</span>
                                                    {adventure.primaryVillain && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-red-600 dark:text-red-400 font-medium">
                                                                👹 Boss: {adventure.primaryVillain.name}
                                                            </span>
                                                        </>
                                                    )}
                                                    {adventure.treasureTheme && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-amber-600 dark:text-amber-400 font-medium">
                                                                💎 Hoard: {adventure.treasureTheme}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* DMG Custom Adventure Generator */}
                {selectedType === 'custom' && (
                    <Card className="animate-fade-in">
                        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                            ✨ DMG 2024 Four-Act Campaign & Dungeon Architect
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            Generates a complete 6-chamber playable adventure module with an interactive Automap, traps, skill checks, merchant camp, and a Monster Manual boss scaled to your party.
                        </p>
                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input
                                    label="Campaign Title (Optional)"
                                    value={customSettings.name}
                                    onChange={(e) => setCustomSettings({ ...customSettings, name: e.target.value })}
                                    placeholder="e.g., The Vault of the Astral Lich"
                                />
                                <Input
                                    label="World Setting"
                                    value={customSettings.setting}
                                    onChange={(e) => setCustomSettings({ ...customSettings, setting: e.target.value })}
                                    placeholder="e.g., The Underdark, Eberron, Waterdeep..."
                                />
                            </div>
                            <Input
                                label="Campaign Theme & Flavor (DMG Ch. 5)"
                                value={customSettings.theme}
                                onChange={(e) => setCustomSettings({ ...customSettings, theme: e.target.value })}
                                placeholder="e.g., Heroic Fantasy, Gothic Horror, Sword & Sorcery, Heist..."
                            />
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Party Level Tier
                                    </label>
                                    <select
                                        value={customSettings.level}
                                        onChange={(e) => setCustomSettings({ ...customSettings, level: Number(e.target.value) })}
                                        className="input"
                                    >
                                        <option value={1}>Level 1–2 (Local Heroes)</option>
                                        <option value={3}>Level 3–4 (Seasoned Delvers)</option>
                                        <option value={5}>Level 5+ (Heroes of the Realm)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        DMG XP Budget Difficulty
                                    </label>
                                    <select
                                        value={customSettings.difficulty}
                                        onChange={(e) => setCustomSettings({ ...customSettings, difficulty: e.target.value })}
                                        className="input"
                                    >
                                        <option value="Low">Low XP Budget (Story Focus)</option>
                                        <option value="Moderate">Moderate XP Budget (Balanced)</option>
                                        <option value="High">High XP Budget (Deadly Tactics)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        DMG 2024 Treasure Theme
                                    </label>
                                    <select
                                        value={customSettings.treasureTheme}
                                        onChange={(e) => setCustomSettings({ ...customSettings, treasureTheme: e.target.value })}
                                        className="input"
                                    >
                                        <option value="Armaments">Armaments (Weapons, Armor, Shields)</option>
                                        <option value="Arcana">Arcana (Scrolls, Wands, Potions, Gems)</option>
                                        <option value="Implements">Implements (Rods, Staves, Wondrous Gear)</option>
                                        <option value="Relics">Relics (Holy/Unholy Artifacts & Idols)</option>
                                    </select>
                                </div>
                            </div>
                            <Input
                                label="Tags (comma-separated)"
                                value={customSettings.tags}
                                onChange={(e) => setCustomSettings({ ...customSettings, tags: e.target.value })}
                                placeholder="e.g., Dragons, Mystery, Dungeon, Stealth"
                            />
                        </div>
                    </Card>
                )}

                {/* Import Adventure */}
                {selectedType === 'import' && (
                    <Card className="animate-fade-in">
                        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">
                            Import Adventure Module JSON
                        </h2>
                        <textarea
                            value={importCode}
                            onChange={(e) => setImportCode(e.target.value)}
                            placeholder='{"name": "My Adventure", "openingNarrative": "You stand before..."}'
                            rows={6}
                            className="input font-mono text-sm mb-4"
                        />
                    </Card>
                )}

                {/* Start Button */}
                {selectedType && (
                    <div className="mt-8 text-center animate-fade-in">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleStartAdventure}
                            disabled={selectedType === 'premade' && !selectedAdventure}
                            className="px-12"
                        >
                            🎲 Launch D&D Campaign →
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
