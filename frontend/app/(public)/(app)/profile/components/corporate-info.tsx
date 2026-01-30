"use client"

import CustomInput from "@/components/common/input/input"
import { UserProfile } from "@/lib/schemas/responses/users.response"
import { Building2, Briefcase, MessageSquare } from "lucide-react"

interface CorporateInfoProps {
  user: UserProfile
}

export function CorporateInfo({ user }: CorporateInfoProps) {
  return (
    <div className="space-y-6 pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2 border-l-4 border-principal pl-3">
         <h3 className="font-bold text-slate-800">Información Corporativa</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          
          <div className="relative">
                <CustomInput 
                    name="department" 
                    label="Área / Departamento"
                    Icon={Building2}
                    defaultValue={user.position?.area?.name || "Sin Asignar"}
                    readOnly
                />
          </div>
        </div>

        <div className="space-y-2">
           <div className="relative">
             <CustomInput 
                name="position" 
                label="Puesto"
                Icon={Briefcase}
                defaultValue={user.position?.title} 
                readOnly 
             />
           </div>
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <div className="relative">
             <CustomInput 
                name="teamsId" 
                label="Microsoft Teams ID"
                Icon={MessageSquare}
                defaultValue={user.userDetail?.msTeamsId || ""} 
                readOnly  
             />
          </div>
        </div>
      </div>
    </div>
  )
}
