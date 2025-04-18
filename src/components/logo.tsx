import React from 'react'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}
export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn('text-2xl', className)}>
      <span className="text-light-blue font-bold">rapid</span>
      <span className="text-dark-gray dark:text-light-gray font-medium">
        resume
      </span>
    </div>
  )
}

export function ShortLogo({ className }: LogoProps) {
  return (
    <div className={cn('text-xl', className)}>
      <span className="text-light-blue font-bold">R</span>
      <span className="text-dark-gray dark:text-light-gray font-medium">R</span>
    </div>
  )
}
