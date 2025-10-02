import React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';

const PokemonDataTableRowSkeleton: React.FC = () => (
  <TableRow className="h-12">
    <TableCell>
      <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
    </TableCell>
    <TableCell className="flex max-w-60 items-center gap-3">
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300" />
      <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
    </TableCell>
    <TableCell>
      <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
    </TableCell>
    <TableCell>
      <div className="h-4 w-16 animate-pulse rounded bg-gray-300" />
    </TableCell>
    <TableCell>
      <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
    </TableCell>
    <TableCell className="w-24">
      <div className="flex justify-center">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-300" />
      </div>
    </TableCell>
  </TableRow>
);

export default PokemonDataTableRowSkeleton;
