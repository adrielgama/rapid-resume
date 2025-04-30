'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

import {
  User,
  GraduationCap,
  Briefcase,
  Lightbulb,
  FileText,
} from 'lucide-react'
import { z } from 'zod'

import { defaultResumeData } from '@/app/[locale]/resume/_data/data'
import {
  Education,
  personalSchema,
  educationSchema,
  experienceSchema,
  summarySchema,
} from '@/schema/resume'
import { FormErrors } from '@/types/errors'
import { ResumeData } from '@/types/resume'
import { Step } from '@/types/step'

type ResumeContextType = {
  steps: Step[]
  currentStep: string
  setCurrentStep: (step: string) => void
  resumeData: ResumeData
  updateResumeData: (newData: Partial<ResumeData>) => void
  updatePersonal: <K extends keyof ResumeData['personal']>(
    field: K,
    value: ResumeData['personal'][K]
  ) => void
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string
  ) => void
  addEducation: () => void
  removeEducation: (index: number) => void
  updateExperience: <K extends keyof ResumeData['experience'][number]>(
    index: number,
    field: K,
    value: ResumeData['experience'][number][K]
  ) => void
  addExperience: () => void
  removeExperience: (index: number) => void
  addSkill: (skill: string) => void
  removeSkill: (index: number) => void
  updateSummary: (value: string) => void
  updateLanguage: (
    index: number,
    field: keyof ResumeData['languages'][number],
    value: string
  ) => void
  addLanguage: () => void
  removeLanguage: (index: number) => void
  validateCurrentStep: () => boolean
  errors: FormErrors
  showPreview: boolean
  setShowPreview: (show: boolean) => void
  isLoading: boolean
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState('personal')
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [isLoading, setIsLoading] = useState(true)

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('RAPID-RESUME-DATA')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)

        // Verifica se pelo menos nome, email e phone estão preenchidos
        const isEmpty =
          !parsed.personal?.name &&
          !parsed.personal?.email &&
          !parsed.personal?.phone

        if (!isEmpty) {
          setResumeData(parsed)
        } else {
          setResumeData(defaultResumeData)
        }
      } catch {
        setResumeData(defaultResumeData)
      }
    } else {
      setResumeData(defaultResumeData)
    }
    setIsLoading(false)
  }, [])

  const steps = [
    { id: 'personal', title: 'Dados Pessoais', icon: User },
    { id: 'summary', title: 'Resumo', icon: FileText },
    { id: 'experience', title: 'Experiência', icon: Briefcase },
    { id: 'education', title: 'Educação', icon: GraduationCap },
    { id: 'skills', title: 'Habilidades', icon: Lightbulb },
  ]

  useEffect(() => {
    localStorage.setItem('RAPID-RESUME-DATA', JSON.stringify(resumeData))
  }, [resumeData])

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const updatePersonal = <K extends keyof ResumeData['personal']>(
    field: K,
    value: ResumeData['personal'][K]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setResumeData((prev) => {
      const newEducation = [...prev.education]
      newEducation[index] = { ...newEducation[index], [field]: value }
      return { ...prev, education: newEducation }
    })
  }

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }],
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const updateExperience = <K extends keyof ResumeData['experience'][number]>(
    index: number,
    field: K,
    value: ResumeData['experience'][number][K]
  ) => {
    setResumeData((prev) => {
      const newExperience = [...prev.experience]
      newExperience[index] = { ...newExperience[index], [field]: value }
      return { ...prev, experience: newExperience }
    })
  }

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: '', position: '', period: '', skills: [], achievements: [] },
      ],
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }))
    }
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const updateSummary = (value: string) => {
    setResumeData((prev) => ({
      ...prev,
      summary: value,
    }))
  }

  const updateLanguage = (
    index: number,
    field: keyof ResumeData['languages'][number],
    value: string
  ) => {
    setResumeData((prev) => {
      const newLanguages = [...prev.languages]
      newLanguages[index] = { ...newLanguages[index], [field]: value }
      return { ...prev, languages: newLanguages }
    })
  }

  const addLanguage = () => {
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, { language: '', level: '' }],
    }))
  }

  const removeLanguage = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }))
  }

  const validateCurrentStep = () => {
    let isValid = true
    const newErrors: FormErrors = {}

    if (currentStep === 'personal') {
      try {
        personalSchema.parse(resumeData.personal)
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.personal = {}
          error.errors.forEach((err) => {
            if (err.path[0]) {
              newErrors.personal![err.path[0] as string] = err.message
            }
          })
          isValid = false
        }
      }
    } else if (currentStep === 'education') {
      newErrors.education = []
      resumeData.education.forEach((edu, index) => {
        try {
          educationSchema.parse(edu)
        } catch (error) {
          if (error instanceof z.ZodError) {
            newErrors.education![index] = {}
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors.education![index][err.path[0] as string] = err.message
              }
            })
            isValid = false
          }
        }
      })
    } else if (currentStep === 'experience') {
      newErrors.experience = []
      resumeData.experience.forEach((exp, index) => {
        try {
          experienceSchema.parse(exp)
        } catch (error) {
          if (error instanceof z.ZodError) {
            newErrors.experience![index] = {}
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors.experience![index][err.path[0] as string] =
                  err.message
              }
            })
            isValid = false
          }
        }
      })
    } else if (currentStep === 'summary') {
      try {
        summarySchema.parse(resumeData.summary)
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.summary = error.errors[0]?.message
          isValid = false
        }
      }
    }

    setErrors(newErrors)
    return isValid
  }

  return (
    <ResumeContext.Provider
      value={{
        steps,
        currentStep,
        setCurrentStep,
        resumeData,
        updateResumeData,
        updatePersonal,
        updateEducation,
        addEducation,
        removeEducation,
        updateExperience,
        addExperience,
        removeExperience,
        addSkill,
        removeSkill,
        updateSummary,
        updateLanguage,
        addLanguage,
        removeLanguage,
        validateCurrentStep,
        errors,
        showPreview,
        setShowPreview,
        isLoading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
