import React, { Suspense } from 'react'

import Loader from '@/components/loader'
import { ResumeProvider } from '@/context/resume-context'

import ResumeForm from './_components/resume-form'
import ResumePreview from './_components/resume-preview'
import Steppers from './_components/stepper'

export default function ResumePage() {
  return (
    <div className="container mx-auto p-2">
      <ResumeProvider>
        <Steppers />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ResumeForm />
          <Suspense fallback={<Loader />}>
            <ResumePreview />
          </Suspense>
        </div>
      </ResumeProvider>
    </div>
  )
}
