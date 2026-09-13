import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
  test('loads with header, hero, and footer visible', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('header.site_header')).toBeVisible();
    await expect(page.locator('footer.site_footer')).toBeVisible();
  });

  test('has a working skip-to-content link for keyboard users', async ({ page }) => {
    await page.goto('/');

    const skip_link = page.locator('a.skip_link');
    await expect(skip_link).toHaveAttribute('href', '#main_content');
  });

  test('navigates to the CV page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /cv/i }).first().click();

    await expect(page).toHaveURL(/\/cv/);
  });
});
