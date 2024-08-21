/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ExperienceFormProps } from '@/types/resume'

function ExperienceForm({
  experience,
  onChange,
  onDelete,
}: ExperienceFormProps) {
  const [isCurrentJob, setIsCurrentJob] = useState(
    experience.endPeriod === 'Present'
  )

  const handleCheckboxChange = () => {
    setIsCurrentJob(!isCurrentJob)
    if (!isCurrentJob) {
      onChange({ target: { value: 'Present' } } as any, 'endPeriod')
    } else {
      onChange({ target: { value: '' } } as any, 'endPeriod')
    }
  }

  return (
    <div className="my-4 rounded-md border border-zinc-100 p-4 dark:border-zinc-800">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={experience.title}
            onChange={(e) => onChange(e, 'title')}
            className="mt-1"
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={experience.company}
            onChange={(e) => onChange(e, 'company')}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={experience.location}
            onChange={(e) => onChange(e, 'location')}
            className="mt-1"
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="startPeriod">Start Period</Label>
          <Input
            id="startPeriod"
            value={experience.startPeriod}
            onChange={(e) => onChange(e, 'startPeriod')}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Label htmlFor="endPeriod">End Period</Label>
          <Input
            id="endPeriod"
            value={experience.endPeriod}
            onChange={(e) => onChange(e, 'endPeriod')}
            className="mt-1"
            disabled={isCurrentJob}
          />
        </div>
        <div className="col-span-1 mt-6 flex items-center">
          <Label htmlFor="current-job" className="flex items-center">
            <Checkbox
              id="current-job"
              checked={isCurrentJob}
              onCheckedChange={handleCheckboxChange}
            />
            <span className="ml-2">Current Job</span>
          </Label>
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={experience.description}
          onChange={(e) => onChange(e, 'description')}
          rows={3}
        />
      </div>

      <Button variant="destructive" className="mt-4" onClick={onDelete}>
        Delete Experience
      </Button>
    </div>
  )
}

export default ExperienceForm
