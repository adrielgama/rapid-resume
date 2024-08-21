import { Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import BMCButton from '@public/images/bmc-button.svg'

import Footer from '../footer'
import Logo from '../logo'
import { Separator } from '../ui/separator'

const sections = [
  { title: 'Our features', href: '#features' },
  { title: 'Pricing', href: '#pricing' },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'FAQ', href: '#faq' },
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
    icon: Linkedin,
    label: 'adrielgama',
    href: 'https://linkedin.com/in/adrielgama',
  },
]

function FooterSection() {
  return (
    <section className="w-full bg-zinc-100 dark:bg-zinc-900">
      <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 py-16 md:grid-cols-4 lg:py-24">
        <div className="col-span-2 space-y-4">
          <Logo className="text-lg" />
          <p className="mt-4 max-w-sm text-xs text-gray-400">
            Create your resume in minutes. No more writer&rsquo;s block or
            formatting.
          </p>
          <Link
            href="https://buymeacoffee.com/adrielgama"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={BMCButton}
              alt="Buy me a coffee"
              width={150}
              height={150}
              className="mt-2 grayscale transition-all duration-300 hover:grayscale-0"
            />
          </Link>
        </div>
        <div className="col-span-1 text-sm">
          <h3 className="mb-4 font-bold text-gray-500 dark:text-gray-200">
            Sections
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
            Contact
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
