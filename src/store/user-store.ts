'use client'

import { create } from 'zustand'

type UserStore = {
  userId: string | null
  name: string | null
  email: string | null
  image: string | null
  subscriptionPlan: string | null
  subscriptionStatus: string | null
  subscriptionStartDate: string | null
  subscriptionCanceledDate: string | null
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null

  setUser: (data: Partial<UserStore>) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  name: null,
  email: null,
  image: null,
  subscriptionPlan: null,
  subscriptionStatus: null,
  subscriptionStartDate: null,
  subscriptionCanceledDate: null,
  stripeCustomerId: null,
  stripeSubscriptionId: null,

  setUser: (data) => set((state) => ({ ...state, ...data })),
}))
