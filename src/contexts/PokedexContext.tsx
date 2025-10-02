import React, { useEffect, useState } from 'react';
import {
  PokedexContext,
  TPokemonCaught,
  TPokemonCaughtData,
} from '@/types/pokedex';
import { TPokemon } from '@/types/api';

const STORAGE_KEY = 'pokemon_caught';

type TPokedexProviderProps = {
  children: React.ReactNode;
};

export const PokedexProvider: React.FC<TPokedexProviderProps> = ({
  children,
}) => {
  const [pokemonCaught, setPokemonCaught] = useState<TPokemonCaught>(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? (JSON.parse(storedData) as TPokemonCaught) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemonCaught));
  }, [pokemonCaught]);

  const catchPokemon = (pokemon: TPokemon): void => {
    setPokemonCaught((prev) => ({
      ...prev,
      [pokemon.id]: { pokemon, caughtAt: new Date().toISOString(), notes: '' },
    }));
  };

  const releasePokemon = (id: number): void => {
    setPokemonCaught((prev) => {
      const newPokemonCaught = { ...prev };
      delete newPokemonCaught[id];
      return newPokemonCaught;
    });
  };

  const isCaught = (id: number): boolean => {
    return id in pokemonCaught;
  };

  const getPokemonCaughtIDs = (): number[] => {
    return Object.keys(pokemonCaught).map(Number);
  };

  const getPokemonCaught = (id: number): TPokemonCaughtData | undefined => {
    return pokemonCaught[id] || undefined;
  };

  const updatePokemonNotes = (id: number, notes: string) => {
    const updated = { ...pokemonCaught };
    if (updated[id]) {
      updated[id] = { ...updated[id], notes };
      setPokemonCaught(updated);
    }
  };

  return (
    <PokedexContext.Provider
      value={{
        pokemonCaught,
        catchPokemon,
        releasePokemon,
        isCaught,
        getPokemonCaughtIDs,
        getPokemonCaught,
        updatePokemonNotes,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
