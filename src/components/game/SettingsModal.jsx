import Modal from '../common/Modal';
import Button from '../common/Button';

export default function SettingsModal({ isOpen, onClose, settings, onSettingsChange, onResetGame }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings & Game Configuration" size="md">
            <div className="space-y-6">
                {/* Audio, Voice Narration & UI Preferences */}
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Audio, Voice & Preferences</h4>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🌙</span>
                                <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={Boolean(settings.darkMode)}
                                onChange={(e) => {
                                    onSettingsChange({ ...settings, darkMode: e.target.checked });
                                    if (e.target.checked) {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                }}
                                className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🔊</span>
                                <div>
                                    <span className="text-gray-700 dark:text-gray-200 block">Procedural Sound Effects</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Dice clatter, sword hits, spells & fanfare</span>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={Boolean(settings.soundEnabled)}
                                onChange={(e) => onSettingsChange({ ...settings, soundEnabled: e.target.checked })}
                                className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🎙️</span>
                                <div>
                                    <span className="text-gray-700 dark:text-gray-200 block">ElevenLabs Voice Narration</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Cinematic quest intros, boss declarations & moments</span>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.narrationEnabled !== false}
                                onChange={(e) => onSettingsChange({ ...settings, narrationEnabled: e.target.checked })}
                                className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">✨</span>
                                <span className="text-gray-700 dark:text-gray-200">Animations</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={Boolean(settings.animationsEnabled)}
                                onChange={(e) => onSettingsChange({ ...settings, animationsEnabled: e.target.checked })}
                                className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                            />
                        </label>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Danger Zone</h4>
                    <Button
                        variant="secondary"
                        className="w-full border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                        onClick={() => {
                            if (confirm('Are you sure you want to reset? All progress will be lost.')) {
                                onResetGame();
                                onClose();
                            }
                        }}
                    >
                        Reset Game & Clear Data
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
