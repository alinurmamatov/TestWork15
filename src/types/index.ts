export type MainWeatherInfo = {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
};
export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export type Wind = {
  speed: number;
  deg: number;
};
export type WeatherSys = {
  country: string;
  sunrise: number;
  sunset: number;
};
export type City = {
  id: number;
  name: string;
  country: string;
};
export type ForecastList = {
  dt: number;
  main: MainWeatherInfo;
  weather: Weather[];
  wind: Wind;
  dt_txt: string;
};

export interface WeatherData {
  id: number;
  name: string;
  main: MainWeatherInfo;
  weather: Weather[];
  wind: Wind;
  sys: WeatherSys;
}

export interface ForecastData {
  list: ForecastList[];
  city: City;
}
