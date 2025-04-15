'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ForecastList, LoadingSpinner, ErrorMessage } from '@/components';

import { useCityForecast } from './hooks';

export default function ForecastPage() {
  const params = useParams();
  const city = params.city as string;

  const { error, forecast, loading } = useCityForecast(city);

  return (
    <div className="py-3 px-0">
      <div className="mb-3">
        <Link href="/" className="btn btn-outline-primary">
          &larr; Back to Search
        </Link>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : forecast ? (
        <ForecastList forecast={forecast} />
      ) : null}
    </div>
  );
}
