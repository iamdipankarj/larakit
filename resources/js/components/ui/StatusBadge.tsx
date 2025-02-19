import { Badge, type BadgeProps } from '@/components/ui/badge'
import type { SaleStatus } from '@/types/sale'
import {
    CheckCircledIcon,
    QuestionMarkCircledIcon
} from '@radix-ui/react-icons'
import {
    Banknote,
    CircleSlash,
    HandIcon,
    TicketPlus,
    XCircle
} from 'lucide-react'

export interface FacetedLabelItem extends Record<string, any> {
    value: SaleStatus
    label: string
    color?: string
}

interface StatusBadgeProps extends BadgeProps {
    status: FacetedLabelItem
}

export const statuses: FacetedLabelItem[] = [
    {
        value: 'shipped',
        label: 'Shipped',
        icon: QuestionMarkCircledIcon
    },
    {
        value: 'ordered',
        label: 'Ordered',
        icon: TicketPlus
    },
    {
        value: 'delivered',
        label: 'Delivered',
        icon: Banknote
    }
]

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
    let color: any = 'secondary'

    if (status.value === 'ordered') {
        color = 'relax-warning'
    } else if (status.value === 'delivered') {
        color = 'relax-green'
    } else if (status.value === 'shipped') {
        color = 'relax-brown'
    }

    return (
        <Badge className={className} variant={color} {...props}>
            {status.icon && <status.icon className="mr-1 h-4 w-4" />}
            <span>{status.label}</span>
        </Badge>
    )
}
