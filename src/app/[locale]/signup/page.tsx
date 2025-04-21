import { useTranslations } from 'next-intl'

import { RegisterForm } from '@/components/auth/register-form'

export default function SignupPage() {
  const t = useTranslations('Auth')

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-8">
        <h1 className="text-center text-2xl font-semibold">
          {t('titleSignup')}
        </h1>
        <RegisterForm />
      </div>
    </div>
  )
}
