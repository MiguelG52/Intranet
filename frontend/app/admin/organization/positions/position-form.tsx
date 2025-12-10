'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useActionState, startTransition, useRef } from "react";
import { PositionFormType, positionFormSchema } from "@/lib/schemas/Components/Forms/position-form.schema";
import { createPosition, updatePosition } from "@/lib/actions/organization/organization.actions";
import { getAreas, getPositions } from "@/lib/actions/common/common.actions";
import { Position, Area } from "@/lib/schemas/types/types";
import FieldInput from "@/components/common/field-input/field-input";
import SelectInput from "@/components/common/select-input/select-input";
import { toast } from "sonner";
import { Briefcase, Building2, User } from "lucide-react";

interface PositionFormProps {
  initialData?: Position;
  onSuccess: () => void;
}

export function PositionForm({ initialData, onSuccess }: PositionFormProps) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [managers, setManagers] = useState<Position[]>([]);
  const isEditing = !!initialData;

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, data: PositionFormType) => {
      if (isEditing) {
        return updatePosition(initialData.positionId, prevState, data);
      } else {
        return createPosition(prevState, data);
      }
    },
    { success: false, message: '', timestamp: 0 }
  );

  const lastTimestamp = useRef(state.timestamp);

  const form = useForm<PositionFormType>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      areaId: initialData?.areaId || "",
      managerId: initialData?.managerId || "",
    },
  });

  const selectedAreaId = form.watch("areaId");

  useEffect(() => {
    getAreas().then(setAreas);
    getPositions().then(setManagers);
  }, []);

  useEffect(() => {
    if (selectedAreaId) {
      const currentManagerId = form.getValues("managerId");
      if (currentManagerId) {
        const manager = managers.find(m => m.positionId === currentManagerId);
        if (manager && manager.areaId !== selectedAreaId) {
          form.setValue("managerId", "");
        }
      }
    }
  }, [selectedAreaId, managers, form]);

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

  function onSubmit(data: PositionFormType) {
    startTransition(() => {
      formAction(data);
    });
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
        label="Cargo Superior (Opcional)"
        placeholder="Selecciona el cargo superior"
        options={managers
          .filter(pos => {
            if (initialData && pos.positionId === initialData.positionId) return false;
            if (selectedAreaId && pos.areaId !== selectedAreaId) return false;
            return true;
          })
          .map(pos => ({ label: pos.title, value: pos.positionId }))}
        Icon={User}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : isEditing ? "Actualizar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}
