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
import { CreateUserForm } from "./create-user-form";
import { UserProfile } from "@/lib/schemas/responses/users.response";

interface CreateUserDialogProps {
  roles: { id: string; name: string }[];
  countries: { code: string; name: string }[];
  positions: { id: string; title: string }[];
  areas: { areaId: string; areaName: string }[];
  user?: UserProfile;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateUserDialog({ roles, countries, positions, areas, user, trigger, open: controlledOpen, onOpenChange: controlledOnOpenChange }: CreateUserDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const isEditMode = !!user;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
            {trigger ? trigger : (
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Usuario
            </Button>
            )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Modifica la información del empleado.' : 'Completa la información del nuevo empleado.'}
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm 
          roles={roles} 
          countries={countries} 
          positions={positions} 
          areas={areas}
          onSuccess={() => setOpen(false)}
          user={user}
        />
      </DialogContent>
    </Dialog>
  );
}
