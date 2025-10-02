import { useParams } from 'react-router-dom';

import usePokemon from '@/hooks/usePokemon';
import usePokedex from '@/hooks/usePokedex';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PokemonDetailsCardHeader from '@/components/PokemonDetailsCard/PokemonDetailsCardHeader';
import PokemonPhysicalStats from '@/components/PokemonDetailsCard/PokemonPhysicalStats';
import PokemonBaseStats from '@/components/Pokemon/PokemonList/PokemonBaseStats';

const PokemonDetailsCard: React.FC = () => {
  const { id } = useParams();
  const pokemonID = parseInt(id || '0', 10);

  const { getPokemonCaught } = usePokedex();
  const cachedPokemon = getPokemonCaught(pokemonID);

  const {
    data: fetchedPokemon,
    isLoading,
    error,
  } = usePokemon(pokemonID, {
    enabled: !cachedPokemon || !pokemonID,
  });

  const pokemon = cachedPokemon || fetchedPokemon;

  if (isLoading && !cachedPokemon) return <div>Loading...</div>;
  if (error && !cachedPokemon)
    return <div>Error loading Pokémon data. Check your connection.</div>;
  if (!pokemon) return <div>No data available</div>;

  const { height, weight, stats, base_experience } = pokemon;

  return (
    <Card className="m-4">
      <CardHeader>
        <PokemonDetailsCardHeader pokemon={pokemon} />
        <PokemonPhysicalStats pokemon={{ height, weight, base_experience }} />
      </CardHeader>
      <CardContent>
        <PokemonBaseStats stats={stats} />
      </CardContent>
    </Card>
  );
};

export default PokemonDetailsCard;
