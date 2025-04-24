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
    <Suspense fallback={<Loader />}>
      <ResumePreview resumeData={resumeData} />
    </Suspense>
  )
}
