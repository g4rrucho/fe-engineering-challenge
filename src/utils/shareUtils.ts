export type TSharedPokemonData = {
  caught: boolean;
  notes?: string;
  caughtAt?: string;
};

export const encodeShareData = (data: TSharedPokemonData): string => {
  const jsonString = JSON.stringify(data);
  return btoa(jsonString);
};

export const decodeShareData = (
  encodedData: string
): TSharedPokemonData | undefined => {
  try {
    const jsonString = atob(encodedData);
    return JSON.parse(jsonString) as TSharedPokemonData;
  } catch (error) {
    console.error('Failed to decode share data:', error);
    return undefined;
  }
};

export const generateShareUrl = (
  pokemonId: number,
  data?: TSharedPokemonData
): string => {
  const baseUrl = `${window.location.origin}/pokemon/${pokemonId}?isShared=true`;

  if (!data) return baseUrl;

  const encodedData = encodeShareData(data);
  return `${baseUrl}&data=${encodedData}`;
};
