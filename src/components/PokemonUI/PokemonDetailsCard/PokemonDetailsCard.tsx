import { TPokemon } from '@/types/api';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PokemonDetailsCardSkeleton from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCardSkeleton';
import PokemonDetailsCardError from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCardError';
import PokemonDetailsCardHeader from '@/components/PokemonUI/PokemonDetailsCard/PokemonDetailsCardHeader';
import PokemonPhysicalStats from '@/components/PokemonUI/PokemonDetailsCard/PokemonPhysicalStats';
import PokemonBaseStats from '@/components/PokemonUI/PokemonDetailsCard/PokemonBaseStats';

type TPokemonDetailsCardProps = {
  isLoading: boolean;
  isError: boolean;
  pokemon: TPokemon | undefined;
  onRefetchPokemon: () => void;
};

const PokemonDetailsCard: React.FC<TPokemonDetailsCardProps> = ({
  isLoading,
  isError,
  pokemon,
  onRefetchPokemon,
}) => {
  if (isLoading) return <PokemonDetailsCardSkeleton />;
  if (isError || !pokemon)
    return <PokemonDetailsCardError onRetry={onRefetchPokemon} />;

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
