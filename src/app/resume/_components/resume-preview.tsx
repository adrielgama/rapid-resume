import { Badge } from '@/components/ui/badge'
import { ResumeData } from '@/types/resume'

import {
  ContactItem,
  LanguageItem,
  Paragraph,
  ResumeItem,
  SectionHeader,
} from './preview'

export interface ResumePreviewProps {
  resumeData: ResumeData
  color?: string
}

function ResumePreview({ resumeData, color = '#4aa2ef' }: ResumePreviewProps) {
  return (
    <div className="space-y-4 rounded-md border bg-white p-4 text-dark-blue">
      <h2 className="text-4xl font-bold">{resumeData.profile.name}</h2>
      <section className="flex gap-6 text-sm">
        <ContactItem resumeData={resumeData} color={color} />
      </section>
      <section>
        <SectionHeader color={color} title="Profile" />
        <Paragraph>{resumeData.resume}</Paragraph>
      </section>

      <section className="pt-4">
        <SectionHeader color={color} title="Experience" />
        {resumeData.experience.map((exp, idx) => (
          <ResumeItem
            key={idx}
            title={exp.title}
            institutionOrCompany={exp.company}
            degreeOrLocation={exp.location}
            endPeriod={exp.endPeriod}
            startPeriod={exp.startPeriod}
            description={exp.description}
            color={color}
          />
        ))}
      </section>

      <section className="pt-4">
        <SectionHeader color={color} title="Education" />
        {resumeData.education.map((edu, idx) => (
          <ResumeItem
            key={idx}
            title={edu.title}
            institutionOrCompany={edu.institution}
            degreeOrLocation={edu.degree}
            endPeriod={edu.endPeriod}
            startPeriod={edu.startPeriod}
            description={edu.description}
            color={color}
          />
        ))}
      </section>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <section className="col-span-1">
          <SectionHeader color={color} title="Skills" />
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
        <section className="col-span-1">
          <SectionHeader color={color} title="Languages" />
          <div className="flex flex-col flex-wrap gap-4">
            {resumeData.languages.map((lang, idx) => (
              <LanguageItem
                key={idx}
                language={lang.language}
                level={lang.level}
                color={color}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResumePreview
