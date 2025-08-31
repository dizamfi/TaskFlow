'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth';
import { AuthService } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import Link from 'next/link';

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    
    try {
      await AuthService.resetPassword(data.email);
      setIsSuccess(true);
      addToast({
        title: 'Email enviado',
        message: 'Revisa tu correo para restablecer tu contraseña',
        type: 'success',
      });
    } catch (error) {
      console.error('Error al enviar email:', error);
      addToast({
        title: 'Error',
        message: 'No se pudo enviar el email de recuperación',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-success-600">¡Email Enviado!</CardTitle>
          <CardDescription>
            Revisa tu correo electrónico y sigue las instrucciones para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Restablecer Contraseña</CardTitle>
        <CardDescription>
          Ingresa tu email para recibir instrucciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
          >
            Enviar Instrucciones
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-gray-800"
            >
              ← Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}