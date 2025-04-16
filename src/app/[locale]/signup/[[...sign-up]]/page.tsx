import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import BackgroundGrid from '@public/images/bg-grids.svg'

export default function Page() {
  return (
    <div className="relative grid min-h-screen w-screen grid-cols-1 items-center bg-gray-200 dark:bg-dark-blue lg:grid-cols-2">
      <div className="relative hidden min-h-screen w-full overflow-hidden lg:col-span-1 lg:block">
        <Image
          src={BackgroundGrid}
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="left center"
          className="absolute inset-0 rotate-180"
          priority
        />
      </div>
      <div className="z-10 flex flex-col items-center justify-center lg:col-span-1">
        <SignUp signInUrl="/login" />
        <Button variant="link" className="mt-2">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
