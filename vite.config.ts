import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@models', replacement: path.resolve(__dirname, './src/models') },
      { find: '@screens', replacement: path.resolve(__dirname, './src/screens') },
      { find: '@context', replacement: path.resolve(__dirname, './src/context') },
      { find: '@layouts', replacement: path.resolve(__dirname, './src/router/layouts') },
    ],
  },
});
