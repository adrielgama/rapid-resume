import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const testimonials = [
  {
    content:
      'O Rapid Resume transformou minha busca de emprego. Criei um currículo impressionante em minutos e consegui entrevistas em empresas que sempre sonhei em trabalhar.',
    author: 'Ana Silva',
    role: 'Desenvolvedora de Software',
    avatar: 'https://placehold.co/100?text=AS',
  },
  {
    content:
      'Como recrutador, posso dizer que currículos criados no Rapid Resume se destacam imediatamente. A formatação profissional e conteúdo otimizado fazem toda a diferença.',
    author: 'Rafael Mendes',
    role: 'Gerente de RH',
    avatar: 'https://placehold.co/100?text=RM',
  },
  {
    content:
      'A ferramenta de IA me ajudou a destacar habilidades que eu nem sabia como expressar. Consegui uma entrevista na primeira semana após atualizar meu currículo.',
    author: 'Carolina Ferreira',
    role: 'Analista de Marketing',
    avatar: 'https://placehold.co/100?text=CF',
  },
  {
    content:
      'Após anos usando outros construtores de currículo, o Rapid Resume está em outro nível. A interface é intuitiva e os modelos são verdadeiramente profissionais.',
    author: 'Thiago Oliveira',
    role: 'Arquiteto de Soluções',
    avatar: 'https://placehold.co/100?text=TO',
  },
  {
    content:
      'Como proprietária de pequena empresa, uso o Rapid Resume para toda minha equipe. Os relatórios de análise nos ajudam a entender como melhorar nossos perfis profissionais.',
    author: 'Márcia Santos',
    role: 'Empreendedora',
    avatar: 'https://placehold.co/100?text=MS',
  },
  {
    content:
      'A versão gratuita já é excelente, mas o plano Pro desbloqueou recursos que realmente fizeram diferença na minha carreira. Vale cada centavo!',
    author: 'Pedro Costa',
    role: 'Designer UX',
    avatar: 'https://placehold.co/100?text=PC',
  },
]

export function TestimonialsSection() {
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
      id="testimonials"
      className="bg-white py-20 dark:bg-gray-900"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            O Que Nossos Usuários Dizem
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Histórias reais de profissionais que impulsionaram suas carreiras
            com o Rapid Resume
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'animate-on-scroll rounded-xl bg-gray-50 p-6 dark:bg-gray-800',
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              )}
              style={{ transitionDelay: `${0.1 * ((index % 3) + 1)}s` }}
            >
              <div className="flex h-full flex-col">
                <div className="flex-1">
                  <div className="mb-4 flex">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        className="size-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic dark:text-gray-300">
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="mr-4 h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll mt-16 rounded-2xl bg-blue-400/10 p-8 md:p-12 dark:bg-blue-400/5">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Pronto para impulsionar sua carreira?
            </h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Junte-se a milhares de profissionais que já transformaram suas
              oportunidades de carreira com o Rapid Resume.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-400/90 focus:outline-none"
                aria-label="Começar gratuitamente"
              >
                Começar Gratuitamente
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Saber Mais
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
