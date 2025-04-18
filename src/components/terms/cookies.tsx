'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { useCookieStore } from '@/hooks/useCookieStore'

import CookiePolicy from './cookies-policy'
import { DialogPolicy } from './dialog-policy'
import { Button } from '../ui/button'

function CookieBanner() {
  const { acceptCookies } = useCookieStore()
  const [visible, setVisible] = useState(false)
  const t = useTranslations('Legal.CookieBanner')

  useEffect(() => {
    const storedAccepted = localStorage.getItem('rr-cookie-storage')
    const isAccepted = storedAccepted
      ? JSON.parse(storedAccepted).state.accepted
      : false

    if (!isAccepted) {
      setVisible(true)
      document.body.classList.add('cookie-banner-active')
    } else {
      document.body.classList.remove('cookie-banner-active')
    }
  }, [])

  const handleAccept = () => {
    acceptCookies()
    setVisible(false)
  }

  const handleDecline = () => {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="dark:bg-dark-blue/95 fixed right-4 bottom-4 left-4 z-50 flex max-w-sm flex-col justify-between space-y-2 rounded-lg bg-white/95 p-4 shadow-lg transition-opacity duration-300 sm:space-y-4 dark:border dark:border-gray-700/50"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <p className="text-sm text-gray-800 dark:text-gray-200">
        {t('message')}{' '}
        <DialogPolicy
          title="Cookie Policy"
          content={<CookiePolicy />}
          className="text-light-blue dark:text-light-blue text-sm hover:text-blue-600 dark:hover:text-blue-400"
        />
        .
      </p>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={handleAccept}>
          {t('accept')}
        </Button>
        <Button variant="ghost" onClick={handleDecline}>
          {t('decline')}
        </Button>
      </div>
    </div>
  )
}

export default CookieBanner
