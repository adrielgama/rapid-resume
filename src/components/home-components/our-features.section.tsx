'use client'
import React from 'react'

import { DollarSign, Hammer, Languages, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useTranslations } from 'next-intl'

// const features = [
//   {
//     title: 'Easy builder',
//     description: 'Easily build your PDFs with our intuitive interface.',
//     summary:
//       'Our intuitive interface makes it easy to create PDFs in just a few clicks.',
//     icon: <Hammer size={32} />,
//   },
//   {
//     title: 'Completely Free',
//     description:
//       'Enjoy unlimited PDF conversions without any costs or hidden fees.',
//     summary:
//       'Our service is completely free with no hidden charges or subscription fees.',
//     icon: <DollarSign size={32} />,
//   },
//   {
//     title: 'Privacy & Security',
//     description:
//       'Your files are safe with us—no storage, no tracking, just secure conversions.',
//     summary:
//       'We prioritize your privacy and security. No data is stored or tracked during the conversion process.',
//     icon: <ShieldCheck size={32} />,
//   },
//   {
//     title: 'Multi language',
//     description: 'Multi language support for all your PDF conversion needs.',
//     summary:
//       'Our tool works with multiple languages, making it easy to convert PDFs in any language.',
//     icon: <Languages size={32} />,
//   },
// ]

// const FeatureCard = ({
//   title,
//   description,
//   icon,
//   isSelected,
//   onClick,
// }: {
//   title: string
//   description: string
//   icon: React.ReactNode
//   isSelected?: boolean
//   onClick: () => void
// }) => (
//   <Card
//     onClick={onClick}
//     className={`max-w-56 cursor-pointer transition-colors dark:bg-zinc-900/30 dark:hover:bg-zinc-900 ${
//       isSelected
//         ? 'border-light-blue dark:border-light-blue/50 border shadow-lg'
//         : 'border border-transparent'
//     } `}
//   >
//     <CardHeader className="space-y-4">
//       <div className="text-light-blue shadow-light-blue drop-shadow-md">
//         {icon}
//       </div>
//       <CardTitle className="text-xl">{title}</CardTitle>
//       <CardDescription>{description}</CardDescription>
//     </CardHeader>
//   </Card>
// )

function OurFeatures() {
  const t = useTranslations('OurFeatures')

  const features = [
    {
      key: 'easyBuilder',
      icon: <Hammer size={32} />,
    },
    {
      key: 'free',
      icon: <DollarSign size={32} />,
    },
    {
      key: 'secure',
      icon: <ShieldCheck size={32} />,
    },
    {
      key: 'multiLanguage',
      icon: <Languages size={32} />,
    },
  ]
  const [selectedFeature, setSelectedFeature] = React.useState(features[0])

  return (
    <section
      id="features"
      className="grid grid-cols-1 flex-col-reverse gap-4 py-6 md:grid-cols-2 md:flex-row lg:py-16"
    >
      <div className="flex flex-col justify-evenly rounded-md md:flex">
        <div className="space-y-4">
          <span className="text-light-blue text-xs font-bold uppercase">
            {t('sectionTitle')}
          </span>
          <h1 className="text-2xl font-bold">
            {t(`${selectedFeature.key}.title`)}
          </h1>
          <p className="mt-2 text-zinc-500">
            {t(`${selectedFeature.key}.summary`)}
          </p>
        </div>
        <Button
          size="lg"
          variant="outline"
          className="hover:border-light-blue dark:hover:border-light-blue max-w-48 bg-transparent dark:bg-transparent dark:hover:bg-transparent"
          asChild
        >
          <Link href="/signup">{t('cta')}</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <Card
            key={index}
            onClick={() => setSelectedFeature(feature)}
            className={`max-w-56 cursor-pointer transition-colors dark:bg-zinc-900/30 dark:hover:bg-zinc-900 ${
              selectedFeature.key === feature.key
                ? 'border-light-blue dark:border-light-blue/50 border shadow-lg'
                : 'border border-transparent'
            }`}
          >
            <CardHeader className="space-y-4">
              <div className="text-light-blue shadow-light-blue drop-shadow-md">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">
                {t(`${feature.key}.title`)}
              </CardTitle>
              <CardDescription>
                {t(`${feature.key}.description`)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default OurFeatures
