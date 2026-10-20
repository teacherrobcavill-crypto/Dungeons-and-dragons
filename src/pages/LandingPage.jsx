import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useGame } from '../context/GameContext';

export default function LandingPage() {
    const navigate = useNavigate();
    const { state, resetGame, updateSettings } = useGame();

    const handleStartAdventure = () => {
        if (state.gameStarted) {
            navigate('/game');
        } else {
            navigate('/create');
        }
    };

    const handleNewAdventure = () => {
        resetGame();
        navigate('/create');
    };

    const features = [
        {
            icon: '🌌',
            title: 'Living Tabletop Realms',
            description: 'Explore rich, multi-room campaigns and procedural quests with full dungeon automaps and interactive encounters.'
        },
        {
            icon: '🛡️',
            title: 'Party Companions',
            description: 'Recruit and customize brave companions who fight alongside you with distinct personalities and combat roles.'
        },
        {
            icon: '📖',
            title: 'Authentic 5e Rules & Voices',
            description: 'Experience genuine D&D 5e mechanics, tactical combat, and cinematic studio voice narration.'
        }
    ];

    const toggleDarkMode = () => {
        const newDarkMode = !state.settings.darkMode;
        updateSettings({ darkMode: newDarkMode });
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            ⚔️
                        </div>
                        <span className="font-display font-bold text-xl text-gray-900 dark:text-white">Mythic Chronicles</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            title={state.settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {state.settings.darkMode ? (
                                <span className="text-xl">☀️</span>
                            ) : (
                                <span className="text-xl">🌙</span>
                            )}
                        </button>
                        {state.gameStarted && (
                            <Button variant="secondary" size="sm" onClick={() => navigate('/game')}>
                                Continue Game
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        Classic D&D 5e Solo Tabletop
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Your Solo <span className="gradient-text">Dungeon Master</span> & Tabletop Companion
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Create legendary heroes, delve into perilous dungeons, and experience living tabletop realms with tactical 5e rules and cinematic voice acting.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="primary" size="xl" onClick={handleStartAdventure}>
                            {state.gameStarted ? 'Continue Adventure' : 'Start Adventure'}
                            <span className="ml-2">→</span>
                        </Button>
                        {state.gameStarted && (
                            <Button variant="secondary" size="lg" onClick={handleNewAdventure}>
                                New Character
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                            Everything You Need for Solo Adventures
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Combines authentic D&D 5e mechanics, tactical combat, and branching dungeon maps to create an unforgettable solo gaming experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                hover
                                className="text-center"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-gray-50 dark:bg-slate-800/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-12 text-center">
                        How It Works
                    </h2>

                    <div className="space-y-8">
                        {[
                            { step: 1, title: 'Create Your Hero', desc: 'Choose race, class, stats, and craft your backstory.' },
                            { step: 2, title: 'Select an Adventure', desc: 'Pick from iconic D&D modules or generate a custom delve.' },
                            { step: 3, title: 'Play Your Way', desc: 'Choose your paths, roll dice, and let the Dungeon Master narrate your journey.' }
                        ].map(item => (
                            <div key={item.step} className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card p-12 bg-gradient-to-br from-primary-500 to-accent-600 text-white border-0">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Ready to Begin Your Quest?
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Your adventure awaits. Create your character and step into a world of endless possibilities.
                        </p>
                        <Button
                            variant="secondary"
                            size="xl"
                            onClick={handleStartAdventure}
                            className="bg-white text-primary-600 hover:bg-gray-100"
                        >
                            Start Now — It&apos;s Free
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-gray-100 dark:border-slate-700">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                            ⚔️
                        </div>
                        <span className="font-display font-semibold text-gray-700 dark:text-gray-200">Mythic Chronicles</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2024 Mythic Chronicles. Built with ❤️ for solo adventurers.
                    </p>
                </div>
            </footer>
        </div>
    );
}
