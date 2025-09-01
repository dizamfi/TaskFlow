import { test, expect } from '@playwright/test';
import { signIn } from './setup/auth';
import { createTask, deleteTask } from './setup/tasks';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test('should create a new task', async ({ page }) => {
    const taskData = {
      title: 'E2E Test Task',
      description: 'This is a test task created by E2E tests',
      priority: 'high' as const,
      dueDate: '2024-12-31T23:59',
    };
    
    await createTask(page, taskData);
    
    // Should show success toast
    await expect(page.locator('text=Tarea creada')).toBeVisible();
    
    // Task should appear in the list
    await expect(page.locator(`text=${taskData.title}`)).toBeVisible();
    await expect(page.locator(`text=${taskData.description}`)).toBeVisible();
  });

  test('should edit an existing task', async ({ page }) => {
    // First create a task
    await createTask(page, { title: 'Task to Edit' });
    
    // Find and edit the task
    const taskCard = page.locator('[data-testid="task-card"]:has-text("Task to Edit")');
    await taskCard.locator('[data-testid="task-actions-button"]').click();
    await page.click('[data-testid="task-edit-button"]');
    
    // Update title
    await page.fill('[data-testid="task-title-input"]', 'Edited Task Title');
    await page.click('[data-testid="task-submit-button"]');
    
    // Should show success message
    await expect(page.locator('text=Tarea actualizada')).toBeVisible();
    
    // Should show updated title
    await expect(page.locator('text=Edited Task Title')).toBeVisible();
  });

  test('should delete a task', async ({ page }) => {
    // Create a task to delete
    await createTask(page, { title: 'Task to Delete' });
    
    // Delete the task
    await deleteTask(page, 'Task to Delete');
    
    // Should show success message
    await expect(page.locator('text=Tarea eliminada')).toBeVisible();
    
    // Task should no longer be visible
    await expect(page.locator('text=Task to Delete')).not.toBeVisible();
  });

  test('should filter tasks', async ({ page }) => {
    // Create tasks with different statuses
    await createTask(page, { title: 'Pending Task', status: 'pending' });
    await createTask(page, { title: 'Completed Task', status: 'completed' });
    
    // Navigate to tasks page
    await page.click('[data-testid="nav-tasks"]');
    
    // Filter by pending
    await page.click('[data-testid="filter-pending"]');
    
    // Should show pending task
    await expect(page.locator('text=Pending Task')).toBeVisible();
    
    // Should not show completed task
    await expect(page.locator('text=Completed Task')).not.toBeVisible();
    
    // Filter by completed
    await page.click('[data-testid="filter-completed"]');
    
    // Should show completed task
    await expect(page.locator('text=Completed Task')).toBeVisible();
    
    // Should not show pending task
    await expect(page.locator('text=Pending Task')).not.toBeVisible();
  });

  test('should search for tasks', async ({ page }) => {
    // Create tasks
    await createTask(page, { title: 'Important Meeting' });
    await createTask(page, { title: 'Buy Groceries' });
    
    // Navigate to tasks page
    await page.click('[data-testid="nav-tasks"]');
    
    // Search for "meeting"
    await page.fill('[data-testid="search-input"]', 'meeting');
    
    // Should show matching task
    await expect(page.locator('text=Important Meeting')).toBeVisible();
    
    // Should not show non-matching task
    await expect(page.locator('text=Buy Groceries')).not.toBeVisible();
  });

  test('should toggle task completion', async ({ page }) => {
    // Create a pending task
    await createTask(page, { title: 'Task to Complete', status: 'pending' });
    
    // Find task and click completion toggle
    const taskCard = page.locator('[data-testid="task-card"]:has-text("Task to Complete")');
    await taskCard.locator('[data-testid="task-status-toggle"]').click();
    
    // Task should show as completed (with strikethrough)
    const taskTitle = taskCard.locator('[data-testid="task-title"]');
    await expect(taskTitle).toHaveClass(/line-through/);
    
    // Should show completed badge
    await expect(taskCard.locator('text=Completada')).toBeVisible();
  });
});