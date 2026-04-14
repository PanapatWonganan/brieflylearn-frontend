// Sprite Configuration for Sprout Lands Asset Pack
// Asset pack by Cup Nooble: https://cupnooble.itch.io/sprout-lands-asset-pack
// Credit: Assets from Sprout Lands by Cup Nooble
//
// File structure (clean paths, no spaces):
//   /public/assets/sprites/sprout-lands/
//     crops/farming-plants.png          80x240  (5 cols x 15 rows @16x16)
//     characters/basic-character.png    192x192 (6 cols x 6 rows @32x32)
//     characters/premium-character.png  384x1152
//     characters/basic-actions.png      96x576  (2 cols x 18 rows @48x32)
//     characters/water-frames.png       432x144
//     characters/tools.png
//     tiles/grass.png                   176x112
//     tiles/tilled-dirt.png
//     objects/mushrooms-flowers-stones.png  192x80
//     objects/trees-stumps-bushes.png       192x112
//     animals/chicken.png              64x32
//     animals/cow.png                  96x64
//     items/farming-plants-items.png   32x240

// ============================================================
// Types
// ============================================================

export interface SpriteFrame {
  /** X position in the sprite sheet (px) */
  x: number
  /** Y position in the sprite sheet (px) */
  y: number
  /** Width of a single frame (px) */
  width: number
  /** Height of a single frame (px) */
  height: number
}

export interface SpriteAnimation {
  /** Path to the sprite sheet image relative to /public */
  sheet: string
  /** Array of frames in the animation */
  frames: SpriteFrame[]
  /** Frame duration in ms (for animated sprites) */
  frameDuration?: number
  /** Whether this animation loops */
  loop?: boolean
}

export interface PlantSpriteConfig {
  /** Display name */
  name: string
  /** Sprites for each growth stage (0-4) */
  stages: Record<number, SpriteAnimation>
  /** Category mapping for this sprite set */
  category: string
}

export interface CharacterSpriteConfig {
  /** Idle animation */
  idle: SpriteAnimation
  /** Watering animation (played when user waters a plant) */
  water: SpriteAnimation
  /** Harvest/celebrate animation */
  harvest?: SpriteAnimation
  /** Walk animation */
  walk?: SpriteAnimation
}

export interface SpriteThemeConfig {
  /** Unique theme ID */
  id: string
  /** Display name */
  name: string
  /** Description */
  description: string
  /** Base path for all sprites in this theme */
  basePath: string
  /** Tile size used in this pack (px) */
  tileSize: number
  /** Scale factor for rendering (e.g., 2 = render at 2x) */
  renderScale: number
  /** Available plant sprites mapped by category */
  plants: Record<string, PlantSpriteConfig>
  /** Character sprite (optional - shown in garden view) */
  character?: CharacterSpriteConfig
  /** Background tile sprite */
  backgroundTile?: SpriteAnimation
  /** Whether image-rendering: pixelated should be applied */
  pixelated: boolean
}

// ============================================================
// Helper: Generate frames from a horizontal sprite strip
// ============================================================

function horizontalFrames(
  startX: number,
  y: number,
  width: number,
  height: number,
  count: number
): SpriteFrame[] {
  return Array.from({ length: count }, (_, i) => ({
    x: startX + i * width,
    y,
    width,
    height,
  }))
}

// Helper: Generate a single frame
function singleFrame(x: number, y: number, w: number, h: number): SpriteFrame[] {
  return [{ x, y, width: w, height: h }]
}

// ============================================================
// Sprout Lands Theme Configuration
// ============================================================
//
// farming-plants.png layout (80x240, 16x16 tiles):
// Each row is one crop type with 5 growth stages (columns 0-4)
//
// Row 0  (y=0):   Tomato     - seed, sprout, small plant, flowering, ripe tomato
// Row 1  (y=16):  Wheat/Grain - seed, sprout, growing, tall, golden wheat
// Row 2  (y=32):  Carrot     - seed, sprout, leaves growing, big leaves, carrot visible
// Row 3  (y=48):  Pumpkin    - seed, sprout, vine, small pumpkin, big pumpkin
// Row 4  (y=64):  Cabbage    - seed, sprout, small head, medium, full cabbage
// Row 5  (y=80):  Sunflower  - seed, sprout, stem growing, bud, full sunflower
// Row 6  (y=96):  Turnip     - seed, sprout, leaves, big leaves, turnip visible
// Row 7  (y=112): Corn       - seed, sprout, small stalk, tall stalk, corn ears
// Row 8  (y=128): Radish     - seed, sprout, leaves, big leaves, radish
// Row 9  (y=144): Rose       - seed, sprout, stem, bud, rose bloom
// Row 10 (y=160): Eggplant   - seed, sprout, small, flowering, eggplant
// Row 11 (y=176): Watermelon - seed, sprout, vine, small melon, big watermelon
// Row 12 (y=192): Berry      - seed, sprout, bush, small berries, full berries
// Row 13 (y=208): Blueberry  - seed, sprout, bush, small berries, blue berries
// Row 14 (y=224): Potato     - seed, sprout, leaves, big leaves, potato
//
// basic-character.png layout (192x192, 32x32 per frame):
// 6 columns x 6 rows
// Row 0 (y=0):   Idle facing down      (6 frames)
// Row 1 (y=32):  Idle facing up         (6 frames)
// Row 2 (y=64):  Walk/Idle facing right (6 frames)
// Row 3 (y=96):  Walk/Idle facing left  (6 frames)
// Row 4 (y=128): Walk facing down       (6 frames)
// Row 5 (y=160): Walk facing up         (6 frames)
//
// ============================================================

const BASE = '/assets/sprites/sprout-lands'
const CROPS = `${BASE}/crops/farming-plants.png`
const CHAR = `${BASE}/characters/basic-character.png`
const T = 16 // Tile size for crops
const C = 32 // Tile size for character

// Helper: create 5 crop stages for a given row in farming-plants.png
function cropStages(row: number): Record<number, SpriteAnimation> {
  const y = row * T
  return {
    0: { sheet: CROPS, frames: singleFrame(0, y, T, T) },
    1: { sheet: CROPS, frames: singleFrame(T, y, T, T) },
    2: { sheet: CROPS, frames: singleFrame(T * 2, y, T, T) },
    3: { sheet: CROPS, frames: singleFrame(T * 3, y, T, T) },
    4: { sheet: CROPS, frames: singleFrame(T * 4, y, T, T) },
  }
}

export const SPROUT_LANDS_THEME: SpriteThemeConfig = {
  id: 'sprout-lands',
  name: 'Sprout Lands',
  description: 'สไตล์พิกเซลอาร์ตน่ารัก จากชุด Sprout Lands โดย Cup Nooble',
  basePath: BASE,
  tileSize: T,
  renderScale: 4,
  pixelated: true,

  plants: {
    // ---------------------------------------------------------
    // Main 4 categories → mapped to visually distinct crops
    // ---------------------------------------------------------
    fitness: {
      name: 'มะเขือเทศ',
      category: 'fitness',
      stages: cropStages(0), // Row 0: Tomato
    },
    nutrition: {
      name: 'แครอท',
      category: 'nutrition',
      stages: cropStages(2), // Row 2: Carrot
    },
    mental: {
      name: 'ดอกทานตะวัน',
      category: 'mental',
      stages: cropStages(5), // Row 5: Sunflower
    },
    learning: {
      name: 'ฟักทอง',
      category: 'learning',
      stages: cropStages(3), // Row 3: Pumpkin
    },

    // ---------------------------------------------------------
    // Extended categories → mapped to remaining crops
    // ---------------------------------------------------------
    mindfulness: {
      name: 'กุหลาบ',
      category: 'mindfulness',
      stages: cropStages(9), // Row 9: Rose
    },
    leadership: {
      name: 'ข้าวสาลี',
      category: 'leadership',
      stages: cropStages(1), // Row 1: Wheat
    },
    productivity: {
      name: 'ข้าวโพด',
      category: 'productivity',
      stages: cropStages(7), // Row 7: Corn
    },
    growth: {
      name: 'กะหล่ำ',
      category: 'growth',
      stages: cropStages(4), // Row 4: Cabbage
    },
    health: {
      name: 'แตงโม',
      category: 'health',
      stages: cropStages(11), // Row 11: Watermelon
    },
    finance: {
      name: 'มันฝรั่ง',
      category: 'finance',
      stages: cropStages(14), // Row 14: Potato
    },
    creativity: {
      name: 'มะเขือม่วง',
      category: 'creativity',
      stages: cropStages(10), // Row 10: Eggplant
    },
  },

  // ---------------------------------------------------------
  // Character sprite (farmer)
  // basic-character.png: 192x192, 6 cols x 6 rows, 32x32 per frame
  // ---------------------------------------------------------
  character: {
    idle: {
      sheet: CHAR,
      frames: horizontalFrames(0, 0, C, C, 6), // Row 0: idle facing down
      frameDuration: 250,
      loop: true,
    },
    walk: {
      sheet: CHAR,
      frames: horizontalFrames(0, C * 4, C, C, 6), // Row 4: walk facing down
      frameDuration: 150,
      loop: true,
    },
    water: {
      // Use basic-actions.png for watering (96x576, 2 cols x 18 rows @48x32)
      // Watering action is in the action sheet
      sheet: `${BASE}/characters/basic-actions.png`,
      frames: horizontalFrames(0, 0, 48, 32, 2), // First action row
      frameDuration: 300,
      loop: false,
    },
  },

  // ---------------------------------------------------------
  // Background grass tile
  // grass.png: 176x112, top-left tile is a basic grass
  // ---------------------------------------------------------
  backgroundTile: {
    sheet: `${BASE}/tiles/grass.png`,
    frames: singleFrame(0, 0, T, T),
  },
}

// ============================================================
// All available crop types for reference
// Maps row index in farming-plants.png to crop name
// ============================================================
export const CROP_ROW_MAP = {
  0: 'tomato',
  1: 'wheat',
  2: 'carrot',
  3: 'pumpkin',
  4: 'cabbage',
  5: 'sunflower',
  6: 'turnip',
  7: 'corn',
  8: 'radish',
  9: 'rose',
  10: 'eggplant',
  11: 'watermelon',
  12: 'berry',
  13: 'blueberry',
  14: 'potato',
} as const

// ============================================================
// Theme Registry
// ============================================================

export const SPRITE_THEMES: Record<string, SpriteThemeConfig> = {
  'sprout-lands': SPROUT_LANDS_THEME,
}

// ============================================================
// Rendering mode type
// ============================================================

export type RenderingMode = 'emoji' | 'sprite'

export const DEFAULT_RENDERING_MODE: RenderingMode = 'emoji'

// ============================================================
// Helper: Get the sprite for a given plant category + stage
// ============================================================

export function getPlantSprite(
  themeId: string,
  category: string,
  stage: number
): SpriteAnimation | null {
  const theme = SPRITE_THEMES[themeId]
  if (!theme) return null

  const plant = theme.plants[category]
  if (!plant) {
    // Fallback: if category not mapped, use learning (pumpkin)
    const fallback = theme.plants['learning']
    if (!fallback) return null
    return fallback.stages[stage] ?? null
  }

  return plant.stages[stage] ?? null
}

// ============================================================
// Helper: Get theme config
// ============================================================

export function getSpriteTheme(themeId: string): SpriteThemeConfig | null {
  return SPRITE_THEMES[themeId] ?? null
}
