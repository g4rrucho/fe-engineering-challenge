import React, { memo } from 'react';

type TPokedexHeader = {
  totalCaught: number;
};

const PokedexHeader: React.FC<TPokedexHeader> = ({ totalCaught }) => {
  return (
    <div className="mb-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">My Pokédex</h1>
      <p className="text-gray-600">You've caught {totalCaught} Pokémon</p>
    </div>
  );
};

export default memo(PokedexHeader);
