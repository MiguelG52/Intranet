import { getCountries } from "@/lib/actions/country/country.actions";
import { CountryList } from "./components/country-list";

export default async function CountrysPage() {
  const countries = await getCountries();

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Países</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de países del sistema.
          </p>
        </div>
      </div>

      <CountryList data={countries} />
    </div>
  );
}