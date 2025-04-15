import type { WeatherData, ForecastData } from '@/types';

export interface CityWeatherProps {
  city: string;
}

export interface ErrorMessageProps {
  message: string;
}

export interface ForecastListProps {
  forecast: ForecastData;
}

export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
}

export interface WeatherCardProps {
  weather: WeatherData;
}
