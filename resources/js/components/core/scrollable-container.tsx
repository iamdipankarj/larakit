import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface ScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
    containerClass?: string
    hasVerticalScrollbar?: boolean
    hasVerticalMaxHeight?: boolean
}

export function ScrollableContainer({
    className,
    hasVerticalScrollbar = false,
    hasVerticalMaxHeight = false,
    containerClass,
    children,
    ...restProps
}: ScrollableContainerProps) {
    return (
        <div className={cn('flex', containerClass)} {...restProps}>
            <ScrollArea
                type="always"
                className={cn(
                    'w-1 flex-1',
                    {
                        'max-h-[calc(100vh-7.25rem-80px)]': hasVerticalMaxHeight
                    },
                    className
                )}
            >
                {children}
                <ScrollBar orientation="horizontal" />
                {hasVerticalScrollbar ? (
                    <ScrollBar orientation="vertical" />
                ) : null}
            </ScrollArea>
        </div>
    )
}
