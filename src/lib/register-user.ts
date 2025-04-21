'use server'

import { ZodError } from 'zod'

import { db } from '@/lib/firebase'
import { saltAndHashPassword } from '@/utils/password'

import { registerSchema } from './zod'

export async function registerUser(formData: {
  name: string
  email: string
  password: string
}) {
  try {
    const { name, email, password } = await registerSchema.parseAsync(formData)

    const snapshot = await db
      .collection('users')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get()

    if (!snapshot.empty) {
      throw new Error('Email already in use')
    }

    const hashedPassword = await saltAndHashPassword(password)

    const userRef = await db.collection('users').add({
      name,
      email: email.toLowerCase(),
      hashedPassword,
      createdAt: new Date().toISOString(),
    })

    return { success: true, userId: userRef.id }
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))
      return { success: false, error: fieldErrors }
    }
    return {
      success: false,
      error: (error as Error).message || 'Registration failed',
    }
  }
}
