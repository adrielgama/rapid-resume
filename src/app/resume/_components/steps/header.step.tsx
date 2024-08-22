import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResumeData } from '@/types/resume'

interface HeaderStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

function HeaderStep({ resumeData, setResumeData }: HeaderStepProps) {
  return (
    <div className="rounded-md p-4">
      <h2 className="text-xl font-semibold text-dark-blue dark:text-neutral-200">
        Header
      </h2>
      <Label htmlFor="header" className="mt-4">
        Name
      </Label>
      <Input
        id="name"
        value={resumeData.profile.name}
        onChange={(e) =>
          setResumeData({
            ...resumeData,
            profile: {
              ...resumeData.profile,
              name: e.target.value,
            },
          })
        }
        className="mt-1"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="header" className="mt-4">
            E-mail
          </Label>
          <Input
            id="email"
            value={resumeData.profile.email}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                profile: {
                  ...resumeData.profile,
                  email: e.target.value,
                },
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="header" className="mt-4">
            Phone
          </Label>
          <Input
            id="phone"
            value={resumeData.profile.phone}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                profile: {
                  ...resumeData.profile,
                  phone: e.target.value,
                },
              })
            }
            className="mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="header" className="mt-4">
            Location
          </Label>
          <Input
            id="location"
            value={resumeData.profile.location}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                profile: {
                  ...resumeData.profile,
                  location: e.target.value,
                },
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="header" className="mt-4">
            Title
          </Label>
          <Input
            id="title"
            value={resumeData.profile.title}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                profile: {
                  ...resumeData.profile,
                  title: e.target.value,
                },
              })
            }
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}

export default HeaderStep
