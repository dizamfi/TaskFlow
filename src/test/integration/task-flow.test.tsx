import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '@/components/features/tasks/TaskForm';
import { TaskList } from '@/components/features/tasks/TaskList';
import { TaskFilters } from '@/components/features/tasks/TaskFilters';
import { mockTasks } from '@/test/fixtures/tasks';
import { TaskStatus, TaskPriority } from '@/types';

// Mock del hook useTasks
const mockUseTasks = {
  tasks: mockTasks,
  loading: false,
  filters: {},
  actions: {
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    applyFilters: vi.fn(),
    clearFilters: vi.fn(),
  },
};

vi.mock('@/hooks/useTasks', () => ({
  useTasks: () => mockUseTasks,
}));

describe('Task Management Flow Integration', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnStatusChange = vi.fn();
  const mockOnFiltersChange = vi.fn();
  const mockOnClear = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Task Creation Flow', () => {
    it('should create a new task with all fields', async () => {
      const user = userEvent.setup();
      
      render(
        <TaskForm 
          onSubmit={mockOnSubmit} 
          onCancel={mockOnCancel} 
        />
      );

      // Fill form fields
      await user.type(screen.getByLabelText(/título/i), 'Nueva tarea importante');
      await user.type(screen.getByLabelText(/descripción/i), 'Descripción detallada de la tarea');
      
      // Select priority
      await user.selectOptions(screen.getByLabelText(/prioridad/i), TaskPriority.HIGH);
      
      // Select status
      await user.selectOptions(screen.getByLabelText(/estado/i), TaskStatus.IN_PROGRESS);
      
      // Set due date
      await user.type(screen.getByLabelText(/fecha de vencimiento/i), '2024-12-31T23:59');

      // Submit form
      await user.click(screen.getByRole('button', { name: /crear tarea/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Nueva tarea importante',
          description: 'Descripción detallada de la tarea',
          status: TaskStatus.IN_PROGRESS,
          priority: TaskPriority.HIGH,
          due_date: expect.stringContaining('2024-12-31'),
        });
      });
    });

    it('should show validation errors for invalid input', async () => {
      const user = userEvent.setup();
      
      render(
        <TaskForm 
          onSubmit={mockOnSubmit} 
          onCancel={mockOnCancel} 
        />
      );

      // Try to submit without title
      await user.click(screen.getByRole('button', { name: /crear tarea/i }));

      await waitFor(() => {
        expect(screen.getByText(/el título es obligatorio/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Task Editing Flow', () => {
    it('should edit an existing task', async () => {
      const user = userEvent.setup();
      const taskToEdit = mockTasks[0];
      
      render(
        <TaskForm 
          task={taskToEdit}
          onSubmit={mockOnSubmit} 
          onCancel={mockOnCancel} 
        />
      );

      // Verify form is pre-filled
      expect(screen.getByDisplayValue(taskToEdit.title)).toBeInTheDocument();
      expect(screen.getByDisplayValue(taskToEdit.description!)).toBeInTheDocument();

      // Update title
      const titleInput = screen.getByLabelText(/título/i);
      await user.clear(titleInput);
      await user.type(titleInput, 'Título actualizado');

      // Submit form
      await user.click(screen.getByRole('button', { name: /actualizar tarea/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Título actualizado',
          })
        );
      });
    });
  });

  describe('Task List Operations', () => {
    it('should display all tasks', () => {
      render(
        <TaskList
          tasks={mockTasks}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onStatusChange={mockOnStatusChange}
        />
      );

      mockTasks.forEach(task => {
        expect(screen.getByText(task.title)).toBeInTheDocument();
      });
    });

    it('should handle task actions', async () => {
      const user = userEvent.setup();
      
      render(
        <TaskList
          tasks={[mockTasks[0]]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onStatusChange={mockOnStatusChange}
        />
      );

      // Click on more actions
      const moreButton = screen.getByRole('button', { name: /more/i });
      await user.click(moreButton);

      // Click edit
      await user.click(screen.getByText('Editar'));
      expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
    });

    it('should toggle task status', async () => {
      const user = userEvent.setup();
      
      render(
        <TaskList
          tasks={[mockTasks[0]]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onStatusChange={mockOnStatusChange}
        />
      );

      // Click status toggle button
      const statusButton = screen.getByRole('button', { name: /circle/i });
      await user.click(statusButton);

      expect(mockOnStatusChange).toHaveBeenCalledWith(
        mockTasks[0].id,
        TaskStatus.COMPLETED
      );
    });
  });

  describe('Task Filtering Flow', () => {
    const mockTaskCounts = {
      total: 10,
      pending: 4,
      inProgress: 3,
      completed: 3,
    };

    it('should apply status filters', async () => {
      const user = userEvent.setup();
      
      render(
        <TaskFilters
          filters={{}}
          onFiltersChange={mockOnFiltersChange}
          onClear={mockOnClear}
          taskCounts={mockTaskCounts}
        />
      );

      // Click on "Pendientes" filter
      await user.click(screen.getByText('Pendientes'));

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        status: TaskStatus.PENDING,
      });
    });

    it('should handle search input', async () => {
      const user = userEvent.setup();
      
      render(
        <TaskFilters
          filters={{}}
          onFiltersChange={mockOnFiltersChange}
          onClear={mockOnClear}
          taskCounts={mockTaskCounts}
        />
      );

      const searchInput = screen.getByPlaceholderText(/buscar tareas/i);
      await user.type(searchInput, 'importante');

      // Simulate debounced search
      await waitFor(() => {
        expect(mockOnFiltersChange).toHaveBeenCalledWith({
          search: 'importante',
        });
      }, { timeout: 1000 });
    });

});})
