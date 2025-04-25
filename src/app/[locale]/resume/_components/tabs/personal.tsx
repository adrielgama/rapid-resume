import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Personal } from '@/schema/resume'
import { ResumeData } from '@/types/resume'

interface PersonalFormProps {
  errors: {
    personal?: {
      name?: string
      email?: string
      phone?: string
    }
  }
  resumeData: ResumeData
  updatePersonal: (field: keyof Personal, value: string) => void
}

export default function PersonalFormTab({
  errors,
  resumeData,
  updatePersonal,
}: PersonalFormProps) {
  return (
    <TabsContent value="personal" className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className={cn(errors.personal?.name && 'text-red-400')}
          >
            Nome Completo
          </Label>
          <Input
            id="name"
            value={resumeData.personal.name}
            onChange={(e) => updatePersonal('name', e.target.value)}
            className={cn(errors.personal?.name && 'border-red-400')}
          />
          {errors.personal?.name && (
            <p className="text-xs text-red-400">{errors.personal.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={cn(errors.personal?.email && 'text-red-400')}
          >
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            value={resumeData.personal.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className={cn(errors.personal?.email && 'border-red-400')}
          />
          {errors.personal?.email && (
            <p className="text-xs text-red-400">{errors.personal.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className={cn(errors.personal?.phone && 'text-red-400')}
          >
            Telefone
          </Label>
          <Input
            id="phone"
            value={resumeData.personal.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className={cn(errors.personal?.phone && 'border-red-400')}
          />
          {errors.personal?.phone && (
            <p className="text-xs text-red-400">{errors.personal.phone}</p>
          )}
        </div>
      </div>
    </TabsContent>
  )
}
