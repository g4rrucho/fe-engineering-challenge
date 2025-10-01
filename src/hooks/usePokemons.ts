import { useQuery } from '@tanstack/react-query';

import type { TPokemonListItem, TPokemonPaginationResponse } from '@/types/api';
import { pokeApi } from '@/services/pokeApi';

const usePokemons = (limit: number = 20, offset: number = 0) =>
  useQuery<TPokemonPaginationResponse<TPokemonListItem>>({
    queryKey: ['pokemons', limit, offset],
    queryFn: () => pokeApi.getPokemons(limit, offset),
  });

export default usePokemons;
