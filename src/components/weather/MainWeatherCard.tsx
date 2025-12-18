import type { FC } from 'react';
import WeatherIcon from './WeatherIcon';
import type { WeatherData, TemperatureUnit } from '@/types/weather';
import { convertTemperature } from '@/lib/weather';

interface MainWeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const MainWeatherCard: FC<MainWeatherCardProps> = ({ weather, unit }) => {
  return (
    <div className="flex flex-col items-center text-center text-white">
      <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">{weather.name}, {weather.sys.country}</h1>
      <p className="text-lg text-gray-200 mt-1">{weather.weather[0].description}</p>
      
      <div className="my-8 flex items-center">
        <WeatherIcon weatherId={weather.weather[0].id} className="w-24 h-24 md:w-32 md:h-32 text-white" />
        <div className="ml-4">
            <span className="text-7xl md:text-8xl font-bold font-headline">{convertTemperature(weather.main.temp, unit)}</span>
            <span className="text-4xl md:text-5xl align-top font-headline">°{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
