import { Label } from '@/components/ui/label'
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
      <Label htmlFor="profile" className="mt-4">
        Summary
      </Label>
      <Textarea
        id="profile"
        value={resumeData.profile}
        onChange={(e) =>
          setResumeData({ ...resumeData, profile: e.target.value })
        }
        className="mt-2 w-full resize-none rounded-md focus-visible:ring-0"
        rows={4}
      />
    </div>
  )
}

export default ProfileStep
