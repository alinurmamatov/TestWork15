'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useWeatherStore } from '@/lib/store';

import { WeatherCardProps } from './types';

import styles from '@/styles/components/WeatherCard.module.scss';

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useWeatherStore();
  const favorite = isFavorite(weather.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(weather.id);
    } else {
      addToFavorites(weather);
    }
  };

  return (
    <div className={`card ${styles.weatherCard}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">
            {weather.name}, {weather.sys.country}
          </h5>
          <button
            className={`btn btn-sm ${favorite ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={handleFavoriteToggle}>
            {favorite ? '★' : '☆'}
          </button>
        </div>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width={50}
                height={50}
              />
              <h2 className="mb-0">{Math.round(weather.main.temp)}°C</h2>
            </div>
            <p className="text-capitalize">{weather.weather[0].description}</p>
          </div>
          <div className="col-6">
            <p className="mb-1">Feels like: {Math.round(weather.main.feels_like)}°C</p>
            <p className="mb-1">Humidity: {weather.main.humidity}%</p>
            <p className="mb-1">Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
        <div className="mt-3">
          <Link href={`/forecast/${encodeURIComponent(weather.name)}`} className="btn btn-primary">
            See 5-day Forecast
          </Link>
        </div>
      </div>
    </div>
  );
};
