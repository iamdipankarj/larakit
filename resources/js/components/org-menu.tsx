import {
    Building2,
    ChevronRight,
    Mail,
    Trash,
    UserIcon,
    UserPlus,
    Users
} from 'lucide-react'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar'
import { usePermission } from '@/hooks/use-permission'
import { Link, usePage } from '@inertiajs/react'

export function OrgMenu() {
    const { isMobile } = useSidebar()
    const pageProps = usePage().props
    const currentOrg: any = pageProps.current_org || {}
    const { isAdmin, isAcmeUser } = usePermission()

    const getOrgImage = (): string => {
        if (currentOrg.code) {
            return `/org/${currentOrg.code}.webp`
        }
        return '/org/ACME.webp'
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                <Avatar>
                                    <AvatarImage
                                        src={getOrgImage()}
                                        alt={currentOrg.name}
                                    />
                                    <AvatarFallback className="text-white bg-blue-500">
                                        <Building2 className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                                <span className="truncate font-semibold">
                                {isAcmeUser ? 'Acme' : currentOrg.name}
                                </span>
                                {isAcmeUser ? (
                                    <span className="truncate text-xs">
                                        Owner
                                    </span>
                                ) : (
                                    <span className="truncate text-xs">
                                        Organization
                                    </span>
                                )}
                            </div>
                            <ChevronRight className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Users
                        </DropdownMenuLabel>
                        {isAdmin ? (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="gap-2 p-2 cursor-pointer"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'organizations.users.create'
                                        )}
                                        className="font-medium text-muted-foreground"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                            <UserPlus className="size-4" />
                                        </div>
                                        Invite User
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-2 p-2 cursor-pointer"
                            asChild
                        >
                            <Link
                                href={route('organizations.users.index')}
                                className="font-medium text-muted-foreground"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Users className="size-4" />
                                </div>
                                All Users
                            </Link>
                        </DropdownMenuItem>
                        {isAdmin ? (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="gap-2 p-2 cursor-pointer"
                                    asChild
                                >
                                    <Link
                                        href={route('invitations.index')}
                                        className="font-medium text-muted-foreground"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                            <Mail className="size-4" />
                                        </div>
                                        View Invitations
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
