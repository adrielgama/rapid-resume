import React from 'react'

import { format } from 'date-fns'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface MonthYearPickerProps {
  selectedDate?: Date
  onChange: (formattedDate: string) => void
  disabled?: boolean
}

interface YearPickerProps {
  selectedYear: string | undefined
  onChange: (year: string) => void
  startYear?: number
  endYear?: number
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  selectedDate,
  onChange,
  disabled = false,
}) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth)
    const newDate = new Date(
      selectedDate ? selectedDate.getFullYear() : currentYear,
      monthIndex,
      1
    )
    onChange(format(newDate, 'MMM yyyy'))
  }

  const handleYearChange = (newYear: string) => {
    const year = parseInt(newYear, 10)
    const newDate = new Date(
      year,
      selectedDate ? selectedDate.getMonth() : 0,
      1
    )
    onChange(format(newDate, 'MMM yyyy'))
  }

  return (
    <div className="flex space-x-2">
      <Select
        disabled={disabled}
        onValueChange={handleMonthChange}
        value={selectedDate ? months[selectedDate.getMonth()] : months[0]}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent className="max-h-52">
          {months.map((month, index) => (
            <SelectItem key={index} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        disabled={disabled}
        onValueChange={handleYearChange}
        value={
          selectedDate
            ? selectedDate.getFullYear().toString()
            : currentYear.toString()
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent className="max-h-52">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export const YearPicker: React.FC<YearPickerProps> = ({
  selectedYear,
  onChange,
  startYear = 1980,
  endYear = new Date().getFullYear() + 8,
}) => {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString()
  )

  return (
    <Select onValueChange={onChange} value={selectedYear}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent className="max-h-52">
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
