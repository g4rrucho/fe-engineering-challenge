import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  encodeShareData,
  decodeShareData,
  generateShareUrl,
  TSharedPokemonData,
} from '../shareUtils';

describe('shareUtils', () => {
  describe('encodeShareData', () => {
    it('encodes Pokemon data to base64', () => {
      const data: TSharedPokemonData = {
        caught: true,
        notes: 'My favorite Pokemon!',
        caughtAt: '2025-01-15T10:30:00.000Z',
      };

      const encoded = encodeShareData(data);

      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
      expect(encoded).toMatch(/^[A-Za-z0-9+/=]+$/);
    });

    it('encodes data without notes', () => {
      const data: TSharedPokemonData = {
        caught: true,
        caughtAt: '2025-01-15T10:30:00.000Z',
      };

      const encoded = encodeShareData(data);

      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
    });
  });

  describe('decodeShareData', () => {
    it('decodes valid base64 data', () => {
      const originalData: TSharedPokemonData = {
        caught: true,
        notes: 'Test notes',
        caughtAt: '2025-01-15T10:30:00.000Z',
      };

      const encoded = encodeShareData(originalData);
      const decoded = decodeShareData(encoded);

      expect(decoded).toEqual(originalData);
    });

    it('returns undefined for invalid base64', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = decodeShareData('invalid!!!base64');

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('returns undefined for malformed JSON', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const invalidJson = btoa('{invalid json}');
      const result = decodeShareData(invalidJson);

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('generateShareUrl', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { origin: 'http://localhost:3000' },
        writable: true,
      });
    });

    it('generates URL with data for caught Pokemon', () => {
      const pokemonId = 25;
      const data: TSharedPokemonData = {
        caught: true,
        notes: 'Pikachu is amazing!',
        caughtAt: '2025-01-15T10:30:00.000Z',
      };

      const url = generateShareUrl(pokemonId, data);

      expect(url).toContain('http://localhost:3000/pokemon/25');
      expect(url).toContain('isShared=true');
      expect(url).toContain('data=');
    });

    it('generates simple URL for uncaught Pokemon', () => {
      const pokemonId = 1;

      const url = generateShareUrl(pokemonId);

      expect(url).toBe('http://localhost:3000/pokemon/1?isShared=true');
      expect(url).not.toContain('data=');
    });

    it('generates URL without data parameter when data is undefined', () => {
      const pokemonId = 150;

      const url = generateShareUrl(pokemonId, undefined);

      expect(url).toBe('http://localhost:3000/pokemon/150?isShared=true');
      expect(url).not.toContain('data=');
    });
  });
});
