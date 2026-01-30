"use client"

import CustomInput from "@/components/common/input/input"
import { UserProfile } from "@/lib/schemas/responses/users.response"
import { Mail, Phone, Calendar, User } from "lucide-react"

interface PersonalInfoProps {
  user: UserProfile
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 border-l-4 border-principal pl-3">
              <h3 className="font-bold text-slate-800">Información Personal</h3>
           </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="relative">
             <CustomInput 
                name="name" 
                label="Nombre"
                Icon={User}
                defaultValue={user.name} 
                readOnly 
             />
          </div>
        </div>

        <div className="space-y-2">
           <div className="relative">
             <CustomInput 
                name="lastname" 
                label="Apellidos"
                Icon={User}
                defaultValue={user.lastname} 
                readOnly 
             />
           </div>
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <div className="relative">
             <CustomInput 
                name="email" 
                label="Correo Electrónico"
                Icon={Mail}
                defaultValue={user.email} 
                readOnly 
             />
          </div>
        </div>

        <div className="space-y-2">
           <div className="relative">
             <CustomInput 
                name="phone" 
                label="Teléfono"
                Icon={Phone}
                defaultValue={user.userDetail?.phoneNumber || ""} 
                placeholder="+52 ..." 
             />
           </div>
        </div>

        <div className="space-y-2">
           <div className="relative">
             <CustomInput 
                name="birthdate" 
                label="Fecha de Nacimiento"
                type="date"
                Icon={Calendar}
                defaultValue={user.userDetail?.birthdate || ""} 
             />
           </div>
        </div>
      </div>
    </div>
  )
}
