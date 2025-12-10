'use server';

import { api } from "@/lib/api/client";
import { Country } from "@/lib/schemas/responses/country.response";
import { CountryFormType } from "@/lib/schemas/Components/Forms/country-form.schema";
import { revalidatePath } from "next/cache";

export async function getCountries(): Promise<Country[]> {
  try {
    const response = await api.get('/country');
    return response as Country[];
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export async function createCountry(prevState: any, data: CountryFormType) {
  try {
    const res = await api.post('/country/register', data);
    console.log(res)
    revalidatePath('/admin/organization/countries');
    return { success: true, message: 'País creado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error creating country:', error);
    return { success: false, message: error.message || 'Error al crear el país', timestamp: Date.now() };
  }
}

export async function updateCountry(code: string, prevState: any, data: Partial<CountryFormType>) {
  try {
    const res =await api.patch(`/country/${code}`, data);
    console.log(res)
    revalidatePath('/admin/organization/countries');
    return { success: true, message: 'País actualizado correctamente', timestamp: Date.now() };
  } catch (error: any) {
    console.error('Error updating country:', error);
    return { success: false, message: error.message || 'Error al actualizar el país', timestamp: Date.now() };
  }
}

export async function deleteCountry(code: string) {
  try {
    await api.delete(`/country/${code}`);
    revalidatePath('/admin/organization/countries');
    return { success: true, message: 'País eliminado correctamente' };
  } catch (error: any) {
    console.error('Error deleting country:', error);
    return { success: false, message: error.message || 'Error al eliminar el país' };
  }
}
