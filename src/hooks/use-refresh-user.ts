'use client'

import { fetchUserFromFirestore } from '@/server/firestore/fetch-user-from-firestore'
import { useUserStore } from '@/store/user-store'

export function useRefreshUser() {
  const { userId, setUser } = useUserStore()

  async function refreshUserData() {
    if (!userId) return

    const updatedUser = await fetchUserFromFirestore(userId)
    if (updatedUser) {
      setUser(updatedUser)
    }
  }

  return { refreshUserData }
}
