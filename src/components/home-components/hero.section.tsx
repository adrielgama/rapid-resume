import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { Button } from '../ui/button'

function HeroSection() {
  const t = useTranslations('Home.HeroSection')

  return (
    <section className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-dark-blue dark:text-light-gray text-center text-4xl font-bold lg:text-7xl">
        {t('title')} <span className="text-light-blue">{t('highlight')}</span>
      </h1>
      <p className="text-dark-gray text-sm lg:text-base">{t('description')}</p>

      <Button size="lg" asChild>
        <Link href="/login">{t('cta')}</Link>
      </Button>
    </section>
  )
}

export default HeroSection
