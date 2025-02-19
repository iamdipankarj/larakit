import AxiosService from '@/lib/AxiosService'
import { GLOBAL_DATE_FORMAT } from '@/lib/formatter'
import { metricsDateRangeAtom } from '@/lib/store'
import dayjs from 'dayjs'
import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'

export function useActiveSalesMetrics() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [atomDateRange] = useAtom(metricsDateRangeAtom)

    const [activeSalesChartData, setActiveSalesChartData] = useState<
        Record<string, any>[] | null
    >(null)
    const [gmvChartData, setGmvChartData] = useState<
        Record<string, any>[] | null
    >(null)
    const [totalGmv, setTotalGmv] = useState<number>(0)

    const fetchData = () => {
        setLoading(true)
        AxiosService.post('/api/activeSalesMetrics', {
            start_date: dayjs(atomDateRange.from).format(GLOBAL_DATE_FORMAT),
            end_date: dayjs(atomDateRange.to).format(GLOBAL_DATE_FORMAT)
        })
            .then((response: any) => {
                const payload = response?.data || []
                setData(Array.isArray(payload) ? payload : [])
                setLoading(false)
            })
            .catch((e: any) => {
                setError(
                    e?.message || 'Error fetching active sales and GMV data'
                )
                setLoading(false)
            })
    }

    useEffect(() => {
        if (atomDateRange) {
            fetchData()
        }
    }, [atomDateRange])

    useEffect(() => {
        if (data) {
            setActiveSalesChartData(
                data.map((item: any) => ({
                    month: dayjs(item.date).format("MMM 'YY"),
                    active_sales: Number.parseInt(item.active_sales)
                }))
            )
            setGmvChartData(
                data.map((item: any) => ({
                    month: dayjs(item.date).format("MMM 'YY"),
                    gmv: Number.parseInt(item.gmv)
                }))
            )
            setTotalGmv(
                data.reduce(
                    (sum: number, entry: Record<string, number>) =>
                        sum + entry.gmv,
                    0
                )
            )
        }
    }, [data])

    return {
        activeSalesChartData,
        gmvChartData,
        totalGmv,
        error,
        loading,
        data
    }
}
