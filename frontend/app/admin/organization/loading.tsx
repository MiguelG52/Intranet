import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-white/50 p-8 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        {/* Cards Skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    </div>
  )
}
