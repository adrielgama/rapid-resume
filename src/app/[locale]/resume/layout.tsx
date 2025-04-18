'use client'
import React, { useEffect } from 'react'

import { useAuth, useUser } from '@clerk/nextjs'
import { FileText } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import Loader from '@/components/loader'
import Logo from '@/components/logo'
import { NavUser } from '@/components/navbar/nav-user'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoaded, userId, signOut } = useAuth()
  const { user } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/login')
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId) {
    return <Loader />
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100 md:flex-row dark:bg-neutral-800">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push('/resume')}
                  isActive={isActive('/resume')}
                >
                  <FileText />
                  <span>Resume</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <NavUser user={user} logout={signOut} />
          </SidebarFooter>
        </Sidebar>
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </SidebarProvider>
    </div>
  )
}
