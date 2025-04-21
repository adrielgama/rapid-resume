/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import type * as React from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerUser } from '@/lib/register-user'
import { cn } from '@/lib/utils'

import { Icons } from './icons'

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultEmail?: string
}

export function RegisterForm({
  className,
  defaultEmail,
  ...props
}: RegisterFormProps) {
  const t = useTranslations('Auth')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: defaultEmail ?? '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { name, email, password } = formData
      const result = await registerUser({ name, email, password })

      if (!result.success) {
        if (Array.isArray(result.error)) {
          const firstError = result.error[0]
          toast.error(`${firstError.path.toUpperCase()}:`, {
            description: firstError.message,
          })
          setError(`${firstError.path.toUpperCase()}: ${firstError.message}`)
        } else {
          setError(result.error || t('error.somethingWentWrong'))
        }

        setIsLoading(false)
        return
      }

      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: '/resume',
      })

      if (signInResult?.error) {
        setError(t('error.somethingWentWrong'))
        setIsLoading(false)
        return
      }

      router.push('/resume')
    } catch (err: any) {
      setError(err.message || t('error.somethingWentWrong'))
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      const result = await signIn(provider, {
        callbackUrl: '/resume',
      })

      if (result?.error === 'OAuthAccountNotLinked') {
        toast.error(t('error.oauthAccountNotLinked'))
        const emailParam = formData.email ? `&email=${formData.email}` : ''
        window.location.href = `/login?error=OAuthAccountNotLinked${emailParam}`
        return
      }

      if (result?.ok && result.url) {
        router.push(result.url)
      }
    } catch (error) {
      toast.error(t('error.somethingWentWrong'))
      setError(t('error.somethingWentWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="given-name"
              autoCorrect="off"
              spellCheck="false"
              disabled={isLoading}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="new-email"
              inputMode="email"
              autoCorrect="off"
              spellCheck="false"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {t('signup')}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-muted-foreground bg-[#121212] px-2">
            {t('or')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin('github')}
        >
          {isLoading ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <Icons.gitHub className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin('google')}
        >
          {isLoading ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <Icons.google className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin('linkedin')}
        >
          {isLoading ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <Icons.linkedin className="size-4" />
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        {t('alreadyHaveAccount')}{' '}
        <a
          href="/login"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          {t('login')}
        </a>
      </div>
    </div>
  )
}
