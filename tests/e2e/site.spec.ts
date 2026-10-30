import { expect, test } from '@playwright/test';

test.describe('CV page', () => {
  test('offers a CV download that actually serves a PDF', async ({ page, request }) => {
    await page.goto('/cv');

    const download_link = page.locator('a.cv_page__download_button');
    await expect(download_link).toBeVisible();

    const href = await download_link.getAttribute('href');
    expect(href).toBeTruthy();

    const response = await request.get(href ?? '');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
  });
});

test.describe('Hire me', () => {
  test('shows the availability facts and a way to book a call', async ({ page }) => {
    await page.goto('/#hire');

    const section = page.locator('#hire');
    await expect(section).toBeVisible();
    await expect(section.getByText('Available immediately', { exact: true })).toBeVisible();
    await expect(section.getByRole('link', { name: /book an intro call/i })).toHaveAttribute('href', /^(mailto:|https:)/);
  });
});

test.describe('Blog', () => {
  test('lists posts and opens one', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.locator('a.blog_page__link').first().click();

    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('returns a not-found page for an unknown post', async ({ page }) => {
    const response = await page.goto('/blog/this-post-does-not-exist');

    expect(response?.status()).toBe(404);
  });
});

test.describe('Languages', () => {
  test('serves a translated page with the right html lang', async ({ page }) => {
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  });

  test('keeps the default language unprefixed', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
