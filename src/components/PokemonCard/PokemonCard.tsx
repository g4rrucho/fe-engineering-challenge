import { useParams } from 'react-router-dom';

import usePokemon from '@/hooks/usePokemon';
import PokemonCardHeader from '@/components/PokemonCard/PokemonCardHeader';
import PokemonPhysicalStats from '@/components/PokemonCard/PokemonPhysicalStats';
import PokemonBaseStats from '@/components/PokemonList/PokemonBaseStats';

const PokemonCard: React.FC = () => {
  const { id } = useParams();

  const { data: pokemon, isLoading, error } = usePokemon(id as string | number);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon data.</div>;
  if (!pokemon) return <div>No data available</div>;

  const { height, weight, stats, base_experience } = pokemon;

  return (
    <div className="sm:mx-auto m-4 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <PokemonCardHeader pokemon={pokemon} />
      <PokemonPhysicalStats pokemon={{ height, weight, base_experience }} />
      <PokemonBaseStats stats={stats} />
    </div>
  );
};

export default PokemonCard;
