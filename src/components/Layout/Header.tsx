import { ArrowLeft, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/pokemon/');

  return (
    <header className="border-b bg-red-700 shadow-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
              data-testid="home-link"
            >
              <Home size={24} />
              <span>Pokédex</span>
            </Link>
            {isDetailPage && (
              <Link
                to="/"
                data-testid="back-button"
                className="flex items-center gap-2 text-white hover:text-gray-400"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </Link>
            )}
          </div>

          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              data-testid="nav-pokemon-list"
            >
              All Pokémon
            </Link>
            <Link
              to="/pokedex"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/pokedex'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              data-testid="nav-pokedex"
            >
              My Pokédex
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
