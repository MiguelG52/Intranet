import { z } from "zod";

export const benefitTypeFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  description: z.string().optional(),
});

export type BenefitTypeFormType = z.infer<typeof benefitTypeFormSchema>;
