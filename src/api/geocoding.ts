

type GeocodingResult = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  population?: number;
  feature_code?: string;
};

export type CitySuggestion = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export const getCoordinates = async (city: string) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city,
    )}&count=10&language=en&format=json`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  const data: { results?: GeocodingResult[] } = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const validResult = data.results.find(
    (r: GeocodingResult) =>
      r.feature_code?.startsWith("PPL") || (r.population ?? 0) > 50000,
  );

  if (!validResult) {
    throw new Error("City not found");
  }

  return {
    name: validResult.name,
    country: validResult.country,
    latitude: validResult.latitude,
    longitude: validResult.longitude,
  };
};

export const searchCities = async (
  query: string,
): Promise<CitySuggestion[]> => {
  if (!query.trim()) return [];

 
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
  );

  if (!res.ok) return [];

  const data = await res.json();

  if (!data.results) return [];

  return data.results
    .filter((r: { feature_code?: string }) => r.feature_code?.startsWith("PPL"))
    .slice(0, 5) 
    .map((r: CitySuggestion) => ({
      name: r.name,
      country: r.country,
      latitude: r.latitude,
      longitude: r.longitude,
    }));
};

// Reverse geocoding to get city name from coordinates
export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  try {
    
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    if (!res.ok) {
      throw new Error("Failed to reverse geocode");
    }

    const data = await res.json();

    // Extract city and country from the response
    const city = data.city || data.locality || data.principalSubdivision;
    const country = data.countryName;

    if (city && country) {
      return `${city}, ${country}`;
    } else if (city) {
      return city;
    }

    return "Your location";
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    
    try {
    
      return `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
    } catch {
      return "Your location";
    }
  }
};


