'use client'
import { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'

import { Button } from './ui/button'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    isVisible && (
      <Button
        size="icon"
        onClick={scrollToTop}
        className={`bg-light-blue/80 lg:bg-light-blue fixed right-4 bottom-4 z-50 rounded-full p-3 text-white shadow-lg transition-all duration-300 ease-in-out dark:bg-white/80 dark:lg:bg-white ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <ArrowUp size={24} />
      </Button>
    )
  )
}

export default ScrollToTopButton
