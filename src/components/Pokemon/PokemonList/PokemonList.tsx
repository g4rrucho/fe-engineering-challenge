import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { keepPreviousData } from '@tanstack/react-query';

import usePokemons from '@/hooks/usePokemons';
import PokemonListItem from '@/components/Pokemon/PokemonList/PokemonListItem';
import PokemonListSkeleton from '@/components/Pokemon/PokemonList/PokemonListSkeleton';
import PaginationControl from '@/components/Pokemon/PokemonList/PaginationControl';

const PokemonList: React.FC = () => {
  const limit = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const { data, isLoading, error } = usePokemons(
    limit,
    (currentPage - 1) * limit,
    { placeholderData: keepPreviousData }
  );

  const totalPages = data ? Math.ceil(data.count / limit) : 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;
  const totalCount = data?.count || 0;

  if (isLoading) {
    return (
      <>
        <PaginationControl
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalCount={totalCount}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: limit }).map((_, index) => (
            <PokemonListSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (!data) return <div>No Pokémon found</div>;
  if (error) return <div>Error loading Pokémon list</div>;

  // const totalPages = Math.ceil(data?.count / limit);
  // const hasNext = !!data.next;
  // const hasPrevious = !!data.previous;

  return (
    <>
      <PaginationControl
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalCount={data.count}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />

      {data && (
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {data.results.map((pokemon, index) => (
            <PokemonListItem key={`${pokemon.name}-${index}`} {...pokemon} />
          ))}
        </div>
      )}
    </>
  );
};

export default PokemonList;
