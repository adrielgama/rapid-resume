import React from 'react'

import { redirect } from 'next/navigation'
import { User } from 'next-auth'

import Logo from '@/components/logo'
import { HelpAndSupport, PremiumFeatures } from '@/components/navbar/nav-bottom'
import { NavContent } from '@/components/navbar/nav-content'
import { NavUser } from '@/components/navbar/nav-user'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { auth, signOut } from '@/lib/auth'

type ResumeLayoutProps = {
  children: React.ReactNode
}

export default async function ResumeLayout({ children }: ResumeLayoutProps) {
  const session = await auth()

  if (!session) redirect('/login')

  const user = session.user as User & { subscriptionStatus: string | null }
  const subscriptionStatus = user.subscriptionStatus || null

  async function handleSignOut() {
    'use server'
    await signOut()
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100 md:flex-row dark:bg-neutral-800">
      <SidebarProvider>
        <div className="fixed top-4 left-1 !z-50 md:hidden">
          <SidebarTrigger />
        </div>
        <Sidebar variant="inset" className="pr-6">
          <SidebarHeader className="mt-2 flex items-center justify-between">
            <Logo />
          </SidebarHeader>

          <NavContent status={subscriptionStatus} />

          <SidebarFooter>
            <PremiumFeatures status={subscriptionStatus} />
            <SidebarSeparator className="my-4" />
            <NavUser user={user} logout={handleSignOut} />
            <HelpAndSupport />
          </SidebarFooter>
        </Sidebar>
        <ScrollArea className="ml-8 h-full w-full md:ml-0">
          {children}
        </ScrollArea>
      </SidebarProvider>
    </div>
  )
}
