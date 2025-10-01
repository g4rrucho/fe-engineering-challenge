import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import type { TPokemon, TPokemonListItem } from '@/types/api';
import usePokemon from '@/hooks/usePokemon';

import { Card, CardContent } from '@/components/ui/card';
import PokemonListSkeleton from '@/components/Pokemon/PokemonList/PokemonListSkeleton';

const PokemonListItem: React.FC<TPokemonListItem> = ({
  name,
  id,
  caughtAt,
}) => {
  const { data, isLoading, isError } = usePokemon(id || name);
  const memoizedPokemon = useMemo(() => data, [data]);

  if (isLoading) return <PokemonListSkeleton />;
  if (isError)
    return (
      <div data-testid={`pokemon-error-${id || name}`}>
        Error loading Pokémon data
      </div>
    );

  const { id: pokemonID, sprites } = memoizedPokemon as TPokemon;
  const displayName = name.replaceAll('-', ' ');

  return (
    <Link
      to={`/pokemon/${pokemonID}`}
      data-testid={`pokemon-link-${pokemonID}`}
    >
      <Card
        className="py-2 transition-shadow hover:shadow-lg"
        data-testid={`pokemon-item-${pokemonID}`}
      >
        <CardContent className="flex flex-col items-center justify-center px-4">
          {sprites?.front_default ? (
            <img
              src={sprites.front_default}
              alt={name}
              className="h-16 w-16 object-contain"
              data-testid={`pokemon-image-${pokemonID}`}
            />
          ) : (
            <p
              className="flex h-16 w-16 items-center justify-center rounded-4xl bg-gray-200 p-2"
              data-testid={`pokemon-image-placeholder-${pokemonID}`}
            >
              ?
            </p>
          )}
          <div>
            <p
              className="line-clamp-1 text-lg font-bold text-ellipsis whitespace-break-spaces text-black capitalize"
              data-testid={`pokemon-name-${pokemonID}`}
            >
              {displayName}
            </p>
            <p
              className="text-sm text-gray-500"
              data-testid={`pokemon-id-${pokemonID}`}
            >
              ID: {id.toString().padStart(4, '0')}
            </p>
            {caughtAt && (
              <p className="text-xs text-gray-400">
                Caught: {new Date(caughtAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonListItem;
