import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Linkedin from 'next-auth/providers/linkedin'
import { ZodError } from 'zod'

import { getUserFromDb } from '@/utils/get-user-from-db'

import { firebaseCert, db } from './firebase'
import { signInSchema } from './zod'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Linkedin({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('Authorizing credentials:', { email: credentials.email })
          const { email, password } = await signInSchema.parseAsync(credentials)
          const user = await getUserFromDb(email, password)

          if (!user) {
            const snapshot = await db
              .collection('users')
              .where('email', '==', email.toLowerCase())
              .limit(1)
              .get()

            if (snapshot.empty) {
              console.log('User not found for email:', email)
              throw new Error(
                JSON.stringify({
                  code: 'USER_NOT_FOUND',
                  message: 'User not found',
                })
              )
            } else {
              console.log('Invalid password for email:', email)
              throw new Error(
                JSON.stringify({
                  code: 'INVALID_PASSWORD',
                  message: 'Invalid password',
                })
              )
            }
          }

          console.log('User authorized:', { id: user.id, email: user.email })
          return { id: user.id, email: user.email, name: user.name }
        } catch (error) {
          console.error('Authorize error:', error)
          if (error instanceof ZodError) {
            const firstError = error.errors[0]
            const errorPath =
              typeof firstError.path[0] === 'string'
                ? firstError.path[0].toUpperCase()
                : String(firstError.path[0])
            const errorMessage = `${errorPath}_INVALID: ${firstError.message}`
            throw new Error(
              JSON.stringify({
                code: errorMessage,
                message: firstError.message,
              })
            )
          }
          throw error
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
