import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ShareButton from '../ShareButton';
import * as usePokedexModule from '@/hooks/usePokedex';

vi.mock('@/hooks/usePokedex');

describe('ShareButton', () => {
  const mockGetPokemonCaught = vi.fn();
  const mockClipboard = {
    writeText: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    Object.defineProperty(window, 'location', {
      value: { origin: 'http://localhost:3000' },
      writable: true,
    });

    vi.spyOn(usePokedexModule, 'default').mockReturnValue({
      getPokemonCaught: mockGetPokemonCaught,
      isCaught: vi.fn(),
      catchPokemon: vi.fn(),
      releasePokemon: vi.fn(),
      releasePokemons: vi.fn(),
      updatePokemonNotes: vi.fn(),
      getPokemonCaughtIDs: vi.fn(),
      pokemonCaught: {
        25: {
          pokemon: {
            id: 25,
            name: 'pikachu',
            base_experience: 112,
            height: 4,
            weight: 60,
            species: {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
            },
            sprites: {
              back_default: null,
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
              back_female: null,
              back_shiny: null,
              back_shiny_female: null,
              front_female: null,
              front_shiny: null,
              front_shiny_female: null,
            },
            stats: [],
            types: [],
            is_default: true,
            order: 35,
          },
          caughtAt: '2025-01-15T10:30:00.000Z',
          notes: 'My favorite!',
        },
      },
    });
  });

  it('renders share button', () => {
    mockGetPokemonCaught.mockReturnValue(null);
    render(<ShareButton pokemonId={25} />);

    expect(screen.getByTestId('share-button')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('copies URL to clipboard when clicked for uncaught Pokemon', async () => {
    mockGetPokemonCaught.mockReturnValue(null);
    mockClipboard.writeText.mockResolvedValue(undefined);

    render(<ShareButton pokemonId={25} />);

    const button = screen.getByTestId('share-button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled();
      const calledUrl = mockClipboard.writeText.mock.calls[0][0];
      expect(calledUrl).toContain(
        'http://localhost:3000/pokemon/25?isShared=true'
      );
    });
  });

  it('copies URL with data to clipboard for caught Pokemon', async () => {
    mockGetPokemonCaught.mockReturnValue({
      pokemon: { id: 25, name: 'pikachu' },
      notes: 'My favorite!',
      caughtAt: '2025-01-15T10:30:00.000Z',
    });
    mockClipboard.writeText.mockResolvedValue(undefined);

    render(<ShareButton pokemonId={25} />);

    const button = screen.getByTestId('share-button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled();
      const calledUrl = mockClipboard.writeText.mock.calls[0][0];
      expect(calledUrl).toContain(
        'http://localhost:3000/pokemon/25?isShared=true'
      );
      expect(calledUrl).toContain('&data=');
    });
  });

  it('shows "Copied!" feedback after successful copy', async () => {
    mockGetPokemonCaught.mockReturnValue(null);
    mockClipboard.writeText.mockResolvedValue(undefined);

    render(<ShareButton pokemonId={25} />);

    const button = screen.getByTestId('share-button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('handles clipboard write errors gracefully', async () => {
    mockGetPokemonCaught.mockReturnValue(null);
    mockClipboard.writeText.mockRejectedValue(new Error('Clipboard error'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<ShareButton pokemonId={25} />);

    const button = screen.getByTestId('share-button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('does not render when isVisible is false', () => {
    mockGetPokemonCaught.mockReturnValue(null);
    render(<ShareButton pokemonId={25} isVisible={false} />);

    expect(screen.queryByTestId('share-button')).not.toBeInTheDocument();
  });

  it('renders when isVisible is true', () => {
    mockGetPokemonCaught.mockReturnValue(null);
    render(<ShareButton pokemonId={25} isVisible={true} />);

    expect(screen.getByTestId('share-button')).toBeInTheDocument();
  });
});
