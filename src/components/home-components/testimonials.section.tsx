import { useTranslations } from 'next-intl'
import { InfiniteMovingCards } from '../ui/infinite-moving-cards'

function TestimonialsSection() {
  const t = useTranslations('Testimonials')

  const testimonials = [
    {
      testimonial: t('items.0.text'),
      name: t('items.0.name'),
    },
    {
      testimonial: t('items.1.text'),
      name: t('items.1.name'),
    },
    {
      testimonial: t('items.2.text'),
      name: t('items.2.name'),
    },
    {
      testimonial: t('items.3.text'),
      name: t('items.3.name'),
    },
    {
      testimonial: t('items.4.text'),
      name: t('items.4.name'),
    },
  ]

  return (
    <section id="testimonials">
      <header>
        <h1 className="text-dark-blue py-6 text-center text-3xl font-bold uppercase lg:text-5xl dark:text-white">
          {t('title')}
        </h1>
      </header>
      <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md py-6 antialiased">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  )
}

export default TestimonialsSection
