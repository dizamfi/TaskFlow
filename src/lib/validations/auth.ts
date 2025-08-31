import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Formato de email inválido')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Formato de email inválido')
    .toLowerCase(),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Formato de email inválido')
    .toLowerCase(),
});

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios')
    .optional(),
  email: z
    .string()
    .email('Formato de email inválido')
    .toLowerCase()
    .optional(),
});

// Tipos TypeScript derivados de los schemas
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;