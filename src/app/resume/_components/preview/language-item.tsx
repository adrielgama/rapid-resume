import { Progress } from '@/components/ui/progress'
import { LangLevel, Languages } from '@/types/resume'

import { Paragraph } from './paragraph'

interface LanguageItemProps extends Languages {
  color?: string
}

const getProgressValue = (level: LangLevel): number => {
  const levels: Record<LangLevel, number> = {
    Basic: 10,
    Conversational: 40,
    Advanced: 70,
    Fluent: 100,
  }
  return levels[level]
}

export const LanguageItem = ({ language, level, color }: LanguageItemProps) => (
  <div>
    <div className="flex items-center justify-between">
      <Paragraph>{language}</Paragraph>
      <Paragraph className="text-xs text-gray-500">{level}</Paragraph>
    </div>
    <Progress value={getProgressValue(level)} progressColor={color} />
  </div>
)
