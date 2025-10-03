export type TFilterState = {
  search: string;
  type: string;
  minHeight: string;
  maxHeight: string;
  sortBy: 'name' | 'height' | 'timestamp' | 'id';
  sortOrder: 'asc' | 'desc';
};
