import axios from 'axios';
import type { WeatherData, ForecastData } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch weather for ${city}`);
  }
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`,
    );
    return response.data;
  } catch {
    throw new Error(`Failed to fetch forecast for ${city}`);
  }
};
