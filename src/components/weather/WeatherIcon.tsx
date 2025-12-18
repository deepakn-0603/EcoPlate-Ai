import type { FC } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Moon,
  type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps extends LucideProps {
  weatherId: number;
  isDay?: boolean;
}

const WeatherIcon: FC<WeatherIconProps> = ({ weatherId, isDay = true, className, ...props }) => {
  let IconComponent;

  if (weatherId >= 200 && weatherId < 300) {
    IconComponent = CloudLightning;
  } else if (weatherId >= 300 && weatherId < 600) {
    IconComponent = CloudRain;
  } else if (weatherId >= 600 && weatherId < 700) {
    IconComponent = CloudSnow;
  } else if (weatherId >= 700 && weatherId < 800) {
    IconComponent = CloudFog;
  } else if (weatherId === 800) {
    IconComponent = isDay ? Sun : Moon;
  } else if (weatherId > 800) {
    IconComponent = Cloud;
  } else {
    IconComponent = Wind;
  }

  return <IconComponent className={cn('animate-float', className)} {...props} />;
};

export default WeatherIcon;
