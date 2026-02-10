import { useState, useEffect } from "react";
import Logo from "../assets/images/logo.svg";
import SearchBar from "./SearchBar";
import { getCoordinates, reverseGeocode } from "../api/geocoding";
import { getWeather } from "../api/weather";
import { CurrentWeatherCard } from "../Components/CurrentWeatherCard.";
import { WeatherStats } from "./WeatherStats";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";
import type { WeatherData } from "../types/weather";
import Error from "../assets/images/icon-error.svg";
import Retry from "../assets/images/icon-retry.svg";
import { HomeSkeleton } from "./HomeSkeleton";
import { getWeatherCondition } from "../utils/WeatherUtils";
import { WeatherParticles } from "../utils/WeatherParticles";

// Weather icon imports
import Drizzle from "../assets/images/icon-drizzle.webp";
import Fog from "../assets/images/icon-fog.webp";
import Overcast from "../assets/images/icon-overcast.webp";
import PartCloud from "../assets/images/icon-partly-cloudy.webp";
import Rain from "../assets/images/icon-rain.webp";
import Storm from "../assets/images/icon-storm.webp";
import Snow from "../assets/images/icon-snow.webp";
import Sunny from "../assets/images/icon-sunny.webp";


const getWeatherIcon = (code: number) => {
  if (code === 0) return Sunny;
  if ([1, 2, 3].includes(code)) return PartCloud;
  if ([45, 48].includes(code)) return Fog;
  if ([51, 53, 55, 56, 57].includes(code)) return Drizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return Rain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return Snow;
  if (code >= 95) return Storm;
  return Overcast;
};

function Home() {

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("Berlin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCity, setLastCity] = useState<string | null>(null);

  const handleSearch = async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);
      setCity(searchCity);
      setLastCity(searchCity);

      const coords = await getCoordinates(searchCity);
      const data = await getWeather(coords.latitude, coords.longitude);

      setCity(`${coords.name}, ${coords.country}`);
      setWeather(data);
    } catch {
      setError("Something went wrong");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);
          const { latitude, longitude } = position.coords;

          const weatherData = await getWeather(latitude, longitude);
          setWeather(weatherData);

          const locationName = await reverseGeocode(latitude, longitude);
          setCity(locationName);
          setLastCity(locationName);
        } catch {
          setError("Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      () => {
        handleSearch("Berlin, Germany");
      },
    );
  }, []);

  // to Get dynamic background and particle effect based on the current weather
  const weatherCondition = weather
    ? getWeatherCondition(weather.current.weather_code)
    : null;

  const backgroundStyle = weatherCondition
    ? {
        background: weatherCondition.gradient,
        minHeight: "100vh",
        transition: "background 1s ease-in-out",
      }
    : {
        background: "linear-gradient(135deg, #868f96 0%, #596164 100%)",
        minHeight: "100vh",
      };

  return (
    <div style={backgroundStyle} className="relative min-h-screen">
      {/* Weather Particles Effect*/}
      {weatherCondition && weatherCondition.particleEffect && (
        <WeatherParticles type={weatherCondition.particleEffect} />
      )}

      <main className="px-5 py-5 lg:px-15 flex flex-col items-center lg:block relative z-10">
        <header className="flex gap-10 justify-between lg:gap-0">
          <div>
            <img src={Logo} alt="Weather Now" className="w-45 h-fit" />
          </div>


        </header>

        <div className="w-full p-6 space-y-6 text-white lg:max-w-6xl lg:mx-auto">
          {loading && !error && <HomeSkeleton />}

          {error && (
            <div className="flex flex-col gap-5 items-center mt-10">
              <img src={Error} alt="Error" className="w-6 h-6" />

              <p className="sky font-bold text-3xl lg:text-5xl">
                Something went wrong
              </p>

              <p>
                We couldn't connect to the server (API Error). Please click the Retry button below, refresh the page or  try again
                in a few moments.
              </p>

              <button
                onClick={() => lastCity && handleSearch(lastCity)}
                className="unit flex items-center gap-2 px-6 py-2 text-white rounded-md font-semibold"
                disabled={!lastCity || loading}
              >
                <img src={Retry} alt="" className="w-4 h-4" />
                Retry
              </button>
            </div>
          )}

          {weather && !loading && !error && (
            <>
              {/* Sky Looking Section with Side Icons */}
              <div className="flex items-center justify-center gap-4 lg:gap-8 mt-15">
                {/* Left Icon */}
                <div className="hidden md:block">
                  <img
                    src={getWeatherIcon(weather.current.weather_code)}
                    alt="Weather"
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain opacity-80 animate-pulse"
                  />
                </div>

                <div className="sky font-bold  flex items-center justify-center text-4xl lg:text-5xl  text-white text-center px-4 lg:-mb-15">
                  How's the sky looking today?
                </div>

                {/* Right Icon */}
                <div className="hidden md:block">
                  <img
                    src={getWeatherIcon(weather.current.weather_code)}
                    alt="Weather"
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain opacity-80 animate-pulse"
                  />
                </div>
              </div>

         
              <div className="flex items-center justify-center gap-4 lg:gap-8">
                {/* Left Icon */}
                <div className="hidden lg:block">
                  <img
                    src={getWeatherIcon(weather.current.weather_code)}
                    alt="Weather"
                    className="w-16 h-16 object-contain opacity-70"
                  />
                </div>

                {/* Center Search Bar */}
                <div className="flex-1 max-w-2xl py-5">
                  <SearchBar onSearch={handleSearch} />
                </div>

                {/* Right Icon */}
                <div className="hidden lg:block">
                  <img
                    src={getWeatherIcon(weather.current.weather_code)}
                    alt="Weather"
                    className="w-16 h-16 object-contain opacity-70"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                {/* Current Weather Card (LEFT)*/}
                <div className="w-full lg:flex-2">
                  <CurrentWeatherCard
                    city={city}
                    temperature={weather.current.temperature_2m}
                    weatherCode={weather.current.weather_code}
                  />

                  <WeatherStats
                    feelsLike={weather.current.apparent_temperature}
                    humidity={weather.current.relative_humidity_2m}
                    wind={weather.current.wind_speed_10m}
                    precipitation={weather.current.precipitation}
                  />
                </div>

                {/* Hourly Forecast (RIGHT)*/}
                <aside className="hidden lg:block lg:flex-1">
                  <HourlyForecast hourly={weather.hourly} />
                </aside>
              </div>

              <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
                <DailyForecast daily={weather.daily} />
              </div>

              <div className="block flex-1 lg:hidden">
                <HourlyForecast hourly={weather.hourly} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
