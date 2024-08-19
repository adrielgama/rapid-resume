import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <h1>Login</h1>
      <SignIn />
    </>
  )
}
