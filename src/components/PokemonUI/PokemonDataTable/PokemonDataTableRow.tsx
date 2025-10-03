import { Link } from 'react-router-dom';

import { TableCell, TableRow } from '@/components/ui/table';

import usePokedex from '@/hooks/usePokedex';
import { TPokemonDataRow } from '@/components/PokemonUI/PokemonDataTable/types';
import { Checkbox } from '@/components/ui/checkbox';

export type TPokemonDataTableRowProps = TPokemonDataRow & {
  showCaughtDate?: boolean;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: (id: number) => void;
};

const PokemonDataTableRow: React.FC<TPokemonDataTableRowProps> = ({
  pokemon,
  caughtAt,
  showCaughtDate,
  isSelectionMode = false,
  isSelected = false,
  onToggleSelection,
}) => {
  const { isCaught } = usePokedex();
  const displayName = pokemon.name.replaceAll('-', ' ');
  const caught = isCaught(pokemon.id);

  return (
    <TableRow key={pokemon.id} className="h-12 hover:bg-gray-50">
      {isSelectionMode && (
        <TableCell>
          <Checkbox
            checked={isSelected}
            onClick={() => onToggleSelection?.(pokemon.id)}
          />
        </TableCell>
      )}
      <TableCell className="font-medium">
        <Link
          to={`/pokemon/${pokemon.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          #{pokemon.id.toString().padStart(3, '0')}
        </Link>
      </TableCell>
      <TableCell className="w-60">
        <div className="relative flex w-full items-center gap-3">
          {pokemon.sprites?.front_default && (
            <img
              src={pokemon.sprites.front_default}
              alt={displayName}
              className="h-8 w-8 object-contain"
            />
          )}
          <Link
            to={`/pokemon/${pokemon.id}`}
            className="truncate font-medium text-blue-600 capitalize hover:text-blue-800 hover:underline"
          >
            {displayName}
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          {pokemon.types.slice(0, 2).map((type) => (
            <span
              key={type.type.name}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-right">
        {(pokemon.height / 10).toFixed(1)}m
      </TableCell>
      <TableCell className="text-right">
        {(pokemon.weight / 10).toFixed(1)}kg
      </TableCell>
      <TableCell className="text-center">
        {caught ? (
          <span className="font-medium text-green-600">✓ Caught</span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </TableCell>
      {showCaughtDate && (
        <TableCell className="text-center text-xs text-gray-500">
          {caughtAt ? new Date(caughtAt).toLocaleDateString() : '—'}
        </TableCell>
      )}
    </TableRow>
  );
};

export default PokemonDataTableRow;
