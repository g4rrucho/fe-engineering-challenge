import { TFilterState } from '@/components/Pokedex/Filters/types';
import { Input } from '@/components/ui/input';
import React from 'react';

type TPokedexFilterNameProps = {
  search: TFilterState['search'];
  updateFilters: (newFilters: Partial<TFilterState>) => void;
};

const PokedexFilterName: React.FC<TPokedexFilterNameProps> = ({
  search,
  updateFilters,
}) => (
  <div className="min-w-48 flex-1">
    <Input
      placeholder="Search by name..."
      value={search}
      onChange={(e) => updateFilters({ search: e.target.value })}
      className="max-w-sm"
    />
  </div>
);

export default PokedexFilterName;
