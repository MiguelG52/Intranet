'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useActionState, startTransition, useEffect, useRef } from "react";
import { CountryFormType, countryFormSchema } from "@/lib/schemas/Components/Forms/country-form.schema";
import { createCountry, updateCountry } from "@/lib/actions/country/country.actions";
import { Country } from "@/lib/schemas/responses/country.response";
import FieldInput from "@/components/common/field-input/field-input";
import { toast } from "sonner";


interface CountryFormProps {
  initialData?: Country;
  onSuccess: () => void;
}

export function CountryForm({ initialData, onSuccess }: CountryFormProps) {
  const isEditing = !!initialData;

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, data: CountryFormType) => {
      if (isEditing) {
        return updateCountry(initialData.code, prevState, data);
      } else {
        return createCountry(prevState, data);
      }
    },
    { success: false, message: '', timestamp: 0 }
  );

  const lastTimestamp = useRef(state.timestamp);

  const form = useForm<CountryFormType>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      phoneCountryCode: initialData?.phoneCountryCode || "",
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

  function onSubmit(data: CountryFormType) {
    startTransition(() => {
      formAction(data);
    });
  }

  return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldInput
          control={form.control}
          name="code"
          label="Código"
          placeholder="ES"
          disabled={isEditing || isPending}
          description="El código ISO del país (ej. ES, MX)"
        />
        
        <FieldInput
          control={form.control}
          name="name"
          label="Nombre"
          placeholder="España"
          disabled={isPending}
        />

        <FieldInput
          control={form.control}
          name="phoneCountryCode"
          label="Código Telefónico"
          placeholder="+34"
          disabled={isPending}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
  );
}
