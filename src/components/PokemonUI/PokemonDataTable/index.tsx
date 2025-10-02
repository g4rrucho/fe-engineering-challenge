import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { TPokemonDataRow } from '@/components/PokemonUI/PokemonDataTable/types';
import PokemonDataTableRow from '@/components/PokemonUI/PokemonDataTable/PokemonDataTableRow';

type TPokemonDataTableProps = {
  pokemons: TPokemonDataRow[];
  isLoading?: boolean;
  isError?: boolean;
  showCaughtDate?: boolean;
};

const PokemonDataTable: React.FC<TPokemonDataTableProps> = ({
  pokemons,
  isLoading = false,
  isError = false,
  showCaughtDate = false,
}) => {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead className="w-60">Name</TableHead>
              <TableHead className="w-40">Type(s)</TableHead>
              <TableHead className="w-20 text-right">Height</TableHead>
              <TableHead className="w-20 text-right">Weight</TableHead>
              <TableHead className="w-24 text-center">Status</TableHead>
              {showCaughtDate && (
                <TableHead className="w-32 text-center">Caught</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>{/* Skeleton rows */}</TableBody>
        </Table>
      </div>
    );
  }

  if (isError) return <div>Error loading Pokémon list</div>;
  if (!pokemons.length) return <div>No Pokémon found</div>;

  return (
    <div className="rounded-md border">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead className="w-60">Name</TableHead>
            <TableHead className="w-40">Type(s)</TableHead>
            <TableHead className="w-20 text-right">Height</TableHead>
            <TableHead className="w-20 text-right">Weight</TableHead>
            <TableHead className="w-24 text-center">Status</TableHead>
            {showCaughtDate && (
              <TableHead className="w-32 text-center">Caught</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokemons.map(({ pokemon, caughtAt }) => (
            <PokemonDataTableRow
              key={pokemon.id}
              pokemon={pokemon}
              caughtAt={caughtAt}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PokemonDataTable;
