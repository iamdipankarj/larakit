import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import type { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { BadgeDollarSign, ChartBarBig, Contact } from 'lucide-react'

export default function Reports({
    mustVerifyEmail,
    status
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Reports" />

            <div className="w-full space-y-6">
                <h1 className="scroll-m-20 text-xl md:text-3xl font-bold tracking-tight">
                    Choose a Report Type
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 *:text-center *:w-full">
                    <Link
                        className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                        href={route('reports.report_type', 'sales')}
                    >
                        <BadgeDollarSign className="w-10 h-10" />
                        <p className="text-sm md:text-base font-medium mt-2">
                            Sales Report
                        </p>
                    </Link>
                    <Link
                        className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                        href={route('reports.report_type', 'customer')}
                    >
                        <Contact className="w-10 h-10" />
                        <p className="text-sm md:text-base font-medium mt-2">
                            Customer Report
                        </p>
                    </Link>
                    <Link
                        className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                        href={route('reports.report_type', 'marketing')}
                    >
                        <ChartBarBig className="w-10 h-10" />
                        <p className="text-sm md:text-base font-medium mt-2">
                            Marketing Report
                        </p>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
