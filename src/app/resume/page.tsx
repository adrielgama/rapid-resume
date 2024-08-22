'use client'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResumeData } from '@/types/resume'

import ResumePreview from './_components/resume-preview'
import {
  EducationStep,
  ExperienceStep,
  HeaderStep,
  LinksStep,
  ProfileStep,
  SkillStep,
} from './_components/steps'
import { dataProfile } from './_data/data'

function ResumeSection() {
  const [resumeData, setResumeData] = useState<ResumeData>(
    dataProfile as ResumeData
  )

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col justify-center gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-6 lg:flex-row">
      <div className="md:w-3/5">
        <Tabs defaultValue="header" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="header">
            <HeaderStep resumeData={resumeData} setResumeData={setResumeData} />
          </TabsContent>
          <TabsContent value="links">
            <LinksStep resumeData={resumeData} setResumeData={setResumeData} />
          </TabsContent>
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
          <TabsContent value="education">
            <EducationStep
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </TabsContent>
          <TabsContent value="skills">
            <SkillStep resumeData={resumeData} setResumeData={setResumeData} />
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
