import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import usePokemon from '@/hooks/usePokemon';

vi.mock('@/services/pokeApi', () => ({
  pokeApi: {
    getPokemon: vi.fn(),
  },
}));

import { pokeApi } from '@/services/pokeApi';
import { TPokemon } from '@/types';
const mockGetPokemon = vi.mocked(pokeApi.getPokemon);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePokemon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches pokemon data successfully', async () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'https://example.com/bulbasaur.png' },
    } as TPokemon;

    mockGetPokemon.mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemon(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log(result);

    expect(result.current.data).toEqual(mockPokemon);
    expect(mockGetPokemon).toHaveBeenCalledWith(1);
  });

  it('handles loading state', () => {
    mockGetPokemon.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => usePokemon(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('handles error state', async () => {
    mockGetPokemon.mockRejectedValue(new Error('Pokemon not found'));

    const { result } = renderHook(() => usePokemon(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('Pokemon not found'));
  });
});
