import { ChevronsUpDown, CreditCard, LogOut, UserIcon } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import AxiosService from '@/lib/AxiosService'
import { Link } from '@inertiajs/react'

export function NavUser({
    user
}: {
    user: {
        name: string
        email: string
        avatar?: string
    }
}) {
    const { isMobile } = useSidebar()
    const { theme, setTheme } = useTheme()

    const handleModeChange = (isDark: boolean) => {
        setTheme(isDark ? 'dark' : 'light')
    }

    const getInitials = (): string => {
        const fullName = user.name || ''
        return fullName
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('')
    }

    const handleLogOut = () => {
        AxiosService.post(route('logout')).then((response: any) => {
            if (response.redirect) {
                window.location.href = response.redirect
            }
        })
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
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                    referrerPolicy="no-referrer"
                                />
                                <AvatarFallback className="rounded-lg">
                                    {getInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.name}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                        referrerPolicy="no-referrer"
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route('profile.edit')}
                                    className="cursor-pointer"
                                >
                                    <UserIcon /> Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <CreditCard />
                                Billing (Coming Soon...)
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <div className="flex items-center justify-between w-full">
                                <Label
                                    htmlFor="dark_mode"
                                    className="font-normal"
                                >
                                    Dark Mode
                                </Label>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={handleModeChange}
                                    onClick={(e) => e.stopPropagation()}
                                    id="dark_mode"
                                />
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogOut}
                            className="cursor-pointer text-destructive dark:text-rose-500"
                        >
                            <LogOut />
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
