/**
 * MythicBot Asset Catalog - Image mappings for Races, Heroes, Monsters, and Adventure Scenes
 */

export const RACE_IMAGES = {
    human: '/images/human.png',
    elf: '/images/elf.png',
    dwarf: '/images/dwarf.png',
    halfling: '/images/halfling.png',
    tiefling: '/images/teifling.png',
    dragonborn: '/images/dragonborn.png',
    gnome: '/images/gnome.png',
    'half-elf': '/images/half-elf.png',
    'half-orc': '/images/half-orc.png'
};

export const HERO_PRESET_IMAGES = {
    'kaelen-vanguard': '/images/kaelen_dawnshield.png',
    'kaelen-dawnshield': '/images/kaelen_dawnshield.png',
    'kaelen': '/images/kaelen_dawnshield.png',
    'elara-evoker': '/images/elara_starweaver.png',
    'elara-starweaver': '/images/elara_starweaver.png',
    'elara': '/images/elara_starweaver.png',
    'silas-trickster': '/images/silas_vane.png',
    'silas-shadowblade': '/images/silas_vane.png',
    'silas-vane': '/images/silas_vane.png',
    'silas': '/images/silas_vane.png',
    'valerius-dragon': '/images/valerius_flameheart.png',
    'thordak-paladin': '/images/valerius_flameheart.png',
    'valerius-flameheart': '/images/valerius_flameheart.png',
    'valerius': '/images/valerius_flameheart.png',
    'morgran-ironclad': '/images/morgan_battlehammer.png',
    'morgran-cleric': '/images/morgan_battlehammer.png',
    'morgran-battlehammer': '/images/morgan_battlehammer.png',
    'morgran': '/images/morgan_battlehammer.png',
    'korgath-berserk': '/images/korgath_bloodfang.png',
    'grommash-barbarian': '/images/korgath_bloodfang.png',
    'korgath-bloodfang': '/images/korgath_bloodfang.png',
    'korgath': '/images/korgath_bloodfang.png',
    'sylva-moon': '/images/sylva_moonwhisper.png',
    'sylva-ranger': '/images/sylva_moonwhisper.png',
    'sylva-moonwhisper': '/images/sylva_moonwhisper.png',
    'sylva': '/images/sylva_moonwhisper.png',
    'kaelith-pact': '/images/kaelith_hellborn.png',
    'malakor-warlock': '/images/kaelith_hellborn.png',
    'kaelith-hellborn': '/images/kaelith_hellborn.png',
    'kaelith': '/images/kaelith_hellborn.png'
};

export const MONSTER_IMAGES = {
    'black-spider': '/images/nezznar_black_spider.png',
    nezznar: '/images/nezznar_black_spider.png',
    voranthos: '/images/voranthos.png',
    'young-red-dragon': '/images/voranthos.png',
    dragon: '/images/voranthos.png',
    vespera: '/images/vespara_assassin.png',
    assassin: '/images/vespara_assassin.png',
    wight: '/images/lord_malakor_ravencrest.png',
    malakor: '/images/lord_malakor_ravencrest.png',
    'lord-malakor': '/images/lord_malakor_ravencrest.png'
};

export const SCENE_IMAGES = {
    // Lost Mine of Phandelver (10 / 10 Nodes)
    ambush_trail: '/images/scenes/lost-mine/ambush_trail.png',
    goblin_trail: '/images/scenes/lost-mine/goblin_trail.png',
    cragmaw_entrance: '/images/scenes/lost-mine/cragmaw_entrance.png',
    wolf_kennel: '/images/scenes/lost-mine/wolf_kennel.png',
    flood_hall: '/images/scenes/lost-mine/flood_hall.png',
    klarg_throne: '/images/scenes/lost-mine/klarg_throne.png',
    phandalin_hub: '/images/scenes/lost-mine/phandalin_hub.png',
    redbrand_cellar: '/images/scenes/lost-mine/redbrand_cellar.png',
    wave_echo_forge: '/images/scenes/lost-mine/wave_echo_forge.png',
    black_spider_sanctum: '/images/scenes/lost-mine/black_spider_sanctum.png',

    // Dragon's Lair: The Wrath of Voranthos
    ashford_gates: '/images/scenes/dragon-lair/ashford_gates.png',
    frostbite_pass: '/images/scenes/dragon-lair/frostbite_pass.png',
    magma_bridge: '/images/scenes/dragon-lair/magma_bridge.png',
    voranthos_caldera: '/images/scenes/dragon-lair/voranthos_caldera.png',

    // The Haunted Manor of Ravencrest
    manor_gates: '/images/scenes/haunted-manor/manor_gates.png',
    grand_foyer: '/images/scenes/haunted-manor/grand_foyer.png',
    whispering_gallery: '/images/scenes/haunted-manor/whispering_gallery.png',
    ritual_ossuary: '/images/scenes/haunted-manor/ritual_ossuary.png',

    // Shadows of the Thieves' Guild
    rusty_anchor: '/images/scenes/thieves-guild/rusty_anchor.png',
    shadow_sanctum: '/images/scenes/thieves-guild/shadow_sanctum.png',

    // Secrets of the Sleeping God
    ziggurat_gates: '/images/scenes/ancient-temple/ziggurat_gates.png',
    throne_sleeping_god: '/images/scenes/ancient-temple/throne_sleeping_god.png'
};

/**
 * Returns the image URI for a character race or null
 */
export function getRaceImage(raceId) {
    if (!raceId) return null;
    const clean = raceId.toLowerCase().trim();
    return RACE_IMAGES[clean] || null;
}

/**
 * Returns the image URI for a preset hero or null
 */
export function getHeroPresetImage(presetId) {
    if (!presetId) return null;
    const clean = presetId.toLowerCase().trim();
    if (HERO_PRESET_IMAGES[clean]) return HERO_PRESET_IMAGES[clean];

    // Check substrings / name matches
    if (clean.includes('kaelen')) return HERO_PRESET_IMAGES['kaelen'];
    if (clean.includes('elara')) return HERO_PRESET_IMAGES['elara'];
    if (clean.includes('silas')) return HERO_PRESET_IMAGES['silas'];
    if (clean.includes('valerius') || clean.includes('flameheart')) return HERO_PRESET_IMAGES['valerius'];
    if (clean.includes('morgran') || clean.includes('battlehammer')) return HERO_PRESET_IMAGES['morgran'];
    if (clean.includes('korgath') || clean.includes('bloodfang')) return HERO_PRESET_IMAGES['korgath'];
    if (clean.includes('sylva')) return HERO_PRESET_IMAGES['sylva'];
    if (clean.includes('kaelith')) return HERO_PRESET_IMAGES['kaelith'];

    return null;
}

/**
 * Returns the image URI for a monster or boss
 */
export function getMonsterImage(monsterId, monsterName = '') {
    const idKey = (monsterId || '').toLowerCase().trim();
    if (MONSTER_IMAGES[idKey]) return MONSTER_IMAGES[idKey];

    const nameKey = (monsterName || '').toLowerCase();
    if (nameKey.includes('black spider') || nameKey.includes('nezznar')) return MONSTER_IMAGES['black-spider'];
    if (nameKey.includes('voranthos') || nameKey.includes('red dragon')) return MONSTER_IMAGES['voranthos'];
    if (nameKey.includes('malakor')) return MONSTER_IMAGES['malakor'];
    if (nameKey.includes('vespera')) return MONSTER_IMAGES['vespera'];

    return null;
}

/**
 * Returns the image URI for an adventure scene node or null
 */
export function getSceneImage(nodeId) {
    if (!nodeId) return null;
    const clean = nodeId.toLowerCase().trim();
    return SCENE_IMAGES[clean] || null;
}

/**
 * Resolves the best available avatar image for a character
 */
export function getCharacterAvatar(character) {
    if (!character) return null;
    if (character.image) return character.image;
    if (character.presetId) {
        const presetImg = getHeroPresetImage(character.presetId);
        if (presetImg) return presetImg;
    }
    if (character.name) {
        const namePresetImg = getHeroPresetImage(character.name);
        if (namePresetImg) return namePresetImg;
    }
    if (character.race) {
        const raceImg = getRaceImage(character.race);
        if (raceImg) return raceImg;
    }
    return null;
}
