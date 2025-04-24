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
import { db } from '@/lib/firebase'

type ResumeLayoutProps = {
  children: React.ReactNode
}

export default async function ResumeLayout({ children }: ResumeLayoutProps) {
  const session = await auth()

  if (!session) redirect('/login')

  const user = session.user as User
  const userId = user.id

  if (!userId) redirect('/login')

  const userDoc = await db.collection('users').doc(userId).get()
  const subscriptionStatus = userDoc.data()?.subscriptionStatus || null

  async function handleSignOut() {
    'use server'
    await signOut()
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-100 md:flex-row dark:bg-neutral-800">
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
            <PremiumFeatures userId={userId} status={subscriptionStatus} />
            <SidebarSeparator className="my-4" />
            <NavUser user={user} logout={handleSignOut} />
            <HelpAndSupport />
          </SidebarFooter>
        </Sidebar>
        <div className="w-full rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <div className="container mx-auto h-full w-full py-4">
            <ScrollArea className="w-full md:ml-0">{children}</ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
