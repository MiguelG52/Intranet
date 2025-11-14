import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const store = await cookies();
  const hasSession = Boolean(
    store.get('access_token')?.value || store.get('refresh_token')?.value
  );

  if (hasSession) {
    redirect('/home');
  } else {
    redirect('/login');
  }

}