import { skills } from '../../data/skills';
import { getClassById } from '../../data/classes';

export default function SkillSelection({
    selectedClass,
    selectedSkills,
    selected,
    onSkillsChange,
    onChange
}) {
    const classData = getClassById(selectedClass);
    const activeSkills = Array.isArray(selectedSkills)
        ? selectedSkills
        : (Array.isArray(selected) ? selected : []);
    const updateSkills = onSkillsChange || onChange || (() => {});

    const availableSkills = (classData && Array.isArray(classData.skillChoices))
        ? skills.filter((s) => classData.skillChoices.includes(s.id))
        : skills;
    const maxSkills = classData?.skillCount || 2;

    const handleToggleSkill = (skillId) => {
        if (activeSkills.includes(skillId)) {
            updateSkills(activeSkills.filter((id) => id !== skillId));
        } else if (activeSkills.length < maxSkills) {
            updateSkills([...activeSkills, skillId]);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <span>🎯</span>
                    <span>Select Your Skills</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose {maxSkills} skill proficiencies tailored to your {classData?.name || 'character'}.
                </p>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-1">
                    Selected: {activeSkills.length} / {maxSkills}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
                {availableSkills.map((skill) => {
                    const isSelected = activeSkills.includes(skill.id);
                    const isDisabled = !isSelected && activeSkills.length >= maxSkills;

                    return (
                        <button
                            key={skill.id}
                            type="button"
                            onClick={() => handleToggleSkill(skill.id)}
                            disabled={isDisabled}
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                    ? 'bg-amber-500/15 border-amber-500 text-gray-900 dark:text-white ring-2 ring-amber-500/30 font-semibold shadow-xs'
                                    : isDisabled
                                        ? 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/40 opacity-40 cursor-not-allowed'
                                        : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-400/50 hover:bg-amber-500/5'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                                    {isSelected && <span className="text-amber-500">✓</span>}
                                    <span>{skill.name}</span>
                                </h4>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 capitalize font-mono">
                                    {skill.ability}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                {skill.description}
                            </p>
                        </button>
                    );
                })}
            </div>

            {activeSkills.length > 0 && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300">
                        Selected Proficiencies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {activeSkills.map((skillId) => {
                            const skill = skills.find((s) => s.id === skillId);
                            return (
                                <span
                                    key={skillId}
                                    className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow-xs"
                                >
                                    {skill?.name || skillId}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
