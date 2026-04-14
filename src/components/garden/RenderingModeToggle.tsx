'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Gamepad2 } from 'lucide-react'
import { useGarden } from '@/contexts/GardenContext'
import { SPRITE_THEMES } from '@/lib/garden/spriteConfig'

interface RenderingModeToggleProps {
  className?: string
  /** Compact mode shows only the toggle, no labels */
  compact?: boolean
}

/**
 * Toggle switch for switching between emoji and pixel art (sprite) rendering.
 * Reads/writes rendering mode via GardenContext.
 */
const RenderingModeToggle: React.FC<RenderingModeToggleProps> = ({
  className = '',
  compact = false,
}) => {
  const { renderingMode, spriteThemeId, isSprite, setRenderingMode, setSpriteThemeId } = useGarden()

  const themeOptions = Object.values(SPRITE_THEMES)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setRenderingMode(isSprite ? 'emoji' : 'sprite')}
        className={`
          relative flex items-center gap-2 px-3 py-2 rounded-sm border-2
          transition-all duration-300 text-sm font-medium
          ${isSprite
            ? 'border-brand-500 bg-mint-900/50 text-mint-300'
            : 'border-gray-600 bg-gray-900 text-gray-400 hover:border-sand-400'
          }
        `}
        title={isSprite ? 'เปลี่ยนเป็น Emoji' : 'เปลี่ยนเป็น Pixel Art'}
      >
        <motion.div
          initial={false}
          animate={{ rotateY: isSprite ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ perspective: 100 }}
        >
          {isSprite ? (
            <Gamepad2 className="w-4 h-4" />
          ) : (
            <Monitor className="w-4 h-4" />
          )}
        </motion.div>

        {!compact && (
          <span>{isSprite ? 'Pixel Art' : 'Emoji'}</span>
        )}

        {/* Active indicator dot */}
        {isSprite && (
          <motion.div
            layoutId="sprite-indicator"
            className="w-1.5 h-1.5 rounded-full bg-mint-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
      </button>

      {/* Sprite Theme Selector (only visible in sprite mode & when multiple themes exist) */}
      {isSprite && themeOptions.length > 1 && !compact && (
        <motion.select
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-2 py-2 rounded-sm border-2 border-gray-600 bg-gray-900 text-sm text-gray-400 focus:outline-none focus:border-mint-500"
          value={spriteThemeId}
          onChange={(e) => setSpriteThemeId(e.target.value)}
        >
          {themeOptions.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </motion.select>
      )}
    </div>
  )
}

export default RenderingModeToggle
