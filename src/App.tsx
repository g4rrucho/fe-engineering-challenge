import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PokemonCard from '@/components/PokemonCard';
import PokemonList from '@/components/PokemonList';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/pokemon/:id" Component={PokemonCard} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
