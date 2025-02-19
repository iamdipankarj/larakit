import '../css/app.css'
import './bootstrap'

import { ThemeProvider } from '@/components/theme-provider'
import { createInertiaApp } from '@inertiajs/react'
import { Provider as JotaiProvider } from 'jotai'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(
            <JotaiProvider>
                <ThemeProvider defaultTheme="light" storageKey="larakit_theme">
                    <App {...props} />
                </ThemeProvider>
            </JotaiProvider>
        )
    },
    progress: {
        color: '#4B5563',
        showSpinner: true
    }
})
