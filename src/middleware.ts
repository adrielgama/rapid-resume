import { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'pt',
})

export function middleware(req: NextRequest) {
  const response = intlMiddleware(req)

  response.headers.set('x-url', req.url)

  return response
}

export const config = {
  matcher: ['/((?!api/auth|_next|.*\\..*).*)'],
}
