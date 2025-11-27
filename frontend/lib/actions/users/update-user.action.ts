'use server';

import { api } from '@/lib/api/client';
import { UpdateUserFormType } from '@/lib/schemas/Components/Forms/create-user-form.schema';
import { revalidatePath } from 'next/cache';

export async function updateUser(userId: string, data: UpdateUserFormType) {
  try {
    const payload = {
      ...data,
      password: data.password === '' ? undefined : data.password,
    };

    await api.patch(`/users/${userId}`, payload);
    revalidatePath('/admin/users');
    return { success: true, message: 'Usuario actualizado correctamente' };
  } catch (error: any) {
    console.error('Error updating user:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error al actualizar el usuario',
    };
  }
}
