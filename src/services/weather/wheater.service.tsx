import { environment } from "../../config/environment/environment";
import type { ApiResponse } from "../../models/apiResponse/apiResponse.model";
import type { NominatimResult } from "../../models/services/geolocation/geolocation.model";
import type { CurrentWeather, OpenMeteoHourlyResponse, Series, Weather } from "../../models/services/weather/weather.model";

const openMeteoApi = environment.weatherApi.url;

export async function getCurrentWeather(geolocation: NominatimResult ): Promise<ApiResponse> {
  const apiResponse: ApiResponse = {
    code: 404,
    message: "Not Found",
    data: null,
  };

  try {
    const params = new URLSearchParams({
      latitude: geolocation.lat,
      longitude: geolocation.lon,
      current:
        "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
      timezone: "auto",
      wind_speed_unit: "kmh",
    });

    const url = `${openMeteoApi}?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      apiResponse.message = `Error HTTP: ${res.status}`;
      return apiResponse;
    }

    const response: CurrentWeather = await res.json();
    let data: Weather = {
      time: '',
      temperature: 0,
      humidity: 0,
      windSpeed: 0,
      weatherCode: 0
    };

    if (!response.current) {
      apiResponse.message = "No hay datos de clima actual en la respuesta.";
      apiResponse.code = 404;
      return apiResponse;
    };

    data.time = response.current.time;
    data.temperature = response.current.temperature_2m;
    data.humidity = response.current.relative_humidity_2m;
    data.windSpeed = response.current.wind_speed_10m;
    data.weatherCode = response.current.weather_code;

    apiResponse.code = 200;
    apiResponse.message = "Ok";
    apiResponse.data = data;
    return apiResponse;

  } catch (err: any) {
    apiResponse.message = err?.message ?? "Error inesperado";
    return apiResponse;
  }


}

export async function getHourlyTemperature(
  geolocation: NominatimResult
): Promise<ApiResponse> {
  const apiResponse: ApiResponse = {
    code: 404,
    message: "Not Found",
    data: [],
  };

  try {
    const params = new URLSearchParams({
      latitude: geolocation.lat,
      longitude: geolocation.lon,
      hourly: "temperature_2m",
      timezone: "auto",
      past_days: "0",
      forecast_days: "1",
    });

    const url = `${openMeteoApi}?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      apiResponse.message = `Error HTTP: ${res.status}`;
      return apiResponse;
    }

    const json: OpenMeteoHourlyResponse = await res.json();

    if (!json.hourly || !json.hourly.time?.length) {
      apiResponse.message = "No hay datos horarios en la respuesta.";
      return apiResponse;
    }

    const series: Series[] = json.hourly.time.map((t, i) => ({
      x: t,
      y: json.hourly!.temperature_2m[i],
    }));

    apiResponse.code = 200;
    apiResponse.message = "Ok";
    apiResponse.data = series;
    return apiResponse;
  } catch (err: any) {
    apiResponse.message = err?.message ?? "Error inesperado";
    return apiResponse;
  }
}
