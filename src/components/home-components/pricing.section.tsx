import { CheckCircle2, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

function PricingSection() {
  const t = useTranslations('Home.Pricing')

  const plans = [
    {
      name: t('plans.free.name'),
      price: 0,
      duration: t('plans.free.duration'),
      description: t('plans.free.description'),
      features: [
        t('features.onlineResume'),
        t('features.uniqueTemplate'),
        t('features.pdfDownload'),
        t('features.realTimeUpdates'),
        t('features.recruiterVisibility'),
        t('features.crossPlatform'),
      ],
      cta: t('plans.free.cta'),
      href: '/login',
      highlighted: false,
    },
    {
      name: t('plans.monthly.name'),
      price: 9.9,
      duration: t('plans.monthly.duration'),
      description: t('plans.monthly.description'),
      features: [
        t('features.onlineResume'),
        t('features.uniqueTemplate'),
        t('features.pdfDownload'),
        t('features.realTimeUpdates'),
        t('features.recruiterVisibility'),
        t('features.crossPlatform'),
        t('features.englishTranslation'),
        t('features.dualLanguageDownload'),
        t('features.customUrl'),
      ],
      cta: t('plans.monthly.cta'),
      href: '/login',
      highlighted: true,
    },
    {
      name: t('plans.annual.name'),
      price: 69.9,
      duration: t('plans.annual.duration'),
      description: t('plans.annual.description'),
      features: [
        t('features.onlineResume'),
        t('features.uniqueTemplate'),
        t('features.pdfDownload'),
        t('features.realTimeUpdates'),
        t('features.recruiterVisibility'),
        t('features.crossPlatform'),
        t('features.englishTranslation'),
        t('features.dualLanguageDownload'),
        t('features.customUrl'),
        t('features.annualDiscount'),
      ],
      cta: t('plans.annual.cta'),
      href: '/login',
      highlighted: false,
    },
  ]

  return (
    <section
      id="pricing"
      className="mx-auto flex w-full flex-col items-center justify-center space-y-8 py-16"
    >
      <header className="text-center">
        <h1 className="text-dark-blue dark:text-light-blue text-3xl font-bold uppercase lg:text-5xl">
          {t('title')}
        </h1>
        <p className="dark:text-light-gray mt-4 max-w-2xl text-center text-sm text-zinc-600 lg:text-base">
          {t.rich('description', {
            strong: (chunks) => (
              <span className="text-light-blue font-bold">{chunks}</span>
            ),
          })}
        </p>
      </header>

      <div className="grid w-full max-w-6xl grid-cols-1 items-stretch gap-6 px-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="relative flex flex-col rounded-xl border border-zinc-300 bg-gradient-to-b from-zinc-50 to-zinc-100 shadow-md dark:!border-zinc-800 dark:from-zinc-900 dark:to-neutral-950"
          >
            {plan.highlighted && (
              <div className="absolute top-4 right-4 md:top-2 md:right-2 lg:top-6 lg:right-6">
                <Badge className="!bg-blue-400 !text-zinc-800">
                  {t('mostPopular')}
                </Badge>
              </div>
            )}
            <CardHeader className="flex flex-col text-zinc-800 dark:text-white">
              <CardTitle className="text-xl font-semibold">
                {plan.name}
              </CardTitle>
              <p className="text-sm opacity-80">{plan.description}</p>
              <div className="mt-2 text-4xl font-bold md:text-3xl lg:text-4xl">
                {formatCurrency(plan.price)}
                <span className="ml-1 text-sm">{plan.duration}</span>
              </div>
              <div className="py-6">
                <Button
                  asChild
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-lg bg-transparent py-3 font-semibold text-zinc-800 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:text-white',
                    plan.highlighted &&
                      '!bg-blue-200 text-blue-900 hover:!bg-blue-400 hover:text-white dark:!bg-blue-300 dark:text-zinc-800 dark:hover:!bg-blue-400 dark:hover:text-white'
                  )}
                  variant="outline"
                  size="lg"
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.name === t('plans.free.name') ? (
                  plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-blue-300" />
                      <span className="text-sm text-zinc-700 dark:text-white">
                        {feature}
                      </span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="text-sm text-zinc-700 dark:text-white">
                      {t('features.freePlanIncluded')}
                    </li>
                    {plan.features.slice(6).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 pl-2"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-green-400" />
                        <span className="text-sm text-zinc-700 dark:text-white">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        {t('disclaimer')}
      </p>
    </section>
  )
}

export default PricingSection
