import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Sunrise, Sunset, Gauge } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '@/types/weather';
import { convertTemperature, getTime } from '@/lib/weather';

interface WeatherDetailsProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const DetailCard: FC<{ icon: React.ReactNode; title: string; value: string | number; unit?: string }> = ({ icon, title, value, unit }) => (
  <Card className="bg-glass text-white shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-200">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold font-headline">
        {value}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </div>
    </CardContent>
  </Card>
);

const WeatherDetails: FC<WeatherDetailsProps> = ({ weather, unit }) => {
  const details = [
    {
      icon: <Thermometer className="h-4 w-4 text-gray-200" />,
      title: "Feels Like",
      value: convertTemperature(weather.main.feels_like, unit),
      unit: `°${unit}`,
    },
    {
      icon: <Droplets className="h-4 w-4 text-gray-200" />,
      title: "Humidity",
      value: weather.main.humidity,
      unit: "%",
    },
    {
      icon: <Wind className="h-4 w-4 text-gray-200" />,
      title: "Wind Speed",
      value: weather.wind.speed.toFixed(1),
      unit: 'm/s',
    },
    {
      icon: <Gauge className="h-4 w-4 text-gray-200" />,
      title: "Pressure",
      value: weather.main.pressure,
      unit: "hPa",
    },
    {
      icon: <Sunrise className="h-4 w-4 text-gray-200" />,
      title: "Sunrise",
      value: getTime(weather.sys.sunrise, weather.timezone),
      unit: "",
    },
    {
      icon: <Sunset className="h-4 w-4 text-gray-200" />,
      title: "Sunset",
      value: getTime(weather.sys.sunset, weather.timezone),
      unit: "",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 w-full max-w-6xl mx-auto">
      {details.map((detail) => (
        <DetailCard key={detail.title} {...detail} />
      ))}
    </div>
  );
};

export default WeatherDetails;
