import type { SaleListSchema } from '@/lib/schema'
import { defaultDate } from '@/lib/time'
import { atom } from 'jotai'
import type { DateRange } from 'react-day-picker'

/**
 * Global Date range for dashboard/overview
 */
export const metricsDateRangeAtom = atom<DateRange>(defaultDate)

/**
 * Set global loading state for dashboard/overview
 */
export const metricsLoadingAtom = atom<boolean>(false)

/**
 * API Sales data
 */
export const saleListAtom = atom<SaleListSchema[]>([])

export const saleListLoadingAtom = atom<boolean>(false)

export const saleListErrorAtom = atom<string | null>(null)
