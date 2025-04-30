import React from 'react'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}
export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn('text-2xl', className)}>
      <span className="font-bold">
        Rapid<span className="text-blue-400">Resume</span>
      </span>
    </div>
  )
}

export function ShortLogo({ className }: LogoProps) {
  return (
    <div className={cn('text-xl', className)}>
      <span className="font-bold">
        R<span className="text-blue-400">R</span>
      </span>
    </div>
  )
}
