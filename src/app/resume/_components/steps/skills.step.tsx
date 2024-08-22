import { useEffect, useState } from 'react'

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
  const [selectedArea, setSelectedArea] = useState<AreaOfWork | ''>('')
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

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleAddCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills((prev) => [...prev, customSkill])
      setCustomSkill('')
    }
  }

  const filteredSkills: string[] = searchTerm
    ? areasOfWork[selectedArea as AreaOfWork]?.filter((skill: string) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : selectedArea
      ? areasOfWork[selectedArea as AreaOfWork]
      : []

  return (
    <div className="p-4">
      <Select onValueChange={(value: AreaOfWork) => setSelectedArea(value)}>
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
                    className="select-none"
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
