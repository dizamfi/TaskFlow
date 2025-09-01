// 'use client';

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signUpSchema, type SignUpInput } from '@/lib/validations/auth';
// import { AuthService } from '@/lib/supabase/auth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/components/ui/toast';
// import Link from 'next/link';

// interface SignUpFormProps {
//   onSuccess?: () => void;
// }

// export function SignUpForm({ onSuccess }: SignUpFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const { addToast } = useToast();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpInput>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = async (data: SignUpInput) => {
//     setIsLoading(true);
    
//     try {
//       await AuthService.signUp(data.email, data.password, data.fullName);
//       addToast({
//         title: 'Cuenta creada',
//         message: 'Revisa tu email para verificar tu cuenta',
//         type: 'success',
//       });
//       onSuccess?.();
//     } catch (error) {
//       console.error('Error al registrarse:', error);
//       addToast({
//         title: 'Error al crear cuenta',
//         message: error instanceof Error ? error.message : 'Error desconocido',
//         type: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
//         <CardDescription>
//           Únete a TaskFlow y organiza tus tareas
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input
//             {...register('fullName')}
//             label="Nombre completo"
//             placeholder="Juan Pérez"
//             error={errors.fullName?.message}
//             disabled={isLoading}
//           />

//           <Input
//             {...register('email')}
//             label="Email"
//             type="email"
//             placeholder="tu@email.com"
//             error={errors.email?.message}
//             disabled={isLoading}
//           />

//           <Input
//             {...register('password')}
//             label="Contraseña"
//             type="password"
//             placeholder="Mínimo 8 caracteres"
//             error={errors.password?.message}
//             disabled={isLoading}
//           />

//           <Input
//             {...register('confirmPassword')}
//             label="Confirmar contraseña"
//             type="password"
//             placeholder="Repite tu contraseña"
//             error={errors.confirmPassword?.message}
//             disabled={isLoading}
//           />

//           <Button
//             type="submit"
//             className="w-full"
//             loading={isLoading}
//           >
//             Crear Cuenta
//           </Button>

//           <div className="text-center text-sm">
//             <span className="text-gray-600">¿Ya tienes cuenta? </span>
//             <Link
//               href="/auth/signin"
//               className="text-primary-600 hover:text-primary-800 font-medium"
//             >
//               Inicia sesión
//             </Link>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }




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
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password');

  // const onSubmit = async (data: SignUpInput) => {
  //   setIsLoading(true);
    
  //   try {
  //     await AuthService.signUp(data.email, data.password, data.fullName);
  //     addToast({
  //       title: 'Cuenta creada',
  //       message: 'Revisa tu email para verificar tu cuenta',
  //       type: 'success',
  //     });
  //     onSuccess?.();
  //   } catch (error) {
  //     console.error('Error al registrarse:', error);
  //     addToast({
  //       title: 'Error al crear cuenta',
  //       message: error instanceof Error ? error.message : 'Error desconocido',
  //       type: 'error',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const onSubmit = async (data: SignUpInput) => {
  setIsLoading(true);
  
  try {
    const result = await AuthService.signUp(data.email, data.password, data.fullName);
    
    if (result.user) {
      if (result.user.email_confirmed_at) {
        // Usuario confirmado inmediatamente
        addToast({
          title: 'Cuenta creada',
          message: 'Tu cuenta ha sido creada exitosamente',
          type: 'success',
        });
      } else {
        // Usuario necesita confirmar email
        addToast({
          title: 'Cuenta creada',
          message: 'Revisa tu email para verificar tu cuenta antes de iniciar sesión',
          type: 'success',
        });
      }
      
      onSuccess?.();
    }
  } catch (error) {
    console.error('Error al registrarse:', error);
    
    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      if (error.message.includes('already registered')) {
        errorMessage = 'Este email ya está registrado';
      } else if (error.message.includes('Password should be')) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Email inválido';
      } else {
        errorMessage = error.message;
      }
    }
    
    addToast({
      title: 'Error al crear cuenta',
      message: errorMessage,
      type: 'error',
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <User className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-base text-slate-600">
          Únete a TaskFlow y organiza tus tareas
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-5">
          <Input
            {...register('fullName')}
            label="Nombre completo"
            placeholder="Juan Pérez"
            icon={<User className="h-5 w-5" />}
            error={errors.fullName?.message}
            disabled={isLoading}
            className="h-12"
          />

          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="tu@email.com"
            icon={<Mail className="h-5 w-5" />}
            error={errors.email?.message}
            disabled={isLoading}
            className="h-12"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres, mayús, minus y número"
                icon={<Lock className="h-5 w-5" />}
                error={errors.password?.message}
                disabled={isLoading}
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repite tu contraseña"
                icon={<Lock className="h-5 w-5" />}
                error={errors.confirmPassword?.message}
                disabled={isLoading}
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Indicador de fuerza de contraseña */}
        {password && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Fuerza de contraseña</span>
              <span className={`font-medium ${
                password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
                  ? 'text-green-600' : 'text-orange-600'
              }`}>
                {password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
                  ? 'Fuerte' : 'Débil'}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
                    ? 'bg-green-500 w-full' : 'bg-orange-500 w-1/2'
                }`}
              />
            </div>
          </div>
        )}

        <div className="flex items-center text-sm text-slate-600">
          <input 
            type="checkbox" 
            className="rounded border-slate-300 text-green-600 mr-3" 
            required
          />
          <span>
            Acepto los{' '}
            <button className="text-blue-600 hover:text-blue-800 underline">
              términos y condiciones
            </button>
          </span>
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full h-12 text-base"
          loading={isLoading}
          disabled={isLoading}
        >
          Crear Cuenta
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">¿Ya tienes cuenta?</span>
          </div>
        </div>

        <Link
          href="/auth/signin"
          className="block w-full"
        >
          <Button
            variant="outline"
            className="w-full h-12 text-base border-2"
          >
            Iniciar sesión
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}