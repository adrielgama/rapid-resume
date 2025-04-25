'use client'
import { Eye, ChevronLeft, ChevronRight, Trash2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/context/resume-context'
import { cn } from '@/lib/utils'

import EducationFormTab from './tabs/education'
import PersonalFormTab from './tabs/personal'

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

          {/* EDUCAÇÃO */}
          <EducationFormTab
            errors={errors}
            resumeData={resumeData}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
            addEducation={addEducation}
          />
          <TabsContent value="education" className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="relative space-y-4">
                {resumeData.education.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 size-8"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
                <div className="space-y-2">
                  <Label
                    htmlFor={`school-${index}`}
                    className={cn(
                      errors.education?.[index]?.school && 'text-red-400'
                    )}
                  >
                    Instituição
                  </Label>
                  <Input
                    id={`school-${index}`}
                    value={edu.school}
                    onChange={(e) =>
                      updateEducation(index, 'school', e.target.value)
                    }
                    className={cn(
                      errors.education?.[index]?.school && 'border-red-400'
                    )}
                  />
                  {errors.education?.[index]?.school && (
                    <p className="text-xs text-red-400">
                      {errors.education[index].school}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`degree-${index}`}
                    className={cn(
                      errors.education?.[index]?.degree && 'text-red-400'
                    )}
                  >
                    Curso/Grau
                  </Label>
                  <Input
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, 'degree', e.target.value)
                    }
                    className={cn(
                      errors.education?.[index]?.degree && 'border-red-400'
                    )}
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-xs text-red-400">
                      {errors.education[index].degree}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`year-${index}`}
                    className={cn(
                      errors.education?.[index]?.year && 'text-red-400'
                    )}
                  >
                    Período
                  </Label>
                  <Input
                    id={`year-${index}`}
                    value={edu.year}
                    onChange={(e) =>
                      updateEducation(index, 'year', e.target.value)
                    }
                    className={cn(
                      errors.education?.[index]?.year && 'border-red-400'
                    )}
                  />
                  {errors.education?.[index]?.year && (
                    <p className="text-xs text-red-400">
                      {errors.education[index].year}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addEducation}
              className="flex items-center"
            >
              <Plus className="mr-2 size-4" /> Adicionar Educação
            </Button>
          </TabsContent>

          {/* EXPERIÊNCIA */}
          <TabsContent value="experience" className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative space-y-4">
                {index > 0 && <Separator className="my-12" />}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor={`company-${index}`}
                      className={cn(
                        errors.experience?.[index]?.company && 'text-red-400'
                      )}
                    >
                      Empresa
                    </Label>
                    {resumeData.experience.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(index, 'company', e.target.value)
                    }
                    className={cn(
                      errors.experience?.[index]?.company && 'border-red-400'
                    )}
                  />
                  {errors.experience?.[index]?.company && (
                    <p className="text-xs text-red-400">
                      {errors.experience[index].company}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`position-${index}`}
                    className={cn(
                      errors.experience?.[index]?.position && 'text-red-400'
                    )}
                  >
                    Cargo
                  </Label>
                  <Input
                    id={`position-${index}`}
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(index, 'position', e.target.value)
                    }
                    className={cn(
                      errors.experience?.[index]?.position && 'border-red-400'
                    )}
                  />
                  {errors.experience?.[index]?.position && (
                    <p className="text-xs text-red-400">
                      {errors.experience[index].position}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`period-${index}`}
                    className={cn(
                      errors.experience?.[index]?.period && 'text-red-400'
                    )}
                  >
                    Período
                  </Label>
                  <Input
                    id={`period-${index}`}
                    value={exp.period}
                    onChange={(e) =>
                      updateExperience(index, 'period', e.target.value)
                    }
                    className={cn(
                      errors.experience?.[index]?.period && 'border-red-400'
                    )}
                  />
                  {errors.experience?.[index]?.period && (
                    <p className="text-xs text-red-400">
                      {errors.experience[index].period}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addExperience}
              className="flex items-center"
            >
              <Plus className="mr-2 size-4" /> Adicionar Experiência
            </Button>
          </TabsContent>

          {/* HABILIDADES */}
          <TabsContent value="skills" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Habilidades</Label>
              <div className="mb-4 flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-muted flex items-center rounded-full px-3 py-1"
                  >
                    <span className="mr-2">{skill}</span>
                    <button
                      className="text-muted-foreground hover:text-red-400"
                      onClick={() => removeSkill(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {resumeData.skills.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Adicione pelo menos uma habilidade
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  id="new-skill"
                  placeholder="Adicionar nova habilidade"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addSkill(e.currentTarget.value.trim())
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.getElementById(
                      'new-skill'
                    ) as HTMLInputElement
                    if (input.value.trim()) {
                      addSkill(input.value.trim())
                      input.value = ''
                    }
                  }}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* RESUMO */}
          <TabsContent value="summary" className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="summary"
                className={cn(errors.summary && 'text-red-400')}
              >
                Resumo Profissional
              </Label>
              <Textarea
                id="summary"
                className={cn(
                  'min-h-[150px]',
                  errors.summary && 'border-red-400'
                )}
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
              />
              {errors.summary && (
                <p className="text-xs text-red-400">{errors.summary}</p>
              )}
            </div>
          </TabsContent>
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
