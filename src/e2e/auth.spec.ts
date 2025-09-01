import { test, expect } from '@playwright/test';
import { signIn, signUp, signOut } from './setup/auth';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies();
    await page.context().clearPermissions();
  });

  test('should sign in successfully', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check initial state
    await expect(page.locator('[data-testid="signin-form"]')).toBeVisible();
    
    // Fill form
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'testpassword123');
    
    // Submit
    await page.click('[data-testid="signin-button"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/');
    
    // Should show user menu
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    
    // Should show welcome message
    await expect(page.locator('text=¡Hola')).toBeVisible();
  });

  test('should show validation errors for invalid credentials', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Try with invalid email
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.fill('[data-testid="password-input"]', 'password');
    await page.click('[data-testid="signin-button"]');
    
    // Should show validation error
    await expect(page.locator('text=Formato de email inválido')).toBeVisible();
  });

  test('should register new user successfully', async ({ page }) => {
    const userData = {
      email: `test-${Date.now()}@example.com`,
      password: 'TestPassword123!',
      fullName: 'Test User E2E',
    };
    
    await signUp(page, userData);
    
    // Should show success message
    await expect(page.locator('text=Cuenta creada')).toBeVisible();
    
    // Should show email verification message
    await expect(page.locator('text=Revisa tu email')).toBeVisible();
  });

  test('should navigate between auth pages', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Go to sign up
    await page.click('text=Regístrate');
    await expect(page).toHaveURL('/auth/signup');
    
    // Go back to sign in
    await page.click('text=Inicia sesión');
    await expect(page).toHaveURL('/auth/signin');
    
    // Go to reset password
    await page.click('text=¿Olvidaste tu contraseña?');
    await expect(page).toHaveURL('/auth/reset-password');
  });

  test('should handle sign out', async ({ page }) => {
    await signIn(page);
    await signOut(page);
    
    // Should redirect to sign in page
    await expect(page).toHaveURL('/auth/signin');
  });
});