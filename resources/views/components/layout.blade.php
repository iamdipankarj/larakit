@props([
    'title'
])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full scroll-smooth bg-gray-50">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            if (isset($title)) {
                $pageTitle = $title . ' - ' . config('app.name', 'Laravel');
            } else {
                $pageTitle = config('app.name', 'Laravel') . ' - by Dipankar Jana';
            }
        @endphp
        <title>{{ $pageTitle }}</title>

        <meta name="description" content="Laravel 11.x Application Starter Kit by Dipankar Jana">
        <meta property="og:logo" content="{{ config("app.url") . '/logo.png' }}" />
        <meta property="og:url" content="{{ config("app.url") }}">
        <meta property="og:type" content="website">
        <meta property="og:determiner" content="the" />
        <meta property="og:title" content="{{ $pageTitle }}">
        <meta property="og:description" content="Laravel 11.x Application Starter Kit by Dipankar Jana">
        <meta property="og:image" content="{{ config("app.url") . '/image.jpg' }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image">
        <meta property="twitter:domain" content="larakit.dipankarjana.com">
        <meta property="twitter:url" content="{{ config("app.url") }}">
        <meta name="twitter:title" content="{{ $pageTitle }}">
        <meta name="twitter:description" content="Laravel 11.x Application Starter Kit by Dipankar Jana">
        <meta name="twitter:image" content="{{ config("app.url") . '/image.jpg' }}">
        <meta name="twitter:image:alt" content="Laravel 11.x Application Starter Kit by Dipankar Jana">

        <meta name="application-name" content="Larakit">

        <meta name="theme-color" content="#1c873b">

        <meta name="robots" content="index,follow">
        <meta name="googlebot" content="index,follow">

        <meta name="google" content="notranslate">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Rubik:ital,wght@0,300..900;1,300..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

        <!-- Icons -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Scripts -->
        @routes
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css'])
        @endif
    </head>
    <body class="font-sans antialiased flex flex-col min-h-screen">
        <x-header />
        {{ $slot }}
        <x-footer />
    </body>
</html>
