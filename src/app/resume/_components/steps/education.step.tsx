import { CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ResumeData, Education } from '@/types/resume'

import GenericMultipleForm from './generic-multiple.form'

interface EducationStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

function EducationStep({ resumeData, setResumeData }: EducationStepProps) {
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof Education,
    index: number
  ) => {
    const newEducation = [...resumeData.education]
    newEducation[index] = {
      ...newEducation[index],
      [section]: e.target.value,
    }
    setResumeData({ ...resumeData, education: newEducation })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          title: '',
          institution: '',
          degree: '',
          startPeriod: '',
          endPeriod: '',
          description: '',
        },
      ],
    })
  }

  const deleteEducation = (index: number) => {
    const newEducation = resumeData.education.filter(
      (_, eduIdx) => eduIdx !== index
    )
    setResumeData({ ...resumeData, education: newEducation })
  }

  return (
    <div className="rounded-md p-4">
      <h2 className="text-xl font-semibold text-dark-blue dark:text-neutral-200">
        Education
      </h2>
      {resumeData.education.map((edu, idx) => (
        <GenericMultipleForm
          key={idx}
          data={edu}
          onChange={(e, section) => handleEducationChange(e, section, idx)}
          onDelete={() => deleteEducation(idx)}
          entityType="education"
        />
      ))}
      <Button variant="outline" className="mt-4 w-full" onClick={addEducation}>
        <CirclePlus size={14} className="mr-2" /> Add Education
      </Button>
    </div>
  )
}

export default EducationStep
