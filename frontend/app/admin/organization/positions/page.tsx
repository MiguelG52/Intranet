import { getPositions, getAreas } from '@/lib/actions/common/common.actions';
import { PositionsClientPage } from './client-page';

export default async function PositionsPage() {
  const [positions, areas] = await Promise.all([
    getPositions(),
    getAreas()
  ]);

  return <PositionsClientPage initialData={positions} areas={areas} />;
}
