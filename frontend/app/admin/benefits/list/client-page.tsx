'use client'

import { useState, useEffect } from 'react'
import { deleteBenefit } from '@/lib/actions/benefits/benefits.actions'
import { Benefit, BenefitType, Country } from '@/lib/schemas/types/types'
import { OrganizationListItem } from '@/app/admin/organization/components/organization-list-item'
import { Gift, Plus, Search } from 'lucide-react'
import { AdminPageHeader } from '@/components/common/admin-page-header'
import { BenefitDialog } from './components/benefit-dialog'
import { DeleteConfirmDialog } from '@/app/admin/organization/components/delete-confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface BenefitsClientPageProps {
    initialData: Benefit[]
    types: BenefitType[]
    countries: Country[]
}

export function BenefitsClientPage({ initialData, types, countries }: BenefitsClientPageProps) {
  const [data, setData] = useState<Benefit[]>(initialData)
  const [filteredData, setFilteredData] = useState<Benefit[]>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingBenefit, setDeletingBenefit] = useState<Benefit | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter()

  // Create maps for easy lookup
  const typeMap = types.reduce((acc, type) => {
    acc[type.benefitTypeId] = type.title;
    return acc;
  }, {} as Record<string, string>);

  const countryMap = countries.reduce((acc, country) => {
    acc[country.code] = country.name;
    return acc;
  }, {} as Record<string, string>);

  useEffect(() => {
    setData(initialData)
    setFilteredData(
        initialData.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    )
  }, [initialData, searchQuery])

  const handleDelete = async () => {
    if (!deletingBenefit) return
    
    setIsDeleting(true)
    try {
      const result = await deleteBenefit(deletingBenefit.benefitId)
      if (result.success) {
        toast.success('Éxito', { description: result.message })
        router.refresh()
      } else {
        toast.error('Error', { description: result.message })
      }
    } catch (error) {
      toast.error('Error', { description: 'Ocurrió un error inesperado' })
    } finally {
      setIsDeleting(false)
      setDeletingBenefit(null)
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        searchPlaceholder="Buscar beneficios..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        addButtonText="Nuevo Beneficio"
        onAddClick={() => setIsCreateOpen(true)}
      />

      <div className="space-y-4">
        {filteredData.map((item) => (
          <OrganizationListItem
            key={item.benefitId}
            icon={<Gift className="h-8 w-8" />}
            title={item.title}
            subtitle={item.description}
            badges={
                <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                        {typeMap[item.benefitTypeId] || 'Tipo Desconocido'}
                    </Badge>
                    <Badge variant="outline" className="border-gray-200 text-gray-600">
                        {countryMap[item.countryCode] || item.countryCode}
                    </Badge>
                </div>
            }
            onEdit={() => setEditingBenefit(item)}
            onDelete={() => setDeletingBenefit(item)}
          />
        ))}
        
        {filteredData.length === 0 && (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Gift className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No hay beneficios registrados</h3>
                <p className="mt-1 text-gray-500">Comienza creando uno nuevo.</p>
            </div>
        )}
      </div>

      <BenefitDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={() => router.refresh()}
      />

      <BenefitDialog
        open={!!editingBenefit}
        onOpenChange={(open) => !open && setEditingBenefit(null)}
        benefit={editingBenefit || undefined}
        onSuccess={() => router.refresh()}
      />

      <DeleteConfirmDialog
        open={!!deletingBenefit}
        onOpenChange={(open) => !open && setDeletingBenefit(null)}
        onConfirm={handleDelete}
        title={`¿Eliminar ${deletingBenefit?.title}?`}
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el beneficio."
      />
    </div>
  )
}
