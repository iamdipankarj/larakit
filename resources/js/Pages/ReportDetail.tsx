import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { DateRangePicker } from '@/components/date-range-picker'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { usePermission } from '@/hooks/use-permission'
import AxiosService from '@/lib/AxiosService'
import { formatString } from '@/lib/helper'
import { defaultDate } from '@/lib/time'
import type { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { Loader2, Terminal } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { toast } from 'react-hot-toast'

export default function ReportDetail({
    reportType
}: PageProps<{ reportType: string }>) {
    const [dateRange, setDateRange] = useState<DateRange>(defaultDate)
    const [loading, setLoading] = useState<boolean>(false)
    const [wasSuccess, setWasSuccess] = useState<number>(0)
    const [isPosPercentage, setIsPosPercentage] = useState<boolean>(false)

    const { userEmail } = usePermission()

    const readableName = useMemo(() => formatString(reportType), [reportType])

    const isPerformanceReport = reportType === 'PORTFOLIO_PERFORMANCE_REPORT'

    const handleSubmit = () => {
        if (dateRange) {
            setLoading(true)

            AxiosService.post('/api/generateReport')
                .then(() => {
                    setLoading(false)
                    setWasSuccess((prev) => prev + 1)
                })
                .catch((_: any) => {
                    setLoading(false)
                    toast.error('Error while generating report.')
                })
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title={readableName} />

            {reportType ? (
                <h2 className="text-3xl font-bold tracking-tight">
                    {readableName}
                </h2>
            ) : null}
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 pr-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <DateRangePicker onDateChange={setDateRange} />
                        </div>
                        {isPerformanceReport ? (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={isPosPercentage}
                                    onCheckedChange={(value: boolean) => {
                                        setIsPosPercentage(value)
                                    }}
                                    id="pos_percentage"
                                />
                                <label
                                    htmlFor="pos_percentage"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Show Data in percentage?
                                </label>
                            </div>
                        ) : null}
                        <Button disabled={loading} onClick={handleSubmit}>
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : null}
                            Generate Report
                        </Button>
                    </div>
                </div>
                <div className="flex-1 border-l pl-4">
                    {wasSuccess ? (
                        <Alert
                            key={wasSuccess}
                            className="motion-preset-confetti motion-duration-1500"
                        >
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription className="leading-6 mt-4">
                                Reports will be sent to your email{' '}
                                <strong>({userEmail})</strong> in sometime from{' '}
                                <strong>support@acme.com</strong>.
                            </AlertDescription>
                        </Alert>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
