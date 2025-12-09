'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Area } from "@/lib/schemas/types/types";
import { AreaForm } from "./area-form";

interface AreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area?: Area;
  onSuccess: () => void;
}

export function AreaDialog({
  open,
  onOpenChange,
  area,
  onSuccess,
}: AreaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {area ? "Editar Área" : "Nueva Área"}
          </DialogTitle>
        </DialogHeader>
        <AreaForm
          initialData={area}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
