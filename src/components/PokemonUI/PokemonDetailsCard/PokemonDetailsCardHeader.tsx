import React from 'react';

import PokeBall from '@/assets/pokeball.png';

import { TPokemon } from '@/types/api';
import { Button } from '@/components/ui/button';

type TPokemonHeaderProps = {
  pokemon: TPokemon;
  onToggleCatch?: () => void;
  isCaught?: boolean;
};

const PokemonDetailsCardHeader: React.FC<TPokemonHeaderProps> = ({
  pokemon,
  onToggleCatch,
  isCaught,
}) => {
  const { id, name, sprites, types } = pokemon;

  return (
    <div className="mb-8 flex flex-col items-center gap-2 sm:gap-8 md:flex-row md:gap-2">
      {/* Pokemon Image */}
      <div className="flex-shrink-0">
        {sprites?.front_default && (
          <img
            src={sprites.front_default}
            alt={name}
            className="h-24 w-24 object-contain sm:h-48 sm:w-48"
          />
        )}
      </div>

      {/* Basic Info */}
      <div className="text-center">
        <div className="full-w flex items-center justify-center gap-4">
          <h1 className="mb-2 text-4xl font-bold capitalize">{name}</h1>
          {isCaught && (
            <img className="h-8 w-8 object-contain" src={PokeBall} />
          )}
        </div>
        <p className="mb-4 text-xl text-gray-600 md:text-left">
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
          variant={isCaught ? 'destructive' : 'default'}
          onClick={onToggleCatch}
        >
          {isCaught ? `Release ${name}` : `Catch ${name}`}
        </Button>
      </div>
    </div>
  );
};

export default PokemonDetailsCardHeader;
