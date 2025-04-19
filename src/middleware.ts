import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'pt',
})

export default intlMiddleware

export const config = {
  matcher: ['/((?!api/auth|_next|.*\\..*).*)'],
}
