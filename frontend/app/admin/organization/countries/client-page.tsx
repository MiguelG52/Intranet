'use client'

import { useState, useEffect } from 'react'
import { deleteCountry } from '@/lib/actions/country/country.actions'
import { Country } from '@/lib/schemas/responses/country.response'
import { OrganizationListItem } from '../components/organization-list-item'
import { Badge } from '@/components/ui/badge'
import { CountryDialog } from './components/country-dialog'
import { DeleteConfirmDialog } from '../components/delete-confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { AdminPageHeader } from '@/components/common/header/admin-page-header'
import { useRouter } from 'next/navigation'

interface CountriesClientPageProps {
    initialData: Country[]
}

export function CountriesClientPage({ initialData }: CountriesClientPageProps) {
  const [data, setData] = useState<Country[]>(initialData)
  const [filteredData, setFilteredData] = useState<Country[]>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    setData(initialData)
    setFilteredData(
        initialData.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  }, [initialData, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
    
  }

  const onSuccess = () => {
      router.refresh()
  }

  const handleDelete = async () => {
    if (!deletingCountry) return
    setIsDeleting(true)
    try {
        const res = await deleteCountry(deletingCountry.code)
        if (res.success) {
            toast.success('País eliminado correctamente')
            router.refresh()
        } else {
            toast.error(res.message)
        }
    } catch (error) {
        toast.error('Error al eliminar el país')
    } finally {
        setIsDeleting(false)
        setDeletingCountry(null)
    }
  }

  return (
    <div className="space-y-6">
        <AdminPageHeader
            searchPlaceholder="Buscar países..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            addButtonText="Agregar País"
            onAddClick={() => setIsCreateOpen(true)}
        />

        <div className="space-y-4">
            {filteredData.map((country) => (
                <OrganizationListItem
                    key={country.code}
                    icon={country.code}
                    title={country.name}
                    badges={<Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>}
                    subtitle={
                        <>
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono text-xs">{country.code}</span>
                            {/* Placeholder for Timezone */}
                            <span>America/Mexico_City</span> 
                        </>
                    }
                    rightContent={
                        <div>
                            <p className="text-2xl font-light text-gray-900">--</p>
                            <p className="text-xs text-gray-500">empleados</p>
                        </div>
                    }
                    onEdit={() => setEditingCountry(country)}
                    onDelete={() => setDeletingCountry(country)}
                />
            ))}
            {filteredData.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No se encontraron países.
                </div>
            )}
        </div>

        <CountryDialog 
            open={isCreateOpen || !!editingCountry} 
            onOpenChange={(open) => {
                if (!open) {
                    setIsCreateOpen(false)
                    setEditingCountry(null)
                }
            }}
            country={editingCountry || undefined}
            onSuccess={onSuccess}
        />

        <DeleteConfirmDialog
            open={!!deletingCountry}
            onOpenChange={(open) => !open && setDeletingCountry(null)}
            onConfirm={handleDelete}
            itemName={deletingCountry?.name}
            isDeleting={isDeleting}
        />
    </div>
  )
}
