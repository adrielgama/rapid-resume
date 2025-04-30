import { useEffect, useRef } from 'react'

import Image from 'next/image'

const steps = [
  {
    id: 1,
    title: 'Escolha seu modelo',
    description:
      'Selecione entre dezenas de modelos profissionais e personalizados para o seu setor.',
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Preencha seus dados',
    description:
      'Utilize nossa IA para otimizar suas descrições ou insira manualmente suas informações.',
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Personalize e exporte',
    description:
      'Ajuste cores, fontes e layouts. Exporte seu currículo em PDF ou compartilhe online.',
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
  },
]

export function HowItWorks() {
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

  return (
    <section
      id="how-it-works"
      className="bg-white py-20 dark:bg-gray-900"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Como Funciona
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Três passos simples para criar o currículo perfeito
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="animate-on-scroll flex flex-col items-center text-center"
              style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-400/10 text-blue-400">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll mt-20 rounded-2xl bg-gray-50 p-8 md:p-12 dark:bg-gray-800">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                Assistência de IA para seu currículo
              </h3>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Nossa IA analisa vagas de emprego e sugere melhorias para seu
                currículo, ajudando a destacar habilidades relevantes e
                experiências que aumentam suas chances de ser chamado para
                entrevistas.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Sugestões inteligentes de palavras-chave',
                  'Correção gramatical e de estilo',
                  'Otimização para sistemas ATS',
                  'Personalização para vagas específicas',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-700 dark:text-gray-200"
                  >
                    <svg
                      className="mr-2 size-5 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="from-primary absolute -inset-1 rounded-lg bg-gradient-to-r to-blue-600 opacity-30 blur"></div>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/600x400?text=AI+Assistant"
                  alt="AI Assistant"
                  className="h-auto w-full"
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
