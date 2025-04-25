import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
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
    </TabsContent>
  )
}
