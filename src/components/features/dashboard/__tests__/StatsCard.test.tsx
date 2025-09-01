import { describe, it, expect, vi } from 'vitest';
import { StatsCard } from '../StatsCard';
import { Target } from 'lucide-react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('StatsCard Component', () => {
  const defaultProps = {
    title: 'Total Tasks',
    value: 42,
    icon: Target,
  };

  it('renders title and value correctly', () => {
    render(<StatsCard {...defaultProps} />);
    
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('shows change indicator when provided', () => {
    const props = {
      ...defaultProps,
      change: { value: 15, type: 'increase' as const },
    };
    
    render(<StatsCard {...props} />);
    expect(screen.getByText('+15%')).toBeInTheDocument();
  });

  it('shows description when provided', () => {
    const props = {
      ...defaultProps,
      description: 'Test description',
    };
    
    render(<StatsCard {...props} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('handles click events when onClick is provided', () => {
    const handleClick = vi.fn();
    const props = {
      ...defaultProps,
      onClick: handleClick,
    };
    
    render(<StatsCard {...props} />);
    
    fireEvent.click(screen.getByText('Total Tasks').closest('div')!.parentElement!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct color classes', () => {
    const props = {
      ...defaultProps,
      color: 'green' as const,
    };
    
    render(<StatsCard {...props} />);
    
    // Check for green color class
    const iconContainer = screen.getByText('Total Tasks')
      .parentElement!
      .querySelector('div[class*="bg-success-50"]');
    expect(iconContainer).toBeInTheDocument();
  });
});