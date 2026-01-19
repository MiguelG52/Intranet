'use server';

import { api } from "@/lib/api/client";
import { UserSignInInfo } from "@/lib/schemas/responses/auth.response";
import { UserProfile } from "@/lib/schemas/responses/users.response";

/**
 * Obtiene la lista de usuarios con paginación y búsqueda.
 */
export async function getUsers(params: { page?: number; limit?: number; search?: string }): Promise<{ data: UserProfile[], meta: any }> {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const search = params.search || '';

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    queryParams.append('search', search);
  }

  try {
    const response = await api.get(`/users/find-all?${queryParams.toString()}`);
    return response;
  } catch (error) {
    console.error('[GET_USERS_ERROR]', error);
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        lastPage: 1,
      }
    };
  }
}

/**
 * Obtiene la información del usuario actual.
 */
export async function getSession(): Promise<UserSignInInfo | null> {
    try {
    const user: UserSignInInfo = await api.get(`/auth/me`);
    return user;

  } catch (error) {
    console.error('[GET_SESSION_ERROR]', error);
    return null;
  }
}
