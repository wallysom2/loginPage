import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: []
    },
  },
  plugins: [
    react(), eslintPlugin (),
    ],
});