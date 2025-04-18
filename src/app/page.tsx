import { redirect } from 'next/navigation'

import { routing } from '@/i18n/routing'

export default function Page() {
  redirect(routing.defaultLocale)
  // SEPARAR POR PAGINAS (CHAT GPT ENSINA)
  // IMPLEMENTAR VERSÃO GRATUITA E PAGA
  // VERSÃO PAGA MANTÉM UM LINK COM URL PARA O RESUME DO CLIENTE - R$5 MENSAL OU R$50 ANUAL
}
