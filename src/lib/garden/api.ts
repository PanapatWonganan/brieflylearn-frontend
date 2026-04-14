// Garden API Client for BoostMe Wellness Garden

import { 
  GardenData, 
  PlantType, 
  Achievement, 
  DailyChallenge,
  UserPlant 
} from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'

// Utility function to get auth token
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null

  // Try multiple token keys for backward compatibility
  const possibleKeys = ['boostme_token', 'auth_token']

  for (const key of possibleKeys) {
    const token = localStorage.getItem(key)
    if (token) {
      return token
    }
  }

  return null
}

class GardenAPI {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/garden${endpoint}`
    
    // Get auth token using utility function
    const token = getAuthToken()

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const err = new Error(errorData.message || `HTTP error! status: ${response.status}`)
      ;(err as any).status = response.status
      ;(err as any).data = errorData
      throw err
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return data?.data ?? null
  }

  // Garden Management
  async getMyGarden(): Promise<GardenData> {
    return this.fetch('/my-garden')
  }

  async waterGarden(): Promise<{
    garden: { star_seeds: number; xp: number; level: number; needs_watering: boolean }
    plants_watered: number
    rewards: { xp: number; star_seeds: number }
  }> {
    return this.fetch('/water-garden', {
      method: 'PUT',
    })
  }

  // Plant Management
  async getPlantTypes(): Promise<PlantType[]> {
    return this.fetch('/plant-types')
  }

  async plantSeed(
    plantTypeId: string, 
    options: { 
      custom_name?: string
      position?: { x: number; y: number }
    } = {}
  ): Promise<{
    plant: UserPlant
    garden: { star_seeds: number; xp: number; level: number }
  }> {
    return this.fetch(`/plant/${plantTypeId}`, {
      method: 'POST',
      body: JSON.stringify(options),
    })
  }

  async waterPlant(userPlantId: string): Promise<{
    plant: UserPlant
    grew_up: boolean
    rewards: { xp: number; star_seeds: number }
  }> {
    return this.fetch(`/plants/${userPlantId}/water`, {
      method: 'PUT',
    })
  }

  async harvestPlant(userPlantId: string): Promise<{
    plant: { id: string; name: string; harvested_at: string }
    rewards: { xp: number; star_seeds: number; message: string }
  }> {
    return this.fetch(`/plants/${userPlantId}/harvest`, {
      method: 'POST',
    })
  }

  // Achievements
  async getAchievements(): Promise<{
    achievements: { [category: string]: Achievement[] }
    stats: {
      total_achievements: number
      earned_achievements: number
      completion_percentage: number
      total_xp_from_achievements: number
      recent_achievements: Array<{
        name: string
        badge_icon: string
        earned_at: string
        time_ago: string
      }>
    }
  }> {
    return this.fetch('/achievements')
  }

  async getAchievementsByCategory(category: string): Promise<{
    category: string
    achievements: Achievement[]
  }> {
    return this.fetch(`/achievements/category/${category}`)
  }

  async checkAchievements(): Promise<{
    new_achievements: Achievement[]
    count: number
  }> {
    return this.fetch('/achievements/check', {
      method: 'POST',
    })
  }

  async getMyAchievements(): Promise<{
    achievements: Achievement[]
    grouped_by_category: { [category: string]: Achievement[] }
    recent_achievements: Achievement[]
    total_count: number
  }> {
    return this.fetch('/achievements/my-achievements')
  }

  // Daily Challenges
  async getTodayChallenges(): Promise<{
    challenges: DailyChallenge[]
    stats: {
      total_challenges: number
      completed_challenges: number
      completion_percentage: number
      total_xp_available: number
      total_star_seeds_available: number
      xp_earned_today: number
      star_seeds_earned_today: number
    }
    date: string
  }> {
    return this.fetch('/challenges/today')
  }

  async getChallengeHistory(days: number = 7): Promise<{
    challenges: { [date: string]: DailyChallenge[] }
    stats: {
      total_challenges: number
      completed_challenges: number
      completion_rate: number
      total_xp_earned: number
      total_star_seeds_earned: number
      streak_days: number
      best_category: string | null
    }
    period: {
      start_date: string
      end_date: string
      days: number
    }
  }> {
    return this.fetch(`/challenges/history?days=${days}`)
  }

  async updateChallengeProgress(
    challengeId: string, 
    options: { 
      increment?: number
      progress_data?: any 
    } = {}
  ): Promise<{
    challenge: { id: string; name: string; is_completed: boolean }
    progress: {
      current: number
      target: number
      percentage: number
      remaining: number
      status: string
    }
    rewards?: { xp: number; star_seeds: number; message: string }
  }> {
    return this.fetch(`/challenges/${challengeId}/progress`, {
      method: 'PUT',
      body: JSON.stringify(options),
    })
  }

  async getLeaderboard(period: 'week' | 'month' | 'all-time' = 'week', limit: number = 10): Promise<{
    leaderboard: Array<{
      rank: number
      user: { id: string; name: string; avatar_url: string | null }
      challenges_completed: number
      total_xp: number
      total_star_seeds: number
    }>
    user_stats: {
      rank: number | null
      challenges_completed: number
      total_xp: number
      total_star_seeds: number
    }
    period: string
    start_date: string
  }> {
    return this.fetch(`/challenges/leaderboard?period=${period}&limit=${limit}`)
  }
}

// Export singleton instance
export const gardenAPI = new GardenAPI()

// Export utility functions
export const formatThaiDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return 'เมื่อสักครู่'
  if (diffMinutes < 60) return `${diffMinutes} นาทีที่แล้ว`
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`
  
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatXP = (xp: number): string => {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M`
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`
  return xp.toString()
}

export const getPlantEmoji = (category: string): string => {
  const emojis = {
    fitness: '🌹',
    nutrition: '🍎', 
    mental: '💜',
    learning: '🌳'
  }
  return emojis[category as keyof typeof emojis] || '🌱'
}

export const getStageEmoji = (stage: number): string => {
  const emojis = ['🌰', '🌱', '🌿', '🌺', '🌸']
  return emojis[stage] || '🌱'
}