'use client'

import Lottie from 'react-lottie'

import { useIsMobile } from '@/hooks/use-mobile'

import success from '../../../../../public/lottie/success.json'

export default function Success() {
  const isMobile = useIsMobile()
  return (
    <div className="container mx-auto flex min-h-svh flex-col items-center justify-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: success,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        width={isMobile ? 200 : 300}
      />
      <div className="inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500 md:text-4xl dark:text-blue-400">
            Assinatura concluída
          </h1>
          <p className="mt-3 text-base text-gray-900 lg:text-lg dark:text-gray-200">
            Agora você pode usufruir do serviço premium.
          </p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-500">
            Obrigado por utilizar nosso serviço, em caso de dúvidas, entre em
            contato.
          </p>
        </div>
      </div>
    </div>
  )
}
