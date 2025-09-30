import usePokemon from '@/hooks/usePokemon';
import { useParams } from 'react-router-dom';

const PokemonCard: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, error } = usePokemon(id as string | number);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon data.</div>;
  if (!data) return <div>No data available.</div>;

  const {
    id: pokemonID,
    name,
    sprites: { front_default },
  } = data;

  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4 shadow-2xl">
      {front_default && <img src={front_default} alt={name} />}
      {name.toLowerCase() === 'pikachu' && (
        <p className="text-xl font-bold italic">"It's Pikachu!"</p>
      )}
      <h2 className="text-xl font-bold">{name.toUpperCase()}</h2>
      <p>ID: {pokemonID}</p>
    </div>
  );
};

export default PokemonCard;
