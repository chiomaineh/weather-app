

export const getWeather = async (latitude: number, longitude: number) => {
 const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m` +
    `&hourly=temperature_2m,weather_code` +
    `&daily=temperature_2m_min,temperature_2m_max,weather_code` +
    `&timezone=auto`; 


  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
};
