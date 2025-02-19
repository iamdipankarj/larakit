import {
    BookOpenText,
    Factory,
    HousePlus,
    LayoutDashboard,
    Receipt
} from 'lucide-react'
import type * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { OrgMenu } from '@/components/org-menu'
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarRail,
    useSidebar
} from '@/components/ui/sidebar'
import { usePermission } from '@/hooks/use-permission'
import { cn } from '@/lib/utils'
import { Link, usePage } from '@inertiajs/react'

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: route('dashboard', undefined, false),
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: 'Overview',
                    url: route('dashboard', undefined, false)
                }
            ]
        },
        {
            title: 'Sales',
            url: '#',
            icon: Receipt,
            isActive: true,
            items: [
                {
                    title: 'All Sales',
                    url: route('dashboard.sales', undefined, false)
                }
            ]
        },
        {
            title: 'Reports',
            url: '#',
            icon: BookOpenText,
            isActive: true,
            items: [
                {
                    title: 'All Reports',
                    url: route('reports')
                },
                {
                    title: 'Sales Report',
                    url: route('reports.report_type', 'sales', false)
                },
                {
                    title: 'Customer Report',
                    url: route('reports.report_type', 'customer', false)
                },
                {
                    title: 'Marketing Report',
                    url: route('reports.report_type', 'marketing', false)
                }
            ]
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user
    const { isAcmeUser, isAcmeAdmin } = usePermission()
    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrgMenu />
            </SidebarHeader>
            <SidebarContent>
                {isAcmeUser ? (
                    <>
                        <SidebarGroupLabel>Org Controls</SidebarGroupLabel>
                        <div
                            className={cn('flex px-2 gap-2 [&>*]:shrink-0', {
                                'flex-col': state === 'collapsed'
                            })}
                        >
                            {isAcmeAdmin ? (
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    asChild
                                >
                                    <Link href={route('organizations.create')}>
                                        <HousePlus />
                                        {state === 'expanded'
                                            ? 'Add Org'
                                            : null}
                                    </Link>
                                </Button>
                            ) : null}
                            {isAcmeUser ? (
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    asChild
                                >
                                    <Link href={route('organizations.index')}>
                                        <Factory />
                                        {state === 'expanded'
                                            ? 'View All'
                                            : null}
                                    </Link>
                                </Button>
                            ) : null}
                        </div>
                    </>
                ) : null}
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
