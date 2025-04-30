import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

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

    const animatedElements = sectionEl.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const plans = [
    {
      name: 'Gratuito',
      description: 'Perfeito para começar sua busca de emprego',
      price: {
        monthly: 'GRÁTIS',
        annual: 'GRÁTIS',
      },
      features: [
        '1 download por mês',
        'Exportação em PDF',
        'Armazenamento em nuvem',
      ],
      limitations: [
        'Sem assistência de IA',
        'Sem análise de dados',
        'Sem perfil personalizado',
        'Sem suporte prioritário',
        'Sem análise de visualizações',
      ],
      cta: 'Começar Grátis',
      popular: false,
      variant: 'rrOutline' as const,
    },
    {
      name: 'Mensal',
      description: 'Para profissionais que buscam destaque',
      price: {
        monthly: 'R$ 9,90',
        annual: 'R$ 118,80',
      },
      features: [
        'Downloads ilimitados',
        'Template premium preparado para IA',
        'Assistência de IA para otimização',
        'Perfil online com URL personalizada',
        'Análise de visualizações e downloads',
        'Suporte prioritário',
        'Armazenamento em nuvem',
      ],
      limitations: [],
      cta: 'Assinar Agora',
      popular: true,
      variant: 'rr' as const,
    },
    {
      name: 'Anual',
      description: 'Para profissionais que buscam destaque e querem economizar',
      price: {
        monthly: 'R$ 5,82',
        annual: 'R$ 69,90',
      },
      features: [
        'Downloads ilimitados',
        'Template premium preparado para IA',
        'Assistência de IA para otimização',
        'Perfil online com URL personalizada',
        'Análise de visualizações e downloads',
        'Suporte prioritário',
        'Armazenamento em nuvem',
      ],
      limitations: [],
      cta: 'Contatar Vendas',
      popular: false,
      variant: 'rrOutline' as const,
    },
  ]

  return (
    <section
      id="pricing"
      className="bg-gray-50 py-20 dark:bg-gray-900/50"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Preços Transparentes
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Escolha o plano ideal para impulsionar sua carreira profissional
          </p>
        </div>

        <div className="animate-on-scroll mt-10 flex items-center justify-center space-x-4">
          <span
            className={cn(
              'text-sm font-medium',
              billingCycle === 'monthly'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            Mensal
          </span>
          <button
            type="button"
            className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none dark:bg-gray-700"
            role="switch"
            aria-checked={billingCycle === 'annual'}
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
            }
          >
            <span className="sr-only">Toggle billing cycle</span>
            <span
              className={cn(
                'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              )}
            />
          </button>
          <span className="flex items-center">
            <span
              className={cn(
                'mr-2 text-sm font-medium',
                billingCycle === 'annual'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              Anual
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Economize 40%
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                'animate-on-scroll overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:transform hover:shadow-xl dark:bg-gray-800',
                plan.popular
                  ? 'ring-2 ring-blue-400'
                  : 'ring-1 ring-gray-200 dark:ring-gray-700'
              )}
              style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
            >
              {plan.popular && (
                <div className="bg-blue-400 py-1 text-center text-sm font-medium text-white">
                  Mais Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price[billingCycle]}
                  </span>
                  {plan.name !== 'Gratuito' && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {billingCycle === 'monthly'
                        ? plan.name === 'Mensal'
                          ? '/mês'
                          : '/mês, cobrança anual'
                        : plan.name === 'Mensal'
                          ? '/ano, cobrança mensal'
                          : '/ano'}
                    </span>
                  )}
                </p>
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="mt-6 w-full"
                  asChild
                >
                  <Link href="/login" aria-label={plan.cta}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
              <div className="px-8 pb-8">
                <p className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                  O que está incluído
                </p>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 size-5 flex-shrink-0 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={`limit-${i}`} className="flex items-start">
                      <svg
                        className="mt-0.5 mr-3 size-5 flex-shrink-0 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll mt-16 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Perguntas Frequentes
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tire suas dúvidas sobre nossos planos e funcionalidades
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'Posso mudar de plano a qualquer momento?',
                answer:
                  'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se você fizer upgrade, a cobrança será proporcional ao tempo restante do seu período atual. Se fizer downgrade, o novo preço será aplicado na próxima renovação.',
              },
              {
                question: 'Como funciona a versão gratuita?',
                answer:
                  'Nossa versão gratuita permite que você crie um currículo básico usando nossos modelos padrão. É perfeita para quem está começando, mas tem limitações em comparação com os planos pagos.',
              },
              {
                question: 'É possível cancelar minha assinatura?',
                answer:
                  'Sim, você pode cancelar sua assinatura a qualquer momento através da sua conta. Ao cancelar, você continuará tendo acesso às funcionalidades premium até o final do período pago.',
              },
              {
                question: 'Como funciona a assistência de IA?',
                answer:
                  'Nossa IA analisa seu currículo e compara com milhares de exemplos bem-sucedidos no seu setor. Ela sugere melhorias na linguagem, formatação e destaca pontos fortes que aumentam suas chances de ser notado por recrutadores.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-t border-gray-200 pt-6 dark:border-gray-700"
              >
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.question}
                </h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
