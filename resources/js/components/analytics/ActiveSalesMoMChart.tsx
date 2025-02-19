import { Loader2, TrendingUp } from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

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

interface ActiveSalesMoMChartProps extends HTMLAttributes<HTMLDivElement> {
    data: any
    loading: boolean
    activeSalesCount: number
}

const config = {
    active_sales: {
        label: 'Active Sales',
        color: 'hsl(var(--chart-2))'
    }
} satisfies ChartConfig

export function ActiveSalesMoMChart({
    className,
    activeSalesCount,
    loading,
    data,
    ...restProps
}: ActiveSalesMoMChartProps) {
    const { monthRange } = useSalesMetricsRange()

    return (
        <Card className={cn('relative', className)} {...restProps}>
            <CardHeader>
                <CardTitle>Active Sales - MoM</CardTitle>
                <CardDescription>{monthRange}</CardDescription>
            </CardHeader>
            {loading ? (
                <Loader2 className="animate-spin absolute top-4 right-4 text-muted-foreground" />
            ) : null}
            <CardContent>
                {data ? (
                    <ChartContainer config={config} className="w-full">
                        <LineChart
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
                                    abbreviateNumber(value)
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent className="w-[160px]" />
                                }
                            />
                            <Line
                                dataKey="active_sales"
                                type="natural"
                                stroke="var(--color-active_sales)"
                                strokeWidth={2}
                                dot={{
                                    fill: 'var(--color-active_sales)'
                                }}
                                activeDot={{
                                    r: 6
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                ) : (
                    <Skeleton className="h-[200px] w-full" />
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    A total of ₹{abbreviateNumber(activeSalesCount)} worth of products sold.
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing accumulated total active sales between selected dates.
                </div>
            </CardFooter>
        </Card>
    )
}
