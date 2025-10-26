'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { gardenAPI } from '@/lib/garden/api'
import { useAuth } from '@/contexts/AuthContextNew'
import { 
  GardenData, 
  PlantType, 
  Achievement, 
  DailyChallenge,
  UserPlant 
} from '@/lib/garden/types'

interface GardenContextType {
  // Garden State
  gardenData: GardenData | null
  plantTypes: PlantType[]
  achievements: { [category: string]: Achievement[] }
  todayChallenges: DailyChallenge[]
  
  // Loading States
  isLoading: boolean
  isPlanting: boolean
  isWatering: boolean
  isHarvesting: boolean
  
  // Actions
  refreshGarden: () => Promise<void>
  clearGardenData: () => void
  plantSeed: (plantTypeId: string, options?: { custom_name?: string; position?: { x: number; y: number } }) => Promise<void>
  waterPlant: (userPlantId: string) => Promise<void>
  harvestPlant: (userPlantId: string) => Promise<void>
  waterGarden: () => Promise<void>
  updateChallengeProgress: (challengeId: string, increment?: number) => Promise<void>
  
  // Utilities
  getPlantById: (id: string) => UserPlant | undefined
  getPlantTypeById: (id: string) => PlantType | undefined
  canAffordPlant: (plantType: PlantType) => boolean
}

const GardenContext = createContext<GardenContextType | undefined>(undefined)

export const useGarden = () => {
  const context = useContext(GardenContext)
  if (context === undefined) {
    throw new Error('useGarden must be used within a GardenProvider')
  }
  return context
}

interface GardenProviderProps {
  children: ReactNode
}

export const GardenProvider: React.FC<GardenProviderProps> = ({ children }) => {
  // Handle SSR by checking if we're on client side
  const [isClient, setIsClient] = useState(false)
  
  // Always call useAuth (React hooks must be called unconditionally)
  let auth = { user: null, isAuthenticated: false }
  try {
    auth = useAuth()
  } catch (error) {
    // AuthProvider not available during SSR
  }
  
  const { user, isAuthenticated } = auth
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const [gardenData, setGardenData] = useState<GardenData | null>(null)
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([])
  const [achievements, setAchievements] = useState<{ [category: string]: Achievement[] }>({})
  const [todayChallenges, setTodayChallenges] = useState<DailyChallenge[]>([])
  
  const [isLoading, setIsLoading] = useState(true)
  const [isPlanting, setIsPlanting] = useState(false)
  const [isWatering, setIsWatering] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)

  // Clear all garden data
  const clearGardenData = () => {
    setGardenData(null)
    setPlantTypes([])
    setAchievements({})
    setTodayChallenges([])
    setIsLoading(false)
  }

  // Initialize garden data
  const initializeGarden = async () => {
    console.log('🌱 initializeGarden called:', { isClient, isAuthenticated, user: user?.email })
    
    // Don't load garden data if user is not authenticated or not on client
    if (!isClient || !isAuthenticated || !user) {
      console.log('🚫 Not loading garden:', { isClient, isAuthenticated, hasUser: !!user })
      clearGardenData()
      return
    }

    try {
      setIsLoading(true)
      
      // Load garden data first (most important)
      try {
        console.log('🌱 Calling gardenAPI.getMyGarden()')
        const gardenData = await gardenAPI.getMyGarden()
        console.log('✅ Garden data loaded:', gardenData)
        setGardenData(gardenData)
      } catch (error) {
        console.error('❌ Failed to load garden data:', error)
        // If auth failed, clear data
        if (error?.message?.includes('401') || error?.message?.includes('Authentication')) {
          clearGardenData()
          return
        }
        // Set mock data for other errors
        setGardenData({
          garden: {
            id: 'demo',
            level: 1,
            xp: 100,
            xp_for_next_level: 1000,
            can_level_up: false,
            star_seeds: 100,
            theme: 'default',
            needs_watering: false,
            last_watered_at: null
          },
          plants: [],
          recent_activities: [],
          stats: {
            total_plants: 0,
            growing_plants: 0,
            mature_plants: 0,
            plants_need_water: 0,
            total_xp_today: 0,
            total_activities_today: 0
          }
        })
      }

      // Load other data in parallel (non-blocking)
      const [plantTypesResult, achievementsResult, challengesResult] = await Promise.allSettled([
        gardenAPI.getPlantTypes(),
        gardenAPI.getAchievements(),
        gardenAPI.getTodayChallenges()
      ])

      if (plantTypesResult.status === 'fulfilled') {
        setPlantTypes(plantTypesResult.value)
      } else {
        console.error('Failed to load plant types:', plantTypesResult.reason)
        setPlantTypes([]) // Empty array as fallback
      }

      if (achievementsResult.status === 'fulfilled') {
        setAchievements(achievementsResult.value.achievements)
      } else {
        console.error('Failed to load achievements:', achievementsResult.reason)
        setAchievements({}) // Empty object as fallback
      }

      if (challengesResult.status === 'fulfilled') {
        setTodayChallenges(challengesResult.value.challenges)
      } else {
        console.error('Failed to load challenges:', challengesResult.reason)
        setTodayChallenges([]) // Empty array as fallback
      }

    } catch (error) {
      console.error('Failed to initialize garden:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Refresh garden data
  const refreshGarden = async () => {
    try {
      const data = await gardenAPI.getMyGarden()
      setGardenData(data)
    } catch (error) {
      console.error('Failed to refresh garden:', error)
      throw error
    }
  }

  // Plant a seed
  const plantSeed = async (
    plantTypeId: string, 
    options: { custom_name?: string; position?: { x: number; y: number } } = {}
  ) => {
    try {
      setIsPlanting(true)
      const result = await gardenAPI.plantSeed(plantTypeId, options)
      
      // Update garden data with new plant and updated garden stats
      if (gardenData) {
        setGardenData({
          ...gardenData,
          garden: {
            ...gardenData.garden,
            star_seeds: result.garden.star_seeds,
            xp: result.garden.xp,
            level: result.garden.level
          },
          plants: [...gardenData.plants, result.plant]
        })
      }
      
      return result
    } catch (error) {
      console.error('Failed to plant seed:', error)
      throw error
    } finally {
      setIsPlanting(false)
    }
  }

  // Water a plant
  const waterPlant = async (userPlantId: string) => {
    try {
      setIsWatering(true)
      const result = await gardenAPI.waterPlant(userPlantId)
      
      // Update plant in garden data
      if (gardenData) {
        const updatedPlants = gardenData.plants.map(plant => 
          plant.id === userPlantId ? result.plant : plant
        )
        setGardenData({
          ...gardenData,
          plants: updatedPlants
        })
      }
      
      return result
    } catch (error) {
      console.error('Failed to water plant:', error)
      throw error
    } finally {
      setIsWatering(false)
    }
  }

  // Harvest a plant
  const harvestPlant = async (userPlantId: string) => {
    try {
      setIsHarvesting(true)
      const result = await gardenAPI.harvestPlant(userPlantId)
      
      // Refresh garden to get updated data
      await refreshGarden()
      
      return result
    } catch (error) {
      console.error('Failed to harvest plant:', error)
      throw error
    } finally {
      setIsHarvesting(false)
    }
  }

  // Water entire garden
  const waterGarden = async () => {
    try {
      setIsWatering(true)
      const result = await gardenAPI.waterGarden()
      
      // Refresh garden to get updated data
      await refreshGarden()
      
      return result
    } catch (error) {
      console.error('Failed to water garden:', error)
      throw error
    } finally {
      setIsWatering(false)
    }
  }

  // Update challenge progress
  const updateChallengeProgress = async (challengeId: string, increment: number = 1) => {
    try {
      const result = await gardenAPI.updateChallengeProgress(challengeId, { increment })
      
      // Update challenge in state
      const updatedChallenges = todayChallenges.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, progress: result.progress.current, is_completed: result.challenge.is_completed }
          : challenge
      )
      setTodayChallenges(updatedChallenges)
      
      // If challenge completed, refresh garden for XP/rewards
      if (result.challenge.is_completed) {
        await refreshGarden()
      }
      
      return result
    } catch (error) {
      console.error('Failed to update challenge progress:', error)
      throw error
    }
  }

  // Utility functions
  const getPlantById = (id: string): UserPlant | undefined => {
    return gardenData?.plants.find(plant => plant.id === id)
  }

  const getPlantTypeById = (id: string): PlantType | undefined => {
    return plantTypes.find(type => type.id === id)
  }

  const canAffordPlant = (plantType: PlantType): boolean => {
    if (!plantType || !gardenData) return false
    
    // ราคาตามความหายาก
    const costs: { [key: string]: number } = {
      common: 50,
      rare: 100,
      epic: 200,
      legendary: 500
    }
    const cost = costs[plantType.rarity] || 50
    
    return gardenData.garden.star_seeds >= cost
  }

  // Initialize on mount and when user changes (only on client)
  useEffect(() => {
    if (isClient) {
      initializeGarden()
    }
  }, [isClient, user, isAuthenticated])

  // Clear data when user logs out (only on client)
  useEffect(() => {
    if (isClient && (!isAuthenticated || !user)) {
      clearGardenData()
    }
  }, [isClient, isAuthenticated, user])

  const value: GardenContextType = {
    // State
    gardenData,
    plantTypes,
    achievements,
    todayChallenges,
    
    // Loading
    isLoading,
    isPlanting,
    isWatering,
    isHarvesting,
    
    // Actions
    refreshGarden,
    clearGardenData,
    plantSeed,
    waterPlant,
    harvestPlant,
    waterGarden,
    updateChallengeProgress,
    
    // Utilities
    getPlantById,
    getPlantTypeById,
    canAffordPlant
  }

  return (
    <GardenContext.Provider value={value}>
      {children}
    </GardenContext.Provider>
  )
}

export default GardenContext