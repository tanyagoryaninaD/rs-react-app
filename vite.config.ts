import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { coverageConfigDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setupTests.ts',
    include: ['./src/__test__', 'src/**/*.test.{js,ts,tsx}'],
    exclude: [...coverageConfigDefaults.exclude, '**/node_modules/**'],
    coverage: {
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
    watch: false,
    reporters: ['default'],
    maxConcurrency: 5,
    testTimeout: 10000,
    mockReset: true,
  },
});
