'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  Crown, 
  Star, 
  Lock, 
  Check, 
  Sparkles,
  Filter,
  ShoppingCart,
  Eye,
  RefreshCw
} from 'lucide-react'
import { 
  themeAPI, 
  GardenTheme, 
  ThemeStats, 
  UserThemeInfo,
  getThemeCategoryEmoji,
  getThemeCategoryColor,
  formatThemePrice,
  getUnlockStatusText,
  getUnlockStatusColor,
  generateThemePreview,
  applyThemeToPage
} from '@/lib/garden/themeApi'
import { useNotification } from '@/contexts/NotificationContext'

const ThemeGallery = () => {
  const [themes, setThemes] = useState<GardenTheme[]>([])
  const [userInfo, setUserInfo] = useState<UserThemeInfo | null>(null)
  const [stats, setStats] = useState<ThemeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isApplyingTheme, setIsApplyingTheme] = useState<string | null>(null)
  const [previewTheme, setPreviewTheme] = useState<GardenTheme | null>(null)

  const { addNotification } = useNotification()

  const categories = [
    { id: 'all', name: 'ทั้งหมด', emoji: '🎨' },
    { id: 'nature', name: 'ธรรมชาติ', emoji: '🌿' },
    { id: 'mindfulness', name: 'จิตใจ', emoji: '🧘‍♀️' },
    { id: 'cozy', name: 'อบอุ่น', emoji: '🏡' },
    { id: 'modern', name: 'โมเดิร์น', emoji: '🏙️' },
    { id: 'seasonal', name: 'ตามฤดู', emoji: '🌸' },
    { id: 'premium', name: 'พรีเมียม', emoji: '👑' }
  ]

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      setIsLoading(true)
      const data = await themeAPI.getAvailableThemes()
      setThemes(data.themes)
      setUserInfo(data.user_info)
      setStats(data.stats)
    } catch (error: any) {
      console.error('Failed to load themes:', error)
      addNotification({
        type: 'error',
        message: 'ไม่สามารถโหลดธีมได้: ' + error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplyTheme = async (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (!theme) return

    if (theme.is_active) {
      addNotification({
        type: 'info',
        message: 'ธีมนี้กำลังใช้งานอยู่แล้ว'
      })
      return
    }

    if (!theme.is_unlocked) {
      addNotification({
        type: 'warning',
        message: getUnlockStatusText(theme)
      })
      return
    }

    try {
      setIsApplyingTheme(themeId)
      const result = await themeAPI.applyTheme(themeId)
      
      addNotification({
        type: 'success',
        title: 'เปลี่ยนธีมสำเร็จ! 🎨',
        message: `ใช้ธีม ${theme.name} แล้ว (+${result.rewards.xp_gained} XP)`,
        duration: 5000
      })

      // Apply theme to current page for immediate visual feedback
      applyThemeToPage(theme)
      
      // Refresh themes data
      loadThemes()
      
    } catch (error: any) {
      console.error('Failed to apply theme:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถเปลี่ยนธีมได้'
      })
    } finally {
      setIsApplyingTheme(null)
    }
  }

  const handlePreviewTheme = (theme: GardenTheme) => {
    setPreviewTheme(theme)
    // Apply theme temporarily for preview
    applyThemeToPage(theme)
    
    addNotification({
      type: 'info',
      message: `ดูตัวอย่างธีม ${theme.name}`,
      duration: 3000
    })
  }

  const handleStopPreview = () => {
    if (previewTheme) {
      setPreviewTheme(null)
      // Restore current theme
      const currentTheme = themes.find(t => t.is_active)
      if (currentTheme) {
        applyThemeToPage(currentTheme)
      }
    }
  }

  const filteredThemes = selectedCategory === 'all' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory)

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-3">
                <div className="w-full h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-500 to-orange-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Palette className="h-6 w-6" />
            <span>แกลเลอรี่ธีม</span>
          </h2>
          <button
            onClick={loadThemes}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="รีเฟรช"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* User Info */}
        {userInfo && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Crown className="h-4 w-4" />
                <span>Level {userInfo.level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>{userInfo.star_seeds} Seeds</span>
              </div>
            </div>
            {stats && (
              <div className="text-right">
                <div>ปลดล็อคแล้ว {stats.unlocked_themes}/{stats.total_themes} ธีม</div>
              </div>
            )}
          </div>
        )}

        {/* Preview Mode Indicator */}
        {previewTheme && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-yellow-500/20 border border-yellow-300/30 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>กำลังดูตัวอย่าง: {previewTheme.name}</span>
            </div>
            <button
              onClick={handleStopPreview}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
            >
              หยุดดูตัวอย่าง
            </button>
          </motion.div>
        )}
      </div>

      {/* Category Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">หมวดหมู่</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            const themeCount = category.id === 'all' 
              ? themes.length 
              : themes.filter(t => t.category === category.id).length
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
                <span className="text-xs opacity-70">({themeCount})</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Themes Grid */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredThemes.map((theme) => (
              <motion.div
                key={theme.id}
                className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 border-2 ${
                  theme.is_active 
                    ? 'border-green-300 bg-green-50' 
                    : theme.is_unlocked
                      ? 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl'
                      : 'border-gray-200 bg-gray-50'
                }`}
                style={generateThemePreview(theme)}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Theme Preview */}
                <div className="relative h-32 overflow-hidden">
                  <div 
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(135deg, ${theme.background_color}, ${theme.accent_color})`
                    }}
                  >
                    {/* Theme Pattern/Effects */}
                    <div className="absolute inset-0 opacity-20">
                      {theme.category === 'nature' && (
                        <div className="text-6xl text-white flex items-center justify-center">🌿</div>
                      )}
                      {theme.category === 'mindfulness' && (
                        <div className="text-6xl text-white flex items-center justify-center">🧘‍♀️</div>
                      )}
                      {theme.category === 'cozy' && (
                        <div className="text-6xl text-white flex items-center justify-center">🏡</div>
                      )}
                      {theme.category === 'modern' && (
                        <div className="text-6xl text-white flex items-center justify-center">🏙️</div>
                      )}
                      {theme.category === 'seasonal' && (
                        <div className="text-6xl text-white flex items-center justify-center">🌸</div>
                      )}
                      {theme.category === 'premium' && (
                        <div className="text-6xl text-white flex items-center justify-center">👑</div>
                      )}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex space-x-1">
                    {theme.is_premium && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        PREMIUM
                      </span>
                    )}
                    {theme.is_seasonal && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        SEASONAL
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      theme.price === 0 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-800'
                    }`}>
                      {formatThemePrice(theme.price)}
                    </span>
                  </div>

                  {/* Lock Overlay */}
                  {!theme.is_unlocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Theme Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${theme.is_unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {getThemeCategoryEmoji(theme.category)} {theme.name}
                    </h3>
                    {theme.is_active && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </div>

                  <p className={`text-sm mb-3 ${theme.is_unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                    {theme.description}
                  </p>

                  {/* Features */}
                  {theme.features && theme.features.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">คุณสมบัติ:</div>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        {theme.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <Sparkles className="h-2 w-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {theme.features.length > 2 && (
                          <div className="text-gray-400">
                            +{theme.features.length - 2} อื่นๆ
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Unlock Requirements */}
                  {!theme.is_unlocked && (
                    <div className="mb-3 text-xs text-gray-500">
                      <div>ต้องการ Level {theme.unlock_level}</div>
                      {theme.price > 0 && (
                        <div>ราคา {formatThemePrice(theme.price)}</div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {theme.is_unlocked && !theme.is_active && (
                      <button
                        onClick={() => handlePreviewTheme(theme)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>ดูตัวอย่าง</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleApplyTheme(theme.id)}
                      disabled={isApplyingTheme === theme.id || !theme.is_unlocked}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-1 ${
                        theme.is_active
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : theme.is_unlocked
                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isApplyingTheme === theme.id ? (
                        <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                      ) : theme.is_active ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>กำลังใช้</span>
                        </>
                      ) : theme.is_unlocked ? (
                        <>
                          <ShoppingCart className="h-3 w-3" />
                          <span>ใช้ธีม</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3" />
                          <span>ล็อค</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status */}
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getUnlockStatusColor(theme)}`}>
                      {getUnlockStatusText(theme)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredThemes.length === 0 && (
          <div className="text-center py-12">
            <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">ไม่มีธีมในหมวดหมู่นี้</h3>
            <p className="text-gray-500">ลองเลือกหมวดหมู่อื่นดูสิ</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemeGallery