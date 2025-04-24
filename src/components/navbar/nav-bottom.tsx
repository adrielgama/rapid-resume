'use client'
import { memo } from 'react'

import { ArrowRight, Headphones, Lock } from 'lucide-react'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { SidebarMenuButton } from '../ui/sidebar'

const HelpAndSupport = memo(function HelpAndSupport() {
  return (
    <div>
      <SidebarMenuButton className="cursor-pointer">
        {/* Colocar um modal para um enviar e-mail de suporte  */}
        <Headphones />
        <h1>Ajuda e Suporte</h1>
      </SidebarMenuButton>
    </div>
  )
})

const PremiumFeatures = memo(function PremiumFeatures() {
  // Adicionar autenticação + validação que o usuário já possui o premium para poder exibir esse componente
  // Adicionar um modal para o usuário fazer o upgrade para o premium
  return (
    <Card className="border-none bg-gradient-to-br from-blue-50 to-blue-100 bg-cover bg-no-repeat shadow-sm">
      <CardHeader className="p-3">
        <CardTitle>
          <Lock className="mb-1 text-blue-400 opacity-65" />
        </CardTitle>
        <CardDescription className="text-xs text-zinc-700 dark:text-zinc-700">
          Acesse recursos exclusivos e aproveite ao máximo sua experiência.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <Button
          variant="default"
          size="sm"
          className="w-full bg-zinc-100 text-zinc-700 shadow-sm transition-all hover:bg-white hover:shadow-md"
        >
          {/* Trigger para abertura do modal */}
          Assinar Premium
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  )
})

export { HelpAndSupport, PremiumFeatures }
