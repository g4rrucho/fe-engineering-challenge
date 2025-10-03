import React from 'react';

import { TPokemonCaught } from '@/types/pokedex';
import PokemonCard from '@/components/PokemonUI/PokemonCardList/PokemonCard';

type TPokedexCardListProps = {
  pokemons: TPokemonCaught;
  pokemonIDs: number[];
  isSelectionMode?: boolean;
  selectedIDs?: Set<number>;
  onToggleSelection?: (id: number) => void;
};

const PokemonCardList: React.FC<TPokedexCardListProps> = ({
  pokemons,
  pokemonIDs,
  isSelectionMode = false,
  selectedIDs = new Set(),
  onToggleSelection,
}) => (
  <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
    {pokemonIDs.map((id) => {
      const pokemonData = pokemons[id];
      const pokemon = pokemonData.pokemon;

      return (
        <PokemonCard
          key={`pokemon-${id}`}
          pokemon={pokemon}
          caughtAt={pokemonData.caughtAt}
          isSelectionMode={isSelectionMode}
          isSelected={selectedIDs?.has(pokemon.id)}
          onToggleSelection={onToggleSelection}
        />
      );
    })}
  </div>
);

export default PokemonCardList;
