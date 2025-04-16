import React from 'react'

import jsPDF from 'jspdf'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ResumeData } from '@/types/resume'

interface PDFDownloaderProps {
  resumeData: ResumeData
  fileName: string
}

const PDFDownloader: React.FC<PDFDownloaderProps> = ({
  resumeData,
  fileName,
}) => {
  const generatePDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()

    // Adiciona o nome do perfil
    doc.setFontSize(22)
    doc.text(resumeData.profile.name, 20, 30)

    // Adiciona a seção de contatos
    doc.setFontSize(12)
    doc.text('Contact Information:', 20, 50)
    doc.text(`Email: ${resumeData.profile.email}`, 20, 60)
    doc.text(`Phone: ${resumeData.profile.phone}`, 20, 70)
    doc.text(`Location: ${resumeData.profile.location}`, 20, 80)

    // Adiciona a seção de perfil
    doc.setFontSize(16)
    doc.text('Profile', 20, 100)
    doc.setFontSize(12)
    doc.text(resumeData.resume, 20, 110, { maxWidth: 170 })

    // Adiciona a seção de experiência
    doc.setFontSize(16)
    doc.text('Experience', 20, 140)
    resumeData.experience.forEach((exp, idx) => {
      doc.setFontSize(14)
      doc.text(`${exp.title} - ${exp.company}`, 20, 150 + idx * 30)
      doc.setFontSize(12)
      doc.text(`${exp.location}`, 20, 160 + idx * 30)
      doc.text(`(${exp.startPeriod} - ${exp.endPeriod})`, 20, 170 + idx * 30)
      doc.text(exp.description, 20, 180 + idx * 30, { maxWidth: 170 })
    })

    // Adiciona a seção de educação
    doc.setFontSize(16)
    doc.text('Education', 20, 220)
    resumeData.education.forEach((edu, idx) => {
      doc.setFontSize(14)
      doc.text(`${edu.title}`, 20, 230 + idx * 30)
      doc.setFontSize(12)
      doc.text(`${edu.institution}, ${edu.degree}`, 20, 240 + idx * 30)
      doc.text(`(${edu.startPeriod} - ${edu.endPeriod})`, 20, 250 + idx * 30)
      doc.text(edu.description, 20, 260 + idx * 30, { maxWidth: 170 })
    })

    // Adiciona a seção de habilidades
    doc.setFontSize(16)
    doc.text('Skills', 20, 290)
    doc.setFontSize(12)
    const skills = resumeData.skills.join(', ')
    doc.text(skills, 20, 300, { maxWidth: 170 })

    // Adiciona a seção de idiomas
    doc.setFontSize(16)
    doc.text('Languages', 20, 320)
    resumeData.languages.forEach((lang, idx) => {
      doc.setFontSize(12)
      doc.text(`${lang.language} - ${lang.level}`, 20, 330 + idx * 10)
    })

    doc.save(`${fileName}.pdf`)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generatePDF}
      className="dark:border-gray-200 dark:bg-white dark:hover:bg-gray-100 dark:hover:text-dark-blue"
    >
      <Download size={16} className="mr-2" /> Download
    </Button>
  )
}

export default PDFDownloader
