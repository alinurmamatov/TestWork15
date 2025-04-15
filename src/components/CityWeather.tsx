'use client';

import { useState, useEffect } from 'react';

import { getWeatherByCity } from '@/lib/weatherApi';
import { type WeatherData } from '@/types';

import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { type CityWeatherProps } from './types';
import { WeatherCard } from './WeatherCard';

import styles from '@/styles/components/CityWeather.module.scss';

export const CityWeather = ({ city }: CityWeatherProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getWeatherByCity(city);
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!weather) return null;

  return (
    <div className={styles.cityWeather}>
      <WeatherCard weather={weather} />
    </div>
  );
};
