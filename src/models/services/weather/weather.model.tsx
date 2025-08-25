export type Weather = {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
};

export type CurrentWeather = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
    time: string;
        interval: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        wind_speed_10m: string;
        weather_code: string;
    },
    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        weather_code: number;
    }
}

export type OpenMeteoHourlyResponse = {
  hourly?: HourlyTemperature;
};

export type HourlyTemperature = {
    time: string[];
    temperature_2m: number[];
};

export type HourlyTemperaturePoint = {
  time: string;
  temperature: number;
};

export type Series = {
    x: string;
    y: number
}