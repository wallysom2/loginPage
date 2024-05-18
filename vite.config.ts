import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
  },
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
    },
  },
});
