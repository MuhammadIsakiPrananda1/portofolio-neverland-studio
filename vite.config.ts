import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip for broad compatibility
    compression({ algorithms: ['gzip'], exclude: [/\.(png|webp|jpg|jpeg|gif|svg|ico|woff2?)$/] }),
    // Brotli for modern browsers (better compression ratio)
    compression({ algorithms: ['brotliCompress'], exclude: [/\.(png|webp|jpg|jpeg|gif|svg|ico|woff2?)$/] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    allowedHosts: ['portfolio.neverlandstudio.my.id'],
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_INTERNAL || process.env.VITE_API_URL || 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    reportCompressedSize: false, // speeds up build
    modulePreload: { polyfill: false }, // skip polyfill (~1.6KB saved, modern browsers don't need it)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('react-router-dom')) return 'router';
          if (id.includes('react')) return 'react-vendor';

          if (id.includes('framer-motion')) return 'animation';

          if (id.includes('lucide-react')) return 'icons';

          if (id.includes('axios')) return 'http';
          if (id.includes('pusher-js') || id.includes('laravel-echo')) return 'realtime';
          if (id.includes('xterm')) return 'terminal';
          if (id.includes('dompurify')) return 'security';

          // Group remaining node_modules
          return 'vendor';
        },
      },
    },
  },
})
