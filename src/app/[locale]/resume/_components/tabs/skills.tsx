import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { ResumeData } from '@/types/resume'

interface SkillsFormProps {
  resumeData: ResumeData
  addSkill: (skill: string) => void
  removeSkill: (index: number) => void
}

export default function SkillsFormTab({
  resumeData,
  addSkill,
  removeSkill,
}: SkillsFormProps) {
  return (
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
  )
}
