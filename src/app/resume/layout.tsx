'use client'
import React from 'react'

import { SideNav } from '@/components/sidenav'
import { ScrollArea } from '@/components/ui/scroll-area'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-neutral-100 dark:bg-neutral-800 md:flex-row">
      <SideNav />
      <ScrollArea className="h-full w-full">{children}</ScrollArea>
    </div>
  )
}
