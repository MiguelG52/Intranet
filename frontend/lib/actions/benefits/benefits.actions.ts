'use server';

import { api } from "@/lib/api/client";
import { BenefitFormType } from "@/lib/schemas/Components/Forms/benefit-form.schema";
import { BenefitTypeFormType } from "@/lib/schemas/Components/Forms/benefit-type-form.schema";
import { Benefit, BenefitType } from "@/lib/schemas/types/types";
import { revalidatePath } from "next/cache";

// --- BENEFIT TYPES ---

export async function getBenefitTypes(): Promise<BenefitType[]> {
  try {
    const response = await api.get('/benefits/types-find-all');
    console.log(response)
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching benefit types:', error);
    return [];
  }
}

export async function createBenefitType(prevState: any, data: BenefitTypeFormType) {
  try {
    const result = await api.post('/benefits/types', data);
    console.log(result)
    revalidatePath('/admin/benefits/types');
    return { success: true, message: 'Tipo de beneficio creado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error creating benefit type:', error);
    return { success: false, message: error.message || 'Error al crear el tipo de beneficio', timestamp: Date.now() };
  }
}

export async function updateBenefitType(id: string, prevState: any, data: Partial<BenefitTypeFormType>) {
  try {
    await api.patch(`/benefits/types/${id}`, data);
    revalidatePath('/admin/benefits/types');
    return { success: true, message: 'Tipo de beneficio actualizado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error updating benefit type:', error);
    return { success: false, message: error.message || 'Error al actualizar el tipo de beneficio', timestamp: Date.now() };
  }
}

export async function deleteBenefitType(id: string) {
  try {
    await api.delete(`/benefits/types/${id}`);
    revalidatePath('/admin/benefits/types');
    return { success: true, message: 'Tipo de beneficio eliminado correctamente' };
  } catch (error: any) {
    console.error('Error deleting benefit type:', error);
    return { success: false, message: error.message || 'Error al eliminar el tipo de beneficio' };
  }
}

// --- BENEFITS ---

export async function getBenefits(): Promise<Benefit[]> {
  try {
    const response = await api.get('/benefits/find-all');
    // The backend returns { data: [], meta: ... } or just [] depending on implementation
    // Based on benefits.service.ts, it returns { data, meta }
    return (response as any).data || [];
  } catch (error) {
    console.error('Error fetching benefits:', error);
    return [];
  }
}

export async function createBenefit(prevState: any, data: BenefitFormType) {
  try {
    await api.post('/benefits', data);
    revalidatePath('/admin/benefits/list');
    return { success: true, message: 'Beneficio creado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error creating benefit:', error);
    return { success: false, message: error.message || 'Error al crear el beneficio', timestamp: Date.now() };
  }
}

export async function updateBenefit(id: string, prevState: any, data: Partial<BenefitFormType>) {
  try {
    await api.patch(`/benefits/${id}`, data);
    revalidatePath('/admin/benefits/list');
    return { success: true, message: 'Beneficio actualizado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error updating benefit:', error);
    return { success: false, message: error.message || 'Error al actualizar el beneficio', timestamp: Date.now() };
  }
}

export async function deleteBenefit(id: string) {
  try {
    await api.delete(`/benefits/${id}`);
    revalidatePath('/admin/benefits/list');
    return { success: true, message: 'Beneficio eliminado correctamente' };
  } catch (error: any) {
    console.error('Error deleting benefit:', error);
    return { success: false, message: error.message || 'Error al eliminar el beneficio' };
  }
}
