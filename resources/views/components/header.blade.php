<header class="sticky inset-x-0 top-0 z-20">
{{--    <div class="absolute inset-0 opacity-20 blur bg-conic-gradient"></div>--}}
    <div class="absolute inset-0 opacity-30 blur bg-super-gradient bg-super animate-move-super"></div>
    <div class="relative bg-white/95 py-4 backdrop-blur-lg">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between">
                <div class="relative z-10 shrink-0">
                    <x-logo />
                </div>
                <div class="hidden lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:gap-2">
                    <x-nav-link href="{{ route('about', absolute: false) }}" :active="request()->is('about')">
                        About
                    </x-nav-link>
                    <x-nav-link href="{{ route('help', absolute: false) }}" :active="request()->is('help')">
                        Help
                    </x-nav-link>
                    <x-nav-link href="{{ route('changelog', absolute: false) }}" :active="request()->is('changelog')">
                        Changelog
                    </x-nav-link>
                </div>
                <div class="relative z-10 flex items-center gap-x-3">
                    @if (auth()->check())
                        <a href="{{ route("dashboard") }}" class="cta">Dashboard</a>
                    @else
                        <a href="{{ route("login") }}" class="cta-outlined">Login</a>
                        <a href="{{ route("register") }}" class="cta">Register</a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</header>
