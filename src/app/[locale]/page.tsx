'use client'
import { useEffect } from 'react'

import { Footer } from '@/components/home-page/footer'
import { Header } from '@/components/home-page/header'
import { HeroSection } from '@/components/home-page/hero-section'
import { HowItWorks } from '@/components/home-page/how-it-works'
import { PricingSection } from '@/components/home-page/pricing-section'
import { TestimonialsSection } from '@/components/home-page/testimonials-section'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
