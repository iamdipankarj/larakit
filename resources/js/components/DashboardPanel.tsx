import { ActiveSalesMoMChart } from '@/components/analytics/ActiveSalesMoMChart'
import { AnalyticsCard } from '@/components/analytics/AnalyticsCard'
import { SalesVolumeMoMChart } from '@/components/analytics/SalesVolumeMoMChart'
import { GMVMoMChart } from '@/components/analytics/GMVMoMChart'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSalesMetrics } from '@/hooks/use-sales-metrics'
import { useSalesVolumeMetrics } from '@/hooks/use-sales-volume-metrics'
import { useActiveSalesMetrics } from '@/hooks/use-active-sales-metrics'
import { metricsLoadingAtom } from '@/lib/store'
import { useAtom } from 'jotai'
import {CircleUserRound, IndianRupee, Percent, Sigma} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export function DashboardPanel() {
    const [productsSold, setProductsSold] = useState<number>(0)
    const [totalSales, setTotalSales] = useState<number>(0)
    const [pendingOrders, setPendingOrders] = useState<number>(0)
    const [grossMargin, setGrossMargin] = useState<number>(0)
    const [totalCustomers, setTotalCustomers] = useState<number>(0)
    const [refundPercentage, setRefundPercentage] = useState<number>(0)

    const [, setAtomLoading] = useAtom(metricsLoadingAtom)

    // Card numbers
    const {
        data,
        loading: metricsLoading,
        error: totalNumbersError
    } = useSalesMetrics()

    // Sales graph
    const {
        chartData: salesVolChartData,
        chartKeys: salesVolChartKeys,
        chartConfig: salesVolChartConfig,
        loading: salesVolLoading,
        error: salesVolError
    } = useSalesVolumeMetrics()

    // Active sales and GMV graph
    const {
        activeSalesChartData,
        gmvChartData,
        totalGmv,
        error: posActiveError,
        loading: posActiveLoading
    } = useActiveSalesMetrics()

    useEffect(() => {
        if (totalNumbersError) {
            toast.error(totalNumbersError)
        }
        if (salesVolError) {
            toast.error(salesVolError)
        }
        if (posActiveError) {
            toast.error(posActiveError)
        }
    }, [totalNumbersError, salesVolError, posActiveError])

    useEffect(() => {
        setAtomLoading(metricsLoading || salesVolLoading)
    }, [metricsLoading, salesVolLoading])

    useEffect(() => {
        if (data) {
            setProductsSold(data.total_products_sold || 0)
            setTotalSales(data.total_sales || 0)
            setPendingOrders(data.pending_orders || 0)
            setGrossMargin(data.gross_margin || 0)
            setTotalCustomers(data.total_customers || 0)
            setRefundPercentage(data.refund_percentage || 0)
        }
    }, [data])

    return (
        <TooltipProvider delayDuration={0}>
            <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-[repeat(6,1fr)] gap-4 motion-preset-fade motion-duration-300">
                    <AnalyticsCard
                        header="Total Products Sold"
                        headerIcon={<Sigma className="h-4 w-4" />}
                        className="col-span-2 bg-clearBlue text-white dark:bg-emerald-800/60 dark:border-emerald-300/60"
                        value={productsSold}
                        valueType="static"
                    />
                    <AnalyticsCard
                        header="Total Sales"
                        headerIcon={<IndianRupee className="h-4 w-4" />}
                        className="col-span-2 bg-seaweed text-white  dark:bg-purple-800/60"
                        value={totalSales}
                        valueType="currency"
                    />
                    <AnalyticsCard
                        header="Pending Orders"
                        headerIcon={<Sigma className="h-4 w-4" />}
                        className="col-span-2 bg-greyishTeal text-white"
                        value={pendingOrders}
                        valueType="static"
                    />
                    <AnalyticsCard
                        header="Gross Margin"
                        headerIcon={<IndianRupee className="h-4 w-4" />}
                        className="col-span-2 bg-orange-100  dark:bg-orange-800/60 "
                        value={grossMargin}
                        valueType="currency"
                    />
                    <AnalyticsCard
                        header="Total Customers"
                        headerIcon={<CircleUserRound className="h-4 w-4" />}
                        className="col-span-2 bg-lightPink dark:bg-rose-700/60"
                        value={totalCustomers}
                        valueType="static"
                    />
                    <AnalyticsCard
                        header="Refund Percentage"
                        headerIcon={<Percent className="h-4 w-4" />}
                        className="col-span-2 bg-rose-200  dark:bg-rose-900/60"
                        value={refundPercentage}
                        valueType="percent"
                    />
                </div>
                <SalesVolumeMoMChart
                    totalAmount={totalSales}
                    keys={salesVolChartKeys}
                    config={salesVolChartConfig}
                    data={salesVolChartData}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ActiveSalesMoMChart
                        loading={posActiveLoading}
                        activeSalesCount={totalSales}
                        data={activeSalesChartData}
                    />
                    <GMVMoMChart
                        loading={posActiveLoading}
                        totalGmv={totalGmv}
                        data={gmvChartData}
                    />
                </div>
            </div>
        </TooltipProvider>
    )
}
