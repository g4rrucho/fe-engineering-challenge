import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

type TPokemonTableRowErrorProps = {
  onRetry: () => void;
  message?: string;
};

const PokemonTableRowError: React.FC<TPokemonTableRowErrorProps> = ({
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

export default PokemonTableRowError;
