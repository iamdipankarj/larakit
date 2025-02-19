import { GLOBAL_DATE_FORMAT } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import type React from 'react'

interface FormattedDateProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string
    errorMessage?: string
}

export function FormattedDate({
    value,
    className,
    errorMessage = 'Date not found'
}: FormattedDateProps) {
    if (value) {
        return (
            <div className={cn('font-medium', className)}>
                {dayjs(value, GLOBAL_DATE_FORMAT).format('D MMMM YYYY')}
            </div>
        )
    }
    return <div className={cn('font-medium', className)}>{errorMessage}</div>
}
