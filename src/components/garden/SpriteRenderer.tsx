'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SpriteAnimation, SpriteFrame } from '@/lib/garden/spriteConfig'

// ============================================================
// Image cache to avoid reloading the same sprite sheet
// ============================================================

const imageCache = new Map<string, HTMLImageElement>()

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src)
  if (cached?.complete) return Promise.resolve(cached)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      imageCache.set(src, img)
      resolve(img)
    }
    img.onerror = () => reject(new Error(`Failed to load sprite: ${src}`))
    img.src = src
  })
}

// ============================================================
// SpriteRenderer Props
// ============================================================

interface SpriteRendererProps {
  /** The sprite animation config to render */
  sprite: SpriteAnimation
  /** Width to render at (px). Defaults to frame width * scale */
  width?: number
  /** Height to render at (px). Defaults to frame height * scale */
  height?: number
  /** Scale factor (e.g. 4 = 4x upscale). Defaults to 4 for 16px->64px */
  scale?: number
  /** Whether to use pixelated rendering (crisp pixels). Defaults to true */
  pixelated?: boolean
  /** Optional CSS class */
  className?: string
  /** Whether animation is playing. Defaults to true for multi-frame sprites */
  playing?: boolean
  /** Callback when animation cycle completes */
  onAnimationEnd?: () => void
}

// ============================================================
// SpriteRenderer Component
// ============================================================

const SpriteRenderer: React.FC<SpriteRendererProps> = ({
  sprite,
  width,
  height,
  scale = 4,
  pixelated = true,
  className = '',
  playing = true,
  onAnimationEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const frameIndexRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const frameWidth = sprite.frames[0]?.width ?? 16
  const frameHeight = sprite.frames[0]?.height ?? 16
  const renderWidth = width ?? frameWidth * scale
  const renderHeight = height ?? frameHeight * scale

  // Draw a single frame to canvas
  const drawFrame = useCallback(
    (frame: SpriteFrame) => {
      const canvas = canvasRef.current
      const img = imageRef.current
      if (!canvas || !img) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Disable image smoothing for crisp pixels
      if (pixelated) {
        ctx.imageSmoothingEnabled = false
      }

      ctx.clearRect(0, 0, renderWidth, renderHeight)
      ctx.drawImage(
        img,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        0,
        0,
        renderWidth,
        renderHeight
      )
    },
    [pixelated, renderWidth, renderHeight]
  )

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      if (!playing || sprite.frames.length <= 1) return

      const frameDuration = sprite.frameDuration ?? 200
      const elapsed = timestamp - lastFrameTimeRef.current

      if (elapsed >= frameDuration) {
        lastFrameTimeRef.current = timestamp
        frameIndexRef.current++

        if (frameIndexRef.current >= sprite.frames.length) {
          if (sprite.loop !== false) {
            frameIndexRef.current = 0
          } else {
            frameIndexRef.current = sprite.frames.length - 1
            onAnimationEnd?.()
            return
          }
        }

        const frame = sprite.frames[frameIndexRef.current]
        if (frame) drawFrame(frame)
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [playing, sprite, drawFrame, onAnimationEnd]
  )

  // Load image and start rendering
  useEffect(() => {
    let cancelled = false

    setIsLoaded(false)
    setHasError(false)

    loadImage(sprite.sheet)
      .then((img) => {
        if (cancelled) return
        imageRef.current = img
        setIsLoaded(true)

        // Draw first frame
        const firstFrame = sprite.frames[0]
        if (firstFrame) {
          // Need to wait for next tick so canvas ref is ready
          requestAnimationFrame(() => {
            if (!cancelled) drawFrame(firstFrame)
          })
        }
      })
      .catch(() => {
        if (!cancelled) setHasError(true)
      })

    return () => {
      cancelled = true
    }
  }, [sprite.sheet, drawFrame, sprite.frames])

  // Start/stop animation
  useEffect(() => {
    if (!isLoaded || !playing || sprite.frames.length <= 1) return

    frameIndexRef.current = 0
    lastFrameTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isLoaded, playing, animate, sprite.frames.length])

  // Error fallback
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-sand-100 rounded ${className}`}
        style={{ width: renderWidth, height: renderHeight }}
      >
        <span className="text-ink-muted text-xs">sprite</span>
      </div>
    )
  }

  // Loading placeholder
  if (!isLoaded) {
    return (
      <div
        className={`animate-pulse bg-sand-200 rounded ${className}`}
        style={{ width: renderWidth, height: renderHeight }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      width={renderWidth}
      height={renderHeight}
      className={className}
      style={{
        width: renderWidth,
        height: renderHeight,
        imageRendering: pixelated ? 'pixelated' : 'auto',
      }}
    />
  )
}

export default SpriteRenderer
