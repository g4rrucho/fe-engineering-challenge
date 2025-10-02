import React from 'react';

import { TPokemonCaught } from '@/types/pokedex';
import PokemonCard from '@/components/PokemonUI/PokemonCardList/PokemonCard';

type TPokedexCardListProps = {
  pokemons: TPokemonCaught;
  pokemonIDs: number[];
};

const PokemonCardList: React.FC<TPokedexCardListProps> = ({
  pokemons,
  pokemonIDs,
}) => (
  <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
    {pokemonIDs.map((id) => {
      const pokemonData = pokemons[id];
      const pokemon = pokemonData.pokemon;
      const pokemonCaughtAt = new Date(
        pokemonData.caughtAt
      ).toLocaleDateString();

      return (
        <PokemonCard
          key={`pokemon-${id}`}
          pokemon={pokemon}
          caughtAt={pokemonCaughtAt}
        />
      );
    })}
  </div>
);

export default PokemonCardList;
