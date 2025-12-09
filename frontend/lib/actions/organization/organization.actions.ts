'use server';

import { api } from "@/lib/api/client";
import { AreaFormType } from "@/lib/schemas/Components/Forms/area-form.schema";
import { PositionFormType } from "@/lib/schemas/Components/Forms/position-form.schema";
import { revalidatePath } from "next/cache";

// --- AREAS ---

export async function createArea(data: AreaFormType) {
  try {
    await api.post('/areas', data);
    revalidatePath('/admin/organization');
    return { success: true, message: 'Área creada correctamente' };
  } catch (error: any) {
    console.error('Error creating area:', error);
    return { success: false, message: error.message || 'Error al crear el área' };
  }
}

export async function updateArea(id: string, data: Partial<AreaFormType>) {
  try {
    await api.patch(`/areas/${id}`, data);
    revalidatePath('/admin/organization');
    return { success: true, message: 'Área actualizada correctamente' };
  } catch (error: any) {
    console.error('Error updating area:', error);
    return { success: false, message: error.message || 'Error al actualizar el área' };
  }
}

export async function deleteArea(id: string) {
  try {
    await api.delete(`/areas/${id}`);
    revalidatePath('/admin/organization');
    return { success: true, message: 'Área eliminada correctamente' };
  } catch (error: any) {
    console.error('Error deleting area:', error);
    return { success: false, message: error.message || 'Error al eliminar el área' };
  }
}

// --- POSITIONS ---

export async function createPosition(data: PositionFormType) {
  try {
    await api.post('/position', data);
    revalidatePath('/admin/organization');
    return { success: true, message: 'Puesto creado correctamente' };
  } catch (error: any) {
    console.error('Error creating position:', error);
    return { success: false, message: error.message || 'Error al crear el puesto' };
  }
}

export async function updatePosition(id: string, data: Partial<PositionFormType>) {
  try {
    await api.patch(`/position/${id}`, data);
    revalidatePath('/admin/organization');
    return { success: true, message: 'Puesto actualizado correctamente' };
  } catch (error: any) {
    console.error('Error updating position:', error);
    return { success: false, message: error.message || 'Error al actualizar el puesto' };
  }
}

export async function deletePosition(id: string) {
  try {
    await api.delete(`/position/${id}`);
    revalidatePath('/admin/organization');
    return { success: true, message: 'Puesto eliminado correctamente' };
  } catch (error: any) {
    console.error('Error deleting position:', error);
    return { success: false, message: error.message || 'Error al eliminar el puesto' };
  }
}
