/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { Trash2 } from 'lucide-react'

import { MonthYearPicker, YearPicker } from '@/components/date-picker'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  GenericMultipleFormProps,
  FormData,
  Experience,
  Education,
} from '@/types/resume'

function GenericMultipleForm<T extends FormData>({
  data,
  onChange,
  onDelete,
  entityType,
}: GenericMultipleFormProps<T>) {
  const [isCurrentJob, setIsCurrentJob] = useState(
    (data as Experience).endPeriod === 'Present'
  )

  const handleCheckboxChange = () => {
    setIsCurrentJob(!isCurrentJob)
    if (!isCurrentJob) {
      onChange({ target: { value: 'Present' } } as any, 'endPeriod')
    } else {
      onChange({ target: { value: '' } } as any, 'endPeriod')
    }
  }

  const isValidDate = (date: string | undefined) => {
    return date && !isNaN(new Date(date).getTime())
  }

  return (
    <div className="my-4 rounded-md border border-zinc-100 p-4 dark:border-zinc-800">
      <div className="relative grid grid-cols-2 gap-4">
        <Trash2
          size={16}
          className="absolute col-span-2 cursor-pointer justify-self-end text-gray-600 transition-colors duration-200 hover:text-red-500"
          onClick={onDelete}
        />
        <div className="col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={(data as any).title}
            onChange={(e) => onChange(e, 'title')}
            className="mt-1"
          />
        </div>

        <div className="col-span-1">
          {entityType === 'experience' ? (
            <>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={(data as Experience).company}
                onChange={(e) => onChange(e, 'company' as keyof T)}
                className="mt-1"
              />
            </>
          ) : (
            <>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={(data as Education).institution}
                onChange={(e) => onChange(e, 'institution' as keyof T)}
                className="mt-1"
              />
            </>
          )}
        </div>

        <div className="col-span-1">
          {entityType === 'experience' ? (
            <>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={(data as Experience).location}
                onChange={(e) => onChange(e, 'location' as keyof T)}
                className="mt-1"
              />
            </>
          ) : (
            <>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={(data as Education).degree}
                onChange={(e) => onChange(e, 'degree' as keyof T)}
                className="mt-1"
              />
            </>
          )}
        </div>

        <div className="col-span-1">
          <Label htmlFor="startPeriod">Start Period</Label>
          {entityType === 'experience' ? (
            <MonthYearPicker
              selectedDate={
                isValidDate((data as any).startPeriod)
                  ? new Date((data as any).startPeriod)
                  : undefined
              }
              onChange={(formattedDate) =>
                onChange(
                  { target: { value: formattedDate } } as any,
                  'startPeriod'
                )
              }
            />
          ) : (
            <YearPicker
              selectedYear={(data as any).startPeriod}
              onChange={(formattedYear) =>
                onChange(
                  { target: { value: formattedYear } } as any,
                  'startPeriod'
                )
              }
            />
          )}
        </div>

        <div className="col-span-1">
          <Label htmlFor="endPeriod">End Period</Label>
          {entityType === 'experience' ? (
            <MonthYearPicker
              selectedDate={
                isValidDate((data as any).endPeriod)
                  ? new Date((data as any).endPeriod)
                  : undefined
              }
              onChange={(formattedDate) =>
                onChange(
                  { target: { value: formattedDate } } as any,
                  'endPeriod'
                )
              }
              disabled={entityType === 'experience' && isCurrentJob}
            />
          ) : (
            <YearPicker
              selectedYear={(data as any).endPeriod}
              onChange={(formattedYear) =>
                onChange(
                  { target: { value: formattedYear } } as any,
                  'endPeriod'
                )
              }
            />
          )}

          {entityType === 'experience' && (
            <div className="mt-2 flex items-center">
              <Checkbox
                id="current-job"
                checked={isCurrentJob}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="current-job"
                className="ml-2 cursor-pointer text-sm"
              >
                Current Job
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data as any).description}
          onChange={(e) => onChange(e, 'description')}
          rows={3}
        />
      </div>
    </div>
  )
}

export default GenericMultipleForm
