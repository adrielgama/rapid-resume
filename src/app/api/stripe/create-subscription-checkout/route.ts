import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import stripe from '@/lib/stripe'
import { getOrCreateCustomer } from '@/server/stripe/get-customer-id'

export async function POST(req: NextRequest) {
  const { testeId, planType } = await req.json()
  const prices = {
    monthly: process.env.STRIPE_SUBSCRIPTION_MONTHLY_PRICE_ID,
    annual: process.env.STRIPE_SUBSCRIPTION_ANNUAL_PRICE_ID,
  }

  const price = prices[planType as 'monthly' | 'annual']

  if (!price) {
    return NextResponse.json({ error: 'Price not found' }, { status: 500 })
  }

  const session = await auth()
  const userId = session?.user?.id
  const userEmail = session?.user?.email

  if (!userId || !userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const customerId = await getOrCreateCustomer(userId, userEmail)

  const metadata = {
    testeId,
    price,
    planType,
    userId,
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price, quantity: 1 }],
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata,
      customer: customerId,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Session URL not found' },
        { status: 500 }
      )
    }

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
