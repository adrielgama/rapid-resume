'use client'

import { ProgressProvider } from '@bprogress/next/app'

export function ProgressProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProgressProvider
      height="6px"
      color="#5d97db"
      options={{
        showSpinner: false,
      }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
