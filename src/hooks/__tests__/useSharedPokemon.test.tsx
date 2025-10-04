import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import useSharedPokemon from '../useSharedPokemon';
import { encodeShareData } from '@/utils/shareUtils';

const createWrapper = (initialUrl: string) => {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[initialUrl]}>{children}</MemoryRouter>
  );
};

describe('useSharedPokemon', () => {
  it('returns isShared=true when URL has isShared parameter', () => {
    const wrapper = createWrapper('/pokemon/25?isShared=true');
    const { result } = renderHook(() => useSharedPokemon(), { wrapper });

    expect(result.current.isShared).toBe(true);
  });

  it('returns isShared=false when URL does not have isShared parameter', () => {
    const wrapper = createWrapper('/pokemon/25');
    const { result } = renderHook(() => useSharedPokemon(), { wrapper });

    expect(result.current.isShared).toBe(false);
  });

  it('decodes sharedData from URL data parameter', () => {
    const sharedData = {
      caught: true,
      notes: 'Amazing Pokemon!',
      caughtAt: '2025-01-15T10:30:00.000Z',
    };
    const encodedData = encodeShareData(sharedData);
    const wrapper = createWrapper(
      `/pokemon/25?isShared=true&data=${encodedData}`
    );

    const { result } = renderHook(() => useSharedPokemon(), { wrapper });

    expect(result.current.sharedData).toEqual(sharedData);
  });

  it('returns undefined sharedData when no data parameter', () => {
    const wrapper = createWrapper('/pokemon/25?isShared=true');
    const { result } = renderHook(() => useSharedPokemon(), { wrapper });

    expect(result.current.sharedData).toBeUndefined();
  });

  it('returns undefined sharedData when data parameter is invalid', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = createWrapper(
      '/pokemon/25?isShared=true&data=invalidbase64'
    );
    const { result } = renderHook(() => useSharedPokemon(), { wrapper });

    expect(result.current.sharedData).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('handles missing notes in sharedData', () => {
    const sharedData = {
      caught: true,
      caughtAt: '2025-01-15T10:30:00.000Z',
    };
    const encodedData = encodeShareData(sharedData);
    const wrapper = createWrapper(
      `/pokemon/25?isShared=true&data=${encodedData}`
    );

    const { result } = renderHook(() => useSharedPokemon(), { wrapper });

    expect(result.current.sharedData).toEqual(sharedData);
    expect(result.current.sharedData?.notes).toBeUndefined();
  });
});
