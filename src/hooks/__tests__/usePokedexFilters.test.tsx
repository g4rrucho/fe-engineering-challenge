import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';

import usePokedexFilters from '../usePokedexFilters';
import { TPokemonCaught } from '@/types';
import { TFilterState } from '@/components/Pokedex/Filters';

const mockPokemons: TPokemonCaught = {
  25: {
    pokemon: {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      sprites: {
        front_default: 'url',
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
    },
    caughtAt: '2025-01-15T10:30:00.000Z',
    notes: 'Electric mouse',
  },
  1: {
    pokemon: {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      sprites: {
        front_default: 'url',
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
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
        {
          slot: 2,
          type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
        },
      ],
      stats: [],
      is_default: true,
      order: 1,
      species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      },
    },
    caughtAt: '2025-01-14T10:30:00.000Z',
    notes: 'Starter',
  },
  4: {
    pokemon: {
      id: 4,
      name: 'charmander',
      height: 6,
      weight: 85,
      base_experience: 62,
      sprites: {
        front_default: 'url',
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
          type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
        },
      ],
      stats: [],
      is_default: true,
      order: 5,
      species: {
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon-species/4/',
      },
    },
    caughtAt: '2025-01-16T10:30:00.000Z',
    notes: 'Fire starter',
  },
};

const defaultFilters: TFilterState = {
  search: '',
  type: 'all',
  minHeight: '',
  maxHeight: '',
  sortBy: 'id',
  sortOrder: 'asc',
};

describe('usePokedexFilters', () => {
  it('returns all available types', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: defaultFilters,
      })
    );

    expect(result.current.availableTypes).toEqual([
      'electric',
      'fire',
      'grass',
      'poison',
    ]);
  });

  it('filters by name search', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, search: 'pika' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([25]);
  });

  it('filters by ID search', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, search: '25' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([25]);
  });

  it('filters by type', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, type: 'grass' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([1]);
  });

  it('filters by minimum height', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, minHeight: '0.6' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([1, 4]);
  });

  it('filters by maximum height', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, maxHeight: '0.5' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([25]);
  });

  it('filters by height range', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, minHeight: '0.5', maxHeight: '0.7' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([1, 4]);
  });

  it('sorts by name ascending', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, sortBy: 'name', sortOrder: 'asc' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([1, 4, 25]);
  });

  it('sorts by name descending', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, sortBy: 'name', sortOrder: 'desc' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([25, 4, 1]);
  });

  it('sorts by height ascending', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, sortBy: 'height', sortOrder: 'asc' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([25, 4, 1]);
  });

  it('sorts by timestamp ascending', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, sortBy: 'timestamp', sortOrder: 'asc' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([1, 25, 4]);
  });

  it('sorts by ID descending', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, sortBy: 'id', sortOrder: 'desc' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([25, 4, 1]);
  });

  it('applies combined filters', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: {
          ...defaultFilters,
          type: 'grass',
          minHeight: '0.5',
          sortBy: 'name',
        },
      })
    );

    expect(result.current.filteredPokemons).toEqual([1]);
  });

  it('returns empty array when no matches', () => {
    const { result } = renderHook(() =>
      usePokedexFilters({
        pokemons: mockPokemons,
        pokemonsIDs: [25, 1, 4],
        filters: { ...defaultFilters, search: 'nonexistent' },
      })
    );

    expect(result.current.filteredPokemons).toEqual([]);
  });
});
