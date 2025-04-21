/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import type * as React from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Icons } from './icons'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const t = useTranslations('Auth')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      const result = await signIn(provider, { callbackUrl: '/resume' })

      if (result?.error === 'OAuthAccountNotLinked') {
        toast.error(t('error.oauthAccountNotLinked'))
        window.location.href = `/login?error=OAuthAccountNotLinked`
        return
      }

      if (result?.ok && result.url) {
        router.push(result.url)
      }
    } catch (error) {
      setError(t('error.somethingWentWrong'))
      toast.error(t('error.somethingWentWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="h-4 w-4" />
            )}
            <span>{t('signIn')} GitHub</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="h-4 w-4" />
            )}
            <span>{t('signIn')} Google</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialLogin('linkedin')}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.linkedin className="h-4 w-4" />
            )}
            <span>{t('signIn')} LinkedIn</span>
          </Button>
        </div>
        {error && (
          <div className="text-center text-sm text-red-500">{error}</div>
        )}
      </div>
    </div>
  )
}
