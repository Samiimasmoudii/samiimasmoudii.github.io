import { test, expect } from '@playwright/test';

test('hero renders without console errors and canvas is present', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/');
  await expect(page.locator('#hero-canvas')).toBeVisible();
  await expect(page.locator('h1')).toHaveAttribute('aria-label', 'Sami Masmoudi');

  // Let the point cloud spin up and settle.
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'tests/__artifacts__/hero.png' });

  expect(errors, errors.join('\n')).toEqual([]);
});

test('capture full-page desktop + mobile screenshots', async ({ browser }) => {
  for (const [name, viewport] of [
    ['desktop', { width: 1280, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ] as const) {
    const ctx = await browser.newContext({ baseURL: 'http://localhost:4321', viewport });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `tests/__artifacts__/full-${name}.png`, fullPage: true });
    await ctx.close();
  }
});

test('reduced-motion loads cleanly', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/');
  await expect(page.locator('h1')).toHaveAttribute('aria-label', 'Sami Masmoudi');
  await page.waitForTimeout(500);

  expect(errors, errors.join('\n')).toEqual([]);
  await ctx.close();
});
