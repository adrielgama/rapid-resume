'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  if (!user) return null

  const fallback =
    user
      ?.fullName!.split(' ')
      .map((name) => name[0])
      .join('') ?? 'CN'

  const externalAccounts = user.externalAccounts || []
  const provider =
    externalAccounts.length > 0
      ? externalAccounts[0].provider
      : 'email/password'

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
      })

      if (response.ok) {
        await signOut()
        router.push('/')
      } else {
        const data = await response.json()
        console.error(data.error)
        toast.error('Failed to delete account')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      toast.error('Failed to delete account')
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 lg:p-6">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-6 rounded-md border p-6 dark:border-gray-700 md:flex-row">
        <div className="flex items-center gap-4">
          <Avatar className="h-32 w-32">
            {!isLoaded ? (
              <Skeleton className="h-32 w-32 rounded-full" />
            ) : (
              <>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>{fallback}</AvatarFallback>
              </>
            )}
          </Avatar>
          <div className="flex flex-col text-sm">
            {!isLoaded ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-28" />
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold">{user?.fullName}</h3>
                <p className="text-gray-400">
                  {user?.emailAddresses[0].emailAddress}
                </p>
                <p className="text-xs text-gray-500">Provider: {provider}</p>
              </>
            )}
          </div>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="destructive">
              Delete account <Trash2 className="ml-2" size={16} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Confirm Deletion</DrawerTitle>
                <DrawerDescription>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Yes, Delete
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
