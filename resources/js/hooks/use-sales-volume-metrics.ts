import type { ChartConfig } from '@/components/ui/chart'
import AxiosService from '@/lib/AxiosService'
import { GLOBAL_DATE_FORMAT } from '@/lib/formatter'
import { metricsDateRangeAtom } from '@/lib/store'
import dayjs from 'dayjs'
import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'

export function useSalesVolumeMetrics() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [atomDateRange] = useAtom(metricsDateRangeAtom)

    const [chartData, setChartData] = useState<Record<string, any>[] | null>(null)
    const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null)
    const [chartKeys, setChartKeys] = useState<string[] | null>(null)

    const fetchData = () => {
        setLoading(true)
        AxiosService.post('/api/salesVolumeMetrics', {
            start_date: dayjs(atomDateRange.from).format(GLOBAL_DATE_FORMAT),
            end_date: dayjs(atomDateRange.to).format(GLOBAL_DATE_FORMAT)
        })
            .then((response: any) => {
                const payload = response?.data || []
                setData(Array.isArray(payload) ? payload : [])
                setLoading(false)
            })
            .catch((e: any) => {
                setError(e?.message || 'Error fetching monthwise metrics data')
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (data) {
            setChartConfig({
                electronics: {
                    label: 'Electronics',
                    color: 'hsl(var(--chart-1))'
                },
                household: {
                    label: 'Household',
                    color: 'hsl(var(--chart-2))'
                },
                automotive: {
                    label: 'Automotive',
                    color: 'hsl(var(--chart-3))'
                },
                kitchen: {
                    label: 'Kitchen',
                    color: 'hsl(var(--chart-4))'
                }
            })

            setChartData(
                data.map((item: any) => ({
                    month: dayjs(item.sale_month).format("MMM 'YY"),
                    electronics: item.electronics,
                    household: item.household,
                    automotive: item.automotive,
                    kitchen: item.kitchen
                }))
            )
        }
    }, [data])

    useEffect(() => {
        if (chartConfig) {
            setChartKeys(Object.keys(chartConfig))
        }
    }, [chartConfig])

    return {
        chartData,
        chartConfig,
        chartKeys,
        error,
        loading,
        data
    }
}
