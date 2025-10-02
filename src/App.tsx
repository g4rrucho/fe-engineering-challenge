import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PokemonList from '@/components/Pokemon/PokemonList';
import Header from '@/components/Layout/Header';
import Pokedex from '@/components/Pokedex';

import PokemonDetailsPage from '@/pages/PokemonDetailsPage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/pokemon/:id" Component={PokemonDetailsPage} />
        <Route path="/pokedex" Component={Pokedex} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
