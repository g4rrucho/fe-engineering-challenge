import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

import HeaderLink from '@/components/Layout/Header/HeaderLink';

const Header: React.FC = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/pokemon/');

  return (
    <header className="min-w-full border-b bg-red-700 shadow-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <HeaderLink
              url="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
              testId="home-link"
            >
              <Home size={24} />
              <span>Pokédex</span>
            </HeaderLink>

            {isDetailPage && (
              <HeaderLink testId="nav-back-button" url="/">
                <ChevronLeft size={20} />
                <span className="hidden sm:block">Back</span>
              </HeaderLink>
            )}
          </div>

          <nav className="flex items-center gap-2 sm:gap-4">
            <HeaderLink url="/" testId="nav-pokemon-list" label="All Pokémon" />
            <HeaderLink
              url="/pokedex"
              testId="nav-pokedex"
              label="My Pokédex"
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
