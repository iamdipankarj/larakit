import { getFormattedCurrency } from '@/lib/helper'
import { cn } from '@/lib/utils'
import type React from 'react'
import type { ReactNode } from 'react'

interface CurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
    amount: string
    extras?: ReactNode | null
}

export function Currency({ amount, className, extras }: CurrencyProps) {
    const formatted = getFormattedCurrency(amount)

    return (
        <div className={cn('font-medium', className)}>
            {formatted}{' '}
            {extras ? (
                <span className="inline-flex px-1 border border-emerald-600 text-emerald-800 rounded-md">
                    {extras}
                </span>
            ) : null}
        </div>
    )
}
