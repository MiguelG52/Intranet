// components/profile-skeleton.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
      <div className="lg:col-span-1">
        <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center pt-8 pb-8 space-y-6">
            <div className="relative">
               <Skeleton className="h-32 w-32 rounded-full" />
               <Skeleton className="absolute bottom-0 right-0 h-8 w-8 rounded-full" />
            </div>

            <div className="space-y-2 w-full flex flex-col items-center">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="w-full space-y-4 px-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="w-full pt-4 border-t border-slate-100 space-y-4">
               <Skeleton className="h-6 w-full" />
               <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
         <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
               <div className="space-y-6">
                    <Skeleton className="h-8 w-1/3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
               </div>

               <div className="space-y-6 pt-6 border-t border-slate-100">
                    <Skeleton className="h-8 w-1/3" />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
               </div>
               
               <div className="flex justify-end gap-3 pt-6">
                   <Skeleton className="h-10 w-24 rounded-full" />
                   <Skeleton className="h-10 w-32 rounded-full" />
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
