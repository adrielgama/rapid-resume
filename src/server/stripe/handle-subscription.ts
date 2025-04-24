import 'server-only'

import Stripe from 'stripe'

import PremiumWelcomeEmail from '@/components/resend/welcome'
import { db } from '@/lib/firebase'
import resend from '@/lib/resend'
import { formatDate } from '@/utils/format-date'

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === 'paid') {
    console.log('Pagamento realizado com sucesso! Liberar acesso')

    const metadata = event.data.object.metadata
    const userEmail =
      event.data.object.customer_email ||
      event.data.object.customer_details?.email
    const name = event.data.object.customer_details?.name
    const userId = metadata?.userId

    if (!userId || !userEmail) {
      console.error('User ID ou email não encontrados')
      return
    }

    await db
      .collection('users')
      .doc(userId)
      .set(
        {
          stripeSubscriptionId: event.data.object.subscription,
          subscriptionStatus: 'active',
          subscriptionPlan: metadata.planType,
          subscriptionStartDate: formatDate(event.data.object.created),
        },
        { merge: true }
      )

    const { data, error } = await resend.emails.send({
      from: 'Rapid Resume <me@adrielgama.dev>',
      to: [userEmail],
      subject: 'Recebemos sua assinatura | Rapid Resume',
      react: PremiumWelcomeEmail({ name: name! }) as React.ReactElement,
      text: 'Sua assinatura foi ativada com sucesso.',
    })

    if (error) {
      console.error(error)
    }

    console.log(data)
  }
}
