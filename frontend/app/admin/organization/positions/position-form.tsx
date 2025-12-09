'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PositionFormType, positionFormSchema } from "@/lib/schemas/Components/Forms/position-form.schema";
import { createPosition, updatePosition } from "@/lib/actions/organization/organization.actions";
import { getAreas } from "@/lib/actions/common/common.actions";
import { getUsers } from "@/lib/actions/users/users.actions";
import { Position, Area } from "@/lib/schemas/types/types";
import { UserProfile } from "@/lib/schemas/responses/users.response";
import FieldInput from "@/components/common/field-input/field-input";
import SelectInput from "@/components/common/select-input/select-input";
import { toast } from "sonner";
import { Briefcase, Building2, User } from "lucide-react";

interface PositionFormProps {
  initialData?: Position;
  onSuccess: () => void;
}

export function PositionForm({ initialData, onSuccess }: PositionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);
  const [managers, setManagers] = useState<UserProfile[]>([]);
  const isEditing = !!initialData;

  const form = useForm<PositionFormType>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      areaId: initialData?.areaId || "",
      managerId: initialData?.managerId || "",
    },
  });

  useEffect(() => {
    getAreas().then(setAreas);
    getUsers({ limit: 100 }).then(res => setManagers(res.data));
  }, []);

  async function onSubmit(data: PositionFormType) {
    setIsLoading(true);
    try {
      const result = isEditing
        ? await updatePosition(initialData.positionId, data)
        : await createPosition(data);

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
        name="title"
        label="Nombre del Cargo"
        placeholder="Ej. Desarrollador Senior"
        Icon={Briefcase}
      />

      <SelectInput
        control={form.control}
        name="areaId"
        label="Área"
        placeholder="Selecciona un área"
        options={areas.map(area => ({ label: area.areaName, value: area.areaId }))}
        Icon={Building2}
      />

      <SelectInput
        control={form.control}
        name="managerId"
        label="Jefe Directo (Opcional)"
        placeholder="Selecciona un jefe"
        options={managers.map(user => ({ label: `${user.name} ${user.lastName}`, value: user.id }))}
        Icon={User}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}
