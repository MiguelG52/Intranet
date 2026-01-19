'use server';

import { api } from '@/lib/api/client';
import { Country, Role } from '@/lib/schemas/responses/users.response';
import { Area, Position } from '@/lib/schemas/types/types';


export async function getCountries(): Promise<Country[]> {
  try {
    const response = await api.get('/country');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export async function getRoles(): Promise<Role[]> {
  try {
    const response = await api.get('/role');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

export async function getAreas(): Promise<Area[]> {
  try {
    const response = await api.get('/areas/findAll');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
}

export async function getPositions(): Promise<Position[]> {
  try {
    const response = await api.get('/position');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching positions:', error);
    return [];
  }
}

export async function getPositionsByArea(areaId: string): Promise<Position[]> {
  try {
    const response = await api.get(`/position/area/${areaId}`);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error(`Error fetching positions for area ${areaId}:`, error);
    return [];
  }
}

export async function getOrgChart(): Promise<any[]> {
  try {
    return await api.get('/position/structure/org-chart');
  } catch (error) {
    console.error('Error fetching org chart:', error);
    return [];
  }
}
