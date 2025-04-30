'use client'
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { useResume } from '@/context/resume-context'
import { cn } from '@/lib/utils'

import EducationFormTab from './tabs/education'
import ExperienceFormTab from './tabs/experience'
import PersonalFormTab from './tabs/personal'
import SkillsFormTab from './tabs/skills'
import SummaryFormTab from './tabs/summary'

export default function ResumeForm() {
  const {
    steps,
    currentStep,
    setCurrentStep,
    resumeData,
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
  } = useResume()

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-40 w-full animate-pulse rounded bg-gray-200" />
      </div>
    )
  }

  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextIndex = currentIndex + 1
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex].id)
      }
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  return (
    <Card className="border-none shadow-none md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {steps.find((step) => step.id === currentStep)?.title}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-2 size-4" />{' '}
            {showPreview ? 'Ocultar' : 'Mostrar'} Preview
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(showPreview && 'hidden md:block')}>
        <Tabs value={currentStep} onValueChange={setCurrentStep}>
          {/* DADOS PESSOAIS */}
          <PersonalFormTab
            errors={errors}
            resumeData={resumeData}
            updatePersonal={updatePersonal}
          />

          {/* RESUMO */}
          <SummaryFormTab
            resumeData={resumeData}
            updateSummary={updateSummary}
            errors={errors}
          />

          {/* EXPERIÊNCIA */}
          <ExperienceFormTab
            errors={errors}
            resumeData={resumeData}
            updateExperience={updateExperience}
            removeExperience={removeExperience}
            addExperience={addExperience}
          />

          {/* EDUCAÇÃO */}
          <EducationFormTab
            errors={errors}
            resumeData={resumeData}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
            addEducation={addEducation}
          />

          {/* HABILIDADES */}
          <SkillsFormTab
            resumeData={resumeData}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-2 size-4" /> Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
        >
          {currentIndex === steps.length - 1 ? 'Finalizar' : 'Próximo'}{' '}
          {currentIndex !== steps.length - 1 && (
            <ChevronRight className="ml-2 size-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
