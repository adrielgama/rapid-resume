import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useModeToggle } from '@/hooks/use-mode-toggle'

export function ThemeToggle() {
  const { theme, setTheme } = useModeToggle()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
