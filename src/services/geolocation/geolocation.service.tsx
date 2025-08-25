import { environment } from "../../config/environment/environment";
import type { ApiResponse } from "../../models/apiResponse/apiResponse.model";
import type { NominatimResult } from "../../models/services/geolocation/geolocation.model";

const nominatimApi = environment.nominatimApi.url;

export async function getGeolocation(city: string): Promise<ApiResponse> {
  const apiResponse: ApiResponse = {
    code: 404,
    message: "Not Found",
    data: [],
  };

  try {
    const params = new URLSearchParams({
      q: city,
      format: "json",
      addressdetails: "0",
      limit: "1",
    });
    const url = `${nominatimApi}/search?${params.toString()}`;

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "es",
        "User-Agent": "WeatherApp/1.0 (contacto@tudominio.com)",
      },
    });

    if (!res.ok) {
      apiResponse.message = `Error HTTP: ${res.status}`;
      return apiResponse;
    }

    const data: NominatimResult[] = await res.json();
    apiResponse.code = 200;
    apiResponse.data = data;
    apiResponse.message = "Ok";
    return apiResponse;
  } catch (err: any) {
    apiResponse.message = err?.message ?? "Error inesperado";
    return apiResponse;
  }
}
