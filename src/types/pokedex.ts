import { TPokemon } from '@/types/api';
import { createContext } from 'react';

export type TPokemonCaughtData = {
  pokemon: TPokemon;
  caughtAt: string;
};

export type TPokemonCaught = Record<number, TPokemonCaughtData>;

export type TPokedexContext = {
  pokemonCaught: TPokemonCaught;
  catchPokemon: (pokemon: TPokemon) => void;
  releasePokemon: (id: number) => void;
  isCaught: (id: number) => boolean;
  getPokemonCaughtIDs: () => number[];
  getPokemonCaught: (id: number) => TPokemonCaughtData | undefined;
};

export const PokedexContext = createContext<TPokedexContext | undefined>(
  undefined
);
