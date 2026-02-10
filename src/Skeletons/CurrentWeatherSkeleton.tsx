import Skeleton from "../Components/Skeleton";

export const CurrentWeatherSkeleton = () => (
     <div className="relative w-full rounded-xl p-6 bg-white/10">
    <Skeleton className="h-4 w-24 mb-2" />
    <Skeleton className="h-3 w-32 mb-6" />

    <div className="flex justify-between items-center">
      <Skeleton className="h-16 w-20" />
      <Skeleton className="h-20 w-20 rounded-full" />
    </div>
  </div>
)