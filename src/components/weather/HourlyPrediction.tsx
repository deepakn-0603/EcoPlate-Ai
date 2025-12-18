'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { hourlyWeatherPrediction } from '@/ai/flows/hourly-weather-prediction';
import type { WeatherData } from '@/types/weather';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HourlyPredictionProps {
  weather: WeatherData | null;
}

const HourlyPrediction: React.FC<HourlyPredictionProps> = ({ weather }) => {
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePrediction = async () => {
    if (!weather) {
      toast({
        title: 'No weather data',
        description: 'Please search for a location first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setPrediction('');
    try {
      const result = await hourlyWeatherPrediction({
        city: weather.name,
        currentWeather: `${weather.weather[0].description}, ${weather.main.temp}°C`,
        historicalWeatherData: 'Similar days had scattered clouds in the morning, clearing by noon.',
      });
      setPrediction(result.hourlyForecast);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Prediction Failed',
        description: 'Could not generate AI-powered hourly forecast.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-8">
      <Button onClick={handlePrediction} disabled={isLoading} size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-full shadow-lg transition-transform hover:scale-105">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            AI Hourly Forecast
          </>
        )}
      </Button>
      {prediction && (
        <Card className="bg-glass text-white w-full max-w-md">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Wand2 size={20} /> AI Forecast</CardTitle>
                <CardDescription className="text-gray-200">Likely conditions for the current hour.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-lg">{prediction}</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HourlyPrediction;
