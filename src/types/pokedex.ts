import { TPokemon } from '@/types/api';
import { createContext } from 'react';

export type TPokemonCaught = {
  pokemon: TPokemon;
  caughtAt: string;
};

export type TPokedexContext = {
  pokemonCaught: Record<number, TPokemonCaught>;
  catchPokemon: (pokemon: TPokemon) => void;
  releasePokemon: (id: number) => void;
  isCaught: (id: number) => boolean;
  getPokemonCaughtIDs: () => number[];
  getPokemonCaught: (id: number) => TPokemon | undefined;
};

export const PokedexContext = createContext<TPokedexContext | undefined>(
  undefined
);
