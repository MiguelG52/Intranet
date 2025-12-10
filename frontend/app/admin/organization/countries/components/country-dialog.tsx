'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CountryForm } from "./country-form";
import { Country } from "@/lib/schemas/responses/country.response";

interface CountryDialogProps {
  country?: Country;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CountryDialog({ country, trigger, open: controlledOpen, onOpenChange: controlledOnOpenChange, onSuccess }: CountryDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const isEditMode = !!country;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
            {trigger ? trigger : (
            <Button className="py- cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Registrar País
            </Button>
            )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar País' : 'Registrar País'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Modifica la información del país.' : 'Completa la información del nuevo país.'}
          </DialogDescription>
        </DialogHeader>
        <CountryForm 
          initialData={country}
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
