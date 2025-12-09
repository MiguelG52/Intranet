import { getAreas } from '@/lib/actions/common/common.actions';
import { AreasClientPage } from './client-page';

export default async function AreasPage() {
  const areas = await getAreas();

  return <AreasClientPage initialData={areas} />;
}
