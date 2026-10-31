import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/cv', '/blog', '/projects', '/proof', '/cases/one-shared-system-for-10-modules'];
const themes = ['light', 'dark', 'blue', 'gray'];

for (const theme of themes) {
  for (const path of pages) {
    test(`${path} has no WCAG A/AA violations (${theme} theme)`, async ({ page }) => {
      // Reduced motion shows scroll-reveal elements right away, so axe doesn't
      // measure contrast on half-transparent content.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((name) => window.localStorage.setItem('zs_theme', name), theme);
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const summary = results.violations.flatMap((violation) => violation.nodes.map((node) => `${violation.id}: ${node.target.join(' ')} (${node.any[0]?.message ?? node.failureSummary})`));

      expect(summary).toEqual([]);
    });
  }
}
