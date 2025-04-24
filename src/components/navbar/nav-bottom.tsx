'use client'
import { memo, useState } from 'react'

import { ArrowRight, CheckCircle, Headphones, Loader, Lock } from 'lucide-react'

import { useStripe } from '@/hooks/useStripe'
import { formatCurrency } from '@/utils/format-currency'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { SidebarMenuButton } from '../ui/sidebar'

type PlanType = 'monthly' | 'annual'

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

const PremiumFeatures = memo(function PremiumFeatures({
  status: subscriptionStatus,
  userId,
}: {
  status: string | null
  userId: string
}) {
  if (subscriptionStatus === 'active') return null
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
        <SubscriptionDialog userId={userId} />
      </CardContent>
    </Card>
  )
})

export { HelpAndSupport, PremiumFeatures }

const SubscriptionDialog = memo(function SubscriptionDialog({
  userId,
}: {
  userId: string
}) {
  const { createSubscriptionStripeCheckout } = useStripe()
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null)

  const handleSubscribe = async (planType: PlanType) => {
    setLoadingPlan(planType)
    try {
      await createSubscriptionStripeCheckout({ userId, planType })
    } catch (error) {
      console.error('Error creating subscription:', error)
    } finally {
      setLoadingPlan(null)
    }
  }

  const plans = [
    {
      type: 'monthly' as PlanType,
      title: 'Mensal',
      price: 9.9,
      description: 'Ideal para quem busca recursos premium e flexibilidade.',
      benefits: [
        'Tradução automática do currículo para o inglês',
        'Download do currículo em português e inglês',
        'URL personalizada com seu perfil',
      ],
    },
    {
      type: 'annual' as PlanType,
      title: 'Anual',
      price: 69.9,
      description:
        'Economize com o plano anual e acesse todos os recursos premium.',
      benefits: [
        'Tradução automática do currículo para o inglês',
        'Download do currículo em português e inglês',
        'URL personalizada com seu perfil',
        'Desconto de 41% no plano anual',
      ],
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="w-full bg-zinc-100 text-zinc-700 shadow-sm transition-all hover:bg-white hover:shadow-md"
        >
          Assinar Premium
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-3/4 max-w-sm overflow-scroll md:max-w-2xl lg:max-h-full lg:max-w-3xl lg:overflow-hidden">
        <DialogHeader>
          <DialogTitle>Escolha seu plano Premium</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.type}
              className="flex flex-col justify-between border-none bg-white shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-lg">{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2 text-3xl font-bold">
                  {formatCurrency(plan.price)}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-xs">
                      <CheckCircle className="mr-2 size-3 shrink-0 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleSubscribe(plan.type)}
                  disabled={loadingPlan === plan.type}
                >
                  {loadingPlan === plan.type ? (
                    <>
                      Processando...
                      <Loader className="ml-2 size-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Assinar Agora
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
})
