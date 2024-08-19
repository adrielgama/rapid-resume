'use client'

import React, { useState } from 'react'

import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react'

import Logo from './logo'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    {
      name: 'Our features',
      url: '#features',
    },
    {
      name: 'Pricing',
      url: '#pricing',
    },
    {
      name: 'Resources',
      url: '#resources',
    },
  ]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="flex h-20 w-full items-center bg-zinc-50 dark:bg-dark-blue">
      <div className="container flex flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden space-x-4 lg:flex" aria-label="Main navigation">
          {nav.map(({ name, url }) => (
            <Button key={name} variant="link">
              <a href={url}>{name}</a>
            </Button>
          ))}
        </nav>

        <div className="hidden items-center space-x-2 lg:flex">
          <Button variant="link" aria-label="Login">
            Login
          </Button>
          <Button aria-label="Get started">Get started</Button>
          <ModeToggle />
        </div>

        <div className="flex items-center space-x-2 lg:hidden">
          <Button variant="link" aria-label="Login">
            Login
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
          className={`fixed inset-0 z-50 flex transform flex-col items-center justify-center bg-zinc-50 transition-opacity duration-300 ease-in-out dark:bg-dark-blue ${
            menuOpen
              ? 'scale-100 opacity-100'
              : 'pointer-events-none scale-95 opacity-0'
          } lg:hidden`}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            className="absolute right-4 top-4"
            onClick={toggleMenu}
          >
            <CloseIcon className="h-5 w-5" />
          </Button>

          <nav
            className="flex flex-col items-center space-y-6 text-lg"
            aria-label="Mobile navigation"
          >
            {nav.map(({ name, url }) => (
              <a href={url} key={name} className="hover:underline">
                {name}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <Button variant="link" aria-label="Login">
              Login
            </Button>
            <Button aria-label="Get started">Get started</Button>
            <ModeToggle />
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Header)
