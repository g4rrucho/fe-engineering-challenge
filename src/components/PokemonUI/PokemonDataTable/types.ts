import { TPokemon } from '@/types/api';

export type TPokemonDataRow = {
  pokemon: TPokemon;
  caughtAt?: string;
};

export type TPokemonDataTableProps = {
  pokemons: TPokemonDataRow[];
  isLoading?: boolean;
  isError?: boolean;
  showCaughtDate?: boolean;
};

export type TPokemonDataTableRowProps = TPokemonDataRow & {
  showCaughtDate?: boolean;
};
