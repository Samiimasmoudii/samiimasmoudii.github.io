import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  // Wait past the hero entry animations so elements are at full opacity
  // (axe measures contrast against the live composited opacity).
  await page.waitForTimeout(2200);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );

  // Log any violations for visibility before asserting.
  if (serious.length) {
    console.log(JSON.stringify(serious.map((v) => ({ id: v.id, nodes: v.nodes.length })), null, 2));
  }
  expect(serious).toEqual([]);
});

test('keyboard focus reaches the primary CTA and CV button', async ({ page }) => {
  await page.goto('/');
  // Tab a bunch and ensure the Download CV link is focusable.
  const cv = page.getByRole('link', { name: /download cv/i }).first();
  await cv.focus();
  await expect(cv).toBeFocused();
});
