import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { abbreviateNumberWithSuffix, getFormattedCurrency } from '@/lib/helper'
import NumberFlow, { type Format } from '@number-flow/react'
import dayjs from 'dayjs'
import { type HTMLAttributes, type ReactNode, useMemo } from 'react'
import {cn} from "@/lib/utils";

interface AnalyticsCardProps extends HTMLAttributes<HTMLDivElement> {
    header: ReactNode | null
    headerIcon?: ReactNode | null
    value: number
    valueType: 'currency' | 'static' | 'percent'
}

export function AnalyticsCard({
    header,
    headerIcon,
    value,
    valueType,
    className,
    children,
    ...restProps
}: AnalyticsCardProps) {
    const { formattedValue, suffix } = abbreviateNumberWithSuffix(value)

    const formatter = useMemo<Format>(() => {
        if (valueType === 'static' || valueType === 'percent') {
            return { notation: 'standard' }
        }
        return { notation: 'standard', style: 'currency', currency: 'INR' }
    }, [valueType])

    const getSuffix = () => {
        if (valueType === 'currency') {
            return suffix
        } else if (valueType === 'percent') {
            return '%'
        }
        return ''
    }

    return (
        <Card className={cn('border-0 shadow-none', className)} {...restProps}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {header ? (
                    <CardTitle className="text-sm font-medium">
                        {header}
                    </CardTitle>
                ) : null}
                {headerIcon}
            </CardHeader>
            <CardContent>
                <Tooltip>
                    <div className="text-2xl font-bold">
                        <TooltipTrigger asChild>
                            <NumberFlow
                                format={formatter}
                                value={
                                    valueType === 'currency'
                                        ? formattedValue
                                        : value
                                }
                                locales="en-IN"
                                suffix={getSuffix()}
                            />
                        </TooltipTrigger>
                    </div>
                    {valueType === 'currency' ? (
                        <TooltipContent>
                            <p className="font-semibold">
                                {getFormattedCurrency(value)}
                            </p>
                        </TooltipContent>
                    ) : null}
                </Tooltip>
                <p className="text-xs mt-1">
                    From Inception till {dayjs().format('MMM - YYYY')}
                </p>
            </CardContent>
        </Card>
    )
}
