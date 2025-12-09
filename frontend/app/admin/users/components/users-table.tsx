'use client';

import { DataTable } from '@/components/common/table/table';
import { columns } from './columns';
import { UserProfile } from '@/lib/schemas/responses/users.response';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Mail, Phone, Briefcase, MapPin, Edit, Eye, Power, Trash } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateUserDialog } from './create-user-dialog';
import { useState, useMemo } from 'react';

const StatusBadge = ({ isActive }: { isActive: boolean }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
    {isActive ? 'Activo' : 'Inactivo'}
  </span>
);

interface UsersTableProps {
    data: UserProfile[];
    meta: {
      total: number;
      page: number;
      limit: number;
      lastPage: number;
    };
    roles: { id: string; name: string }[];
    countries: { code: string; name: string }[];
    positions: { id: string; title: string }[];
    areas: { areaId: string; areaName: string }[];
    actions?: React.ReactNode;
}

export function UsersTable({ data, meta, roles, countries, positions, areas, actions }: UsersTableProps) {
  const memoizedData = useMemo(() => data, [data]);
  const [editingUser, setEditingUser] = useState<UserProfile | undefined>(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const customHeader = (
    <div className="hidden md:flex px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-md border bg-white rounded-3xl">
        <div className="w-16 shrink-0"></div> 
        <div className="flex-1 grid grid-cols-12 gap-4">
            <div className="col-span-5 pl-2">Usuario</div>
            <div className="col-span-5">Contacto</div>
            <div className="col-span-2 text-center">Estado</div>
        </div>
        <div className="w-10 shrink-0 text-center">Acciones</div>
    </div>
  );

  const renderUserRow = (row: Row<UserProfile>) => {
    const user = row.original;
    return (
      <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4 w-full items-center">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={user.userDetail?.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name[0]}{user.lastname[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Usuario Section */}
              <div className="md:col-span-5 space-y-1">
                <h3 className="font-bold text-gray-900">{user.name} {user.lastname}</h3>
                <p className="text-sm text-gray-500">{user.position?.title || 'Sin puesto'}</p>
                <div className="flex items-center text-xs text-gray-500">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {user.position?.area?.name || 'Sin área'}
                </div>
              </div>

              {/* Contact Section */}
              <div className="md:col-span-5 space-y-1">
                 <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                 <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.userDetail?.phoneNumber || 'Sin teléfono'}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {user.country?.name || 'Sin ubicación'}
                  </div>
              </div>

               {/* Status Section */}
               <div className="md:col-span-2 flex justify-center">
                  <StatusBadge isActive={user.isActive} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2 shrink-0 w-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(user)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("View details", user.userId)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Change status", user.userId)}>
                  <Power className="mr-2 h-4 w-4" />
                  {user.isActive ? 'Desactivar' : 'Activar'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Delete", user.userId)} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DataTable 
        columns={columns} 
        data={memoizedData} 
        renderRow={renderUserRow}
        searchPlaceholder="Buscar usuarios..."
        pageCount={meta.lastPage}
        customHeader={customHeader}
        actions={actions}
      />
      
      {editingUser && (
        <CreateUserDialog
            open={isEditDialogOpen}
            onOpenChange={(open) => {
                setIsEditDialogOpen(open);
                if (!open) setEditingUser(undefined);
            }}
            roles={roles}
            countries={countries}
            positions={positions}
            areas={areas}
            user={editingUser}
        />
      )}
    </>
  );
}
