import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'

import { LoginForm } from '@/components/auth/login-form'

export default async function LoginPage() {
  const t = await getTranslations('Auth')

  const headersList = (await headers()) as unknown as Headers
  const rawUrl = headersList.get('x-url')
  const url = new URL(rawUrl ?? '', 'http://localhost')

  const error = url.searchParams.get('error')

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-12 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-sm">{t('description')}</p>
        </div>

        {error === 'OAuthAccountNotLinked' && (
          <div className="text-sm text-red-500">
            {`${t('error.oauthAccountNotLinked')}`}
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  )
}
