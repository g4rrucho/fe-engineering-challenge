import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';

import usePokedex from '../usePokedex';
import { PokedexProvider } from '@/contexts/PokedexContext';

describe('usePokedex', () => {
  it('provides pokedex context when used within provider', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    expect(result.current).toBeDefined();
    expect(result.current.catchPokemon).toBeDefined();
    expect(result.current.releasePokemon).toBeDefined();
    expect(result.current.releasePokemons).toBeDefined();
    expect(result.current.isCaught).toBeDefined();
    expect(result.current.getPokemonCaught).toBeDefined();
    expect(result.current.updatePokemonNotes).toBeDefined();
    expect(result.current.pokemonCaught).toBeDefined();
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => usePokedex());
    }).toThrow('usePokedex must be used within a PokedexProvider');
  });
});
