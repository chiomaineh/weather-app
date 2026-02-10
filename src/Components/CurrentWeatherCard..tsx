import BgToday from "../assets/images/bg-today-large.svg";
import BgMobile from "../assets/images/bg-today-small.svg";
import Drizzle from "../assets/images/icon-drizzle.webp";
import Fog from "../assets/images/icon-fog.webp";
import Overcast from "../assets/images/icon-overcast.webp";
import PartCloud from "../assets/images/icon-partly-cloudy.webp";
import Rain from "../assets/images/icon-rain.webp";
import Storm from "../assets/images/icon-storm.webp";
import Snow from "../assets/images/icon-snow.webp";
import Sunny from "../assets/images/icon-sunny.webp";

import { getWeatherCondition } from "../utils/WeatherUtils";

type Props = {
  city: string;
  temperature: number;
  weatherCode: number;
 
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

export const CurrentWeatherCard = ({
  city,
  temperature,
  weatherCode,
 
}: Props) => {
  const WeatherCondition = getWeatherCondition(weatherCode);
  const weatherIcon = getWeatherIcon(weatherCode)
  return (
    <>
      <div className="relative w-full ">
        <img
          src={BgToday}
          alt=""
          className="hidden lg:block w-full rounded-xl object-cover"
        />
        <img
          src={BgMobile}
          alt=""
          className=" w-full rounded-xl object-cover lg:hidden"
        />

        <div className="absolute inset-0 p-6 text-white flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-base lg:text-xl"> {city} </p>
            <p className="text-xs">{new Date().toDateString()}</p>

            <p className="text-lg font-semibold text-blue-300">
              {WeatherCondition.description}
            </p>
          </div>
          <img
            src={weatherIcon}
            alt={WeatherCondition.description}
            className="w-30 h-30"
          />

          <div className="flex flex-col items-end">
            <span className="temp text-5xl font-bold lg:text-6xl">
              {Math.round(temperature)}°
            </span>
            {/* Weather Icon */}
            <p className="hidden">{weatherCode}</p>
          </div>
        </div>
      </div>
    </>
  );
};
