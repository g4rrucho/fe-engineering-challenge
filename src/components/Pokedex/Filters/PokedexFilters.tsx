import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  TFilterState,
  TPokedexFiltersProps,
} from '@/components/Pokedex/Filters/types';

const PokedexFilters: React.FC<TPokedexFiltersProps> = ({
  onFiltersChange,
  availableTypes,
}) => {
  const [filters, setFilters] = useState<TFilterState>({
    search: '',
    type: 'all',
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  const updateFilters = (newFilters: Partial<TFilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Search by name */}
        <div className="min-w-64 flex-1">
          <Input
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="max-w-sm"
          />
        </div>

        {/* Filter by type */}
        <Select
          value={filters.type}
          onValueChange={(value) => updateFilters({ type: value })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {availableTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort by */}
        <Select
          value={filters.sortBy}
          onValueChange={(value: TFilterState['sortBy']) =>
            updateFilters({ sortBy: value })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="timestamp">Date Caught</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="height">Height</SelectItem>
            <SelectItem value="id">ID</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort order */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            updateFilters({
              sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
            })
          }
          className="w-20"
        >
          {filters.sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
        </Button>
      </div>
    </div>
  );
};

export default PokedexFilters;
