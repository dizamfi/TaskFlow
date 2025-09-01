import { Page } from '@playwright/test';

export async function createTask(page: Page, taskData: {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
}) {
  // Open task creation modal
  await page.click('[data-testid="create-task-button"]');
  
  // Fill form
  await page.fill('[data-testid="task-title-input"]', taskData.title);
  
  if (taskData.description) {
    await page.fill('[data-testid="task-description-input"]', taskData.description);
  }
  
  if (taskData.priority) {
    await page.selectOption('[data-testid="task-priority-select"]', taskData.priority);
  }
  
  if (taskData.status) {
    await page.selectOption('[data-testid="task-status-select"]', taskData.status);
  }
  
  if (taskData.dueDate) {
    await page.fill('[data-testid="task-due-date-input"]', taskData.dueDate);
  }
  
  // Submit form
  await page.click('[data-testid="task-submit-button"]');
  
  // Wait for modal to close
  await page.waitForSelector('[data-testid="task-form-modal"]', { state: 'detached' });
}

export async function deleteTask(page: Page, taskTitle: string) {
  // Find task card
  const taskCard = page.locator(`[data-testid="task-card"]:has-text("${taskTitle}")`);
  
  // Open actions menu
  await taskCard.locator('[data-testid="task-actions-button"]').click();
  
  // Click delete
  await page.click('[data-testid="task-delete-button"]');
  
  // Confirm deletion if there's a confirmation dialog
  await page.click('[data-testid="confirm-delete-button"]');
}