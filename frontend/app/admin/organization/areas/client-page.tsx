'use client'

import { useState, useEffect } from 'react'
import { deleteArea } from '@/lib/actions/organization/organization.actions'
import { Area } from '@/lib/schemas/types/types'
import { OrganizationListItem } from '../components/organization-list-item'
import { Building2, Plus, Search } from 'lucide-react'
import { AreaDialog } from './components/area-dialog'
import { DeleteConfirmDialog } from '../components/delete-confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

interface AreasClientPageProps {
    initialData: Area[]
}

export function AreasClientPage({ initialData }: AreasClientPageProps) {
  const [data, setData] = useState<Area[]>(initialData)
  const [filteredData, setFilteredData] = useState<Area[]>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [editingArea, setEditingArea] = useState<Area | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingArea, setDeletingArea] = useState<Area | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    setData(initialData)
    setFilteredData(
        initialData.filter(item => 
            item.areaName.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  }, [initialData, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
  }

  const onSuccess = () => {
      router.refresh()
  }

  const handleDelete = async () => {
    if (!deletingArea) return
    setIsDeleting(true)
    try {
        const res = await deleteArea(deletingArea.areaId)
        if (res.success) {
            toast.success('Área eliminada correctamente')
            router.refresh()
        } else {
            toast.error(res.message)
        }
    } catch (error) {
        toast.error('Error al eliminar el área')
    } finally {
        setIsDeleting(false)
        setDeletingArea(null)
    }
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            <div className="relative flex-1 md:w-64 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                    placeholder="Buscar áreas..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-9 rounded-xl border-gray-200 bg-white focus:bg-white transition-colors"
                />
            </div>
            <Button 
                onClick={() => setIsCreateOpen(true)}
                className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Área
            </Button>
        </div>

        <div className="space-y-4">
        {filteredData.map(area => (
            <OrganizationListItem
                key={area.areaId}
                icon={<Building2 className="h-8 w-8" />}
                title={area.areaName}
                subtitle={
                    <>
                        {/* <span>Desarrollo de software y sistemas</span> */}
                    </>
                }
                rightContent={
                    <div>
                        <p className="text-2xl font-light text-gray-900">--</p>
                        <p className="text-xs text-gray-500">empleados</p>
                    </div>
                }
                onEdit={() => setEditingArea(area)}
                onDelete={() => setDeletingArea(area)}
            />
        ))}
        {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                No se encontraron áreas.
            </div>
        )}
        </div>

        <AreaDialog 
            open={isCreateOpen || !!editingArea} 
            onOpenChange={(open) => {
                if (!open) {
                    setIsCreateOpen(false)
                    setEditingArea(null)
                }
            }}
            area={editingArea || undefined}
            onSuccess={onSuccess}
        />

        <DeleteConfirmDialog
            open={!!deletingArea}
            onOpenChange={(open) => !open && setDeletingArea(null)}
            onConfirm={handleDelete}
            itemName={deletingArea?.areaName}
            isDeleting={isDeleting}
        />
    </div>
  )
}
