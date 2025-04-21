import bcrypt from 'bcryptjs'

export async function saltAndHashPassword(password: unknown) {
  if (typeof password !== 'string') {
    throw new Error('Password must be a string')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}
