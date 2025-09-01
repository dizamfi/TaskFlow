import { Page } from '@playwright/test';

export async function signIn(page: Page, email: string = 'test@example.com', password: string = 'testpassword123') {
  await page.goto('/auth/signin');
  await page.fill('[data-testid="email-input"]', email);
  await page.fill('[data-testid="password-input"]', password);
  await page.click('[data-testid="signin-button"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL('/');
  
  // Wait for user data to load
  await page.waitForSelector('[data-testid="user-menu"]');
}

export async function signUp(page: Page, userData: {
  email: string;
  password: string;
  fullName: string;
}) {
  await page.goto('/auth/signup');
  await page.fill('[data-testid="fullname-input"]', userData.fullName);
  await page.fill('[data-testid="email-input"]', userData.email);
  await page.fill('[data-testid="password-input"]', userData.password);
  await page.fill('[data-testid="confirm-password-input"]', userData.password);
  await page.click('[data-testid="signup-button"]');
}

export async function signOut(page: Page) {
  await page.click('[data-testid="user-menu"]');
  await page.click('[data-testid="signout-button"]');
  await page.waitForURL('/auth/signin');
}