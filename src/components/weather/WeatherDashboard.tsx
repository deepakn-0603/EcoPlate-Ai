'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MainWeatherCard from './MainWeatherCard';
import WeatherDetails from './WeatherDetails';
import Forecast from './Forecast';
import TemperatureToggle from './TemperatureToggle';
import HourlyPrediction from './HourlyPrediction';
import IndianCitySelector from './IndianCitySelector';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getBackgroundClass } from '@/lib/weather';
import type { WeatherData, ForecastData, TemperatureUnit } from '@/types/weather';

const API_KEY = "a3a4b0f01902ed2fc793b5d80d6db502";
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState('London');
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>('tempUnit', 'C');
  const { toast } = useToast();

  useEffect(() => {
    if (!API_KEY) {
      toast({
        title: "API Key Missing",
        description: "OpenWeatherMap API key is not configured. The app may not function correctly.",
        variant: "destructive",
        duration: 9000,
      });
      setIsLoading(false);
      return;
    }
    
    const fetchWeatherData = async () => {
      if (!location) return;
      setIsLoading(true);
      try {
        // Fetch current weather
        const weatherRes = await fetch(`${API_BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
        if (!weatherRes.ok) throw new Error('City not found');
        const weather: WeatherData = await weatherRes.json();
        setWeatherData(weather);

        // Fetch 5-day forecast
        const forecastRes = await fetch(`${API_BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`);
        const forecast: ForecastData = await forecastRes.json();
        setForecastData(forecast);

      } catch (error) {
        toast({
          title: 'Error',
          description: (error as Error).message,
          variant: 'destructive',
        });
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, toast]);

  const backgroundClass = weatherData ? getBackgroundClass(weatherData) : 'bg-day-clear';

  return (
    <div className={`min-h-screen w-full ${backgroundClass} transition-all duration-500`}>
      <div className="flex flex-col items-center p-4 md:p-8 space-y-8">
        <header className="w-full flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-white font-headline">WeatherVision</h1>
            <TemperatureToggle unit={unit} onToggle={setUnit} />
        </header>

        <div className="w-full max-w-md mx-auto space-y-4">
          <SearchBar onSearch={setLocation} isLoading={isLoading} />
          <p className="text-center text-white text-sm">Or select a city in India:</p>
          <IndianCitySelector onSelect={setLocation} />
        </div>
        
        {isLoading && (
          <div className="w-full max-w-6xl space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-12 w-64 bg-white/20" />
              <Skeleton className="h-8 w-48 bg-white/20" />
              <Skeleton className="h-32 w-48 bg-white/20" />
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 bg-white/20" />)}
            </div>
            <div className="grid gap-4 md:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-40 bg-white/20" />)}
            </div>
          </div>
        )}

        {!isLoading && weatherData && forecastData && (
          <div className="w-full max-w-6xl space-y-8">
            <MainWeatherCard weather={weatherData} unit={unit} />
            <WeatherDetails weather={weatherData} unit={unit} />
            <Forecast forecast={forecastData} unit={unit} />
            <HourlyPrediction weather={weatherData} />
          </div>
        )}

        {!isLoading && !weatherData && (
            <div className="text-center text-white mt-20">
                <h2 className="text-2xl font-headline">Welcome to WeatherVision</h2>
                <p>Search for a city or select one from the dropdowns to get the latest weather forecast.</p>
                {!API_KEY && <p className="mt-4 text-red-300">API Key is missing. The app will not function correctly.</p>}
            </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
