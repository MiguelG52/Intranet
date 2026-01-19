import { getBenefits, getBenefitTypes } from '@/lib/actions/benefits/benefits.actions';
import { getCountries } from '@/lib/actions/common/common.actions';
import { BenefitsClientPage } from './client-page';

export default async function BenefitsListPage() {
  const [benefits, types, countries] = await Promise.all([
    getBenefits(),
    getBenefitTypes(),
    getCountries()
  ]);

  return <BenefitsClientPage initialData={benefits} types={types} countries={countries} />;
}
