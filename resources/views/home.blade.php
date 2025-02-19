<x-layout>
    <main class="flex min-h-0 flex-col flex-1">
        <section class="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white py-12 flex-grow flex items-center">
            <div class="absolute inset-x-0 top-0 h-96 rotate-180 text-gray-500/20 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,white)]">
                <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse" x="50%" y="100%" patternTransform="translate(0 -1)">
                            <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
                </svg>
            </div>
            <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-xl text-center lg:max-w-4xl">
                    <h1 class="text-5xl font-bold leading-none tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">Larakit</h1>
                    <h2 class="mt-6 text-lg font-normal leading-7 text-gray-700 sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9">Laravel 11.x Starter Kit</h2>
                </div>
                <div class="mt-8 flex gap-4 items-center justify-center">
                    <a href="/help" class="cta" role="button">Documentation</a>
                </div>
            </div>
        </section>
    </main>
</x-layout>
