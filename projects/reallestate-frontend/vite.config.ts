import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite Configuration
export default defineConfig({
  plugins: [
    react(), // React plugin to handle JSX/TSX files
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for easy imports from the src folder
    },
  },
  define: {
    'process.env': {}, // Prevents "process is not defined" issues for frontend
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'crypto', 'stream'], // Polyfills for Node.js dependencies
  },
  build: {
    target: 'esnext', // Optimize build for the latest ECMAScript version
    sourcemap: true, // Generate sourcemaps for easier debugging
  },
  server: {
    port: 5173, // Vite's dev server port
    open: true, // Open the browser automatically when the server starts
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the path to match backend endpoints
      },
    },
  },
});
