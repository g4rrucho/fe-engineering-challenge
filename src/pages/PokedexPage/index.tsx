import { useState, useMemo } from 'react';

import usePokedex from '@/hooks/usePokedex';
import PokedexHeader from '@/components/Pokedex/PokedexHeader';
import PokedexFilters from '@/components/Pokedex/Filters/PokedexFilters';
import { TFilterState } from '@/components/Pokedex/Filters/types';
import PokemonDataTable from '@/components/PokemonUI/PokemonDataTable';
import PokemonCardList from '@/components/PokemonUI/PokemonCardList';

const PokedexPage = () => {
  const { pokemonCaught, getPokemonCaughtIDs } = usePokedex();
  const pokemonCaughtIDs = getPokemonCaughtIDs();

  const [filters, setFilters] = useState<TFilterState>({
    search: '',
    type: 'all',
    minHeight: '',
    maxHeight: '',
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  // Get all available types from caught Pokemon
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    pokemonCaughtIDs.forEach((id) => {
      const pokemon = pokemonCaught[id]?.pokemon;
      if (pokemon) {
        pokemon.types.forEach((type) => types.add(type.type.name));
      }
    });
    return Array.from(types).sort();
  }, [pokemonCaught, pokemonCaughtIDs]);

  const filteredAndSortedPokemon = useMemo(() => {
    const filtered = pokemonCaughtIDs.filter((id) => {
      const pokemonData = pokemonCaught[id];
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
        const pokemonHeight = pokemon.height / 10; // Conversation to meters
        if (filters.minHeight && pokemonHeight < parseFloat(filters.minHeight))
          return false;
        if (filters.maxHeight && pokemonHeight > parseFloat(filters.maxHeight))
          return false;
      }

      return true;
    });

    filtered.sort((aId, bId) => {
      const aData = pokemonCaught[aId];
      const bData = pokemonCaught[bId];
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
  }, [pokemonCaught, pokemonCaughtIDs, filters]);

  if (pokemonCaughtIDs.length === 0)
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">My Pokédex</h1>
          <div className="rounded-lg bg-gray-50 p-8">
            <p className="text-lg text-gray-600">No Pokémon caught yet!</p>
            <p className="mt-2 text-sm text-gray-500">
              Go to the main list and start catching some Pokémon.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PokedexHeader totalCaught={pokemonCaughtIDs.length} />

      {/* Filters */}
      <PokedexFilters
        onFiltersChange={setFilters}
        availableTypes={availableTypes}
      />

      {/* Results info */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {filteredAndSortedPokemon.length !== pokemonCaughtIDs.length ? (
            <>
              Showing {filteredAndSortedPokemon.length} of{' '}
              {pokemonCaughtIDs.length} Pokémon
            </>
          ) : (
            <>{pokemonCaughtIDs.length} Pokémon in your Pokédex</>
          )}
        </div>
      </div>

      {/* No results */}
      {filteredAndSortedPokemon.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600">
            No Pokémon match your current filters.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Cards view for mobile/tablet */}
      {filteredAndSortedPokemon.length > 0 && (
        <div className="lg:hidden">
          <PokemonCardList
            pokemons={pokemonCaught}
            pokemonIDs={filteredAndSortedPokemon}
          />
        </div>
      )}

      {/* Table view for desktop */}
      {filteredAndSortedPokemon.length > 0 && (
        <div className="hidden lg:block">
          <PokemonDataTable
            pokemons={filteredAndSortedPokemon.map((id) => ({
              pokemon: pokemonCaught[id].pokemon,
              caughtAt: pokemonCaught[id].caughtAt,
            }))}
            showCaughtDate={true}
          />
        </div>
      )}
    </div>
  );
};

export default PokedexPage;
