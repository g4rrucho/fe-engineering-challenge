import { useCallback, useState } from 'react';

import { exportPokedexToCsv } from '@/utils/exportToCsv';

import usePokedex from '@/hooks/usePokedex';
import usePokedexFilters from '@/hooks/usePokedexFilters';
import useBulkSelection from '@/hooks/useBulkSelection';

import { TFilterState } from '@/components/Pokedex/Filters';
import PokedexHeader from '@/components/Pokedex/PokedexHeader';
import Filters from '@/components/Pokedex/Filters';

import PokedexEmptyState from '@/pages/PokedexPage/PokedexEmptyState';
import PokedexNoResults from '@/pages/PokedexPage/PokedexNoResults';
import PokedexResultsInfo from '@/pages/PokedexPage/PokemonResultsInfo';
import PokedexSelectionControl from '@/pages/PokedexPage/PokedexSelectionControl';
import PokedexPokemonList from '@/pages/PokedexPage/PokedexPokemonList';

const DEFAULT_FILTERS: TFilterState = {
  search: '',
  type: 'all',
  minHeight: '',
  maxHeight: '',
  sortBy: 'timestamp',
  sortOrder: 'desc',
};

const PokedexPage = () => {
  const [filters, setFilters] = useState<TFilterState>(DEFAULT_FILTERS);

  const { pokemonCaught, getPokemonCaughtIDs, releasePokemons } = usePokedex();
  const pokemonCaughtIDs = getPokemonCaughtIDs();

  const { filteredPokemons, availableTypes } = usePokedexFilters({
    filters,
    pokemons: pokemonCaught,
    pokemonsIDs: pokemonCaughtIDs,
  });

  const {
    selectedIDs,
    isSelectionMode,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    toggleSelectionMode,
    handleBulkDelete,
  } = useBulkSelection({
    allItems: filteredPokemons,
    onBulkDelete: releasePokemons,
  });

  const handleExport = useCallback(() => {
    const dataToExport = filteredPokemons.map((id) => pokemonCaught[id]);
    const timestamp = new Date().toISOString().split('T')[0];
    exportPokedexToCsv(dataToExport, `pokedex-export-${timestamp}.csv`);
  }, [filteredPokemons, pokemonCaught]);

  if (pokemonCaughtIDs.length === 0) return <PokedexEmptyState />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PokedexHeader totalCaught={pokemonCaughtIDs.length} />

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        availableTypes={availableTypes}
      />

      {/* Selection mode toggle */}
      <PokedexSelectionControl
        isSelectionMode={isSelectionMode}
        onCancel={clearSelection}
        totalCount={filteredPokemons.length}
        onSelectAll={toggleSelectAll}
        onDelete={handleBulkDelete}
        onToggleSelectionMode={toggleSelectionMode}
        selectedCount={selectedIDs.size}
      />

      {/* Results info */}
      <PokedexResultsInfo
        filteredCount={filteredPokemons.length}
        totalCount={pokemonCaughtIDs.length}
        onExport={handleExport}
      />

      {/* No results */}
      {filteredPokemons.length === 0 && <PokedexNoResults />}

      {/* Pokedex Pokemon List */}
      <PokedexPokemonList
        pokemonCaught={pokemonCaught}
        filteredPokemonIDs={filteredPokemons}
        isSelectionMode={isSelectionMode}
        selectedIDs={selectedIDs}
        onToggleSelection={toggleSelection}
        onToggleSelectAll={toggleSelectAll}
      />
    </div>
  );
};

export default PokedexPage;
