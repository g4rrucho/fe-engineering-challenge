import React, { useEffect, useState } from 'react';
import { PokedexContext } from '@/types/pokedex';

const STORAGE_KEY = 'pokemon_caught';
type TPokedexProviderProps = {
  children: React.ReactNode;
};

export const PokedexProvider: React.FC<TPokedexProviderProps> = ({
  children,
}) => {
  const [pokemonCaught, setPokemonCaught] = useState<Set<number>>(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? new Set(JSON.parse(storedData) as number[]) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(pokemonCaught))
    );
  }, [pokemonCaught]);

  const catchPokemon = (id: number) => {
    setPokemonCaught((prev) => new Set(prev).add(id));
  };

  const releasePokemon = (id: number) => {
    setPokemonCaught((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const isCaught = (id: number) => {
    return pokemonCaught.has(id);
  };

  return (
    <PokedexContext.Provider
      value={{ pokemonCaught, catchPokemon, releasePokemon, isCaught }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
