import type { TPokemon } from '@/types/api';

type PokemonPhysicalStatsProps = {
  pokemon: Pick<TPokemon, 'height' | 'weight' | 'base_experience'>;
};

const PokemonPhysicalStats: React.FC<PokemonPhysicalStatsProps> = ({
  pokemon,
}) => {
  const { height, weight, base_experience } = pokemon;

  return (
    <div className="mb-6">
      <h2 className="mb-3 text-xl font-bold">Physical Information</h2>
      <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
        <div className="flex flex-col">
          <span className="text-xs tracking-wide text-gray-600 uppercase">
            Height
          </span>
          <span className="text-lg font-medium">{height / 10}m</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs tracking-wide text-gray-600 uppercase">
            Weight
          </span>
          <span className="text-lg font-medium">{weight / 10}kg</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs tracking-wide text-gray-600 uppercase">
            Base Experience
          </span>
          <span className="text-lg font-medium">{base_experience}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonPhysicalStats;
