<footer class="py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="space-y-4">
            <div class="flex items-center justify-center">
                <a target="_blank" href="https://dipankarjana.com" class="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-1.5 text-sm font-medium leading-6 text-primary-700 transition-all duration-200 hover:border-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2" rel="noopener">
                    <x-lucide-globe class="w-4 h-4" />Visit My Website </a>
            </div>
            <p class="text-center text-xs font-medium text-gray-500">
                <!-- -->&copy; {{ date('Y') }}
                <!-- --> Dipankar Jana. - All Rights Reserved - Version - {{ $buildId }}
            </p>
            <p class="text-center text-xs font-medium text-gray-500">
                <a href="{{route('terms')}}" class="underline">Terms</a> &mdash; <a href="{{route('privacy')}}" class="underline">Privacy Policy</a>
            </p>
        </div>
    </div>
</footer>
