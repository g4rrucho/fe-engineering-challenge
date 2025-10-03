import { TPokemonCaughtData } from '@/types';
import { formatDateString } from '@/utils/formatDateString';

export const exportPokedexToCsv = (
  pokemonData: TPokemonCaughtData[],
  filename: string = 'pokedex-export.csv'
) => {
  const headers = [
    'ID',
    'Name',
    'Types',
    'Height (m)',
    'Weight (kg)',
    'HP',
    'Attack',
    'Defense',
    'Special Attack',
    'Special Defense',
    'Speed',
    'Caught At',
    'Notes',
  ];

  const rows = pokemonData.map((data: TPokemonCaughtData) => {
    const pokemon = data.pokemon;
    const types = pokemon.types.map((t) => t.type.name).join(', ');
    const stats = pokemon.stats.reduce(
      (acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
      },
      {} as Record<string, number>
    );

    return [
      pokemon.id,
      pokemon.name,
      types,
      (pokemon.height / 10).toFixed(1),
      (pokemon.weight / 10).toFixed(1),
      stats.hp || 0,
      stats.attack || 0,
      stats.defense || 0,
      stats['special-attack'] || 0,
      stats['special-defense'] || 0,
      stats.speed || 0,
      formatDateString(data.caughtAt),
      data.notes ? data.notes.replace(/"/g, '""') : '',
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  // Little hack to trigger download in browser
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
