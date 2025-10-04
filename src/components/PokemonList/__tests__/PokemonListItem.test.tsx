import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PokemonListCard from '@/components/PokemonList/PokemonListCard';

vi.mock('@/hooks/usePokemon', () => ({
  default: vi.fn(() => ({
    data: {
      id: 1,
      name: 'bulbasaur',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
    },
    isLoading: false,
    isError: false,
  })),
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('PokemonList', () => {
  it('renders PokemonListCard with correct data', () => {
    render(
      <TestWrapper>
        <PokemonListCard
          id={1}
          name="bulbasaur"
          url="https://pokeapi.co/api/v2/pokemon/1/"
        />
      </TestWrapper>
    );

    expect(screen.getByTestId('pokemon-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name-1')).toHaveTextContent('bulbasaur');
    expect(screen.getByTestId('pokemon-id-1')).toHaveTextContent('ID: 0001');
    expect(screen.getByTestId('pokemon-image-1')).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
  });
});
