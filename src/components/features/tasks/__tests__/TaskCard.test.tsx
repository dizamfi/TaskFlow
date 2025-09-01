import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '../TaskCard';
import { mockTask } from '@/test/fixtures/tasks';
import { TaskStatus } from '@/types';

describe('TaskCard Component', () => {
  const defaultProps = {
    task: mockTask,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onStatusChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task information', () => {
    render(<TaskCard {...defaultProps} />);
    
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('Esta es una tarea de prueba')).toBeInTheDocument();
  });

  it('shows correct status badge', () => {
    render(<TaskCard {...defaultProps} />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('shows priority badge', () => {
    render(<TaskCard {...defaultProps} />);
    expect(screen.getByText('Media')).toBeInTheDocument();
  });

  it('handles status toggle', () => {
    render(<TaskCard {...defaultProps} />);
    
    const statusButton = screen.getByRole('button', { name: /circle/i });
    fireEvent.click(statusButton);
    
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith(
      mockTask.id, 
      TaskStatus.COMPLETED
    );
  });

  it('shows action menu on button click', () => {
    render(<TaskCard {...defaultProps} />);
    
    const moreButton = screen.getByRole('button', { name: /more/i });
    fireEvent.click(moreButton);
    
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });

  it('calls onEdit when edit is clicked', () => {
    render(<TaskCard {...defaultProps} />);
    
    const moreButton = screen.getByRole('button', { name: /more/i });
    fireEvent.click(moreButton);
    
    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete is clicked', () => {
    render(<TaskCard {...defaultProps} />);
    
    const moreButton = screen.getByRole('button', { name: /more/i });
    fireEvent.click(moreButton);
    
    const deleteButton = screen.getByText('Eliminar');
    fireEvent.click(deleteButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('shows due date when present', () => {
    render(<TaskCard {...defaultProps} />);
    expect(screen.getByText(/31\/12\/2024/)).toBeInTheDocument();
  });

  it('shows overdue indicator for past due dates', () => {
    const overdueTask = {
      ...mockTask,
      due_date: '2020-01-01T00:00:00Z', // Past date
    };
    
    render(<TaskCard {...defaultProps} task={overdueTask} />);
    expect(screen.getByText(/Vencida/)).toBeInTheDocument();
  });

  it('applies completed styling for completed tasks', () => {
    const completedTask = {
      ...mockTask,
      status: TaskStatus.COMPLETED,
    };
    
    render(<TaskCard {...defaultProps} task={completedTask} />);
    
    const title = screen.getByText('Tarea de prueba');
    expect(title).toHaveClass('line-through');
  });
});