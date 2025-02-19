import { SaleStatusFacetedFilter } from '@/components/core/sale-status-faceted-filter'
import { Icons } from '@/components/icons'
import { statuses } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AxiosService from '@/lib/AxiosService'
import { GLOBAL_DATE_FORMAT } from '@/lib/formatter'
import {
    saleListAtom,
    saleListErrorAtom,
    saleListLoadingAtom
} from '@/lib/store'
import { defaultDate } from '@/lib/time'
import { cn } from '@/lib/utils'
import {Link, router} from '@inertiajs/react'
import type { Table } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import {CloudDownload, RefreshCcw, X} from 'lucide-react'
import React, { type HTMLAttributes, useEffect } from 'react'
import type { DateRange } from 'react-day-picker'
import { toast } from 'react-hot-toast'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> extends HTMLAttributes<HTMLDivElement> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
    className
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [, setApiData] = useAtom(saleListAtom)
    const [apiError, setApiError] = useAtom(saleListErrorAtom)
    const [listLoading, setListLoading] = useAtom(saleListLoadingAtom)

    const getData = () => {
        fetchData()
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (apiError) {
            toast.error(apiError || 'An error occurred while loading the sales')
        }
    }, [apiError])

    const fetchData = () => {
        setListLoading(true)
        const payload = {
            org: 'ACME'
        } as any

        AxiosService.post('/api/getSales', payload)
            .then((response: any) => {
                const sales = response?.sales || []
                setApiData(sales)
                setListLoading(false)
            })
            .catch((e: any) => {
                toast.error(
                    e?.message || 'An error occurred while loading the sales'
                )
                setApiError('Error fetching sales data')
                setListLoading(false)
            })
    }

    return (
        <div className={cn('flex items-center justify-between', className)}>
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter Products..."
                    value={
                        (table
                            .getColumn('product')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('product')
                            ?.setFilterValue(event.target.value)
                    }
                    disabled={listLoading}
                    className="w-[150px] lg:w-[250px]"
                />
                <SaleStatusFacetedFilter
                    column={table.getColumn('status')}
                    title="Status"
                    options={statuses}
                />
                <Button
                    disabled={listLoading}
                    onClick={getData}
                    variant="outline"
                >
                    {listLoading ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCcw className="h-4 w-4" />
                    )}
                </Button>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <div className="flex gap-2">
                <Button asChild>
                    <a href='/api/generateCSV'>
                        <CloudDownload />
                        Download
                    </a>
                </Button>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
}
