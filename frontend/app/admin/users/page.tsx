'use server'
import { Suspense } from 'react';
import Loading from './loading';
import { UsersTable } from './components/users-table';
import { UserProfile } from '@/lib/schemas/responses/users.response';
import { api } from '@/lib/api/client';
import { redirect } from 'next/navigation';
import { CreateUserDialog } from './components/create-user-dialog';
import { getAreas, getCountries, getPositions, getRoles } from '@/lib/actions/common/common.actions';

import { LiquidHeader } from '@/components/common/header/liquid-header';
import { Users } from 'lucide-react';

async function getUsers(searchParams: { [key: string]: string | string[] | undefined }): Promise<{ data: UserProfile[], meta: any }> {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search ? String(searchParams.search) : '';

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    queryParams.append('search', search);
  }

  try {
    const response = await api.get(`/users/find-all?${queryParams.toString()}`);
    
    if (!response || !response.meta) {
      return {
        data: response?.data || [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          lastPage: 1,
        }
      };
    }
    
    return response;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    if (error.message === 'Sesión expirada. Por favor, inicia sesión de nuevo.') {
      redirect('/auth/login');
    }
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        lastPage: 1,
      }
    };
  }
}

async function UsersContent({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const { data, meta } = await getUsers(params);
  
  const [countries, roles, areas, positions] = await Promise.all([
    getCountries(),
    getRoles(),
    getAreas(),
    getPositions()
  ]);

  return (
    <div className="space-y-8">
      <LiquidHeader
        title="Gestión de Usuarios"
        subtitle="Administra el acceso y roles de los usuarios del sistema"
        icon={Users}
      />
      <UsersTable 
        data={data} 
        meta={meta} 
        roles={roles.map(r => ({ id: r.roleId, name: r.roleName }))} 
        countries={countries} 
        positions={positions.map(p => ({ id: p.positionId, title: p.title }))}
        areas={areas}
        actions={
            <CreateUserDialog 
                roles={roles.map(r => ({ id: r.roleId, name: r.roleName }))} 
                countries={countries} 
                positions={positions.map(p => ({ id: p.positionId, title: p.title }))}
                areas={areas}
            />
        }
      />
    </div>
  );
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Loading />}>
        <UsersContent params={params} />
      </Suspense>
    </div>
  );
}

