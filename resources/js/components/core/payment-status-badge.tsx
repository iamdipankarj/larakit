import { cn } from '@/lib/utils'
import type React from 'react'

interface PaymentStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    status: 'DUE' | 'PAID'
}

export function PaymentStatusBadge({
    className,
    status,
    ...restProps
}: PaymentStatusBadgeProps) {
    return (
        <div
            className={cn(
                className,
                'text-foreground bg-slate-500/10 border border-slate-500/20 capitalize font-semibold text-xs tracking-wide py-1 pl-1.5 pr-2.5 rounded-full inline-flex items-center gap-2'
            )}
            {...restProps}
        >
            <span
                className={cn('inline-flex w-3 h-3 rounded-full', {
                    'bg-emerald-800': status === 'PAID',
                    'bg-darkYellow': status === 'DUE'
                })}
            />
            {status}
        </div>
    )
}
