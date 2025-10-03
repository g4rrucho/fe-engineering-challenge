import { useMemo } from 'react';

import { TPokemonCaught } from '@/types/pokedex';
import { TFilterState } from '@/components/Pokedex/Filters';

type TUsePokedexFiltersParams = {
  pokemons: TPokemonCaught;
  pokemonsIDs: number[];
  filters: TFilterState;
};

type TUsePokedexFiltersReturn = {
  filteredPokemons: number[];
  availableTypes: string[];
};

const usePokedexFilters = ({
  filters,
  pokemons,
  pokemonsIDs,
}: TUsePokedexFiltersParams): TUsePokedexFiltersReturn => {
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    pokemonsIDs.forEach((id) => {
      const pokemon = pokemons[id]?.pokemon;
      if (pokemon) {
        pokemon.types.forEach((type) => types.add(type.type.name));
      }
    });
    return Array.from(types).sort();
  }, [pokemons, pokemonsIDs]);

  const filteredPokemons = useMemo(() => {
    const filtered = pokemonsIDs.filter((id) => {
      const pokemonData = pokemons[id];
      if (!pokemonData) return false;

      const pokemon = pokemonData.pokemon;

      // Search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = pokemon.name.toLowerCase().includes(searchLower);
        const idMatch = pokemon.id.toString().includes(filters.search);
        if (!nameMatch && !idMatch) return false;
      }

      // Type
      if (filters.type !== 'all') {
        const hasType = pokemon.types.some(
          (type) => type.type.name === filters.type
        );
        if (!hasType) return false;
      }

      // Height filter
      if (filters.minHeight || filters.maxHeight) {
        const pokemonHeight = pokemon.height / 10;
        if (filters.minHeight && pokemonHeight < parseFloat(filters.minHeight))
          return false;
        if (filters.maxHeight && pokemonHeight > parseFloat(filters.maxHeight))
          return false;
      }

      return true;
    });

    filtered.sort((aId, bId) => {
      const aData = pokemons[aId];
      const bData = pokemons[bId];
      const aPokemon = aData.pokemon;
      const bPokemon = bData.pokemon;

      let comparison = 0;

      switch (filters.sortBy) {
        case 'name':
          comparison = aPokemon.name.localeCompare(bPokemon.name);
          break;
        case 'height':
          comparison = aPokemon.height - bPokemon.height;
          break;
        case 'timestamp':
          comparison =
            new Date(aData.caughtAt).getTime() -
            new Date(bData.caughtAt).getTime();
          break;
        case 'id':
          comparison = aPokemon.id - bPokemon.id;
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [pokemons, pokemonsIDs, filters]);

  return { filteredPokemons, availableTypes };
};

export default usePokedexFilters;
