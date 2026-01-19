import { getCountries } from '@/lib/actions/common/common.actions';
import { CountriesClientPage } from './client-page';

export default async function CountriesPage() {
  const countries = await getCountries();

  return <CountriesClientPage initialData={countries} />;
}
