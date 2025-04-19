/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'

import { getProviders } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function SocialLoginButtons() {
  const [providers, setProviders] = useState<any>(null)

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  if (!providers) return null

  return (
    <>
      {Object.values(providers).map((provider: any) =>
        provider.id === 'email' ? (
          <form
            key={provider.id}
            action="/api/auth/signin/email"
            method="POST"
            className="flex flex-col gap-2"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Seu e-mail"
              className="rounded border p-2"
            />
            <Button type="submit">Entrar por e-mail</Button>
          </form>
        ) : (
          <form
            key={provider.name}
            action={`/api/auth/signin/${provider.id}`}
            method="POST"
          >
            <Button type="submit">Entrar com {provider.name}</Button>
          </form>
        )
      )}
    </>
  )
}
