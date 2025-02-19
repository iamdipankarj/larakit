import ApplicationLogo from '@/components/ApplicationLogo'
import { QuoteBox } from '@/components/core/quote-box'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="lg:container relative min-h-screen items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <ApplicationLogo />
                </div>
                <div className="relative z-20 mt-auto">
                    <QuoteBox />
                </div>
            </div>

            <div className="px-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    {children}
                </div>
            </div>
            <Toaster />
        </div>
    )
}
