import { z } from "zod"

const baseUserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastname: z.string().min(1, "El apellido es obligatorio"),
  email: z.email("Correo electrónico inválido"),
  roleId: z.string().uuid("Selecciona un rol válido"),
  countryCode: z.string().min(1, "Selecciona un país"),
  areaId: z.string().optional(),
  positionId: z.string().uuid("Selecciona un puesto"),
  phoneNumber: z.string().optional(),
  birthdate: z.string().optional(),
})

export const createUserFormSchema = baseUserSchema
export const updateUserFormSchema = baseUserSchema

export type CreateUserFormType = z.infer<typeof createUserFormSchema>
export type UpdateUserFormType = z.infer<typeof updateUserFormSchema>
