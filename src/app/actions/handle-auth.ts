'use server'

import { auth, signIn, signOut } from '@/lib/auth'

export async function handleAuth() {
  const session = await auth()

  if (session) {
    return await signOut({
      redirectTo: '/login',
    })
  }

  // AJUSTAR TODOS OS CALLBACKS PARA GOOGLE LINKEDIN GITHUB E CREDENCIAIS
  await signIn('google', {
    redirectTo: '/resume',
  })
}
