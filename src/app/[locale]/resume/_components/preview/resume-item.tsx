import { FaCalendarDays } from 'react-icons/fa6'

import { Separator } from '@/components/ui/separator'

import { Paragraph } from './paragraph'

interface ResumeItemProps {
  title: string
  institutionOrCompany: string
  degreeOrLocation: string
  startPeriod: string
  endPeriod: string
  description: string
  color?: string
}

export const ResumeItem = ({
  title,
  institutionOrCompany,
  degreeOrLocation,
  startPeriod,
  endPeriod,
  description,
  color,
}: ResumeItemProps) => (
  <div className="text-dark-blue">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="flex items-center gap-2">
        <FaCalendarDays size={16} color={color} />
        <Paragraph>
          {startPeriod} - {endPeriod || 'Present'}
        </Paragraph>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Paragraph className="font-semibold">{institutionOrCompany}</Paragraph>
      <Separator orientation="vertical" className="h-3 bg-gray-300" />
      <Paragraph className="font-normal italic text-gray-400">
        {degreeOrLocation}
      </Paragraph>
    </div>
    <Paragraph className="mt-2">{description}</Paragraph>
  </div>
)
