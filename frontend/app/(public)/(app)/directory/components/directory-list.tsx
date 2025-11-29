'use client';

import { EmployeeCard } from './employee-card';
import { EmployeeCardSkeleton } from './employee-card-skeleton';
import { getUsers } from '@/lib/actions/users/users.actions';
import { UserProfile } from '@/lib/schemas/responses/users.response';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

interface DirectoryListProps {
  initialUsers: UserProfile[];
  search: string;
}

export function DirectoryList({ initialUsers, search }: DirectoryListProps) {
  const { items: users, isLoading, hasMore, ref } = useInfiniteScroll<UserProfile>({
    initialData: initialUsers,
    initialPage: initialUsers.length > 0 ? 2 : 1,
    fetchData: async (page) => {
      return await getUsers({ page, limit: 10, search });
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <EmployeeCard key={user.userId} employee={user} />
        ))}
        
        {isLoading && (
          <>
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
            <EmployeeCardSkeleton />
          </>
        )}
      </div>
      
      {!isLoading && users.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron empleados que coincidan con tu búsqueda.
        </div>
      )}

      {/* Intersection target for infinite scroll */}
      {hasMore && <div ref={ref} className="h-10 w-full" />}
    </>
  );
}
