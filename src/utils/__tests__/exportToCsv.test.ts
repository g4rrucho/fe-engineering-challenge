import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportPokedexToCsv } from '../exportToCsv';
import { TPokemonCaughtData } from '@/types';

describe('exportToCsv', () => {
  let mockLink: {
    setAttribute: ReturnType<typeof vi.fn>;
    click: ReturnType<typeof vi.fn>;
    style: { visibility: string };
  };

  beforeEach(() => {
    mockLink = {
      setAttribute: vi.fn(),
      click: vi.fn(),
      style: { visibility: '' },
    };

    vi.spyOn(document, 'createElement').mockReturnValue(
      mockLink as unknown as HTMLElement
    );

    vi.spyOn(document.body, 'appendChild').mockImplementation(
      () => mockLink as unknown as Node
    );
    vi.spyOn(document.body, 'removeChild').mockImplementation(
      () => mockLink as unknown as Node
    );

    global.URL.createObjectURL = vi.fn(
      () => 'blob:mock-url'
    ) as unknown as typeof URL.createObjectURL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockPokemonData: TPokemonCaughtData[] = [
    {
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
            type: {
              name: 'electric',
              url: 'https://pokeapi.co/api/v2/type/13/',
            },
          },
        ],
        stats: [
          {
            base_stat: 35,
            effort: 0,
            stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
          },
          {
            base_stat: 40,
            effort: 0,
            stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
          },
          {
            base_stat: 50,
            effort: 0,
            stat: {
              name: 'special-attack',
              url: 'https://pokeapi.co/api/v2/stat/4/',
            },
          },
          {
            base_stat: 50,
            effort: 0,
            stat: {
              name: 'special-defense',
              url: 'https://pokeapi.co/api/v2/stat/5/',
            },
          },
          {
            base_stat: 90,
            effort: 0,
            stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
          },
        ],
        is_default: true,
        order: 35,
        species: {
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
        },
      },
      caughtAt: '2025-01-15T10:30:00.000Z',
      notes: 'My favorite Pokemon!',
    },
  ];

  it('creates CSV with correct headers', () => {
    exportPokedexToCsv(mockPokemonData);

    const blobCall = (global.URL.createObjectURL as ReturnType<typeof vi.fn>)
      .mock.calls[0][0] as Blob;
    expect(blobCall.type).toBe('text/csv;charset=utf-8;');

    const reader = new FileReader();
    reader.readAsText(blobCall);

    reader.onload = () => {
      const csvContent = reader.result as string;
      expect(csvContent).toContain('ID,Name,Types,Height (m),Weight (kg)');
      expect(csvContent).toContain('HP,Attack,Defense');
      expect(csvContent).toContain('Caught At,Notes');
    };
  });

  it('escapes quotes in notes field', () => {
    const dataWithQuotes: TPokemonCaughtData[] = [
      {
        ...mockPokemonData[0],
        notes: 'He said "amazing"',
      },
    ];

    exportPokedexToCsv(dataWithQuotes);

    const blobCall = (global.URL.createObjectURL as ReturnType<typeof vi.fn>)
      .mock.calls[0][0] as Blob;
    const reader = new FileReader();
    reader.readAsText(blobCall);

    reader.onload = () => {
      const csvContent = reader.result as string;
      expect(csvContent).toContain('""amazing""');
    };
  });

  it('triggers download with correct filename', () => {
    const customFilename = 'my-pokedex.csv';
    exportPokedexToCsv(mockPokemonData, customFilename);

    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      customFilename
    );
    expect(mockLink.click).toHaveBeenCalled();
  });

  it('uses default filename when not provided', () => {
    exportPokedexToCsv(mockPokemonData);

    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      'pokedex-export.csv'
    );
  });

  it('formats Pokemon data correctly', () => {
    exportPokedexToCsv(mockPokemonData);

    const blobCall = (global.URL.createObjectURL as ReturnType<typeof vi.fn>)
      .mock.calls[0][0] as Blob;
    const reader = new FileReader();
    reader.readAsText(blobCall);

    reader.onload = () => {
      const csvContent = reader.result as string;
      expect(csvContent).toContain('"25"');
      expect(csvContent).toContain('"pikachu"');
      expect(csvContent).toContain('"electric"');
      expect(csvContent).toContain('"0.4"');
      expect(csvContent).toContain('"6.0"');
    };
  });

  it('handles empty notes', () => {
    const dataWithoutNotes: TPokemonCaughtData[] = [
      {
        ...mockPokemonData[0],
        notes: '',
      },
    ];

    exportPokedexToCsv(dataWithoutNotes);

    const blobCall = (global.URL.createObjectURL as ReturnType<typeof vi.fn>)
      .mock.calls[0][0] as Blob;
    const reader = new FileReader();
    reader.readAsText(blobCall);

    reader.onload = () => {
      const csvContent = reader.result as string;
      expect(csvContent).toContain('""');
    };
  });

  it('creates and removes link element', () => {
    exportPokedexToCsv(mockPokemonData);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });
});
