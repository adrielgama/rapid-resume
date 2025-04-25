import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FaLinkedinIn } from 'react-icons/fa'

import Footer from '../footer'
import Logo from '../logo'
import { Separator } from '../ui/separator'

function FooterSection() {
  const t = useTranslations('Home.Footer')

  const sections = [
    { title: t('sections.features'), href: '#features' },
    { title: t('sections.pricing'), href: '#pricing' },
    { title: t('sections.testimonials'), href: '#testimonials' },
    { title: t('sections.faq'), href: '#faq' },
  ]

  const contacts = [
    {
      icon: Mail,
      label: 'adrielgama@gmail.com',
      href: 'mailto:adrielgama@gmail.com',
    },
    {
      icon: Phone,
      label: '+55 (71) 99655-9476',
      href: 'tel:+5571996559476',
    },
    {
      icon: FaLinkedinIn,
      label: 'Rapid Resume',
      href: 'https://www.linkedin.com/company/rapid-resume-builder',
    },
  ]

  return (
    <section className="w-full bg-zinc-100 dark:bg-zinc-900">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 py-16 md:grid-cols-4 lg:py-24">
        <div className="col-span-2 space-y-4">
          <Logo className="text-lg" />
          <p className="mt-4 max-w-sm text-xs text-gray-400">
            {t('description')}
          </p>
        </div>
        <div className="col-span-1 text-sm">
          <h3 className="mb-4 font-bold text-gray-500 dark:text-gray-200">
            {t('sectionsTitle')}
          </h3>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            {sections.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className="hover:text-light-blue hover:underline"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="mb-4 font-bold text-gray-500 dark:text-gray-200">
            {t('contactTitle')}
          </h3>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            {contacts.map((contact) => (
              <li key={contact.href} className="flex items-center">
                <contact.icon size={16} className="mr-2" />
                <Link
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-light-blue hover:underline"
                >
                  {contact.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator />
      <Footer />
    </section>
  )
}

export default FooterSection
