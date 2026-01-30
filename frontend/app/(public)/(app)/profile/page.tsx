import { ProfileCard } from "./components/profile-card"
import { ProfileForm } from "./components/profile-form"
import { UserProfile } from "@/lib/schemas/responses/users.response"
import { GradientHeader } from "@/components/common/header/gradient-header"
import { Suspense } from "react"
import { getUserProfile } from "@/lib/actions/profile/profile.actions"
import { ProfileSkeleton } from "./components/skeleton/profile-skeleton"

async function ProfileContent() {
  const user = await getUserProfile();

  if (!user) {
    return <div>Error al cargar el perfil</div>; // Manejo de error basico
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start pt-6">
      <div className="xl:col-span-1">
        <ProfileCard user={user} />
      </div>
      <div className="xl:col-span-3">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-[1600px] min-h-screen">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
       <GradientHeader
        title="Mi Perfil"
        subtitle="Gestiona tu información personal y preferencias de cuenta."
        className="py-0"
      />
       
       <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
       </Suspense>
      </div>
    </div>
  )
}