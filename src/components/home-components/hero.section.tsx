import { Button } from '../ui/button'

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-center text-4xl font-bold text-dark-blue dark:text-light-gray lg:text-7xl">
        Create a professional CV in just a few minutes,{' '}
        <span className="text-light-blue">free</span>
      </h1>
      <p className="text-sm text-dark-gray lg:text-base">
        Just fill in the items and you CV ready to use.
      </p>

      <Button size="lg">Get started</Button>
    </section>
  )
}

export default HeroSection
