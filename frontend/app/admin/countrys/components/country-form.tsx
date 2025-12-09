'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!initialData;

  const form = useForm<CountryFormType>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      phoneCountryCode: initialData?.phoneCountryCode || "",
    },
  });

  async function onSubmit(data: CountryFormType) {
    setIsLoading(true);
    try {
      const result = isEditing
        ? await updateCountry(initialData.code, data)
        : await createCountry(data);

      if (result.success) {
        toast.success("Éxito", {
          description: result.message,
        });
        onSuccess();
      } else {
        toast.error("Error", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Ha ocurrido un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldInput
          control={form.control}
          name="code"
          label="Código"
          placeholder="ES"
          disabled={isEditing || isLoading}
          description="El código ISO del país (ej. ES, MX)"
        />
        
        <FieldInput
          control={form.control}
          name="name"
          label="Nombre"
          placeholder="España"
          disabled={isLoading}
        />

        <FieldInput
          control={form.control}
          name="phoneCountryCode"
          label="Código Telefónico"
          placeholder="+34"
          disabled={isLoading}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
  );
}
