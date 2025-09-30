import { useContext } from 'react';
import { PokedexContext, TPokedexContext } from '@/types/pokedex';

export const usePokedex = (): TPokedexContext => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error('usePokedex must be used within a PokedexProvider');
  }
  return context;
};
