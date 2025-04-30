'use server'

import { db } from '@/lib/firebase'

export async function fetchUserFromFirestore(userId: string) {
  const userDoc = await db.collection('users').doc(userId).get()
  const userData = userDoc.data()

  if (!userData) return null

  return {
    userId,
    name: userData.name || null,
    email: userData.email || null,
    image: userData.image || null,
    subscriptionPlan: userData.subscriptionPlan || null,
    subscriptionStatus: userData.subscriptionStatus || null,
    subscriptionStartDate: userData.subscriptionStartDate || null,
    subscriptionCanceledDate: userData.subscriptionCanceledDate || null,
    stripeCustomerId: userData.stripeCustomerId || null,
    stripeSubscriptionId: userData.stripeSubscriptionId || null,
  }
}
