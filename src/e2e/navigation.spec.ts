import { test, expect } from '@playwright/test';
import { signIn } from './setup/auth';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test('should navigate between main sections', async ({ page }) => {
    // Test navigation to Tasks
    await page.click('[data-testid="nav-tasks"]');
    await expect(page).toHaveURL('/tasks');
    await expect(page.locator('h1:has-text("Mis Tareas")')).toBeVisible();
    
    // Test navigation to Calendar
    await page.click('[data-testid="nav-calendar"]');
    await expect(page).toHaveURL('/calendar');
    await expect(page.locator('h1:has-text("Calendario")')).toBeVisible();
    
    // Test navigation to Reports
    await page.click('[data-testid="nav-reports"]');
    await expect(page).toHaveURL('/reports');
    await expect(page.locator('h1:has-text("Reportes")')).toBeVisible();
    
    // Test navigation to Profile
    await page.click('[data-testid="nav-profile"]');
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('h1:has-text("Configuración de Cuenta")')).toBeVisible();
    
    // Test navigation back to Dashboard
    await page.click('[data-testid="nav-dashboard"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=¡Hola')).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu should be visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Sidebar should be hidden initially
    await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    
    // Sidebar should be visible
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
    
    // Navigate to tasks
    await page.click('[data-testid="nav-tasks"]');
    await expect(page).toHaveURL('/tasks');
    
    // Sidebar should auto-close after navigation
    await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
  });
});