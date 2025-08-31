'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpInput } from '@/lib/validations/auth';
import { AuthService } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import Link from 'next/link';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true);
    
    try {
      await AuthService.signUp(data.email, data.password, data.fullName);
      addToast({
        title: 'Cuenta creada',
        message: 'Revisa tu email para verificar tu cuenta',
        type: 'success',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error al registrarse:', error);
      addToast({
        title: 'Error al crear cuenta',
        message: error instanceof Error ? error.message : 'Error desconocido',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
        <CardDescription>
          Únete a TaskFlow y organiza tus tareas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('fullName')}
            label="Nombre completo"
            placeholder="Juan Pérez"
            error={errors.fullName?.message}
            disabled={isLoading}
          />

          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            disabled={isLoading}
          />

          <Input
            {...register('password')}
            label="Contraseña"
            type="password"
            placeholder="Mínimo 8 caracteres"
            error={errors.password?.message}
            disabled={isLoading}
          />

          <Input
            {...register('confirmPassword')}
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            error={errors.confirmPassword?.message}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
          >
            Crear Cuenta
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">¿Ya tienes cuenta? </span>
            <Link
              href="/auth/signin"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}