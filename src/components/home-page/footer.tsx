import Link from 'next/link'

import { DialogPolicy } from '../terms/dialog-policy'
import PrivacyPolicy from '../terms/privacy-policy'
import TermsOfService from '../terms/terms-of-service'
import { ThemeToggle } from '../theme-toggle'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold">
                  Rapid<span className="text-blue-400">Resume</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-gray-300">
                Transforme suas oportunidades de carreira com currículos
                profissionais que impressionam recrutadores e destacam seu
                potencial.
              </p>
              <div className="mt-6 flex space-x-4">
                <Link
                  href="https://www.linkedin.com/company/rapid-resume-builder"
                  className="text-gray-400 transition hover:text-blue-400"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Produto
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-300 transition hover:text-blue-400"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-300 transition hover:text-blue-400"
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-300 transition hover:text-blue-400"
                  >
                    Depoimentos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-gray-800 py-6 md:flex-row">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6">
            <p className="text-sm text-gray-400">
              &copy; 2025 Rapid Resume. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <DialogPolicy
                title="Privacidade"
                lastUpdate="21/08/2024"
                content={<PrivacyPolicy />}
              />
              <DialogPolicy
                title="Termos de Serviço"
                lastUpdate="21/08/2024"
                content={<TermsOfService />}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center md:mt-0">
            <span className="mr-4 text-sm text-gray-400">Mudar tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
