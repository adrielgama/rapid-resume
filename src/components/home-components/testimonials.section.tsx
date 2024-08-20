import { InfiniteMovingCards } from '../ui/infinite-moving-cards'

const testimonials = [
  {
    testimonial:
      "This online PDF generator is simply amazing! I was able to create my documents in minutes, and best of all, it's completely free. Highly recommended!",
    name: 'John Smith',
  },
  {
    testimonial:
      'I was looking for an easy-to-use tool to convert my files, and this site exceeded my expectations. The interface is intuitive, and the process is fast.',
    name: 'Emma Johnson',
  },
  {
    testimonial:
      'I never thought it would be so easy to create high-quality PDFs. Plus, the security of my files was a major plus. Great job!',
    name: 'Michael Brown',
  },
  {
    testimonial:
      "I'm a loyal user of this PDF generator. It's free, fast, and reliable. If you need help, the developers even offer incredible support.",
    name: 'Olivia Williams',
  },
  {
    testimonial:
      'I use this PDF generator for all my work needs. The multi-format support functionality is essential for me. I love it!',
    name: 'Sophia Davis',
  },
]

function TestimonialsSection() {
  return (
    <section>
      <h1 className="py-6 text-center text-3xl font-bold uppercase text-dark-blue dark:text-white lg:text-5xl">
        Testimonials
      </h1>
      <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md py-6 antialiased">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          // pauseOnHover={false}
        />
      </div>
    </section>
  )
}

export default TestimonialsSection
