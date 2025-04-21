'use server'

import { isEmailTaken } from '@/utils/db'

export async function validateEmailForRegistration(email: string) {
  const emailTaken = await isEmailTaken(email)
  if (emailTaken) {
    throw new Error('Email already in use')
  }
}
