import Image from 'next/image'

import BMCButton from '@public/images/bmc-button.svg'
import BMCQRCode from '@public/images/bmc_qr.webp'

import { Separator } from '../ui/separator'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

function PricingSection() {
  const t = useTranslations('Pricing')

  return (
    <section
      id="pricing"
      className="mx-auto flex w-full flex-col items-center justify-center space-y-4 py-16"
    >
      <header>
        <h1 className="text-dark-blue dark:text-light-blue text-3xl font-bold uppercase lg:text-5xl">
          {t('title')}
        </h1>
      </header>

      <p className="dark:text-light-gray max-w-xl py-6 text-center text-sm text-zinc-600 lg:text-base">
        {t.rich('description', {
          strong: (chunks) => (
            <span className="text-light-blue font-bold">{chunks}</span>
          ),
        })}
      </p>

      <div className="flex flex-col items-center gap-16 lg:flex-row">
        <Link
          href="https://buymeacoffee.com/adrielgama"
          target="_blank"
          rel="noopener noreferrer"
          className="w-40 overflow-hidden transition-all hover:w-44 hover:drop-shadow-xs"
        >
          <Image
            src={BMCButton}
            alt={t('buttonAlt')}
            width={160}
            height={160}
            layout="responsive"
          />
        </Link>
        <Separator orientation="vertical" className="hidden h-12 lg:block" />
        <Image
          src={BMCQRCode}
          alt={t('qrAlt')}
          width={100}
          height={100}
          layout="responsive"
          className="max-w-32"
        />
      </div>
    </section>
  )
}

export default PricingSection
