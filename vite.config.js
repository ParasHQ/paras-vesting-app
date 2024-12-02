import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
})
