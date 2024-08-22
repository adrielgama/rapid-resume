import { Link } from './links'

export type LangLevel = 'Basic' | 'Conversational' | 'Advanced' | 'Fluent'

export interface Experience {
  title: string
  company: string
  location: string
  startPeriod: string
  endPeriod: string
  description: string
}

export interface Profile {
  name: string
  email: string
  phone: string
  location: string
  title?: string
}

export interface Education {
  title: string
  institution: string
  degree: string
  startPeriod: string
  endPeriod: string
  description: string
}

export interface Languages {
  language: string
  level: LangLevel
}

export interface ResumeData {
  profile: Profile
  resume: string
  experience: Experience[]
  education: Education[]
  links: Link[]
  skills: string[]
  languages: Languages[]
}

export type FormData = Experience | Education

export interface GenericMultipleFormProps<T extends FormData> {
  data: T
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof T
  ) => void
  onDelete: () => void
  entityType: 'experience' | 'education'
}

export interface ResumePreviewProps {
  resumeData: ResumeData
}
