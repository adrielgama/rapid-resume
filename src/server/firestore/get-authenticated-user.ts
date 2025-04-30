import { redirect } from 'next/navigation'
import { User } from 'next-auth'

import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'

export async function getAuthenticatedUser() {
  const session = await auth()

  if (!session || !session.user?.id) {
    redirect('/login')
  }

  const user = session.user as User
  const userId = user.id

  if (!userId) redirect('/login')

  const userDoc = await db.collection('users').doc(userId).get()
  const userData = userDoc.data()

  return {
    user,
    userId,
    subscriptionStatus: userData?.subscriptionStatus || null,
    subscriptionPlan: userData?.subscriptionPlan || null,
    subscriptionStartDate: userData?.subscriptionStartDate || null,
    subscriptionCanceledDate: userData?.subscriptionCanceledDate || null,
    stripeCustomerId: userData?.stripeCustomerId || null,
    stripeSubscriptionId: userData?.stripeSubscriptionId || null,
  }
}
