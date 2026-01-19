import { getBenefitTypes } from '@/lib/actions/benefits/benefits.actions';
import { BenefitTypesClientPage } from './client-page';

export default async function BenefitTypesPage() {
  const types = await getBenefitTypes();

  return <BenefitTypesClientPage initialData={types} />;
}
