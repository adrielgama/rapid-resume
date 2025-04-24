import 'server-only'
import { db } from '@/lib/firebase'
import stripe from '@/lib/stripe'

export async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()

    const userData = userDoc.exists ? userDoc.data() : {}
    const stripeCustomerId = userData?.stripeCustomerId

    if (stripeCustomerId) {
      return stripeCustomerId
    }

    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
      ...(userData?.name && { name: userData.name }),
      metadata: {
        userId,
      },
    })

    await userRef.set(
      {
        stripeCustomerId: stripeCustomer.id,
      },
      { merge: true }
    )

    return stripeCustomer.id
  } catch (error) {
    console.error('Error creating customer:', error)
    throw new Error('Failed to create customer')
  }
}
