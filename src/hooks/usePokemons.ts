import { useQuery } from '@tanstack/react-query';

import type {
  TNamedAPIResource,
  TPokemonPaginationResponse,
} from '@/types/api';
import { pokeApi } from '@/services/pokeApi';

const usePokemons = (limit: number = 20, offset: number = 0) =>
  useQuery<TPokemonPaginationResponse<TNamedAPIResource>>({
    queryKey: ['pokemons', limit, offset],
    queryFn: () => pokeApi.getPokemons(limit, offset),
  });

export default usePokemons;
