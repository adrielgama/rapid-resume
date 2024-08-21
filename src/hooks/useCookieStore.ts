import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CookieStore {
  accepted: boolean
  acceptCookies: () => void
}

export const useCookieStore = create(
  persist<CookieStore>(
    (set) => ({
      accepted: false,
      acceptCookies: () => set({ accepted: true }),
    }),
    {
      name: 'rr-cookie-storage',
      getStorage: () => localStorage,
    }
  )
)
