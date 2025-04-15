'use client';

import Image from 'next/image';

import { type ForecastListProps } from './types';

import styles from '@/styles/components/ForecastList.module.scss';

export const ForecastList = ({ forecast }: ForecastListProps) => {
  const groupedByDay = forecast.list.reduce(
    (acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, typeof forecast.list>,
  );

  return (
    <div className={styles.forecastList}>
      <h2>5-Day Forecast for {forecast.city.name}</h2>
      {Object.entries(groupedByDay).map(([date, items]) => (
        <div key={date} className="card mb-3">
          <div className="card-header">
            <h3>{date}</h3>
          </div>
          <div className="card-body">
            <div className="row">
              {items.map((item) => (
                <div key={item.dt} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        {new Date(item.dt * 1000).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </h5>
                      <div className="d-flex align-items-center">
                        <Image
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt={item.weather[0].description}
                          width={30}
                          height={30}
                        />
                        <span className="fs-4">{Math.round(item.main.temp)}°C</span>
                      </div>
                      <p className="text-capitalize">{item.weather[0].description}</p>
                      <p className="mb-1">Humidity: {item.main.humidity}%</p>
                      <p className="mb-0">Wind: {item.wind.speed} m/s</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
