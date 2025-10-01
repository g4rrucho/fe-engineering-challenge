import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import type { TPokemon, TPokemonListItem } from '@/types/api';
import usePokemon from '@/hooks/usePokemon';
import PokemonListSkeleton from '@/components/PokemonList/PokemonListSkeleton';

const PokemonListItem: React.FC<TPokemonListItem> = ({ name, id }) => {
  const { data, isLoading, isError } = usePokemon(id || name);
  const memoizedPokemon = useMemo(() => data, [data]);

  if (isLoading) return <PokemonListSkeleton />;
  // TODO implement error card & retry logic
  if (isError) return <div>Error loading Pokémon data</div>;

  const { id: pokemonID, sprites } = memoizedPokemon as TPokemon;

  return (
    <Link to={`/pokemon/${pokemonID}`}>
      <li className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
        {sprites?.front_default ? (
          <img
            src={sprites.front_default}
            alt={name}
            className="h-16 w-16 object-contain"
          />
        ) : (
          <p className="rounded-4xl bg-gray-200 p-2">?</p>
        )}
        <div>
          <p className="text-lg font-bold text-black">{name}</p>
          <p className="text-sm text-gray-500">
            ID: {id.toString().padStart(4, '0')}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default PokemonListItem;
