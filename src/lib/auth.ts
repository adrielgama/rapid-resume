import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Linkedin from 'next-auth/providers/linkedin'

import { firebaseCert } from './firebase'

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
        // This is where you would typically verify the user credentials against your database
        // For demo purposes, we're using a simple check
        if (
          credentials?.email === 'user@example.com' &&
          credentials?.password === 'password'
        ) {
          return {
            id: '1',
            name: 'Demo User',
            email: 'user@example.com',
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
})
