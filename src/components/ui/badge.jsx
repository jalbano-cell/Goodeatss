import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm text-[0.62rem] font-semibold tracking-[0.12em] uppercase transition-colors',
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground border border-transparent',
        accent:      'border border-primary/40 text-primary',
        muted:       'border border-muted-foreground/25 text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground border border-transparent',
        outline:     'border border-foreground/25 text-foreground',
      },
      size: {
        default: 'px-2 py-0.5',
        sm:      'px-1.5 py-0.5',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

const Badge = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
))
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
