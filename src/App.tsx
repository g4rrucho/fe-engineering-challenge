import type React from 'react';
import './App.css';
import { usePokemon } from '@/hooks/usePokemon';
import PokemonCard from '@/components/ui/pokemonCard';

const App: React.FC = () => {
  const { data, isLoading, error } = usePokemon('pikachu');

  return (
    <div>
      <h1 className="text-3xl font-bold underline">React Pokedex!</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <PokemonCard {...data} />}
    </div>
  );
};

export default App;
