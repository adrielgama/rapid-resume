import Header from '@/components/header'
import {
  FAQSection,
  FooterSection,
  HeroSection,
  OurFeaturesSection,
  PricingSection,
  StatisticsSection,
  TestimonialsSection,
} from '@/components/home-components'
import ScrollToTopButton from '@/components/scroll-to-top'
import CookieBanner from '@/components/terms/cookies'

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-dark-blue">
        <Header />
        <div className="container h-full w-full max-w-5xl space-y-4 py-16">
          <HeroSection />
          <StatisticsSection />
          <OurFeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
        </div>
        <FooterSection />
        <ScrollToTopButton />
      </main>
      <CookieBanner />
    </>
  )
}
