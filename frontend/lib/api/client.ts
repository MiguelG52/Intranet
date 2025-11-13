import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Endpoints públicos que no requieren autenticación
 * y no deben intentar refrescar tokens en caso de 401
 */
const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
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
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }


  const res = await fetch(url, {
    ...options,
    headers: defaultHeaders,
    cache: 'no-store', 
  });

  console.log('API Request:', res.url, res.status);


  if (!res.ok) {
    const refreshToken = (await cookies()).get('refresh_token')?.value;
    const shouldRefresh = res.status === 401 && !isRetry && !isPublicEndpoint(endpoint) && refreshToken;

    if (shouldRefresh) {
      try {
        // Intenta obtener un nuevo token
        const newAccessToken = await getNewAccessToken();
        
        // Si lo logramos, guardamos el nuevo token en las cookies
        (await cookies()).set('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        });

        // Reintentamos la petición original, ahora con el nuevo token
        return request(endpoint, options, true); 
      } catch (refreshError) {
        // Si el refresco falla, borramos las cookies y forzamos el logout
        console.error('Fallo al refrescar el token.', refreshError);
        (await cookies()).delete('access_token');
        (await cookies()).delete('refresh_token');
        throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
      }
    }

    const errorData = await res.json();
    throw new Error(errorData.message || 'Error en la petición a la API');
  }

  if (res.status === 204) {
    return null;
  }
  return res.json();
}

/**
 * Pide un nuevo access token.
 */
async function getNewAccessToken(): Promise<string> {
  const refreshToken = (await cookies()).get('refresh_token')?.value;
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible.');
  }

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error('No se pudo refrescar el token.');
  }

  const data = await res.json();
  return data.accessToken;
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