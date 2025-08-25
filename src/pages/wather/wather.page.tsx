import { useEffect, useState } from "react";
import InputBuscador from "../../components/input-search/input-search.component";
import { getGeolocation } from "../../services/geolocation/geolocation.service";
import type { ApiResponse } from "../../models/apiResponse/apiResponse.model";
import type { NominatimResult } from "../../models/services/geolocation/geolocation.model";
import { getCurrentWeather } from "../../services/weather/wheater.service";
import type { Weather } from "../../models/services/weather/weather.model";
import Card from "../../components/card/card.component";

export default function Weather() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    const last = localStorage.getItem("last-city");
    if (last) setQuery(last);
  }, []);

  useEffect(() => {
    if (!query) return;
    handleSearch(query);
  }, [query]);

  async function handleSearch(localidad: string): Promise<void> {
    try {
      setLoading(true);
      setErr(null);
      setPlace(null);
      setWeather(null);

      const response: ApiResponse = await getGeolocation(localidad);
      const dataResponse = response.data as NominatimResult[];

      if (response.code !== 200 || dataResponse.length === 0) {
        setErr("No se encontró la ciudad.");
        return;
      }

      const result = dataResponse[0];
      setPlace(result.display_name);
      localStorage.setItem("last-city", localidad);

      await getWeather(result);
    } catch (error: any) {
      setErr(error?.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  async function getWeather(geolocation: NominatimResult): Promise<void> {
    try {
      setErr(null);
      const response: ApiResponse = await getCurrentWeather(geolocation);
      const dataResponse = response.data as Weather;
      setWeather(dataResponse);
    } catch (error: any) {
      setErr(error?.message ?? "Error inesperado");
    }
  }

  return (
    <>
      <section>
        <h1>¿Cómo está el clima hoy?</h1>
        <p>
          Por favor ingrese el nombre de la localidad sobre la cual quiere consultar el clima.
        </p>
        <InputBuscador onSearch={handleSearch} />
      </section>

      <section className="mt-5">
        <Card
          title={place ?? "Clima actual"}
          subtitle={weather ? new Date(weather.time).toLocaleString() : undefined}
          loading={loading}
          error={err}
          variant="default"
        >
          {weather ? (
            <div className="d-flex flex-wrap gap-4 align-items-center">
              <div>Temperatura: <strong>{weather.temperature} °C</strong></div>
              <div>Humedad: <strong>{weather.humidity}%</strong></div>
              <div>Velocidad del viento: <strong>{weather.windSpeed} km/h</strong></div>
            </div>
          ) : (
            <p className="mb-0 text-muted">Busca una ciudad para ver su clima.</p>
          )}
        </Card>
      </section>
      
    </>
  );
}
