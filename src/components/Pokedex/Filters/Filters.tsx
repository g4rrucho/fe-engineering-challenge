import React, { useCallback } from 'react';

import { TFilterState } from '@/components/Pokedex/Filters';
import FilterType from '@/components/Pokedex/Filters/FilterType';
import FilterName from '@/components/Pokedex/Filters/FilterName';
import FilterHeight from '@/components/Pokedex/Filters/FilterHeight';
import FilterSortBy from '@/components/Pokedex/Filters/FilterSortBy';
import FilterSortOrder from '@/components/Pokedex/Filters/FilterSortOrder';

type TPokedexFiltersProps = {
  filters: TFilterState;
  onFiltersChange: (filters: TFilterState) => void;
  availableTypes: string[];
};

const Filters: React.FC<TPokedexFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTypes,
}) => {
  const updateFilters = useCallback(
    (newFilters: Partial<TFilterState>) => {
      const updated = { ...filters, ...newFilters };
      onFiltersChange(updated);
    },
    [filters, onFiltersChange]
  );

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <FilterName search={filters.search} updateFilters={updateFilters} />

        <FilterType
          availableTypes={availableTypes}
          type={filters.type}
          updateFilters={updateFilters}
        />

        <FilterHeight
          filters={{
            maxHeight: filters.maxHeight,
            minHeight: filters.minHeight,
          }}
          updateFilters={updateFilters}
        />

        <FilterSortBy sortBy={filters.sortBy} updateFilters={updateFilters} />

        <FilterSortOrder
          sortOrder={filters.sortOrder}
          updateFilters={updateFilters}
        />
      </div>
    </div>
  );
};

export default Filters;
