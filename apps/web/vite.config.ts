import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for packages that reference it (e.g. shared monorepo packages)
    'process.env': {},
  },
})
