import Header from '@/components/header'
import {
  HeroSection,
  OurFeaturesSection,
  PricingSection,
  StatisticsSection,
  TestimonialsSection,
} from '@/components/home-components'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-dark-blue">
      <Header />
      <div className="container h-full w-full max-w-5xl space-y-16 py-16">
        <HeroSection />
        <StatisticsSection />
        <OurFeaturesSection />
        <PricingSection />
        <TestimonialsSection />
      </div>
    </main>
  )
}
