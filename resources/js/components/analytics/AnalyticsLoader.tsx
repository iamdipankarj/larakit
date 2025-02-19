import { metricsLoadingAtom } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { useAtom } from 'jotai/index'
import { Loader2 } from 'lucide-react'

export function AnalyticsLoader() {
    const [loading] = useAtom(metricsLoadingAtom)

    return (
        <Transition show={loading}>
            <div
                className={cn(
                    'size-full rounded-xl shadow-lg transition duration-400',
                    'data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0',
                    'data-[leave]:duration-200 data-[leave]:ease-in-out',
                    'data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]'
                )}
            >
                <Loader2 className="w-4 h-4 text-emerald-700 dark:text-primary animate-spin" />
            </div>
        </Transition>
    )
}
