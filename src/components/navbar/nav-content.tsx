'use client'
import { memo } from 'react'

import { FileText, ChartLine, Settings2 } from 'lucide-react'
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
  // const link = links.find((link) => pathname.startsWith(link.href))
  // const isActive = pathname === link?.href.toLowerCase()

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
        {links.map((link) =>
          link.premiumFeature && subscriptionStatus !== 'active' ? null : (
            <SidebarMenuItem key={link.label}>
              <Link
                href={link.href}
                className={`flex cursor-pointer items-center rounded-lg px-2 py-1 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  pathname === link.href ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <SidebarMenuButton className="cursor-pointer">
                  {link.icon} {link.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarContent>
  )
})

export { NavContent }
