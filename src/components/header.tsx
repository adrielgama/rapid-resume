'use client'

import React, { useState } from 'react'

import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react'
// import Link from 'next/link'
import { Link } from '@/i18n/navigation'

import Logo from './logo'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { useLocale, useTranslations } from 'next-intl'

function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    {
      name: t('features'),
      url: '#features',
    },
    {
      name: t('pricing'),
      url: '#pricing',
    },
    {
      name: t('testimonials'),
      url: '#testimonials',
    },
  ]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="dark:bg-dark-blue flex h-20 w-full items-center bg-zinc-50">
      <div className="container flex flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden space-x-4 lg:flex" aria-label="Main navigation">
          {nav.map(({ name, url }) => (
            <Button key={url} variant="link">
              <Link locale={locale} href={url}>
                {name}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="hidden items-center space-x-2 lg:flex">
          <Button variant="link" aria-label="Login" asChild>
            <Link locale={locale} href="/login">
              {t('login')}
            </Link>
          </Button>
          <Button aria-label="Get started" asChild>
            <Link locale={locale} href="/signup">
              {t('getStarted')}
            </Link>
          </Button>
          <ModeToggle />
        </div>

        <div className="flex items-center space-x-2 lg:hidden">
          <Button variant="link" aria-label="Login">
            <Link locale={locale} href="/login">
              {t('login')}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`dark:bg-dark-blue fixed inset-0 z-50 flex transform flex-col items-center justify-center bg-zinc-50 transition-opacity duration-300 ease-in-out ${
            menuOpen
              ? 'scale-100 opacity-100'
              : 'pointer-events-none scale-95 opacity-0'
          } lg:hidden`}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            className="absolute top-4 right-4"
            onClick={toggleMenu}
          >
            <CloseIcon className="h-5 w-5" />
          </Button>

          <nav
            className="flex flex-col items-center space-y-6 text-lg"
            aria-label="Mobile navigation"
          >
            {nav.map(({ name, url }) => (
              <Link
                locale={locale}
                href={url}
                key={name}
                className="hover:underline"
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <Button variant="link" aria-label="Login" asChild>
              <Link locale={locale} href="/login">
                {t('login')}
              </Link>
            </Button>
            <Button aria-label="Get started" asChild>
              <Link locale={locale} href="/signup">
                {t('getStarted')}
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Header)
