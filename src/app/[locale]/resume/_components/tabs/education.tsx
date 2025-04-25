import { Trash2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Education } from '@/schema/resume'
import { FormErrors } from '@/types/errors'
import { ResumeData } from '@/types/resume'

interface EducationFormProps {
  resumeData: ResumeData
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string
  ) => void
  addEducation: () => void
  removeEducation: (index: number) => void
  errors: Pick<FormErrors, 'education'>
}
export default function EducationFormTab({
  resumeData,
  updateEducation,
  errors,
  removeEducation,
  addEducation,
}: EducationFormProps) {
  return (
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
              onChange={(e) => updateEducation(index, 'school', e.target.value)}
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
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
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
              className={cn(errors.education?.[index]?.year && 'text-red-400')}
            >
              Período
            </Label>
            <Input
              id={`year-${index}`}
              value={edu.year}
              onChange={(e) => updateEducation(index, 'year', e.target.value)}
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
  )
}
