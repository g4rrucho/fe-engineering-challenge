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
import { Checkbox } from '@/components/ui/checkbox';

type TPokemonDataTableProps = {
  pokemons: TPokemonDataRow[];
  isLoading?: boolean;
  isError?: boolean;
  showCaughtDate?: boolean;
  isSelectionMode?: boolean;
  selectedIDs?: Set<number>;
  onToggleSelection?: (id: number) => void;
  onToggleSelectAll?: () => void;
};

const PokemonDataTable: React.FC<TPokemonDataTableProps> = ({
  pokemons,
  isLoading = false,
  isError = false,
  showCaughtDate = false,
  isSelectionMode = false,
  selectedIDs = new Set(),
  onToggleSelection,
  onToggleSelectAll,
}) => {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {isSelectionMode && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedIDs?.size === pokemons.length &&
                      pokemons.length > 0
                    }
                    onChange={onToggleSelectAll}
                    className="h-4 w-4 cursor-pointer"
                  />
                </TableHead>
              )}
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
            {isSelectionMode && (
              <TableHead className="w-12">
                <Checkbox
                  className="cursor-pointer"
                  checked={
                    selectedIDs?.size === pokemons.length && pokemons.length > 0
                  }
                  onClick={onToggleSelectAll}
                />
              </TableHead>
            )}
            <TableHead className="w-20">ID</TableHead>
            <TableHead className="w-60">Name</TableHead>
            <TableHead className="w-40">Type(s)</TableHead>
            <TableHead className="w-20 text-right">Height</TableHead>
            <TableHead className="w-20 text-right">Weight</TableHead>
            {!showCaughtDate && (
              <TableHead className="w-24 text-center">Status</TableHead>
            )}
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
              showCaughtDate={showCaughtDate}
              isSelectionMode={isSelectionMode}
              isSelected={selectedIDs?.has(pokemon.id)}
              onToggleSelection={onToggleSelection}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PokemonDataTable;
