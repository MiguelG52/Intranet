import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface OrganizationListItemProps {
  icon: React.ReactNode
  title: string
  subtitle?: React.ReactNode
  badges?: React.ReactNode
  rightContent?: React.ReactNode
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

export function OrganizationListItem({ icon, title, subtitle, badges, rightContent, onClick, onEdit, onDelete, className }: OrganizationListItemProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative",
        className
      )}
    >
      <div className="flex items-center gap-6">
        <div className="h-16 w-16 flex shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform text-xl font-bold">
          {icon}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {badges}
          </div>
          {subtitle && <div className="text-sm text-gray-500 flex flex-wrap items-center gap-3">{subtitle}</div>}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {rightContent && (
            <div className="text-right shrink-0">
            {rightContent}
            </div>
        )}

        {/* Actions - Visible on Hover */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onEdit && (
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-blue-600" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    <Edit2 className="h-4 w-4" />
                </Button>
            )}
            {onDelete && (
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
      </div>
    </div>
  )
}
