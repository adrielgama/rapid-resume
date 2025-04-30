import { Education, Experience, Personal } from '@/schema/resume'

export type ResumeData = {
  personal: Personal & { location?: string; links: string[] }
  education: Education[]
  experience: (Experience & {
    skills?: string[]
    achievements?: string[]
  })[]
  skills: string[]
  summary: string
  languages: { language: string; level: string }[]
  certifications: { name: string; year: string }[]
}
