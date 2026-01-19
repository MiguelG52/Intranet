'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BenefitType } from "@/lib/schemas/types/types";
import { BenefitTypeForm } from "./benefit-type-form";

interface BenefitTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  benefitType?: BenefitType;
  onSuccess: () => void;
}

export function BenefitTypeDialog({
  open,
  onOpenChange,
  benefitType,
  onSuccess,
}: BenefitTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {benefitType ? "Editar Tipo de Beneficio" : "Nuevo Tipo de Beneficio"}
          </DialogTitle>
        </DialogHeader>
        <BenefitTypeForm
          initialData={benefitType}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
