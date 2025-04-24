import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'

import { Toaster } from '@/components/ui/sonner'
import { routing } from '@/i18n/routing'
import { ProgressProviderWrapper } from '@/providers/progress'
import { ThemeProvider } from '@/providers/theme'

import type { Metadata } from 'next'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rapid Resume',
  description: 'Fast, easy, and beautiful resume.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} data-theme="light">
        <ProgressProviderWrapper>
          <NextIntlClientProvider>
            <Toaster richColors />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ProgressProviderWrapper>
      </body>
    </html>
  )
}
