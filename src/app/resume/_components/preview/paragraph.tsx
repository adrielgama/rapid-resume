import { cn } from '@/lib/utils'

export const Paragraph = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <p className={cn('text-sm font-medium text-dark-blue', className)}>
    {children}
  </p>
)
