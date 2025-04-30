/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20 // margin in mm
    const contentWidth = pageWidth - margin * 2
    let yPosition = margin

    const checkPageBreak = (spaceNeeded = 20) => {
      if (yPosition + spaceNeeded > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
    }

    const addSectionTitle = (
      pdf: jsPDF,
      title: string,
      x: number,
      y: number
    ) => {
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'italic', 700)
      pdf.setTextColor(0, 0, 0)
      pdf.text(title, x, y)
      const titleWidth =
        (pdf.getStringUnitWidth(title) * 14) / pdf.internal.scaleFactor
      pdf.setDrawColor(0, 0, 0)
      pdf.setLineWidth(0.3)
      pdf.line(x, y + 1, x + titleWidth, y + 1)
    }

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
    resumeData.personal.links.forEach((link) => {
      checkPageBreak(6)
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
    resumeData.experience.forEach((exp) => {
      checkPageBreak(25)

      // Cargo + Período
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.text(exp.position, margin, yPosition)

      const periodWidth =
        (pdf.getStringUnitWidth(exp.period) * 10) / pdf.internal.scaleFactor
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(28, 28, 28)
      pdf.text(exp.period, pageWidth - margin - periodWidth, yPosition)
      pdf.setTextColor(0, 0, 0)
      yPosition += 6

      // Empresa
      pdf.setFont('helvetica', 'normal')
      pdf.text(exp.company, margin, yPosition)
      yPosition += 5

      // Responsabilidades
      if (exp.skills?.length) {
        yPosition += 4
        pdf.setFontSize(10)
        exp.skills.forEach((skill) => {
          const lines = pdf.splitTextToSize(skill, contentWidth - 5)
          lines.forEach((line: any, idx: number) => {
            checkPageBreak(6)
            // Adiciona o bullet apenas na primeira linha
            const prefix = idx === 0 ? '• ' : '  '
            pdf.text(`${prefix}${line}`, margin + 2, yPosition)
            yPosition += 5
          })
        })
      }

      // Resultados
      if (exp.achievements?.length) {
        yPosition += 4
        checkPageBreak(10)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Resultados Relevantes:', margin, yPosition)
        yPosition += 5

        yPosition += 3
        pdf.setFont('helvetica', 'normal')
        exp.achievements.forEach((ach) => {
          const lines = pdf.splitTextToSize(ach, contentWidth - 5)
          lines.forEach((line: any, idx: number) => {
            checkPageBreak(6)
            const prefix = idx === 0 ? '• ' : '  '
            pdf.text(`${prefix}${line}`, margin + 2, yPosition)
            yPosition += 5
          })
        })
      }

      yPosition += 6
    })

    // Formação Acadêmica
    yPosition += 4
    addSectionTitle(pdf, 'Formação Acadêmica', margin, yPosition)
    yPosition += 6

    // Education
    resumeData.education.forEach((edu) => {
      checkPageBreak(20)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.text(edu.degree, margin, yPosition)

      const yearWidth =
        (pdf.getStringUnitWidth(edu.year) * 10) / pdf.internal.scaleFactor
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(28, 28, 28)
      pdf.text(edu.year, pageWidth - margin - yearWidth, yPosition)
      pdf.setTextColor(0, 0, 0)

      yPosition += 6
      pdf.text(edu.school, margin, yPosition)
      yPosition += 8
    })
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
      skillsLines.forEach((line: string | string[]) => {
        checkPageBreak(6)
        pdf.text(line, margin, yPosition)
        yPosition += 6
      })
    } else {
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 100, 100)
      pdf.text('Nenhuma habilidade adicionada.', margin, yPosition)
      pdf.setTextColor(0, 0, 0)
    }

    // Save the PDF
    pdf.save('curriculo.pdf')
  }

  return { exportToPDF }
}
