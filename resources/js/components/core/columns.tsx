import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { Currency } from '@/components/Currency'
import { DataTableRowActions } from '@/components/core/data-table-row-actions'
import { FormattedDate } from '@/components/ui/FormattedDate'
import { saleListColumnMap } from '@/lib/columnMap'
import type { SaleListSchema } from '@/lib/schema'
import { Link } from '@inertiajs/react'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<SaleListSchema>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'sale_id',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title={saleListColumnMap['sale_id']}
            />
        ),
        cell: ({ row }) => (
            <div className="break-after-all">{row.getValue('sale_id')}</div>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'customer_name',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title={saleListColumnMap['customer_name']}
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('customer_name')}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'product',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title={saleListColumnMap['product']}
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[200px] items-center">
                    <span>{row.getValue('product')}</span>
                </div>
            )
        },
        enableSorting: false
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title={saleListColumnMap['amount']}
            />
        ),
        cell: ({ row }) => <Currency amount={row.getValue('amount')} />,
        enableSorting: true
    },
    {
        accessorKey: 'sale_date',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title={saleListColumnMap['sale_date']}
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <FormattedDate
                        value={row.getValue('sale_date')}
                        errorMessage="Not Sold Yet"
                    />
                </div>
            )
        },
        enableSorting: true
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title={saleListColumnMap['status']}
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[200px] items-center">
                    <span>{row.getValue('status')}</span>
                </div>
            )
        },
        enableSorting: false
    },
    {
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
]
