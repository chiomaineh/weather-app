export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
};

export type DailyWeather = {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weather_code: number[];
};

export type CurrentWeather = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  weather_code: number;
};

export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};
