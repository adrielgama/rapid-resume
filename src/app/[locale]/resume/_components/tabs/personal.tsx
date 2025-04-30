/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { FormErrors } from '@/types/errors'
import { ResumeData } from '@/types/resume'

interface PersonalFormProps {
  errors: Pick<FormErrors, 'personal'>
  resumeData: ResumeData
  updatePersonal: <K extends keyof ResumeData['personal']>(
    field: K,
    value: ResumeData['personal'][K]
  ) => void
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
            htmlFor="location"
            className={cn(errors.personal?.location && 'text-red-400')}
          >
            Localização
          </Label>
          <Input
            id="location"
            value={resumeData.personal.location}
            onChange={(e) => updatePersonal('location', e.target.value)}
            className={cn(errors.personal?.name && 'border-red-400')}
          />
          {errors.personal?.name && (
            <p className="text-xs text-red-400">{errors.personal.name}</p>
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
          <Label className="text-sm font-medium">Links</Label>
          {resumeData.personal.links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={link}
                onChange={(e) => {
                  const updatedLinks = [...resumeData.personal.links]
                  updatedLinks[index] = e.target.value
                  updatePersonal('links', updatedLinks as any)
                }}
                className={cn(errors.personal?.links && 'border-red-400')}
              />
              {resumeData.personal.links.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updatedLinks = resumeData.personal.links.filter(
                      (_, i) => i !== index
                    )
                    updatePersonal('links', updatedLinks as any)
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              updatePersonal('links', [...resumeData.personal.links, ''] as any)
            }
            className="flex items-center"
          >
            <Plus className="mr-2 size-4" /> Adicionar Link
          </Button>
          {errors.personal?.links && (
            <p className="text-xs text-red-400">{errors.personal.links}</p>
          )}
        </div>
      </div>
    </TabsContent>
  )
}
