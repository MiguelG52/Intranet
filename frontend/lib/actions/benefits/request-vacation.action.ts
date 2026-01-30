'use server'

import { vacationRequestFormSchema, VacationRequestFormType } from "@/lib/schemas/Components/Forms/vacation-request-form.schema";
import { revalidatePath } from "next/cache";

export async function requestVacation(data: VacationRequestFormType) {
  const result = vacationRequestFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Datos de formulario inválidos" };
  }

  // Simulate server processing (e.g. database save, email send)
  // In a real scenario, you would handle the file upload here if 'attachment' is present.
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

//   console.log("Vacation request processed:", result.data);

  revalidatePath('/directory/benefits');
  
  return { success: true, message: "Solicitud enviada correctamente" };
}
