import { cn } from '@/lib/utils'
import { CircleDollarSign } from 'lucide-react'
import type React from 'react'

interface ApplicationLogoProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: 'dark' | 'light'
}

export default function ApplicationLogo({
    className,
    variant,
    ...restProps
}: ApplicationLogoProps) {
    return (
        <a
            href="/"
            title="Larakit"
            className={cn('flex gap-1 items-center', className)}
            {...restProps}
        >
            <img
                src="/larakit.svg"
                className="w-8 h-8 shrink-0"
                alt="Larakit"
            />
            <div className="flex gap-1">
                <span className="font-semibold inline-flex text-2xl">
                    Larakit
                </span>
                <div className="inline-flex relative">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute left-0 bottom-2" />
                </div>
            </div>
        </a>
    )
}
