import { ResumeData } from '@/types/resume'

interface ResumePreviewProps {
  resumeData: ResumeData
}

function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="rounded-md border p-4">
      <h2 className="text-2xl font-bold">{resumeData.profile}</h2>
      <section className="mt-6">
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="mt-4">
            <h3 className="text-lg font-bold">{exp.title}</h3>
            <p className="text-sm italic">
              {exp.company} | {exp.location}
            </p>
            <p className="text-sm">
              {exp.startPeriod} - {exp.endPeriod || 'Present'}
            </p>
            <p className="mt-2">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ResumePreview
