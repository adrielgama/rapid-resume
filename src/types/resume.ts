import { Education, Experience, Personal } from '@/schema/resume'

export type ResumeData = {
  personal: Personal & { location?: string }
  education: Education[]
  experience: (Experience & {
    skills?: string[]
    achievements?: string[]
  })[]
  skills: string[]
  summary: string
  links: string[]
  languages: { language: string; level: string }[]
  certifications: { name: string; year: string }[]
}
