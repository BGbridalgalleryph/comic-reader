import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '', 
  root: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "@context": resolve(__dirname, './src/context/'),
    },
  },
})
