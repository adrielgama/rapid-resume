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

import {
  Education,
  Experience,
  Personal,
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
  updatePersonal: (field: keyof Personal, value: string) => void
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string
  ) => void
  addEducation: () => void
  removeEducation: (index: number) => void
  updateExperience: (
    index: number,
    field: keyof Experience,
    value: string
  ) => void
  addExperience: () => void
  removeExperience: (index: number) => void
  addSkill: (skill: string) => void
  removeSkill: (index: number) => void
  updateSummary: (value: string) => void
  validateCurrentStep: () => boolean
  errors: FormErrors
  showPreview: boolean
  setShowPreview: (show: boolean) => void
  isLoading: boolean
}

const defaultResumeData: ResumeData = {
  personal: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+55 (11) 99999-9999',
    location: 'Brasília, Distrito Federal, Brazil',
  },
  education: [
    {
      school: 'Universidade de Brasília',
      degree: 'Análise e Desenvolvimento de Sistemas',
      year: '2025',
    },
  ],
  experience: [
    {
      company: 'Tech Solutions',
      position: 'Desenvolvedor Fullstack Pleno',
      period: 'Jul 2021 a Atual',
      skills: [
        'Responsável pela manutenção de aplicações web e suporte no desenvolvimento backend, atuando com ReactJS, TypeScript e NextJS no front-end, enquanto auxilia na integração e otimização de APIs desenvolvidas com Node, Express e Nest, garantindo interfaces responsivas e aplicações de alto desempenho.',
        'Participação ativa na implementação de testes automatizados, utilizando Jest e Cypress, assegurando a qualidade e confiabilidade do código, além de contribuir para a melhoria contínua dos processos de desenvolvimento ágil, promovendo práticas como Code Review e integração contínua.',
        'Colaboração com equipes multifuncionais para identificar e resolver problemas técnicos, oferecendo suporte técnico e treinamento a membros da equipe, promovendo um ambiente de aprendizado contínuo e compartilhamento de conhecimento.',
      ],
      achievements: [
        'Desenvolvimento de uma aplicação de gerenciamento de projetos que aumentou a eficiência da equipe em 30%.',
        'Implementação de um sistema de autenticação que reduziu o tempo de login em 50%.',
        'Participação em um projeto de migração de dados que economizou 20% do tempo de desenvolvimento.',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'React',
    'Node.js',
    'TypeScript',
    'CSS',
    'HTML',
    'SQL',
    'MongoDB',
    'Git',
    'Agile',
    'Scrum',
    'Jest',
    'Cypress',
    'NestJS',
    'Express',
    'NextJS',
    'Tailwind CSS',
    'Figma',
    'PostgreSQL',
  ],
  summary:
    'Sou um desenvolvedor apaixonado por tecnologia e inovação. Gosto de aprender novas tecnologias e aplicar meus conhecimentos em projetos desafiadores.',
  links: ['https://github.com/johndoe', 'https://www.linkedin.com/in/johndoe'],
  languages: [
    { language: 'Inglês', level: 'Fluente' },
    { language: 'Espanhol', level: 'Intermediário' },
    { language: 'Português', level: 'Nativo' },
  ],
  certifications: [
    { name: 'Certificação em JavaScript', year: '2022' },
    { name: 'Certificação em React', year: '2023' },
    { name: 'Certificação em Node.js', year: '2024' },
  ],
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
    { id: 'education', title: 'Educação', icon: GraduationCap },
    { id: 'experience', title: 'Experiência', icon: Briefcase },
    { id: 'skills', title: 'Habilidades', icon: Lightbulb },
    { id: 'summary', title: 'Resumo', icon: FileText },
  ]

  useEffect(() => {
    localStorage.setItem('RAPID-RESUME-DATA', JSON.stringify(resumeData))
  }, [resumeData])

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const updatePersonal = (field: keyof Personal, value: string) => {
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

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
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
