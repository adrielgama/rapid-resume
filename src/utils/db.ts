import { db } from '@/lib/firebase'

export async function isEmailTaken(email: string): Promise<boolean> {
  const snapshot = await db
    .collection('users')
    .where('email', '==', email.toLowerCase())
    .limit(1)
    .get()

  return !snapshot.empty
}
