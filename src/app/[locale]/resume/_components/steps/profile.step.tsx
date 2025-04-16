import { Textarea } from '@/components/ui/textarea'
import { ResumeData } from '@/types/resume'

interface ProfileStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

function ProfileStep({ resumeData, setResumeData }: ProfileStepProps) {
  return (
    <div className="rounded-md p-4">
      <h2 className="text-xl font-semibold text-dark-blue dark:text-neutral-200">
        Profile
      </h2>
      <Textarea
        id="profile"
        value={resumeData.resume}
        onChange={(e) =>
          setResumeData({ ...resumeData, resume: e.target.value })
        }
        className="mt-2 w-full rounded-md"
        rows={5}
      />
    </div>
  )
}

export default ProfileStep
