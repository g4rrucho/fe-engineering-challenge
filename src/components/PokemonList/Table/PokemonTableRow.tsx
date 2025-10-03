import React, { memo } from 'react';

import { TPokemonListItem } from '@/types';
import usePokemon from '@/hooks/usePokemon';
import usePokedex from '@/hooks/usePokedex';

import PokemonDataTableRowSkeleton from '@/components/PokemonUI/PokemonDataTable/PokemonDataTableRowSkeleton';
import PokemonDataTableRow from '@/components/PokemonUI/PokemonDataTable/PokemonDataTableRow';
import PokemonDataTableRowError from '@/components/PokemonUI/PokemonDataTable/PokemonDataTableRowError';

const PokemonTableRow: React.FC<{ pokemon: TPokemonListItem }> = ({
  pokemon,
}) => {
  const { getPokemonCaught } = usePokedex();
  const { data, isError, isLoading, refetch } = usePokemon(
    pokemon.id || pokemon.name
  );

  const onRefetch = () => void refetch();

  if (isLoading)
    return <PokemonDataTableRowSkeleton key={`pokemon-${pokemon.id}`} />;

  if (!data || isError) return <PokemonDataTableRowError onRetry={onRefetch} />;

  const caughtAt = getPokemonCaught(pokemon.id)?.caughtAt;

  return (
    <PokemonDataTableRow
      pokemon={data}
      caughtAt={caughtAt}
      showCaughtDate={false}
    />
  );
};

export default PokemonTableRow;
