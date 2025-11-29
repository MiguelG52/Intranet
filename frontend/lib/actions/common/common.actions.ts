'use server';

import { api } from '@/lib/api/client';
import { Country, Role } from '@/lib/schemas/responses/users.response';
import { Area, Position } from '@/lib/schemas/types/types';


export async function getCountries(): Promise<Country[]> {
  try {
    return await api.get('/country');
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export async function getRoles(): Promise<Role[]> {
  try {
    return await api.get('/role');
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

export async function getAreas(): Promise<Area[]> {
  try {
    return await api.get('/areas/findAll');
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
}

export async function getPositions(): Promise<Position[]> {
  try {
    return await api.get('/position');
  } catch (error) {
    console.error('Error fetching positions:', error);
    return [];
  }
}

export async function getPositionsByArea(areaId: string): Promise<Position[]> {
  try {
    return await api.get(`/position/area/${areaId}`);
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
