import React from 'react';

import { TPokemon } from '@/types';
import { TPokemonCaughtData } from '@/types';
import useSharedPokemon from '@/hooks/useSharedPokemon';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import PokemonDetailsCardSkeleton from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCardSkeleton';
import PokemonDetailsCardError from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCardError';
import PokemonDetailsCardHeader from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCardHeader';
import PokemonPhysicalStats from '@/components/PokemonUI/PokemonDetailsCard/PokemonPhysicalStats';
import PokemonBaseStats from '@/components/PokemonUI/PokemonDetailsCard/PokemonBaseStats';
import PokemonNotes from '@/components/PokemonUI/PokemonDetailsCard/PokemonNotes';
import PokemonShareAlert from '@/components/PokemonUI/PokemonDetailsCard/PokemonSharedAlert';

type TPokemonDetailsCardProps = {
  isLoading: boolean;
  isError: boolean;
  pokemon?: TPokemon;
  caughtData?: TPokemonCaughtData;
  onRefetchPokemon: () => void;
  handleToggleCatch: () => void;
  onUpdateNotes?: (notes: string) => void;
};

const PokemonDetailsCard: React.FC<TPokemonDetailsCardProps> = ({
  isLoading,
  isError,
  pokemon,
  caughtData,
  onRefetchPokemon,
  handleToggleCatch,
  onUpdateNotes,
}) => {
  const { isShared, sharedData } = useSharedPokemon();

  if (caughtData && !onUpdateNotes)
    throw new Error('onUpdateNotes is required when caughtData is present');

  if (isLoading) return <PokemonDetailsCardSkeleton />;
  if (isError || !pokemon)
    return <PokemonDetailsCardError onRetry={onRefetchPokemon} />;

  const { height, weight, stats, base_experience } = pokemon;

  return (
    <Card className="m-4">
      <CardHeader>
        <PokemonDetailsCardHeader
          pokemon={pokemon}
          isCaught={!!caughtData}
          onToggleCatch={handleToggleCatch}
          isShared={isShared}
        />
        <PokemonShareAlert isShared={isShared} sharedData={sharedData} />
        <PokemonPhysicalStats pokemon={{ height, weight, base_experience }} />
        {caughtData && onUpdateNotes && (
          <PokemonNotes
            pokemonName={pokemon.name}
            notes={caughtData.notes || ''}
            onUpdateNotes={onUpdateNotes}
          />
        )}
      </CardHeader>
      <CardContent>
        <PokemonBaseStats stats={stats} />
      </CardContent>
    </Card>
  );
};

export default PokemonDetailsCard;
