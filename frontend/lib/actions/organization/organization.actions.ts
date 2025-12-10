'use server';

import { api } from "@/lib/api/client";
import { AreaFormType } from "@/lib/schemas/Components/Forms/area-form.schema";
import { PositionFormType } from "@/lib/schemas/Components/Forms/position-form.schema";
import { revalidatePath } from "next/cache";

// --- AREAS ---

export async function createArea(prevState: any, data: AreaFormType) {
  try {
    await api.post('/areas', data);
    revalidatePath('/admin/organization/areas');
    return { success: true, message: 'Área creada correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error creating area:', error);
    return { success: false, message: error.message || 'Error al crear el área', timestamp: Date.now() };
  }
}

export async function updateArea(id: string, prevState: any, data: Partial<AreaFormType>) {
  try {
    await api.patch(`/areas/${id}`, data);
    revalidatePath('/admin/organization/areas');
    return { success: true, message: 'Área actualizada correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error updating area:', error);
    return { success: false, message: error.message || 'Error al actualizar el área', timestamp: Date.now() };
  }
}

export async function deleteArea(id: string) {
  try {
    await api.delete(`/areas/${id}`);
    revalidatePath('/admin/organization/areas');
    return { success: true, message: 'Área eliminada correctamente' };
  } catch (error: any) {
    console.error('Error deleting area:', error);
    return { success: false, message: error.message || 'Error al eliminar el área' };
  }
}

// --- POSITIONS ---

export async function createPosition(prevState: any, data: PositionFormType) {
  try {
    await api.post('/position/register', data);
    revalidatePath('/admin/organization/positions');
    return { success: true, message: 'Puesto creado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error creating position:', error);
    return { success: false, message: error.message || 'Error al crear el puesto', timestamp: Date.now() };
  }
}

export async function updatePosition(id: string, prevState: any, data: Partial<PositionFormType>) {
  try {
    await api.patch(`/position/${id}`, data);
    revalidatePath('/admin/organization/positions');
    return { success: true, message: 'Puesto actualizado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error updating position:', error);
    return { success: false, message: error.message || 'Error al actualizar el puesto', timestamp: Date.now() };
  }
}

export async function deletePosition(id: string) {
  try {
    await api.delete(`/position/${id}`);
    revalidatePath('/admin/organization/positions');
    return { success: true, message: 'Puesto eliminado correctamente' };
  } catch (error: any) {
    console.error('Error deleting position:', error);
    return { success: false, message: error.message || 'Error al eliminar el puesto' };
  }
}
