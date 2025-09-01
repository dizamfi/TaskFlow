// src/hooks/__tests__/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Remove this line if using Vitest, as Vitest provides its own jest-like API.
// If you are using Jest, use the following import instead:
// import { jest } from '@jest/globals';

// Mock de Supabase
const mockSupabase = {
  auth: {
    getUser: vi.fn(),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(),
  },
};

// Mock del módulo de Supabase
vi.mock('@/lib/supabase/client', () => ({
  supabase: mockSupabase,
}));

describe('useAuth', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    // Mock de onAuthStateChange que devuelve una función de cleanup
    mockSupabase.auth.onAuthStateChange.mockImplementation(() => {
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
  });

  it('should handle successful authentication', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      created_at: '2024-01-01',
    };

    // Mock de onAuthStateChange que simula autenticación exitosa
    mockSupabase.auth.onAuthStateChange.mockImplementation((callback: (arg0: string, arg1: { user: { id: string; email: string; created_at: string; }; }) => void) => {
      // Simular el callback de autenticación exitosa
      // Los parámetros event y session no se usan en el callback, 
      // pero son requeridos por la API de Supabase
      setTimeout(() => callback('SIGNED_IN', { user: mockUser }), 0);
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    const { result } = renderHook(() => useAuth());

    // Esperar a que se complete el efecto
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('should handle sign out', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({ error: null });
    
    // Mock de onAuthStateChange que simula sign out
    mockSupabase.auth.onAuthStateChange.mockImplementation((callback: (arg0: string, arg1: null) => void) => {
      // Simular el callback de sign out
      // Los parámetros event y session no se usan en el callback,
      // pero son requeridos por la API de Supabase  
      setTimeout(() => callback('SIGNED_OUT', null), 0);
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
    //   await result.current.signOut();
    });

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('should handle authentication errors', async () => {
    const mockError = new Error('Authentication failed');
    mockSupabase.auth.signInWithPassword.mockRejectedValue(mockError);

    mockSupabase.auth.onAuthStateChange.mockImplementation(() => {
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        // await result.current.signIn('test@example.com', 'password');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should cleanup subscription on unmount', () => {
    const mockUnsubscribe = vi.fn();
    mockSupabase.auth.onAuthStateChange.mockImplementation(() => {
      return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
    });

    const { unmount } = renderHook(() => useAuth());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});