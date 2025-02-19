<x-layout :title="'Changelog'">
    <main class="flex min-h-0 flex-col flex-1">
        <section class="px-4 py-8 text-center">
            <h1 class="font-semibold text-4xl">Changelog</h1>
        </section>
        <div class="w-full max-w-3xl mx-auto motion-preset-slide-up motion-duration-300">
            <x-timeline-item>
                <x-slot name="tag">v1.2</x-slot>
                <x-slot name="time">8 Jan 2025</x-slot>
                <x-slot name="header">Org management functionality and more.</x-slot>
                <x-slot name="content">
                    <ul class="list-disc pl-5">
                        <li>Added organization management module with role-based access control.</li>
                        <li>Upgraded Laravel framework from 10.x to 11.x for performance improvements and security patches.</li>
                        <li>Implemented application workflow with status tracking and approval process.</li>
                        <li>Integrated Stripe for payment processing.</li>
                        <li>Fixed bug in authentication middleware that caused session expiration issues.</li>
                    </ul>
                </x-slot>
            </x-timeline-item>
            <x-timeline-item>
                <x-slot name="tag">v1.0</x-slot>
                <x-slot name="time">30 Dec 2024</x-slot>
                <x-slot name="header">Create a basic scaffold of the app.</x-slot>
                <x-slot name="content">
                    <ul class="list-disc pl-5">
                        <li>Added public pages and user authentication.</li>
                    </ul>
                </x-slot>
            </x-timeline-item>
        </div>
    </main>
</x-layout>
