import 'server-only'
import Stripe from 'stripe'

import PremiumCanceledEmail from '@/components/resend/canceled'
import { db } from '@/lib/firebase'
import resend from '@/lib/resend'
import { formatDate } from '@/utils/format-date'

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent
) {
  console.log('Cancelou a assinatura')
  const customerId = event.data.object.customer
  const userRef = await db
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .get()

  if (userRef.empty) {
    console.error('Usuário não encontrado')
    return
  }

  const userId = userRef.docs[0].id
  const userEmail = userRef.docs[0].data().email

  await db
    .collection('users')
    .doc(userId)
    .update({
      subscriptionStatus: 'inactive',
      subscriptionCanceledDate: formatDate(event.data.object.canceled_at),
    })

  const { data, error } = await resend.emails.send({
    from: 'Rapid Resume <me@adrielgama.dev>',
    to: [userEmail],
    subject: 'Assinatura cancelada | Rapid Resume',
    react: PremiumCanceledEmail() as React.ReactElement,
    text: 'Sua assinatura foi cancelada com sucesso.',
  })

  if (error) {
    console.error(error)
  }

  console.log(data)
}
