import { cn } from '@/lib/utils'
import type { Role } from '@/types/roles'
import type React from 'react'

interface InvitationStatusBadgeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    accepted: boolean
}

export function InvitationStatusBadge({
    className,
    accepted,
    ...restProps
}: InvitationStatusBadgeProps) {
    return (
        <div
            className={cn(
                className,
                'inline-flex mx-auto text-white text-center font-semibold uppercase text-xs tracking-wide py-1 px-1.5 rounded-sm',
                {
                    'text-emerald-700 border border-emerald-700': accepted,
                    'text-yellow-600 border border-yellow-600': !accepted
                }
            )}
            {...restProps}
        >
            {accepted ? 'Accepted' : 'Pending'}
        </div>
    )
}
