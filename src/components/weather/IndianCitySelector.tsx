'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { indianStatesAndCities } from '@/lib/indian-cities';
import { Card } from '../ui/card';

interface IndianCitySelectorProps {
  onSelect: (city: string) => void;
}

const IndianCitySelector: React.FC<IndianCitySelectorProps> = ({ onSelect }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleApply = () => {
    if (selectedCity && selectedState) {
      onSelect(`${selectedCity},${selectedState},IN`);
    }
  };

  return (
    <Card className="bg-glass text-white p-4 w-full max-w-md mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">State</label>
          <Select onValueChange={handleStateChange}>
            <SelectTrigger className="w-full bg-white/20 border-white/30 rounded-md h-10">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(indianStatesAndCities).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">City</label>
          <Select onValueChange={handleCityChange} disabled={!selectedState}>
            <SelectTrigger className="w-full bg-white/20 border-white/30 rounded-md h-10">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {selectedState &&
                indianStatesAndCities[selectedState as keyof typeof indianStatesAndCities].map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleApply} disabled={!selectedCity} className="w-full md:w-auto bg-accent hover:bg-accent/80 text-accent-foreground h-10">
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IndianCitySelector;
