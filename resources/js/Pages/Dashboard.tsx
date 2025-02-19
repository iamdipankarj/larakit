import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { DashboardPanel } from '@/components/DashboardPanel'
import type { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import * as React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function Dashboard({ flash }: PageProps<{ flash?: any }>) {
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
            <Head title="Dashboard" />

            <DashboardPanel />
        </AuthenticatedLayout>
    )
}
