import { WeatherStatsSkeleton } from "../Skeletons/WeatherStatsSkeleton";
import { CurrentWeatherSkeleton } from "../Skeletons/CurrentWeatherSkeleton";
import { HourlyForecastSkeleton } from "../Skeletons/HourlyForecastSkeleton";


export function HomeSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* LEFT */}
        <div className="w-full lg:flex-2">
          <CurrentWeatherSkeleton />
          <WeatherStatsSkeleton />
        </div>

        {/* RIGHT */}
        <aside className="hidden lg:block lg:flex-1">
          <HourlyForecastSkeleton />
        </aside>
      </div>

      {/* <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <DailyForecastSkeleton />
      </div> */}

      <div className="block lg:hidden">
        <HourlyForecastSkeleton />
      </div>
    </>
  );
}
