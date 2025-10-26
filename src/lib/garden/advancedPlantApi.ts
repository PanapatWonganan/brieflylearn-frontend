// Advanced Plant System API Client for BoostMe Wellness Garden
import { getAuthToken } from './api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'

export interface PlantAbility {
  type: string
  name: string
  description: string
  boost_percentage: number
  duration_hours: number
  cooldown_hours: number
  available: boolean
  icon: string
}

export interface PlantEvolution {
  type: string
  name: string
  description: string
  requirements: {
    level: number
    star_seeds: number
    days_mature?: number
    friend_help?: number
  }
}

export interface BreedingPotential {
  can_breed: boolean
  reason?: string
  breeding_value?: number
  rare_traits?: string[]
  compatible_types?: string[]
}

export interface PlantAdvancedInfo {
  plant_id: string
  plant_name: string
  plant_type: string
  current_stage: number
  abilities: PlantAbility[]
  next_evolution: {
    available: boolean
    reason?: string
    evolutions?: PlantEvolution[]
  }
  breeding_potential: BreedingPotential
}

export interface AbilityActivationResult {
  ability_used: PlantAbility
  effects: {
    [key: string]: any
  }
  cooldown_until: string
}

export interface BreedingResult {
  breeding_started: boolean
  estimated_completion?: string
  offspring_preview?: {
    name: string
    traits: string[]
    rarity: string
  }
}

class AdvancedPlantAPI {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/garden/advanced-plants${endpoint}`
    
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
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return data.data
  }

  // Get plant special abilities and evolution info
  async getPlantAbilities(plantId: string): Promise<PlantAdvancedInfo> {
    return this.fetch(`/${plantId}/abilities`)
  }

  // Activate a plant's special ability
  async activateAbility(plantId: string, abilityType: string): Promise<{
    message: string
    data: AbilityActivationResult
  }> {
    const response = await fetch(`${API_BASE_URL}/garden/advanced-plants/${plantId}/activate-ability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ability_type: abilityType }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return { message: data.message, data: data.data }
  }

  // Evolve a plant to its next form
  async evolvePlant(plantId: string): Promise<{
    message: string
    evolution_result: any
  }> {
    const response = await fetch(`${API_BASE_URL}/garden/advanced-plants/${plantId}/evolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return { message: data.message, evolution_result: data.data }
  }

  // Start plant breeding process
  async breedPlants(parent1Id: string, parent2Id: string, breedingType: 'trait_mix' | 'color_variant' | 'size_variant' | 'special_hybrid'): Promise<{
    message: string
    breeding_result: BreedingResult
  }> {
    const response = await fetch(`${API_BASE_URL}/garden/advanced-plants/breed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent1_id: parent1Id,
        parent2_id: parent2Id,
        breeding_type: breedingType
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return { message: data.message, breeding_result: data.data }
  }
}

// Export singleton instance
export const advancedPlantAPI = new AdvancedPlantAPI()

// Utility functions
export const getAbilityTypeEmoji = (type: string): string => {
  const emojiMap: { [key: string]: string } = {
    xp_boost: '📚',
    star_seeds_boost: '⭐',
    garden_boost: '🌿',
    friend_boost: '🤝',
    healing: '💚'
  }
  return emojiMap[type] || '✨'
}

export const getAbilityColor = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    xp_boost: 'from-blue-400 to-blue-600',
    star_seeds_boost: 'from-yellow-400 to-yellow-600',
    garden_boost: 'from-green-400 to-green-600',
    friend_boost: 'from-pink-400 to-pink-600',
    healing: 'from-emerald-400 to-emerald-600'
  }
  return colorMap[type] || 'from-purple-400 to-purple-600'
}

export const formatDuration = (hours: number): string => {
  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return remainingHours > 0 ? `${days} วัน ${remainingHours} ชั่วโมง` : `${days} วัน`
  }
  return `${hours} ชั่วโมง`
}

export const formatCooldown = (hours: number): string => {
  if (hours >= 24) {
    return `${Math.floor(hours / 24)} วัน`
  }
  return `${hours} ชั่วโมง`
}

export const getEvolutionRarity = (evolution: PlantEvolution): string => {
  if (evolution.type.includes('rainbow')) return 'ตำนาน'
  if (evolution.type.includes('golden')) return 'หายาก'
  if (evolution.type.includes('special')) return 'พิเศษ'
  return 'ธรรมดา'
}

export const getEvolutionRarityColor = (rarity: string): string => {
  const colorMap: { [key: string]: string } = {
    'ตำนาน': 'from-purple-500 to-pink-500',
    'หายาก': 'from-yellow-500 to-orange-500',
    'พิเศษ': 'from-blue-500 to-indigo-500',
    'ธรรมดา': 'from-gray-400 to-gray-600'
  }
  return colorMap[rarity] || colorMap['ธรรมดา']
}

export const canActivateAbility = (ability: PlantAbility, lastUsed?: string): boolean => {
  if (!ability.available) return false
  
  if (lastUsed) {
    const lastUsedTime = new Date(lastUsed)
    const cooldownEndTime = new Date(lastUsedTime.getTime() + (ability.cooldown_hours * 60 * 60 * 1000))
    return new Date() >= cooldownEndTime
  }
  
  return true
}

export const getAbilityCooldownRemaining = (ability: PlantAbility, lastUsed?: string): number => {
  if (!lastUsed) return 0
  
  const lastUsedTime = new Date(lastUsed)
  const cooldownEndTime = new Date(lastUsedTime.getTime() + (ability.cooldown_hours * 60 * 60 * 1000))
  const now = new Date()
  
  if (now >= cooldownEndTime) return 0
  
  return Math.ceil((cooldownEndTime.getTime() - now.getTime()) / (1000 * 60 * 60)) // Hours remaining
}