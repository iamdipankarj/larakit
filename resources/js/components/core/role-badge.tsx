import { cn } from '@/lib/utils'
import type { Role } from '@/types/roles'
import type React from 'react'

interface RoleBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    role: Role
}

export function RoleBadge({
    className,
    role,
    children,
    ...restProps
}: RoleBadgeProps) {
    return (
        <div
            className={cn(
                className,
                'text-white text-center font-semibold uppercase text-xs tracking-wide py-1 px-1.5 rounded-sm',
                {
                    'bg-emerald-600 dark:bg-emerald-700 border border-emerald-700':
                        role === 'ADMIN',
                    'bg-yellow-500 dark:bg-yellow-700 border border-yellow-600':
                        role === 'MEMBER'
                }
            )}
            {...restProps}
        >
            {children}
        </div>
    )
}
