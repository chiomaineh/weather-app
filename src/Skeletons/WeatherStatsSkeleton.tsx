import Skeleton from "../Components/Skeleton";

export const WeatherStatsSkeleton = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length:4 }).map((_, i)=> (
            <Skeleton key ={i} className="h-20 w-full rounded-xl" />
        ))}
    </div>
)