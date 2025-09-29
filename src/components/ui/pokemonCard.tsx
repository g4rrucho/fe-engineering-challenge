import { TPokemon } from '@/types/api';

const PokemonCard: React.FC<TPokemon> = (pokemon) => {
  const {
    name,
    id,
    sprites: { front_default },
  } = pokemon;

  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4 shadow-2xl">
      {front_default && <img src={front_default} alt={name} />}
      {name.toLowerCase() === 'pikachu' && (
        <p className="text-xl font-bold italic">"It's Pikachu!"</p>
      )}
      <h2 className="text-xl font-bold">{name.toUpperCase()}</h2>
      <p>ID: {id}</p>
    </div>
  );
};

export default PokemonCard;
