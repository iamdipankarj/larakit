@props([
    'href',
    'active' => false,
])

@php
    // Define default classes
    $defaultClasses = 'inline-flex items-center rounded-lg border border-transparent px-2 py-1 text-base transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium text-gray-700';

    // Add logic to conditionally set the "active" class
    $activeClasses = $active ? 'bg-gray-100 text-gray-900' : '';
@endphp

<a href="{{ $href }}" {{ $attributes->merge([ 'class' => $defaultClasses . ' ' . $activeClasses ]) }}>
    {{ $slot }}
</a>
