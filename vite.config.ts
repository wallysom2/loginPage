import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: [],
    },
  },
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@images': resolve(__dirname, './src/assets/images'),
    },
  },
});
