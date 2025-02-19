import { AppSidebar } from '@/components/AppSidebar'
import { AnalyticsDatePicker } from '@/components/analytics/AnalyticsDatePicker'
import { AnalyticsLoader } from '@/components/analytics/AnalyticsLoader'
import { useTheme } from '@/components/theme-provider'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { useNetworkStatus } from '@/hooks/use-network-status'
import { usePage } from '@inertiajs/react'
import { Wifi, WifiOff } from 'lucide-react'
import {
    Fragment,
    type PropsWithChildren,
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { Toaster, toast } from 'react-hot-toast'

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { url } = usePage()
    const [pathList, setPathList] = useState<
        {
            name: string
            path: string
        }[]
    >([])

    const isDashboard = useMemo<boolean>(() => {
        return url === '/dashboard'
    }, [url])

    const { theme } = useTheme()

    const { isOnline, wasOffline, setWasOffline } = useNetworkStatus()

    const createBreadcrumbs = useCallback((pathname: string) => {
        const segments = pathname.split('/').filter(Boolean) // Split and filter empty strings

        return segments.map((segment, index) => {
            const formattedName = segment
                .replace(/-/g, ' ') // Replace dashes with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word

            const path = '/' + segments.slice(0, index + 1).join('/') // Construct the path up to this segment

            return {
                name: formattedName,
                path
            }
        })
    }, [])

    useEffect(() => {
        if (!isOnline) {
            toast.error('Oops! You are offline!', {
                icon: <WifiOff className="w-4 h-4 text-destructive" />,
                position: 'bottom-right'
            })
        } else if (wasOffline) {
            toast.success('Back online!', {
                icon: <Wifi className="w-4 h-4 text-primary" />,
                position: 'bottom-right'
            })

            // Reset wasOffline after showing the "Back online!" toast
            setTimeout(() => setWasOffline(false), 100) // Delay to ensure toast is shown
        }
    }, [wasOffline, isOnline])

    useEffect(() => {
        setPathList(createBreadcrumbs(window.location.pathname))
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb className="flex-grow">
                        <BreadcrumbList>
                            {pathList.map((item, index) => {
                                return (
                                    <Fragment key={item.path}>
                                        <BreadcrumbItem className="hidden md:block">
                                            {index < pathList.length - 1 ? (
                                                <BreadcrumbLink
                                                    href={item.path}
                                                >
                                                    {item.name}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>
                                                    {item.name}
                                                </BreadcrumbPage>
                                            )}
                                            {/*<BreadcrumbPage>{item.name}</BreadcrumbPage>*/}
                                        </BreadcrumbItem>
                                        {index < pathList.length - 1 ? (
                                            <BreadcrumbSeparator className="hidden md:block" />
                                        ) : null}
                                    </Fragment>
                                )
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                    {isDashboard ? (
                        <div className="flex items-center gap-4 motion-preset-slide-right motion-duration-300 ">
                            <AnalyticsLoader />
                            <AnalyticsDatePicker />
                        </div>
                    ) : null}
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
            <Toaster
                toastOptions={{
                    style:
                        theme === 'dark'
                            ? {
                                  borderRadius: '10px',
                                  background: '#333',
                                  color: '#fff'
                              }
                            : {}
                }}
            />
        </SidebarProvider>
    )
}
