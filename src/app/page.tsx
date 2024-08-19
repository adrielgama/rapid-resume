import Header from '@/components/header'
import {
  HeroSection,
  OurFeaturesSection,
  StatisticsSection,
} from '@/components/home-components'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-dark-blue">
      <Header />
      <HeroSection />
      <StatisticsSection />
      <OurFeaturesSection />
    </main>
  )
}
