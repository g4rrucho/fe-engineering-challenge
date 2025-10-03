import type {
  TNamedAPIResource,
  TPokemon,
  TPokemonListItem,
  TPokemonPaginationResponse,
} from '@/types';

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

    return (await response.json()) as T;
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

  async getPokemons(
    limit = 20,
    offset = 0
  ): Promise<TPokemonPaginationResponse<TPokemonListItem>> {
    const response = await apiRequest<
      TPokemonPaginationResponse<TNamedAPIResource>
    >(`pokemon?limit=${limit}&offset=${offset}`);

    const results = response.results.map((pokemon, index) => {
      const match = pokemon.url.match(/\/pokemon\/(\d+)\//);
      const id = match ? parseInt(match[1], 10) : offset + index + 1;

      return {
        ...pokemon,
        id,
      };
    });

    return {
      ...response,
      results,
    };
  },

  async getAllPokemons(): Promise<TPokemonListItem[]> {
    const resTotalPokemons =
      await apiRequest<TPokemonPaginationResponse<TNamedAPIResource>>(
        'pokemon?limit=1'
      );
    const totalPokemons = resTotalPokemons.count;

    const allPokemonsResponse = await apiRequest<
      TPokemonPaginationResponse<TNamedAPIResource>
    >(`pokemon?limit=${totalPokemons}&offset=0`);

    return allPokemonsResponse.results.map((pokemon, index) => {
      const match = pokemon.url.match(/\/pokemon\/(\d+)\//);
      const id = match ? parseInt(match[1], 10) : index + 1;

      return {
        ...pokemon,
        id,
      };
    });
  },
};
