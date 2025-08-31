'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInInput } from '@/lib/validations/auth';
import { AuthService } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import Link from 'next/link';

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    setIsLoading(true);
    
    try {
      await AuthService.signIn(data.email, data.password);
      addToast({
        title: 'Bienvenido',
        message: 'Has iniciado sesión correctamente',
        type: 'success',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      addToast({
        title: 'Error al iniciar sesión',
        message: error instanceof Error ? error.message : 'Credenciales inválidas',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a TaskFlow
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('password')}
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            error={errors.password?.message}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
          >
            Iniciar Sesión
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <Link
              href="/auth/signup"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Regístrate
            </Link>
          </div>

          <div className="text-center text-sm">
            <Link
              href="/auth/reset-password"
              className="text-gray-600 hover:text-gray-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}