import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    fastRefresh: false // Disable fast refresh to fix RefreshRuntime error
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    force: true,
    include: ['@supabase/supabase-js']
  },
  server: {
    port: 5173,
    host: true
  }
})