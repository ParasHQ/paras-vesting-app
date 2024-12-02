import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: './',
  plugins: [nodePolyfills(), react()],
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
