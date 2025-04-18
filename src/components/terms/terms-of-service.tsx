import React from 'react'

import { useTranslations } from 'next-intl'

function TermsOfService() {
  const t = useTranslations('Legal.TermsOfService')

  return (
    <div className="px-2">
      <p className="mt-2 text-xs text-gray-800 italic dark:text-gray-500">
        {t('intro')}
      </p>

      {Array.from({ length: 8 }).map((_, index) => {
        const section = `section${index + 1}`
        return (
          <div key={section}>
            <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
              {t(`${section}.title`)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t(`${section}.content`)}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default TermsOfService
