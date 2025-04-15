import { useEffect, useState } from 'react';

import { getForecastByCity } from '@/lib/weatherApi';
import { ForecastData } from '@/types';

export const useCityForecast = (city: string) => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getForecastByCity(decodeURIComponent(city));
        setForecast(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return { forecast, loading, error };
};
