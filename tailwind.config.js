import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Quicksand', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                primaryLite: '#117631',
                indigo: '#0574E3',
                indigo2: '#0086F7',
                indigoLite: '#E2F2FF',
                indigoText: '#BADEFF',
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                listItem: '#F0F4F5',
                black: '#212121',
                gray700: '#616161',
                gray800: '#f1f4f5',
                greenLite: '#C9E3CA',
                greenLite2: '#E6F4E9',
                greenLite3: '#C2E4C8',
                darkYellow: '#E88C00',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',

                // Dashboard colors
                clearBlue: '#2279F7',
                seaweed: '#47B474',
                greyishTeal: '#719C9A',
                lightPink: '#FBEEE4',

                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                'relax-brown': {
                    DEFAULT: 'hsl(var(--relax-brown))',
                    foreground: 'hsl(var(--relax-brown-foreground))'
                },
                'relax-warning': {
                    DEFAULT: 'hsl(var(--relax-warning))',
                    foreground: 'hsl(var(--relax-warning-foreground))'
                },
                'relax-blue': {
                    DEFAULT: 'hsl(var(--relax-blue))',
                    foreground: 'hsl(var(--relax-blue-foreground))'
                },
                'relax-green': {
                    DEFAULT: 'hsl(var(--relax-green))',
                    foreground: 'hsl(var(--relax-green-foreground))'
                },
                'relax-red': {
                    DEFAULT: 'hsl(var(--relax-red))',
                    foreground: 'hsl(var(--relax-red-foreground))'
                },
                'relax-sky': {
                    DEFAULT: 'hsl(var(--relax-sky))',
                    foreground: 'hsl(var(--relax-sky-foreground))'
                },
                'relax-yellow': {
                    DEFAULT: 'hsl(var(--relax-yellow))',
                    foreground: 'hsl(var(--relax-yellow-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground':
                        'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground':
                        'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },
            backgroundImage: {
                'conic-gradient':
                    'linear-gradient(90deg, #44FF9A -.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)',
                'super-gradient':
                    'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)'
            },
            backgroundSize: {
                super: '400% 400%',
                '300%': '300%'
            },
            animation: {
                'move-super': 'move 15s ease infinite',
                gradient: 'animatedGradient 4s ease infinite alternate'
            },
            keyframes: {
                move: {
                    '0%': {
                        'background-position': '0% 50%'
                    },
                    '50%': {
                        'background-position': '100% 50%'
                    },
                    '100%': {
                        'background-position': '0% 50%'
                    }
                },
                animatedGradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },

    plugins: [
        forms,
        require('tailwindcss-animate'),
        require('tailwindcss-motion'),
        require('@tailwindcss/typography')
    ]
}
