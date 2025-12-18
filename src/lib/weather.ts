import type { WeatherData, TemperatureUnit } from '@/types/weather';

export function convertTemperature(temp: number, unit: TemperatureUnit): number {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
}

export function getWeekDay(dt: number): string {
  const date = new Date(dt * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function getTime(dt: number, timezone: number): string {
    const date = new Date((dt + timezone) * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
}

export function getBackgroundClass(weather: WeatherData): string {
  if (!weather) return 'bg-day-clear';

  const weatherId = weather.weather[0].id;
  const now = Date.now() / 1000;
  const isDay = now > weather.sys.sunrise && now < weather.sys.sunset;
  const prefix = isDay ? 'bg-day-' : 'bg-night-';

  if (weatherId >= 200 && weatherId < 300) return `${prefix}thunderstorm`;
  if (weatherId >= 300 && weatherId < 400) return `${prefix}drizzle`;
  if (weatherId >= 500 && weatherId < 600) return `${prefix}rain`;
  if (weatherId >= 600 && weatherId < 700) return `${prefix}snow`;
  if (weatherId >= 700 && weatherId < 800) return `${prefix}mist`;
  if (weatherId === 800) return `${prefix}clear`;
  if (weatherId > 800) return `${prefix}clouds`;

  return `${prefix}clear`;
}
