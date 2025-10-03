import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TFilterState } from '@/components/Pokedex/Filters';

type TPokedexFilterTypeProps = {
  type: TFilterState['type'];
  updateFilters: (newFilters: Partial<TFilterState>) => void;
  availableTypes: string[];
};

const PokedexFilterType: React.FC<TPokedexFilterTypeProps> = ({
  type,
  updateFilters,
  availableTypes,
}) => (
  <Select
    value={type}
    onValueChange={(value) => updateFilters({ type: value })}
  >
    <SelectTrigger className="w-28">
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
);

export default PokedexFilterType;
