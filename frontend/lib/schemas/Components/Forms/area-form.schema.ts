import { z } from "zod";

export const areaFormSchema = z.object({
  areaName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  countryCode: z.string().optional(),
});

export type AreaFormType = z.infer<typeof areaFormSchema>;
