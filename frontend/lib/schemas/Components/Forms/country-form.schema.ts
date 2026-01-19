import { z } from "zod"

export const countryFormSchema = z.object({
  code: z.string()
    .min(1, "El código es obligatorio")
    .max(10, "El código no puede tener más de 10 caracteres")
    .regex(/^[A-Z]+$/, "El código debe ser mayúsculas"),
  name: z.string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  phoneCountryCode: z.string()
    .max(5, "El código telefónico no puede tener más de 5 caracteres")
    .optional(),
})

export type CountryFormType = z.infer<typeof countryFormSchema>
