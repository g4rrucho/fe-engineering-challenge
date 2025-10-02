import { TPokemonListItem } from '@/types/api';
import PokemonCardSkeleton from '@/components/PokemonUI/PokemonCardList/PokemonCardSkeleton';
import PokemonListItem from '@/components/PokemonList/PokemonListItem';

type TPokemonListCardsProps = {
  isLoading: boolean;
  isError: boolean;
  limit?: number;
  pokemons: TPokemonListItem[];
};

const PokemonListCards: React.FC<TPokemonListCardsProps> = ({
  isError,
  isLoading,
  limit = 20,
  pokemons,
}) => {
  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: limit }).map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (isError) return <div>Error loading Pokémon list</div>;
  if (!pokemons) return <div>No Pokémon found</div>;

  return (
    <>
      {pokemons && (
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {pokemons.map((pokemon, index) => (
            <PokemonListItem
              key={`${pokemon.name}-${index}`}
              {...pokemon}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PokemonListCards;
