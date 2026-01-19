'use client'

import { useState, useEffect } from 'react'
import { deletePosition } from '@/lib/actions/organization/organization.actions'
import { Position, Area } from '@/lib/schemas/types/types'
import { OrganizationListItem } from '../components/organization-list-item'
import { Briefcase, Plus, Search } from 'lucide-react'
import { AdminPageHeader } from '@/components/common/header/admin-page-header'
import { PositionDialog } from './position-dialog'
import { DeleteConfirmDialog } from '../components/delete-confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface PositionsClientPageProps {
    initialData: Position[]
    areas: Area[]
}

export function PositionsClientPage({ initialData, areas }: PositionsClientPageProps) {
  const [data, setData] = useState<Position[]>(initialData)
  const [filteredData, setFilteredData] = useState<Position[]>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  const [areaMap, setAreaMap] = useState<Record<string, string>>({})
  
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingPosition, setDeletingPosition] = useState<Position | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    const map: Record<string, string> = {}
    areas.forEach(area => {
        map[area.areaId] = area.areaName
    })
    setAreaMap(map)
  }, [areas])

  useEffect(() => {
    setData(initialData)
    setFilteredData(
        initialData.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (!deletingPosition) return
    setIsDeleting(true)
    try {
        const res = await deletePosition(deletingPosition.positionId)
        if (res.success) {
            toast.success('Cargo eliminado correctamente')
            router.refresh()
        } else {
            toast.error(res.message)
        }
    } catch (error) {
        toast.error('Error al eliminar el cargo')
    } finally {
        setIsDeleting(false)
        setDeletingPosition(null)
    }
  }

  return (
    <div className="space-y-6">
        <AdminPageHeader
            searchPlaceholder="Buscar cargos..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            addButtonText="Agregar Cargo"
            onAddClick={() => setIsCreateOpen(true)}
        />

        <div className="space-y-4">
        {filteredData.map(pos => (
            <OrganizationListItem
                key={pos.positionId}
                icon={<Briefcase className="h-8 w-8" />}
                title={pos.title}
                badges={
                    <>
                        {areaMap[pos.areaId] && (
                            <Badge variant="outline" className="text-gray-500 border-gray-200">
                                {areaMap[pos.areaId]}
                            </Badge>
                        )}
                    </>
                }
                rightContent={
                    <div>
                        <p className="text-2xl font-light text-gray-900">--</p>
                        <p className="text-xs text-gray-500">empleados</p>
                    </div>
                }
                onEdit={() => setEditingPosition(pos)}
                onDelete={() => setDeletingPosition(pos)}
            />
        ))}
        {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                No se encontraron cargos.
            </div>
        )}
        </div>

        <PositionDialog 
            open={isCreateOpen || !!editingPosition} 
            onOpenChange={(open) => {
                if (!open) {
                    setIsCreateOpen(false)
                    setEditingPosition(null)
                }
            }}
            position={editingPosition || undefined}
            onSuccess={onSuccess}
        />

        <DeleteConfirmDialog
            open={!!deletingPosition}
            onOpenChange={(open) => !open && setDeletingPosition(null)}
            onConfirm={handleDelete}
            itemName={deletingPosition?.title}
            isDeleting={isDeleting}
        />
    </div>
  )
}
