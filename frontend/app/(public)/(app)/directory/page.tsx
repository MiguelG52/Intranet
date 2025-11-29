import { Suspense } from 'react';
import { DirectoryContent } from './components/directory-content';
import { getUsers } from '@/lib/actions/users/users.actions';
import Loading from './loading';

async function DirectoryList() {
  const { data: initialUsers } = await getUsers({ page: 1, limit: 10 });
  return <DirectoryContent initialUsers={initialUsers} />;
}

export default function DirectoryPage() {
  return (
    <div className="public-container">
      <Suspense fallback={<Loading />}>
        <DirectoryList />
      </Suspense>
    </div>
  )
}