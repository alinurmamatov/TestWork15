import { type WeatherData } from '@/types';

export interface WeatherStore {
  favoritesCities: WeatherData[];
  addToFavorites: (city: WeatherData) => void;
  removeFromFavorites: (cityId: number) => void;
  isFavorite: (cityId: number) => boolean;
}
