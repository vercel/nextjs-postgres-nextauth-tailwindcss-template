import { defineConfig, devices } from '@playwright/test';
import { loadEnvConfig } from '@next/env';

// Load .env files the same way `next dev` does, so the tests can read
// MOCKATOO_TEST_EMAIL and MOCKATOO_TEST_PASSWORD from .env.local.
loadEnvConfig(process.cwd());

const port = process.env.PORT ?? '3000';

export default defineConfig({
  testDir: './e2e',
  // `next dev` compiles each route the first time it is requested.
  timeout: 90_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // The dev server signs in with Mockatoo; a production build uses GitHub.
  webServer: {
    command: 'pnpm dev',
    url: `http://localhost:${port}/login`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
