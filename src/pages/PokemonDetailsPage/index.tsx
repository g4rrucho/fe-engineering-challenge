import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import usePokemon from '@/hooks/usePokemon';
import usePokedex from '@/hooks/usePokedex';

import PokemonDetailsCard from '@/components/PokemonUI/PokemonDetailsCard';

const PokemonDetailsPage: React.FC = () => {
  const {
    getPokemonCaught,
    isCaught,
    catchPokemon,
    releasePokemon,
    updatePokemonNotes,
  } = usePokedex();
  const { id } = useParams();

  const pokemonID = parseInt(id || '0', 10);
  const cachedPokemon = getPokemonCaught(pokemonID);

  const {
    data: fetchedPokemon,
    isLoading,
    isError,
    refetch,
  } = usePokemon(pokemonID, {
    enabled: !cachedPokemon && !!pokemonID,
  });

  const pokemon = cachedPokemon?.pokemon || fetchedPokemon;

  const onRefetchPokemon = useCallback(() => void refetch(), [refetch]);

  const handleToggleCatch = useCallback(() => {
    if (!pokemon) return;

    if (isCaught(pokemonID)) releasePokemon(pokemonID);
    else catchPokemon(pokemon);
  }, [catchPokemon, pokemon, isCaught, pokemonID, releasePokemon]);

  const handleUpdateNotes = useCallback(
    (notes: string) => {
      updatePokemonNotes(pokemonID, notes);
    },
    [updatePokemonNotes, pokemonID]
  );

  return (
    <PokemonDetailsCard
      isError={isError}
      isLoading={isLoading}
      pokemon={pokemon}
      caughtData={cachedPokemon}
      onRefetchPokemon={onRefetchPokemon}
      handleToggleCatch={handleToggleCatch}
      onUpdateNotes={handleUpdateNotes}
    />
  );
};

export default PokemonDetailsPage;
