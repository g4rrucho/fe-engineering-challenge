import { TPokemon } from '@/types/api';
import { createContext } from 'react';

export type TPokemonCaughtData = {
  pokemon: TPokemon;
  caughtAt: string;
  notes?: string;
};

export type TPokemonCaught = Record<number, TPokemonCaughtData>;

export type TPokedexContext = {
  pokemonCaught: TPokemonCaught;
  catchPokemon: (pokemon: TPokemon) => void;
  releasePokemon: (id: number) => void;
  isCaught: (id: number) => boolean;
  getPokemonCaughtIDs: () => number[];
  getPokemonCaught: (id: number) => TPokemonCaughtData | undefined;
  updatePokemonNotes: (id: number, notes: string) => void;
};

export const PokedexContext = createContext<TPokedexContext | undefined>(
  undefined
);
