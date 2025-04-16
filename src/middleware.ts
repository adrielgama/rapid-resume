import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'pt',
})

const isProtectedRoute = createRouteMatcher(['/resume(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const res = await intlMiddleware(req)

  if (isProtectedRoute(req)) await auth.protect()

  return res
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
