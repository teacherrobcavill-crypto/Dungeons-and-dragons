import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getRaceById } from '../data/races';
import { getClassById, calculateMaxHp } from '../data/classes';
import { getDefaultSpellsForClass } from '../data/spells';
import { heroPresets } from '../data/presets';
import Button from '../components/common/Button';
import RaceSelection from '../components/character/RaceSelection';
import ClassSelection from '../components/character/ClassSelection';
import StatAllocation from '../components/character/StatAllocation';
import SkillSelection from '../components/character/SkillSelection';
import PersonalityTraits from '../components/character/PersonalityTraits';
import BackgroundStory from '../components/character/BackgroundStory';
import CompanionSetup from '../components/character/CompanionSetup';
import FinalReview from '../components/character/FinalReview';

const STEPS = [
    { id: 1, name: 'Race', icon: '🧝' },
    { id: 2, name: 'Class', icon: '⚔️' },
    { id: 3, name: 'Stats', icon: '📊' },
    { id: 4, name: 'Skills', icon: '🎯' },
    { id: 5, name: 'Personality', icon: '💭' },
    { id: 6, name: 'Background', icon: '📖' },
    { id: 7, name: 'Companions', icon: '👥' },
    { id: 8, name: 'Review', icon: '✅' }
];

export default function CharacterCreator() {
    const navigate = useNavigate();
    const {
        state,
        setCharacter,
        setCompanions,
        setCurrentStep,
        equipItem,
        addInventoryItem
    } = useGame();

    const [currentStep, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [startingLevel, setStartingLevel] = useState(state.character?.level || 1);
    const [showPresets, setShowPresets] = useState(false);

    const [localData, setLocalData] = useState({
        race: state.character?.race || null,
        subrace: state.character?.subrace || null,
        class: state.character?.class || null,
        subclass: state.character?.subclass || null,
        stats: state.character?.stats || {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        },
        skills: Array.isArray(state.character?.skills) ? state.character.skills : [],
        personality: state.character?.personality || '',
        traits: state.character?.traits || '',
        name: state.character?.name || '',
        background: state.character?.background || '',
        companions: Array.isArray(state.companions) && state.companions.length === 3 ? state.companions : [
            { name: 'Aria', race: 'elf', class: 'wizard', personality: 'Wise' },
            { name: 'Thorin', race: 'dwarf', class: 'cleric', personality: 'Grumpy' },
            { name: 'Vex', race: 'halfling', class: 'rogue', personality: 'Mischievous' }
        ]
    });

    const updateLocalData = (field, value) => {
        setLocalData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const validateStep = () => {
        const newErrors = {};
        switch (currentStep) {
            case 1:
                if (!localData.race) newErrors.race = 'Please select a race';
                break;
            case 2:
                if (!localData.class) newErrors.class = 'Please select a class';
                break;
            case 7: {
                const list = Array.isArray(localData.companions) ? localData.companions : [];
                const hasCompanion = list.some((c) => c && c.name && c.race && c.class);
                if (!hasCompanion) newErrors.companions = 'Create at least one companion';
                break;
            }
            default:
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (currentStep < 8) {
                setStep(currentStep + 1);
            } else {
                handleFinish();
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setStep(currentStep - 1);
        }
    };

    const buildCompleteCharacterPayload = (data, level = 1) => {
        const cls = getClassById(data.class || 'fighter');
        const race = getRaceById(data.race || 'human');
        const conScore = (data.stats?.constitution || 12) + (race?.statBonuses?.constitution || 0);
        const calcHp = calculateMaxHp
            ? calculateMaxHp(data.class || 'fighter', conScore, level, data.race)
            : 12 + (level - 1) * 7;

        const defaultSpells = getDefaultSpellsForClass
            ? getDefaultSpellsForClass(data.class || 'fighter', level).map((s) => s.id)
            : [];

        const spellSlots = {
            level1: { current: level >= 2 ? 3 : 2, max: level >= 2 ? 3 : 2 },
            level2: { current: level >= 3 ? 2 : 0, max: level >= 3 ? 2 : 0 },
            level3: { current: level >= 5 ? 2 : 0, max: level >= 5 ? 2 : 0 }
        };

        const subclassName = data.subclass || cls?.subclasses?.[0]?.name || null;

        return {
            name: data.name || `Heroic ${cls?.name || 'Adventurer'}`,
            title: data.title || `${race?.name || 'Human'} ${cls?.name || 'Adventurer'}`,
            race: data.race || 'human',
            subrace: data.subrace || race?.subraces?.[0]?.name || null,
            class: data.class || 'fighter',
            subclass: subclassName,
            stats: data.stats,
            skills: data.skills?.length ? data.skills : (cls?.skillChoices?.slice(0, 2) || ['athletics', 'perception']),
            spells: defaultSpells,
            spellSlots,
            personality: data.personality || 'Brave and determined',
            traits: data.traits || 'Always stands by the party',
            background: data.background || data.backstory || 'A seasoned adventurer answering the call of destiny.',
            backstory: data.backstory || data.background || 'A seasoned adventurer answering the call of destiny.',
            quirk: data.quirk || '',
            secret: data.secret || '',
            personalQuest: data.personalQuest || '',
            voiceQuote: data.voiceQuote || '',
            hp: calcHp,
            maxHp: calcHp,
            level,
            hitDiceRemaining: level,
            experience: level === 5 ? 6500 : level === 3 ? 900 : 0,
            gold: level === 5 ? 150 : level === 3 ? 75 : 35,
            conditions: []
        };
    };

    const handleFinish = () => {
        const payload = buildCompleteCharacterPayload(localData, startingLevel);
        setCharacter(payload);
        setCompanions(localData.companions.filter((c) => c.name && c.race && c.class));
        setCurrentStep(8);
        navigate('/adventure');
    };

    const handleSelectPreset = (preset) => {
        const charObj = preset.character || preset;
        const level = charObj.level || preset.level || 1;
        const payload = buildCompleteCharacterPayload(
            {
                name: charObj.name || preset.name,
                title: charObj.title || preset.title,
                race: charObj.race || 'human',
                subrace: charObj.subrace,
                class: charObj.class || 'fighter',
                subclass: charObj.subclass,
                stats: charObj.stats || { strength: 16, dexterity: 14, constitution: 14, intelligence: 10, wisdom: 12, charisma: 10 },
                skills: charObj.skills || ['athletics', 'perception'],
                personality: charObj.personality || preset.quirk || 'Heroic',
                traits: charObj.traits || preset.description || preset.backstory,
                background: charObj.backstory || preset.backstory || charObj.background || preset.description,
                backstory: charObj.backstory || preset.backstory || charObj.background || preset.description,
                quirk: charObj.quirk || preset.quirk || '',
                secret: charObj.secret || preset.secret || '',
                personalQuest: charObj.personalQuest || preset.personalQuest || '',
                voiceQuote: charObj.voiceQuote || preset.voiceQuote || ''
            },
            level
        );

        setCharacter(payload);
        if (preset.companions?.length) {
            setCompanions(preset.companions);
        } else {
            setCompanions([
                { name: 'Aria', race: 'elf', class: 'wizard', personality: 'Wise' },
                { name: 'Thorin', race: 'dwarf', class: 'cleric', personality: 'Grumpy' },
                { name: 'Vex', race: 'halfling', class: 'rogue', personality: 'Mischievous' }
            ]);
        }

        if (preset.startingEquipment?.length) {
            preset.startingEquipment.forEach((item) => {
                addInventoryItem(item);
                if (['weapon', 'armor', 'shield'].includes(item.type)) {
                    equipItem(item);
                }
            });
        }

        setCurrentStep(8);
        navigate('/adventure');
    };

    const handleSkip = () => {
        if (heroPresets && heroPresets.length > 0) {
            handleSelectPreset(heroPresets[0]);
            return;
        }
        const dummyCharacter = buildCompleteCharacterPayload(
            {
                name: 'Sir Kaelen of Neverwinter',
                race: 'human',
                class: 'fighter',
                stats: { strength: 16, dexterity: 14, constitution: 14, intelligence: 10, wisdom: 12, charisma: 10 },
                skills: ['athletics', 'perception', 'intimidation'],
                personality: 'Brave and bold',
                traits: 'Never backs down from a challenge',
                background: 'A seasoned warrior of the Sword Coast seeking glory.'
            },
            startingLevel
        );

        setCharacter(dummyCharacter);
        setCompanions([
            { name: 'Aria', race: 'elf', class: 'wizard', personality: 'Wise' },
            { name: 'Thorin', race: 'dwarf', class: 'cleric', personality: 'Grumpy' },
            { name: 'Shadow', race: 'halfling', class: 'rogue', personality: 'Mischievous' }
        ]);
        setCurrentStep(8);
        navigate('/adventure');
    };

    const renderStep = () => {
        const selectedRace = getRaceById(localData.race);

        switch (currentStep) {
            case 1:
                return (
                    <RaceSelection
                        selectedRace={localData.race}
                        selected={localData.race}
                        selectedSubrace={localData.subrace}
                        onSelect={(race, subrace) => {
                            updateLocalData('race', race);
                            if (subrace) updateLocalData('subrace', subrace);
                        }}
                        error={errors.race}
                    />
                );
            case 2:
                return (
                    <ClassSelection
                        selectedClass={localData.class}
                        selected={localData.class}
                        selectedSubclass={localData.subclass}
                        onSelect={(cls, subclass) => {
                            updateLocalData('class', cls);
                            if (subclass) updateLocalData('subclass', subclass);
                        }}
                        error={errors.class}
                    />
                );
            case 3:
                return (
                    <StatAllocation
                        stats={localData.stats}
                        race={localData.race || 'human'}
                        characterClass={localData.class || 'fighter'}
                        raceBonuses={selectedRace?.statBonuses || {}}
                        onStatsChange={(stats) => updateLocalData('stats', stats)}
                        onChange={(stats) => updateLocalData('stats', stats)}
                    />
                );
            case 4:
                return (
                    <SkillSelection
                        selectedClass={localData.class}
                        selectedSkills={localData.skills || []}
                        selected={localData.skills || []}
                        onSkillsChange={(skills) => updateLocalData('skills', skills)}
                        onChange={(skills) => updateLocalData('skills', skills)}
                    />
                );
            case 5:
                return (
                    <PersonalityTraits
                        name={localData.name}
                        personality={localData.personality}
                        traits={localData.traits}
                        onNameChange={(val) => updateLocalData('name', val)}
                        onPersonalityChange={(val) => updateLocalData('personality', val)}
                        onTraitsChange={(val) => updateLocalData('traits', val)}
                    />
                );
            case 6:
                return (
                    <BackgroundStory
                        name={localData.name}
                        background={localData.background}
                        onNameChange={(val) => updateLocalData('name', val)}
                        onBackgroundChange={(val) => updateLocalData('background', val)}
                    />
                );
            case 7:
                return (
                    <CompanionSetup
                        companions={localData.companions || []}
                        onCompanionsChange={(companions) => updateLocalData('companions', companions)}
                        onChange={(companions) => updateLocalData('companions', companions)}
                        error={errors.companions}
                    />
                );
            case 8:
                return (
                    <FinalReview
                        character={localData}
                        companions={(localData.companions || []).filter((c) => c && c.name && c.race && c.class)}
                        onEditStep={(step) => setStep(step)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                                    PHB 5e Hero & Party Creator
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    12 Classes • 9 Races • Authentic Hit Dice, Spells & Party Companions
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Starting Tier Selector */}
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg text-xs">
                                {[1, 3, 5].map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        onClick={() => setStartingLevel(lvl)}
                                        className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                                            startingLevel === lvl
                                                ? 'bg-primary-500 text-white shadow-sm'
                                                : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                    >
                                        Start Lvl {lvl}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowPresets(!showPresets)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-colors"
                            >
                                ⚡ {showPresets ? 'Hide Presets' : '1-Click Iconic Heroes'}
                            </button>

                            <button
                                type="button"
                                onClick={handleSkip}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                Quick Start →
                            </button>
                        </div>
                    </div>

                    {/* Optional 1-Click Iconic Heroes Drawer */}
                    {showPresets && heroPresets?.length > 0 && (
                        <div className="mb-4 p-4 rounded-2xl bg-amber-50/90 dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 animate-fade-in">
                            <div className="flex items-center justify-between mb-2.5">
                                <h3 className="font-display font-bold text-sm text-amber-950 dark:text-amber-300">
                                    ⚡ Choose an Iconic PHB Hero & Party Preset (Instant Launch)
                                </h3>
                                <span className="text-xs text-amber-800 dark:text-amber-400">
                                    Pre-loaded with stats, spells, gear & 3 companions
                                </span>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                                {heroPresets.map((preset) => {
                                    const c = preset.character || preset;
                                    return (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => handleSelectPreset(preset)}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-100/60 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-600 text-left transition-all shadow-sm"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-lg">{preset.icon || '⚔️'}</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                                                    Level {c.level || preset.level || 1}
                                                </span>
                                            </div>
                                            <p className="font-bold text-xs text-gray-900 dark:text-white truncate">
                                                {c.name || preset.name}
                                            </p>
                                            <p className="text-[11px] text-primary-600 dark:text-primary-400 capitalize">
                                                {c.race} {c.class}
                                            </p>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                                {preset.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                        {STEPS.map((step) => (
                            <button
                                key={step.id}
                                type="button"
                                onClick={() => step.id < currentStep && setStep(step.id)}
                                disabled={step.id > currentStep}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    step.id === currentStep
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                        : step.id < currentStep
                                            ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 hover:bg-primary-200 cursor-pointer'
                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <span>{step.icon}</span>
                                <span className="hidden sm:inline">{step.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="animate-fade-in">{renderStep()}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <Button
                        variant="secondary"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        ← Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleNext}
                    >
                        {currentStep === 8 ? 'Start Adventure →' : 'Continue →'}
                    </Button>
                </div>
            </main>
        </div>
    );
}
