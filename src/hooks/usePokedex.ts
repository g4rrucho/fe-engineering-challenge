import { useContext } from 'react';
import { PokedexContext, TPokedexContext } from '@/types/pokedex';

const usePokedex = (): TPokedexContext => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error('usePokedex must be used within a PokedexProvider');
  }
  return context;
};

export default usePokedex;
