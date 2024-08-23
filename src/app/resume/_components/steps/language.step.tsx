import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LangLevel, ResumeData } from '@/types/resume'

const languageLevels: Record<LangLevel, string> = {
  Basic: 'Basic',
  Conversational: 'Conversational',
  Advanced: 'Advanced',
  Fluent: 'Fluent',
}

const availableLanguages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Portuguese',
  'Italian',
  'Russian',
  'Arabic',
  // Adicione mais idiomas conforme necessário
]

interface LanguageStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

function LanguageStep({ resumeData, setResumeData }: LanguageStepProps) {
  const [selectedLanguages, setSelectedLanguages] = useState(
    resumeData.languages || []
  )
  const [newLanguage, setNewLanguage] = useState<string>('')
  const [newLanguageLevel, setNewLanguageLevel] = useState<LangLevel | ''>('')

  useEffect(() => {
    if (resumeData.languages !== selectedLanguages) {
      setResumeData({ ...resumeData, languages: selectedLanguages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguages, resumeData.languages, setResumeData])

  const handleAddLanguage = () => {
    if (newLanguage && newLanguageLevel) {
      const languageExists = selectedLanguages.some(
        (lang) => lang.language === newLanguage
      )

      if (!languageExists) {
        setSelectedLanguages((prev) => [
          ...prev,
          { language: newLanguage, level: newLanguageLevel },
        ])
        setNewLanguage('')
        setNewLanguageLevel('')
      }
    }
  }

  const handleRemoveLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.filter((lang) => lang.language !== language)
    )
  }

  return (
    <div className="p-4">
      <Label>Add a Language</Label>
      <div className="mt-2 flex items-center gap-4">
        <Select
          onValueChange={(value) => setNewLanguage(value)}
          value={newLanguage}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setNewLanguageLevel(value as LangLevel)}
          value={newLanguageLevel}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(languageLevels).map((level) => (
              <SelectItem key={level} value={level}>
                {languageLevels[level as LangLevel]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleAddLanguage}>Add</Button>
      </div>

      <Label className="mt-4">Selected Languages</Label>
      <ScrollArea className="mt-2 h-36 rounded border p-2">
        {selectedLanguages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLanguages.map(({ language, level }) => (
              <Badge
                key={language}
                variant="secondary"
                className="cursor-pointer select-none"
                onClick={() => handleRemoveLanguage(language)}
              >
                {language} - {languageLevels[level]}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No languages selected.
          </p>
        )}
      </ScrollArea>
    </div>
  )
}

export default LanguageStep
