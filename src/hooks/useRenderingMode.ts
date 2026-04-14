'use client'

import { useState, useEffect, useCallback } from 'react'
import { RenderingMode, DEFAULT_RENDERING_MODE } from '@/lib/garden/spriteConfig'

const STORAGE_KEY = 'garden_rendering_mode'
const SPRITE_THEME_KEY = 'garden_sprite_theme'

/**
 * Hook to manage rendering mode (emoji vs sprite) for the garden.
 * Persists the user's choice in localStorage.
 */
export function useRenderingMode() {
  const [renderingMode, setRenderingModeState] = useState<RenderingMode>(DEFAULT_RENDERING_MODE)
  const [spriteThemeId, setSpriteThemeIdState] = useState<string>('sprout-lands')
  const [isClient, setIsClient] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY) as RenderingMode | null
      if (savedMode === 'emoji' || savedMode === 'sprite') {
        setRenderingModeState(savedMode)
      }

      const savedTheme = localStorage.getItem(SPRITE_THEME_KEY)
      if (savedTheme) {
        setSpriteThemeIdState(savedTheme)
      }
    } catch {
      // localStorage not available (SSR)
    }
  }, [])

  const setRenderingMode = useCallback((mode: RenderingMode) => {
    setRenderingModeState(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore
    }
  }, [])

  const setSpriteThemeId = useCallback((themeId: string) => {
    setSpriteThemeIdState(themeId)
    try {
      localStorage.setItem(SPRITE_THEME_KEY, themeId)
    } catch {
      // ignore
    }
  }, [])

  const toggleRenderingMode = useCallback(() => {
    const newMode: RenderingMode = renderingMode === 'emoji' ? 'sprite' : 'emoji'
    setRenderingMode(newMode)
  }, [renderingMode, setRenderingMode])

  return {
    renderingMode,
    spriteThemeId,
    isSprite: renderingMode === 'sprite',
    isEmoji: renderingMode === 'emoji',
    isClient,
    setRenderingMode,
    setSpriteThemeId,
    toggleRenderingMode,
  }
}
