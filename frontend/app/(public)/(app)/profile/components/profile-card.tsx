import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserProfile } from "@/lib/schemas/responses/users.response"
import { Pencil, Globe, Briefcase, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileCardProps {
  user: UserProfile
}

export function ProfileCard({ user }: ProfileCardProps) {
  const fullName = `${user.name} ${user.lastname}`
  const initials = `${user.name[0]}${user.lastname[0]}`

  return (
    <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="flex flex-col items-center pt-8 pb-8 space-y-6">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src={user.userDetail?.profilePicture || ""} alt={fullName} />
            <AvatarFallback className="text-2xl bg-slate-100 text-slate-600 font-bold">{initials}</AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md bg-white hover:bg-gray-50 text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-slate-900">{fullName}</h2>
          <p className="text-sm font-medium text-slate-500">{user.position?.title || "Sin Puesto Asignado"}</p>
        </div>

        <div className="w-full space-y-4 px-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 text-slate-600">
               <Briefcase className="h-4 w-4 text-primary" />
               <span className="text-sm font-medium">Rol</span>
            </div>
            <Badge variant="secondary" className="bg-red-50 text-primary hover:bg-red-100 font-normal">
              {user.role.roleName}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
             <div className="flex items-center gap-2 text-slate-600">
               <Globe className="h-4 w-4 text-primary" />
               <span className="text-sm font-medium">País</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">{user.country?.name}</span>
            </div>
          </div>
        </div>

        <div className="w-full pt-4 border-t border-slate-100">
           <div className="flex items-center justify-between px-4 text-sm">
              <span className="text-slate-500">Estado</span>
              <div className="flex items-center gap-1.5 text-green-600 font-medium bg-green-50 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
                {user.isActive ? "Activo" : "Inactivo"}
              </div>
           </div>
           
           {/* <div className="flex items-center justify-between px-4 mt-3 text-sm">
              <span className="text-slate-500">Último acceso</span>
              <span className="font-medium text-slate-700">Hoy, 09:41 AM</span> 
           </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
