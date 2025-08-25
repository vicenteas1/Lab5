import { useState } from "react";
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
  const [hourlyWeather, setHourlyWeather] = useState<Series[]>();

  async function handleSearch(localidad: string): Promise<void> {
    try {
      setLoading(true);
      setErr(null);
      setPlace(null);

      const response: ApiResponse = await getGeolocation(localidad);
      const dataResponse: NominatimResult[] = response.data as NominatimResult[];

      if (response.code !== 200 || dataResponse.length === 0) {
        setErr("No se encontró la ciudad.");
        return;
      }

      const result = dataResponse[0];
      setPlace(result.display_name);
      getHourlyTemperatures(result);
    } catch (error: any) {
      setErr(error?.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  async function getHourlyTemperatures(geolocation: NominatimResult): Promise<void> {
    try {
      setLoading(true);
      setErr(null);

      const response: ApiResponse = await getHourlyTemperature(geolocation);
      const dataResponse: Series[] = response.data as Series[];
      console.info(dataResponse);
      setHourlyWeather(dataResponse);
    } catch (error: any) {
      setErr(error?.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section>
        <h1>Pronostico por hora</h1>
        <p>
          Por favor ingrese el nombre de la localidad sobre la cual quiere consultar la informacion.
        </p>
        <InputBuscador onSearch={handleSearch} />
      </section>

      <section className="mt-5">
        {hourlyWeather && hourlyWeather.length ? (
          <HistoricalGraph
            data={hourlyWeather}
            title="Evolución de temperatura (°C) para hoy"
            xAccessor={(d) => new Date(d.x)}
            yAccessor={(d) => d.y}
            yTickFormat={(v) => `${v}°C`}
            tooltipLabelFormat={(label) =>
              typeof label === "string" ? label : ""
            }
            tooltipValueFormat={(v: number) => [`${v} °C`, "Temperatura"]}
            lineColor="#3b82f6"
            showDots={false}
          />
        ) : (
          <p className="mb-0 text-muted">No existe información para mostrar.</p>
          )}
      </section>
      
    </>
  );
}