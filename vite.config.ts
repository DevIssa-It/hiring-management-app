import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    fastRefresh: true // Enable fast refresh for better DX
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    force: true,
    include: ['@supabase/supabase-js', 'react', 'react-dom', 'react-router-dom']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'utils': ['date-fns']
        }
      }
    },
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    minify: 'esbuild', // Use esbuild for faster minification (default in Vite)
  },
  server: {
    port: 5173,
    host: true,
    open: true // Auto-open browser on server start
  }
})