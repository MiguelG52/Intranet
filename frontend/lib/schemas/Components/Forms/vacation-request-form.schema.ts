import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export const vacationRequestFormSchema = z.object({
  startDate: z.string().min(1, { message: "La fecha de inicio es requerida" }),
  endDate: z.string().min(1, { message: "La fecha de fin es requerida" }),
  absenceType: z.enum(["vacaciones", "personal", "enfermedad"]).default("vacaciones"),
  comments: z.string().optional(),
  attachment: z
    .any()
    .optional()
    .refine((file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
    }, `El archivo debe ser menor a 5MB.`)
    .refine(
      (file) => {
        if (!file) return true;
        return ACCEPTED_FILE_TYPES.includes(file.type);
      },
      "Solo se permiten archivos formats .pdf, .jpg y .png"
    ),
});

export type VacationRequestFormType = z.infer<typeof vacationRequestFormSchema>;
