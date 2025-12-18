import type { FC } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { TemperatureUnit } from '@/types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

const TemperatureToggle: FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="temp-toggle" className="text-primary-foreground font-medium">°C</Label>
      <Switch
        id="temp-toggle"
        checked={unit === 'F'}
        onCheckedChange={(checked) => onToggle(checked ? 'F' : 'C')}
        aria-label="Toggle temperature unit"
      />
      <Label htmlFor="temp-toggle" className="text-primary-foreground font-medium">°F</Label>
    </div>
  );
};

export default TemperatureToggle;
