import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'

type DialogPolicyProps = {
  title: string
  lastUpdate?: string
  content: JSX.Element
  className?: string
}

export function DialogPolicy({
  title,
  lastUpdate,
  content,
  className,
}: DialogPolicyProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className={cn(
            'h-0 cursor-pointer px-0 text-xs font-normal text-gray-600 hover:text-light-blue',
            className
          )}
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {lastUpdate && (
            <DialogDescription>Last updated: {lastUpdate}</DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea className="max-h-[60dvh] py-0">{content}</ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
