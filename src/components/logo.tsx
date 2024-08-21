import React from 'react'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}
export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn('text-2xl', className)}>
      <span className="font-bold text-light-blue">rapid</span>
      <span className="font-medium text-dark-gray dark:text-light-gray">
        resume
      </span>
    </div>
  )
}

export function ShortLogo({ className }: LogoProps) {
  return (
    <div className={cn('text-xl', className)}>
      <span className="font-bold text-light-blue">R</span>
      <span className="font-medium text-dark-gray dark:text-light-gray">R</span>
    </div>
  )
}
