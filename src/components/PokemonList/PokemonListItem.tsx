import React, { useMemo } from 'react';

import type { TPokemonListItem } from '@/types/api';
import usePokemon from '@/hooks/usePokemon';

import PokemonCard from '@/components/PokemonUI/PokemonCardList/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonUI/PokemonCardList/PokemonCardSkeleton';

const PokemonCardListItem: React.FC<TPokemonListItem> = ({ name, id }) => {
  const { data, isLoading, isError } = usePokemon(id || name);
  const memoizedPokemon = useMemo(() => data, [data]);

  if (isLoading) return <PokemonCardSkeleton />;
  if (isError || !memoizedPokemon)
    return (
      <div data-testid={`pokemon-error-${id || name}`}>
        Error loading Pokémon data
      </div>
    );

  return <PokemonCard pokemon={memoizedPokemon} />;
};

export default PokemonCardListItem;
