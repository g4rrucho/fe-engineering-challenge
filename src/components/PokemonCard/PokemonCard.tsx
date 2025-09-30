import { useParams } from 'react-router-dom';

import usePokemon from '@/hooks/usePokemon';
import PokemonCardHeader from '@/components/PokemonCard/PokemonCardHeader';
import PokemonPhysicalStats from '@/components/PokemonCard/PokemonPhysicalStats';
import PokemonBaseStats from '@/components/PokemonList/PokemonBaseStats';

const PokemonCard: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, error } = usePokemon(id as string | number);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon data.</div>;
  if (!data) return <div>No data available</div>;

  const {
    id: pokemonID,
    name,
    sprites,
    height,
    weight,
    stats,
    types,
    base_experience,
  } = data;

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <PokemonCardHeader pokemon={{ id: pokemonID, name, sprites, types }} />
      <PokemonPhysicalStats pokemon={{ height, weight, base_experience }} />
      <PokemonBaseStats stats={stats} />
    </div>
  );
};

export default PokemonCard;
