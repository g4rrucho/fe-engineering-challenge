import React, { memo, useCallback } from 'react';

import type { TPokemonListItem } from '@/types';
import usePokemon from '@/hooks/usePokemon';

import PokemonCard from '@/components/PokemonUI/PokemonCardList/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonUI/PokemonCardList/PokemonCardSkeleton';
import PokemonCardError from '@/components/PokemonUI/PokemonCardList/PokemonCardError';

const PokemonListCard: React.FC<TPokemonListItem> = ({ name, id }) => {
  const { data, isLoading, isError, refetch } = usePokemon(id || name);

  const onRetry = useCallback(() => void refetch(), [refetch]);

  if (isLoading) return <PokemonCardSkeleton />;
  if (isError || !data) return <PokemonCardError onRetry={onRetry} />;

  return <PokemonCard pokemon={data} />;
};

export default memo(PokemonListCard);
