import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,  // Ensure HMR is enabled
    watch: {
      usePolling: true,  // Optional: Enable polling if you're on a networked filesystem or using Docker
    }
  }
})
