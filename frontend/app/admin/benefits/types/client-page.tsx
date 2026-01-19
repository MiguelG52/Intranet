'use client'

import { useState, useEffect } from 'react'
import { deleteBenefitType } from '@/lib/actions/benefits/benefits.actions'
import { BenefitType } from '@/lib/schemas/types/types'
import { OrganizationListItem } from '@/app/admin/organization/components/organization-list-item'
import { Tag, Plus, Search } from 'lucide-react'
import { AdminPageHeader } from '@/components/common/admin-page-header'
import { BenefitTypeDialog } from './components/benefit-type-dialog'
import { DeleteConfirmDialog } from '@/app/admin/organization/components/delete-confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

interface BenefitTypesClientPageProps {
    initialData: BenefitType[]
}

export function BenefitTypesClientPage({ initialData }: BenefitTypesClientPageProps) {
  const [data, setData] = useState<BenefitType[]>(initialData)
  const [filteredData, setFilteredData] = useState<BenefitType[]>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [editingType, setEditingType] = useState<BenefitType | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingType, setDeletingType] = useState<BenefitType | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    setData(initialData)
    setFilteredData(
        initialData.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  }, [initialData, searchQuery])

  const handleDelete = async () => {
    if (!deletingType) return
    
    setIsDeleting(true)
    try {
      const result = await deleteBenefitType(deletingType.benefitTypeId)
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
      setDeletingType(null)
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        searchPlaceholder="Buscar tipos de beneficios..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        addButtonText="Nuevo Tipo"
        onAddClick={() => setIsCreateOpen(true)}
      />

      <div className="space-y-4">
        {filteredData.map((item) => (
          <OrganizationListItem
            key={item.benefitTypeId}
            icon={<Tag className="h-8 w-8" />}
            title={item.title}
            subtitle={item.description}
            onEdit={() => setEditingType(item)}
            onDelete={() => setDeletingType(item)}
          />
        ))}
        
        {filteredData.length === 0 && (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Tag className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No hay tipos de beneficios</h3>
                <p className="mt-1 text-gray-500">Comienza creando uno nuevo.</p>
            </div>
        )}
      </div>

      <BenefitTypeDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={() => router.refresh()}
      />

      <BenefitTypeDialog
        open={!!editingType}
        onOpenChange={(open) => !open && setEditingType(null)}
        benefitType={editingType || undefined}
        onSuccess={() => router.refresh()}
      />

      <DeleteConfirmDialog
        open={!!deletingType}
        onOpenChange={(open) => !open && setDeletingType(null)}
        onConfirm={handleDelete}
        title={`¿Eliminar ${deletingType?.title}?`}
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el tipo de beneficio."
      />
    </div>
  )
}
