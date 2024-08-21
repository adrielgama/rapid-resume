export interface Experience {
  title: string
  company: string
  location: string
  startPeriod: string
  endPeriod: string
  description: string
}

export interface ResumeData {
  profile: string
  experience: Experience[]
}

export interface ExperienceFormProps {
  experience: Experience
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof Experience
  ) => void
  onDelete: () => void
}

export interface ResumePreviewProps {
  resumeData: ResumeData
}
