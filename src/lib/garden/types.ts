// Garden Types for BoostMe Wellness Garden System

export interface UserGarden {
  id: string
  level: number
  xp: number
  xp_for_next_level: number
  can_level_up: boolean
  star_seeds: number
  theme: string | null
  needs_watering: boolean
  last_watered_at: string | null
}

export interface PlantType {
  id: string
  name: string
  category: 'fitness' | 'nutrition' | 'mental' | 'learning'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
  base_xp_reward: number
  star_seeds_reward: number
  unlock_level: number
  care_requirements: string
  growth_stages: number | Record<string, any>
  icon_path: string
}

export interface UserPlant {
  id: string
  name: string
  type: string
  category: 'fitness' | 'nutrition' | 'mental' | 'learning'
  stage: number
  stage_name: string
  health: number
  growth_progress: number
  needs_watering: boolean
  is_fully_grown: boolean
  can_harvest: boolean
  position: { x: number; y: number } | null
  planted_at: string
  next_water_at: string | null
}

export interface Achievement {
  id: string
  name: string
  category: 'learning' | 'fitness' | 'mental' | 'social' | 'special'
  description: string
  badge_icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xp_reward: number
  star_seeds_reward: number
  criteria: any
  is_earned: boolean
  earned_at: string | null
  progress_data: any
}

export interface DailyChallenge {
  id: string
  name: string
  description: string
  challenge_type: 'plant_care' | 'course_complete' | 'login' | 'exercise' | 'meditation'
  xp_reward: number
  star_seeds_reward: number
  is_completed: boolean
  progress: number
  target: number
}

export interface GardenActivity {
  id: string
  description: string
  icon: string
  color: string
  xp_earned: number
  star_seeds_earned: number
  time_ago: string
  created_at: string
}

export interface GardenStats {
  total_plants: number
  growing_plants: number
  mature_plants: number
  plants_need_water: number
  total_xp_today: number
  total_activities_today: number
}

export interface GardenData {
  garden: UserGarden
  plants: UserPlant[]
  recent_activities: GardenActivity[]
  stats: GardenStats
}

// Plant Category Colors - Brand Palette
export const PLANT_CATEGORY_COLORS = {
  fitness: {
    primary: '#9b4d4d', // error color (brand equivalent of red)
    light: '#d4a5a5',   // error-light
    dark: '#7a3d3d'     // error-dark
  },
  nutrition: {
    primary: '#4a7a5a', // brand-500
    light: '#96b8a0',   // brand-200
    dark: '#2d5a3d'     // brand-700
  },
  mental: {
    primary: '#5a6a7a', // brand-600 (replacing indigo)
    light: '#a0b0c0',   // brand-300
    dark: '#3d4a5a'     // brand-800
  },
  learning: {
    primary: '#4a7a5a', // brand-500 (replacing emerald)
    light: '#96b8a0',   // brand-200
    dark: '#2d5a3d'     // brand-700
  },
  mindfulness: {
    primary: '#3d4a5a', // brand-800 (replacing violet)
    light: '#a0b0c0',   // brand-300
    dark: '#2d3a4a'     // brand-900
  },
  leadership: {
    primary: '#7a6a4a', // brand-900 (replacing amber)
    light: '#c0b0a0',   // sand-300
    dark: '#5a4a3d'     // brand-900 dark
  },
  productivity: {
    primary: '#5a6a7a', // brand-600 (replacing blue)
    light: '#a0b0c0',   // brand-300
    dark: '#3d4a5a'     // brand-800
  },
  growth: {
    primary: '#4a7a5a', // brand-500 (replacing emerald)
    light: '#96b8a0',   // brand-200
    dark: '#2d5a3d'     // brand-700
  },
  health: {
    primary: '#6a5a7a', // brand-700 (replacing pink)
    light: '#b0a0c0',   // brand-400
    dark: '#4a3d5a'     // brand-800
  },
  finance: {
    primary: '#5a7a6a', // brand-500 (replacing teal)
    light: '#a0c0b0',   // brand-300
    dark: '#3d5a4a'     // brand-700
  },
  creativity: {
    primary: '#6a5a7a', // brand-700 (replacing purple)
    light: '#b0a0c0',   // brand-400
    dark: '#4a3d5a'     // brand-800
  }
} as const

// Rarity Colors - Brand Palette with Solid Colors
export const RARITY_COLORS = {
  common: {
    primary: '#8a8a7a', // sand-400
    light: '#d4d4c4',   // sand-200
    gradient: 'bg-sand-400 text-white'
  },
  rare: {
    primary: '#5a6a7a', // brand-600
    light: '#a0b0c0',   // brand-300
    gradient: 'bg-brand-500 text-white'
  },
  epic: {
    primary: '#6a5a7a', // brand-700
    light: '#b0a0c0',   // brand-400
    gradient: 'bg-brand-700 text-white'
  },
  legendary: {
    primary: '#7a6a4a', // brand-900
    light: '#c0b0a0',   // sand-300
    gradient: 'bg-brand-900 text-white'
  }
} as const

// AI Lab Project Stage Names in Thai
export const PLANT_STAGE_NAMES = {
  0: 'แนวคิด', // Concept 💡
  1: 'ต้นแบบ', // Prototype 🔧
  2: 'ทดสอบ', // Beta 🧪
  3: 'พร้อมใช้', // Production ⚙️
  4: 'ขยายผล' // Scaled 🚀
} as const

// Achievement Category Icons - AI Lab Theme
export const ACHIEVEMENT_CATEGORY_ICONS = {
  learning: '🤖', // AI Mastery
  fitness: '💼', // Business Impact
  mental: '💡', // Innovation
  social: '🤝', // Sharing
  special: '🏆'
} as const