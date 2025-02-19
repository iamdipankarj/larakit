import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { FormattedDate } from '@/components/ui/FormattedDate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import type { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { Building2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function Index({
    flash,
    status,
    org_list = []
}: PageProps<{
    flash?: any
    status: string
    org_list: Record<string, string>[]
}>) {
    const orgList = Array.isArray(org_list) ? org_list : []

    useEffect(() => {
        if (flash) {
            if (flash.error) {
                toast.error(flash.error)
            }
        }
    }, [flash])

    return (
        <AuthenticatedLayout>
            <Head title="All Organizations" />

            {flash?.status && (
                <div style={{ color: 'green', marginBottom: '10px' }}>
                    {flash.status}
                </div>
            )}

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Added On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orgList.map((org) => (
                        <TableRow key={org.id}>
                            <TableCell className="font-medium">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage
                                        src={`/org/${org.code}.webp`}
                                        alt={org.name}
                                    />
                                    <AvatarFallback className="text-white bg-blue-500">
                                        <Building2 className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                                {org.name}
                            </TableCell>
                            <TableCell>
                                <strong>{org.code}</strong>
                            </TableCell>
                            <TableCell>
                                <FormattedDate value={org.created_at} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    )
}
