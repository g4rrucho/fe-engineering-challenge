import { pokeApi } from '@/services/pokeapi';
import { useQuery } from '@tanstack/react-query';

export const usePokemon = (idOrName: string | number) =>
  useQuery({
    queryKey: ['pokemon', idOrName],
    queryFn: () => pokeApi.getPokemon(idOrName),
    enabled: !!idOrName,
  });
