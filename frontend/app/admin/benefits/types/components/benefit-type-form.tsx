'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useActionState, startTransition, useRef } from "react";
import { BenefitTypeFormType, benefitTypeFormSchema } from "@/lib/schemas/Components/Forms/benefit-type-form.schema";
import { createBenefitType, updateBenefitType } from "@/lib/actions/benefits/benefits.actions";
import { BenefitType } from "@/lib/schemas/types/types";
import FieldInput from "@/components/common/field-input/field-input";
import { toast } from "sonner";
import { Tag, FileText } from "lucide-react";

interface BenefitTypeFormProps {
  initialData?: BenefitType;
  onSuccess: () => void;
}

export function BenefitTypeForm({ initialData, onSuccess }: BenefitTypeFormProps) {
  const isEditing = !!initialData;

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, data: BenefitTypeFormType) => {
      if (isEditing) {
        return updateBenefitType(initialData.benefitTypeId, prevState, data);
      } else {
        return createBenefitType(prevState, data);
      }
    },
    { success: false, message: '', timestamp: 0 }
  );

  const lastTimestamp = useRef(state.timestamp);

  const form = useForm<BenefitTypeFormType>({
    resolver: zodResolver(benefitTypeFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (state?.timestamp && state.timestamp !== lastTimestamp.current) {
      lastTimestamp.current = state.timestamp;
      if (state.success) {
        toast.success("Éxito", {
          description: state.message,
        });
        onSuccess();
      } else {
        toast.error("Error", {
          description: state.message,
        });
      }
    }
  }, [state, onSuccess]);

  function onSubmit(data: BenefitTypeFormType) {
    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldInput
        control={form.control}
        name="title"
        label="Nombre del Tipo"
        placeholder="Ej. Salud, Financiero"
        Icon={Tag}
        disabled={isPending}
      />

      <FieldInput
        control={form.control}
        name="description"
        label="Descripción (Opcional)"
        placeholder="Breve descripción de la categoría"
        Icon={FileText}
        disabled={isPending}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : isEditing ? "Actualizar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}
