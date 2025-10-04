import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { PokedexProvider } from '../PokedexContext';
import usePokedex from '@/hooks/usePokedex';
import { TPokemon } from '@/types';

const mockPokemon: TPokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    back_default: null,
    back_female: null,
    back_shiny: null,
    back_shiny_female: null,
    front_female: null,
    front_shiny: null,
    front_shiny_female: null,
  },
  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
    },
  ],
  stats: [],
  is_default: true,
  order: 35,
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },
};

const mockPokemon2: TPokemon = {
  ...mockPokemon,
  id: 1,
  name: 'bulbasaur',
};

describe('PokedexProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty pokedex', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    expect(result.current.pokemonCaught).toEqual({});
  });

  it('catches a Pokemon', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.catchPokemon(mockPokemon);
    });

    expect(result.current.isCaught(25)).toBe(true);
    expect(result.current.pokemonCaught[25]).toBeDefined();
    expect(result.current.pokemonCaught[25].pokemon).toEqual(mockPokemon);
    expect(result.current.pokemonCaught[25].notes).toBe('');
    expect(result.current.pokemonCaught[25].caughtAt).toBeDefined();
  });

  it('releases a Pokemon', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.catchPokemon(mockPokemon);
    });

    expect(result.current.isCaught(25)).toBe(true);

    act(() => {
      result.current.releasePokemon(25);
    });

    expect(result.current.isCaught(25)).toBe(false);
    expect(result.current.pokemonCaught[25]).toBeUndefined();
  });

  it('bulk releases multiple Pokemon', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.catchPokemon(mockPokemon);
      result.current.catchPokemon(mockPokemon2);
    });

    expect(result.current.isCaught(25)).toBe(true);
    expect(result.current.isCaught(1)).toBe(true);

    act(() => {
      result.current.releasePokemons([25, 1]);
    });

    expect(result.current.isCaught(25)).toBe(false);
    expect(result.current.isCaught(1)).toBe(false);
  });

  it('updates Pokemon notes', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.catchPokemon(mockPokemon);
    });

    const initialNotes = result.current.pokemonCaught[25].notes;
    expect(initialNotes).toBe('');

    act(() => {
      result.current.updatePokemonNotes(25, 'My favorite Pokemon!');
    });

    expect(result.current.pokemonCaught[25].notes).toBe('My favorite Pokemon!');
  });

  it('getPokemonCaught returns Pokemon data', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.catchPokemon(mockPokemon);
    });

    const caughtData = result.current.getPokemonCaught(25);

    expect(caughtData).toBeDefined();
    expect(caughtData?.pokemon).toEqual(mockPokemon);
    expect(caughtData?.notes).toBe('');
  });

  it('getPokemonCaught returns undefined for uncaught Pokemon', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    const caughtData = result.current.getPokemonCaught(999);

    expect(caughtData).toBeUndefined();
  });

  it('persists data to localStorage', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.catchPokemon(mockPokemon);
    });

    const storedData = localStorage.getItem('pokemon_caught');
    expect(storedData).toBeDefined();

    const parsedData = JSON.parse(storedData!);
    expect(parsedData[25]).toBeDefined();
    expect(parsedData[25].pokemon.id).toBe(25);
  });

  it('loads data from localStorage on mount', () => {
    const initialData = {
      25: {
        pokemon: mockPokemon,
        caughtAt: '2025-01-15T10:30:00.000Z',
        notes: 'Test note',
      },
    };

    localStorage.setItem('pokemon_caught', JSON.stringify(initialData));

    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    expect(result.current.isCaught(25)).toBe(true);
    expect(result.current.pokemonCaught[25].notes).toBe('Test note');
  });

  it('does not update notes for uncaught Pokemon', () => {
    const { result } = renderHook(() => usePokedex(), {
      wrapper: PokedexProvider,
    });

    act(() => {
      result.current.updatePokemonNotes(999, 'Should not be added');
    });

    expect(result.current.pokemonCaught[999]).toBeUndefined();
  });
});
