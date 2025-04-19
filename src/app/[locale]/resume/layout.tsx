// 'use client'
import React from 'react'

import { FileText } from 'lucide-react'
import { redirect } from 'next/navigation'

import Logo from '@/components/logo'
// import { NavUser } from '@/components/navbar/nav-user'
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
import { auth, signOut } from '@/lib/auth'

type ResumeLayoutProps = {
  children: React.ReactNode
}

export default async function ResumeLayout({ children }: ResumeLayoutProps) {
  const session = await auth()

  // const isActive = (href: string) => pathname === href

  if (!session) redirect('/login')

  async function handleSignOut() {
    'use server'
    await signOut()
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
                // onClick={() => console.log('/resume')}
                // isActive={isActive('/resume')}
                >
                  <FileText />
                  <span>Resume</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            {session.user?.email && (
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="cursor-pointer rounded-md border px-2 py-1"
                >
                  Logout
                </button>
              </form>
            )}
            {/* <NavUser user={user} logout={signOut} /> */}
          </SidebarFooter>
        </Sidebar>
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </SidebarProvider>
    </div>
  )
}
