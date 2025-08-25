<x-layout>
    <main class="flex min-h-0 flex-col flex-1">
        <section class="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white py-12 flex-grow flex flex-col items-center">
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
            <div class="container relative">
                <div class="grid grid-cols-1">
                    <div class="text-center">
                        <h1 class="capitalize mt-6 mx-auto max-w-[650px] text-[34px] leading-10 md:text-[52px] md:leading-tight font-semibold tracking-[1px]">Larakit</h1>
                        <p class="mt-6 mx-auto max-w-[480px] mb-4">A Laravel 11.x Starter Kit</p>
                        <div class="mt-12">
                            <a href="https://github.com/iamdipankarj/larakit" target="_blank" rel="nofollow" class="cta inline-flex items-center gap-1.5"><x-lucide-github class="w-4 h-4" /> View on Github</a>
                        </div>
                    </div>
                    <div class="max-w-4xl top-[60px] relative mx-auto z-20">
                        <img src="/sales.svg" alt="home side images" class="mx-auto block">
                    </div>
                </div>
            </div>
        </section>
    </main>
</x-layout>
