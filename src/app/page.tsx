'use client';

import { useSearchParams } from 'next/navigation';

import { SearchBar, CityWeather } from '@/components';

export default function Home() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');

  return (
    <div className="py-3 px-0">
      <div className="text-center mb-4">
        <h1>Weather App</h1>
        <p>Search for a city to get the current weather</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <SearchBar />
          {city && <CityWeather city={city} />}
        </div>
      </div>
    </div>
  );
}
