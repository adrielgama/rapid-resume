import { useState, useEffect } from 'react'

import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import Logo from '../logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav className="ml-10 flex items-center space-x-8">
              <a
                href="#how-it-works"
                className="text-gray-600 transition hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Como Funciona
              </a>
              <a
                href="#pricing"
                className="text-gray-600 transition hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Preços
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 transition hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Depoimentos
              </a>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button variant="rrOutline" asChild>
                  <Link href="/login">Começar Grátis</Link>
                </Button>
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`size-6 transition-transform ${
                  isMobileMenuOpen ? 'rotate-180 transform' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="animate-fade-in bg-white shadow-lg md:hidden dark:bg-gray-900">
          <nav className="space-y-2 px-4 pt-2 pb-4">
            <a
              href="#how-it-works"
              className="block py-2 text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </a>
            <a
              href="#pricing"
              className="block py-2 text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preços
            </a>
            <a
              href="#testimonials"
              className="block py-2 text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button
                variant="outline"
                asChild
                className="w-full justify-center"
              >
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild className="w-full justify-center">
                <Link href="/login">Começar Grátis</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
