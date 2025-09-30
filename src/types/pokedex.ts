import { createContext } from 'react';

export type TPokedexContext = {
  pokemonCaught: Set<number>;
  catchPokemon: (id: number) => void;
  releasePokemon: (id: number) => void;
  isCaught: (id: number) => boolean;
};

export const PokedexContext = createContext<TPokedexContext | undefined>(
  undefined
);
