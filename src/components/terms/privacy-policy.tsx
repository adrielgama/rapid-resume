import React from 'react'

import { useTranslations } from 'next-intl'

function PrivacyPolicy() {
  const t = useTranslations('Legal.PrivacyPolicy')

  return (
    <div className="px-2">
      <p className="mt-2 text-xs text-gray-800 italic dark:text-zinc-500">
        {t('intro')}
      </p>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section1.title')}
      </h2>
      <ul className="ml-6 list-disc text-sm text-gray-500 dark:text-gray-400">
        <li>
          <strong>{t('section1.personal.title')}</strong>:{' '}
          {t('section1.personal.content')}
        </li>
        <li>
          <strong>{t('section1.usage.title')}</strong>:{' '}
          {t('section1.usage.content')}
        </li>
      </ul>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section2.title')}
      </h2>
      <ul className="ml-6 list-disc text-sm text-gray-500 dark:text-gray-400">
        <li>
          <strong>{t('section2.provide.title')}</strong>:{' '}
          {t('section2.provide.content')}
        </li>
        <li>
          <strong>{t('section2.communicate.title')}</strong>:{' '}
          {t('section2.communicate.content')}
        </li>
      </ul>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section3.title')}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('section3.content')}
      </p>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section4.title')}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('section4.content')}
      </p>

      <h2 className="text-dark-blue mt-6 text-xl font-bold dark:text-gray-100">
        {t('section5.title')}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('section5.content')}
      </p>
    </div>
  )
}

export default PrivacyPolicy
