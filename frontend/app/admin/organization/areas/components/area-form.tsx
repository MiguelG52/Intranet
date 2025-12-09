'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AreaFormType, areaFormSchema } from "@/lib/schemas/Components/Forms/area-form.schema";
import { createArea, updateArea } from "@/lib/actions/organization/organization.actions";
import { getCountries } from "@/lib/actions/common/common.actions";
import { Area, Country } from "@/lib/schemas/types/types";
import FieldInput from "@/components/common/field-input/field-input";
import SelectInput from "@/components/common/select-input/select-input";
import { toast } from "sonner";
import { Globe } from "lucide-react";

interface AreaFormProps {
  initialData?: Area;
  onSuccess: () => void;
}

export function AreaForm({ initialData, onSuccess }: AreaFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const isEditing = !!initialData;

  const form = useForm<AreaFormType>({
    resolver: zodResolver(areaFormSchema),
    defaultValues: {
      areaName: initialData?.areaName || "",
      countryCode: initialData?.countryCode || "",
    },
  });

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  async function onSubmit(data: AreaFormType) {
    setIsLoading(true);
    try {
      const result = isEditing
        ? await updateArea(initialData.areaId, data)
        : await createArea(data);

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
        description: "Ocurrió un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldInput
        control={form.control}
        name="areaName"
        label="Nombre del Área"
        placeholder="Ej. Tecnología"
      />

      <SelectInput
        control={form.control}
        name="countryCode"
        label="País"
        placeholder="Selecciona un país"
        options={countries.map(c => ({ label: c.name, value: c.code }))}
        Icon={Globe}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}
