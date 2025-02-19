import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import AxiosService from '@/lib/AxiosService'
import type { PageProps } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import {
    ArrowUpDown,
    ChevronDown,
    Copy,
    Loader2,
    MailMinus,
    MoreHorizontal
} from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

import { InvitationStatusBadge } from '@/components/core/invitation-status-badge'
import { RoleBadge } from '@/components/core/role-badge'
import { FormattedDate } from '@/components/ui/FormattedDate'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { usePermission } from '@/hooks/use-permission'
import { sleep } from '@/lib/utils'

type InvitationModel = {
    id: string
    organization_id: string
    token: string
    email: string
    roles: {
        code: string
        name: string
    }[]
    created_at: string
    expires_at: string
    accepted_at: string
}

const columns: ColumnDef<InvitationModel>[] = [
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
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-mx-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('email')}</div>
        )
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-mx-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Added On
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <FormattedDate value={row.getValue('created_at')} />
    },
    {
        accessorKey: 'accepted_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-mx-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Status
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rowValue = row.getValue('accepted_at')
            return <InvitationStatusBadge accepted={rowValue !== null} />
        }
    },
    {
        accessorKey: 'expires_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-mx-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Expires At
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <FormattedDate value={row.getValue('expires_at')} />
    },
    {
        accessorKey: 'roles',
        header: () => <div>Roles</div>,
        cell: ({ row }) => {
            const roles = ((row.getValue('roles') as Array<any>) || []).map(
                (item: any) => ({
                    id: item.id,
                    name: item.name,
                    code: item.code
                })
            )
            return (
                <div className="flex gap-1.5 flex-wrap max-w-[100px]">
                    {roles.map((item, id) => {
                        return (
                            <RoleBadge role={item.code} key={id}>
                                {item.name}
                            </RoleBadge>
                        )
                    })}
                </div>
            )
        },
        enableSorting: false
    },
    {
        id: 'actions',
        enableHiding: false,
        header: () => <div>Actions</div>,
        cell: ({ row }) => {
            const invitation = row.original
            const [open, setOpen] = useState(false)
            const [loading, setLoading] = useState(false)
            const isAccepted = invitation.accepted_at !== null

            const { isAdmin } = usePermission()

            const handleCopy = () => {
                const url = `${window.location.origin}/invitations/accept?token=${invitation.token}`
                navigator.clipboard
                    .writeText(url)
                    .then(() => {
                        toast.success('Link Copied to Clipboard')
                    })
                    .catch((err) => {
                        console.error('Failed to copy invitation link:', err)
                    })
            }

            const handleSubmit = () => {
                setLoading(true)
                AxiosService.delete(route('invitations.destroy', invitation.id))
                    .then((response: any) => {
                        setLoading(false)
                        setOpen(false)
                        toast
                            .promise(sleep(500), {
                                loading: 'Loading...',
                                success: <b>{response.status} Refreshing...</b>,
                                error: <b />
                            })
                            .then(() => {
                                setTimeout(() => {
                                    window.location.reload()
                                }, 800)
                            })
                            .catch(() => {
                                toast.error('Promise unfulfilled.')
                            })
                    })
                    .catch((e: any) => {
                        setLoading(false)
                        toast.error(
                            e?.message ||
                                'An error occurred while deleting the user'
                        )
                    })
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleCopy} asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="cursor-pointer w-full justify-start focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Copy /> Copy Invite Link
                            </Button>
                        </DropdownMenuItem>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <Button
                                disabled={loading || !isAdmin}
                                onClick={() => setOpen(true)}
                                variant="ghost"
                                size="sm"
                                className="!text-destructive dark:!text-rose-500 cursor-pointer w-full justify-start px-2"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <MailMinus />
                                )}
                                Remove Invitation
                            </Button>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Remove Invitation</DialogTitle>
                                    <DialogDescription>
                                        {isAccepted ? (
                                            <>
                                                This invitation is already
                                                accepted. Removing this
                                                won&apos;t have any effect. If
                                                you want to delete the user, you
                                                can do so by navigating to{' '}
                                                <Link
                                                    className="font-semibold text-blue-600 dark:text-blue-500 tracking-wide underline"
                                                    href={route(
                                                        'organizations.users.index'
                                                    )}
                                                >
                                                    View Users
                                                </Link>
                                                .
                                            </>
                                        ) : (
                                            <>
                                                Are you sure you want to delete
                                                invitation to{' '}
                                                <strong>
                                                    ({invitation.email})
                                                </strong>
                                                ?
                                            </>
                                        )}
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setOpen(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="destructive"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" />
                                        ) : null}
                                        Yes
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export default function Index({
    status,
    errors
}: PageProps<{ status?: string; errors?: any }>) {
    const pageProps = usePage().props as any

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const invitationList = pageProps.invitations || []

    const { isAdmin } = usePermission()

    const table = useReactTable({
        data: invitationList,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        initialState: {
            pagination: {
                pageSize: 100
            }
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    })

    return (
        <AuthenticatedLayout>
            <Head title="View Invitations" />

            <div className="w-full">
                <div className="flex items-center py-4 gap-2">
                    <Input
                        placeholder="Filter emails..."
                        value={
                            (table
                                .getColumn('email')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn('email')
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    {isAdmin ? (
                        <Button className="ml-auto" asChild>
                            <Link href={route('organizations.users.create')}>
                                Invite User
                            </Link>
                        </Button>
                    ) : null}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
