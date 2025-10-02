import React from 'react';
import { Link } from 'react-router-dom';

import { TPokemonListItem } from '@/types/api';
import usePokemon from '@/hooks/usePokemon';
import usePokedex from '@/hooks/usePokedex';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import PokemonTableRowSkeleton from '@/components/Pokemon/PokemonTable/PokemonTableRowSkeleton';

const PokemonTableRow: React.FC<{ pokemon: TPokemonListItem }> = ({
  pokemon,
}) => {
  const { data, isError, isLoading, refetch } = usePokemon(
    pokemon.id || pokemon.name
  );
  const { isCaught } = usePokedex();

  const onRefetch = () => {
    void refetch();
  };

  if (isLoading) {
    return <PokemonTableRowSkeleton key={`pokemon-${pokemon.id}`} />;
  }

  if (!data || isError)
    return (
      <TableRow>
        <TableCell>No data available</TableCell>
        <TableCell>
          <Button onClick={onRefetch}>Retry</Button>
        </TableCell>
      </TableRow>
    );

  const displayName = pokemon.name.replaceAll('-', ' ');
  const caught = isCaught(data.id);

  return (
    <TableRow className="h-12 hover:bg-gray-50">
      <TableCell className="font-medium">
        <Link
          to={`/pokemon/${data.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          #{data.id.toString().padStart(3, '0')}
        </Link>
      </TableCell>
      <TableCell className="w-60">
        <div className="relative flex w-full items-center gap-3">
          {data.sprites?.front_default && (
            <img
              src={data.sprites?.front_default}
              alt={displayName}
              className="h-8 w-8 object-contain"
            />
          )}
          <Link
            to={`/pokemon/${data.id}`}
            className="font-medium text-blue-600 capitalize hover:text-blue-800 hover:underline"
          >
            {displayName}
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          {data.types.slice(0, 2).map((type) => (
            <span
              key={type.type.name}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell>{(data.height / 10).toFixed(1)}m</TableCell>
      <TableCell>{(data.weight / 10).toFixed(1)}kg</TableCell>
      <TableCell className="text-center">
        {caught ? (
          <span className="font-medium text-green-600">✓ Caught</span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PokemonTableRow;
