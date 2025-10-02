import React from 'react';

import type { TPokemonStat } from '@/types/api';
import StatBar from '@/components/StatBar';

const statConfig = [
  { name: 'HP', statName: 'hp', color: 'bg-red-500' },
  { name: 'Attack', statName: 'attack', color: 'bg-orange-500' },
  { name: 'Defense', statName: 'defense', color: 'bg-yellow-500' },
  {
    name: 'Special Attack',
    statName: 'special-attack',
    color: 'bg-blue-500',
  },
  {
    name: 'Special Defense',
    statName: 'special-defense',
    color: 'bg-green-500',
  },
  { name: 'Speed', statName: 'speed', color: 'bg-pink-500' },
];

const getStatByName = (stats: TPokemonStat[], statName: string) => {
  return stats.find((stat) => stat.stat.name === statName)?.base_stat || 0;
};

interface PokemonBaseStatsProps {
  stats: TPokemonStat[];
}

const PokemonBaseStats: React.FC<PokemonBaseStatsProps> = ({ stats }) => {
  return (
    <div className="border-t pt-2">
      <h2 className="pb-4 text-2xl font-bold">Base Stats</h2>
      <div className="grid gap-3">
        {statConfig.map(({ name, statName, color }) => (
          <StatBar
            key={statName}
            name={name}
            value={getStatByName(stats, statName)}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonBaseStats;
