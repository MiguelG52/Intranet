"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, FileUp, Loader2 } from "lucide-react"
import { useState, useTransition } from "react"
import { Calendar } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { vacationRequestFormSchema, VacationRequestFormType } from "@/lib/schemas/Components/Forms/vacation-request-form.schema"
import FieldInput from "@/components/common/field-input/field-input"
import DateInput from "@/components/common/date-input/date-input"
import FileInput from "@/components/common/file-input/file-input"
import { requestVacation } from "@/lib/actions/benefits/request-vacation.action"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

export function VacationRequestForm() {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm({
    resolver: zodResolver(vacationRequestFormSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      absenceType: "vacaciones",
      comments: "",
    },
  })

  // Watch values to calculate duration
  const startDate = form.watch("startDate")
  const endDate = form.watch("endDate")
  const absenceType = form.watch("absenceType")

  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // Include start date
    return diffDays > 0 ? diffDays : 0
  }

  const onSubmit = (data: VacationRequestFormType) => {
    startTransition(async () => {
       try {
         const result = await requestVacation(data);
         if (result.success) {
            toast.success("Solicitud enviada con éxito");
            form.reset();
         } else {
            toast.error(result.error || "Error al enviar la solicitud");
         }
       } catch (error) {
         toast.error("Ocurrió un error inesperado");
       }
    })
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-2">
            <span className="bg-red-50 text-primary text-xs font-bold px-2 py-1 rounded-full">Nueva Solicitud</span>
         </div>
        <CardTitle className="text-2xl font-bold mt-2">Solicitar Vacaciones / Días de Ausencia</CardTitle>
        <CardDescription>Completa el formulario para procesar tu descanso o justificar una falta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <DateInput 
                        control={form.control}
                        name="startDate"
                        label="Fecha de Inicio"
                        Icon={Calendar}
                        iconColor="slate-400"
                    />
                </div>
                <div className="space-y-2">
                    <DateInput 
                        control={form.control}
                        name="endDate"
                        label="Fecha de Fin"
                        Icon={Calendar}
                        iconColor="slate-400"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Tipo de Ausencia</label>
                <div className="flex flex-wrap gap-4">
                    <button
                        type="button"
                        onClick={() => form.setValue("absenceType", "vacaciones")}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            absenceType === "vacaciones" 
                            ? "bg-primary text-white shadow-md shadow-red-200" 
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-transparent"
                        }`}
                    >
                        Vacaciones
                    </button>
                    <button
                        type="button"
                        onClick={() => form.setValue("absenceType", "personal")}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            absenceType === "personal" 
                            ? "bg-primary text-white shadow-md shadow-red-200" 
                            : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        Personal
                    </button>
                    <button
                        type="button"
                        onClick={() => form.setValue("absenceType", "enfermedad")}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            absenceType === "enfermedad" 
                            ? "bg-primary text-white shadow-md shadow-red-200" 
                            : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        Enfermedad
                    </button>
                </div>
                {form.formState.errors.absenceType && (
                    <p className="text-destructive text-sm font-medium">{form.formState.errors.absenceType.message}</p>
                )}
            </div>
            
            <div className="space-y-2">
                 <FileInput
                    control={form.control}
                    name="attachment"
                    label="Adjuntar Justificante (Opcional)"
                    Icon={FileUp}
                    iconColor="slate-400"
                    description="Sube un documento PDF o imagen si es necesario para justificar tu ausencia."
                    accept=".pdf,.jpg,.jpeg,.png"
                 />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Comentarios (Opcional)</label>
                <Textarea 
                    {...form.register("comments")}
                    placeholder="Escribe detalles adicionales aquí..." 
                    className="resize-none border-slate-200 bg-slate-50/50 min-h-[100px] focus:ring-primary/20 focus:border-primary" 
                />
            </div>


            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-6">
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm">Total calculado:</span>
                    <span className="font-bold text-slate-800 text-lg">{calculateDays()} días</span>
                </div>
                
                <Button 
                    type="submit" 
                    disabled={isPending}
                    className="bg-primary hover:bg-red-700 text-white rounded-full px-6 shadow-lg shadow-red-200 transition-all hover:scale-105 active:scale-95"
                >
                    {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    Enviar Solicitud
                </Button>
            </div>
        </form>
      </CardContent>
    </Card>
  )
}
