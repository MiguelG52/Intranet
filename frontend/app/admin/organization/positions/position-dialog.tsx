'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Position } from "@/lib/schemas/types/types";
import { PositionForm } from "./position-form";

interface PositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: Position;
  onSuccess: () => void;
}

export function PositionDialog({
  open,
  onOpenChange,
  position,
  onSuccess,
}: PositionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {position ? "Editar Cargo" : "Nuevo Cargo"}
          </DialogTitle>
        </DialogHeader>
        <PositionForm
          initialData={position}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
