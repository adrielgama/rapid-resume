import { Trash2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { FormErrors } from '@/types/errors'
import { ResumeData } from '@/types/resume'

interface ExperienceFormProps {
  resumeData: ResumeData
  updateExperience: (
    index: number,
    field: keyof ResumeData['experience'][number],
    value: string
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
  )
}
