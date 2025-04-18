import React from 'react'

import { useTranslations } from 'next-intl'

function CookiePolicy() {
  const t = useTranslations('Legal.CookiePolicy')

  return (
    <div className="px-2">
      <p className="mt-2 text-xs text-gray-800 italic dark:text-gray-500">
        {t('intro')}
      </p>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section1.title')}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('section1.content')}
      </p>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section2.title')}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('section2.content')}
      </p>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section3.title')}
      </h2>
      {['necessary', 'performance', 'functional', 'targeting'].map((type) => (
        <p key={type} className="text-sm text-gray-500 dark:text-gray-400">
          <strong>{t(`section3.${type}.title`)}</strong>{' '}
          {t(`section3.${type}.content`)}
        </p>
      ))}
    </div>
  )
}

export default CookiePolicy
