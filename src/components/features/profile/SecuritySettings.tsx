'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { Shield, Key, AlertTriangle } from 'lucide-react';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es obligatoria'),
  newPassword: z
    .string()
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string().min(1, 'Confirma la nueva contraseña'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export function SecuritySettings() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Implementar cambio de contraseña con Supabase
      // await AuthService.changePassword(data.currentPassword, data.newPassword);
      
      // Por ahora, simular éxito
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast({
        title: 'Contraseña actualizada',
        message: 'Tu contraseña se cambió correctamente',
        type: 'success',
      });
      
      reset();
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      addToast({
        title: 'Error',
        message: 'No se pudo cambiar la contraseña. Verifica tu contraseña actual.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'Esta acción eliminará permanentemente todos tus datos. ¿Continuar?'
      );
      
      if (doubleConfirm) {
        try {
          // TODO: Implementar eliminación de cuenta
          addToast({
            title: 'Funcionalidad no implementada',
            message: 'La eliminación de cuenta estará disponible próximamente',
            type: 'warning',
          });
        } catch (error) {
          addToast({
            title: 'Error',
            message: 'No se pudo eliminar la cuenta',
            type: 'error',
          });
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Cambiar Contraseña */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Cambiar Contraseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('currentPassword')}
              label="Contraseña actual"
              type="password"
              placeholder="Tu contraseña actual"
              error={errors.currentPassword?.message}
              disabled={loading}
            />

            <Input
              {...register('newPassword')}
              label="Nueva contraseña"
              type="password"
              placeholder="Nueva contraseña (mín. 8 caracteres)"
              error={errors.newPassword?.message}
              disabled={loading}
            />

            <Input
              {...register('confirmPassword')}
              label="Confirmar nueva contraseña"
              type="password"
              placeholder="Confirma tu nueva contraseña"
              error={errors.confirmPassword?.message}
              disabled={loading}
            />

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                loading={loading}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Actualizar Contraseña
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Zona Peligrosa */}
      <Card className="border-danger-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-danger-600">
            <AlertTriangle className="h-5 w-5" />
            Zona Peligrosa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Eliminar cuenta
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten esto en cuenta.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Eliminar mi cuenta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
