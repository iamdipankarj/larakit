import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                'relax-green':
                    'border-transparent bg-relax-green text-destructive-foreground',
                'relax-red':
                    'border-transparent bg-relax-red text-destructive-foreground',
                'relax-yellow':
                    'border-transparent bg-relax-yellow text-destructive-foreground',
                'relax-blue':
                    'border-transparent bg-relax-blue text-destructive-foreground',
                'relax-warning':
                    'border-transparent bg-relax-warning text-destructive-foreground',
                'relax-brown':
                    'border-transparent bg-relax-brown text-destructive-foreground'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
