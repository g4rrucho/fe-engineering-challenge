import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '@/components/Layout/Header';
import PokedexPage from '@/pages/PokedexPage';
import PokemonDetailsPage from '@/pages/PokemonDetailsPage';
import PokemonListPage from '@/pages/PokemonListPage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={PokemonListPage} />
        <Route path="/pokedex" Component={PokedexPage} />
        <Route path="/pokemon/:id" Component={PokemonDetailsPage} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
