export type TFilterState = {
  search: string;
  type: string;
  sortBy: 'name' | 'height' | 'timestamp' | 'id';
  sortOrder: 'asc' | 'desc';
};

export type TPokedexFiltersProps = {
  onFiltersChange: (filters: TFilterState) => void;
  availableTypes: string[];
};
