import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PokemonShareAlert from '../PokemonShareAlert';
import { TSharedPokemonData } from '@/utils/shareUtils';

describe('PokemonShareAlert', () => {
  it('renders nothing when isShared is false', () => {
    render(<PokemonShareAlert isShared={false} />);

    expect(screen.queryByTestId('shared-alert')).not.toBeInTheDocument();
  });

  it('renders shared badge when isShared is true', () => {
    render(<PokemonShareAlert isShared={true} />);

    expect(screen.getByTestId('shared-alert')).toBeInTheDocument();
    expect(screen.getByText('Shared Pokémon')).toBeInTheDocument();
  });

  it('displays caught status when sharedData has caughtAt', () => {
    const sharedData: TSharedPokemonData = {
      caught: true,
      caughtAt: '2025-01-15T10:30:00.000Z',
    };

    render(<PokemonShareAlert isShared={true} sharedData={sharedData} />);

    expect(screen.getByTestId('shared-caught-info')).toBeInTheDocument();
    expect(
      screen.getByText(/This Pokémon was caught by the original owner/)
    ).toBeInTheDocument();
    expect(screen.getByText(/2025\/01\/15/)).toBeInTheDocument();
  });

  it('displays owner notes when sharedData has notes', () => {
    const sharedData: TSharedPokemonData = {
      caught: true,
      notes: 'This is my favorite Pokemon!',
      caughtAt: '2025-01-15T10:30:00.000Z',
    };

    render(<PokemonShareAlert isShared={true} sharedData={sharedData} />);

    expect(screen.getByTestId('shared-notes')).toBeInTheDocument();
    expect(screen.getByText("Original Owner's Notes:")).toBeInTheDocument();
    expect(
      screen.getByText('This is my favorite Pokemon!')
    ).toBeInTheDocument();
  });

  it('does not display caught status when no caughtAt', () => {
    const sharedData: TSharedPokemonData = {
      caught: true,
      notes: 'Some notes',
    };

    render(<PokemonShareAlert isShared={true} sharedData={sharedData} />);

    expect(screen.queryByTestId('shared-caught-info')).not.toBeInTheDocument();
  });

  it('does not display notes section when no notes', () => {
    const sharedData: TSharedPokemonData = {
      caught: true,
      caughtAt: '2025-01-15T10:30:00.000Z',
    };

    render(<PokemonShareAlert isShared={true} sharedData={sharedData} />);

    expect(screen.queryByTestId('shared-notes')).not.toBeInTheDocument();
  });

  it('renders only shared badge when no sharedData provided', () => {
    render(<PokemonShareAlert isShared={true} />);

    expect(screen.getByTestId('shared-alert')).toBeInTheDocument();
    expect(screen.getByText('Shared Pokémon')).toBeInTheDocument();
    expect(screen.queryByTestId('shared-caught-info')).not.toBeInTheDocument();
    expect(screen.queryByTestId('shared-notes')).not.toBeInTheDocument();
  });

  it('renders complete alert with all data', () => {
    const sharedData: TSharedPokemonData = {
      caught: true,
      notes: 'Amazing electric Pokemon!\nVery fast and strong.',
      caughtAt: '2025-01-15T10:30:00.000Z',
    };

    render(<PokemonShareAlert isShared={true} sharedData={sharedData} />);

    expect(screen.getByTestId('shared-alert')).toBeInTheDocument();
    expect(screen.getByTestId('shared-caught-info')).toBeInTheDocument();
    expect(screen.getByTestId('shared-notes')).toBeInTheDocument();
    expect(screen.getByText('Shared Pokémon')).toBeInTheDocument();
    expect(
      screen.getByText(/This Pokémon was caught by the original owner/)
    ).toBeInTheDocument();
    expect(screen.getByText("Original Owner's Notes:")).toBeInTheDocument();
    expect(
      screen.getByText(/Amazing electric Pokemon!/)
    ).toBeInTheDocument();
  });
});
