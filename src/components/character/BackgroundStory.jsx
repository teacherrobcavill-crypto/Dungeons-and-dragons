import Input, { Textarea } from '../common/Input';

const BACKGROUND_TEMPLATES = [
    { name: 'Noble', template: 'Born into a wealthy family of [Region], you were raised with privilege but yearned for adventure...' },
    { name: 'Soldier', template: 'You served in the army of [Kingdom], fighting in the great war against [Enemy]. The horrors you witnessed...' },
    { name: 'Orphan', template: 'Abandoned at a young age, you grew up on the streets of [City], learning to survive by your wits...' },
    { name: 'Scholar', template: 'Years spent in the great library of [Academy] taught you much, but a forbidden discovery forced you to flee...' },
    { name: 'Outcast', template: 'Exiled from your homeland for a crime you did not commit, you wander the world seeking to clear your name...' }
];

export default function BackgroundStory({
    name = '',
    background = '',
    onNameChange,
    onBackgroundChange
}) {
    const safeBackground = background || '';
    const updateBackground = onBackgroundChange || (() => {});
    const updateName = onNameChange || (() => {});

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <span>📖</span>
                    <span>Hero's Identity & Background</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tell us about your hero's origins. Where do they come from, and what drives them into the dangerous depths?
                </p>
            </div>

            {/* Character Name Input */}
            <Input
                label="Character Name"
                placeholder="e.g. Sir Kaelen, Lyra Shadowdancer, Morgran Battlehammer..."
                value={name || ''}
                onChange={(e) => updateName(e.target.value)}
            />

            <Textarea
                label="Your Story & Motivations"
                placeholder="Write your character's backstory here..."
                value={safeBackground}
                onChange={(e) => updateBackground(e.target.value)}
                rows={6}
            />

            <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    Need inspiration? Try an origin hook:
                </p>
                <div className="grid md:grid-cols-2 gap-2.5">
                    {BACKGROUND_TEMPLATES.map((tmpl) => (
                        <button
                            key={tmpl.name}
                            type="button"
                            onClick={() => updateBackground(tmpl.template)}
                            className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 bg-white dark:bg-slate-800 text-left transition-all cursor-pointer"
                        >
                            <h4 className="font-bold text-xs text-gray-900 dark:text-white mb-0.5">
                                {tmpl.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                {tmpl.template}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {safeBackground.length > 50 && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <span>✓</span>
                    <span>Compelling backstory recorded ({safeBackground.length} characters)</span>
                </div>
            )}
        </div>
    );
}
