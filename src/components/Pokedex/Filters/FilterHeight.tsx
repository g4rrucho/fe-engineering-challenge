import React from 'react';

import { Input } from '@/components/ui/input';
import { TFilterState } from '@/components/Pokedex/Filters';

type TFilterHeightProps = {
  filters: {
    minHeight: TFilterState['minHeight'];
    maxHeight: TFilterState['maxHeight'];
  };
  updateFilters: (
    newFilters: Partial<{ minHeight: string; maxHeight: string }>
  ) => void;
};

const FilterHeight: React.FC<TFilterHeightProps> = ({
  filters,
  updateFilters,
}) => (
  <div className="flex items-center gap-2">
    <Input
      placeholder="Min height"
      type="number"
      value={filters.minHeight}
      onChange={(e) => updateFilters({ minHeight: e.target.value })}
      className="w-28"
    />
    <span className="text-sm text-gray-500">to</span>
    <Input
      placeholder="Max height"
      type="number"
      value={filters.maxHeight}
      onChange={(e) => updateFilters({ maxHeight: e.target.value })}
      className="w-28"
    />
    <span className="text-xs text-gray-400">m</span>
  </div>
);

export default FilterHeight;
