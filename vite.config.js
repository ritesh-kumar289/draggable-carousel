import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/draggable-carousel/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
