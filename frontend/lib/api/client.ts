import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Endpoints públicos que no requieren autenticación
 * y no deben intentar refrescar tokens en caso de 401
 */
const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/reset-password',
];

/**
 * Verifica si un endpoint es público
 */
function isPublicEndpoint(endpoint: string): boolean {
  return PUBLIC_ENDPOINTS.some(publicPath => endpoint.startsWith(publicPath));
}

/**
 * Función central de peticiones.
 * Maneja automáticamente la inyección del token y el refresco.
 */
async function request(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false, 
) {
  const url = `${API_URL}${endpoint}`;
  
  const accessToken = (await cookies()).get('access_token')?.value;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.DEV_API_KEY || '',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken && !defaultHeaders['Authorization']) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  let res;
  if(options.method !== 'GET'){
     res = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers: defaultHeaders,
  });
  }else{
    res = await fetch(url, {
    cache: 'force-cache',
    ...options,
    headers: defaultHeaders,
  });
  }

  console.log('API Request:', res.url, res.status);


  if (!res.ok) {
    const refreshToken = (await cookies()).get('refresh_token')?.value;
    const shouldRefresh = res.status === 401 && !isRetry && !isPublicEndpoint(endpoint) && refreshToken;

    if (shouldRefresh) {
      try {
        // Intenta obtener un nuevo token (y refresh token si hubo rotación)
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await getNewAccessToken();
        
        // Si lo logramos, guardamos el nuevo token en las cookies
        try {
          const cookieStore = await cookies();
          
          cookieStore.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
          });

          // Si el backend devolvió un nuevo refresh token, lo actualizamos también
          if (newRefreshToken) {
            cookieStore.set('refresh_token', newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              path: '/',
            });
          }
        } catch (error) {
          // Ignoramos el error si estamos en un Server Component (no se pueden modificar cookies)
        }

        // Reintentamos la petición original, ahora con el nuevo token
        return request(endpoint, {
          ...options,
          headers: {
            ...(options.headers as Record<string, string>),
            Authorization: `Bearer ${newAccessToken}`,
          },
        }, true); 
      } catch (refreshError) {
        // Si el refresco falla, borramos las cookies y forzamos el logout
        console.error('Fallo al refrescar el token.', refreshError);
        try {
          (await cookies()).delete('access_token');
          (await cookies()).delete('refresh_token');
        } catch (error) {
          // Ignoramos el error si estamos en un Server Component
        }
        // Redirigir al usuario al login en lugar de lanzar error
        redirect('/auth/login');
      }
    }

    // Si es 401 y no se pudo refrescar (por falta de token o endpoint publico mal configurado)
    if (res.status === 401) {
        redirect('/auth/login');
    }

    const errorData = await res.json().catch(() => null);
    const errorMessage = Array.isArray(errorData?.message) 
      ? errorData.message.join(', ') 
      : errorData?.message || `Error ${res.status}: ${res.statusText}`;
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return null;
  }
  return res.json();
}

/**
 * Pide un nuevo access token.
 */
async function getNewAccessToken(): Promise<{ accessToken: string; refreshToken?: string }> {
  const refreshToken = (await cookies()).get('refresh_token')?.value;
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible.');
  }

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'x-api-key': process.env.NEXT_PUBLIC_DEV_API_KEY || ''
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error('No se pudo refrescar el token.');
  }

  const data = await res.json();
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
}

export const api = {
  get: (endpoint: string, options: RequestInit = {}) =>
    request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, body: unknown, options: RequestInit = {}) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: (endpoint: string, body: unknown, options: RequestInit = {}) =>
    request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: (endpoint: string, options: RequestInit = {}) =>
    request(endpoint, { ...options, method: 'DELETE' }),
};