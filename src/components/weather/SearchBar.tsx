'use client';

import { useState, useEffect } from 'react';
import { Search, History, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recentSearches', []);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && query) {
        handleSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query]);

  const handleSearch = () => {
    if (!query) return;
    onSearch(query);
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    setQuery('');
    setIsFocused(false);
  };

  const removeSearch = (searchToRemove: string) => {
    setRecentSearches(recentSearches.filter(s => s !== searchToRemove));
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for any city..."
          className="bg-glass text-white placeholder:text-gray-200 border-white/50 pl-10 h-12 text-lg font-headline rounded-full"
          aria-label="Search for a city"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
        <Button onClick={handleSearch} disabled={isLoading} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-accent hover:bg-accent/80">
          <Search className="h-4 w-4 text-accent-foreground" />
        </Button>
      </div>
      {isFocused && recentSearches.length > 0 && (
        <Card className="absolute top-full mt-2 w-full bg-glass p-2 z-10">
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-white/10 cursor-pointer text-white" >
                <button onClick={() => { onSearch(search); setIsFocused(false); }} className="flex items-center gap-2 w-full text-left">
                    <History className="h-4 w-4" />
                    <span>{search}</span>
                </button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); removeSearch(search);}}>
                    <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
