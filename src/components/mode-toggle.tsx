'use client'

import { Sun, Moon } from 'lucide-react'

import { useModeToggle } from '@/hooks/use-mode-toggle'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'

export function ModeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, isMounted } = useModeToggle()

  if (!isMounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn('cursor-pointer', className)}
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
