
  import React from 'react';
  import { Link } from 'react-router-dom';

  import type { TPokemon } from '@/types/api';
  import { Card, CardContent } from '@/components/ui/card';

  type TPokemonCardProps = {
    pokemon: TPokemon;
    caughtAt?: string;
  };

  const PokemonCard: React.FC<TPokemonCardProps> = ({ pokemon, caughtAt }) => {
    const displayName = pokemon.name.replaceAll('-', ' ');

    return (
      <Link to={`/pokemon/${pokemon.id}`} data-testid={`pokemon-link-${pokemon.id}`}>
        <Card
          className="py-2 transition-shadow hover:shadow-lg"
          data-testid={`pokemon-item-${pokemon.id}`}
        >
          <CardContent className="flex flex-col items-center justify-center px-4">
            {pokemon.sprites?.front_default ? (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="h-16 w-16 object-contain"
                data-testid={`pokemon-image-${pokemon.id}`}
              />
            ) : (
              <p
                className="flex h-16 w-16 items-center justify-center rounded-4xl bg-gray-200 p-2"
                data-testid={`pokemon-image-placeholder-${pokemon.id}`}
              >
                ?
              </p>
            )}
            <div>
              <p
                className="line-clamp-1 text-lg font-bold text-ellipsis whitespace-break-spaces text-black capitalize"
                data-testid={`pokemon-name-${pokemon.id}`}
              >
                {displayName}
              </p>
              <p
                className="text-sm text-gray-500"
                data-testid={`pokemon-id-${pokemon.id}`}
              >
                ID: {pokemon.id.toString().padStart(4, '0')}
              </p>
              {caughtAt && (
                <p className="text-xs text-gray-400">
                  Caught: {new Date(caughtAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  export default PokemonCard;
