import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { handleStripeCancelSubscription } from '@/server/stripe/handle-cancel'
import { handleStripeSubscription } from '@/server/stripe/handle-subscription'

const secret = process.env.STRIPE_WEBHOOK_SECRET

if (!secret) {
  throw new Error('SSTRIPE_WEBHOOK_SECRET is not set')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature || !secret) {
      return new Response('Signature or secret not found', { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    switch (event.type) {
      case 'checkout.session.completed':
        const metadata = event.data.object.metadata
        console.log('Metadata: ', metadata)
        await handleStripeSubscription(event)
        break
      case 'checkout.session.expired':
        console.log(
          'Enviar um e-mail para o cliente informando que o pagamento expirou'
        )
        break
      case 'checkout.session.async_payment_succeeded': // Boleto Pago
        console.log(
          'Enviar um e-mail para o cliente informando que o pagamento foi confirmado'
        )
        break
      case 'checkout.session.async_payment_failed': // Boleto falhou
        console.log(
          'Enviar um e-mail para o cliente informando que o pagamento falhou'
        )
        break
      case 'customer.subscription.created': // Assinatura criada
        console.log(
          'Mensagem de boas-vindas para o cliente porque ele criou a assinatura'
        )
        break
      case 'customer.subscription.deleted': // Assinatura cancelada
        await handleStripeCancelSubscription(event)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return new Response('Webhook Error', { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
