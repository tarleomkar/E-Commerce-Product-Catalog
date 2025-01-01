import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // This ensures relative paths for assets
  build: {
    rollupOptions: {
      // Remove the `external` field for @reduxjs/toolkit
      // external: ['@reduxjs/toolkit'],
    },
  },
});
