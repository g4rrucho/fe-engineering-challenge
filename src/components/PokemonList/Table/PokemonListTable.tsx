import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TPokemonListItem } from '@/types/api';
import PokemonTableRow from '@/components/PokemonList/Table/PokemonTableRow';
import PokemonDataTableRowSkeleton from '@/components/PokemonUI/PokemonDataTable/PokemonDataTableRowSkeleton';

type TPokemonListTableProps = {
  isLoading: boolean;
  isError: boolean;
  limit?: number;
  pokemons: TPokemonListItem[];
};

const PokemonListTable: React.FC<TPokemonListTableProps> = ({
  isError,
  isLoading,
  limit = 20,
  pokemons,
}) => {
  if (isError) return <div>Error loading Pokémon list</div>;

  return (
    <div className="rounded-md border">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead className="w-60">Name</TableHead>
            <TableHead className="w-40">Type(s)</TableHead>
            <TableHead className="w-20">Height</TableHead>
            <TableHead className="w-20">Weight</TableHead>
            <TableHead className="w-24 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: limit }).map((_, index) => (
                <PokemonDataTableRowSkeleton key={index} />
              ))
            : pokemons.map((pokemon) => (
                <PokemonTableRow key={pokemon.name} pokemon={pokemon} />
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PokemonListTable;
