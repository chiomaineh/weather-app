// Weather code mappings and utilities

export type WeatherCondition = {
  description: string;
  backgroundColor: string;
  gradient: string;
  particleEffect?: "rain" | "snow" | "clouds" | "none";
};

// Map WMO weather codes to user-friendly descriptions and backgrounds
export const getWeatherCondition = (code: number): WeatherCondition => {
  // Clear sky
  if (code === 0) {
    return {
      description: "Clear Sky",
      backgroundColor: "#1e3a8a",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      particleEffect: "none",
    };
  }

  // Mainly clear
  if (code === 1) {
    return {
      description: "Mainly Clear",
      backgroundColor: "#1e40af",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      particleEffect: "clouds",
    };
  }

  // Partly cloudy
  if (code === 2) {
    return {
      description: "Partly Cloudy",
      backgroundColor: "#475569",
      gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      particleEffect: "clouds",
    };
  }

  // Overcast
  if (code === 3) {
    return {
      description: "Overcast",
      backgroundColor: "#374151",
      gradient: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
      particleEffect: "clouds",
    };
  }

  // Fog
  if (code >= 45 && code <= 48) {
    return {
      description: "Foggy",
      backgroundColor: "#6b7280",
      gradient: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
      particleEffect: "clouds",
    };
  }

  // Drizzle
  if (code >= 51 && code <= 57) {
    return {
      description: "Drizzle",
      backgroundColor: "#475569",
      gradient: "linear-gradient(135deg, #525252 0%, #3d72b4 100%)",
      particleEffect: "rain",
    };
  }

  // Rain (light to moderate)
  if (code >= 61 && code <= 65) {
    return {
      description: code === 61 ? "Light Rain" : code === 63 ? "Moderate Rain" : "Heavy Rain",
      backgroundColor: "#1e293b",
      gradient: "linear-gradient(135deg, #1c92d2 0%, #f2fcfe 100%)",
      particleEffect: "rain",
    };
  }

  // Freezing rain
  if (code >= 66 && code <= 67) {
    return {
      description: "Freezing Rain",
      backgroundColor: "#1e293b",
      gradient: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      particleEffect: "rain",
    };
  }

  // Snow (light to heavy)
  if (code >= 71 && code <= 77) {
    return {
      description: code === 71 ? "Light Snow" : code === 73 ? "Moderate Snow" : "Heavy Snow",
      backgroundColor: "#475569",
      gradient: "linear-gradient(135deg, #e6dada 0%, #274046 100%)",
      particleEffect: "snow",
    };
  }

  // Rain showers
  if (code >= 80 && code <= 82) {
    return {
      description: "Rain Showers",
      backgroundColor: "#1e293b",
      gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      particleEffect: "rain",
    };
  }

  // Snow showers
  if (code >= 85 && code <= 86) {
    return {
      description: "Snow Showers",
      backgroundColor: "#475569",
      gradient: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
      particleEffect: "snow",
    };
  }

  // Thunderstorm
  if (code >= 95 && code <= 99) {
    return {
      description: code === 95 ? "Thunderstorm" : "Severe Thunderstorm",
      backgroundColor: "#0f172a",
      gradient: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      particleEffect: "rain",
    };
  }

  // Default fallback
  return {
    description: "Unknown",
    backgroundColor: "#1f2937",
    gradient: "linear-gradient(135deg, #868f96 0%, #596164 100%)",
    particleEffect: "none",
  };
};

// Get weather icon/emoji based on code (optional, for future use)
export const getWeatherIcon = (code: number): string => {
  if (code === 0) return "☀️";
  if (code === 1) return "🌤️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 86) return "🌦️";
  if (code >= 95 && code <= 99) return "⛈️";
  return "🌡️";
};

// Time-based background adjustments (day vs night)
export const adjustForTimeOfDay = (gradient: string, isNight: boolean): string => {
  if (isNight) {
    // Make backgrounds darker at night
    return gradient
      .replace(/#1e40af/g, "#1e293b")
      .replace(/#3b82f6/g, "#334155")
      .replace(/#60a5fa/g, "#475569");
  }
  return gradient;
};