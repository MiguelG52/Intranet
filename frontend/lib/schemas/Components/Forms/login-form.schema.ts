import { z } from "zod";


export const loginFormSchema = z.object({
  email: z.email("Ingresa un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});
export type loginFormType = z.infer<typeof loginFormSchema>;

