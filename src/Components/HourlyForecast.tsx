import Drizzle from "../assets/images/icon-drizzle.webp";
import Fog from "../assets/images/icon-fog.webp";
import Overcast from "../assets/images/icon-overcast.webp";
import PartCloud from "../assets/images/icon-partly-cloudy.webp";
import Rain from "../assets/images/icon-rain.webp";
import Storm from "../assets/images/icon-storm.webp";
import Snow from "../assets/images/icon-snow.webp";
import Sunny from "../assets/images/icon-sunny.webp";

import { useEffect, useState } from "react";

type HourlyData = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
};

type Props = {
  hourly: HourlyData;
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
export const HourlyForecast = ({ hourly }: Props) => {
  const [currentHourIndex, setCurrentHourIndex] = useState(0);

  // Update the current hour index every hour
  useEffect(() => {
    const updateHourIndex = () => {
      const now = new Date();
      const index = hourly.time.findIndex((time) => new Date(time) >= now);
      setCurrentHourIndex(index >= 0 ? index : 0); // fallback to 0 if not found
    };

    updateHourIndex(); // initialize

    const interval = setInterval(updateHourIndex, 60 * 1000); // check every minute without refreshing
    return () => clearInterval(interval);
  }, [hourly.time]);

  // Slice the next 8 hours starting from the current hour
  const hours = hourly.time
    .slice(currentHourIndex, currentHourIndex + 8)
    .map((time, i) => ({
      time,
      temp: hourly.temperature_2m[currentHourIndex + i],
      code: hourly.weather_code[currentHourIndex + i],
    }));

  return (
    <div className="unit space-y-4 text-white rounded-md py-5 px-5">
      <h2 className="mb-4 font-semibold">Hourly Forecast</h2>

      {hours.map((hour, i: number) => (
        <div key={hour.time} className="flex items-center justify-between">
          <div className="flex items-center">
            {/* LEFT: Icon */}
            <img
              src={getWeatherIcon(hourly.weather_code[i])}
              alt="Icon"
              className="w-8 h-8"
            />

            {/* MIDDLE: Time */}
            <span className="text-sm opacity-80">
              {new Date(hour.time).toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              })}
            </span>
          </div>

          {/* RIGHT: Temperature */}
          <span className="font-semibold">{Math.round(hour.temp)}°</span>
        </div>
      ))}
    </div>
  );
};
