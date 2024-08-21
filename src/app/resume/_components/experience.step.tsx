import { Button } from '@/components/ui/button'
import { ResumeData, Experience } from '@/types/resume'

import ExperienceForm from './experience.form'

interface ExperienceStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

function ExperienceStep({ resumeData, setResumeData }: ExperienceStepProps) {
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof Experience,
    index: number
  ) => {
    const newExperience = [...resumeData.experience]
    newExperience[index] = {
      ...newExperience[index],
      [section]: e.target.value,
    }
    setResumeData({ ...resumeData, experience: newExperience })
  }

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          title: '',
          company: '',
          location: '',
          startPeriod: '',
          endPeriod: '',
          description: '',
        },
      ],
    })
  }

  const deleteExperience = (index: number) => {
    const newExperience = resumeData.experience.filter(
      (_, expIdx) => expIdx !== index
    )
    setResumeData({ ...resumeData, experience: newExperience })
  }

  return (
    <div className="rounded-md p-4">
      <h2 className="text-xl font-semibold text-dark-blue dark:text-neutral-200">
        Experience
      </h2>
      {resumeData.experience.map((exp, idx) => (
        <ExperienceForm
          key={idx}
          experience={exp}
          onChange={(e, section) => handleExperienceChange(e, section, idx)}
          onDelete={() => deleteExperience(idx)}
        />
      ))}
      <Button variant="outline" className="mt-4" onClick={addExperience}>
        Add Experience
      </Button>
    </div>
  )
}

export default ExperienceStep
