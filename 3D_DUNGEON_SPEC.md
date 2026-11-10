# 3D Dungeon Specification (`3D_DUNGEON_SPEC.md`)

## Phase 1: Architecture Audit & Non-Destructive State Wiring
- Audit `gameState.js`, `GameContext.jsx`, and `GameInterface.jsx`.
- Add `viewMode` (`'book' | '3d' | 'split'`) and `cameraMode` (`'firstPerson' | 'isometric'`) to `gameReducer` (`SET_VIEW_MODE`, `SET_CAMERA_MODE`) without mutating gameplay state.

## Phase 2: Deterministic Spatial Graph Compiler & Layout Manifest
- Compile 100% of nodes across all 5 canonical campaigns (`lost-mine`, `dragon-lair`, `haunted-manor`, `thieves-guild`, `ancient-temple`) and procedural custom adventures (`generateCustomAdventure`) into 3D chamber geometries.
- Guarantee zero unintended 3D AABB bounding-box collisions, deterministic output across repeated compilations, full graph reachability, and valid cardinal/portal exits for every node.
- Export pre-generated spatial layout manifest (`src/data/spatialManifest.json`) and runtime compiler (`src/services/spatialCompiler.js`).

## Phase 3: Procedural Three.js Dungeon Renderer, Custom Shaders/Lighting & Dual Cameras
1. **Procedural Chamber & Corridor Geometry**:
   - Render tiled stone floors, ceiling vaults/beams, perimeter walls with archway portals corresponding to node exits, corner pillars, flickering wall torches/braziers, and node-specific props (treasure chest, runic altar/pedestal, trap pressure plate, rest campfire).
2. **Custom Shaders & Dynamic Lighting**:
   - GLSL procedural stone/environment shader materials and canvas-synthesized normal/diffuse maps tailored to each node's `environment` (`dungeon`, `cavern`, `volcano`, `crypt`, `manor`, `city`, `temple`, `forest`, `town`).
   - Animated torchlight point lights + hemisphere ambient fill + player lantern light ensuring clear visibility and zero black screens or wall clipping.
3. **First-Person Grid-Stepper Camera**:
   - Grid-aligned movement (`W/A/S/D` or Arrow keys + on-screen stepper controls) and `Q/E` 90° snap rotation with smooth interpolation.
   - Collision detection against chamber walls (`grid` bounds) so the camera never clips into walls.
   - Stepping into or clicking a glowing archway portal transitions `currentNodeId` in the shared game state.
4. **Isometric Tactical Camera**:
   - Overhead tactical camera framing the active 3D chamber, grid tiles, party tokens, and enemy standees with smooth camera transitions and orbital yaw rotation.

## Phase 4: Diegetic Parchment HUD, Fog-of-War Auto-Mapper, 3D Physics Dice, Standees & Web Audio
1. **Diegetic Parchment HUD (`DiegeticParchmentHUD.jsx`)**:
   - Parchment-styled overlay over the 3D viewport with chamber title, act badge, compass rose, camera switcher (`First-Person` / `Isometric`), grid-stepper pad, and contextual room actions (Search, Disarm, Loot, Rest, Combat, Portal exits).
2. **Fog-of-War Auto-Mapper (`DungeonAutomap.jsx`)**:
   - Interactive mini-map and full automap showing visited chambers, shrouded fog-of-war frontier chambers, secret doors, player directional chevron, and fast-travel node selection.
3. **3D Polyhedral Physics Dice (`PolyhedralDice3D.jsx`)**:
   - Interactive 3D physics dice tray rendering `d4`, `d6`, `d8`, `d10`, `d12`, and `d20` polyhedra with rigid-body bounce physics, angular spin, and tabletop clatter audio.
4. **Enemy Tokens / 3D Standees**:
   - 3D tabletop miniature standees for monsters, bosses, companions, and the player hero inside the 3D chamber, complete with portrait textures, base rings, HP bars, and click-to-target combat integration.
5. **Procedural Web Audio Dungeon Ambience (`soundService.js`)**:
   - Procedural Web Audio API soundscape generator (`startAmbient`, `stopAmbient`, `toggleAmbient`) synthesizing theme-reactive dungeon drones, flickering fire crackles, and cavern water droplets.

## Phase 5: End-to-End Visual Verification & Build Gate
- Verify 3D dungeon rendering and navigation across at least 5 connected nodes using headless browser automation (Playwright).
- Inspect captured screenshots across nodes, camera modes (`First-Person` and `Isometric`), diegetic HUD, auto-mapper, and 3D dice to confirm zero black screens, shader errors, or wall clipping.
- Confirm all unit tests (`npm test`), integration tests (`npx vitest run`), linter (`npm run lint`), and production bundle (`npm run build`) pass with zero errors.
