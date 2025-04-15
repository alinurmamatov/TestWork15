'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type WeatherStore } from './types';

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      favoritesCities: [],
      addToFavorites: (city) => {
        const { favoritesCities } = get();
        if (!favoritesCities.some((c) => c.id === city.id)) {
          set({ favoritesCities: [...favoritesCities, city] });
        }
      },
      removeFromFavorites: (cityId) => {
        const { favoritesCities } = get();
        set({
          favoritesCities: favoritesCities.filter((city) => city.id !== cityId),
        });
      },
      isFavorite: (cityId) => {
        return get().favoritesCities.some((city) => city.id === cityId);
      },
    }),
    {
      name: 'weather-storage',
    },
  ),
);
