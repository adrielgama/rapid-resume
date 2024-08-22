import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface UrlInputProps {
  prefix?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const removeUrlPrefix = (url: string, prefix: string): string => {
  if (url.startsWith(prefix)) {
    return url.slice(prefix.length)
  }
  return url
}

export function UrlInput({
  prefix = '',
  value,
  onChange,
  placeholder,
}: UrlInputProps) {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const extractedUsername = removeUrlPrefix(value, prefix)
    setUsername(extractedUsername)
  }, [value, prefix])

  const handleInputChange = (newUsername: string) => {
    setUsername(newUsername)
    onChange(`${prefix}${newUsername}`)
  }

  return (
    <div className="flex w-full items-center rounded-md border p-1">
      {prefix && (
        <span className="px-2 text-gray-500 dark:text-gray-300">{prefix}</span>
      )}
      <Input
        type="text"
        value={username}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className={cn('flex-1 border-none outline-none')}
      />
    </div>
  )
}
