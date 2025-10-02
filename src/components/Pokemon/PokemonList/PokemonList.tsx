// import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import usePokemons from '@/hooks/usePokemons';
import PaginationControl from '@/components/Pokemon/PokemonList/PaginationControl';
import PokemonListCards from '@/components/Pokemon/PokemonList/PokemonListCards';
import PokemonTable from '@/components/Pokemon/PokemonTable/PokemonTable';

const PokemonList: React.FC = () => {
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  // const [selectedPokemons, setSelectedPokemons] = useState<Array<number>>([]);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const { data, isLoading, isError } = usePokemons(
    limit,
    (currentPage - 1) * limit
  );

  const totalPages = data ? Math.ceil(data.count / limit) : 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="lg:hidden">
        <PokemonListCards
          limit={limit}
          isError={isError}
          isLoading={isLoading}
          pokemons={data?.results || []}
        />
      </div>
      <div className="hidden lg:block">
        <PokemonTable
          limit={limit}
          isError={isError}
          isLoading={isLoading}
          pokemons={data?.results || []}
        />
      </div>
      <PaginationControl
        isVisible={!isLoading || isError || !!data}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalCount={data?.count || 0}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        limit={limit}
      />
    </div>
  );
};

export default PokemonList;
