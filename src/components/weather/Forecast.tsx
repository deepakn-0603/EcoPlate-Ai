import type { FC } from 'react';
import { Card } from '@/components/ui/card';
import WeatherIcon from './WeatherIcon';
import type { ForecastData, TemperatureUnit } from '@/types/weather';
import { convertTemperature, getWeekDay } from '@/lib/weather';

interface ForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

const Forecast: FC<ForecastProps> = ({ forecast, unit }) => {
  const dailyForecasts = forecast.list
    .filter((_item, index) => index % 8 === 0) // Get one forecast per day
    .slice(0, 5);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-headline font-bold text-white text-center mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => (
          <Card key={index} className="bg-glass text-white text-center flex flex-col items-center justify-center p-4">
            <p className="font-bold text-lg font-headline">{getWeekDay(day.dt)}</p>
            <WeatherIcon weatherId={day.weather[0].id} className="w-16 h-16 my-2" />
            <p className="text-xl font-bold">{convertTemperature(day.main.temp_max, unit)}°</p>
            <p className="text-gray-300">{convertTemperature(day.main.temp_min, unit)}°</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
