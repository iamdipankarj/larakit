import { useLocalStorage } from '@/hooks/use-local-storage'
import AxiosService from '@/lib/AxiosService'
import { GLOBAL_DATE_FORMAT } from '@/lib/formatter'
import { LARAKIT_ORG_CODE } from '@/lib/helper'
import { metricsDateRangeAtom } from '@/lib/store'
import dayjs from 'dayjs'
import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'

export function useSalesMetrics() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Record<string, number> | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [atomDateRange] = useAtom(metricsDateRangeAtom)

    const fetchData = () => {
        setLoading(true)
        AxiosService.post('/api/salesMetrics', {
            start_date: dayjs(atomDateRange.from).format(GLOBAL_DATE_FORMAT),
            end_date: dayjs().format(GLOBAL_DATE_FORMAT)
        }).then((response: any) => {
            const payload = response || {}
            setData(payload)
            setLoading(false)
        })
        .catch((e: any) => {
            setError(e?.message || 'Error fetching metrics data')
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        error,
        loading,
        data
    }
}
