'use client'
import { memo } from 'react'

import { FileText, ChartLine, Settings2, Crown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '../ui/sidebar'

const NavContent = memo(function NavContent({
  status: subscriptionStatus,
}: {
  status: string | null
}) {
  const pathname = usePathname()
  const isActive = (path: string) => {
    const segments = pathname.split('/')
    const normalizedPath = '/' + segments.slice(2).join('/')
    return normalizedPath.startsWith(path)
  }

  const links = [
    {
      label: 'Meu currículo',
      href: '/resume',
      icon: <FileText />,
      premiumFeature: false,
    },
    {
      label: 'Estatísticas',
      href: '/resume/analytics',
      icon: <ChartLine />,
      premiumFeature: true,
    },
    {
      label: 'Configurações',
      href: '/resume/settings',
      icon: <Settings2 />,
      premiumFeature: false,
    },
  ]

  return (
    <SidebarContent className="flex-1 overflow-hidden px-2 py-4">
      <SidebarSeparator className="my-4" />
      <SidebarMenu>
        {links.map((link) => {
          const isDisabled =
            link.premiumFeature && subscriptionStatus !== 'active'

          const button = (
            <SidebarMenuButton asChild>
              {isDisabled ? (
                <div className="flex items-center rounded-lg px-2 py-1 text-sm font-medium">
                  <div className="flex items-center gap-2 opacity-30 [&_svg]:size-4">
                    {link.icon} {link.label}
                  </div>
                  {link.premiumFeature && subscriptionStatus !== 'active' && (
                    <Crown className="ml-2 !size-5 text-blue-400" />
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`flex items-center rounded-lg px-2 py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'bg-blue-100 hover:!bg-blue-100 dark:bg-gray-700 dark:hover:!bg-gray-700'
                      : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {link.icon} {link.label}
                </Link>
              )}
            </SidebarMenuButton>
          )

          return <SidebarMenuItem key={link.label}>{button}</SidebarMenuItem>
        })}
      </SidebarMenu>
    </SidebarContent>
  )
})

export { NavContent }
