'use server';

import { api } from "@/lib/api/client";
import { UserSignInInfo } from "@/lib/schemas/responses/auth.response";

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
