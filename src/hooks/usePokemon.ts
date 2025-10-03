import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { TPokemon } from '@/types';
import { pokeApi } from '@/services/pokeApi';

const usePokemon = (
  idOrName: string | number,
  options?: Partial<UseQueryOptions<TPokemon>>
) =>
  useQuery({
    queryKey: ['pokemon', idOrName],
    queryFn: () => pokeApi.getPokemon(idOrName),
    enabled: !!idOrName,
    ...options,
  });

export default usePokemon;
