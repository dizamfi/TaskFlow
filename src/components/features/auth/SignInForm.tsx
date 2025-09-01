// 'use client';

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signInSchema, type SignInInput } from '@/lib/validations/auth';
// import { AuthService } from '@/lib/supabase/auth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/components/ui/toast';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import Link from 'next/link';

// interface SignInFormProps {
//   onSuccess?: () => void;
// }

// export function SignInForm({ onSuccess }: SignInFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { addToast } = useToast();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInInput>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: 'demo@taskflow.com',
//       password: 'Demo123!'
//     }
//   });

//   // const onSubmit = async (data: SignInInput) => {
//   //   setIsLoading(true);
    
//   //   try {
//   //     await AuthService.signIn(data.email, data.password);
//   //     addToast({
//   //       title: 'Bienvenido',
//   //       message: 'Has iniciado sesión correctamente',
//   //       type: 'success',
//   //     });
//   //     onSuccess?.();
//   //   } catch (error) {
//   //     console.error('Error al iniciar sesión:', error);
//   //     addToast({
//   //       title: 'Error al iniciar sesión',
//   //       message: error instanceof Error ? error.message : 'Credenciales inválidas',
//   //       type: 'error',
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };


//   const onSubmit = async (data: SignInInput) => {
//   setIsLoading(true);
  
//   try {
//     const result = await AuthService.signIn(data.email, data.password);
    
//     if (result.user) {
//       addToast({
//         title: 'Bienvenido',
//         message: 'Has iniciado sesión correctamente',
//         type: 'success',
//       });
      
//       // El hook useAuth detectará automáticamente el cambio
//       // y la navegación se manejará en el componente padre
//       onSuccess?.();
//     }
//   } catch (error) {
//     console.error('Error al iniciar sesión:', error);
//     addToast({
//       title: 'Error al iniciar sesión',
//       message: error instanceof Error ? error.message : 'Credenciales inválidas',
//       type: 'error',
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
//       <CardHeader className="text-center space-y-4">
//         <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
//           <Lock className="h-8 w-8 text-white" />
//         </div>
//         <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//           Iniciar Sesión
//         </CardTitle>
//         <CardDescription className="text-base text-slate-600">
//           Ingresa tus credenciales para acceder a TaskFlow
//         </CardDescription>
//       </CardHeader>
      
//       <CardContent className="space-y-6">
//         <div className="space-y-5">
//           <Input
//             {...register('email')}
//             label="Email"
//             type="email"
//             placeholder="tu@email.com"
//             // icon={<Mail className="h-5 w-5" />}
//             error={errors.email?.message}
//             disabled={isLoading}
//             className="h-12"
//           />

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-slate-700">
//               Contraseña
//             </label>
//             <div className="relative">
//               <Input
//                 {...register('password')}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Tu contraseña"
//                 // icon={<Lock className="h-5 w-5" />}
//                 error={errors.password?.message}
//                 disabled={isLoading}
//                 className="h-12 pr-12"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-4 text-slate-400 hover:text-slate-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <label className="flex items-center text-sm text-slate-600">
//             <input 
//               type="checkbox" 
//               className="rounded border-slate-300 text-blue-600 mr-2" 
//             />
//             Recordarme
//           </label>
//           <Link
//             href="/auth/reset-password"
//             className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
//           >
//             ¿Olvidaste tu contraseña?
//           </Link>
//         </div>

//         <Button
//           onClick={handleSubmit(onSubmit)}
//           className="w-full h-12 text-base"
//           loading={isLoading}
//           disabled={isLoading}
//         >
//           Iniciar Sesión
//         </Button>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-slate-200"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-4 bg-white text-slate-500">¿No tienes cuenta?</span>
//           </div>
//         </div>

//         <Link
//           href="/auth/signup"
//           className="block w-full"
//         >
//           <Button
//             variant="outline"
//             className="w-full h-12 text-base border-2"
//           >
//             Crear cuenta nueva
//           </Button>
//         </Link>

//         {/* Credenciales de demo */}
//         <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center gap-2 text-blue-700 mb-2">
//             <Lock className="h-4 w-4" />
//             <span className="text-sm font-semibold">Credenciales de Demo</span>
//           </div>
//           <div className="text-sm text-blue-600 space-y-1">
//             <p><strong>Email:</strong> demo@taskflow.com</p>
//             <p><strong>Contraseña:</strong> Demo123!</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }






"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";
import { AuthService } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });



const onSubmit = async (data: SignInInput) => {
  setIsLoading(true);
  
  try {
    const result = await AuthService.signIn(data.email, data.password);
    
    if (result.user) {
      addToast({
        title: 'Bienvenido',
        message: 'Has iniciado sesión correctamente',
        type: 'success',
      });
      
      // Redirigir al dashboard principal (página raíz que ya tienes configurada)
      setTimeout(() => {
        router.push('/');
      }, 100);
      
      onSuccess?.();
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    
    let errorMessage = 'Credenciales inválidas';
    if (error instanceof Error) {
      if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Por favor confirma tu email antes de iniciar sesión';
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email o contraseña incorrectos';
      } else {
        errorMessage = error.message;
      }
    }
    
    addToast({
      title: 'Error al iniciar sesión',
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
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-base text-slate-600">
          Ingresa tus credenciales para acceder a TaskFlow
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            {...register("email")}
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
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
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
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-slate-600">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 mr-2"
              />
              Recordarme
            </label>
            <Link
              href="/auth/reset-password"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            loading={isLoading}
            disabled={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">
              ¿No tienes cuenta?
            </span>
          </div>
        </div>

        <Link href="/auth/signup" className="block w-full">
          <Button
            variant="outline"
            className="w-full h-12 text-base border-2"
            disabled={isLoading}
          >
            Crear cuenta nueva
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
