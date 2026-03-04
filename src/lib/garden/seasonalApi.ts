// Seasonal Events API Client for BoostMe Wellness Garden

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'

export interface SeasonalEvent {
  id: string
  name: string
  description: string
  type: 'thai_festival' | 'national_day' | 'seasonal_change' | 'weather_event'
  start_date: string
  end_date: string
  activities: EventActivity[]
  community_goal?: CommunityGoal
  special_effects?: { [key: string]: string }
}

export interface EventActivity {
  name: string
  description: string
  reward_xp: number
  reward_star_seeds: number
  special_item?: string
  special_plant?: string
}

export interface CommunityGoal {
  description: string
  progress: number
  target: number
  reward: string
}

export interface WeatherInfo {
  type: 'sunny' | 'cloudy' | 'rainy' | 'storm' | 'misty'
  temperature: number
  humidity: number
  wind_speed: number
  description: string
  effects: string[]
}

export interface WeatherEffects {
  water_consumption: number
  growth_speed: number
  health_change: number
  xp_modifier: number
  special_bonuses: string[]
}

export interface WeatherForecast {
  date: string
  day_name: string
  weather: string
  temperature_high: number
  temperature_low: number
  rain_chance: number
}

export interface SeasonalBoost {
  name: string
  description: string
  effects: { [key: string]: string }
}

export interface ThaiCalendarInfo {
  buddhist_year: number
  thai_month: string
  lunar_day: number
  auspicious_time: string
  lucky_plants: string[]
}

export interface SeasonalPlant {
  name: string
  description: string
  special_abilities: string[]
  availability_period?: string
  rarity: 'common' | 'rare' | 'legendary' | 'seasonal'
}

class SeasonalAPI {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/garden/seasonal${endpoint}`
    
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
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

  // Get current seasonal events and information
  async getCurrentEvents(): Promise<{
    current_events: SeasonalEvent[]
    upcoming_events: Array<{
      id: string
      name: string
      start_date: string
      days_until: number
    }>
    weather_info: WeatherInfo
    seasonal_boosts: SeasonalBoost[]
    thai_calendar: ThaiCalendarInfo
  }> {
    return this.fetch('/events')
  }

  // Get detailed weather information
  async getWeatherStatus(): Promise<{
    current_weather: WeatherInfo
    effects: WeatherEffects
    forecast: WeatherForecast[]
    garden_recommendations: string[]
  }> {
    return this.fetch('/weather')
  }

  // Participate in a seasonal event
  async participateEvent(
    eventId: string, 
    activityType: 'plant_special' | 'water_blessing' | 'make_offering' | 'join_ceremony',
    contributionAmount?: number
  ): Promise<{
    message: string
    result: {
      xp_gained: number
      star_seeds_gained: number
      participation_count: number
      event_progress_contribution: number
    }
  }> {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${API_BASE_URL}/garden/seasonal/events/${eventId}/participate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({
        activity_type: activityType,
        contribution_amount: contributionAmount
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

    return { message: data.message, result: data.data }
  }

  // Activate/plant a seasonal special plant
  async activateSeasonalPlant(
    plantType: 'songkran_lotus' | 'loy_krathong_banana' | 'mothers_day_jasmine' | 'christmas_pine',
    position?: { x: number; y: number }
  ): Promise<{
    message: string
    plant: SeasonalPlant
  }> {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${API_BASE_URL}/garden/seasonal/plants/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({
        plant_type: plantType,
        position: position
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

    return { message: data.message, plant: data.data }
  }
}

// Export singleton instance
export const seasonalAPI = new SeasonalAPI()

// Utility functions
export const getEventTypeEmoji = (type: string): string => {
  const emojiMap: { [key: string]: string } = {
    thai_festival: '🏮',
    national_day: '🇹🇭',
    seasonal_change: '🌸',
    weather_event: '🌦️'
  }
  return emojiMap[type] || '🎉'
}

export const getEventTypeColor = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    thai_festival: 'bg-brand-500 text-white',
    national_day: 'bg-brand-600 text-white',
    seasonal_change: 'bg-brand-500 text-white',
    weather_event: 'bg-brand-600 text-white'
  }
  return colorMap[type] || 'bg-brand-700 text-white'
}

export const getWeatherEmoji = (weatherType: string): string => {
  const emojiMap: { [key: string]: string } = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    storm: '⛈️',
    misty: '🌫️'
  }
  return emojiMap[weatherType] || '🌤️'
}

export const getWeatherColor = (weatherType: string): string => {
  const colorMap: { [key: string]: string } = {
    sunny: 'bg-brand-500 text-white',
    cloudy: 'bg-sand-400 text-white',
    rainy: 'bg-brand-500 text-white',
    storm: 'bg-brand-800 text-white',
    misty: 'bg-sand-300 text-ink'
  }
  return colorMap[weatherType] || 'bg-brand-500 text-white'
}

export const formatTemperature = (temp: number): string => {
  return `${temp}°C`
}

export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`
}

export const formatWindSpeed = (speed: number): string => {
  return `${speed} km/h`
}

export const getSeasonName = (month: number): string => {
  if (month >= 3 && month <= 5) return 'ฤดูร้อน'
  if (month >= 6 && month <= 10) return 'ฤดูฝน'
  return 'ฤดูหนาว'
}

export const getSeasonEmoji = (month: number): string => {
  if (month >= 3 && month <= 5) return '🌞'
  if (month >= 6 && month <= 10) return '🌧️'
  return '❄️'
}

export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getEventProgress = (progress: number, target: number): number => {
  return Math.min((progress / target) * 100, 100)
}

export const getDaysUntilEvent = (startDate: string): number => {
  const start = new Date(startDate)
  const now = new Date()
  const diffTime = start.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const isEventActive = (startDate: string, endDate: string): boolean => {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  return now >= start && now <= end
}

export const getPlantRarityColor = (rarity: string): string => {
  const colorMap: { [key: string]: string } = {
    common: 'bg-sand-400 text-white',
    rare: 'bg-brand-500 text-white',
    legendary: 'bg-brand-700 text-white',
    seasonal: 'bg-brand-500 text-white'
  }
  return colorMap[rarity] || colorMap['common']
}

export const getPlantRarityEmoji = (rarity: string): string => {
  const emojiMap: { [key: string]: string } = {
    common: '🌿',
    rare: '💎',
    legendary: '👑',
    seasonal: '🌸'
  }
  return emojiMap[rarity] || '🌱'
}

export const formatThaiMonth = (month: string): string => {
  return month
}

export const getAuspiciousTimeEmoji = (time: string): string => {
  if (time.includes('เช้า')) return '🌅'
  if (time.includes('สาย')) return '☀️'
  if (time.includes('บ่าย')) return '🌞'
  if (time.includes('เย็น')) return '🌇'
  return '⏰'
}