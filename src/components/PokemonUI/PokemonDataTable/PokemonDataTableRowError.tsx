import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

type TPokemonDataTableRowErrorProps = {
  onRetry: () => void;
  message?: string;
};

const PokemonDataTableRowError: React.FC<TPokemonDataTableRowErrorProps> = ({
  onRetry,
  message = 'Error fetching data',
}) => (
  <TableRow>
    <TableCell>{message}</TableCell>
    <TableCell>
      <Button onClick={onRetry}>Retry</Button>
    </TableCell>
  </TableRow>
);

export default PokemonDataTableRowError;
