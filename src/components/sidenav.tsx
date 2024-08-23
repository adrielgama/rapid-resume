'use client'
import React, { memo, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { FileText, LogOut, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

import Logo, { ShortLogo } from './logo'
import { ModeToggle } from './mode-toggle'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'

const links = [
  {
    label: 'Resume',
    href: '/resume',
    icon: <FileText />,
  },
  {
    label: 'Profile',
    href: '/resume/profile',
    icon: <User />,
  },
]

const SideNav = memo(function SideNav() {
  const { signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <ShortLogo />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => {
              const isActive = pathname === link.href.toLowerCase()
              return (
                <SidebarLink
                  onClick={() => setOpen(false)}
                  key={idx}
                  link={{
                    ...link,
                    icon: React.cloneElement(link.icon, {
                      className: `h-5 w-5 flex-shrink-0 ${
                        isActive
                          ? 'text-light-blue'
                          : 'text-neutral-700 dark:text-neutral-200'
                      }`,
                    }),
                  }}
                  className={
                    isActive ? 'text-light-blue dark:text-light-blue' : ''
                  }
                />
              )
            })}
          </div>
        </div>
        <div>
          <SidebarLink
            onClick={() => signOut()}
            link={{
              label: 'Logout',
              href: '#',
              icon: (
                <LogOut className="h-5 w-5 flex-shrink-0 rotate-180 text-neutral-700 dark:text-neutral-200" />
              ),
            }}
          />
          <ModeToggle className="pr-4" />
        </div>
      </SidebarBody>
    </Sidebar>
  )
})

export { SideNav }
