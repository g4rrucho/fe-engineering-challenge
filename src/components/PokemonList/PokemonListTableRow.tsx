import React, { memo } from 'react';

import { TPokemonListItem } from '@/types';
import usePokemon from '@/hooks/usePokemon';
import usePokedex from '@/hooks/usePokedex';

import PokemonTableRow from '@/components/PokemonUI/PokemonTable/PokemonTableRow';
import PokemonTableRowError from '@/components/PokemonUI/PokemonTable/PokemonTableRowError';
import PokemonTableRowSkeleton from '@/components/PokemonUI/PokemonTable/PokemonTableRowSkeleton';

const PokemonListTableRow: React.FC<{ pokemon: TPokemonListItem }> = ({
  pokemon,
}) => {
  const { getPokemonCaught } = usePokedex();
  const { data, isError, isLoading, refetch } = usePokemon(
    pokemon.id || pokemon.name
  );

  const onRefetch = () => void refetch();

  if (isLoading)
    return <PokemonTableRowSkeleton key={`pokemon-${pokemon.id}`} />;

  if (!data || isError) return <PokemonTableRowError onRetry={onRefetch} />;

  const caughtAt = getPokemonCaught(pokemon.id)?.caughtAt;

  return (
    <PokemonTableRow
      pokemon={data}
      caughtAt={caughtAt}
      showCaughtDate={false}
    />
  );
};

export default memo(PokemonListTableRow);
