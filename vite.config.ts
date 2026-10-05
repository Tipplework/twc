import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Optional: Only load componentTarget in dev
// import componentTarget from 'lovable-targets';

export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    react(),
    // ...(mode === 'development' && componentTarget ? [componentTarget()] : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three';
          if (id.includes('gsap')) return 'gsap';
        },
      },
    },
  },
}));
