'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/lib/api/client';
import { type loginFormType } from '@/lib/schemas/Components/Forms/login-form.schema';
import { type FormState } from '@/lib/schemas/dto/auth/auth.dto';
import { type SignInResponse, type UserSignInInfo } from '@/lib/schemas/responses/auth.response';

/**
 * Acción de registro de usuario.
 * Llama a la API de NestJS. No inicia sesión.
 */
// export async function registerUser(
//   data: z.infer<typeof registerSchema>,
// ): Promise<FormState> {
//   
//   const validation = registerSchema.safeParse(data);
//   if (!validation.success) {
//     return { success: false, message: 'Datos de formulario inválidos.' };
//   }

//   try {
//     
//     const response = await api.post('/auth/register', validation.data);

//     
//     return { success: true, message: response.message };
//   } catch (error) {
//     console.error('[REGISTER_ACTION_ERROR]', error);
//     return { success: false, message: error.message };
//   }
// }

/**
 * Acción de inicio de sesión.
 * Llama a la API, obtiene tokens y los guarda en cookies seguras.
 */
export async function loginUser(
  data: loginFormType,
): Promise<FormState<UserSignInInfo>> {

  try {
    const response = await api.post('/auth/login', data) as SignInResponse;
    console.log('Login response:', response);
    
    (await cookies()).set('access_token', response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });
    
    (await cookies()).set('refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });

    
    return { success: true, message: 'Inicio de sesión exitoso', data: response.user };
  } catch (error) {
    console.error('[LOGIN_ACTION_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al iniciar sesión';
    return { success: false, message: errorMessage };
  }
}

/**
 * Acción de cierre de sesión.
 * Borra las cookies y redirige al login.
 */
export async function logoutUser() {
  (await cookies()).delete('access_token');
  (await cookies()).delete('refresh_token');
  redirect('/login');
}

/**
 * Obtiene la sesión del usuario actual desde el servidor.
 * Automáticamente intentará refrescar el token si está expirado.
 */
export async function getSession() {
  try {
    const user = await api.get('/users/me');
    return { user };
  } catch (error) {
    return { user: null };
  }
}