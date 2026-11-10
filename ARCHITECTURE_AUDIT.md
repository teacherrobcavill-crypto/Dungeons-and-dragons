# Architecture Audit: Mythic Chronicles 2D-to-3D Spatial Engine Integration

## 1. Executive Summary
This audit evaluates the existing Mythic Chronicles D&D 5e Tabletop RPG codebase (`src/context/gameState.js`, `src/pages/GameInterface.jsx`, `src/data/adventures.js`, `src/services/dndEngine.js`, and `src/services/soundService.js`) and defines the non-destructive architecture required to integrate the **3D Procedural Dungeon Renderer**, **First-Person Grid-Stepper & Isometric Tactical Cameras**, **Diegetic Parchment HUD**, **Fog-of-War Auto-Mapper**, **3D Polyhedral Physics Dice**, **Enemy Tokens/Standees**, and **Procedural Web Audio Dungeon Ambience**.

## 2. State Management Audit (`src/context/gameState.js` & `src/context/GameContext.jsx`)
- **Single Source of Truth**: `gameReducer` manages `character`, `companions`, `adventure`, `currentNodeId`, `visitedNodes`, `searchedNodes`, `lootedNodes`, `defeatedNodes`, `disarmedNodes`, `completedChoices`, `combat`, `chatHistory`, `inventory`, `equippedItems`, and `settings`.
- **View Mode Extension**:
  - `viewMode` (`'book' | '3d' | 'split'`) and `cameraMode` (`'firstPerson' | 'isometric'`) are added to `initialState` and controlled via `ActionTypes.SET_VIEW_MODE` and `ActionTypes.SET_CAMERA_MODE`.
  - Toggling `viewMode` or `cameraMode` is strictly non-destructive: it never mutates `character`, `combat`, `visitedNodes`, `inventory`, or `chatHistory`.
- **Persistence (`src/services/storage.js`)**:
  - `LOAD_STATE` preserves saved `viewMode` and `cameraMode` while defaulting gracefully for legacy saves.

## 3. Adventure Node Graph & Spatial Compiler Audit (`src/data/adventures.js` & `src/services/spatialCompiler.js`)
- **5 Canonical Campaigns + Procedural Custom Campaigns**:
  1. `lost-mine` (10 nodes)
  2. `dragon-lair` (8 nodes)
  3. `haunted-manor` (8 nodes)
  4. `thieves-guild` (8 nodes)
  5. `ancient-temple` (8 nodes)
  6. `generateCustomAdventure` (6 nodes across 4 themes: `dungeon`, `wilderness`, `undead`, `intrigue`)
- **2D-to-3D Coordinate Compilation**:
  - Authored nodes store normalized 2D coordinates (`x: 0..100, y: 0..100`) and directed `choices` with `targetNodeId`.
  - `compileSpatialLayout(adventure)` deterministically maps each node to a 3D chamber bounding box (`worldBounds: { minX, maxX, minZ, maxZ }`, `center: { x, y, z }`, `gridWidth`, `gridDepth`, `tileSize`), resolves any synthetic or overlapping 2D coordinates via iterative AABB separation so **zero 3D bounding-box collisions** occur, and builds bidirectional cardinal/intercardinal portals (`exits`) and corridor segments connecting every reachable node.
  - Pre-compiled spatial manifests are exposed via `src/data/spatialManifest.json` and dynamically compiled at runtime for custom adventures.

## 4. Rendering, Shaders, Lighting, and Camera Audit (`src/components/game/DungeonViewport3D.jsx`)
- **Procedural Three.js Architecture**:
  - **Custom GLSL Shaders & Procedural PBR Textures**: Ashlar dungeon stonework, mossy cavern rock, volcanic obsidian/magma veins, Gothic manor wainscoting, and Azlanti temple relief shaders with procedural normal/roughness maps and animated torchlight flicker uniforms (`uTime`, `uTorchIntensity`, `uEnvironmentTheme`).
  - **Lighting Pipeline**: Warm point lights on wall sconces/braziers with distance attenuation, subtle hemisphere fill light, and a player-attached lantern light to ensure zero black screens and high-contrast depth.
  - **First-Person Grid-Stepper Camera**: Discrete WASD / Arrow-key / HUD button grid steps and 90-degree Q/E yaw turns with smooth cubic-out interpolation, plus wall collision prevention and interactive portal transitions between connected nodes.
  - **Isometric Tactical Camera**: Orthographic/perspective angled overhead tactical view (`45°` yaw, `38°` pitch) with pan/zoom and click-to-move / click-to-target enemy standees during combat.

## 5. Diegetic HUD, Auto-Mapper, 3D Physics Dice & Web Audio Audit
- **Diegetic Parchment HUD (`src/components/game/DiegeticParchmentHUD.jsx`)**: Translucent weathered parchment overlay displaying party vitals, compass/facing indicator, camera mode toggle (`1st Person` / `Isometric`), stepper navigation controls, room interaction hotkeys (Search, Loot, Rest, Enter Portal), and quick-roll triggers.
- **Fog-of-War Auto-Mapper (`src/components/game/DungeonAutomap.jsx`)**: Supports progressive fog-of-war discovery, player position/facing arrow, secret door indicators, and 1-click fast travel between discovered nodes.
- **3D Polyhedral Physics Dice (`src/components/game/PolyhedralDice3D.jsx`)**: Real-time Three.js polyhedral meshes (`d4`, `d6`, `d8`, `d10`, `d12`, `d20`) with rigid-body impulse, gravity, floor/wall restitution bounces, angular damping, and critical/fumble shader glow.
- **Enemy Tokens / 3D Standees**: Textured acrylic/parchment miniature standees on sculpted circular bases with floating HP bars, AC badges, and active target rings inside the 3D chamber.
- **Procedural Web Audio Dungeon Ambience (`src/services/soundService.js`)**: Multi-layered Web Audio synthesis (`dungeon`, `cavern`, `volcano`, `crypt`, `manor`, `city`, `temple`, `forest`) using filtered pink/brown noise drones, resonant cavern water drips, crackling torch fire, and sub-bass harmonic pads.
