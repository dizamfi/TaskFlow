'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthService } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { User, LogOut, Settings } from 'lucide-react';

export function UserMenu() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await AuthService.signOut();
      addToast({
        title: 'Sesión cerrada',
        message: 'Has cerrado sesión correctamente',
        type: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Error',
        message: 'No se pudo cerrar la sesión',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
          {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block">{user.full_name || user.email}</span>
      </Button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-900">
                {user.full_name || 'Usuario'}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            
            <div className="py-2">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setIsMenuOpen(false);
                  // TODO: Navegar a perfil
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Perfil
              </button>
              
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setIsMenuOpen(false);
                  // TODO: Navegar a configuración
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </button>
            </div>
            
            <div className="border-t py-2">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-danger-600 hover:bg-gray-100"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoading ? 'Cerrando...' : 'Cerrar Sesión'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}