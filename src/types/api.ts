type TNamedAPIResource = {
  name: string;
  url: string;
};

type TPokemonListItem = TNamedAPIResource & {
  id: number;
};

type TPokemonStat = {
  stat: TNamedAPIResource;
  effort: number;
  base_stat: number;
};

type TPokemonType = {
  slot: number;
  type: TNamedAPIResource;
};

type TPokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
};

type TPokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: TPokemonSprites;
  stats: TPokemonStat[];
  types: TPokemonType[];
  species: TNamedAPIResource;
};

type TPokemonPaginationResponse<T> = {
  count: number;
  next: string;
  previous: string | null;
  results: Array<T>;
};

export type {
  TNamedAPIResource,
  TPokemonStat,
  TPokemonType,
  TPokemonSprites,
  TPokemon,
  TPokemonListItem,
  TPokemonPaginationResponse,
};
