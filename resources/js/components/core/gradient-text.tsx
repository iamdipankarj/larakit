import { cn } from '@/lib/utils'
import type React from 'react'

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function GradientText({
    className,
    children,
    ...restProps
}: GradientTextProps) {
    return (
        <span
            className={cn(
                'font-bold bg-gradient-to-r from-blue-500 to-emerald-600 text-transparent bg-clip-text bg-300% animate-gradient',
                className
            )}
            {...restProps}
        >
            {children}
        </span>
    )
}
