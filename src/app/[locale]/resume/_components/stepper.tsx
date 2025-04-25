'use client'
import {
  Check,
  User,
  GraduationCap,
  Briefcase,
  Lightbulb,
  FileText,
} from 'lucide-react'

import { useResume } from '@/context/resume-context'
import { cn } from '@/lib/utils'

export default function StepperNavigation() {
  const { steps, currentStep, setCurrentStep } = useResume()

  const currentIndex = steps.findIndex((step) => step.id === currentStep)
  const progressPercentage = (currentIndex / (steps.length - 1)) * 100

  const handleStepClick = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId)
    if (stepIndex <= currentIndex) {
      setCurrentStep(stepId)
    }
  }

  const iconComponents = {
    User,
    GraduationCap,
    Briefcase,
    Lightbulb,
    FileText,
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => {
          const stepIndex = steps.findIndex((s) => s.id === step.id)
          const isActive = currentStep === step.id
          const isCompleted = currentIndex > stepIndex
          const IconComponent =
            iconComponents[step.icon as keyof typeof iconComponents] || FileText

          return (
            <div
              key={step.id}
              className={cn(
                'flex cursor-pointer flex-col items-center transition-all',
                stepIndex <= currentIndex
                  ? 'opacity-100'
                  : 'cursor-not-allowed opacity-50'
              )}
              onClick={() => handleStepClick(step.id)}
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-medium transition-all',
                  isActive
                    ? 'border-blue-400 bg-blue-400 text-white'
                    : isCompleted
                      ? 'border-blue-400 bg-blue-100 text-blue-400'
                      : 'border-zinc-300 bg-white text-zinc-500'
                )}
              >
                {isCompleted ? (
                  <Check className="size-5" />
                ) : (
                  <IconComponent className="size-5" />
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-center text-sm font-medium',
                  isActive
                    ? 'font-semibold text-gray-800 dark:text-gray-50'
                    : isCompleted
                      ? 'text-blue-400'
                      : 'text-zinc-500 dark:text-zinc-300'
                )}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
      <div className="relative mt-4">
        <div className="absolute top-0 right-0 left-0 h-1 rounded-full bg-zinc-200" />
        <div
          className="absolute top-0 left-0 h-1 rounded-full bg-blue-400 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}
