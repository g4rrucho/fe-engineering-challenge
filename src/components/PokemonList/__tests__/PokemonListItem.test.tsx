import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PokemonCardListItem from '@/components/Pokemon/PokemonList/PokemonCardListItem';

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
  it('renders PokemonListItem with correct data', () => {
    render(
      <TestWrapper>
        <PokemonCardListItem
          id={1}
          name="bulbasaur"
          url="https://pokeapi.co/api/v2/pokemon/1/"
        />
      </TestWrapper>
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ID: 0001')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur')).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
  });
});
