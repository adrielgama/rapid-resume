/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useCallback, useMemo, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResumeData } from '@/types/resume'

import ResumePreview from './_components/resume-preview'
import {
  EducationStep,
  ExperienceStep,
  HeaderStep,
  LanguageStep,
  LinksStep,
  ProfileStep,
  SkillStep,
} from './_components/steps'
import { dataProfile } from './_data/data'

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(
    dataProfile as ResumeData
  )

  const steps = useMemo(
    () => [
      { label: 'Header', component: HeaderStep },
      { label: 'Links', component: LinksStep },
      { label: 'Profile', component: ProfileStep },
      { label: 'Experience', component: ExperienceStep },
      { label: 'Education', component: EducationStep },
      { label: 'Skills', component: SkillStep },
      { label: 'Language', component: LanguageStep },
    ],
    []
  )

  const renderTabContent = useCallback(
    (Component: React.ComponentType<any>) => (
      <Component resumeData={resumeData} setResumeData={setResumeData} />
    ),
    [resumeData]
  )

  return (
    <div className="grid min-h-screen w-full grid-cols-1 gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 lg:grid-cols-2 lg:p-6">
      <div className="col-span-1">
        <Tabs defaultValue="Header" className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-evenly">
            {steps.map((step) => (
              <TabsTrigger
                key={step.label}
                value={step.label}
                className="w-full max-w-max text-center"
              >
                {step.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {steps.map((step) => (
            <TabsContent key={step.label} value={step.label}>
              {renderTabContent(step.component)}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="col-span-1">
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  )
}
