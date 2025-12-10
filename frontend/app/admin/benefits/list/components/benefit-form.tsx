'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useActionState, startTransition, useRef } from "react";
import { BenefitFormType, benefitFormSchema } from "@/lib/schemas/Components/Forms/benefit-form.schema";
import { createBenefit, updateBenefit, getBenefitTypes } from "@/lib/actions/benefits/benefits.actions";
import { getCountries } from "@/lib/actions/common/common.actions";
import { Benefit, BenefitType, Country } from "@/lib/schemas/types/types";
import FieldInput from "@/components/common/field-input/field-input";
import SelectInput from "@/components/common/select-input/select-input";
import { toast } from "sonner";
import { Gift, Globe, Tag, FileText } from "lucide-react";

interface BenefitFormProps {
  initialData?: Benefit;
  onSuccess: () => void;
}

export function BenefitForm({ initialData, onSuccess }: BenefitFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [types, setTypes] = useState<BenefitType[]>([]);
  const isEditing = !!initialData;

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, data: BenefitFormType) => {
      if (isEditing) {
        return updateBenefit(initialData.benefitId, prevState, data);
      } else {
        return createBenefit(prevState, data);
      }
    },
    { success: false, message: '', timestamp: 0 }
  );

  const lastTimestamp = useRef(state.timestamp);

  const form = useForm<BenefitFormType>({
    resolver: zodResolver(benefitFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      countryCode: initialData?.countryCode || "",
      benefitTypeId: initialData?.benefitTypeId || "",
    },
  });

  useEffect(() => {
    getCountries().then(setCountries);
    getBenefitTypes().then(setTypes);
  }, []);

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

  function onSubmit(data: BenefitFormType) {
    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldInput
        control={form.control}
        name="title"
        label="Nombre del Beneficio"
        placeholder="Ej. Seguro Médico Premium"
        Icon={Gift}
        disabled={isPending}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
            control={form.control}
            name="countryCode"
            label="País"
            placeholder="Selecciona un país"
            options={countries.map(c => ({ label: c.name, value: c.code }))}
            Icon={Globe}
        />

        <SelectInput
            control={form.control}
            name="benefitTypeId"
            label="Tipo de Beneficio"
            placeholder="Selecciona una categoría"
            options={types.map(t => ({ label: t.title, value: t.benefitTypeId }))}
            Icon={Tag}
        />
      </div>

      <FieldInput
        control={form.control}
        name="description"
        label="Descripción (Opcional)"
        placeholder="Detalles del beneficio..."
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
