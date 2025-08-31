'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { SignInForm } from './SignInForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  showLogin?: boolean;
}

export function ProtectedRoute({ children, showLogin = true }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user && showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskFlow</h1>
            <p className="text-gray-600">Sistema de gestión de tareas</p>
          </div>
          <SignInForm />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}