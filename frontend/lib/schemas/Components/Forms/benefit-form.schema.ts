import { z } from "zod";

export const benefitFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  description: z.string().optional(),
  countryCode: z.string().min(1, "Debes seleccionar un país"),
  benefitTypeId: z.string().uuid("Debes seleccionar un tipo de beneficio"),
});

export type BenefitFormType = z.infer<typeof benefitFormSchema>;
