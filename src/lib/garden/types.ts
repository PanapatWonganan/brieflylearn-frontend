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
  growth_stages: {
    [key: number]: {
      name: string
      duration_hours: number
    }
  }
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

// Plant Category Colors
export const PLANT_CATEGORY_COLORS = {
  fitness: {
    primary: '#EF4444', // red-500
    light: '#FECACA',   // red-200
    dark: '#B91C1C'     // red-700
  },
  nutrition: {
    primary: '#F97316', // orange-500
    light: '#FED7AA',   // orange-200
    dark: '#C2410C'     // orange-700
  },
  mental: {
    primary: '#6366F1', // indigo-500
    light: '#C7D2FE',   // indigo-200
    dark: '#3730A3'     // indigo-700
  },
  learning: {
    primary: '#10B981', // emerald-500
    light: '#A7F3D0',   // emerald-200
    dark: '#047857'     // emerald-700
  },
  mindfulness: {
    primary: '#8B5CF6', // violet-500
    light: '#DDD6FE',   // violet-200
    dark: '#6D28D9'     // violet-700
  },
  leadership: {
    primary: '#F59E0B', // amber-500
    light: '#FDE68A',   // amber-200
    dark: '#D97706'     // amber-700
  },
  productivity: {
    primary: '#3B82F6', // blue-500
    light: '#BFDBFE',   // blue-200
    dark: '#1D4ED8'     // blue-700
  },
  growth: {
    primary: '#10B981', // emerald-500
    light: '#A7F3D0',   // emerald-200
    dark: '#047857'     // emerald-700
  },
  health: {
    primary: '#EC4899', // pink-500
    light: '#FBCFE8',   // pink-200
    dark: '#BE185D'     // pink-700
  },
  finance: {
    primary: '#14B8A6', // teal-500
    light: '#99F6E4',   // teal-200
    dark: '#0F766E'     // teal-700
  },
  creativity: {
    primary: '#A855F7', // purple-500
    light: '#E9D5FF',   // purple-200
    dark: '#7E22CE'     // purple-700
  }
} as const

// Rarity Colors
export const RARITY_COLORS = {
  common: {
    primary: '#6B7280', // gray-500
    light: '#E5E7EB',   // gray-200
    gradient: 'from-gray-400 to-gray-600'
  },
  rare: {
    primary: '#3B82F6', // blue-500
    light: '#BFDBFE',   // blue-200
    gradient: 'from-blue-400 to-blue-600'
  },
  epic: {
    primary: '#8B5CF6', // violet-500
    light: '#DDD6FE',   // violet-200
    gradient: 'from-violet-400 to-violet-600'
  },
  legendary: {
    primary: '#F59E0B', // amber-500
    light: '#FDE68A',   // amber-200
    gradient: 'from-amber-400 to-amber-600'
  }
} as const

// Plant Stage Names in Thai
export const PLANT_STAGE_NAMES = {
  0: 'เมล็ด',
  1: 'หน่อ',
  2: 'ต้นอ่อน',
  3: 'ก่อนบาน',
  4: 'บาน/โต'
} as const

// Achievement Category Icons
export const ACHIEVEMENT_CATEGORY_ICONS = {
  learning: '📚',
  fitness: '💪',
  mental: '🧘‍♀️',
  social: '🤝',
  special: '🏆'
} as const