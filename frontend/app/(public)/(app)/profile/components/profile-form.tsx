import { Card, CardContent } from "@/components/ui/card"
import { PersonalInfo } from "./personal-info"
import { CorporateInfo } from "./corporate-info"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/lib/schemas/responses/users.response"
import { Save } from "lucide-react"

interface ProfileFormProps {
  user: UserProfile
}

export function ProfileForm({ user }: ProfileFormProps) {
  return (
    <form className="space-y-6 max-w-5xl">
       <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
         <CardContent className="p-6 md:p-8 space-y-8">
            <PersonalInfo user={user} />
            <CorporateInfo user={user} />
         </CardContent>
       </Card>
       
       <div className="flex justify-end gap-3 pt-2">
         <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm inline-flex flex-row p-2">
             <Button variant="ghost" className="rounded-full px-6 h-10 text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">
               Cancelar
             </Button>
             <Button className="rounded-full px-6 h-10 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200 font-medium transition-all hover:scale-105 active:scale-95 ml-2 cursor-pointer">
               <Save className="w-4 h-4 mr-2" />
               Guardar Cambios
             </Button>
         </Card>
       </div>
    </form>
  )
}
