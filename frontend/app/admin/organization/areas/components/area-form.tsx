'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useActionState, startTransition, useRef } from "react";
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
  const [countries, setCountries] = useState<Country[]>([]);
  const isEditing = !!initialData;

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, data: AreaFormType) => {
      if (isEditing) {
        return updateArea(initialData.areaId, prevState, data);
      } else {
        return createArea(prevState, data);
      }
    },
    { success: false, message: '', timestamp: 0 }
  );

  const lastTimestamp = useRef(state.timestamp);

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

  function onSubmit(data: AreaFormType) {
    startTransition(() => {
      formAction(data);
    });
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : isEditing ? "Actualizar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}
