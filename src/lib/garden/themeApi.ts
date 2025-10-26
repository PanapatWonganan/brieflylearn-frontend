// Garden Theme API Client for BoostMe Wellness Garden

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'

export interface GardenTheme {
  id: string
  name: string
  description: string
  preview_image: string
  background_color: string
  accent_color: string
  unlock_level: number
  price: number
  features: string[]
  category: string
  is_seasonal?: boolean
  seasonal_period?: string
  is_premium?: boolean
  can_unlock: boolean
  is_unlocked: boolean
  is_active: boolean
  unlock_requirements: {
    level_met: boolean
    price_affordable: boolean
    required_level: number
    required_star_seeds: number
  }
}

export interface ThemeStats {
  total_themes: number
  unlocked_themes: number
  premium_themes: number
  seasonal_themes: number
}

export interface UserThemeInfo {
  level: number
  star_seeds: number
  current_theme: string
}

export interface CurrentThemeDetails {
  current_theme: GardenTheme
  garden_info: {
    level: number
    xp: number
    star_seeds: number
    theme: string
  }
  customization_stats: {
    theme_changes_today: number
    total_spent_on_themes: number
    favorite_theme_category: string
  }
}

class ThemeAPI {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/garden/themes${endpoint}`
    
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

  // Get all available themes
  async getAvailableThemes(): Promise<{
    themes: GardenTheme[]
    user_info: UserThemeInfo
    stats: ThemeStats
  }> {
    return this.fetch('/')
  }

  // Get current theme details
  async getCurrentTheme(): Promise<CurrentThemeDetails> {
    return this.fetch('/current')
  }

  // Apply a theme to user's garden
  async applyTheme(themeId: string): Promise<{
    theme: GardenTheme
    garden: {
      id: string
      theme: string
      star_seeds: number
      xp: number
      level: number
    }
    rewards: {
      xp_gained: number
      star_seeds_spent: number
    }
  }> {
    return this.fetch('/apply', {
      method: 'POST',
      body: JSON.stringify({ theme_id: themeId }),
    })
  }
}

// Export singleton instance
export const themeAPI = new ThemeAPI()

// Utility functions
export const getThemeCategoryEmoji = (category: string): string => {
  const emojiMap: { [key: string]: string } = {
    nature: '🌿',
    mindfulness: '🧘‍♀️',
    cozy: '🏡',
    modern: '🏙️',
    seasonal: '🌸',
    premium: '👑'
  }
  return emojiMap[category] || '🎨'
}

export const getThemeCategoryColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    nature: 'from-green-400 to-emerald-500',
    mindfulness: 'from-purple-400 to-indigo-500',
    cozy: 'from-pink-400 to-rose-500',
    modern: 'from-gray-400 to-slate-500',
    seasonal: 'from-yellow-400 to-orange-500',
    premium: 'from-yellow-500 to-amber-600'
  }
  return colorMap[category] || 'from-blue-400 to-cyan-500'
}

export const formatThemePrice = (price: number): string => {
  if (price === 0) return 'ฟรี'
  if (price >= 1000) return `${(price / 1000).toFixed(1)}K Seeds`
  return `${price} Seeds`
}

export const getUnlockStatusText = (theme: GardenTheme): string => {
  if (theme.is_active) return 'กำลังใช้งาน'
  if (theme.is_unlocked) return 'ใช้ได้'
  if (!theme.unlock_requirements.level_met) {
    return `ต้องเลเวล ${theme.unlock_requirements.required_level}`
  }
  if (!theme.unlock_requirements.price_affordable) {
    return `ต้อง ${formatThemePrice(theme.price)}`
  }
  return 'ไม่สามารถใช้ได้'
}

export const getUnlockStatusColor = (theme: GardenTheme): string => {
  if (theme.is_active) return 'bg-green-100 text-green-700 border-green-200'
  if (theme.is_unlocked) return 'bg-blue-100 text-blue-700 border-blue-200'
  return 'bg-gray-100 text-gray-600 border-gray-200'
}

// Theme preview generator (for demo purposes)
export const generateThemePreview = (theme: GardenTheme): React.CSSProperties => {
  return {
    background: `linear-gradient(135deg, ${theme.background_color}20, ${theme.accent_color}20)`,
    borderColor: theme.accent_color,
  }
}

// Apply theme to current page (for demo)
export const applyThemeToPage = (theme: GardenTheme) => {
  const root = document.documentElement
  root.style.setProperty('--theme-primary', theme.background_color)
  root.style.setProperty('--theme-accent', theme.accent_color)
}