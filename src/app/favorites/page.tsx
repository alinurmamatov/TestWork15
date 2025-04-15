'use client';

import { useWeatherStore } from '@/lib/store';

import { WeatherCard } from '@/components';

export default function FavoritesPage() {
  const { favoritesCities } = useWeatherStore();

  return (
    <div className="py-3 px-0">
      <h1 className="mb-4">Your Favorite Cities</h1>
      {favoritesCities.length === 0 ? (
        <div className="alert alert-info">
          You haven&apos;t added any cities to your favorites yet. Search for cities and add them to
          your favorites.
        </div>
      ) : (
        <div className="row">
          {favoritesCities.map((city) => (
            <div key={city.id} className="col-md-6 mb-4">
              <WeatherCard weather={city} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
