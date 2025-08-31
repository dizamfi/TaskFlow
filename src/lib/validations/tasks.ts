import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@/types';

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(255, 'El título no puede exceder 255 caracteres')
    .trim(),
  description: z
    .string()
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  due_date: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => {
      if (!val || val.trim() === '') return undefined;
      return val;
    }),
});


export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(255, 'El título no puede exceder 255 caracteres')
    .trim()
    .optional(),
  description: z
    .string()
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .trim()
    .optional(),
  status: z
    .nativeEnum(TaskStatus)
    .optional(),
  priority: z
    .nativeEnum(TaskPriority)
    .optional()
    .or(z.literal('')),
});

export const taskFilterSchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  search: z.string().max(100).trim().optional(),
  sortBy: z.enum(['created_at', 'due_date', 'title']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const taskIdSchema = z.object({
  id: z.string().uuid('ID de tarea inválido'),
});

// Validaciones para fechas
export const dateValidations = {
  // Validar que la fecha de vencimiento no sea en el pasado
  futureDateOnly: z
    .string()
    .datetime()
    .refine(
      (date) => new Date(date) > new Date(),
      'La fecha de vencimiento debe ser futura'
    ),
  
  // Validar rango de fechas razonable (máximo 1 año)
  reasonableFutureDate: z
    .string()
    .datetime()
    .refine(
      (date) => {
        const inputDate = new Date(date);
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return inputDate <= oneYearFromNow;
      },
      'La fecha no puede ser más de un año en el futuro'
    ),
};

// Schema combinado para crear tarea con validaciones estrictas
export const createTaskStrictSchema = createTaskSchema.extend({
  due_date: z
    .string()
    .datetime()
    .refine(
      (date) => new Date(date) > new Date(),
      'La fecha de vencimiento debe ser futura'
    )
    .optional()
    .or(z.literal('')),
});

// Tipos TypeScript derivados
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskFilterInput = z.infer<typeof taskFilterSchema>;
export type TaskIdInput = z.infer<typeof taskIdSchema>;