import { useEffect, useState } from 'react'

import { loadStripe, Stripe } from '@stripe/stripe-js'

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
      )
      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createSubscriptionStripeCheckout(checkoutData: {
    testId: string
    planType: 'monthly' | 'annual'
  }) {
    if (!stripe) return

    try {
      const res = await fetch('/api/stripe/create-subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      })

      const data = await res.json()

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateStripePortal() {
    const res = await fetch('/api/stripe/create-portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      console.error('Failed to create portal session:', data)
    }
  }

  return {
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  }
}
