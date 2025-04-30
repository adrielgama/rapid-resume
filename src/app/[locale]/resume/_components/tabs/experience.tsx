import { Trash2, Plus } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { FormErrors } from '@/types/errors'
import { ResumeData } from '@/types/resume'

interface ExperienceFormProps {
  resumeData: ResumeData
  updateExperience: <K extends keyof ResumeData['experience'][number]>(
    index: number,
    field: K,
    value: ResumeData['experience'][number][K]
  ) => void
  addExperience: () => void
  removeExperience: (index: number) => void
  errors: Pick<FormErrors, 'experience'>
}

export default function ExperienceFormTab({
  resumeData,
  updateExperience,
  errors,
  removeExperience,
  addExperience,
}: ExperienceFormProps) {
  return (
    <TabsContent value="experience" className="space-y-4">
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="relative space-y-4">
          {index > 0 && <Separator className="my-12" />}
          {/* Empresa */}
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

          {/* Cargo */}
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

          {/* Período */}
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

          <Accordion type="single" collapsible>
            {/* Tarefas */}
            <AccordionItem value="item-1" className="space-y-2">
              <AccordionTrigger>
                <Label className="text-sm font-medium">
                  Responsabilidades Técnicas
                </Label>
              </AccordionTrigger>
              <AccordionContent asChild className="px-1">
                {exp.skills?.map((skill, i) => (
                  <div key={i} className="flex items-start py-2">
                    <Textarea
                      value={skill}
                      onChange={(e) => {
                        const updatedSkills = [...(exp.skills || [])]
                        updatedSkills[i] = e.target.value
                        updateExperience(index, 'skills', updatedSkills)
                      }}
                      className="min-h-[80px] flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updatedSkills =
                          exp.skills?.filter((_, j) => j !== i) || []
                        updateExperience(index, 'skills', updatedSkills)
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    updateExperience(index, 'skills', [
                      ...(exp.skills || []),
                      '',
                    ])
                  }
                  className="flex items-center"
                >
                  <Plus className="mr-2 size-4" /> Adicionar Responsabilidade
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Resultados Relevantes (achievements) */}
            <AccordionItem value="item-2" className="space-y-2">
              <AccordionTrigger>
                <Label className="text-sm font-medium">
                  Resultados Relevantes
                </Label>
              </AccordionTrigger>
              <AccordionContent asChild className="px-1">
                {exp.achievements?.map((ach, i) => (
                  <div key={i} className="flex items-start py-2">
                    <Textarea
                      value={ach}
                      onChange={(e) => {
                        const updatedAchievements = [
                          ...(exp.achievements || []),
                        ]
                        updatedAchievements[i] = e.target.value
                        updateExperience(
                          index,
                          'achievements',
                          updatedAchievements
                        )
                      }}
                      className="min-h-[80px] flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updatedAchievements =
                          exp.achievements?.filter((_, j) => j !== i) || []
                        updateExperience(
                          index,
                          'achievements',
                          updatedAchievements
                        )
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    updateExperience(index, 'achievements', [
                      ...(exp.achievements || []),
                      '',
                    ])
                  }
                  className="flex items-center"
                >
                  <Plus className="mr-2 size-4" /> Adicionar Resultado
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
  )
}
