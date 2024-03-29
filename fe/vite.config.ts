import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },

  // @ts-expect-error: config vitest in this file as well, no need another file
  test: {
    coverage: {
      provider: 'v8', // or 'v8'
    },
  },
});
