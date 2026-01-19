'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Benefit } from "@/lib/schemas/types/types";
import { BenefitForm } from "./benefit-form";

interface BenefitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  benefit?: Benefit;
  onSuccess: () => void;
}

export function BenefitDialog({
  open,
  onOpenChange,
  benefit,
  onSuccess,
}: BenefitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {benefit ? "Editar Beneficio" : "Nuevo Beneficio"}
          </DialogTitle>
        </DialogHeader>
        <BenefitForm
          initialData={benefit}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
