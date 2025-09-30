import { pokeApi } from '@/services/pokeApi';
import { useQuery } from '@tanstack/react-query';

const usePokemon = (idOrName: string | number) =>
  useQuery({
    queryKey: ['pokemon', idOrName],
    queryFn: () => pokeApi.getPokemon(idOrName),
    enabled: !!idOrName,
  });

export default usePokemon;
