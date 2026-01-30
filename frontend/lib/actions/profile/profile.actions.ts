'use server'
import { api } from "@/lib/api/client";
import { UserProfile } from "@/lib/schemas/responses/users.response";

export async function getUserProfile() {
  try {
    // El endpoint /auth/me ya retorna el perfil completo del usuario basado en el token
    const userProfile: UserProfile = await api.get('/auth/me'); 
    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
