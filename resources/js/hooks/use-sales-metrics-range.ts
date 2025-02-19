import { metricsDateRangeAtom } from '@/lib/store'
import dayjs from 'dayjs'
import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'

export function useSalesMetricsRange() {
    const [dateRange] = useAtom(metricsDateRangeAtom)
    const [value, setValue] = useState<string | null>(null)
    const [monthRange, setMonthRange] = useState<string | null>(null)

    useEffect(() => {
        const from = dayjs(dateRange.from).format('MMM D, YYYY')
        const to = dayjs(dateRange.to).format('MMM D, YYYY')

        setValue(`From ${from} till ${to}`)

        const monthFrom = dayjs(dateRange.from).format('MMMM YYYY')
        const monthTo = dayjs(dateRange.to).format('MMMM YYYY')

        setMonthRange(`${monthFrom} - ${monthTo}`)
    }, [dateRange])

    return {
        monthRange,
        value
    }
}
