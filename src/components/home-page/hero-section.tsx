import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      },
      { threshold: 0.1 }
    )

    const animatedElements = heroEl.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section
      className="bg-gradient-to-br from-blue-50 to-blue-100 pt-32 pb-20 dark:from-blue-900/20 dark:to-blue-800/20"
      ref={heroRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="max-w-2xl flex-1">
            <h1 className="animate-on-scroll text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Seu <span className="text-blue-400">currículo perfeito</span>,
              <br />
              em minutos
            </h1>
            <p
              className="animate-on-scroll mt-6 text-lg text-gray-600 sm:text-xl dark:text-gray-300"
              style={{ transitionDelay: '0.1s' }}
            >
              Crie currículos profissionais que impressionam recrutadores com
              nossa ferramenta intuitiva. Aumente suas chances de conseguir o
              emprego dos sonhos.
            </p>
            <div
              className="animate-on-scroll mt-8 flex flex-col gap-4 sm:flex-row"
              style={{ transitionDelay: '0.2s' }}
            >
              <Button variant="rr" size="lg" asChild className="text-lg">
                <Link href="/login">Começar Grátis</Link>
              </Button>
              <Button size="lg" variant="rrOutline" asChild className="text-lg">
                <a href="#how-it-works">Como Funciona</a>
              </Button>
            </div>
            <div
              className="animate-on-scroll mt-10"
              style={{ transitionDelay: '0.3s' }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Usado por profissionais de mais de 100 empresas
              </p>
            </div>
          </div>
          <div
            className="animate-on-scroll w-full max-w-lg flex-1"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="relative">
              <div className="from-primary absolute -inset-1 rounded-lg bg-gradient-to-r to-blue-600 opacity-30 blur"></div>
              <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <Image
                  src="https://placehold.co/600x400?text=Resume+Preview"
                  alt="Preview do currículo"
                  className="h-auto w-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
