import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../useAuth';
import * as supabaseClient from '@/lib/supabase/client';
import { mockUser } from '@/test/fixtures/tasks';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with loading true', () => {
    const mockGetSession = vi.mocked(supabaseClient.supabase.auth.getSession);
    const mockOnAuthStateChange = vi.mocked(supabaseClient.supabase.auth.onAuthStateChange);
    
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: {
          unsubscribe: vi.fn(),
          id: '',
          callback: function (event: AuthChangeEvent, session: Session | null): void {
              throw new Error('Function not implemented.');
          }
      } }
    });

    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
  });

  it('should set user when session exists', async () => {

    
    

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      full_name: mockUser.full_name,
      created_at: mockUser.created_at,
    });
  });

  it('should handle no session', async () => {
    const mockGetSession = vi.mocked(supabaseClient.supabase.auth.getSession);
    const mockOnAuthStateChange = vi.mocked(supabaseClient.supabase.auth.onAuthStateChange);
    
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: {
          unsubscribe: vi.fn(),
          id: '',
          callback: function (event: AuthChangeEvent, session: Session | null): void {
              throw new Error('Function not implemented.');
          }
      } }
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });
});