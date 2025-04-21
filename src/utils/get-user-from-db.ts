import bcrypt from 'bcryptjs'

import { db } from '@/lib/firebase'

export async function getUserFromDb(email: string, password: string) {
  try {
    console.log('Querying Firestone for user with email: ', email)
    const snapshot = await db
      .collection('users')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get()

    // if (snapshot.empty) return null
    if (snapshot.empty) {
      console.log('No user found in Firestore for email:', email)
      return null
    }

    const user = snapshot.docs[0].data()
    const hashedPassword = user.hashedPassword

    // if (typeof hashedPassword !== 'string') return null
    if (typeof hashedPassword !== 'string') {
      console.error('Invalid hashedPassword for user:', email)
      return null
    }

    const passwordMatch = await bcrypt.compare(password, hashedPassword)
    console.log('Password match result for email:', email, passwordMatch)

    if (!passwordMatch) return null

    return {
      id: snapshot.docs[0].id,
      email: user.email,
      name: user.name,
    }
  } catch (error) {
    console.error('Error in getUserFromDb:', error)
    throw new Error('DATABASE_ERROR')
  }
}
