'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, type UpdateProfileInput } from '@/lib/validations/auth';
import { AuthService } from '@/lib/supabase/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { User, Save} from 'lucide-react';

export function ProfileForm() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.full_name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    setLoading(true);
    try {
      await AuthService.updateProfile(data);
      addToast({
        title: 'Perfil actualizado',
        message: 'Los cambios se guardaron correctamente',
        type: 'success',
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      addToast({
        title: 'Error',
        message: error instanceof Error ? error.message : 'No se pudo actualizar el perfil',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
              </div>
              {/* TODO: Funcionalidad de subir avatar */}
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border"
                disabled
              >
                <User className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <Input
            {...register('fullName')}
            label="Nombre completo"
            placeholder="Tu nombre completo"
            error={errors.fullName?.message}
            disabled={loading}
          />

          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            disabled={loading}
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-1">Nota sobre el email</h4>
            <p className="text-sm text-yellow-700">
              Al cambiar tu email, recibirás un enlace de confirmación. Tu sesión se mantendrá activa.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              loading={loading}
              disabled={!isDirty}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}