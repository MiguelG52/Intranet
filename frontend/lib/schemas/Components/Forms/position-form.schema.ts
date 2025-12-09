import { z } from "zod";

export const positionFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  areaId: z.string().min(1, "Debes seleccionar un área"),
  managerId: z.string().optional(),
});

export type PositionFormType = z.infer<typeof positionFormSchema>;
