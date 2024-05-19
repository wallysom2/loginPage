import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: [],
      input: {
        main: 'src/main.tsx',
      },
    },
  },
  plugins: [react(), eslintPlugin()],
});