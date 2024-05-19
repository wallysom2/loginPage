import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { resolve } from 'path'
import { copyFileSync } from 'fs'

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
    {
      name: 'copy-redirects',
      buildEnd() {
        copyFileSync(resolve(__dirname, 'public/_redirects'), resolve(__dirname, 'dist/_redirects'))
      }
    }
  ],
});