'use client'
import React from 'react'

import { DollarSign, Hammer, Languages, ShieldCheck } from 'lucide-react'

import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

const features = [
  {
    title: 'Easy builder',
    description: 'Easily build your PDFs with our intuitive interface.',
    summary:
      'Our intuitive interface makes it easy to create PDFs in just a few clicks.',
    icon: <Hammer size={32} />,
  },
  {
    title: 'Completely Free',
    description:
      'Enjoy unlimited PDF conversions without any costs or hidden fees.',
    summary:
      'Our service is completely free with no hidden charges or subscription fees.',
    icon: <DollarSign size={32} />,
  },
  {
    title: 'Privacy & Security',
    description:
      'Your files are safe with us—no storage, no tracking, just secure conversions.',
    summary:
      'We prioritize your privacy and security. No data is stored or tracked during the conversion process.',
    icon: <ShieldCheck size={32} />,
  },
  {
    title: 'Multi language',
    description: 'Multi language support for all your PDF conversion needs.',
    summary:
      'Our tool works with multiple languages, making it easy to convert PDFs in any language.',
    icon: <Languages size={32} />,
  },
]

const FeatureCard = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: {
  title: string
  description: string
  icon: React.ReactNode
  isSelected?: boolean
  onClick: () => void
}) => (
  <Card
    onClick={onClick}
    className={`max-w-56 cursor-pointer transition-colors dark:bg-zinc-900/30 dark:hover:bg-zinc-900 ${
      isSelected
        ? 'border border-light-blue shadow-lg dark:border-light-blue/50'
        : 'border border-transparent'
    } `}
  >
    <CardHeader className="space-y-4">
      <div className="text-light-blue shadow-light-blue drop-shadow-md">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
)

function OurFeatures() {
  const [selectedFeature, setSelectedFeature] = React.useState(features[0])

  return (
    <section
      id="features"
      className="grid grid-cols-1 flex-col-reverse gap-4 py-6 md:grid-cols-2 md:flex-row lg:py-16"
    >
      <div className="flex flex-col justify-evenly rounded-md md:flex">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase text-light-blue">
            Our features
          </span>
          <h1 className="text-2xl font-bold">{selectedFeature.title}</h1>
          <p className="mt-2 text-zinc-500">{selectedFeature.summary}</p>
        </div>
        <Button
          size="lg"
          variant="outline"
          className="max-w-48 bg-transparent hover:border-light-blue dark:bg-transparent dark:hover:border-light-blue dark:hover:bg-transparent"
        >
          Start for free
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            isSelected={selectedFeature.title === feature.title}
            onClick={() => setSelectedFeature(feature)}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  )
}

export default OurFeatures
