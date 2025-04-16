import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

function FAQSection() {
  const t = useTranslations('FAQ')

  const faqItems = [
    {
      trigger: t('items.0.question'),
      content: t('items.0.answer'),
      value: 'item-1',
    },
    {
      trigger: t('items.1.question'),
      content: t('items.1.answer'),
      value: 'item-2',
    },
    {
      trigger: t('items.2.question'),
      content: t('items.2.answer'),
      value: 'item-3',
    },
    {
      trigger: t('items.3.question'),
      content: t('items.3.answer'),
      value: 'item-4',
    },
    {
      trigger: t('items.4.question'),
      content: t('items.4.answer'),
      value: 'item-5',
    },
  ]

  return (
    <section id="faq">
      <header>
        <h2 className="text-dark-blue dark:text-light-gray py-6 text-center text-3xl font-bold">
          {t('title')}
        </h2>
      </header>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default FAQSection
