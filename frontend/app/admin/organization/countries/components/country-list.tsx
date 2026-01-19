'use client';

import { useState } from "react";
import { DataTable } from "@/components/common/table/table";
import { Country } from "@/lib/schemas/responses/country.response";
import { CountryDialog } from "./country-dialog";
import { DeleteCountryDialog } from "./delete-country-dialog";
import { getCountryColumns } from "./country-columns";

interface CountryListProps {
  data: Country[];
}

export function CountryList({ data }: CountryListProps) {
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);

  const columns = getCountryColumns({
    onEdit: setEditingCountry,
    onDelete: setDeletingCountry,
  });

  return (
    <>
      <DataTable 
        columns={columns} 
        data={data} 
        searchPlaceholder="Buscar país..." 
        actions={<CountryDialog />}
      />

      {/* Edit Dialog */}
      <CountryDialog 
        country={editingCountry || undefined} 
        open={!!editingCountry} 
        onOpenChange={(open) => !open && setEditingCountry(null)} 
      />

      {/* Delete Alert */}
      <DeleteCountryDialog 
        country={deletingCountry} 
        onClose={() => setDeletingCountry(null)} 
      />
    </>
  );
}
