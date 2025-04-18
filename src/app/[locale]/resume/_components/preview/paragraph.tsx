import { cn } from '@/lib/utils'

export const Paragraph = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <p className={cn('text-dark-blue text-sm font-medium', className)}>
    {children}
  </p>
)
