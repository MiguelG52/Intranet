/**
 * Información del usuario al iniciar sesión
 */
export interface UserSignInInfo {
  userId: string;
  email: string;
  name: string;
  lastname: string;
  role: {
    roleId: string;
    roleName: string;
  };
}

/**
 * Respuesta del servidor al iniciar sesión
 */
export interface SignInResponse {
  accessToken: string;
  user: UserSignInInfo;
  refreshToken: string;
}
