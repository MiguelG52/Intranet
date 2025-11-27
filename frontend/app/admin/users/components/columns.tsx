'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserProfile } from '@/lib/schemas/responses/users.response';

export const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: 'userId',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'lastname',
    header: 'Apellido',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role.roleName',
    header: 'Rol',
  },
];
