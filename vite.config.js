import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    server: {
        port: 5174
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true
        }),
        react(),
        tsconfigPaths()
    ]
})
