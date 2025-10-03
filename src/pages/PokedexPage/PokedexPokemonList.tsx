import { useMemo } from 'react';

import { TPokemonCaught } from '@/types';
import PokemonDataTable from '@/components/PokemonUI/PokemonDataTable';
import PokemonCardList from '@/components/PokemonUI/PokemonCardList';

type PokedexPokemonListProps = {
  pokemonCaught: TPokemonCaught;
  filteredPokemonIDs: number[];
  isSelectionMode: boolean;
  selectedIDs: Set<number>;
  onToggleSelection: (id: number) => void;
  onToggleSelectAll: () => void;
};

const PokedexPokemonList = ({
  pokemonCaught,
  filteredPokemonIDs,
  isSelectionMode,
  selectedIDs,
  onToggleSelection,
  onToggleSelectAll,
}: PokedexPokemonListProps) => {
  const mappedPokemons = useMemo(
    () =>
      filteredPokemonIDs.map((id) => ({
        pokemon: pokemonCaught[id].pokemon,
        caughtAt: pokemonCaught[id].caughtAt,
      })),
    [filteredPokemonIDs, pokemonCaught]
  );

  if (filteredPokemonIDs.length === 0) return null;

  return (
    <>
      {/* Cards view for mobile/tablet */}
      <div className="lg:hidden">
        <PokemonCardList
          pokemons={pokemonCaught}
          pokemonIDs={filteredPokemonIDs}
          isSelectionMode={isSelectionMode}
          selectedIDs={selectedIDs}
          onToggleSelection={onToggleSelection}
        />
      </div>

      {/* Table view for desktop */}
      <div className="hidden lg:block">
        <PokemonDataTable
          pokemons={mappedPokemons}
          showCaughtDate={true}
          isSelectionMode={isSelectionMode}
          selectedIDs={selectedIDs}
          onToggleSelection={onToggleSelection}
          onToggleSelectAll={onToggleSelectAll}
        />
      </div>
    </>
  );
};

export default PokedexPokemonList;
