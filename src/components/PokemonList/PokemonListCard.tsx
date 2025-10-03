import React, { memo } from 'react';

import type { TPokemonListItem } from '@/types';
import usePokemon from '@/hooks/usePokemon';

import PokemonCard from '@/components/PokemonUI/PokemonCardList/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonUI/PokemonCardList/PokemonCardSkeleton';

const PokemonListCard: React.FC<TPokemonListItem> = ({ name, id }) => {
  const { data, isLoading, isError } = usePokemon(id || name);

  if (isLoading) return <PokemonCardSkeleton />;

  // TODO handle error state by showing a placeholder card and retry button
  if (isError || !data)
    return (
      <div data-testid={`pokemon-error-${id || name}`}>
        Error loading Pokémon data
      </div>
    );

  return <PokemonCard pokemon={data} />;
};

export default memo(PokemonListCard);
