import React from 'react';
import { Table, TableBody } from '@/components/ui/table';

import { TPokemonDataRow } from '@/components/PokemonUI/PokemonTable/types';
import PokemonTableRow from '@/components/PokemonUI/PokemonTable/PokemonTableRow';
import PokemonTableHeaders from '@/components/PokemonUI/PokemonTable/PokemonTableHeaders';

type TPokemonDataTableProps = {
  pokemons: TPokemonDataRow[];
  showCaughtDate?: boolean;
  isSelectionMode?: boolean;
  selectedIDs?: Set<number>;
  onToggleSelection?: (id: number) => void;
  onToggleSelectAll?: () => void;
};

const PokedexTable: React.FC<TPokemonDataTableProps> = ({
  pokemons,
  showCaughtDate = false,
  isSelectionMode = false,
  selectedIDs = new Set(),
  onToggleSelection,
  onToggleSelectAll,
}) => {
  if (!pokemons.length) return <div>No Pokémon found</div>;

  return (
    <div className="rounded-md border">
      <Table className="table-fixed">
        <PokemonTableHeaders
          isSelectionMode={isSelectionMode}
          isSelectedAll={
            selectedIDs?.size === pokemons.length && pokemons.length > 0
          }
          onToggleSelectAll={onToggleSelectAll}
          showCaughtDate={showCaughtDate}
        />
        <TableBody>
          {pokemons.map(({ pokemon, caughtAt }) => (
            <PokemonTableRow
              key={pokemon.id}
              pokemon={pokemon}
              caughtAt={caughtAt}
              showCaughtDate={showCaughtDate}
              isSelectionMode={isSelectionMode}
              isSelected={selectedIDs?.has(pokemon.id)}
              onToggleSelection={onToggleSelection}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PokedexTable;
