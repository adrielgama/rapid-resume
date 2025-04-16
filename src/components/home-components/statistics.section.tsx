'use client'
import useCountUp from '@/hooks/useCountStatistics'

import { Separator } from '../ui/separator'
import { useTranslations } from 'next-intl'

const StatisticsItem = ({ title, value }: { title: string; value: string }) => {
  const decimalPlaces = value.includes('.') ? value.split('.')[1].length : 0
  const animatedValue = useCountUp(parseFloat(value), 2000, decimalPlaces)

  return (
    <article className="flex flex-col items-center">
      <div className="text-2xl font-bold lg:text-4xl">
        {animatedValue}
        {value.includes('+') && '+'}
      </div>
      <p className="text-dark-gray">{title}</p>
    </article>
  )
}

function StatisticsSection() {
  const t = useTranslations('Statistics')

  return (
    <section className="text-dark-blue flex items-center justify-evenly space-x-4 py-16 text-sm dark:text-white">
      <StatisticsItem title={t('cvCreated')} value="300+" />
      <Separator orientation="vertical" className="h-8" />
      <StatisticsItem title={t('rating')} value="9.8" />
      <Separator orientation="vertical" className="h-8" />
      <StatisticsItem title={t('users')} value="100+" />
    </section>
  )
}

export default StatisticsSection
