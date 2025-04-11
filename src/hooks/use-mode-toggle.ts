'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function useModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    isMounted: mounted,
  }
}
