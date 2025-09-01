import { Task, TaskStatus, TaskPriority } from '@/types';

export const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  full_name: 'Usuario Test',
  created_at: '2024-01-01T00:00:00Z',
};

export const mockTask: Task = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  title: 'Tarea de prueba',
  description: 'Esta es una tarea de prueba',
  status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  user_id: mockUser.id,
  due_date: '2024-12-31T23:59:59Z',
};

export const mockTasks: Task[] = [
  mockTask,
  {
    ...mockTask,
    id: '123e4567-e89b-12d3-a456-426614174002',
    title: 'Segunda tarea',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    ...mockTask,
    id: '123e4567-e89b-12d3-a456-426614174003',
    title: 'Tercera tarea',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
    due_date: undefined,
  },
];