import { useCallback, useEffect, useMemo, useState } from 'react'

import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ResumeData } from '@/types/resume'

import { AreaOfWork, areasOfWork } from '../../_data/areas-of-work'

interface SkillStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

function SkillStep({ resumeData, setResumeData }: SkillStepProps) {
  const defaultArea: AreaOfWork = Object.keys(areasOfWork)[0] as AreaOfWork
  const [selectedArea, setSelectedArea] = useState<AreaOfWork>(defaultArea)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    resumeData.skills || []
  )
  const [customSkill, setCustomSkill] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (resumeData.skills !== selectedSkills) {
      setResumeData({ ...resumeData, skills: selectedSkills })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills])

  const handleSkillToggle = useCallback((skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }, [])

  const handleAddCustomSkill = useCallback(() => {
    const normalizedSkill = customSkill.trim().toLowerCase()

    const skillExists = selectedSkills.some(
      (skill) => skill.toLowerCase() === normalizedSkill
    )

    if (customSkill && skillExists) {
      toast.info('Skill Already Added')
    } else if (customSkill && !skillExists) {
      setSelectedSkills((prev) => [...prev, customSkill])
      setCustomSkill('')
    }
  }, [customSkill, selectedSkills])

  const allSkills = useMemo(() => {
    return selectedArea
      ? areasOfWork[selectedArea as AreaOfWork].filter(
          (skill) => !selectedSkills.includes(skill)
        )
      : []
  }, [selectedArea, selectedSkills])

  const uniqueSkills = useMemo(() => {
    return Array.from(new Set(allSkills))
  }, [allSkills])

  const filteredSkills: string[] = useMemo(() => {
    return searchTerm
      ? uniqueSkills.filter((skill: string) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : uniqueSkills
  }, [searchTerm, uniqueSkills])

  return (
    <div className="p-4">
      <Select
        value={selectedArea}
        onValueChange={(value: AreaOfWork) => setSelectedArea(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select area of work" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(areasOfWork).map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedArea && (
        <div className="pt-4">
          <h2 className="text-lg font-semibold">
            Select Skills for {selectedArea}
          </h2>
          <Input
            type="text"
            placeholder="Search skills"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <ScrollArea className="h-36 w-full rounded border p-2">
              {filteredSkills.map((skill: string) => (
                <Badge
                  key={skill}
                  variant={
                    selectedSkills.includes(skill) ? 'default' : 'outline'
                  }
                  onClick={() => handleSkillToggle(skill)}
                  className="cursor-pointer select-none"
                >
                  {skill}
                </Badge>
              ))}
            </ScrollArea>
          </div>
          <Label className="mt-4">Selected Skills</Label>
          <ScrollArea className="mt-2 h-36 rounded border p-2">
            {selectedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer select-none"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No skills selected.
              </p>
            )}
          </ScrollArea>
          <div className="mt-4">
            <Label>Add Custom Skill</Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter custom skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
              />
              <Button onClick={handleAddCustomSkill}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillStep
