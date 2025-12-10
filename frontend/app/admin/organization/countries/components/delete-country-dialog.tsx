'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Country } from "@/lib/schemas/responses/country.response";
import { deleteCountry } from "@/lib/actions/country/country.actions";
import { toast } from "sonner";

interface DeleteCountryDialogProps {
  country: Country | null;
  onClose: () => void;
}

export function DeleteCountryDialog({ country, onClose }: DeleteCountryDialogProps) {
  const handleDelete = async () => {
    if (!country) return;

    const result = await deleteCountry(country.code);
    
    if (result.success) {
      toast.success("Éxito", {
        description: result.message,
      });
    } else {
      toast.error("Error", {
        description: result.message,
      });
    }
    onClose();
  };

  return (
    <Dialog open={!!country} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el país 
            <strong> {country?.name}</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
