import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
});
