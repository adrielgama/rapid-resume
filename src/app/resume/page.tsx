'use client'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResumeData } from '@/types/resume'

import ExperienceStep from './_components/experience.step'
import ProfileStep from './_components/profile.step'
import ResumePreview from './_components/resume-preview'

function ResumeSection() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    profile:
      "I'm a Front-end developer with 5 years of experience in responsive web projects...",
    experience: [
      {
        title: 'Full-stack Developer',
        company: 'Farmácias APP',
        location: 'Salvador, Brazil',
        startPeriod: 'Jul 2021',
        endPeriod: 'Present',
        description:
          'Fullstack web development specialist with expertise in front-end technologies...',
      },
    ],
  })

  return (
    <div className="flex min-h-screen w-full flex-1 gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-6">
      <div className="md:w-3/5">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            {/* Add more triggers if needed */}
          </TabsList>

          <TabsContent value="profile">
            <ProfileStep
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceStep
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="md:w-2/5">
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  )
}

export default ResumeSection
