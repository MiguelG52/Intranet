'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirmar Eliminación",
  description = "¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.",
  itemName,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl [&>button]:hidden">
        <div className="p-6 flex flex-col items-center text-center space-y-4">
            {/* Close Button */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4 h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => onOpenChange(false)}
            >
                <X className="h-4 w-4" />
            </Button>

            {/* Icon */}
            <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Trash2 className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="space-y-2">
                <DialogTitle className="text-xl font-semibold text-center text-gray-900">
                    {title}
                </DialogTitle>
                <DialogDescription className="text-center text-gray-500">
                    {itemName 
                        ? `¿Estás seguro de que deseas eliminar ${itemName}? Esta acción no se puede deshacer.`
                        : description
                    }
                </DialogDescription>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full mt-4">
                <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl h-11 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => onOpenChange(false)}
                >
                    Cancelar
                </Button>
                <Button 
                    className="flex-1 rounded-xl h-11 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                    onClick={(e) => {
                        e.preventDefault();
                        onConfirm();
                    }}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
