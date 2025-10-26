'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('boostme-theme') as Theme;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      const initialTheme = savedTheme || systemTheme;
      setTheme(initialTheme);
      setMounted(true);
    } catch (error) {
      console.warn('Error loading theme:', error);
      setTheme('light');
      setMounted(true);
    }
  }, []);

  // Apply theme to document when theme changes
  useEffect(() => {
    if (mounted) {
      try {
        // Update html element classes
        document.documentElement.className = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('boostme-theme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', theme === 'dark' ? '#1f2937' : '#ec4899');
        }
      } catch (error) {
        console.warn('Error applying theme:', error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    mounted,
  };

  // Prevent flash of unstyled content during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return safe defaults during SSR/pre-rendering
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {
        console.warn('useTheme called outside of ThemeProvider');
      },
      setTheme: () => {
        console.warn('useTheme called outside of ThemeProvider');
      },
      mounted: false,
    };
  }
  return context;
} 