import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { columns } from '@/components/core/columns'
import { DataTable } from '@/components/core/data-table'
import { DataTableToolbar } from '@/components/core/data-table-toolbar'
import { ScrollableContainer } from '@/components/core/scrollable-container'
import type { SaleListSchema } from '@/lib/schema'
import { saleListAtom } from '@/lib/store'
import type { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import {
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-hot-toast'

export default function SalesList({ flash }: PageProps<{ flash?: any }>) {
    const [apiData] = useAtom(saleListAtom)

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data: apiData,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 50
            }
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    })

    useEffect(() => {
        if (flash) {
            if (flash.info) {
                toast(flash.info)
            } else if (flash.status) {
                toast.success(flash.status)
            }
        }
    }, [flash])

    return (
        <AuthenticatedLayout>
            <Head title="Sales" />

            <ScrollableContainer className="pb-3 -mb-3">
                <DataTableToolbar table={table} />
            </ScrollableContainer>

            <ScrollableContainer hasVerticalScrollbar hasVerticalMaxHeight>
                <DataTable table={table} columns={columns} />
            </ScrollableContainer>
        </AuthenticatedLayout>
    )
}
