'use client'
import React, { Suspense, useState, lazy } from 'react'

import Loader from '@/components/loader'
import { ResumeData } from '@/types/resume'

import { dataProfile } from './_data/data'

const ResumePreview = lazy(() => import('./_components/resume-preview'))

export default function ResumePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resumeData, setResumeData] = useState<ResumeData>(
    dataProfile as ResumeData
  )

  return (
    <div className="z-0 grid min-h-screen w-full grid-cols-1 gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 lg:grid-cols-2 lg:p-6 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="col-span-1">
        <Suspense fallback={<Loader />}>
          <ResumePreview resumeData={resumeData} />
        </Suspense>
      </div>
    </div>
  )
}
