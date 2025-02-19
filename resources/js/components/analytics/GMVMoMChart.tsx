'use client'

import { Loader2, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { useSalesMetricsRange } from '@/hooks/use-sales-metrics-range'
import { abbreviateNumber } from '@/lib/helper'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface GMVMoMChartProps extends HTMLAttributes<HTMLDivElement> {
    data: any
    loading: boolean
    totalGmv: number
}

const config = {
    gmv: {
        label: 'GMV',
        color: 'hsl(var(--chart-1))'
    }
} satisfies ChartConfig

export function GMVMoMChart({
    className,
    totalGmv,
    loading,
    data,
    ...restProps
}: GMVMoMChartProps) {
    const { monthRange } = useSalesMetricsRange()

    return (
        <Card className={cn('relative', className)} {...restProps}>
            <CardHeader>
                <CardTitle>Gross Merchandise Value - MoM</CardTitle>
                <CardDescription>{monthRange}</CardDescription>
            </CardHeader>
            {loading ? (
                <Loader2 className="animate-spin absolute top-4 right-4 text-muted-foreground" />
            ) : null}
            <CardContent>
                {data ? (
                    <ChartContainer config={config} className="w-full">
                        <AreaChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                width={35}
                                tickFormatter={(value) =>
                                    `₹${abbreviateNumber(value)}`
                                }
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name) => (
                                            <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                                                {config[
                                                    name as keyof typeof config
                                                ]?.label || name}
                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                    <span className="font-normal text-muted-foreground">
                                                        ₹
                                                    </span>
                                                    {abbreviateNumber(
                                                        Number.parseFloat(
                                                            value as any
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    />
                                }
                                cursor={false}
                                defaultIndex={1}
                            />
                            <defs>
                                <linearGradient
                                    id="fillGmv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-gmv)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-gmv)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="gmv"
                                type="natural"
                                fill="url(#fillGmv)"
                                fillOpacity={0.4}
                                stroke="var(--color-gmv)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                ) : (
                    <Skeleton className="h-[200px] w-full" />
                )}
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            A Total GMV of ₹{abbreviateNumber(totalGmv)}.{' '}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing accumulated total GMV between selected dates.
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
