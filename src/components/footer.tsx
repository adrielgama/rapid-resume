import { Link } from '@/i18n/navigation'
import { DialogPolicy } from './terms/dialog-policy'
import PrivacyPolicy from './terms/privacy-policy'
import TermsOfService from './terms/terms-of-service'
import { Separator } from './ui/separator'
import { useTranslations } from 'next-intl'

function Footer() {
  const t = useTranslations('Legal')
  const year = new Date().getFullYear()

  return (
    <footer className="container grid max-w-5xl grid-cols-1 place-content-center py-4 text-center lg:grid-cols-2 lg:text-start">
      <div className="text-xs text-gray-400">
        <div className="my-2 flex justify-center gap-4 py-2 lg:justify-start">
          <DialogPolicy
            title={t('privacyPolicy')}
            lastUpdate="21/08/2024"
            content={<PrivacyPolicy />}
          />
          <Separator orientation="vertical" className="h-4" />
          <DialogPolicy
            title={t('termsOfService')}
            lastUpdate="21/08/2024"
            content={<TermsOfService />}
          />
        </div>
        <p>
          &copy; {year} {t('copyright')}
        </p>
      </div>
      <div className="mt-1 text-xs text-gray-400 lg:mt-4 lg:text-right">
        <p>
          {t('developedBy')}{' '}
          <Link
            href="https://adrielgama.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-blue hover:underline"
          >
            Adriel Gama
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
