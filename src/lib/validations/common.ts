import { z } from 'zod';

// Validaciones comunes reutilizables
export const commonValidations = {
  // Validación de UUID
  uuid: z.string().uuid('ID inválido'),
  
  // Validación de texto no vacío
  nonEmptyString: z.string().min(1, 'Este campo es obligatorio').trim(),
  
  // Validación de número positivo
  positiveNumber: z.number().positive('Debe ser un número positivo'),
  
  // Validación de URL
  url: z.string().url('URL inválida'),
  
  // Validación de teléfono (formato internacional)
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Formato de teléfono inválido'
    )
    .optional(),
  
  // Validación de archivo de imagen
  imageFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'El archivo debe ser menor a 5MB'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Solo se permiten archivos JPG, PNG o WebP'
    ),
  
  // Validación de contraseña fuerte
  strongPassword: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo'),
};

// Utilidades de validación
export class ValidationUtils {
  // Validar múltiples schemas
  static validateMultiple<T extends Record<string, z.ZodSchema>>(
    schemas: T,
    data: Record<string, unknown>
  ): { [K in keyof T]: z.infer<T[K]> } {
    const results = {} as { [K in keyof T]: z.infer<T[K]> };
    const errors: string[] = [];

    for (const [key, schema] of Object.entries(schemas)) {
      try {
        results[key as keyof T] = schema.parse(data[key]) as z.infer<T[typeof key]>;
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors.push(`${key}: ${error.issues[0]?.message}`);
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(`Errores de validación: ${errors.join(', ')}`);
    }

    return results;
  }

  // Formatear errores de Zod para mostrar al usuario
  static formatZodError(error: z.ZodError): Record<string, string> {
    const formattedErrors: Record<string, string> = {};
    
    error.issues.forEach((err) => {
      const path = err.path.join('.');
      formattedErrors[path] = err.message;
    });

    return formattedErrors;
  }

  // Validar y parsear datos de forma segura
  static safeValidate<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: Record<string, string>;
  } {
    try {
      const validatedData = schema.parse(data);
      return { success: true, data: validatedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: ValidationUtils.formatZodError(error),
        };
      }
      return {
        success: false,
        errors: { general: 'Error de validación desconocido' },
      };
    }
  }
}