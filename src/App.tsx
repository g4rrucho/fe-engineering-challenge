import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PokemonCard from '@/components/PokemonCard';
import PokemonList from '@/components/PokemonList';
import Header from '@/components/Layout/Header';
import Pokedex from '@/components/Pokedex';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/pokemon/:id" Component={PokemonCard} />
        <Route path="/pokedex" Component={Pokedex} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
