import { test, expect } from '@playwright/test';
import { signIn } from './setup/auth';

test.describe('Calendar', () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test('should display calendar view', async ({ page }) => {
    await page.click('[data-testid="nav-calendar"]');
    
    // Should show current month and year
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    await expect(page.locator(`text=${currentYear}`)).toBeVisible();
    
    // Should show day headers
    await expect(page.locator('text=Dom')).toBeVisible();
    await expect(page.locator('text=Lun')).toBeVisible();
    await expect(page.locator('text=Mar')).toBeVisible();
  });

  test('should create task from calendar date', async ({ page }) => {
    await page.click('[data-testid="nav-calendar"]');
    
    // Click on a date (day 15)
    await page.click('[data-testid="calendar-day-15"]');
    
    // Task form should open with pre-selected date
    await expect(page.locator('[data-testid="task-form-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="task-due-date-input"]')).toHaveValue('2024-12-15');
  });
});