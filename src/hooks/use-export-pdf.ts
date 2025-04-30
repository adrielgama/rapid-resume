import { RefObject } from 'react'

import jsPDF from 'jspdf'

import { ResumeData } from '../types/resume'

export const useExportToPDF = (
  resumeData: ResumeData,
  resumeRef: RefObject<HTMLDivElement>
) => {
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
    yPosition += 5

    // Add a dividing line
    pdf.setDrawColor(28, 28, 28)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 3

    /// Contact info on separate lines
    yPosition += 5
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    pdf.text(resumeData.personal.location || '', margin, yPosition)
    yPosition += 6
    pdf.text(resumeData.personal.phone, margin, yPosition)
    yPosition += 6
    pdf.setTextColor(43, 127, 255) // Blue (#2b7fff)
    pdf.text(resumeData.personal.email, margin, yPosition)
    yPosition += 6

    // Links
    resumeData.links.forEach((link) => {
      pdf.text(link, margin, yPosition)
      yPosition += 6
    })
    pdf.setTextColor(0, 0, 0)
    yPosition += 4

    // Qualificação Profissional
    yPosition += 4
    addSectionTitle(pdf, 'Qualificação Profissional', margin, yPosition)
    yPosition += 6

    // Summary text with wrapping
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    const summaryLines = pdf.splitTextToSize(resumeData.summary, contentWidth)
    pdf.text(summaryLines, margin, yPosition)
    yPosition += summaryLines.length * 6 + 4

    // Idioma
    yPosition += 4
    addSectionTitle(pdf, 'Idioma', margin, yPosition)
    yPosition += 6

    // Languages
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    resumeData.languages.forEach((lang) => {
      pdf.text(`${lang.language} - ${lang.level}`, margin, yPosition)
      yPosition += 6
    })
    pdf.setTextColor(0, 0, 0)
    yPosition += 3

    // Experiência Profissional
    yPosition += 4
    addSectionTitle(pdf, 'Experiência Profissional', margin, yPosition)
    yPosition += 6

    // Job experiences
    if (resumeData.experience.length > 0) {
      resumeData.experience.forEach((exp) => {
        // Position - bold
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(11)
        pdf.text(exp.position, margin, yPosition)

        // Period - right aligned, muted gray
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(28, 28, 28)
        const periodWidth =
          (pdf.getStringUnitWidth(exp.period) * 10) / pdf.internal.scaleFactor
        pdf.text(exp.period, pageWidth - margin - periodWidth, yPosition)
        pdf.setTextColor(0, 0, 0)

        yPosition += 6

        // Company
        pdf.setFont('helvetica', 'normal')
        pdf.text(exp.company, margin, yPosition)
        yPosition += 8
      })
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 100, 100)
      pdf.text('Nenhuma experiência adicionada.', margin, yPosition)
      pdf.setTextColor(0, 0, 0)
      yPosition += 6
    }
    yPosition += 2

    // Formação Acadêmica
    yPosition += 4
    addSectionTitle(pdf, 'Formação Acadêmica', margin, yPosition)
    yPosition += 6

    // Education
    if (resumeData.education.length > 0) {
      resumeData.education.forEach((edu) => {
        // Degree - bold
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(11)
        pdf.text(edu.degree, margin, yPosition)

        // Year - right aligned, muted gray
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(28, 28, 28)
        const yearWidth =
          (pdf.getStringUnitWidth(edu.year) * 10) / pdf.internal.scaleFactor
        pdf.text(edu.year, pageWidth - margin - yearWidth, yPosition)
        pdf.setTextColor(0, 0, 0)

        yPosition += 6

        // School
        pdf.setFont('helvetica', 'normal')
        pdf.text(edu.school, margin, yPosition)
        yPosition += 8
      })
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 100, 100)
      pdf.text('Nenhuma formação adicionada.', margin, yPosition)
      pdf.setTextColor(0, 0, 0)
      yPosition += 6
    }
    yPosition += 2

    // Habilidades
    yPosition += 4
    addSectionTitle(pdf, 'Habilidades', margin, yPosition)
    yPosition += 6

    // Skills as plain text, separated by commas
    if (resumeData.experience.length > 0) {
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(0, 0, 0)
      const skillsText = resumeData.skills.join(', ')
      const skillsLines = pdf.splitTextToSize(skillsText, contentWidth)
      pdf.text(skillsLines, margin, yPosition)
      yPosition += skillsLines.length * 6
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 100, 100)
      pdf.text('Nenhuma habilidade adicionada.', margin, yPosition)
      pdf.setTextColor(0, 0, 0)
    }

    // Save the PDF
    pdf.save('curriculo.pdf')
  }

  // Helper function to add section titles with consistent formatting
  const addSectionTitle = (pdf: jsPDF, title: string, x: number, y: number) => {
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'italic', 700)
    pdf.setTextColor(0, 0, 0)
    pdf.text(title, x, y)

    // Add underline
    const titleWidth =
      (pdf.getStringUnitWidth(title) * 14) / pdf.internal.scaleFactor
    pdf.setDrawColor(0, 0, 0)
    pdf.setLineWidth(0.3)
    pdf.line(x, y + 1, x + titleWidth, y + 1)
  }

  return { exportToPDF }
}
