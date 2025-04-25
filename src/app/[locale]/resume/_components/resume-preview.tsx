'use client'

import { useRef } from 'react'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResume } from '@/context/resume-context'
import { cn } from '@/lib/utils'

export default function ResumePreview() {
  const { resumeData, showPreview } = useResume()
  const resumeRef = useRef<HTMLDivElement>(null)

  const exportToPDF = async () => {
    if (!resumeRef.current) return

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('curriculo.pdf')
    } catch (error) {
      console.error('Erro ao exportar PDF:', error)
    }
  }

  return (
    <Card
      className={cn(
        'border-none shadow-none md:col-span-1',
        !showPreview && 'hidden md:block'
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pré-visualização do Currículo</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToPDF}
          className="flex items-center"
        >
          <Download className="mr-2 size-4" /> Exportar PDF
        </Button>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none">
        <div
          ref={resumeRef}
          className="space-y-6 rounded-sm border border-zinc-200/45 bg-white p-4 dark:border-zinc-800/30 dark:bg-zinc-950"
        >
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold">{resumeData.personal.name}</h2>
          </div>

          <div className="space-y-0.5">
            <p className="text-muted-foreground text-sm">
              {resumeData.personal.location}
            </p>
            <p className="text-muted-foreground text-sm">
              {resumeData.personal.email}
            </p>
            <p className="text-muted-foreground text-sm">
              {resumeData.personal.phone}
            </p>
            <div className="flex flex-col gap-0.5">
              {resumeData.links.map((link) => (
                <Link
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-sm text-blue-500 underline"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Title title="Qualificação Profissional" />
            <p className="mt-2 text-sm">{resumeData.summary}</p>
          </div>

          <div>
            <Title title="Idioma" />
            <div className="flex flex-col gap-0.5">
              {resumeData.languages.map((lang) => (
                <p
                  key={lang.language}
                  className="text-muted-foreground text-sm"
                >
                  {lang.language} - {lang.level}
                </p>
              ))}
            </div>
          </div>

          <div>
            <Title title="Experiência Profissional" />
            {resumeData.experience.length > 0 ? (
              resumeData.experience.map((exp, i) => (
                <div key={i} className="mt-3">
                  <div className="flex justify-between">
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-muted-foreground text-sm">
                      {exp.period}
                    </p>
                  </div>
                  <p className="text-sm">{exp.company}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhuma experiência adicionada.
              </p>
            )}
          </div>

          <div>
            <Title title="Formação Acadêmica" />
            {resumeData.education.length > 0 ? (
              resumeData.education.map((edu, i) => (
                <div key={i} className="mt-3">
                  <div className="flex justify-between">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-muted-foreground text-sm">{edu.year}</p>
                  </div>
                  <p className="text-sm">{edu.school}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhuma formação adicionada.
              </p>
            )}
          </div>

          <div>
            <Title title="Habilidades" />
            {resumeData.skills.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {resumeData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-muted rounded-full px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhuma habilidade adicionada.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const Title = ({ title }: { title: string }) => {
  return (
    <h3 className="pb-1 text-lg font-semibold italic underline">{title}</h3>
  )
}
