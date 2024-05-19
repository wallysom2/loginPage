import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: [],
      input: {
        main: '/path/to/main.tsx',
      },
    },
  },
  plugins: [react(), eslintPlugin()],
  resolve: {},
});
