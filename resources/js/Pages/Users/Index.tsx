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
    Loader2,
    MoreHorizontal,
    User,
    UserMinus,
    UserPen
} from 'lucide-react'
import React, { type FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

import { RoleBadge } from '@/components/core/role-badge'
import { FormattedDate } from '@/components/ui/FormattedDate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export type UserModel = {
    id: string
    name: string
    email: string
    roles: {
        code: string
        name: string
    }[]
    created_at: string
    avatar: string
}

const columns: ColumnDef<UserModel>[] = [
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
        accessorKey: 'avatar',
        header: 'Avatar',
        cell: ({ row }) => (
            <Avatar className="w-8 h-8">
                <AvatarImage
                    src={row.getValue('avatar')}
                    alt={row.original.name}
                />
                <AvatarFallback className="text-white bg-blue-500">
                    <User className="w-4 h-4" />
                </AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: 'name',
        header: () => <div>Name</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue('name')}</div>
        }
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
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
            const user = row.original
            const [open, setOpen] = useState(false)
            const [loading, setLoading] = useState(false)

            const { id: currentUserId, isAdmin } = usePermission()
            const rowUserId = user.id as any
            const isSameUser = rowUserId === currentUserId

            const handleSubmit = () => {
                setLoading(true)
                AxiosService.delete(
                    route('organizations.users.destroy', user.id)
                )
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
                        <DropdownMenuItem disabled>
                            <UserPen />
                            Edit User (Coming Soon)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Dialog open={open} onOpenChange={setOpen}>
                            <Button
                                disabled={loading || isSameUser || !isAdmin}
                                onClick={() => setOpen(true)}
                                variant="ghost"
                                size="sm"
                                className="!text-destructive cursor-pointer w-full justify-start"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <UserMinus />
                                )}
                                Remove User
                            </Button>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Remove User</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to remove{' '}
                                        <strong>
                                            {user.name} ({user.email})
                                        </strong>
                                        ?
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

    const userList = pageProps.users || []

    const { isAdmin } = usePermission()

    const table = useReactTable({
        data: userList,
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
            <Head title="All Users" />

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
                        <div className="ml-auto flex gap-2">
                            <Button asChild>
                                <Link
                                    href={route('organizations.users.create')}
                                >
                                    Invite User
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={route('invitations.index')}>
                                    View Invitations
                                </Link>
                            </Button>
                        </div>
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
