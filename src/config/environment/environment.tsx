export const environment = {
  environment: {
    production: false,
    development: true,
    certification: false,
  },
  weatherApi: {
    url:
      import.meta.env.VITE_WEATHER_API_URL || "https://api.open-meteo.com/v1/forecast",
    key: import.meta.env.VITE_WEATHER_API_KEY || "",
  },
  nominatimApi: {
    url:
      import.meta.env.VITE_NOMINATIM_API_URL || "https://nominatim.openstreetmap.org",
    key: import.meta.env.VITE_WEATHER_API_KEY || "",
  },
};
