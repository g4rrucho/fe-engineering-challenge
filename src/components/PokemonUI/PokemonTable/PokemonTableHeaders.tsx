import React from 'react';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

type TPokemonTableHeadersProps = {
  isSelectionMode?: boolean;
  isSelectedAll?: boolean;
  onToggleSelectAll?: () => void;
  showCaughtDate?: boolean;
};

const PokemonTableHeaders: React.FC<TPokemonTableHeadersProps> = ({
  isSelectionMode,
  isSelectedAll,
  onToggleSelectAll,
  showCaughtDate = false,
}) => {
  return (
    <TableHeader>
      <TableRow>
        {isSelectionMode && (
          <TableHead className="w-12">
            <Checkbox
              className="cursor-pointer"
              checked={isSelectedAll}
              onClick={onToggleSelectAll}
            />
          </TableHead>
        )}
        <TableHead className="w-20">ID</TableHead>
        <TableHead className="w-60">Name</TableHead>
        <TableHead className="w-40">Type(s)</TableHead>
        <TableHead className="w-20">Height</TableHead>
        <TableHead className="w-20">Weight</TableHead>
        {!showCaughtDate && (
          <TableHead className="w-24 text-center">Status</TableHead>
        )}
        {showCaughtDate && (
          <TableHead className="w-32 text-center">Caught</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default PokemonTableHeaders;
