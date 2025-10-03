import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type { TPokemonListItem, TPokemonPaginationResponse } from '@/types';
import { pokeApi } from '@/services/pokeApi';

type UsePokemonsQueryResponseType =
  TPokemonPaginationResponse<TPokemonListItem>;

const usePokemons = (
  limit: number = 20,
  offset: number = 0,
  options?: Partial<UseQueryOptions<UsePokemonsQueryResponseType>>
) =>
  useQuery<UsePokemonsQueryResponseType>({
    queryKey: ['pokemons', limit, offset],
    queryFn: () => pokeApi.getPokemons(limit, offset),
    ...options,
  });

export default usePokemons;
