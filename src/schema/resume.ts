import { z } from 'zod'

export const personalSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),
})

export const educationSchema = z.object({
  school: z.string().min(1, 'Instituição é obrigatória'),
  degree: z.string().min(1, 'Curso/Grau é obrigatório'),
  year: z.string().min(1, 'Período é obrigatório'),
})

export const experienceSchema = z.object({
  company: z.string().min(1, 'Empresa é obrigatória'),
  position: z.string().min(1, 'Cargo é obrigatório'),
  period: z.string().min(1, 'Período é obrigatório'),
  skills: z
    .array(z.string().min(1, 'Habilidade não pode ser vazia'))
    .min(1, 'Adicione pelo menos uma habilidade'),
  achievements: z
    .array(z.string().min(1, 'Resultado não pode ser vazio'))
    .min(1, 'Adicione pelo menos um resultado relevante'),
})

export const summarySchema = z
  .string()
  .min(10, 'Resumo deve ter pelo menos 10 caracteres')

export type Personal = z.infer<typeof personalSchema>
export type Education = z.infer<typeof educationSchema>
export type Experience = z.infer<typeof experienceSchema>
