import Image from 'next/image'
import Link from 'next/link'

import BMCButton from '@public/images/bmc-button.svg'
import BMCQRCode from '@public/images/bmc_qr.webp'

import { Separator } from '../ui/separator'

function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto flex w-full flex-col items-center justify-center space-y-4 py-16"
    >
      <header>
        <h1 className="text-3xl font-bold uppercase text-dark-blue dark:text-light-blue lg:text-5xl">
          Pricing
        </h1>
      </header>

      <p className="max-w-xl py-6 text-center text-sm text-zinc-600 dark:text-light-gray lg:text-base">
        Our service is completely{' '}
        <span className="font-bold text-light-blue">free</span> to use. If you
        find it helpful, you can support us by buying a coffee to help keep the
        project running!
      </p>

      <div className="flex flex-col items-center gap-16 lg:flex-row">
        <Link
          href="https://buymeacoffee.com/adrielgama"
          target="_blank"
          rel="noopener noreferrer"
          className="w-40 overflow-hidden transition-all hover:w-44 hover:drop-shadow-sm"
        >
          <Image
            src={BMCButton}
            alt="Buy me a coffee - Button"
            width={160}
            height={160}
            layout="responsive"
          />
        </Link>
        <Separator orientation="vertical" className="hidden h-12 lg:block" />
        <Image
          src={BMCQRCode}
          alt="Buy me a coffee - QR Code"
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
