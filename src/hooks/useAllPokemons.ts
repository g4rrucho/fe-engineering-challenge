import { pokeApi } from '@/services/pokeApi';
import { TPokemonListItem } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const useAllPokemons = () =>
  useQuery<TPokemonListItem[]>({
    queryKey: ['allPokemons'],
    queryFn: async () => pokeApi.getAllPokemons(),
  });

export default useAllPokemons;
