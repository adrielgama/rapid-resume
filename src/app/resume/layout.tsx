'use client'
import React, { useEffect } from 'react'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import Loader from '@/components/loader'
import { SideNav } from '@/components/sidenav'
import { ScrollArea } from '@/components/ui/scroll-area'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/login')
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId) {
    return <Loader />
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100 dark:bg-neutral-800 md:flex-row">
      <SideNav />
      <ScrollArea className="h-full w-full">{children}</ScrollArea>
    </div>
  )
}
