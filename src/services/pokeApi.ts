import type { TPokemon } from '@/types/api';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonAPIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'PokemonAPIError';
  }
}

const apiRequest = async <T>(endpoint: string): Promise<T> => {
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new PokemonAPIError(
        `API request failed: ${response.statusText}`,
        response.status
      );

    return await response.json();
  } catch (error) {
    if (error instanceof PokemonAPIError) {
      throw error;
    } else {
      throw new PokemonAPIError('Network error occurred');
    }
  }
};

export const pokeApi = {
  async getPokemon(idOrName: string | number): Promise<TPokemon> {
    return apiRequest<TPokemon>(`pokemon/${idOrName}`);
  },
  async getPokemons(limit = 20, offset = 0) {
    return apiRequest<{
      count: number;
      next: string | null;
      previous: string | null;
      results: Array<{ name: string; url: string }>;
    }>(`pokemon?limit=${limit}&offset=${offset}`);
  },
};
