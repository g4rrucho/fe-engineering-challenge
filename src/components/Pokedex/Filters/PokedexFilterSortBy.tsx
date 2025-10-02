import { TFilterState } from '@/components/Pokedex/Filters/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

type TPokedexFilterSortByProps = {
  sortBy: TFilterState['sortBy'];
  updateFilters: (newFilters: Partial<TFilterState>) => void;
};

const PokedexFilterSortBy: React.FC<TPokedexFilterSortByProps> = ({
  sortBy,
  updateFilters,
}) => (
  <Select
    value={sortBy}
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
);

export default PokedexFilterSortBy;
