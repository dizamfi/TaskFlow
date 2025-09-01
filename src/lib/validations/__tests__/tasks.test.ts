import { describe, it, expect } from 'vitest';
import { createTaskSchema, updateTaskSchema } from '../tasks';
import { TaskStatus, TaskPriority } from '@/types';

describe('Task Validations', () => {
  describe('createTaskSchema', () => {
    it('should validate a valid task', () => {
      const validTask = {
        title: 'Test Task',
        description: 'Test description',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        due_date: '2024-12-31T23:59:59Z',
      };

      const result = createTaskSchema.safeParse(validTask);
      expect(result.success).toBe(true);
    });

    it('should require title', () => {
      const invalidTask = {
        description: 'Test description',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
      };

      const result = createTaskSchema.safeParse(invalidTask);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error?.issues[0]!.path).toContain('title');
      }
    });

    it('should validate title length', () => {
      const longTitle = 'a'.repeat(256);
      const invalidTask = {
        title: longTitle,
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
      };

      const result = createTaskSchema.safeParse(invalidTask);
      expect(result.success).toBe(false);
    });

    it('should accept empty due_date', () => {
      const validTask = {
        title: 'Test Task',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        due_date: '',
      };

      const result = createTaskSchema.safeParse(validTask);
      expect(result.success).toBe(true);
    });

    it('should validate enum values', () => {
      const invalidTask = {
        title: 'Test Task',
        status: 'invalid_status',
        priority: 'invalid_priority',
      };

      const result = createTaskSchema.safeParse(invalidTask);
      expect(result.success).toBe(false);
    });
  });

  describe('updateTaskSchema', () => {
    it('should validate partial updates', () => {
      const partialUpdate = {
        title: 'Updated title',
      };

      const result = updateTaskSchema.safeParse(partialUpdate);
      expect(result.success).toBe(true);
    });

    it('should allow empty object', () => {
      const result = updateTaskSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});