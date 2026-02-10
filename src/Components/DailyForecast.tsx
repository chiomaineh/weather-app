import Drizzle from "../assets/images/icon-drizzle.webp";
import Fog from "../assets/images/icon-fog.webp";
import Overcast from "../assets/images/icon-overcast.webp";
import PartCloud from "../assets/images/icon-partly-cloudy.webp";
import Rain from "../assets/images/icon-rain.webp";
import Storm from "../assets/images/icon-storm.webp";
import Snow from "../assets/images/icon-snow.webp";
import Sunny from "../assets/images/icon-sunny.webp";

type DailyData = {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weather_code: number[];
};

type Props = {
  daily: DailyData;
};

const getWeatherIcon = (code: number) => {
  if (code === 0) return Sunny;
  if ([1, 2, 3].includes(code)) return PartCloud;
  if ([45, 48].includes(code)) return Fog;
  if ([51, 53, 55, 56, 57].includes(code)) return Drizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return Rain;
  if ([71, 73, 75, 77].includes(code)) return Snow;
  if (code >= 95) return Storm;

  return Overcast;
};

export const DailyForecast = ({ daily }: Props) => {
  return (
    <>
      <div className="text-white">
        <h2 className="mb-4 font-semibold">Daily Forecast</h2>

        <div className="grid grid-cols-3 lg:grid-cols-7 gap-4 overflow-x-auto">
          {daily.time.map((day: string, i: number) => (
            <div key={day} className="unit py-6 rounded-md text-center">
              <p>
                {new Date(day).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <img
                src={getWeatherIcon(daily.weather_code[i])}
                alt="Icon"
                className="mx-auto my-2 w-8 h-8"
              />

              <div className="flex items-center justify-center gap-5">
                <p>{Math.round(daily.temperature_2m_max[i])}°</p>
                <p className="opacity-60">
                  {Math.round(daily.temperature_2m_min[i])}°
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
