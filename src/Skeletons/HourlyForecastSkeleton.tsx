import Skeleton from "../Components/Skeleton";

export const HourlyForecastSkeleton = () => (
    <div className="unit space-y-4 p-4">
        {Array.from({ length:6 }).map((_, i) => (
            <Skeleton key = {i} className="h-6 w-full" />
        ))}
    </div>
)

