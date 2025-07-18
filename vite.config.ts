/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setupTests.ts',
    include: ['./src/__test__', 'src/**/*.test.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'text-summary'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{js,ts,tsx}'],
      exclude: [
        './src/__test__',
        'src/**/*.test.{js,ts,tsx}',
        'node_modules',
        'dist',
      ],
    },
    watch: false,
    reporters: ['default'],
    maxConcurrency: 5,
    testTimeout: 10000,
    mockReset: true,
  },
});
