'use client'
import React from 'react'

import { ShieldCheck } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

const features = [
  {
    title: 'Multi-Format Support',
    description:
      'Easily convert various file types to PDF with just a few clicks.',
    summary:
      'With Multi-Format Support, you can effortlessly convert DOCX, XLSX, PPT, and more to PDF.',
  },
  {
    title: 'Completely Free',
    description:
      'Enjoy unlimited PDF conversions without any costs or hidden fees.',
    summary:
      'Our service is completely free with no hidden charges or subscription fees.',
  },
  {
    title: 'Privacy & Security',
    description:
      'Your files are safe with us—no storage, no tracking, just secure conversions.',
    summary:
      'We prioritize your privacy and security. No data is stored or tracked during the conversion process.',
  },
  {
    title: 'Cross-Platform',
    description: 'Use our service on any device or operating system.',
    summary:
      'Our tool works seamlessly across all devices and operating systems, including Windows, macOS, iOS, and Android.',
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
    <div className="container mx-auto flex max-w-5xl flex-wrap justify-center gap-4 py-4">
      <div className="flex gap-4">
        <div className="flex-1 rounded-md bg-gray-100 p-4 dark:bg-zinc-800">
          <h1 className="text-2xl font-bold">{selectedFeature.title}</h1>
          <p className="mt-2 text-lg">{selectedFeature.summary}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isSelected={selectedFeature.title === feature.title}
              onClick={() => setSelectedFeature(feature)}
              icon={<ShieldCheck size={32} />}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurFeatures
