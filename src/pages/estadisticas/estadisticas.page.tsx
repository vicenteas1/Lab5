import { useEffect, useState } from "react";
import type { Series } from "../../models/services/weather/weather.model";
import type { ApiResponse } from "../../models/apiResponse/apiResponse.model";
import { getGeolocation } from "../../services/geolocation/geolocation.service";
import type { NominatimResult } from "../../models/services/geolocation/geolocation.model";
import { getHourlyTemperature } from "../../services/weather/wheater.service";
import InputBuscador from "../../components/input-search/input-search.component";
import HistoricalGraph from "../../components/historical-graph/historical-graph.component";

export default function Estadisticas() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<Series[] | null>(null);

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
      setHourlyWeather(null);

      const response: ApiResponse = await getGeolocation(localidad);
      const dataResponse = response.data as NominatimResult[];

      if (response.code !== 200 || dataResponse.length === 0) {
        setErr("No se encontró la ciudad.");
        return;
      }

      const result = dataResponse[0];
      setPlace(result.display_name);
      localStorage.setItem("last-city", localidad);

      await getHourlyTemperatures(result);
    } catch (error: any) {
      setErr(error?.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  async function getHourlyTemperatures(geolocation: NominatimResult): Promise<void> {
    try {
      setErr(null);
      const response: ApiResponse = await getHourlyTemperature(geolocation);
      const dataResponse = response.data as Series[];
      setHourlyWeather(dataResponse);
    } catch (error: any) {
      setErr(error?.message ?? "Error inesperado");
    }
  }

  return (
    <>
      <section>
        <h1>Pronóstico por hora</h1>
        <p>Por favor ingrese el nombre de la localidad sobre la cual quiere consultar la información.</p>
        <InputBuscador onSearch={(loc) => setQuery(loc.trim())} />
        {loading && <p className="text-muted mt-2">Cargando datos...</p>}
        {err && <p className="text-danger mt-2">{err}</p>}
        {place && !loading && <p className="mt-2"><strong>{place}</strong></p>}
      </section>

      <section className="mt-5">
        {hourlyWeather && hourlyWeather.length ? (
          <HistoricalGraph
            data={hourlyWeather}
            title="Evolución de temperatura (°C) para hoy"
            xAccessor={(d) => new Date(d.x)}
            yAccessor={(d) => d.y}
            yTickFormat={(v) => `${v}°C`}
            tooltipLabelFormat={(label) => (typeof label === "string" ? label : "")}
            tooltipValueFormat={(v: number) => [`${v} °C`, "Temperatura"]}
            lineColor="#3b82f6"
            showDots={false}
          />
        ) : (
          !loading && <p className="mb-0 text-muted">No existe información para mostrar.</p>
        )}
      </section>
    </>
  );
}
