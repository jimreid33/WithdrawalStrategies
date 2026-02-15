import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    tailwindcss()
  ],
  css: {
    postcss: false, // This tells Vite: "DO NOT use PostCSS at all"
  },
  base: '/',
})
