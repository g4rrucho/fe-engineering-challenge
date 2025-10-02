import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import usePokemon from '@/hooks/usePokemon';
import usePokedex from '@/hooks/usePokedex';
import PokemonDetailsCard from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCard';

const PokemonDetailsPage: React.FC = () => {
  const { id } = useParams();
  const pokemonID = parseInt(id || '0', 10);

  const { getPokemonCaught } = usePokedex();
  const cachedPokemon = getPokemonCaught(pokemonID);

  const {
    data: fetchedPokemon,
    isLoading,
    isError,
    refetch,
  } = usePokemon(pokemonID, {
    enabled: !cachedPokemon || !pokemonID,
  });

  const onRefetchPokemon = useCallback(() => void refetch(), [refetch]);

  const pokemon = cachedPokemon?.pokemon || fetchedPokemon;

  return (
    <PokemonDetailsCard
      isError={isError}
      isLoading={isLoading}
      pokemon={pokemon}
      onRefetchPokemon={onRefetchPokemon}
    />
  );
};

export default PokemonDetailsPage;
