'use client'

import { useRef } from 'react'

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

    // Initialize PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 20 // margin in mm
    const contentWidth = pageWidth - margin * 2
    let yPosition = margin

    // Set default font
    pdf.setFont('helvetica')

    // Name - Large and bold
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text(resumeData.personal.name, margin, yPosition)
    yPosition += 8

    // Add a dividing line
    pdf.setDrawColor(220, 220, 220)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 6

    /// Contact info on separate lines
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    pdf.text(resumeData.personal.location!, margin, yPosition)
    yPosition += 5
    pdf.text(resumeData.personal.email, margin, yPosition)
    yPosition += 5
    pdf.text(resumeData.personal.phone, margin, yPosition)
    yPosition += 5

    // Links
    pdf.setTextColor(0, 102, 204)
    resumeData.links.forEach((link) => {
      pdf.text(link, margin, yPosition)
      yPosition += 5
    })
    pdf.setTextColor(0)
    yPosition += 5

    // Qualificação Profissional
    addSectionTitle(pdf, 'Qualificação Profissional', margin, yPosition)
    yPosition += 6

    // Summary text with wrapping
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const summaryLines = pdf.splitTextToSize(resumeData.summary, contentWidth)
    pdf.text(summaryLines, margin, yPosition)
    yPosition += summaryLines.length * 5 + 5

    // Idioma
    addSectionTitle(pdf, 'Idioma', margin, yPosition)
    yPosition += 6

    // Languages
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    resumeData.languages.forEach((lang) => {
      pdf.text(`${lang.language} - ${lang.level}`, margin, yPosition)
      yPosition += 5
    })
    yPosition += 3

    // Experiência Profissional
    addSectionTitle(pdf, 'Experiência Profissional', margin, yPosition)
    yPosition += 6

    // Job experiences
    if (resumeData.experience.length > 0) {
      resumeData.experience.forEach((exp) => {
        // Position - bold
        pdf.setFont('helvetica', 'bold')
        pdf.text(exp.position, margin, yPosition)

        // Period - right aligned
        pdf.setFont('helvetica', 'normal')
        const periodWidth =
          (pdf.getStringUnitWidth(exp.period) * 10) / pdf.internal.scaleFactor
        pdf.text(exp.period, pageWidth - margin - periodWidth, yPosition)

        yPosition += 5

        // Company
        pdf.setFont('helvetica', 'normal')
        pdf.text(exp.company, margin, yPosition)
        yPosition += 7
      })
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.text('Nenhuma experiência adicionada.', margin, yPosition)
      yPosition += 7
    }
    yPosition += 3

    // Formação Acadêmica
    addSectionTitle(pdf, 'Formação Acadêmica', margin, yPosition)
    yPosition += 6

    // Education
    if (resumeData.education.length > 0) {
      resumeData.education.forEach((edu) => {
        // Degree - bold
        pdf.setFont('helvetica', 'bold')
        pdf.text(edu.degree, margin, yPosition)

        // Year - right aligned
        pdf.setFont('helvetica', 'normal')
        const yearWidth =
          (pdf.getStringUnitWidth(edu.year) * 10) / pdf.internal.scaleFactor
        pdf.text(edu.year, pageWidth - margin - yearWidth, yPosition)

        yPosition += 5

        // School
        pdf.setFont('helvetica', 'normal')
        pdf.text(edu.school, margin, yPosition)
        yPosition += 7
      })
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.text('Nenhuma formação adicionada.', margin, yPosition)
      yPosition += 7
    }
    yPosition += 3

    // Habilidades
    addSectionTitle(pdf, 'Habilidades', margin, yPosition)
    yPosition += 6

    // Skills as tags
    if (resumeData.skills.length > 0) {
      // Need to format skills to wrap correctly
      pdf.setFontSize(9)
      let currentLinePosition = margin
      const lineHeight = 6

      resumeData.skills.forEach((skill) => {
        const skillWidth =
          (pdf.getStringUnitWidth(skill) * 9) / pdf.internal.scaleFactor + 10 // add some padding

        // Check if we need to move to next line
        if (currentLinePosition + skillWidth > pageWidth - margin) {
          currentLinePosition = margin
          yPosition += lineHeight
        }

        // Draw pill background
        pdf.setFillColor(240, 240, 240)
        pdf.roundedRect(
          currentLinePosition,
          yPosition - 4,
          skillWidth,
          lineHeight,
          3,
          3,
          'F'
        )

        // Add skill text
        pdf.setTextColor(80, 80, 80)
        pdf.text(skill, currentLinePosition + 5, yPosition)

        currentLinePosition += skillWidth + 5
      })
      pdf.setTextColor(0, 0, 0) // Reset to black
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.text('Nenhuma habilidade adicionada.', margin, yPosition)
    }

    // Save the PDF
    pdf.save('curriculo.pdf')
  }

  // Helper function to add section titles with consistent formatting
  const addSectionTitle = (pdf: jsPDF, title: string, x: number, y: number) => {
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(0, 0, 0)
    pdf.text(title, x, y)

    // Add underline
    const titleWidth =
      (pdf.getStringUnitWidth(title) * 14) / pdf.internal.scaleFactor
    pdf.setDrawColor(0, 0, 0)
    pdf.line(x, y + 1, x + titleWidth, y + 1)
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
          className="space-y-6 rounded-sm border border-[#e4e4e7] bg-white p-4 dark:border-[#27272a] dark:bg-zinc-950"
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
                  className="text-muted-foreground text-sm text-[#2b7fff] underline"
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
