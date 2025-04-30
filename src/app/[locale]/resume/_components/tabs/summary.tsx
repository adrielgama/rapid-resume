import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/context/resume-context'
import { cn } from '@/lib/utils'
import { FormErrors } from '@/types/errors'
import { ResumeData } from '@/types/resume'

interface SummaryFormProps {
  resumeData: ResumeData
  updateSummary: (value: string) => void
  errors: Pick<FormErrors, 'summary'>
}
export default function SummaryFormTab({
  resumeData,
  updateSummary,
  errors,
}: SummaryFormProps) {
  const { updateLanguage, addLanguage, removeLanguage } = useResume()

  return (
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
          className={cn('min-h-[150px]', errors.summary && 'border-red-400')}
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
        />
        {errors.summary && (
          <p className="text-xs text-red-400">{errors.summary}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Idiomas</Label>
        {resumeData.languages.map((lang, index) => (
          <div key={index} className="grid grid-cols-12 items-center gap-2">
            <Input
              placeholder="Idioma"
              value={lang.language}
              onChange={(e) =>
                updateLanguage(index, 'language', e.target.value)
              }
              className="col-span-5"
            />
            <Input
              placeholder="Nível (ex: Fluente)"
              value={lang.level}
              onChange={(e) => updateLanguage(index, 'level', e.target.value)}
              className="col-span-5"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLanguage(index)}
              className="col-span-2"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={addLanguage}
          className="flex items-center"
        >
          <Plus className="mr-2 size-4" /> Adicionar Idioma
        </Button>
      </div>
    </TabsContent>
  )
}
