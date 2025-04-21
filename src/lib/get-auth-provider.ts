'use server'
import { db } from './firebase'

export async function getAuthProviderForEmail(
  email: string
): Promise<string | null> {
  const snapshot = await db
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()

  if (snapshot.empty) return null

  const userData = snapshot.docs[0].data()
  const providers = userData.providers ?? []

  return providers.length > 0 ? providers[0] : null
}
