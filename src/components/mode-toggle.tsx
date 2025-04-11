'use client'

import { Sun, Moon } from 'lucide-react'
import { Button } from './ui/button'
import { useModeToggle } from '@/hooks/use-mode-toggle'

export function ModeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, isMounted } = useModeToggle()

  if (!isMounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
