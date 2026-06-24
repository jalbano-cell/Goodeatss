import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-xs font-semibold tracking-[0.08em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:  'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:  'border border-primary text-primary hover:bg-primary/10',
        ghost:    'text-muted-foreground hover:text-foreground',
        danger:   'border border-destructive/40 text-destructive hover:bg-destructive/10',
        subtle:   'border border-border text-muted-foreground hover:border-primary hover:text-primary',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm:      'h-8 px-4 text-[0.68rem]',
        lg:      'h-11 px-8',
        icon:    'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
