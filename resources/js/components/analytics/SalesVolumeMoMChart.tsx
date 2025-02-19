import { TrendingUp } from 'lucide-react'
import { type HTMLAttributes, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import { useSalesMetricsRange } from '@/hooks/use-sales-metrics-range'
import { abbreviateNumber } from '@/lib/helper'

interface SalesVolumeMoMChartProps extends HTMLAttributes<HTMLDivElement> {
    config: ChartConfig | null
    data: any
    totalAmount: number
    keys?: string[] | null
}

export function SalesVolumeMoMChart({
    className,
    keys,
    data,
    totalAmount,
    config,
    ...restProps
}: SalesVolumeMoMChartProps) {
    const keyLength = keys?.length || 0

    const { monthRange } = useSalesMetricsRange()

    const getBarRadius = (index: number): [number, number, number, number] => {
        if (index === 0) {
            return [0, 0, 4, 4]
        } else if (index === keyLength - 1) {
            return [4, 4, 0, 0]
        }
        return [0, 0, 0, 0]
    }

    const formattedTotalAmount = useMemo(() => {
        if (totalAmount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(totalAmount)
        }
        return 0
    }, [totalAmount])

    const getTotal = (item: any) => {
        if (item) {
            const { electronics, household, automotive, kitchen } = item.payload || {}
            return (
                (Number(electronics) || 0) +
                (Number(household) || 0) +
                (Number(automotive) || 0) +
                (Number(kitchen) || 0)
            )
        }
        return 0
    }

    return (
        <Card className={className} {...restProps}>
            <CardHeader>
                <CardTitle>Sales Volume - MoM</CardTitle>
                <CardDescription>{monthRange}</CardDescription>
            </CardHeader>
            <CardContent>
                {config && data ? (
                    <ChartContainer config={config} className="h-72 w-full">
                        <BarChart accessibilityLayer data={data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[180px]"
                                        formatter={(
                                            value,
                                            name,
                                            item,
                                            index
                                        ) => (
                                            <>
                                                <div
                                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                    style={
                                                        {
                                                            '--color-bg': `var(--color-${name})`
                                                        } as React.CSSProperties
                                                    }
                                                />
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
                                                {/* Add this after the last item */}
                                                {index === 3 && (
                                                    <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                        Total
                                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                            <span className="font-normal text-muted-foreground">
                                                                ₹
                                                            </span>
                                                            {abbreviateNumber(
                                                                getTotal(item)
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                }
                                cursor={false}
                                defaultIndex={1}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            {keys
                                ? keys.map((item, index) => {
                                      return (
                                          <Bar
                                              key={index}
                                              dataKey={item}
                                              stackId="a"
                                              fill={`var(--color-${item})`}
                                              radius={getBarRadius(index)}
                                          />
                                      )
                                  })
                                : null}
                        </BarChart>
                    </ChartContainer>
                ) : null}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Total of {formattedTotalAmount} worth of products sold.
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total accumulated sales amount between selected
                    dates.
                </div>
            </CardFooter>
        </Card>
    )
}
