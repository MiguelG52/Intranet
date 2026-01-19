'use client';

import { useEffect, useState } from 'react';
import { getOrgChart } from '@/lib/actions/common/common.actions';
import { OrgNode } from './org-node';
import { OrgNodeData } from './org-node-card';

export function OrgChart() {
  const [data, setData] = useState<OrgNodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getOrgChart();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Cargando organigrama...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-10 text-gray-500">No hay datos de organigrama disponibles.</div>;
  }

  return (
    <div className="overflow-auto p-8 min-h-[600px]">
      <div className="tree min-w-max flex justify-center">
        <ul>
          {data.map((root) => (
            <OrgNode key={root.positionId} node={root} level={1} />
          ))}
        </ul>
      </div>
    </div>
  );
}
