import React from 'react';

import PokeBall from '@/assets/pokeball.png';
import { TPokemon } from '@/types/api';
import { usePokedex } from '@/hooks/usePokedex';
import { Button } from '@/components/ui/button';

type TPokemonHeaderProps = {
  pokemon: Pick<TPokemon, 'id' | 'name' | 'sprites' | 'types'>;
};

const PokemonCardHeader: React.FC<TPokemonHeaderProps> = ({ pokemon }) => {
  const { isCaught, catchPokemon, releasePokemon } = usePokedex();
  const { id, name, sprites, types } = pokemon;

  const caught = isCaught(id);

  const handleCatchToggle = () => {
    if (caught) releasePokemon(id);
    else catchPokemon(id);
  };

  return (
    <div className="mb-8 flex flex-col items-center gap-8 md:flex-row">
      {/* Pokemon Image */}
      <div className="flex-shrink-0">
        {sprites?.front_default && (
          <img
            src={sprites.front_default}
            alt={name}
            className="h-48 w-48 object-contain"
          />
        )}
      </div>

      {/* Basic Info */}
      <div className="text-center md:text-left">
        <div className="flex items-center gap-4">
          <h1 className="mb-2 text-4xl font-bold capitalize">{name}</h1>
          {isCaught(id) && (
            <img className="h-8 w-8 object-contain" src={PokeBall} />
          )}
        </div>
        <p className="mb-4 text-xl text-gray-600">
          #{id.toString().padStart(3, '0')}
        </p>

        {/* Types */}
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
          {types.map((type) => (
            <span
              key={type.type.name}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center md:ml-auto">
        <Button
          variant={caught ? 'destructive' : 'default'}
          onClick={handleCatchToggle}
        >
          {caught ? `Release ${name}` : `Catch ${name}`}
        </Button>
        {/* <button
          onClick={handleCatchToggle}
          className={`rounded-lg px-6 py-2 font-semibold transition-colors ${
            caught
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {caught ? `Release ${name}` : `Catch ${name}`}
        </button> */}
      </div>
    </div>
  );
};

export default PokemonCardHeader;
