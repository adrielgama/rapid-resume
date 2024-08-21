import { Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

import BMCButton from '@public/images/bmc-button.svg'

import Logo from '../logo'
import { Separator } from '../ui/separator'

function FooterSection() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-900">
      <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 py-16 md:grid-cols-4 lg:py-24">
        <div className="col-span-2 space-y-4">
          <Logo className="text-lg" />
          <p className="mt-4 max-w-sm text-xs text-gray-400">
            Create your resume in minutes. No more writer&rsquo;s block or
            formatting.
          </p>
          <a
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
          </a>
        </div>
        <div className="col-span-1 text-sm">
          <h3 className="mb-4 font-bold text-gray-500 dark:text-gray-200">
            Sections
          </h3>

          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <a
                href="#features"
                className="hover:text-light-blue hover:underline"
              >
                Our features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:text-light-blue hover:underline"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-light-blue hover:underline"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-light-blue hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="mb-4 font-bold text-gray-500 dark:text-gray-200">
            Contact
          </h3>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center">
              <Mail size={16} className="mr-2" />
              <a
                href="mailto:adrielgama@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-light-blue hover:underline"
              >
                adrielgama@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone size={16} className="mr-2" />
              <a
                href="tel:+5571996559476"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-light-blue hover:underline"
              >
                +55 (71) 99655-9476
              </a>
            </li>
            <li className="flex items-center">
              <Linkedin size={16} className="mr-2" />
              <a
                href="https://linkedin.com/in/adrielgama"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-light-blue hover:underline"
              >
                adrielgama
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator />
      <div className="container grid max-w-5xl grid-cols-1 place-content-center py-4 text-center lg:grid-cols-2 lg:text-start">
        <div className="text-xs text-gray-400">
          <div className="my-2 flex justify-center gap-4 py-2 text-gray-600 lg:justify-start">
            <p className="cursor-pointer hover:text-light-blue hover:underline">
              Privacy Policy
            </p>
            <Separator orientation="vertical" className="h-4" />
            <p className="cursor-pointer hover:text-light-blue hover:underline">
              Terms of Service
            </p>
          </div>
          <p>&copy; {year} Resume Builder. All rights reserved.</p>
        </div>
        <div className="mt-1 text-xs text-gray-400 lg:mt-4 lg:text-right">
          <p>
            Made with ❤️ by{' '}
            <a
              href="https://adrielgama.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-blue hover:underline"
            >
              Adriel Gama
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
