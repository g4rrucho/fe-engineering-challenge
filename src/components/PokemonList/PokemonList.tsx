import React from 'react';
import { useSearchParams } from 'react-router-dom';

import usePokemons from '@/hooks/usePokemons';
import PokemonListItem from '@/components/PokemonList/PokemonListItem';
import PokemonCardSkeleton from '@/components/PokemonCard/PokemonCardSkeleton';
import PokemonListPaginationControls from '@/components/PokemonList/PokemonListPaginationControls';

const PokemonList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const { data, isLoading, error } = usePokemons(
    limit,
    (currentPage - 1) * limit
  );

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

  if (!data) return <div>No Pokémon found</div>;
  if (error) return <div>Error loading Pokémon list</div>;

  const totalPages = Math.ceil(data?.count / limit);
  const hasNext = !!data.next;
  const hasPrevious = !!data.previous;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {data.results.map((pokemon, index) => (
          <PokemonListItem key={`${pokemon.name}-${index}`} {...pokemon} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <PokemonListPaginationControls
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>
    </>
  );
};

export default PokemonList;
