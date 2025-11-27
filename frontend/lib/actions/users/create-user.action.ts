'use server';

import { api } from '@/lib/api/client';
import { createUserFormSchema, CreateUserFormType } from '@/lib/schemas/Components/Forms/create-user-form.schema';
import { revalidatePath } from 'next/cache';

export async function createUser(data: CreateUserFormType) {
  const validation = createUserFormSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: 'Datos inválidos' };
  }

  try {
    const payload = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      roleId: data.roleId,
      countryCode: data.countryCode,
      positionId: data.positionId,
      detail: {
        phoneNumber: data.phoneNumber,
        birthdate: data.birthdate,
      }
    };

    await api.post('/auth/register', payload);
    
    revalidatePath('/admin/users');
    return { success: true, message: 'Usuario creado correctamente' };
  } catch (error: any) {
    console.error('Error creating user:', error);
    return { success: false, message: error.message || 'Error al crear usuario' };
  }
}
